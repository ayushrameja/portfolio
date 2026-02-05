import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "@/types/blog";
import profile from "@/public/assets/image/profile.png";

export default function BlogPostShell({
  post,
  children,
}: {
  post: BlogPost;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-dvh bg-white text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
      <article className="mx-auto max-w-[720px] px-6 py-14 sm:py-24 lg:py-28">
        <header className="mb-16">
          <div className="mb-8 flex items-center gap-3 text-xs font-bold tracking-widest uppercase text-zinc-400">
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span className="h-0.5 w-0.5 rounded-full bg-zinc-400" />
            <span>{post.readingTime} read</span>
          </div>

          <h1 className="mb-6 max-w-[26ch] text-balance font-editorial text-4xl font-bold leading-[1.06] tracking-tight text-zinc-900 dark:text-zinc-50 sm:max-w-none sm:text-5xl md:text-6xl">
            {post.title}
          </h1>

          <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-400 sm:text-xl">
            {post.description}
          </p>

          <div className="mt-8 flex items-center gap-3 border-t border-zinc-100 pt-8 dark:border-zinc-900">
            <div className="relative h-10 w-10 overflow-hidden rounded-full bg-zinc-100 ring-1 ring-inset ring-zinc-900/10 dark:bg-zinc-800 dark:ring-white/10">
              <Image src={profile} alt="Ayush Rameja" fill className="object-cover" sizes="40px" priority />
            </div>
            <div className="text-sm">
              <p className="font-bold text-zinc-900 dark:text-zinc-100">Ayush Rameja</p>
              <p className="text-zinc-500">Software Engineer</p>
            </div>
          </div>
        </header>

        <div
          className="font-serif text-[18px] leading-8 text-zinc-800 dark:text-zinc-200 sm:text-[19px]
          [&_p]:mt-7 [&_p]:text-zinc-800 dark:[&_p]:text-zinc-200
          [&_h2]:mt-16 [&_h2]:text-3xl [&_h2]:leading-[1.15] [&_h2]:font-editorial [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-zinc-950 dark:[&_h2]:text-zinc-50
          [&_h3]:mt-12 [&_h3]:text-2xl [&_h3]:leading-[1.2] [&_h3]:font-editorial [&_h3]:font-bold [&_h3]:tracking-tight [&_h3]:text-zinc-950 dark:[&_h3]:text-zinc-50
          [&_ul]:mt-7 [&_ul]:space-y-3 [&_ul]:pl-5 [&_ul]:list-disc
          [&_ol]:mt-7 [&_ol]:space-y-3 [&_ol]:pl-5 [&_ol]:list-decimal
          [&_li]:leading-8
          [&_strong]:font-bold [&_strong]:text-zinc-950 dark:[&_strong]:text-zinc-50
          [&_a]:font-semibold [&_a]:underline [&_a]:decoration-zinc-300 [&_a]:underline-offset-4 hover:[&_a]:decoration-zinc-900 dark:[&_a]:decoration-zinc-700 dark:hover:[&_a]:decoration-zinc-200
          [&_code]:rounded-md [&_code]:bg-zinc-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-[0.92em] [&_code]:font-medium [&_code]:text-zinc-950 dark:[&_code]:bg-zinc-900 dark:[&_code]:text-zinc-50
          [&_hr]:my-14 [&_hr]:border-zinc-200 dark:[&_hr]:border-zinc-800"
        >
          {children}
        </div>

        <div className="mt-24 flex items-center justify-between border-t border-zinc-100 pt-10 dark:border-zinc-900">
          <Link
            href="/blogs"
            className="group flex items-center gap-3 text-sm font-bold text-zinc-900 transition-colors hover:text-zinc-600 dark:text-zinc-100 dark:hover:text-zinc-400"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 transition-colors group-hover:bg-zinc-200 dark:bg-zinc-800 dark:group-hover:bg-zinc-700">←</span>
            Back to blogs
          </Link>
          <div className="flex gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>
    </main>
  );
}
