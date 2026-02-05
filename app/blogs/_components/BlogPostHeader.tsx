"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function BlogPostHeader({ title }: { title: string }) {
  const [showTitle, setShowTitle] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTitle(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div
        className={`border-b transition-all duration-300 ${
          showTitle
            ? "border-zinc-200/50 bg-white/80 backdrop-blur-xl dark:border-zinc-800/50 dark:bg-zinc-950/80"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-14 max-w-[720px] items-center gap-4 px-6">
          <Link
            href="/blogs"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 transition-colors hover:bg-zinc-200 hover:text-zinc-900 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-zinc-100"
            aria-label="Back to blogs"
          >
            ←
          </Link>
          <h2
            className={`truncate font-editorial text-sm font-bold tracking-tight text-zinc-900 transition-opacity duration-300 dark:text-zinc-100 ${
              showTitle ? "opacity-100" : "opacity-0"
            }`}
          >
            {title}
          </h2>
        </div>
      </div>
    </header>
  );
}
