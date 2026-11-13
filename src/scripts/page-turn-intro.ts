import { createFoldRenderer } from './fold-renderer';
import { INTRO_TIMING } from './intro-timing';
import { playHeroEntrance } from './hero-entrance';

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
 // The hero resolves behind the final page; an early exit still plays it in.
 const enter=(elapsed:number)=>{
  if(entered||motion.matches||(preview&&!Number.isFinite(elapsed)))return;entered=true;
  played=playHeroEntrance(surface,elapsed);
  if(preview)played.forEach(animation=>animation.pause()); // ?introAt freezes the entrance too.
 };
 const finish=()=>{
  if(done)return;done=true;cancelAnimationFrame(frame);clearTimeout(deadline);events.abort();
  if(preview)played.forEach(animation=>animation.finish()); // Leaving a frozen frame settles the hero.
  enter(Infinity);intro.remove();content.forEach(el=>el.inert=false);
  // Releasing the GL context blocks for tens of milliseconds, so it waits
  // until the hero's entrance has settled instead of stalling it.
  const spent=renderer;window.setTimeout(()=>spent?.destroy(),2000);
  delete root.dataset.intro;delete root.dataset.introPreview;delete root.dataset.introRevealing;
 };
 const options={signal:events.signal};
 window.addEventListener('keydown',e=>{if(e.key==='Escape')finish();},options);
 window.addEventListener('intro:timeout',finish,options);window.addEventListener('pagehide',finish,options);
 document.addEventListener('visibilitychange',()=>{if(document.hidden)finish();},options);
 motion.addEventListener('change',()=>{if(motion.matches)finish();},options);
 canvas.addEventListener('webglcontextlost',finish,options);
 renderer=createFoldRenderer(canvas,surface);
 if(renderer){intro.dataset.renderer='ready';renderer.draw(0);}
 else canvas.remove();
 const param=import.meta.env.DEV?new URLSearchParams(location.search).get('introAt'):null;
 const still=param===null?NaN:Number(param);
 const draw=(elapsed:number)=>{
  if(renderer&&elapsed>=INTRO_TIMING.revealStart){root.dataset.introRevealing='true';enter(elapsed);}
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
