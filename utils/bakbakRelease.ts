const BAKBAK_REPOSITORY = "ayushrameja/bakbak";

export const BAKBAK_RELEASES_URL =
  "https://github.com/ayushrameja/bakbak/releases";
export const BAKBAK_REPOSITORY_URL = "https://github.com/ayushrameja/bakbak";

export type BakbakInstaller = {
  name: string;
  size: number;
  url: string;
};

export type BakbakRelease = {
  installers: {
    macAppleSilicon: BakbakInstaller | null;
    macIntel: BakbakInstaller | null;
    windows: BakbakInstaller | null;
  };
  isFallback?: boolean;
  publishedAt: string;
  releaseUrl: string;
  tagName: string;
  version: string;
};

type GitHubReleaseAsset = {
  browser_download_url?: string;
  name?: string;
  size?: number;
};

type GitHubRelease = {
  assets?: GitHubReleaseAsset[];
  html_url?: string;
  published_at?: string;
  tag_name?: string;
};

function toInstaller(
  assets: GitHubReleaseAsset[],
  pattern: RegExp,
): BakbakInstaller | null {
  const asset = assets.find(
    (candidate) =>
      candidate &&
      typeof candidate.name === "string" &&
      pattern.test(candidate.name),
  );

  if (
    !asset?.name ||
    !asset.browser_download_url ||
    typeof asset.size !== "number"
  ) {
    return null;
  }

  return {
    name: asset.name,
    size: asset.size,
    url: asset.browser_download_url,
  };
}

export function parseBakbakRelease(input: unknown): BakbakRelease | null {
  if (!input || typeof input !== "object") return null;
  const release = input as GitHubRelease;
  const tagName =
    typeof release.tag_name === "string" ? release.tag_name.trim() : "";
  const publishedAt =
    typeof release.published_at === "string" ? release.published_at.trim() : "";
  const releaseUrl =
    typeof release.html_url === "string" ? release.html_url.trim() : "";

  if (!tagName || !publishedAt || !releaseUrl) return null;

  const assets = Array.isArray(release.assets) ? release.assets : [];

  return {
    tagName,
    version: tagName.replace(/^v/i, ""),
    publishedAt,
    releaseUrl,
    installers: {
      macAppleSilicon: toInstaller(assets, /[_-](?:aarch64|arm64)\.dmg$/i),
      macIntel: toInstaller(assets, /[_-](?:x64|x86_64)\.dmg$/i),
      windows: toInstaller(assets, /[_-]x64-setup\.exe$/i),
    },
  };
}

export async function getLatestBakbakRelease(): Promise<BakbakRelease | null> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${BAKBAK_REPOSITORY}/releases/latest`,
      {
        headers: {
          "User-Agent": "ayush.im-portfolio",
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
        next: { revalidate: 900 },
        signal: AbortSignal.timeout(5000),
      },
    );

    if (!response.ok) return knownRelease;

    return parseBakbakRelease(await response.json()) ?? knownRelease;
  } catch {
    return knownRelease;
  }
}

// Verified public release snapshot (2026-10-11). Labelled as known, never live/latest, on feed failure.
const snapshot = {
  tag_name: "v2.0.0",
  published_at: "2026-09-19T17:29:58Z",
  html_url: "https://github.com/ayushrameja/bakbak/releases/tag/v2.0.0",
  assets: [
    {
      name: "Bakbak-2.0.0-windows-x64-setup.exe",
      size: 15473589,
      browser_download_url:
        "https://github.com/ayushrameja/bakbak/releases/download/v2.0.0/Bakbak-2.0.0-windows-x64-setup.exe",
    },
    {
      name: "Bakbak_2.0.0_aarch64.dmg",
      size: 18075342,
      browser_download_url:
        "https://github.com/ayushrameja/bakbak/releases/download/v2.0.0/Bakbak_2.0.0_aarch64.dmg",
    },
  ],
};
const knownRelease: BakbakRelease | null = (() => {
  const parsed = parseBakbakRelease(snapshot);
  return parsed ? { ...parsed, isFallback: true } : null;
})();
