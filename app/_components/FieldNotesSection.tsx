import { ArrowRight } from "lucide-react";
import Link from "next/link";

import type { BlogPost } from "@/types/blog";
import { getPostsByDesk } from "@/app/blogs/_posts";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  });
}

function NoteDesk({
  number,
  title,
  accent,
  posts,
}: {
  number: string;
  title: string;
  accent: "cobalt" | "vermilion";
  posts: BlogPost[];
}) {
  const color = accent === "cobalt" ? "text-[var(--cobalt)]" : "text-[var(--vermilion)]";

  return (
    <div>
      <div className="flex items-end justify-between gap-4 border-b journal-rule pb-4">
        <div>
          <p className={`font-mono text-xs ${color}`}>{number} / Desk</p>
          <h3 className="mt-2 font-serif text-4xl">{title}</h3>
        </div>
        <p className="font-mono text-[10px] uppercase text-[var(--muted)]">Latest three</p>
      </div>

      <div>
        {posts.slice(0, 3).map((post, index) => (
          <Link
            key={post.slug}
            href={`/blogs/${post.slug}`}
            className="group grid gap-3 border-b journal-rule py-6 sm:grid-cols-[2rem_minmax(0,1fr)_auto] sm:items-start"
          >
            <span className={`font-mono text-xs ${color}`}>0{index + 1}</span>
            <div>
              <h4 className="max-w-[28ch] font-serif text-2xl leading-tight transition-colors group-hover:text-[var(--cobalt)]">
                {post.title}
              </h4>
              <p className="mt-2 line-clamp-2 max-w-xl text-sm leading-6 text-[var(--muted)]">{post.description}</p>
            </div>
            <div className="flex items-center justify-between gap-4 sm:block sm:text-right">
              <p className="font-mono text-[10px] text-[var(--muted)]">{formatDate(post.publishedAt)}</p>
              <p className="mt-1 font-mono text-[10px] text-[var(--faint)]">{post.readingTime}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function FieldNotesSection() {
  const engineering = getPostsByDesk("engineering");
  const life = getPostsByDesk("life");

  return (
    <section id="notes" className="relative border-y journal-rule bg-[var(--paper-raised)] px-4 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto w-full max-w-[88rem]">
        <div className="grid gap-7 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-4">
            <p className="journal-kicker">02 / Field notes</p>
            <p className="mt-4 max-w-sm text-sm leading-7 text-[var(--muted)]">
              Practical engineering judgment on one desk. Work, attention, and the Bhagavad Gita on the other.
            </p>
          </div>
          <div className="lg:col-span-8">
            <h2 className="max-w-[17ch] font-serif text-5xl leading-none sm:text-6xl">
              Notes for building software and staying reasonably human while doing it.
            </h2>
          </div>
        </div>

        <div className="mt-12 grid gap-14 lg:grid-cols-2 lg:gap-12">
          <NoteDesk number="02.A" title="Engineering notes" accent="cobalt" posts={engineering} />
          <NoteDesk number="02.B" title="Life notes" accent="vermilion" posts={life} />
        </div>

        <div className="mt-10 flex justify-end">
          <Link href="/blogs" className="journal-button-secondary">
            Open the complete journal
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
