export type StormCause = "load" | "route" | "theme";
export type ThemeMode = "light" | "dark";

export type StormTriggerDetail = {
  cause?: StormCause;
  theme?: ThemeMode;
};

export const STORM_TRIGGER_EVENT = "storm:trigger";
export const THEME_CHANGE_EVENT = "theme-change";

export const triggerStorm = (detail: StormTriggerDetail = {}) => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<StormTriggerDetail>(STORM_TRIGGER_EVENT, { detail }));
};
