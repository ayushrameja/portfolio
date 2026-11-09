import { createFoldRenderer } from './fold-renderer';
import { INTRO_TIMING } from './intro-timing';

/** The intro and static hero share one rounded surface, with no moving frame. */
export function startPageTurnIntro() {
 const root=document.documentElement;
 const intro=document.querySelector<HTMLElement>('[data-page-turn-intro]');
 const canvas=intro?.querySelector('canvas');
 const panel=intro?.parentElement;
 const skip=intro?.querySelector<HTMLButtonElement>('[data-intro-skip]');
 const motion=matchMedia('(prefers-reduced-motion: reduce)');
 if(!intro||!canvas||!panel||!skip)return;
 if(root.dataset.intro!=='pending'||motion.matches||document.hidden){delete root.dataset.intro;intro.remove();return;}
 const content=Array.from(panel.children).filter((el):el is HTMLElement=>el instanceof HTMLElement&&el!==intro);
 content.forEach(el=>el.inert=true);
 const events=new AbortController();
 let frame=0,done=false;
 let renderer:ReturnType<typeof createFoldRenderer>=null;
 let deadline=0;
 const finish=()=>{
  if(done)return;done=true;cancelAnimationFrame(frame);clearTimeout(deadline);events.abort();
  const focused=intro.contains(document.activeElement);
  renderer?.destroy();intro.remove();content.forEach(el=>el.inert=false);
  delete root.dataset.intro;delete root.dataset.introPreview;delete root.dataset.introRevealing;
  if(focused)document.getElementById('hero')?.focus({preventScroll:true});
 };
 const options={signal:events.signal};
 skip.addEventListener('click',finish,options);
 window.addEventListener('keydown',e=>{if(e.key==='Escape')finish();},options);
 window.addEventListener('intro:timeout',finish,options);window.addEventListener('pagehide',finish,options);
 document.addEventListener('visibilitychange',()=>{if(document.hidden)finish();},options);
 motion.addEventListener('change',()=>{if(motion.matches)finish();},options);
 canvas.addEventListener('webglcontextlost',finish,options);
 renderer=createFoldRenderer(canvas);
 if(renderer){intro.dataset.renderer='ready';renderer.draw(0);}
 else canvas.remove();
 const param=import.meta.env.DEV?new URLSearchParams(location.search).get('introAt'):null;
 const still=param===null?NaN:Number(param);
 const draw=(elapsed:number)=>{
  if(renderer&&elapsed>=INTRO_TIMING.revealStart)root.dataset.introRevealing='true';
  renderer?.draw(elapsed);
 };
 if(Number.isFinite(still)&&still>=0&&still<=INTRO_TIMING.duration){
  root.dataset.introPreview='true';draw(still);
  if(still>=500)intro.dataset.started='true';
  window.addEventListener('resize',()=>{renderer?.resize();draw(still);},options);
 }else{
  deadline=window.setTimeout(finish,INTRO_TIMING.duration+800);
  window.addEventListener('resize',()=>renderer?.resize(),options);
  const start=performance.now();let last=-Infinity;
  const tick=(now:number)=>{
   if(done)return;const elapsed=now-start;
   if(elapsed>=(renderer?INTRO_TIMING.duration:700)){finish();return;}
   if(elapsed>=500)intro.dataset.started='true';
   if(now-last>=1000/60-1){draw(elapsed);last=now;}
   frame=requestAnimationFrame(tick);
  };
  frame=requestAnimationFrame(tick);
 }
 if(import.meta.hot)import.meta.hot.dispose(finish);
}
