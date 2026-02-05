import Image from "next/image";
import type { BlogPost } from "@/types/blog";

export default function BlogPostShell({
  post,
  children,
}: {
  post: BlogPost;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-dvh bg-zinc-50 px-6 py-10 pb-28 text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
      <div className="mx-auto w-full max-w-3xl">
        <header className="border-b border-zinc-200/70 pb-10 dark:border-zinc-800/70">
          <p className="text-xs font-semibold tracking-[0.26em] text-zinc-600 uppercase dark:text-zinc-400">
            Ayush Rameja&apos;s Blogs
          </p>
          <p className="mt-3 text-xs font-semibold tracking-[0.26em] text-zinc-500 uppercase dark:text-zinc-500">
            Blog post
          </p>

          <h1 className="mt-5 text-balance font-editorial text-5xl leading-[1.12] tracking-tight sm:text-6xl sm:leading-[1.05]">
            {post.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">{post.description}</p>

          <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-zinc-600 dark:text-zinc-300">
            <span>
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
                timeZone: "UTC",
              })}
            </span>
            <span aria-hidden className="text-zinc-400 dark:text-zinc-600">
              •
            </span>
            <span>{post.readingTime} read</span>
            {post.tags.length > 0 ? (
              <>
                <span aria-hidden className="text-zinc-400 dark:text-zinc-600">
                  •
                </span>
                <ul className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-zinc-600 dark:text-zinc-400">
                  {post.tags.map((tag) => (
                    <li key={tag} className="font-semibold tracking-wide uppercase">
                      {tag}
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>
        </header>

        {post.coverImage ? (
          <div className="mt-10 overflow-hidden bg-zinc-200 dark:bg-zinc-900">
            <div className="relative aspect-[1200/630]">
              <Image
                src={post.coverImage.src}
                alt={post.coverImage.alt}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 48rem"
              />
            </div>
          </div>
        ) : null}

        <article className="mt-10">
          <div
            className="text-zinc-800 dark:text-zinc-200 [&_p]:mt-5 [&_p]:text-[16px] [&_p]:leading-8 [&_p]:md:text-[18px] [&_h2]:mt-14 [&_h2]:font-editorial [&_h2]:text-3xl [&_h2]:leading-[1.15] [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-zinc-950 dark:[&_h2]:text-zinc-50 [&_h3]:mt-12 [&_h3]:font-editorial [&_h3]:text-2xl [&_h3]:leading-[1.2] [&_h3]:font-semibold [&_h3]:tracking-tight [&_h3]:text-zinc-950 dark:[&_h3]:text-zinc-50 [&_ul]:mt-5 [&_ul]:space-y-2.5 [&_ul]:pl-5 [&_ul]:list-disc [&_li]:text-[16px] [&_li]:leading-8 [&_li]:md:text-[18px] [&_strong]:font-semibold [&_a]:underline [&_a]:decoration-zinc-400/60 [&_a]:underline-offset-4 hover:[&_a]:decoration-zinc-900/70 dark:[&_a]:decoration-zinc-500/60 dark:hover:[&_a]:decoration-zinc-200/80 [&_code]:rounded [&_code]:bg-zinc-950/5 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-[0.9em] dark:[&_code]:bg-zinc-950/35"
          >
            {children}
          </div>
        </article>
      </div>
    </main>
  );
}
