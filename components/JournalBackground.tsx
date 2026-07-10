"use client";

import { useEffect, useRef } from "react";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export default function JournalBackground() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia(REDUCED_MOTION_QUERY).matches) return;

    const handlePointerMove = (event: PointerEvent) => {
      const x = ((event.clientX / window.innerWidth) - 0.5) * 12;
      const y = ((event.clientY / window.innerHeight) - 0.5) * 12;
      root.style.setProperty("--journal-x", `${x}px`);
      root.style.setProperty("--journal-y", `${y}px`);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return (
    <div ref={rootRef} className="journal-background" aria-hidden>
      <span className="journal-registration journal-registration-a" />
      <span className="journal-registration journal-registration-b" />
      <span className="journal-registration journal-registration-c" />
    </div>
  );
}
