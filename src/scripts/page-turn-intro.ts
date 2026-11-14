import { createFoldRenderer } from './fold-renderer';
import { INTRO_TIMING } from './intro-timing';
import { playHeroEntrance } from './hero-entrance';
import { introReturnTarget } from './intro-return';

/** Stretches where no frame changes: the first letter at rest, the second at
 *  rest, and the moment after the reveal. Each is drawn once. */
function rest(ms:number){
 if(ms>=INTRO_TIMING.logoIn&&ms<INTRO_TIMING.foldStart)return 1;
 if(ms>=INTRO_TIMING.foldStart+INTRO_TIMING.foldTravel&&ms<INTRO_TIMING.revealStart)return 2;
 if(ms>=INTRO_TIMING.revealStart+INTRO_TIMING.foldTravel)return 3;
 return 0;
}

/** The intro paints a rounded panel, turns two pages, then uncovers the page.
 *  On the home page the panel is the hero; elsewhere it is a fixed frame over
 *  the viewport, so a refresh shows it wherever the page is scrolled. */
export function startPageTurnIntro() {
 const root=document.documentElement;
 const intro=document.querySelector<HTMLElement>('[data-page-turn-intro]');
 const canvas=intro?.querySelector('canvas');
 const panel=intro?.closest<HTMLElement>('.hero-frame, .page-turn-frame');
 const hero=panel?.querySelector<HTMLElement>('.hero')??null;
 const surface=hero??panel?.querySelector<HTMLElement>('.page-turn-surface');
 const motion=matchMedia('(prefers-reduced-motion: reduce)');
 if(!intro||!canvas||!panel||!surface)return;
 const leave=()=>{intro.remove();if(!hero)panel.remove();};
 if(root.dataset.intro!=='pending'||motion.matches||document.hidden){delete root.dataset.intro;introReturnTarget();leave();return;}
 // The hero's own content waits under the loader; elsewhere the whole page does.
 const content=Array.from(hero?panel.children:document.body.children).filter((el):el is HTMLElement=>el instanceof HTMLElement&&el!==intro&&el!==panel);
 content.forEach(el=>el.inert=true);
 // The home loader lives in the hero, so it plays from the top of the page.
 if(hero)window.scrollTo(0,0);
 const events=new AbortController();
 let frame=0,done=false;
 let renderer:ReturnType<typeof createFoldRenderer>=null;
 let deadline=0,preview=false,entered=false;
 let played:Animation[]=[];
 // The hero rises in behind the final page; an early exit still plays it in.
 const enter=(elapsed:number)=>{
  if(entered||!hero||motion.matches||(preview&&!Number.isFinite(elapsed)))return;entered=true;
  played=playHeroEntrance(hero,elapsed);
  if(preview)played.forEach(animation=>animation.pause()); // ?introAt freezes the entrance too.
 };
 const finish=(now=false)=>{
  if(done)return;done=true;cancelAnimationFrame(frame);clearTimeout(deadline);events.abort();
  if(preview)played.forEach(animation=>animation.finish()); // Leaving a frozen frame settles the hero.
  enter(Infinity);leave();content.forEach(el=>el.inert=false);
  if(hero&&'scrollRestoration' in history)history.scrollRestoration='auto';
  // GL cleanup waits until the hero's entrance has settled, then runs when
  // the browser is idle.
  const spent=renderer,clean=()=>spent?.destroy();
  window.setTimeout(()=>'requestIdleCallback' in window?requestIdleCallback(clean):clean(),2000);
  // The page-wide restyle that resumes the marquee, glow and scrolling
  // lands a frame after the loader leaves, not in the same frame. The scroll
  // story glides back to a refreshed position; without it, jump there.
  const release=()=>{
   delete root.dataset.intro;delete root.dataset.introPreview;delete root.dataset.introRevealing;
   if(root.hasAttribute('data-reveal-live'))return;
   const target=introReturnTarget();
   if(typeof target==='number')window.scrollTo(0,target);else target?.scrollIntoView();
  };
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
 // The hero's entrance starts just before the reveal, while the final page is
 // at rest, so each element is on its own layer before it moves.
 const reveal=(elapsed:number)=>{
  if(renderer&&elapsed>=INTRO_TIMING.revealStart-(hero?300:0)){root.dataset.introRevealing='true';enter(elapsed);}
 };
 if(Number.isFinite(still)&&still>=0&&still<=INTRO_TIMING.duration){
  preview=true;root.dataset.introPreview='true';reveal(still);renderer?.draw(still);
  window.addEventListener('resize',()=>{renderer?.resize();renderer?.draw(still);},options);
 }else{
  deadline=window.setTimeout(finish,INTRO_TIMING.duration+800);
  let drawn=-1;
  window.addEventListener('resize',()=>{renderer?.resize();drawn=-1;},options);
  const start=performance.now();let last=-Infinity;
  const tick=(now:number)=>{
   if(done)return;const elapsed=now-start;
   if(elapsed>=(renderer?INTRO_TIMING.duration:700)){finish();return;}
   reveal(elapsed);
   const key=rest(elapsed);
   if(now-last>=1000/60-1&&(!key||key!==drawn)){renderer?.draw(elapsed);drawn=key;last=now;}
   frame=requestAnimationFrame(tick);
  };
  frame=requestAnimationFrame(tick);
 }
 if(import.meta.hot)import.meta.hot.dispose(finish);
}
