import { createFoldRenderer } from './fold-renderer';
import { INTRO_TIMING } from './intro-timing';
import { prepareHeroEntrance } from './hero-entrance';

/** The intro paints the hero's rounded surface, then uncovers the static hero. */
export function startPageTurnIntro() {
 const root=document.documentElement;
 const intro=document.querySelector<HTMLElement>('[data-page-turn-intro]');
 const canvas=intro?.querySelector('canvas');
 const panel=intro?.parentElement;
 const surface=panel?.querySelector<HTMLElement>('.hero');
 const motion=matchMedia('(prefers-reduced-motion: reduce)');
 if(!intro||!canvas||!panel||!surface)return;
 if(root.dataset.intro!=='pending'||motion.matches||document.hidden){delete root.dataset.intro;intro.remove();return;}
 const content=Array.from(panel.children).filter((el):el is HTMLElement=>el instanceof HTMLElement&&el!==intro);
 content.forEach(el=>el.inert=true);
 const events=new AbortController();
 let frame=0,done=false;
 let renderer:ReturnType<typeof createFoldRenderer>=null;
 let deadline=0,preview=false,entered=false;
 let played:Animation[]=[];
 let entrance:ReturnType<typeof prepareHeroEntrance>|null=null;
 // Just before the reveal, while the final page is still at rest, the hero
 // is unclipped (one repaint) and its lenses are built, so the reveal's
 // first frames only start animations.
 const prepare=()=>{
  if(entrance||motion.matches)return;
  root.dataset.introRevealing='true';entrance=prepareHeroEntrance(surface);
 };
 // The hero resolves behind the final page; an early exit still plays it in.
 const enter=(elapsed:number)=>{
  if(entered||motion.matches||(preview&&!Number.isFinite(elapsed)))return;entered=true;
  prepare();played=entrance!(elapsed);
  if(preview)played.forEach(animation=>animation.pause()); // ?introAt freezes the entrance too.
 };
 const finish=(now=false)=>{
  if(done)return;done=true;cancelAnimationFrame(frame);clearTimeout(deadline);events.abort();
  if(preview)played.forEach(animation=>animation.finish()); // Leaving a frozen frame settles the hero.
  enter(Infinity);intro.remove();content.forEach(el=>el.inert=false);
  // GL cleanup waits until the hero's entrance has settled, then runs when
  // the browser is idle.
  const spent=renderer,clean=()=>spent?.destroy();
  window.setTimeout(()=>'requestIdleCallback' in window?requestIdleCallback(clean):clean(),2000);
  // The page-wide restyle that resumes the marquee, glow and scrolling
  // lands a frame after the loader leaves, not in the same frame.
  const release=()=>{delete root.dataset.intro;delete root.dataset.introPreview;delete root.dataset.introRevealing;};
  if(now||document.hidden)release();else requestAnimationFrame(release);
 };
 const options={signal:events.signal};
 window.addEventListener('keydown',e=>{if(e.key==='Escape')finish();},options);
 window.addEventListener('intro:timeout',()=>finish(),options);window.addEventListener('pagehide',()=>finish(true),options);
 document.addEventListener('visibilitychange',()=>{if(document.hidden)finish();},options);
 motion.addEventListener('change',()=>{if(motion.matches)finish();},options);
 canvas.addEventListener('webglcontextlost',()=>finish(),options);
 renderer=createFoldRenderer(canvas,surface);
 if(renderer){intro.dataset.renderer='ready';renderer.draw(0);}
 else canvas.remove();
 const param=import.meta.env.DEV?new URLSearchParams(location.search).get('introAt'):null;
 const still=param===null?NaN:Number(param);
 const draw=(elapsed:number)=>{
  if(renderer&&!preview&&elapsed>=INTRO_TIMING.revealStart-300)prepare();
  if(renderer&&elapsed>=INTRO_TIMING.revealStart)enter(elapsed);
  renderer?.draw(elapsed);
 };
 if(Number.isFinite(still)&&still>=0&&still<=INTRO_TIMING.duration){
  preview=true;root.dataset.introPreview='true';draw(still);
  window.addEventListener('resize',()=>{renderer?.resize();draw(still);},options);
 }else{
  deadline=window.setTimeout(finish,INTRO_TIMING.duration+800);
  window.addEventListener('resize',()=>renderer?.resize(),options);
  const start=performance.now();let last=-Infinity;
  const tick=(now:number)=>{
   if(done)return;const elapsed=now-start;
   if(elapsed>=(renderer?INTRO_TIMING.duration:700)){finish();return;}
   if(now-last>=1000/60-1){draw(elapsed);last=now;}
   frame=requestAnimationFrame(tick);
  };
  frame=requestAnimationFrame(tick);
 }
 if(import.meta.hot)import.meta.hot.dispose(finish);
}
