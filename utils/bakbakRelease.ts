const BAKBAK_REPOSITORY = "ayushrameja/bakbak";

export const BAKBAK_RELEASES_URL =
  "https://github.com/ayushrameja/bakbak/releases";
export const BAKBAK_REPOSITORY_URL =
  "https://github.com/ayushrameja/bakbak";

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
      typeof candidate.name === "string" && pattern.test(candidate.name),
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

export function parseBakbakRelease(
  release: GitHubRelease,
): BakbakRelease | null {
  const tagName = release.tag_name?.trim();
  const publishedAt = release.published_at?.trim();
  const releaseUrl = release.html_url?.trim();

  if (!tagName || !publishedAt || !releaseUrl) return null;

  const assets = Array.isArray(release.assets) ? release.assets : [];

  return {
    tagName,
    version: tagName.replace(/^v/i, ""),
    publishedAt,
    releaseUrl,
    installers: {
      macAppleSilicon: toInstaller(assets, /_aarch64\.dmg$/i),
      macIntel: toInstaller(assets, /_x64\.dmg$/i),
      windows: toInstaller(assets, /_x64-setup\.exe$/i),
    },
  };
}

export async function getLatestBakbakRelease(): Promise<BakbakRelease | null> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${BAKBAK_REPOSITORY}/releases/latest`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
        next: { revalidate: 900 },
      },
    );

    if (!response.ok) return null;

    return parseBakbakRelease((await response.json()) as GitHubRelease);
  } catch {
    return null;
  }
}
