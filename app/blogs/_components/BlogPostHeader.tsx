"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function BlogPostHeader({ title, desk }: { title: string; desk: "engineering" | "life" }) {
  const [progress, setProgress] = useState(0);
  const [showTitle, setShowTitle] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const available = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(available > 0 ? Math.min(1, window.scrollY / available) : 0);
      setShowTitle(window.scrollY > 220);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-transparent bg-[color-mix(in_srgb,var(--paper)_92%,transparent)] backdrop-blur-md">
      <div
        className={`absolute inset-x-0 top-0 h-0.5 origin-left ${desk === "engineering" ? "bg-[var(--cobalt)]" : "bg-[var(--vermilion)]"}`}
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden
      />
      <div className="mx-auto flex h-14 max-w-[52rem] items-center gap-4 px-4 sm:px-8">
        <Link href="/blogs" className="flex h-8 w-8 shrink-0 items-center justify-center border border-[var(--rule)] bg-[var(--paper-raised)] text-[var(--muted)] hover:text-[var(--cobalt)]" aria-label="Back to field notes">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <p className={`truncate font-mono text-[10px] uppercase text-[var(--muted)] transition-opacity ${showTitle ? "opacity-100" : "opacity-0"}`}>
          {title}
        </p>
      </div>
    </header>
  );
}
