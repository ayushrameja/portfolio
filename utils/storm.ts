export type JournalCause = "load" | "route" | "theme";
export type ThemeMode = "light" | "dark";

export type JournalTriggerDetail = {
  cause?: JournalCause;
  theme?: ThemeMode;
  number?: string;
  label?: string;
};

export const JOURNAL_TRIGGER_EVENT = "journal:transition";
export const THEME_CHANGE_EVENT = "theme-change";

export const triggerJournalTransition = (detail: JournalTriggerDetail = {}) => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent<JournalTriggerDetail>(JOURNAL_TRIGGER_EVENT, { detail }),
  );
};
