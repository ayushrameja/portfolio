import Link from "next/link";
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
    day: "numeric",
    timeZone: "UTC",
  });
}

function getTagColor(tag: string) {
  const colors = [
    "bg-pink-100 text-pink-700 dark:bg-pink-500/10 dark:text-pink-400 border-pink-200 dark:border-pink-500/20",
    "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 border-blue-200 dark:border-blue-500/20",
    "bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400 border-purple-200 dark:border-purple-500/20",
    "bg-orange-100 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400 border-orange-200 dark:border-orange-500/20",
    "bg-teal-100 text-teal-700 dark:bg-teal-500/10 dark:text-teal-400 border-teal-200 dark:border-teal-500/20",
  ];
  const hash = tag.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[hash % colors.length];
}

export default function BlogsPage() {
  const [featured, ...rest] = allPosts;
  // Take next 3 for secondary featured (vertical list)
  const secondaryFeatured = rest.slice(0, 3);
  const remaining = rest.slice(3);

  return (
    <main className="min-h-dvh bg-zinc-50 text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
      <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 lg:px-8">
        {/* Top Section: Featured + List */}
        <section className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Main Featured Post - Text Only */}
          {featured && (
            <Link
              href={`/blogs/${featured.slug}`}
              className="group relative flex flex-col justify-center rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/50 lg:col-span-8 lg:p-12"
            >
              <div className="mb-6 flex flex-wrap gap-2">
                {featured.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`inline-block rounded-full border px-3 py-1 text-[11px] font-bold tracking-wider uppercase ${getTagColor(tag)}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <h2 className="font-editorial text-4xl font-bold leading-[1.1] tracking-tight text-zinc-900 group-hover:underline group-hover:decoration-zinc-400 group-hover:underline-offset-4 dark:text-zinc-50 sm:text-5xl md:text-6xl">
                {featured.title}
              </h2>
              
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-xl">
                {featured.description}
              </p>
              
              <div className="mt-8 flex items-center gap-3 text-xs font-bold tracking-widest uppercase text-zinc-500">
                <span>{formatDate(featured.publishedAt)}</span>
                <span className="h-1 w-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                <span>{featured.readingTime} read</span>
              </div>
            </Link>
          )}

          {/* Secondary Featured Column - List */}
          <div className="flex flex-col gap-6 lg:col-span-4">
            <h3 className="border-b border-zinc-200 pb-3 font-editorial text-lg font-bold uppercase tracking-widest text-zinc-400 dark:border-zinc-800">
              Top Stories
            </h3>
            <div className="flex flex-col gap-6">
              {secondaryFeatured.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blogs/${post.slug}`}
                  className="group flex flex-col gap-2 rounded-lg transition"
                >
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold tracking-widest uppercase ${getTagColor(post.tags[0]).split(' ')[1]}`}>
                      {post.tags[0]}
                    </span>
                    <span className="text-[10px] text-zinc-400">•</span>
                    <span className="text-[10px] font-medium text-zinc-500">{formatDate(post.publishedAt)}</span>
                  </div>
                  <h4 className="font-editorial text-xl font-bold leading-tight tracking-tight text-zinc-900 group-hover:text-pink-600 dark:text-zinc-100 dark:group-hover:text-pink-400">
                    {post.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="my-16 h-px w-full bg-zinc-200 dark:bg-zinc-800" />

        {/* Remaining Posts Grid - Minimal Cards */}
        <section className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {remaining.map((post) => (
            <Link 
              key={post.slug} 
              href={`/blogs/${post.slug}`} 
              className="group flex flex-col justify-between rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/50"
            >
              <div>
                <div className="mb-4 flex items-center gap-2">
                  <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase ${getTagColor(post.tags[0])}`}>
                    {post.tags[0]}
                  </span>
                </div>
                <h3 className="font-editorial text-2xl font-bold leading-tight tracking-tight text-zinc-900 group-hover:underline group-hover:decoration-zinc-400 group-hover:underline-offset-4 dark:text-zinc-50">
                  {post.title}
                </h3>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {post.description}
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-zinc-400">
                <span>{formatDate(post.publishedAt)}</span>
                <span className="h-0.5 w-0.5 rounded-full bg-zinc-400" />
                <span>{post.readingTime}</span>
              </div>
            </Link>
          ))}
        </section>

        {remaining.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-zinc-500">More stories coming soon.</p>
          </div>
        )}
      </div>
    </main>
  );
}
