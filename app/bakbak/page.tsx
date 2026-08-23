import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import Footer from "@/app/_components/Footer";
import { BASE_URL } from "@/constants/links";
import { BAKBAK_REPOSITORY_URL, getLatestBakbakRelease } from "@/utils/bakbakRelease";

import BakbakDownload from "./_components/BakbakDownload";

const title = "Bakbak | Independent product case study";
const description =
  "How Ayush Rameja built Bakbak: a private Electron desktop room powered by React, Supabase, LiveKit, offline caching, and cross-platform releases.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/bakbak" },
  openGraph: {
    title,
    description,
    type: "website",
    url: `${BASE_URL}/bakbak`,
    images: [{
      url: `${BASE_URL}/assets/bakbak/og.png`,
      width: 1731,
      height: 909,
      alt: "Bakbak — a private desktop room for close friends",
    }],
  },
  twitter: { card: "summary_large_image", title, description, images: [`${BASE_URL}/assets/bakbak/og.png`] },
};

const decisions = [
  {
    title: "Privacy at the data boundary",
    copy: "Supabase Row Level Security, single-use invites, and token-issuing Edge Functions keep private rooms protected beyond the interface.",
  },
  {
    title: "Real-time without a fragile tangle",
    copy: "LiveKit handles voice, video, and screen sharing while Supabase Realtime keeps messages, presence, and room state synchronized.",
  },
  {
    title: "Useful when the network is not",
    copy: "A bounded per-account IndexedDB cache restores recent workspaces and conversations before revalidating against live permissions.",
  },
  {
    title: "Desktop delivery as product work",
    copy: "Electron packaging, candidate builds, release gates, and updater metadata support reliable macOS and Windows distribution.",
  },
] as const;

const productFeatures = [
  ["Persistent chat", "Private channels preserve context without a public feed or follower mechanics."],
  ["Drop-in calls", "Voice, video, and screen sharing make the room useful without scheduling another meeting."],
  ["Shared soundboard", "Hosted sounds, account favorites, and member uploads stay synchronized for everyone."],
] as const;

export default async function BakbakPage() {
  const release = await getLatestBakbakRelease();

  return (
    <main className="bakbak-page">
      <section className="bakbak-page-hero" data-palette="sand">
        <div className="site-container">
          <div className="detail-page__breadcrumb">
            <Link className="text-link" href="/">← Portfolio</Link>
            <span>Independent product · Desktop</span>
          </div>

          <div className="bakbak-page-hero__grid">
            <div>
              <p className="eyebrow">Independent builder</p>
              <h1>A private desktop room engineered for real-time closeness.</h1>
              <p className="bakbak-page-hero__summary">
                Bakbak brings persistent chat, drop-in calls, screen sharing, and a synchronized
                soundboard into one invite-only space for 5–10 close friends.
              </p>
              <ul className="tag-list" aria-label="Bakbak technologies">
                {['React', 'TypeScript', 'Electron', 'Supabase', 'LiveKit'].map((item) => <li key={item}>{item}</li>)}
              </ul>
              <div className="bakbak-page-hero__actions">
                <a className="site-button site-button--primary" href={BAKBAK_REPOSITORY_URL} target="_blank" rel="noopener noreferrer">View source</a>
                <Link className="site-button site-button--secondary" href="#download">Download Bakbak</Link>
              </div>
            </div>

            <figure>
              <Image
                src="/assets/bakbak/app-preview.jpg"
                alt="Bakbak desktop app using fictional preview data"
                width={1309}
                height={818}
                priority
                sizes="(max-width: 900px) 100vw, 50vw"
              />
              <figcaption>Live product shell · fictional preview data</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="bakbak-decisions" data-palette="ink">
        <div className="site-container">
          <div className="section-heading">
            <div><p className="eyebrow">Engineering case study</p><h2>The hard parts live below the feature list.</h2></div>
            <p>Product decisions were treated as system decisions: privacy, media, local resilience, and delivery all had to agree.</p>
          </div>
          <div className="bakbak-decisions__grid">
            {decisions.map((decision, index) => (
              <article key={decision.title}>
                <span>0{index + 1}</span>
                <h3>{decision.title}</h3>
                <p>{decision.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bakbak-product" data-palette="paper">
        <div className="site-container">
          <div className="section-heading">
            <div><p className="eyebrow">Product surface</p><h2>Familiar tools, deliberately smaller.</h2></div>
            <p>No discovery feed. No audience-building mechanics. The useful parts of a community product, sized for people who already know one another.</p>
          </div>
          <div className="bakbak-product__grid">
            {productFeatures.map(([feature, copy], index) => (
              <article key={feature}><span>0{index + 1}</span><h3>{feature}</h3><p>{copy}</p></article>
            ))}
          </div>
        </div>
      </section>

      <BakbakDownload release={release} />
      <Footer />
    </main>
  );
}
