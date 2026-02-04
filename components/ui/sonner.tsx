"use client";

import { Toaster as Sonner } from "sonner";
import { useEffect, useState } from "react";
import { THEME_CHANGE_EVENT } from "@/utils/storm";

export function Toaster() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const apply = () => {
      setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
    };

    apply();
    window.addEventListener(THEME_CHANGE_EVENT, apply as EventListener);
    return () => window.removeEventListener(THEME_CHANGE_EVENT, apply as EventListener);
  }, []);

  return (
    <Sonner
      theme={theme}
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast:
            "rounded-xl border border-zinc-200/70 bg-white text-zinc-900 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.25)] dark:border-zinc-700/60 dark:bg-zinc-800 dark:text-zinc-100 dark:shadow-[0_20px_60px_-40px_rgba(0,0,0,0.8)]",
          title: "text-sm font-semibold",
          description: "text-sm text-zinc-600 dark:text-zinc-300",
          actionButton:
            "rounded-lg bg-zinc-900 px-3 py-1.5 text-sm font-semibold text-white dark:bg-zinc-100 dark:text-zinc-900",
          cancelButton:
            "rounded-lg bg-zinc-100 px-3 py-1.5 text-sm font-semibold text-zinc-900 dark:bg-zinc-700 dark:text-zinc-50",
        },
      }}
    />
  );
}

