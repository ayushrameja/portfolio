import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowUpRight,
  AudioLines,
  MessageCircleMore,
  ShieldCheck,
  UsersRound,
  Video,
} from "lucide-react";

import Footer from "@/app/_components/Footer";
import { BASE_URL } from "@/constants/links";
import {
  BAKBAK_REPOSITORY_URL,
  getLatestBakbakRelease,
} from "@/utils/bakbakRelease";

import BakbakDownload from "./_components/BakbakDownload";

const title = "Bakbak | A private room for close friends";
const description =
  "Download Bakbak, a private desktop room for persistent chat, drop-in voice and video, and a synchronized soundboard.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/bakbak" },
  openGraph: {
    title,
    description,
    type: "website",
    url: `${BASE_URL}/bakbak`,
    images: [
      {
        url: `${BASE_URL}/assets/bakbak/og.png`,
        width: 1731,
        height: 909,
        alt: "Bakbak — a small room for big conversations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [`${BASE_URL}/assets/bakbak/og.png`],
  },
};

const features = [
  {
    number: "01",
    Icon: MessageCircleMore,
    title: "The chat stays",
    body: "Persistent private channels keep the context around, even when the conversation wanders somewhere beautifully unnecessary.",
  },
  {
    number: "02",
    Icon: Video,
    title: "Drop in, no calendar",
    body: "See who is around, join a voice room, and turn on video only when the moment calls for actual facial expressions.",
  },
  {
    number: "03",
    Icon: AudioLines,
    title: "One shared soundboard",
    body: "Trigger the same hosted sounds for everyone in the room, because timing is an important branch of engineering.",
  },
] as const;

export default async function BakbakPage() {
  const release = await getLatestBakbakRelease();

  return (
    <main className="journal-shell pb-4">
      <section className="relative overflow-hidden px-4 pb-16 pt-3 sm:px-8 sm:pb-24 sm:pt-8">
        <div className="mx-auto w-full max-w-[88rem]">
          <header className="flex items-center justify-between gap-4 border-y journal-rule py-2.5 font-mono text-[10px] uppercase text-[var(--muted)] sm:py-3 sm:text-xs">
            <p>Ayush Rameja / Independent product</p>
            <p className="text-[#766be5] dark:text-[#a49cff]">P1 / Bakbak</p>
          </header>

          <div className="grid gap-10 py-10 lg:grid-cols-12 lg:items-end lg:py-16">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3">
                <Image
                  src="/assets/bakbak/icon.svg"
                  alt=""
                  width={52}
                  height={52}
                  className="h-12 w-12 rounded-[15px] shadow-[0_12px_30px_rgba(118,107,229,0.28)] sm:h-[52px] sm:w-[52px]"
                />
                <div>
                  <p className="font-mono text-[10px] uppercase text-[#766be5] dark:text-[#a49cff]">
                    Private beta
                  </p>
                  <p className="mt-1 text-sm font-extrabold">Bakbak for desktop</p>
                </div>
              </div>
              <h1 className="mt-8 max-w-[11ch] font-serif text-[3.5rem] font-medium leading-[0.92] sm:text-7xl lg:text-[6.6rem]">
                Your small room for <span className="text-[#766be5] dark:text-[#a49cff]">big conversations.</span>
              </h1>
            </div>

            <aside className="border-t journal-rule pt-6 lg:col-span-4 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <p className="text-lg font-bold leading-snug">
                Persistent chat, drop-in calls, and perfectly timed nonsense.
              </p>
              <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                Bakbak is an invite-only desktop space for 5–10 close friends.
                It keeps your shared room present without turning friendship into
                another public feed.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <Link href="#download" className="journal-button">
                  Download Bakbak
                  <ArrowDownRight className="h-4 w-4" />
                </Link>
                <a
                  href={BAKBAK_REPOSITORY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="journal-button-secondary"
                >
                  View source
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </aside>
          </div>

          <figure className="bakbak-preview-frame overflow-hidden rounded-[8px] border border-white/10 bg-[#0f0e17] p-2 shadow-[0_40px_110px_rgba(43,31,116,0.24)] sm:p-3">
            <Image
              src="/assets/bakbak/app-preview.jpg"
              alt="Bakbak desktop app showing private text channels, voice rooms, sample conversations, and a small member list using fictional preview data"
              width={1309}
              height={818}
              priority
              sizes="(max-width: 768px) 100vw, 88rem"
              className="h-auto w-full rounded-[4px] border border-white/10"
            />
            <figcaption className="flex flex-col gap-2 px-2 pb-1 pt-3 font-mono text-[9px] uppercase tracking-[0.08em] text-[#777386] sm:flex-row sm:items-center sm:justify-between sm:px-3 sm:text-[10px]">
              <span>Live product shell / fictional preview data</span>
              <span>Desktop / macOS + Windows</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="border-y journal-rule bg-[var(--paper-raised)] px-4 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto w-full max-w-[88rem]">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="journal-kicker">P1.1 / What lives inside</p>
              <h2 className="mt-5 max-w-[10ch] font-serif text-5xl leading-[0.96] sm:text-6xl">
                Familiar tools, deliberately smaller.
              </h2>
            </div>
            <p className="max-w-3xl self-end text-lg leading-8 text-[var(--muted)] lg:col-span-8">
              Bakbak keeps the useful parts of a community app and removes the
              audience-building machinery. No discovery feed. No follower count.
              Just the people who already know the lore.
            </p>
          </div>

          <div className="mt-12 grid border-y journal-rule lg:grid-cols-3">
            {features.map(({ number, Icon, title: featureTitle, body }, index) => (
              <article
                key={number}
                className={`py-8 lg:px-8 lg:py-10 ${
                  index > 0
                    ? "border-t journal-rule lg:border-l lg:border-t-0"
                    : ""
                } ${index === 0 ? "lg:pl-0" : ""}`}
              >
                <div className="flex items-center justify-between">
                  <Icon className="h-5 w-5 text-[#766be5] dark:text-[#a49cff]" />
                  <span className="font-mono text-[10px] text-[var(--faint)]">
                    {number}
                  </span>
                </div>
                <h3 className="mt-8 font-serif text-3xl">{featureTitle}</h3>
                <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                  {body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto grid w-full max-w-[88rem] gap-8 border-y journal-rule py-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-center lg:py-14">
          <div>
            <p className="journal-kicker">P1.2 / Access model</p>
            <div className="mt-6 flex items-center gap-3">
              <UsersRound className="h-6 w-6 text-[#766be5] dark:text-[#a49cff]" />
              <span className="font-mono text-xs text-[var(--muted)]">
                Designed for 5–10 friends
              </span>
            </div>
          </div>
          <div>
            <h2 className="max-w-[18ch] font-serif text-4xl leading-tight sm:text-5xl">
              The download is open. The room is still private.
            </h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <p className="text-sm leading-7 text-[var(--muted)]">
                Anyone can install Bakbak, but joining requires a single-use
                invite from the person hosting the room.
              </p>
              <p className="flex gap-3 text-sm leading-7 text-[var(--muted)]">
                <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-[#766be5] dark:text-[#a49cff]" />
                Private channels, member-only rooms, and no public user discovery
                keep the social surface intentionally small.
              </p>
            </div>
          </div>
        </div>
      </section>

      <BakbakDownload release={release} />
      <Footer />
    </main>
  );
}
