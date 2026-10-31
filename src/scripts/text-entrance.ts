/** Animate whole text blocks to keep wrapping, selection and accessible names intact. */
export function setupProjectTextEntrance(root: HTMLElement) {
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const running = new Set<Animation>();
  const groups = root.querySelectorAll<HTMLElement>(".work-heading, .brand-text, .card-copy");
  const pending = new Set<Element>(groups);
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting || entry.intersectionRatio <= 0 || document.hidden) continue;
      pending.delete(entry.target);
      observer.unobserve(entry.target);
      if (reduced.matches || entry.target.contains(document.activeElement)) continue;
      const targets = entry.target.querySelectorAll<HTMLElement>(
        "#work-title, .all-projects, .brand-name, .brand-kind, h3, p",
      );
      targets.forEach((target, index) => {
        const animation = target.animate([
          { opacity: 0, transform: "translateY(20px)" },
          { opacity: 1, transform: "translateY(0)" },
        ], { duration: 750, delay: index * 110, easing: "cubic-bezier(.22,1,.36,1)", fill: "backwards" });
        running.add(animation);
        animation.onfinish = () => { running.delete(animation); animation.cancel(); };
      });
    }
  }, { threshold: 0, rootMargin: "0px 0px -40px 0px" });
  groups.forEach(group => observer.observe(group));
  const finish = () => {
    running.forEach(animation => animation.cancel());
    running.clear();
  };
  // Keyboard navigation should never land on a temporarily transparent label.
  root.addEventListener("focusin", finish);
  reduced.addEventListener("change", () => { if (reduced.matches) finish(); });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) return;
    pending.forEach(group => { observer.unobserve(group); observer.observe(group); });
  });
  window.addEventListener("pagehide", finish);
}
