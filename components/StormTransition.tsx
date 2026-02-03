"use client";

import { useCallback, useEffect, useRef } from "react";
import { STORM_TRIGGER_EVENT, THEME_CHANGE_EVENT, StormTriggerDetail, ThemeMode } from "@/utils/storm";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia?.(REDUCED_MOTION_QUERY)?.matches;

const applyTheme = (nextTheme: ThemeMode) => {
  if (nextTheme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
  try {
    localStorage.setItem("theme", nextTheme);
  } catch {}
  window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
};

const setStorming = (value: boolean) => {
  if (typeof document === "undefined") return;
  if (value) {
    document.documentElement.dataset.storming = "true";
  } else {
    document.documentElement.removeAttribute("data-storming");
  }
};

export default function StormTransition() {
  const activeRef = useRef(false);
  const pendingThemeRef = useRef<ThemeMode | null>(null);
  const endTimerRef = useRef<number | null>(null);
  const themeTimerRef = useRef<number | null>(null);

  const startStorm = useCallback((detail: StormTriggerDetail) => {
    if (activeRef.current) {
      if (detail.theme) {
        pendingThemeRef.current = detail.theme;
        applyTheme(detail.theme);
      }
      return;
    }
    if (prefersReducedMotion()) {
      if (detail.theme) applyTheme(detail.theme);
      return;
    }

    const duration = detail.cause === "route" ? 520 : detail.cause === "theme" ? 680 : 760;
    const themeOffset = Math.round(duration * 0.45);
    activeRef.current = true;
    pendingThemeRef.current = detail.theme ?? null;
    setStorming(true);
    document.documentElement.style.setProperty("--storm-duration", `${duration}ms`);

    if (endTimerRef.current) window.clearTimeout(endTimerRef.current);
    if (themeTimerRef.current) window.clearTimeout(themeTimerRef.current);

    if (pendingThemeRef.current) {
      themeTimerRef.current = window.setTimeout(() => {
        if (!pendingThemeRef.current) return;
        applyTheme(pendingThemeRef.current);
      }, themeOffset);
    }

    endTimerRef.current = window.setTimeout(() => {
      activeRef.current = false;
      pendingThemeRef.current = null;
      setStorming(false);
    }, duration);
  }, []);

  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<StormTriggerDetail>).detail ?? {};
      startStorm(detail);
    };
    window.addEventListener(STORM_TRIGGER_EVENT, handler as EventListener);
    return () => window.removeEventListener(STORM_TRIGGER_EVENT, handler as EventListener);
  }, [startStorm]);

  useEffect(() => {
    return () => {
      if (endTimerRef.current) window.clearTimeout(endTimerRef.current);
      if (themeTimerRef.current) window.clearTimeout(themeTimerRef.current);
      setStorming(false);
    };
  }, []);

  return null;
}
