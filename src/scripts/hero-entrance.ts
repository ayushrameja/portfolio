import { INTRO_TIMING } from './intro-timing';

/** Milliseconds into a turn when the seam crosses a fraction of the panel width.
 *  Mirrors fold-renderer: seam = mix(-.12, 1.12, smoothstep(progress)). */
export function seamTime(fraction: number) {
  const eased = Math.min(1, Math.max(0, (fraction + .12) / 1.24));
  return (.5 - Math.sin(Math.asin(1 - 2 * eased) / 3)) * INTRO_TIMING.foldTravel;
}

const targets = '.hero-header > *, .marquee-window, .hero-mosaic > *, .hero-title, .hero-description > *, .work-link, .hero-identity, .hero-actions > *';
const settle = 'cubic-bezier(.22,1,.36,1)';

/** Each hero element rises into place just after the final page uncovers it,
 *  left to right behind the seam. The page turn carries the refraction; the
 *  content only moves and fades, so the compositor runs the whole entrance
 *  without repainting anything. A negative delay joins an entrance already in
 *  progress at `elapsed`. Individual transform properties leave existing
 *  transforms intact. */
export function playHeroEntrance(hero: HTMLElement, elapsed: number) {
  const panel = hero.getBoundingClientRect();
  return Array.from(hero.querySelectorAll<HTMLElement>(targets)).flatMap(el => {
    const box = el.getBoundingClientRect();
    if (!box.width || !panel.width) return [];
    const uncovered = INTRO_TIMING.revealStart + seamTime((box.left + box.width / 2 - panel.left) / panel.width);
    const stagger = (box.top - panel.top) / panel.height * 220;
    const delay = (Number.isFinite(elapsed) ? uncovered - 120 - elapsed : 0) + stagger;
    const timing: KeyframeAnimationOptions = { duration: 650, delay, easing: settle, fill: 'backwards' };
    if (el.matches('.marquee-window')) return [el.animate({ opacity: [0, 1] }, { ...timing, duration: 900 })];
    // The discs turn into place, like the mark assembling.
    const tile = el.matches('.tile');
    const rise = el.animate([
      { opacity: 0, translate: '0 24px', scale: '.96', rotate: tile ? '-90deg' : '0deg' },
      { opacity: 1, offset: .4 },
      { opacity: 1, translate: '0 0', scale: '1', rotate: '0deg' },
    ], { ...timing, duration: tile ? 900 : 650 });
    // The photo settles inside its frame, like a camera finding focus.
    const photo = el.querySelector('img');
    if (!el.matches('.hero-portrait') || !photo) return [rise];
    return [rise, photo.animate({ scale: ['1.06', '1'] }, { ...timing, duration: 1100 })];
  });
}
