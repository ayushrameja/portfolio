export default function Loading() {
  return (
    <main className="journal-shell flex min-h-dvh items-center justify-center px-4">
      <div className="w-full max-w-sm border-y journal-rule py-6 text-center">
        <p className="font-mono text-xs uppercase text-[var(--cobalt)]">Opening field journal</p>
        <div className="mt-5 h-px origin-left animate-pulse bg-[var(--vermilion)]" />
      </div>
    </main>
  );
}
