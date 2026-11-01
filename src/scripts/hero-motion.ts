/** Idle background motion offscreen, in hidden tabs and for reduced motion. */
export function setupHeroMotion(hero: HTMLElement) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  let visible = true;
  const sync = () => {
    hero.classList.toggle("motion-paused", reduced.matches || !visible || document.hidden);
  };
  const observer = new IntersectionObserver(entries => {
    visible = entries.some(entry => entry.isIntersecting);
    sync();
  });
  observer.observe(hero);
  reduced.addEventListener("change", sync);
  document.addEventListener("visibilitychange", sync);
  sync();
}
