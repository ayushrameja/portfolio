import { useEffect, useState } from "react";

type Section = "about" | "projects" | "contact";

export function useActiveSection(enabled: boolean): Section {
  const [activeSection, setActiveSection] = useState<Section>("about");

  useEffect(() => {
    if (!enabled) return;

    const sections = (["about", "projects", "contact"] as const)
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));

        const next = visible[0]?.target?.id as Section | undefined;
        if (next) setActiveSection(next);
      },
      { root: null, threshold: [0.2, 0.35, 0.5, 0.65] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [enabled]);

  return enabled ? activeSection : "about";
}
