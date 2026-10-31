export const HERO_CYCLE_MS = 30_000;
export const palettes = [
  { top:'#c6d0a6', bottom:'#a9cec4', ink:'#2b433b', muted:'#3f564d', accent:'#416657', secondary:'#d0ded5', line:'#a9bfb3', marquee:'#7b9688', paper:'#f5f5ef' },
  { top:'#a9cbd9', bottom:'#e6ddb8', ink:'#243e48', muted:'#3e545c', accent:'#315e6b', secondary:'#d4dfd6', line:'#a6babc', marquee:'#68858a', paper:'#f7f5ef' },
  { top:'#e4c4aa', bottom:'#cbbbd9', ink:'#463b46', muted:'#584a55', accent:'#75556d', secondary:'#e2d5c9', line:'#c4b2bc', marquee:'#9a7984', paper:'#f8f4ee' },
];

// Registered colors animate in the browser's perceptual color space, without
// a JavaScript frame loop. The same role definitions provide the initial state.
export const heroPaletteCSS = Object.entries(palettes[0]).map(([role, value]) =>
  `@property --hero-${role} { syntax: "<color>"; inherits: true; initial-value: ${value}; }`
).join("\n") + `
@keyframes hero-palette {
  ${[...palettes, palettes[0]].map((palette, i) => `${i / palettes.length * 100}% {
    ${Object.entries(palette).map(([role, value]) => `--hero-${role}: ${value};`).join("\n")}
  }`).join("\n")}
}
.hero { animation: hero-palette ${HERO_CYCLE_MS}ms ease-in-out infinite; }
.hero.motion-paused, html.intro-pending .hero, .hero.page-hidden,
.hero.page-hidden .marquee-track { animation-play-state: paused; }
@media (prefers-reduced-motion: reduce) { .hero { animation: none; } }
`;
