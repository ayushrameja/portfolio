"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export type PaletteName = "paper" | "mist" | "ink" | "sand" | "cobalt";

export default function PaletteObserver() {
  const pathname = usePathname();

  useEffect(() => {
    let sections: HTMLElement[] = [];

    const setPalette = (section: HTMLElement) => {
      document.documentElement.dataset.activePalette =
        (section.dataset.palette as PaletteName | undefined) ?? "paper";
    };

    const setPaletteAtViewportMidpoint = () => {
      const midpoint = window.innerHeight / 2;
      const active = sections.findLast((section) => {
        const bounds = section.getBoundingClientRect();
        return bounds.top <= midpoint && bounds.bottom >= midpoint;
      });
      if (active) setPalette(active);
    };

    let observer: IntersectionObserver | null = null;
    const observeMidpoint = () => {
      observer?.disconnect();
      sections = Array.from(
        document.querySelectorAll<HTMLElement>("[data-palette]"),
      );
      if (!sections.length) return;
      const midpointInset = Math.max(0, window.innerHeight / 2 - 1);
      observer = new IntersectionObserver(setPaletteAtViewportMidpoint, {
        rootMargin: `-${midpointInset}px 0px -${midpointInset}px 0px`,
        threshold: 0,
      });
      sections.forEach((section) => observer?.observe(section));
      setPaletteAtViewportMidpoint();
    };

    observeMidpoint();
    window.addEventListener("resize", observeMidpoint);
    const mutationObserver = new MutationObserver(observeMidpoint);
    mutationObserver.observe(document.body, { childList: true, subtree: true });
    return () => {
      observer?.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener("resize", observeMidpoint);
    };
  }, [pathname]);

  return null;
}
