import Link from "next/link";

import type { ExperienceEntry } from "@/utils/experienceData";
import { experiencePath } from "@/utils/experienceData";

type ExperienceCardProps = {
  exp: ExperienceEntry;
  projectCount: number;
};

export default function ExperienceCard({ exp, projectCount }: ExperienceCardProps) {
  const href = experiencePath(exp.slug);
  const teaser = exp.summaryBullets[0] ?? "";

  return (
    <Link
      href={href}
      className="group relative flex h-full min-h-[280px] flex-col overflow-hidden rounded-3xl border border-zinc-200/70 bg-white/60 p-6 shadow-[0_22px_70px_-55px_rgba(0,0,0,0.22)] backdrop-blur transition-all duration-300 hover:border-zinc-300/80 hover:shadow-[0_30px_90px_-60px_rgba(0,0,0,0.26)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500/35 dark:border-zinc-700/60 dark:bg-zinc-900/30 dark:shadow-[0_22px_70px_-55px_rgba(0,0,0,0.7)] dark:hover:border-zinc-600/70 dark:hover:shadow-[0_30px_90px_-60px_rgba(0,0,0,0.85)] sm:p-8"
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-fuchsia-500/12 blur-3xl dark:bg-fuchsia-400/10" />
        <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-violet-500/10 blur-3xl dark:bg-violet-400/8" />
      </div>

      <div className="relative flex flex-1 flex-col">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-fuchsia-500/25 bg-fuchsia-500/10 px-3 py-1 text-xs font-medium text-fuchsia-700 dark:border-fuchsia-400/30 dark:bg-fuchsia-400/10 dark:text-fuchsia-200">
            {exp.roleLine}
          </span>
          {exp.viaLabel ? (
            <span className="rounded-full border border-zinc-200/70 bg-zinc-950/5 px-3 py-1 text-xs font-medium text-zinc-600 dark:border-zinc-700/60 dark:bg-zinc-950/25 dark:text-zinc-400">
              via {exp.viaLabel}
            </span>
          ) : null}
        </div>

        <h3 className="mt-5 text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-3xl">
          {exp.companyName}
        </h3>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          {exp.dateRange}
          <span className="text-zinc-400 dark:text-zinc-500"> · </span>
          {exp.location}
        </p>

        <p className="mt-4 flex-1 text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
          {teaser}
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-200/70 pt-5 dark:border-zinc-700/60">
          <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
            {projectCount} {projectCount === 1 ? "project" : "projects"}
          </span>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-zinc-900 transition group-hover:gap-2 dark:text-zinc-100">
            View work
            <span aria-hidden>→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
