import { ArrowUpRight, Download } from "lucide-react";
import type { BakbakRelease } from "@/utils/bakbakRelease";
import { BAKBAK_RELEASES_URL } from "@/utils/bakbakRelease";

export default function BakbakDownload({
  release,
}: {
  release: BakbakRelease | null;
}) {
  const installers = [
    {
      label: "Apple Silicon Mac",
      installer: release?.installers.macAppleSilicon,
    },
    { label: "Windows x64", installer: release?.installers.windows },
    { label: "Intel Mac", installer: release?.installers.macIntel },
  ];
  return (
    <section
      id="download"
      className="portfolio-container download-section"
      aria-labelledby="download-heading"
    >
      <div>
        <p className="eyebrow">Desktop downloads</p>
        <h2 id="download-heading">Bring the room with you.</h2>
        <p>
          Downloading is open. Joining a private room still requires an invite
          from its host.
        </p>
      </div>
      <div className="download-panel">
        <h3>Choose your desktop</h3>
        <p className="download-version">
          {release
            ? `${release.isFallback ? "Latest known release" : "Latest release"} · v${release.version}`
            : "Release feed unavailable"}
        </p>
        {release?.isFallback && (
          <p className="download-notice">
            The live feed is unavailable. These are the verified v
            {release.version} downloads recorded on 11 October 2026. Check all
            releases for newer builds.
          </p>
        )}
        <div className="project-actions">
          {installers.map(({ label, installer }) =>
            installer ? (
              <a key={label} className="solid-link" href={installer.url}>
                <Download size={16} aria-hidden="true" />
                {label}
                <span>({(installer.size / 1_000_000).toFixed(1)} MB)</span>
              </a>
            ) : null,
          )}
          <a href={BAKBAK_RELEASES_URL} className="text-link">
            All releases <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
        {!release && (
          <p className="download-notice">
            Release details could not be loaded. All published installers remain
            available on the releases page.
          </p>
        )}
        <p className="download-legacy">
          Intel Mac support ended with{" "}
          <a href={`${BAKBAK_RELEASES_URL}/tag/v0.4.0`}>
            v0.4.0 (legacy release)
          </a>
          . Current builds support Apple Silicon and Windows x64.
        </p>
        <p className="download-legacy">
          For installation requirements and platform notices, read the notes
          alongside your chosen release.
        </p>
      </div>
    </section>
  );
}
