export default function BlogsLoading() {
  return (
    <main className="journal-shell px-4 pb-32 pt-8 sm:px-8">
      <div className="mx-auto w-full max-w-[88rem]">
        <div className="border-y journal-rule py-4">
          <div className="h-3 w-44 animate-pulse bg-[var(--rule)]" />
        </div>
        <div className="py-12">
          <div className="h-3 w-32 animate-pulse bg-[var(--rule)]" />
          <div className="mt-6 h-20 max-w-3xl animate-pulse bg-[var(--rule)]" />
        </div>
        <div className="grid gap-12 lg:grid-cols-2">
          {[0, 1].map((column) => (
            <div key={column} className="border-y journal-rule py-6">
              {[0, 1, 2, 3].map((row) => (
                <div key={row} className="border-b journal-rule py-6">
                  <div className="h-7 w-4/5 animate-pulse bg-[var(--rule)]" />
                  <div className="mt-3 h-3 w-2/3 animate-pulse bg-[var(--rule)]" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
