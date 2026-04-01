import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Footer from "@/app/_components/Footer";
import ExperienceAmbient from "@/components/experience/ExperienceAmbient";
import ExperienceLogo from "@/components/experience/ExperienceLogo";
import ProjectCard from "@/components/ProjectCard";
import { BASE_URL } from "@/constants/links";
import { getExperienceTheme } from "@/lib/experienceThemes";
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
  const theme = getExperienceTheme(employerSlug);
  const list = getProjectsForEmployer(employerSlug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${exp.companyName} | Experience`,
    description: `${exp.roleLine} at ${exp.companyName}`,
    url: `${BASE_URL}/experience/${slug}`,
  };

  return (
    <main className={`relative min-h-dvh pb-28 ${theme.page.shell}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div
        className={`relative overflow-hidden px-6 py-12 sm:py-16 ${theme.page.hero}`}
      >
        <div
          className={`pointer-events-none absolute inset-0 ${theme.page.gridPattern}`}
          aria-hidden
        />
        <ExperienceAmbient theme={theme} />
        <div className="relative mx-auto w-full max-w-4xl">
          <Link
            href="/"
            className={`inline-flex text-sm font-semibold transition ${theme.page.backLink}`}
          >
            ← Portfolio
          </Link>

          <div className="mt-8">
            <ExperienceLogo theme={theme} priority />
          </div>

          <p
            className={`mt-8 text-xs font-semibold uppercase tracking-[0.2em] ${theme.page.heroEyebrow}`}
          >
            Experience
          </p>
          <h1
            className={`mt-3 font-editorial text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl ${theme.page.heroTitle}`}
          >
            {exp.companyName}
          </h1>
          <p className={`mt-4 text-lg font-semibold ${theme.page.roleText}`}>
            {exp.roleLine}
            {exp.viaLabel && exp.viaHref ? (
              <>
                {" "}
                <span className="font-normal opacity-85 dark:opacity-90">
                  (via{" "}
                  <a
                    href={exp.viaHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold underline decoration-current/35 underline-offset-4 transition hover:decoration-current/55"
                  >
                    {exp.viaLabel}
                  </a>
                  )
                </span>
              </>
            ) : null}
          </p>
          <p className={`mt-3 text-sm ${theme.page.metaText}`}>
            {exp.dateRange}
            <span className="opacity-60"> · </span>
            {exp.location}
          </p>
          <ul className="mt-8 grid gap-3 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            {exp.summaryBullets.map((line) => (
              <li key={line} className="flex gap-3">
                <span
                  aria-hidden
                  className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${theme.page.bullet}`}
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
                className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold shadow-sm transition ${theme.page.externalLink}`}
              >
                {item.label}
                <span aria-hidden className="opacity-70">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <section className={`px-6 py-16 ${theme.page.projectsBand}`}>
        <div className="mx-auto w-full max-w-7xl">
          <h2
            className={`text-2xl font-semibold tracking-tight ${theme.page.sectionTitle}`}
          >
            Selected work
          </h2>
          <p className={`mt-2 ${theme.page.sectionSubtitle}`}>
            Projects and outcomes from this chapter of my career.
          </p>
          <div className="mt-10 space-y-10">
            {list.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                linkEmployerBadge={false}
                useEmployerTheme
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
