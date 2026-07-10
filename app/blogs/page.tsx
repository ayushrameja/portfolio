import type { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

import type { BlogPost } from "@/types/blog";
import { getPostsByDesk } from "./_posts";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Field Notes | Ayush Rameja",
  description: "Engineering notes and essays on work, attention, and the Bhagavad Gita.",
  alternates: { canonical: "/blogs" },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    timeZone: "UTC",
  });
}

function Desk({
  code,
  title,
  description,
  accent,
  posts,
}: {
  code: string;
  title: string;
  description: string;
  accent: "cobalt" | "vermilion";
  posts: BlogPost[];
}) {
  const [featured, ...rest] = posts;
  const accentClass = accent === "cobalt" ? "text-[var(--cobalt)]" : "text-[var(--vermilion)]";

  return (
    <section>
      <div className="border-y journal-rule py-5">
        <p className={`font-mono text-xs ${accentClass}`}>{code} / Editorial desk</p>
        <h2 className="mt-3 font-serif text-5xl sm:text-6xl">{title}</h2>
        <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--muted)]">{description}</p>
      </div>

      {featured ? (
        <Link href={`/blogs/${featured.slug}`} className="group block border-b journal-rule py-8 sm:py-10">
          <p className={`font-mono text-[10px] uppercase ${accentClass}`}>Featured note</p>
          <h3 className="mt-4 max-w-[19ch] font-serif text-4xl leading-[1.02] transition-colors group-hover:text-[var(--cobalt)] sm:text-5xl">
            {featured.title}
          </h3>
          <p className="mt-5 max-w-xl text-sm leading-7 text-[var(--muted)]">{featured.description}</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[10px] text-[var(--faint)]">
            <span>{formatDate(featured.publishedAt)}</span>
            <span>{featured.readingTime}</span>
            <span>{featured.tags.slice(0, 2).join(" / ")}</span>
          </div>
        </Link>
      ) : null}

      <div>
        {rest.map((post, index) => (
          <Link
            key={post.slug}
            href={`/blogs/${post.slug}`}
            className="group grid gap-3 border-b journal-rule py-6 sm:grid-cols-[2rem_minmax(0,1fr)_auto]"
          >
            <span className={`font-mono text-[10px] ${accentClass}`}>{String(index + 2).padStart(2, "0")}</span>
            <div>
              <h3 className="font-serif text-2xl leading-tight transition-colors group-hover:text-[var(--cobalt)]">{post.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--muted)]">{post.description}</p>
            </div>
            <div className="flex items-center justify-between gap-3 sm:block sm:text-right">
              <p className="font-mono text-[10px] text-[var(--muted)]">{formatDate(post.publishedAt)}</p>
              <ArrowRight className="mt-3 ml-auto h-4 w-4 text-[var(--faint)] transition group-hover:text-[var(--cobalt)]" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function BlogsPage() {
  const engineering = getPostsByDesk("engineering");
  const life = getPostsByDesk("life");

  return (
    <main className="journal-shell pb-32">
      <div className="px-4 pb-12 pt-6 sm:px-8 sm:pb-16 sm:pt-8">
        <div className="mx-auto w-full max-w-[88rem]">
          <header className="flex items-center justify-between gap-4 border-y journal-rule py-3">
            <Link href="/" className="journal-link font-mono text-xs uppercase">
              <ArrowLeft className="h-4 w-4" /> Portfolio
            </Link>
            <p className="font-mono text-[10px] uppercase text-[var(--muted)]">Ayush Rameja / Field Journal</p>
          </header>

          <div className="grid gap-8 py-10 lg:grid-cols-12 lg:items-end lg:py-16">
            <div className="lg:col-span-8">
              <p className="journal-kicker">02 / Field notes</p>
              <h1 className="mt-5 max-w-[11ch] font-serif text-6xl leading-[0.92] sm:text-8xl lg:text-[7.5rem]">Two desks. One curious engineer.</h1>
            </div>
            <div className="lg:col-span-4 lg:border-l lg:pl-8 journal-rule">
              <p className="text-base leading-8 text-[var(--muted)]">
                Practical notes about engineering judgment, product delivery, work, attention, and the ideas that survive contact with a difficult Tuesday.
              </p>
              <p className="mt-5 font-mono text-[10px] uppercase text-[var(--vermilion)]">{engineering.length + life.length} published notes</p>
            </div>
          </div>

          <div className="grid gap-16 lg:grid-cols-2 lg:gap-0">
            <div className="lg:pr-10">
              <Desk
                code="02.A"
                title="Engineering notes"
                description="Code review, architecture, product judgment, accessibility, and shipping software with standards intact. Mostly intact."
                accent="cobalt"
                posts={engineering}
              />
            </div>
            <div className="lg:border-l lg:pl-10 journal-rule">
              <Desk
                code="02.B"
                title="Life notes"
                description="The Bhagavad Gita, modern work, decisions, attention, and ways to care without making chaos your full-time hobby."
                accent="vermilion"
                posts={life}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
