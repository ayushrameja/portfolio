"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { triggerJournalTransition, THEME_CHANGE_EVENT } from "@/utils/storm";

type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

export default function ThemeToggle() {
  const getCurrentTheme = (): Theme => {
    if (typeof document === "undefined") return "light";
    return document.documentElement.classList.contains("dark") ? "dark" : "light";
  };

  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const sync = () => setTheme(getCurrentTheme());
    sync();
    window.addEventListener(THEME_CHANGE_EVENT, sync as EventListener);
    return () => window.removeEventListener(THEME_CHANGE_EVENT, sync as EventListener);
  }, []);

  const toggle = () => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    try {
      localStorage.setItem(STORAGE_KEY, nextTheme);
    } catch {}
    triggerJournalTransition({
      cause: "theme",
      theme: nextTheme,
      number: nextTheme === "dark" ? "NIGHT" : "PAPER",
      label: nextTheme === "dark" ? "Night Shift" : "Paper Edition",
    });
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex h-9 w-9 items-center justify-center rounded-[4px] border border-[var(--rule)] bg-[var(--paper-raised)] text-[var(--ink)] transition hover:border-[var(--cobalt)] hover:text-[var(--cobalt)]"
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      title={theme === "dark" ? "Light theme" : "Dark theme"}
    >
      {theme === "dark" ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
    </button>
  );
}
