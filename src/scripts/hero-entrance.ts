import { INTRO_TIMING } from './intro-timing';

/** Milliseconds into a turn when the seam crosses a fraction of the panel width.
 *  Mirrors fold-renderer: seam = mix(-.12, 1.12, smoothstep(progress)). */
export function seamTime(fraction: number) {
  const eased = Math.min(1, Math.max(0, (fraction + .12) / 1.24));
  return (.5 - Math.sin(Math.asin(1 - 2 * eased) / 3)) * INTRO_TIMING.foldTravel;
}

const targets = '.hero-header > *, .marquee-window, .hero-mosaic > *, .hero-title, .hero-description > *, .work-link, .hero-identity, .hero-actions > *';
const settle = 'cubic-bezier(.22,1,.36,1)';

/** A column of smooth one-dimensional gradient noise, baked once. The lens
 *  only varies down the element, so a 1px-wide image stretched across the
 *  filter region replaces feTurbulence, which recomputed the same noise on
 *  every repaint. Red carries the sideways throw around a neutral 50%. */
function waveMap(rows: number, cells: number, seed: number) {
  let state = seed;
  const random = () => (state = (state * 1664525 + 1013904223) >>> 0) / 2 ** 32 * 2 - 1;
  const slopes = Array.from({ length: Math.ceil(cells) + 2 }, random);
  const canvas = document.createElement('canvas');
  canvas.width = 1; canvas.height = rows;
  const ctx = canvas.getContext('2d')!;
  const image = ctx.createImageData(1, rows);
  for (let row = 0; row < rows; row++) {
    const x = (row + .5) / rows * cells, i = Math.floor(x), t = x - i;
    const fade = t * t * t * (t * (t * 6 - 15) + 10);
    const noise = slopes[i] * t + (slopes[i + 1] * (t - 1) - slopes[i] * t) * fade;
    // Scaled to feTurbulence's spread after the old 2R − .5 remap.
    image.data.set([Math.round(255 * Math.min(1, Math.max(0, .5 + noise * 2.2))), 128, 0, 255], row * 4);
  }
  ctx.putImageData(image, 0, 0);
  return canvas.toDataURL();
}

/** The loader's lens, rebuilt for live elements: a liquid sideways wobble, a
 *  short smear, and red/blue fringes that close up as the lens leaves. The three channels
 *  recombine exactly once every strength reaches zero. */
function lensFilter(id: string, map: string, margin: number) {
  return `<filter id="${id}" x="${-margin}%" y="-4%" width="${100 + margin * 2}%" height="108%" color-interpolation-filters="sRGB">
    <feImage href="${map}" preserveAspectRatio="none" result="wave"/>
    <feDisplacementMap in="SourceGraphic" in2="wave" scale="0" xChannelSelector="R" yChannelSelector="G"/>
    <feGaussianBlur stdDeviation="0 0" result="bent"/>
    <feColorMatrix in="bent" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"/><feOffset dx="0" result="red"/>
    <feColorMatrix in="bent" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"/><feOffset dx="0" result="blue"/>
    <feColorMatrix in="bent" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0"/>
    <feBlend in2="red" mode="screen"/><feBlend in2="blue" mode="screen"/>
  </filter>`;
}

type Target = { el: HTMLElement; index: number; uncovered: number; stagger: number; lens?: { id: string; warp: number; split: number } };

/** Measures the hero and builds its lenses ahead of the reveal, while the
 *  final page is still at rest, so the reveal's first frame only starts
 *  animations. Returns the entrance to play. */
export function prepareHeroEntrance(hero: HTMLElement) {
  const panel = hero.getBoundingClientRect();
  let filters = '';
  const items = Array.from(hero.querySelectorAll<HTMLElement>(targets)).flatMap((el, index): Target[] => {
    const box = el.getBoundingClientRect();
    if (!box.width || !panel.width) return [];
    const item: Target = {
      el, index,
      uncovered: INTRO_TIMING.revealStart + seamTime((box.left + box.width / 2 - panel.left) / panel.width),
      stagger: (box.top - panel.top) / panel.height * 220,
    };
    // The marquee spans the panel, so it only fades: no full-width filter runs.
    if (el.matches('.marquee-window')) return [item];
    const size = Math.min(box.width, box.height);
    const warp = Math.min(48, 12 + size * .3), split = Math.min(16, 5 + size * .09);
    const id = `hero-lens-${index}`;
    // About one wave per element height, so short lines slide and tall shapes bend.
    // The filter region only grows sideways, by as far as the lens can throw a pixel.
    const frequency = Math.min(.03, Math.max(.004, 1.2 / box.height));
    const rows = Math.max(2, Math.ceil(box.height * 1.08));
    filters += lensFilter(id, waveMap(rows, rows * frequency, index * 7 + 3), Math.ceil((warp / 2 + split * 3) / box.width * 100));
    item.lens = { id, warp, split };
    return [item];
  });
  document.body.insertAdjacentHTML('beforeend', `<svg width="0" height="0" aria-hidden="true" style="position:absolute">${filters}</svg>`);
  const sheet = document.body.lastElementChild!;
  return (elapsed: number) => playHeroEntrance(items, sheet, elapsed);
}

/** Each hero element resolves out of the lens just after the final page
 *  uncovers it. A negative delay joins an entrance already in progress at
 *  `elapsed`. Individual transform properties leave existing transforms intact. */
function playHeroEntrance(items: Target[], sheet: Element, elapsed: number) {
  const parts: { el: HTMLElement; id: string; animation: Animation; delay: number; warp: number; split: number; closed: number; last: number; bend: Element; smear: Element; fringes: Element[] }[] = [];
  const animations = items.map(({ el, uncovered, stagger, lens }) => {
    const delay = (Number.isFinite(elapsed) ? uncovered - 120 - elapsed : 0) + stagger;
    if (!lens) return el.animate({ opacity: [0, 1] }, { duration: 900, delay, easing: settle, fill: 'backwards' });
    // The discs also turn into place, like the mark assembling.
    const turn = el.matches('.tile') ? '-90deg' : '0deg';
    const animation = el.animate([
      { opacity: 0, translate: '22px 0', scale: '1.1 1', rotate: turn, easing: settle },
      { opacity: 1, offset: .3 },
      { opacity: 1, translate: '0 0', scale: '1 1', rotate: '0deg' },
    ], { duration: 1100, delay, fill: 'backwards' });
    const filter = sheet.querySelector(`#${lens.id}`)!;
    // Under half a pixel of throw or fringe, the lens is closed.
    const closed = .5 / Math.max(lens.warp * .4, lens.split);
    parts.push({ el, ...lens, animation, delay, closed, last: -1, bend: filter.querySelector('feDisplacementMap')!, smear: filter.querySelector('feGaussianBlur')!, fringes: Array.from(filter.querySelectorAll('feOffset')) });
    return animation;
  });
  // Strength follows each animation's own clock, so pausing (?introAt) freezes
  // the lens with it and an early finish clears it. An element only carries
  // its filter while its lens is open, which spreads the filter work out.
  // Each change repaints the element, so the lens steps at about 33 fps (also
  // on 120 Hz displays) while the compositor moves and fades it every frame.
  let stepped = -Infinity;
  const update = (now = performance.now()) => {
    if (now - stepped < 30) { requestAnimationFrame(update); return; }
    stepped = now;
    let active = false;
    for (const part of parts) {
      const state = part.animation.playState;
      if (state === 'running' || state === 'paused') active = true;
      const waiting = Number(part.animation.currentTime ?? 0) < part.delay;
      const open = waiting ? 0 : (1 - (part.animation.effect?.getComputedTiming().progress ?? 1)) ** 2;
      const strength = open < part.closed ? 0 : open;
      if (strength === part.last) continue;
      part.last = strength;
      if (strength) part.el.style.filter = `url(#${part.id})`; else part.el.style.removeProperty('filter');
      part.bend.setAttribute('scale', String(part.warp * strength));
      part.smear.setAttribute('stdDeviation', `${part.split * .6 * strength} 0`);
      part.fringes.forEach((fringe, side) => fringe.setAttribute('dx', String((side ? -1 : 1) * part.split * strength)));
    }
    if (active) requestAnimationFrame(update); else sheet.remove();
  };
  update();
  return animations;
}
