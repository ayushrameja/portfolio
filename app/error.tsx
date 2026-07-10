"use client";

import { useEffect } from "react";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => console.error(error), [error]);

  return (
    <main className="journal-shell flex min-h-dvh items-center justify-center px-4">
      <div className="w-full max-w-2xl border-y journal-rule py-10">
        <p className="journal-kicker">ERR / Binding problem</p>
        <h1 className="mt-5 font-serif text-6xl leading-none">This page lost the plot.</h1>
        <p className="mt-5 max-w-lg text-base leading-7 text-[var(--muted)]">An unexpected error interrupted the journal. The prose denies everything.</p>
        <button onClick={reset} className="journal-button mt-8 cursor-pointer">Try this chapter again</button>
      </div>
    </main>
  );
}
