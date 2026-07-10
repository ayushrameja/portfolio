import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="journal-shell flex min-h-dvh items-center justify-center px-4">
      <div className="w-full max-w-2xl border-y journal-rule py-10">
        <p className="font-mono text-sm text-[var(--vermilion)]">404 / Missing folio</p>
        <h1 className="mt-5 font-serif text-6xl leading-none sm:text-7xl">This page was never typeset.</h1>
        <p className="mt-5 max-w-lg text-base leading-7 text-[var(--muted)]">The address may have changed, or the page may have left to pursue a less demanding career.</p>
        <Link href="/" className="journal-button mt-8 w-fit"><ArrowLeft className="h-4 w-4" /> Return to the cover</Link>
      </div>
    </main>
  );
}
