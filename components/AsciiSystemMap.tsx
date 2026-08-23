"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const frames = [
  String.raw`┌────────┐       ┌────────┐       ┌────────┐
│   UI   │ ───→  │  API   │      │ CLOUD  │
└────────┘       └────────┘       └────────┘
     build          connect          scale`,
  String.raw`┌────────┐       ┌────────┐       ┌────────┐
│   UI   │      │  API   │ ───→  │ CLOUD  │
└────────┘       └────────┘       └────────┘
     build          connect          scale`,
  String.raw`┌────────┐       ┌────────┐       ┌────────┐
│   UI   │      │  API   │      │ CLOUD  │
└────────┘       └────────┘       └────────┘
     build          connect       ←─ scale`,
  String.raw`┌────────┐       ┌────────┐       ┌────────┐
│   UI   │      │  API   │  ←──  │ CLOUD  │
└────────┘       └────────┘       └────────┘
     build          connect          scale`,
  String.raw`┌────────┐       ┌────────┐       ┌────────┐
│   UI   │  ←──  │  API   │      │ CLOUD  │
└────────┘       └────────┘       └────────┘
     build          connect          scale`,
] as const;

const mobileFrames = [
  String.raw`┌────────┐
│   UI   │
└────────┘
     │
     ↓
┌────────┐
│  API   │
└────────┘
     ·
     ·
┌────────┐
│ CLOUD  │
└────────┘`,
  String.raw`┌────────┐
│   UI   │
└────────┘
     ·
     ·
┌────────┐
│  API   │
└────────┘
     │
     ↓
┌────────┐
│ CLOUD  │
└────────┘`,
  String.raw`┌────────┐
│   UI   │
└────────┘
     ·
     ·
┌────────┐
│  API   │
└────────┘
     ↑
     │
┌────────┐
│ CLOUD  │
└────────┘`,
  String.raw`┌────────┐
│   UI   │
└────────┘
     ↑
     │
┌────────┐
│  API   │
└────────┘
     ·
     ·
┌────────┐
│ CLOUD  │
└────────┘`,
  String.raw`┌────────┐
│   UI   │
└────────┘
     │
     ↓
┌────────┐
│  API   │
└────────┘
     ·
     ·
┌────────┐
│ CLOUD  │
└────────┘`,
] as const;

export default function AsciiSystemMap({ label = "Systems in motion" }: { label?: string }) {
  const reducedMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const [frame, setFrame] = useState(0);
  const [active, setActive] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);

  useEffect(() => {
    if (!rootRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(rootRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateVisibility = () => setPageVisible(!document.hidden);
    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    return () => document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  useEffect(() => {
    if (reducedMotion || !active || !pageVisible) return;
    const timer = window.setInterval(
      () => setFrame((current) => (current + 1) % frames.length),
      120,
    );
    return () => window.clearInterval(timer);
  }, [active, pageVisible, reducedMotion]);

  return (
    <div ref={rootRef} className="ascii-system-map">
      <p className="sr-only" role="status">{label}</p>
      <pre className="ascii-system-map__wide" aria-hidden="true">
        {frames[reducedMotion ? 0 : frame]}
      </pre>
      <pre className="ascii-system-map__narrow" aria-hidden="true">
        {mobileFrames[reducedMotion ? 0 : frame]}
      </pre>
    </div>
  );
}
