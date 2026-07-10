import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

import type { BlogPost } from "@/types/blog";
import { getAdjacentPosts } from "../_posts";
import BlogPostHeader from "./BlogPostHeader";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default function BlogPostShell({ post, children }: { post: BlogPost; children: React.ReactNode }) {
  const { previous, next } = getAdjacentPosts(post.slug);
  const accent = post.desk === "engineering" ? "var(--cobalt)" : "var(--vermilion)";

  return (
    <main className="journal-shell pb-32">
      <BlogPostHeader title={post.title} desk={post.desk} />

      <article className="mx-auto w-full max-w-[52rem] px-4 pb-16 pt-24 sm:px-8 sm:pb-24 sm:pt-32">
        <header className="border-y journal-rule py-8 sm:py-12">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[10px] uppercase text-[var(--muted)]">
            <span style={{ color: accent }}>{post.desk === "engineering" ? "02.A / Engineering" : "02.B / Life"}</span>
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            <span>{post.readingTime}</span>
          </div>

          <h1 className="mt-7 max-w-[18ch] font-serif text-5xl leading-[0.98] sm:text-7xl">{post.title}</h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-[var(--muted)] sm:text-xl">{post.description}</p>

          <div className="mt-9 flex items-center justify-between gap-6 border-t journal-rule pt-5">
            <div>
              <p className="text-sm font-bold">Ayush Rameja</p>
              <p className="mt-1 font-mono text-[10px] text-[var(--muted)]">Full-stack platform engineer</p>
            </div>
            <div className="hidden flex-wrap justify-end gap-3 sm:flex">
              {post.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="font-mono text-[10px] text-[var(--faint)]">{tag}</span>
              ))}
            </div>
          </div>
        </header>

        <div
          className="font-serif text-[1.18rem] leading-8 text-[var(--ink)]
          [&_p]:mt-7 [&_p]:text-[var(--ink)]
          [&_h2]:mt-16 [&_h2]:font-serif [&_h2]:text-4xl [&_h2]:font-medium [&_h2]:leading-[1.05] [&_h2]:text-[var(--ink)]
          [&_h3]:mt-12 [&_h3]:font-sans [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:leading-tight [&_h3]:text-[var(--ink)]
          [&_ul]:mt-7 [&_ul]:list-disc [&_ul]:space-y-3 [&_ul]:pl-6
          [&_ol]:mt-7 [&_ol]:list-decimal [&_ol]:space-y-3 [&_ol]:pl-6
          [&_li]:pl-1 [&_li]:leading-8
          [&_strong]:font-semibold [&_strong]:text-[var(--ink)]
          [&_a]:font-semibold [&_a]:text-[var(--cobalt)] [&_a]:underline [&_a]:decoration-[var(--rule-strong)] [&_a]:underline-offset-4
          [&_code]:bg-[var(--paper-raised)] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.82em]
          [&_hr]:my-14 [&_hr]:border-[var(--rule)]"
        >
          {children}
        </div>

        <footer className="mt-20 grid border-y journal-rule sm:grid-cols-2">
          <div className="py-6 sm:pr-6">
            {previous ? (
              <Link href={`/blogs/${previous.slug}`} className="group block">
                <p className="font-mono text-[10px] uppercase text-[var(--muted)]">Older from this desk</p>
                <p className="mt-3 font-serif text-2xl leading-tight group-hover:text-[var(--cobalt)]">{previous.title}</p>
                <ArrowLeft className="mt-4 h-4 w-4" />
              </Link>
            ) : <p className="font-mono text-[10px] text-[var(--faint)]">Beginning of this desk.</p>}
          </div>
          <div className="border-t journal-rule py-6 sm:border-l sm:border-t-0 sm:pl-6 sm:text-right">
            {next ? (
              <Link href={`/blogs/${next.slug}`} className="group block">
                <p className="font-mono text-[10px] uppercase text-[var(--muted)]">Newer from this desk</p>
                <p className="mt-3 font-serif text-2xl leading-tight group-hover:text-[var(--cobalt)]">{next.title}</p>
                <ArrowRight className="mt-4 ml-auto h-4 w-4" />
              </Link>
            ) : <p className="font-mono text-[10px] text-[var(--faint)]">Latest note from this desk.</p>}
          </div>
        </footer>
      </article>
    </main>
  );
}
