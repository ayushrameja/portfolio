import { createPageScope } from "./page-scope.ts";
/** Idle background motion offscreen, in hidden tabs and for reduced motion. */
export function setupHeroMotion(hero: HTMLElement) {
  const scope = createPageScope();
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  let visible = true;
  const sync = () => {
    hero.classList.toggle("motion-paused", reduced.matches || !visible || document.hidden);
  };
  const observer = scope.observe(new IntersectionObserver(entries => {
    visible = entries.some(entry => entry.isIntersecting);
    sync();
  }));
  observer.observe(hero);
  scope.listen(reduced, "change", sync);
  scope.listen(document, "visibilitychange", sync);
  sync();
}
