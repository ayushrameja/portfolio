import assert from 'node:assert/strict';
import { test } from 'node:test';
import { palettes, heroPaletteCSS, HERO_CYCLE_MS } from '../src/scripts/hero-palette.ts';
const luminance = hex => {
 const [r,g,b] = hex.match(/[0-9a-f]{2}/g).map(v => parseInt(v,16)/255).map(v => v <= .04045 ? v/12.92 : ((v+.055)/1.055)**2.4);
 return .2126*r + .7152*g + .0722*b;
};
const contrast = (a,b) => (Math.max(luminance(a),luminance(b))+.05)/(Math.min(luminance(a),luminance(b))+.05);
test('all hero palettes provide AA text and button labels', () => {
 for (const palette of palettes) {
   for (const background of ['top','bottom']) {
     for (const role of ['ink','muted']) assert.ok(contrast(palette[role],palette[background]) >= 4.5, `${role} on ${background}`);
   }
   assert.ok(contrast(palette.paper,palette.accent) >= 4.5);
 }
});
test('declarative palette covers every role, loops, and respects motion controls', () => {
 assert.equal(HERO_CYCLE_MS,30000);
 for (const role of Object.keys(palettes[0])) assert.ok(heroPaletteCSS.includes(`@property --hero-${role}`));
 assert.match(heroPaletteCSS,/100%/);
 assert.match(heroPaletteCSS,/prefers-reduced-motion: reduce/);
 assert.match(heroPaletteCSS,/intro-pending/);
 assert.match(heroPaletteCSS,/page-hidden/);
 assert.match(heroPaletteCSS,/motion-paused/);
});
