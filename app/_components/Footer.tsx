export default function Footer() {
  return (
    <footer className="px-6 pb-10">
      <div className="mx-auto w-full max-w-7xl">
        <div className="h-px w-full bg-linear-to-r from-transparent via-zinc-300/60 to-transparent dark:via-zinc-700/60" />
        <div className="mt-6 flex flex-col gap-2 text-sm text-zinc-600 dark:text-zinc-300 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Ayush Rameja. All rights reserved.</p>
          <p className="text-zinc-500 dark:text-zinc-400">Code licensed under Apache License 2.0.</p>
        </div>
      </div>
    </footer>
  );
}
