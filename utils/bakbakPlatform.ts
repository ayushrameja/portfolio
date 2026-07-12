export type VisitorPlatform =
  | "mac"
  | "windows"
  | "unsupported"
  | "unknown";

export type PlatformSignals = {
  maxTouchPoints: number;
  platform: string;
  userAgent: string;
};

export function classifyVisitorPlatform({
  maxTouchPoints,
  platform,
  userAgent,
}: PlatformSignals): VisitorPlatform {
  const signals = `${platform} ${userAgent}`;
  const looksLikeMobile =
    /Android|iPhone|iPad|iPod/i.test(signals) ||
    (/Mac/i.test(signals) && maxTouchPoints > 1);

  if (looksLikeMobile) return "unsupported";
  if (/Windows|Win32|Win64/i.test(signals)) return "windows";
  if (/Macintosh|MacIntel|MacPPC|Mac68K|macOS/i.test(signals)) return "mac";
  if (/Linux|CrOS/i.test(signals)) return "unsupported";
  return "unknown";
}
