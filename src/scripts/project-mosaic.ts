/**
 * Selected-work bento behaviour.
 *
 * All motion is CSS (transform/opacity only). This script only flips classes:
 * - `is-ready`   → enables the one-time entrance reveal (no-JS keeps cards visible)
 * - `is-in`      → section has entered the viewport; cards reveal with a stagger
 * - `is-live`    → ambient loops may run (in view, tab visible, motion allowed)
 */
export function setupProjectMosaic(root: HTMLElement) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  let inView = false;

  function reflect() {
    const live = inView && !reduced.matches && !document.hidden;
    root.classList.toggle("is-live", live);

  }

  if (!reduced.matches) root.classList.add("is-ready");

  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      inView = entry.isIntersecting;
      if (inView) root.classList.add("is-in");
    }
    reflect();
  }, { threshold: 0.12 });
  observer.observe(root);

  reduced.addEventListener("change", () => {
    if (reduced.matches) root.classList.remove("is-ready");
    reflect();
  });
  document.addEventListener("visibilitychange", reflect);
  reflect();
}
