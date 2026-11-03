import { createPageScope } from "./page-scope.ts";
import Lenis from "lenis";

type ScrollState = { introPending: boolean; reduced: boolean; hidden: boolean };

// One instance only, and no wheel interception while loading or motion is reduced.
export function createScrollLifecycle(create: () => { destroy(): void }) {
  let instance: { destroy(): void } | undefined;
  return {
    update({ introPending, reduced, hidden }: ScrollState) {
      if (introPending || reduced || hidden) {
        instance?.destroy();
        instance = undefined;
      } else if (!instance) {
        instance = create();
      }
    },
  };
}

export function setupPageScroll() {
  const scope = createPageScope();
  const root = document.documentElement;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const lifecycle = createScrollLifecycle(() => new Lenis({
    autoRaf: true,
    lerp: 0.1,
    smoothWheel: true,
    syncTouch: false,
    anchors: true,
    prevent: node => node.id === "hero-menu",
  }));
  const reflect = () => lifecycle.update({
    introPending: root.classList.contains("intro-pending"),
    reduced: reduced.matches,
    hidden: document.hidden,
  });
  scope.add(() => lifecycle.update({ introPending: false, reduced: false, hidden: true }));
  const observer = scope.observe(new MutationObserver(reflect));
  observer.observe(root, { attributes: true, attributeFilter: ["class"] });
  scope.listen(reduced, "change", reflect);
  scope.listen(document, "visibilitychange", reflect);
  scope.listen(window, "pagehide", () => lifecycle.update({ introPending: false, reduced: false, hidden: true }));
  scope.listen(window, "pageshow", reflect);
  reflect();
}
