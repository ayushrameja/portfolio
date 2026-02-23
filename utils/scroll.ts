import type Lenis from "lenis";

export function scrollToTarget(id: string, lenis?: Lenis, offset?: number) {
  if (typeof document === "undefined") return;

  const safeId = typeof CSS !== "undefined" && CSS.escape ? CSS.escape(id) : id;
  const target = `#${safeId}`;

  if (lenis) {
    lenis.scrollTo(target, { offset });
  } else {
    const element = document.getElementById(id);
    if (!element) return;

    const top = element.getBoundingClientRect().top + window.pageYOffset - (offset || 0);
    window.scrollTo({ top, behavior: "smooth" });
  }
}
