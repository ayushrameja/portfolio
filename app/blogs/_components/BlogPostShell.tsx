import Link from "next/link";
import type { BlogPost } from "../_posts/post";

export default function BlogPostShell({
  post,
  children,
}: {
  post: BlogPost;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-dvh px-6 py-10 pb-28">
      <div className="mx-auto w-full max-w-3xl">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-sm text-zinc-600 transition hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-zinc-50"
        >
          <span aria-hidden>←</span> Back to blogs
        </Link>

        <header className="mt-6 rounded-3xl border border-zinc-200/70 bg-white/70 p-8 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.25)] backdrop-blur dark:border-zinc-700/60 dark:bg-zinc-900/40 dark:shadow-[0_20px_60px_-40px_rgba(0,0,0,0.8)]">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">{post.title}</h1>
          <p className="mt-3 text-zinc-600 dark:text-zinc-300">{post.description}</p>
          <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-zinc-600 dark:text-zinc-300">
            <span>
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
                timeZone: "UTC",
              })}
            </span>
            <span aria-hidden className="text-zinc-400 dark:text-zinc-500">
              •
            </span>
            <span>{post.readingTime} read</span>
            {post.tags.length > 0 ? (
              <>
                <span aria-hidden className="text-zinc-400 dark:text-zinc-500">
                  •
                </span>
                <ul className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-zinc-200/70 bg-zinc-950/5 px-2.5 py-1 text-xs text-zinc-700 dark:border-zinc-700/60 dark:bg-zinc-950/30 dark:text-zinc-200"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>
        </header>

        <article className="mt-8 rounded-3xl border border-zinc-200/70 bg-white/70 p-8 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.25)] backdrop-blur dark:border-zinc-700/60 dark:bg-zinc-900/40 dark:shadow-[0_20px_60px_-40px_rgba(0,0,0,0.8)]">
          <div
            className="text-zinc-800 dark:text-zinc-200 [&_p]:leading-7 [&_p]:text-[15px] [&_p]:md:text-base [&_p]:mt-4 [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-zinc-950 dark:[&_h2]:text-zinc-50 [&_ul]:mt-4 [&_ul]:space-y-2 [&_ul]:pl-5 [&_ul]:list-disc [&_li]:leading-7 [&_a]:underline [&_a]:decoration-zinc-400/60 [&_a]:underline-offset-4 hover:[&_a]:decoration-zinc-900/70 dark:[&_a]:decoration-zinc-500/60 dark:hover:[&_a]:decoration-zinc-200/80 [&_code]:rounded [&_code]:bg-zinc-950/5 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-[0.9em] dark:[&_code]:bg-zinc-950/35"
          >
            {children}
          </div>
        </article>
      </div>
    </main>
  );
}
