/** Keep background motion optional and idle while the hero is offscreen. */
export function setupHeroMotion(hero: HTMLElement) {
  const toggle = hero.querySelector<HTMLButtonElement>("[data-hero-motion-toggle]");
  if (!toggle) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  let paused = false;
  let visible = true;
  const sync = () => {
    hero.classList.toggle("motion-paused", paused || !visible || document.hidden);
    if (reduced.matches && document.activeElement === toggle) hero.querySelector<HTMLElement>(".menu-toggle")?.focus();
    toggle.hidden = reduced.matches;
    const label = paused ? "Resume background animation" : "Pause background animation";
    toggle.setAttribute("aria-label", label);
    toggle.setAttribute("title", label);
    toggle.setAttribute("aria-pressed", String(paused));
  };
  const observer = new IntersectionObserver(entries => {
    visible = entries.some(entry => entry.isIntersecting);
    sync();
  });
  observer.observe(hero);
  toggle.addEventListener("click", () => { paused = !paused; sync(); });
  reduced.addEventListener("change", sync);
  document.addEventListener("visibilitychange", sync);
  sync();
}
