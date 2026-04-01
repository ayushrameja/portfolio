import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Footer from "@/app/_components/Footer";
import ProjectCard from "@/components/ProjectCard";
import { BASE_URL } from "@/constants/links";
import type { EmployerSlug } from "@/types/project";
import {
  EXPERIENCE_SLUGS,
  getExperienceOrNull,
  getProjectsForEmployer,
} from "@/utils/experienceData";

export const dynamic = "force-static";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return EXPERIENCE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const exp = getExperienceOrNull(slug);
  if (!exp) {
    return { title: "Experience | Ayush Rameja" };
  }
  const title = `${exp.companyName} | Experience | Ayush Rameja`;
  const description = `${exp.roleLine} — ${exp.companyName}. ${exp.dateRange}. ${exp.location}.`;
  const canonical = `/experience/${slug}`;
  const ogUrl = `${BASE_URL}${canonical}`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      type: "website",
      url: ogUrl,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function ExperiencePage({ params }: Props) {
  const { slug } = await params;
  const exp = getExperienceOrNull(slug);
  if (!exp) notFound();

  const employerSlug = slug as EmployerSlug;
  const list = getProjectsForEmployer(employerSlug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${exp.companyName} | Experience`,
    description: `${exp.roleLine} at ${exp.companyName}`,
    url: `${BASE_URL}/experience/${slug}`,
  };

  return (
    <main className="min-h-dvh pb-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="border-b border-zinc-200/70 bg-linear-to-b from-white via-zinc-50 to-zinc-50 px-6 py-12 dark:border-zinc-700/60 dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-950 sm:py-16">
        <div className="mx-auto w-full max-w-4xl">
          <Link
            href="/"
            className="inline-flex text-sm font-semibold text-zinc-600 transition hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            ← Portfolio
          </Link>
          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
            Experience
          </p>
          <h1 className="mt-3 font-editorial text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl md:text-6xl">
            {exp.companyName}
          </h1>
          <p className="mt-4 text-lg font-semibold text-zinc-800 dark:text-zinc-200">
            {exp.roleLine}
            {exp.viaLabel && exp.viaHref ? (
              <>
                {" "}
                <span className="font-normal text-zinc-600 dark:text-zinc-400">
                  (via{" "}
                  <a
                    href={exp.viaHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-zinc-900 underline decoration-zinc-400/40 underline-offset-4 transition hover:decoration-zinc-600 dark:text-zinc-100 dark:decoration-zinc-600/50"
                  >
                    {exp.viaLabel}
                  </a>
                  )
                </span>
              </>
            ) : null}
          </p>
          <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
            {exp.dateRange}
            <span className="text-zinc-400 dark:text-zinc-500"> · </span>
            {exp.location}
          </p>
          <ul className="mt-8 grid gap-3 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            {exp.summaryBullets.map((line) => (
              <li key={line} className="flex gap-3">
                <span
                  aria-hidden
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-fuchsia-500 dark:bg-fuchsia-400"
                />
                <span>{line}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            {exp.externalLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200/70 bg-white/80 px-4 py-2 text-sm font-semibold text-zinc-900 shadow-sm transition hover:bg-white dark:border-zinc-700/60 dark:bg-zinc-900/50 dark:text-zinc-100 dark:hover:bg-zinc-900/70"
              >
                {item.label}
                <span aria-hidden className="text-zinc-500 dark:text-zinc-400">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <section className="px-6 py-16">
        <div className="mx-auto w-full max-w-7xl">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
            Selected work
          </h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-300">
            Projects and outcomes from this chapter of my career.
          </p>
          <div className="mt-10 space-y-10">
            {list.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                linkEmployerBadge={false}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
