import type { Metadata } from "next";
import Link from "next/link";

import { allPosts } from "./_posts";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Blogs | Ayush Rameja",
  description: "Notes on Next.js, performance, and building web products.",
  alternates: { canonical: "/blogs" },
};

export default function BlogsPage() {
  return (
    <main className="min-h-dvh px-6 py-10 pb-28">
      <div className="mx-auto w-full max-w-5xl">
        <div className="rounded-3xl border border-zinc-200/70 bg-white/70 p-8 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.25)] backdrop-blur dark:border-zinc-700/60 dark:bg-zinc-900/40 dark:shadow-[0_20px_60px_-40px_rgba(0,0,0,0.8)]">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">Blogs</h1>
              <p className="mt-2 text-zinc-600 dark:text-zinc-300">
                Short, practical posts. No “10x” anything. Just scars and fixes.
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-200/70 bg-zinc-950/5 px-4 py-2 text-sm text-zinc-700 dark:border-zinc-700/60 dark:bg-zinc-950/30 dark:text-zinc-300">
              {allPosts.length} posts
            </div>
          </div>

          <div className="mt-10 grid gap-4">
            {allPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blogs/${post.slug}`}
                className="group rounded-2xl border border-zinc-200/70 bg-white/50 p-6 transition hover:bg-white/70 dark:border-zinc-700/60 dark:bg-zinc-950/20 dark:hover:bg-zinc-950/30"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h2 className="text-lg font-semibold tracking-tight text-zinc-950 transition group-hover:text-zinc-900 dark:text-zinc-50 dark:group-hover:text-zinc-50">
                      {post.title}
                    </h2>
                    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">{post.description}</p>
                  </div>
                  <div className="shrink-0 text-sm text-zinc-600 dark:text-zinc-300">
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                      timeZone: "UTC",
                    })}
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-zinc-700 dark:text-zinc-200">
                  <span className="rounded-full border border-zinc-200/70 bg-zinc-950/5 px-2.5 py-1 dark:border-zinc-700/60 dark:bg-zinc-950/30">
                    {post.readingTime} read
                  </span>
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-zinc-200/70 bg-white/60 px-2.5 py-1 dark:border-zinc-700/60 dark:bg-zinc-950/25"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
