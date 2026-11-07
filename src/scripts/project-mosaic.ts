import { createPageScope } from "./page-scope.ts";
import { setupProjectArtMotion } from "./project-art-motion.ts";
import { setupProjectTextEntrance } from "./text-entrance.ts";

/** Reveal each card when it enters the viewport, after the intro releases the page. */
export function setupProjectMosaic(root: HTMLElement) {
  const scope = createPageScope();
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const cards = root.querySelectorAll<HTMLElement>(".card");
  let inView = false;
  let started = false;
  const reflect = () => {
    root.classList.toggle("is-live", started && inView && !reduced.matches && !document.hidden);
  };
  const cardsObserver = scope.observe(new IntersectionObserver(entries => {
    let stagger = 0;
    for (const entry of entries) {
      if (!entry.isIntersecting || entry.intersectionRatio <= 0 || document.hidden) continue;
      const card = entry.target as HTMLElement;
      card.style.setProperty("--reveal-delay", `${Math.min(stagger++, 3) * 80}ms`);
      card.classList.add("is-revealed");
      cardsObserver.unobserve(card);
    }
  }, { threshold: 0, rootMargin: "0px 0px -48px 0px" }));
  const sectionObserver = scope.observe(new IntersectionObserver(entries => {
    inView = entries.some(entry => entry.isIntersecting);
    reflect();
  }));
  const refreshCards = () => {
    if (!started || document.hidden) return;
    cards.forEach(card => {
      if (card.classList.contains("is-revealed")) return;
      cardsObserver.unobserve(card);
      cardsObserver.observe(card);
    });
  };
  const start = () => {
    if (started || document.hidden || document.documentElement.classList.contains("intro-pending")) return;
    started = true;
    introObserver.disconnect();
    if (!reduced.matches) root.classList.add("is-ready");
    refreshCards();
    sectionObserver.observe(root);
    setupProjectTextEntrance(root);
    setupProjectArtMotion(root);
  };
  const introObserver = scope.observe(new MutationObserver(start));
  introObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  scope.listen(reduced, "change", () => {
    if (reduced.matches) {
      root.classList.remove("is-ready");
      cards.forEach(card => card.classList.add("is-revealed"));
      cardsObserver.disconnect();
    }
    reflect();
  });
  scope.listen(root, "focusin", event => {
    const card = (event.target as HTMLElement).closest<HTMLElement>(".card");
    if (card) {
      card.style.setProperty("--reveal-delay", "0ms");
      card.classList.add("is-revealed");
      cardsObserver.unobserve(card);
    }
  });
  scope.listen(document, "visibilitychange", () => { start(); refreshCards(); reflect(); });
  start();
}
