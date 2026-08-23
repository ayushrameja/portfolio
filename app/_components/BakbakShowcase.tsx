import Image from "next/image";
import Link from "next/link";

import { BAKBAK_REPOSITORY_URL } from "@/utils/bakbakRelease";

const engineeringProof = [
  "Supabase Row Level Security and token-issued access keep private rooms private.",
  "LiveKit powers voice, video, and screen sharing while local caching keeps recent workspaces useful offline.",
  "Electron packaging and automated releases ship the same product across macOS and Windows.",
] as const;

const stack = ["React", "TypeScript", "Electron", "Supabase", "LiveKit"] as const;

export default function BakbakShowcase() {
  return (
    <section className="bakbak-case-study" data-palette="sand" aria-labelledby="bakbak-title">
      <div className="site-container">
        <div className="section-heading section-heading--compact">
          <div>
            <p className="eyebrow">Independent product</p>
            <h2 id="bakbak-title">Bakbak</h2>
          </div>
          <p>
            A private desktop room for 5–10 close friends, built and maintained
            independently from product idea through release engineering.
          </p>
        </div>

        <div className="bakbak-case-study__grid">
          <figure className="bakbak-case-study__media">
            <Image
              src="/assets/bakbak/app-preview.jpg"
              alt="Bakbak desktop app preview using fictional room and member data"
              width={1309}
              height={818}
              sizes="(max-width: 900px) 100vw, 56vw"
            />
            <figcaption>Desktop product · fictional preview data</figcaption>
          </figure>

          <div className="bakbak-case-study__body">
            <p className="bakbak-case-study__role">Role · Independent builder</p>
            <h3>Engineering a social product without turning privacy into a footnote.</h3>
            <ul className="bakbak-proof">
              {engineeringProof.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <ul className="tag-list" aria-label="Bakbak technologies">
              {stack.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <div className="bakbak-case-study__actions">
              <Link className="site-button site-button--primary" href="/bakbak">
                Read case study
              </Link>
              <a
                className="site-button site-button--secondary"
                href={BAKBAK_REPOSITORY_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                View source
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
