import assert from 'node:assert/strict';
import { test } from 'node:test';
import { setupHeroMotion } from '../src/scripts/hero-motion.ts';
function harness(t) {
  const events=()=>({ listeners:{}, addEventListener(n,f){this.listeners[n]=f;},emit(n){this.listeners[n]?.();} });
  const toggle={...events(),hidden:true,attrs:{},setAttribute(n,v){this.attrs[n]=v;}};
  const reduced={...events(),matches:false};const document={...events(),hidden:false,activeElement:null};
  const menu={focus(){document.activeElement=menu;}};const classes=new Set();
  const hero={querySelector:s=>s==='.menu-toggle'?menu:toggle,classList:{toggle(c,on){on?classes.add(c):classes.delete(c);}}};
  let callback;const globals={document,window:{matchMedia:()=>reduced},IntersectionObserver:class{constructor(cb){callback=cb;}observe(){}}};
  for(const [key,value] of Object.entries(globals)){const old=Object.getOwnPropertyDescriptor(globalThis,key);Object.defineProperty(globalThis,key,{configurable:true,value});t.after(()=>old?Object.defineProperty(globalThis,key,old):delete globalThis[key]);}
  setupHeroMotion(hero);return {toggle,reduced,document,menu,classes,view:on=>callback([{isIntersecting:on}])};
}
test('hero motion pauses offscreen and in hidden tabs, then resumes',t=>{
 const h=harness(t);assert.equal(h.toggle.hidden,false);
 h.view(false);assert.ok(h.classes.has('motion-paused'));h.view(true);assert.equal(h.classes.has('motion-paused'),false);
 h.document.hidden=true;h.document.emit('visibilitychange');assert.ok(h.classes.has('motion-paused'));
 h.document.hidden=false;h.document.emit('visibilitychange');assert.equal(h.classes.has('motion-paused'),false);
});
test('hero user pause survives leaving and returning to the viewport',t=>{
 const h=harness(t);h.toggle.emit('click');h.view(false);h.view(true);
 assert.ok(h.classes.has('motion-paused'));assert.equal(h.toggle.attrs['aria-pressed'],'true');assert.equal(h.toggle.attrs['aria-label'],'Resume background animation');
 h.toggle.emit('click');assert.equal(h.classes.has('motion-paused'),false);
});
test('reduced-motion change hides the control and preserves keyboard focus',t=>{
 const h=harness(t);h.document.activeElement=h.toggle;h.reduced.matches=true;h.reduced.emit('change');
 assert.equal(h.toggle.hidden,true);assert.equal(h.document.activeElement,h.menu);
});
