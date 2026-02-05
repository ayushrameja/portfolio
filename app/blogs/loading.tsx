export default function BlogsLoading() {
  return (
    <main className="min-h-dvh bg-zinc-50 px-6 py-10 pb-28 text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
      <div className="mx-auto w-full max-w-6xl">
        <div className="border-b border-zinc-200/70 pb-10 dark:border-zinc-800/70">
          <div className="h-3 w-40 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="mt-6 h-12 w-3/4 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="mt-5 h-5 w-2/3 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="aspect-[16/9] animate-pulse bg-zinc-200 dark:bg-zinc-800" />
            <div className="mt-6 h-3 w-48 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="mt-4 h-10 w-5/6 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="mt-4 h-5 w-full animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="mt-2 h-5 w-4/5 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
          </div>

          <div className="lg:col-span-4">
            <div className="h-3 w-32 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="mt-5 divide-y divide-zinc-200/70 dark:divide-zinc-800/70">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="grid grid-cols-[auto_1fr_auto] gap-4 py-5">
                  <div className="mt-0.5 h-6 w-6 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-800" />
                  <div>
                    <div className="h-3 w-24 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                    <div className="mt-3 h-6 w-full animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                    <div className="mt-2 h-4 w-5/6 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                  </div>
                  <div className="mt-1 h-14 w-14 animate-pulse bg-zinc-200 dark:bg-zinc-800" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
