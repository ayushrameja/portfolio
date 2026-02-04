import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-dvh items-center justify-center px-6">
      <div className="text-center">
        <p className="text-sm font-semibold text-fuchsia-600 dark:text-fuchsia-400">404</p>
        <h1 className="mt-2 text-3xl font-semibold text-zinc-950 dark:text-zinc-50">
          Page not found
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-300">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center justify-center rounded-xl bg-zinc-950 px-5 py-2.5 text-sm font-semibold text-zinc-50 transition hover:bg-black dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-white"
        >
          Go home
        </Link>
      </div>
    </main>
  );
}
