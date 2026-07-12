"use client";

import {
  Apple,
  ArrowUpRight,
  Download,
  Laptop,
  MonitorDown,
} from "lucide-react";
import { useMemo, useSyncExternalStore } from "react";

import type { BakbakInstaller, BakbakRelease } from "@/utils/bakbakRelease";
import { BAKBAK_RELEASES_URL } from "@/utils/bakbakRelease";
import {
  classifyVisitorPlatform,
  type VisitorPlatform,
} from "@/utils/bakbakPlatform";

type NavigatorWithUserAgentData = Navigator & {
  userAgentData?: { platform?: string };
};

function detectPlatform(): VisitorPlatform {
  const navigatorWithData = navigator as NavigatorWithUserAgentData;
  return classifyVisitorPlatform({
    maxTouchPoints: navigator.maxTouchPoints,
    platform: `${navigatorWithData.userAgentData?.platform ?? ""} ${
      navigator.platform ?? ""
    }`,
    userAgent: navigator.userAgent ?? "",
  });
}

function subscribeToPlatform() {
  return () => undefined;
}

function formatBytes(bytes: number) {
  return `${(bytes / 1_000_000).toFixed(1)} MB`;
}

function InstallerLink({
  installer,
  label,
}: {
  installer: BakbakInstaller;
  label: string;
}) {
  return (
    <a
      href={installer.url}
      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[5px] bg-[#8f86ff] px-5 text-sm font-extrabold text-[#101016] transition hover:-translate-y-0.5 hover:bg-white"
      aria-label={`${label}, ${formatBytes(installer.size)}`}
    >
      <Download className="h-4 w-4" />
      {label}
      <span className="font-mono text-[10px] opacity-65">
        {formatBytes(installer.size)}
      </span>
    </a>
  );
}

export default function BakbakDownload({
  release,
}: {
  release: BakbakRelease | null;
}) {
  const platform = useSyncExternalStore(
    subscribeToPlatform,
    detectPlatform,
    () => "unknown",
  );

  const recommendation = useMemo(() => {
    if (!release) return null;
    if (platform === "mac") return release.installers.macAppleSilicon;
    if (platform === "windows") return release.installers.windows;
    return null;
  }, [platform, release]);

  const heading =
    platform === "mac"
      ? "Bakbak for Mac"
      : platform === "windows"
        ? "Bakbak for Windows"
        : platform === "unsupported"
          ? "Your platform is not supported yet"
          : "Choose Bakbak for your desktop";

  const platformNote =
    platform === "mac"
      ? "Apple Silicon is recommended. Intel Macs have a separate build below."
      : platform === "windows"
        ? "Recommended for Windows on x64 hardware."
        : platform === "unsupported"
          ? "Bakbak currently ships for macOS and Windows. Linux and mobile builds are not available."
          : "Bakbak currently ships for Apple Silicon Macs, Intel Macs, and Windows x64.";

  return (
    <section
      id="download"
      className="scroll-mt-24 px-4 py-16 sm:px-8 sm:py-24"
      aria-labelledby="download-heading"
    >
      <div className="mx-auto grid w-full max-w-[88rem] overflow-hidden rounded-[8px] border border-white/10 bg-[#0f0e17] text-[#f7f5ff] shadow-[0_35px_100px_rgba(27,20,72,0.28)] lg:grid-cols-[0.72fr_1.28fr]">
        <div className="bakbak-download-aside relative overflow-hidden border-b border-white/10 p-7 sm:p-10 lg:border-b-0 lg:border-r">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#a49cff]">
            P1.3 / Download desk
          </p>
          <h2
            id="download-heading"
            className="mt-6 max-w-[10ch] font-serif text-5xl leading-[0.94] sm:text-6xl"
          >
            Bring the room with you.
          </h2>
          <p className="mt-6 max-w-md text-sm leading-7 text-[#aaa7b8]">
            Downloading is open. Joining a private Bakbak room still requires a
            single-use invite from its host.
          </p>
          <div className="mt-10 flex items-center gap-3 text-xs text-[#d7d3e4]">
            <span className="h-2 w-2 rounded-full bg-[#53d99b] shadow-[0_0_18px_#53d99b]" />
            Private beta / invite required
          </div>
        </div>

        <div className="p-7 sm:p-10 lg:p-12">
          <div className="flex flex-col gap-4 border-b border-white/10 pb-7 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#777386]">
                Recommended download
              </p>
              <h3 className="mt-3 text-2xl font-extrabold tracking-[-0.035em] sm:text-3xl">
                {heading}
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-6 text-[#aaa7b8]">
                {platformNote}
              </p>
            </div>
            <div className="shrink-0 rounded-[5px] border border-white/10 px-3 py-2 font-mono text-[10px] text-[#aaa7b8]">
              {release ? `Latest / v${release.version}` : "Release feed unavailable"}
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {recommendation ? (
              <InstallerLink
                installer={recommendation}
                label={
                  platform === "windows"
                    ? "Download for Windows"
                    : "Download for Apple Silicon"
                }
              />
            ) : null}

            {platform === "mac" && release?.installers.macIntel ? (
              <a
                href={release.installers.macIntel.url}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[5px] border border-white/15 px-5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:border-[#8f86ff] hover:text-[#b8b2ff]"
              >
                <Laptop className="h-4 w-4" />
                Intel Mac
                <span className="font-mono text-[10px] text-[#777386]">
                  {formatBytes(release.installers.macIntel.size)}
                </span>
              </a>
            ) : null}

            <a
              href={BAKBAK_RELEASES_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[5px] border border-white/15 px-5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:border-[#8f86ff] hover:text-[#b8b2ff]"
            >
              All releases
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          {!release ? (
            <p className="mt-5 rounded-[5px] border border-[#8f86ff]/25 bg-[#8f86ff]/10 p-4 text-sm leading-6 text-[#c9c5dc]">
              GitHub did not return release details just now. The releases page
              remains available and contains every published installer.
            </p>
          ) : recommendation === null && platform !== "mac" ? (
            <p className="mt-5 text-sm leading-6 text-[#8d8999]">
              No automatic download was selected for this device. Open all
              releases from a supported desktop to choose an installer.
            </p>
          ) : null}

          <div className="mt-10 grid gap-px overflow-hidden rounded-[5px] border border-white/10 bg-white/10 sm:grid-cols-2">
            <article className="bg-[#14131d] p-5">
              <div className="flex items-center gap-2 text-sm font-extrabold">
                <Apple className="h-4 w-4 text-[#a49cff]" />
                First launch on macOS
              </div>
              <p className="mt-3 text-xs leading-6 text-[#8d8999]">
                The beta is not notarized yet. If macOS blocks the first launch,
                Control-click Bakbak, choose Open, then confirm once.
              </p>
            </article>
            <article className="bg-[#14131d] p-5">
              <div className="flex items-center gap-2 text-sm font-extrabold">
                <MonitorDown className="h-4 w-4 text-[#a49cff]" />
                First launch on Windows
              </div>
              <p className="mt-3 text-xs leading-6 text-[#8d8999]">
                The beta is not code-signed yet. Windows SmartScreen may ask you
                to choose More info, then Run anyway.
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
