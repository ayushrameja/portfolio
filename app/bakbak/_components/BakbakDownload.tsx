import {
  Apple,
  ArrowUpRight,
  Download,
  Laptop,
  MonitorDown,
} from "lucide-react";

import type { BakbakInstaller, BakbakRelease } from "@/utils/bakbakRelease";
import { BAKBAK_RELEASES_URL } from "@/utils/bakbakRelease";

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
      className="bakbak-download__button bakbak-download__button--primary"
      aria-label={`${label}, ${formatBytes(installer.size)}`}
    >
      <Download className="h-4 w-4" />
      {label}
      <span>{formatBytes(installer.size)}</span>
    </a>
  );
}

export default function BakbakDownload({
  release,
}: {
  release: BakbakRelease | null;
}) {
  return (
    <section
      id="download"
      className="bakbak-download"
      data-palette="paper"
      aria-labelledby="download-heading"
    >
      <div className="site-container">
        <div className="bakbak-download__shell">
          <div className="bakbak-download__intro">
            <p className="eyebrow">Desktop downloads</p>
            <h2 id="download-heading">Bring the room with you.</h2>
            <p>
              Downloading is open. Joining a private Bakbak room still requires a
              single-use invite from its host.
            </p>
            <div className="bakbak-download__status">
              <span aria-hidden="true" />
              Private beta · invite required
            </div>
          </div>

          <div className="bakbak-download__panel">
            <div className="bakbak-download__panel-header">
              <div>
                <p>Recommended download</p>
                <h3>Choose Bakbak for your desktop</h3>
                <p>Builds are available for Apple Silicon Macs, Intel Macs, and Windows x64.</p>
              </div>
              <div className="bakbak-download__version">
                {release ? `Latest · v${release.version}` : "Release feed unavailable"}
              </div>
            </div>

            <div className="bakbak-download__actions">
              {release?.installers.macAppleSilicon ? (
                <InstallerLink
                  installer={release.installers.macAppleSilicon}
                  label="Apple Silicon Mac"
                />
              ) : null}

              {release?.installers.macIntel ? (
                <a
                  href={release.installers.macIntel.url}
                  className="bakbak-download__button"
                >
                  <Laptop className="h-4 w-4" />
                  Intel Mac
                  <span>{formatBytes(release.installers.macIntel.size)}</span>
                </a>
              ) : null}

              {release?.installers.windows ? (
                <InstallerLink
                  installer={release.installers.windows}
                  label="Windows x64"
                />
              ) : null}

              <a
                href={BAKBAK_RELEASES_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bakbak-download__button"
              >
                All releases
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>

            {!release ? (
              <p className="bakbak-download__notice">
                GitHub did not return release details just now. The releases page
                remains available and contains every published installer.
              </p>
            ) : null}

            <div className="bakbak-download__guides">
              <article>
                <div><Apple className="h-4 w-4" /> First launch on macOS</div>
                <p>
                  The beta is not notarized yet. If macOS blocks the first launch,
                  Control-click Bakbak, choose Open, then confirm once.
                </p>
              </article>
              <article>
                <div><MonitorDown className="h-4 w-4" /> First launch on Windows</div>
                <p>
                  The beta is not code-signed yet. Windows SmartScreen may ask you
                  to choose More info, then Run anyway.
                </p>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
