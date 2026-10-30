export const HERO_CYCLE_MS = 30_000;
const palettes = [
  { top:'#c6d0a6', bottom:'#a9cec4', ink:'#2b433b', muted:'#52695f', accent:'#416657', secondary:'#d0ded5', line:'#a9bfb3', marquee:'#7b9688', paper:'#f5f5ef' },
  { top:'#a9cbd9', bottom:'#e6ddb8', ink:'#243e48', muted:'#52666b', accent:'#315e6b', secondary:'#d4dfd6', line:'#a6babc', marquee:'#68858a', paper:'#f7f5ef' },
  { top:'#e4c4aa', bottom:'#cbbbd9', ink:'#463b46', muted:'#6c5b66', accent:'#75556d', secondary:'#e2d5c9', line:'#c4b2bc', marquee:'#9a7984', paper:'#f8f4ee' },
];
export function heroPaletteAt(elapsed: number) {
  const position = Math.max(0, elapsed) % HERO_CYCLE_MS / HERO_CYCLE_MS * palettes.length;
  const index = Math.floor(position);
  const eased = (1 - Math.cos(Math.PI * (position - index))) / 2;
  const from = palettes[index], to = palettes[(index + 1) % palettes.length];
  return Object.fromEntries(Object.keys(from).map(key => {
    const role = key as keyof typeof from;
    const color = [1, 3, 5].map(offset => {
      const a = parseInt(from[role].slice(offset, offset+2), 16);
      const b = parseInt(to[role].slice(offset, offset+2), 16);
      return Math.round(a + (b-a)*eased).toString(16).padStart(2, '0');
    }).join('');
    return [role, `#${color}`];
  }));
}
export function startHeroPalette(hero: HTMLElement) {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let elapsed = 0, previous = performance.now(), painted = 0;
  function paint(time: number) {
    const paused = reduced.matches || document.hidden || hero.classList.contains('motion-paused') || document.documentElement.classList.contains('intro-pending');
    if (!paused) elapsed += time - previous;
    previous = time;
    if (time - painted > 32) {
      const colors = heroPaletteAt(reduced.matches ? 0 : elapsed);
      for (const [role, value] of Object.entries(colors)) hero.style.setProperty(`--hero-${role}`, value);
      painted = time;
    }
    if (hero.isConnected) requestAnimationFrame(paint);
  }
  document.addEventListener('visibilitychange', () => { previous = performance.now(); });
  requestAnimationFrame(paint);
}
