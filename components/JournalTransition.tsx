"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

import {
  JOURNAL_TRIGGER_EVENT,
  THEME_CHANGE_EVENT,
  type JournalTriggerDetail,
  type ThemeMode,
} from "@/utils/storm";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

const applyTheme = (theme: ThemeMode) => {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
  window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
};

export default function JournalTransition() {
  const [active, setActive] = useState<JournalTriggerDetail | null>(null);
  const endTimer = useRef<number | null>(null);
  const themeTimer = useRef<number | null>(null);

  const runTransition = useCallback((detail: JournalTriggerDetail) => {
    if (window.matchMedia(REDUCED_MOTION_QUERY).matches) {
      if (detail.theme) applyTheme(detail.theme);
      return;
    }

    if (endTimer.current) window.clearTimeout(endTimer.current);
    if (themeTimer.current) window.clearTimeout(themeTimer.current);

    setActive(detail);

    if (detail.theme) {
      themeTimer.current = window.setTimeout(() => applyTheme(detail.theme!), 240);
    }

    endTimer.current = window.setTimeout(() => setActive(null), 540);
  }, []);

  useEffect(() => {
    const handleTransition = (event: Event) => {
      runTransition((event as CustomEvent<JournalTriggerDetail>).detail ?? {});
    };

    window.addEventListener(JOURNAL_TRIGGER_EVENT, handleTransition as EventListener);
    return () => {
      window.removeEventListener(JOURNAL_TRIGGER_EVENT, handleTransition as EventListener);
      if (endTimer.current) window.clearTimeout(endTimer.current);
      if (themeTimer.current) window.clearTimeout(themeTimer.current);
    };
  }, [runTransition]);

  return (
    <AnimatePresence>
      {active ? (
        <motion.div
          key={`${active.cause}-${active.number}-${active.label}`}
          className="fixed inset-0 z-[80] flex items-center bg-[var(--paper)] text-[var(--ink)]"
          initial={{ clipPath: "inset(100% 0 0 0)" }}
          animate={{ clipPath: "inset(0 0 0 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden
        >
          <div className="journal-container">
            <div className="border-y journal-rule py-5 font-mono text-xs uppercase text-[var(--muted)]">
              {active.cause === "theme" ? "Changing edition" : "Opening chapter"}
            </div>
            <div className="flex items-end justify-between gap-6 py-7">
              <p className="font-serif text-5xl leading-none sm:text-7xl">
                {active.label ?? "Field Journal"}
              </p>
              <p className="font-mono text-sm text-[var(--vermilion)]">
                {active.number ?? "AR / 26"}
              </p>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
