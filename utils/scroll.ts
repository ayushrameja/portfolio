import type Lenis from "lenis";

export function scrollToTarget(id: string, lenis?: Lenis) {
  const target = `#${id.toLowerCase()}`;
  if (lenis) {
    lenis.scrollTo(target);
  } else {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  }
}
