import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import { setupHeroMotion } from '../src/scripts/hero-motion.ts';
function harness(t) {
  const events=()=>({ listeners:{}, addEventListener(n,f){this.listeners[n]=f;},emit(n){this.listeners[n]?.();} });
  const reduced={...events(),matches:false};const document={...events(),hidden:false};
  const classes=new Set();
  const hero={classList:{toggle(c,on){on?classes.add(c):classes.delete(c);}}};
  let callback;const globals={document,window:{matchMedia:()=>reduced},IntersectionObserver:class{constructor(cb){callback=cb;}observe(){}}};
  for(const [key,value] of Object.entries(globals)){const old=Object.getOwnPropertyDescriptor(globalThis,key);Object.defineProperty(globalThis,key,{configurable:true,value});t.after(()=>old?Object.defineProperty(globalThis,key,old):delete globalThis[key]);}
  setupHeroMotion(hero);return {reduced,document,classes,view:on=>callback([{isIntersecting:on}])};
}
test('hero motion pauses offscreen and in hidden tabs without requiring a button',t=>{
 const h=harness(t);assert.equal(h.classes.has('motion-paused'),false);
 h.view(false);assert.ok(h.classes.has('motion-paused'));h.view(true);assert.equal(h.classes.has('motion-paused'),false);
 h.document.hidden=true;h.document.emit('visibilitychange');assert.ok(h.classes.has('motion-paused'));
 h.document.hidden=false;h.document.emit('visibilitychange');assert.equal(h.classes.has('motion-paused'),false);
});
test('hero respects reduced motion when visibility changes',t=>{
 const h=harness(t);h.reduced.matches=true;h.reduced.emit('change');
 h.view(false);h.view(true);assert.ok(h.classes.has('motion-paused'));
 h.reduced.matches=false;h.reduced.emit('change');assert.equal(h.classes.has('motion-paused'),false);
});
test('hero no longer renders a manual motion control',()=>{
 const source=readFileSync(new URL('../src/components/Hero.astro',import.meta.url),'utf8');
 assert.doesNotMatch(source,/data-hero-motion-toggle|hero-motion-toggle/);
});
