import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

import { allPosts } from "./_posts";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Blogs | Ayush Rameja",
  description: "Notes on Next.js, performance, and building web products.",
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

export default function BlogsPage() {
  const [featured, ...rest] = allPosts;
  const topStories = rest.slice(0, 5);
  const morePosts = rest.slice(5);
  const latestPublishedAt = allPosts.reduce<string | undefined>(
    (latest, post) => (latest && latest > post.publishedAt ? latest : post.publishedAt),
    undefined,
  );

  return (
    <main className="min-h-dvh bg-zinc-50 px-6 py-10 pb-28 text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
      <div className="mx-auto w-full max-w-6xl">
        <header className="border-b border-zinc-200/70 pb-10 dark:border-zinc-800/70">
          <p className="text-xs font-semibold tracking-[0.26em] text-zinc-600 uppercase dark:text-zinc-400">
            Ayush Rameja&apos;s Blogs
          </p>
          <h1 className="mt-5 text-balance font-editorial text-5xl leading-[1.08] tracking-tight sm:text-6xl sm:leading-[1.03]">
            Practical notes, minus the hustle-culture fanfic.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
            Short, fix-first posts about Next.js, performance, accessibility, and shipping web products without making
            your future self hate you.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-zinc-600 dark:text-zinc-300">
            <span className="font-semibold text-zinc-950 dark:text-zinc-50">
              {allPosts.length} post{allPosts.length === 1 ? "" : "s"}
            </span>
            {latestPublishedAt ? (
              <>
                <span aria-hidden className="text-zinc-400 dark:text-zinc-600">
                  •
                </span>
                <span>Latest: {formatDate(latestPublishedAt)}</span>
              </>
            ) : null}
          </div>
        </header>

        {featured ? (
          <section className="mt-10 grid gap-10 lg:grid-cols-12">
            <Link href={`/blogs/${featured.slug}`} className="group block lg:col-span-8">
              <div className="relative aspect-[16/9] overflow-hidden bg-zinc-200 dark:bg-zinc-900">
                {featured.coverImage ? (
                  <Image
                    src={featured.coverImage.src}
                    alt={featured.coverImage.alt}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.02]"
                    priority
                    sizes="(max-width: 1024px) 100vw, 56rem"
                  />
                ) : null}
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-zinc-950/35 via-zinc-950/10 to-transparent dark:from-zinc-950/55" />
              </div>

              <div className="mt-6">
                <p className="text-xs font-semibold tracking-[0.26em] text-zinc-600 uppercase dark:text-zinc-400">
                  Featured <span aria-hidden>•</span> {formatDate(featured.publishedAt)} <span aria-hidden>•</span>{" "}
                  {featured.readingTime} read
                </p>
                <h2 className="mt-3 text-balance font-editorial text-4xl leading-[1.08] tracking-tight sm:text-5xl sm:leading-[1.03]">
                  {featured.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-300">{featured.description}</p>
                {featured.tags.length > 0 ? (
                  <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-xs text-zinc-600 dark:text-zinc-400">
                    {featured.tags.slice(0, 4).map((tag) => (
                      <li key={tag} className="font-semibold tracking-wide uppercase">
                        {tag}
                      </li>
                    ))}
                  </ul>
                ) : null}
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-zinc-950 dark:text-zinc-50">
                  Read post <span aria-hidden>→</span>
                </div>
              </div>
            </Link>

            <aside className="lg:col-span-4">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-xs font-semibold tracking-[0.26em] text-zinc-600 uppercase dark:text-zinc-400">
                  Top stories
                </h3>
                {morePosts.length > 0 ? (
                  <Link
                    href="#more"
                    className="text-xs font-semibold text-zinc-600 underline decoration-zinc-300/70 underline-offset-4 hover:text-zinc-950 dark:text-zinc-300 dark:decoration-zinc-700/70 dark:hover:text-zinc-50"
                  >
                    More
                  </Link>
                ) : null}
              </div>

              <ol className="mt-5 divide-y divide-zinc-200/70 dark:divide-zinc-800/70">
                {topStories.length > 0 ? (
                  topStories.map((post, i) => (
                    <li key={post.slug}>
                      <Link href={`/blogs/${post.slug}`} className="group grid grid-cols-[auto_1fr_auto] gap-4 py-5">
                        <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-zinc-950 text-[11px] font-semibold text-zinc-50 dark:bg-zinc-50 dark:text-zinc-950">
                          {i + 1}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs text-zinc-600 dark:text-zinc-400">{formatDate(post.publishedAt)}</p>
                          <h4 className="mt-2 line-clamp-2 font-editorial text-xl leading-snug tracking-tight text-zinc-950 group-hover:underline group-hover:underline-offset-4 dark:text-zinc-50">
                            {post.title}
                          </h4>
                          <p className="mt-2 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-300">
                            {post.description}
                          </p>
                        </div>
                        <div className="relative mt-1 h-14 w-14 overflow-hidden bg-zinc-200 dark:bg-zinc-900">
                          {post.coverImage ? (
                            <Image
                              src={post.coverImage.src}
                              alt={post.coverImage.alt}
                              fill
                              className="object-cover"
                              sizes="56px"
                            />
                          ) : null}
                        </div>
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="py-5 text-sm text-zinc-600 dark:text-zinc-300">
                    More posts soon. I&apos;m busy turning coffee into technical debt.
                  </li>
                )}
              </ol>
            </aside>
          </section>
        ) : (
          <section className="mt-10 border border-zinc-200/70 p-8 text-zinc-700 dark:border-zinc-800/70 dark:text-zinc-200">
            No posts yet. It&apos;s quiet here. Too quiet.
          </section>
        )}

        {morePosts.length > 0 ? (
          <section id="more" className="mt-14 scroll-mt-28 border-t border-zinc-200/70 pt-10 dark:border-zinc-800/70">
            <h3 className="text-xs font-semibold tracking-[0.26em] text-zinc-600 uppercase dark:text-zinc-400">
              More
            </h3>
            <div className="mt-6 grid gap-10 md:grid-cols-2">
              {morePosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blogs/${post.slug}`}
                  className="group block border-b border-zinc-200/70 pb-10 dark:border-zinc-800/70"
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-zinc-200 dark:bg-zinc-900">
                    {post.coverImage ? (
                      <Image
                        src={post.coverImage.src}
                        alt={post.coverImage.alt}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-[1.02]"
                        sizes="(max-width: 768px) 100vw, 40rem"
                      />
                    ) : null}
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-zinc-600 dark:text-zinc-400">
                    <span>{formatDate(post.publishedAt)}</span>
                    <span aria-hidden className="text-zinc-400 dark:text-zinc-600">
                      •
                    </span>
                    <span>{post.readingTime} read</span>
                  </div>
                  <h4 className="mt-3 text-balance font-editorial text-3xl leading-[1.08] tracking-tight text-zinc-950 group-hover:underline group-hover:underline-offset-4 dark:text-zinc-50">
                    {post.title}
                  </h4>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">{post.description}</p>
                  {post.tags.length > 0 ? (
                    <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-xs text-zinc-600 dark:text-zinc-400">
                      {post.tags.slice(0, 3).map((tag) => (
                        <li key={tag} className="font-semibold tracking-wide uppercase">
                          {tag}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}
