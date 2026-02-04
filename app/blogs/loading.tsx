export default function BlogsLoading() {
  return (
    <main className="min-h-dvh px-6 py-10 pb-28">
      <div className="mx-auto w-full max-w-5xl">
        <div className="rounded-3xl border border-zinc-200/70 bg-white/70 p-8 dark:border-zinc-700/60 dark:bg-zinc-900/40">
          <div className="h-8 w-32 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />
          <div className="mt-2 h-4 w-64 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />

          <div className="mt-10 grid gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-2xl border border-zinc-200/70 bg-white/50 p-6 dark:border-zinc-700/60 dark:bg-zinc-950/20"
              >
                <div className="h-5 w-3/4 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                <div className="mt-2 h-4 w-full animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
