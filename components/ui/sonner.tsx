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
            "rounded-[4px] border border-[var(--rule-strong)] bg-[var(--paper-raised)] text-[var(--ink)] shadow-[0_18px_40px_rgba(0,0,0,0.16)]",
          title: "text-sm font-semibold",
          description: "text-sm text-[var(--muted)]",
          actionButton:
            "rounded-[3px] bg-[var(--ink)] px-3 py-1.5 text-sm font-semibold text-[var(--paper)]",
          cancelButton:
            "rounded-[3px] border border-[var(--rule)] bg-[var(--paper)] px-3 py-1.5 text-sm font-semibold text-[var(--ink)]",
        },
      }}
    />
  );
}
