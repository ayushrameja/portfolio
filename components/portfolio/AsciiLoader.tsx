"use client";

import { useEffect, useRef, useState } from "react";

const faces = [
  ".-------.\n| ^   ^ |\n|   u   |\n'-------'",
  ".-------.\n| -   - |\n|   u   |\n'-------'",
  ".-------.\n| o   o |\n|   o   |\n'-------'",
  ".-------.\n| >   ^ |\n|   w   |\n'-------'",
];

/** Only mounted while real work is pending. Never delays navigation. */
export default function AsciiLoader({
  label = "Loading…",
}: {
  label?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [frame, setFrame] = useState(0);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    let timer: ReturnType<typeof setInterval> | undefined;
    const sync = () => {
      clearInterval(timer);
      if (visible && !document.hidden && !media.matches) {
        timer = setInterval(
          () => setFrame((value) => (value + 1) % faces.length),
          360,
        );
      } else setFrame(0);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    if (ref.current) observer.observe(ref.current);
    document.addEventListener("visibilitychange", sync);
    media.addEventListener("change", sync);
    return () => {
      clearInterval(timer);
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      media.removeEventListener("change", sync);
    };
  }, []);
  return (
    <div ref={ref} className="ascii-loader" role="status">
      <pre aria-hidden="true">{faces[frame]}</pre>
      <span>{label}</span>
    </div>
  );
}
