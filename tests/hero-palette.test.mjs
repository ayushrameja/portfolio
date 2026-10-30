import assert from 'node:assert/strict';
import { test } from 'node:test';
import { heroPaletteAt, HERO_CYCLE_MS } from '../src/scripts/hero-palette.ts';
test('hero palette loops continuously over 30 seconds and keeps every surface role', () => {
 assert.equal(HERO_CYCLE_MS, 30000);
 const first = heroPaletteAt(0);
 assert.deepEqual(heroPaletteAt(HERO_CYCLE_MS), first);
 assert.deepEqual(heroPaletteAt(HERO_CYCLE_MS-1), first);
 assert.deepEqual(heroPaletteAt(-1), first);
 for (let ms=0;ms<=HERO_CYCLE_MS;ms+=1000) {
   const c=heroPaletteAt(ms);
   assert.deepEqual(Object.keys(c), ['top','bottom','ink','muted','accent','secondary','line','marquee','paper']);
   for (const hex of Object.values(c)) assert.match(hex, /^#[0-9a-f]{6}$/);
 }
 assert.notDeepEqual(heroPaletteAt(10000), first);
 assert.notDeepEqual(heroPaletteAt(20000), first);
});
