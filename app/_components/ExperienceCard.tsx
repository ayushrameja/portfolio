import Link from "next/link";

import ExperienceLogo from "@/components/experience/ExperienceLogo";
import type { ExperienceTheme } from "@/lib/experienceThemes";
import type { ExperienceEntry } from "@/utils/experienceData";
import { experiencePath } from "@/utils/experienceData";

type ExperienceCardProps = {
  exp: ExperienceEntry;
  theme: ExperienceTheme;
  projectCount: number;
};

export default function ExperienceCard({
  exp,
  theme,
  projectCount,
}: ExperienceCardProps) {
  const href = experiencePath(exp.slug);
  const teaser = exp.summaryBullets[0] ?? "";

  return (
    <Link
      href={href}
      className={`group relative flex h-full min-h-[300px] flex-col overflow-hidden rounded-3xl p-6 shadow-[0_22px_70px_-55px_rgba(0,0,0,0.18)] backdrop-blur transition-all duration-300 hover:shadow-[0_30px_90px_-60px_rgba(0,0,0,0.22)] focus-visible:outline-none sm:min-h-[320px] sm:p-8 ${theme.card.shell} ${theme.card.focusRing} focus-visible:ring-2`}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div
          className={`absolute -right-24 -top-24 h-56 w-56 rounded-full ${theme.card.glowLeft}`}
        />
        <div
          className={`absolute -bottom-20 -left-20 h-56 w-56 rounded-full ${theme.card.glowRight}`}
        />
      </div>

      <div className="relative flex flex-1 flex-col">
        <ExperienceLogo theme={theme} className="mb-1" />

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${theme.card.roleChip}`}
          >
            {exp.roleLine}
          </span>
          {exp.viaLabel ? (
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${theme.card.viaChip}`}
            >
              via {exp.viaLabel}
            </span>
          ) : null}
        </div>

        <h3 className="mt-4 text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-3xl">
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

        <div
          className={`mt-6 flex flex-wrap items-center justify-between gap-3 border-t pt-5 ${theme.card.footerBorder} ${theme.card.cta}`}
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
            {projectCount} {projectCount === 1 ? "project" : "projects"}
          </span>
          <span className="inline-flex items-center gap-1 text-sm font-semibold transition group-hover:gap-2">
            View work
            <span aria-hidden>→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
