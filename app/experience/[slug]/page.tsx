import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import Footer from "@/app/_components/Footer";
import ExperienceLogo from "@/components/experience/ExperienceLogo";
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
  if (!exp) return { title: "Experience | Ayush Rameja" };

  const title = `${exp.companyName} | Experience | Ayush Rameja`;
  const description = `${exp.roleLine} — ${exp.companyName}. ${exp.dateRange}. ${exp.location}.`;
  const canonical = `/experience/${slug}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, type: "website", url: `${BASE_URL}${canonical}` },
    twitter: { card: "summary", title, description },
  };
}

export default async function ExperiencePage({ params }: Props) {
  const { slug } = await params;
  const exp = getExperienceOrNull(slug);
  if (!exp) notFound();

  const employerSlug = slug as EmployerSlug;
  const projects = getProjectsForEmployer(employerSlug);
  const sections = [
    { number: "A", title: "Context", copy: exp.caseStudy.context, items: [] },
    { number: "B", title: "Contribution", copy: exp.caseStudy.contribution, items: [] },
    { number: "C", title: "Decisions", copy: "The implementation choices that shaped the work.", items: exp.caseStudy.decisions },
    { number: "D", title: "Impact", copy: "The outcomes recorded from this chapter.", items: exp.caseStudy.impact },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${exp.companyName} | Experience`,
    description: `${exp.roleLine} at ${exp.companyName}`,
    url: `${BASE_URL}/experience/${slug}`,
  };

  return (
    <main className="journal-shell pb-4">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="px-4 pb-12 pt-6 sm:px-8 sm:pb-16 sm:pt-8">
        <div className="mx-auto w-full max-w-[88rem]">
          <div className="flex items-center justify-between gap-4 border-y journal-rule py-3">
            <Link href="/" className="journal-link font-mono text-xs uppercase">
              <ArrowLeft className="h-4 w-4" />
              Portfolio
            </Link>
            <p className="font-mono text-[10px] uppercase text-[var(--muted)]">Work archive / {exp.chapterNumber}</p>
          </div>

          <div className="grid gap-10 py-10 lg:grid-cols-12 lg:items-end lg:py-16">
            <div className="lg:col-span-4">
              <p className="font-mono text-sm text-[var(--vermilion)]">{exp.chapterNumber} / Company chapter</p>
              <ExperienceLogo slug={exp.slug} priority className="mt-8" />
              <p className="mt-8 text-lg font-bold">{exp.roleLine}</p>
              {exp.viaLabel ? <p className="mt-1 font-mono text-xs text-[var(--muted)]">via {exp.viaLabel}</p> : null}
            </div>
            <div className="lg:col-span-8">
              <h1 className="max-w-[13ch] font-serif text-6xl leading-[0.94] sm:text-7xl lg:text-[6.5rem]">{exp.chapterTitle}</h1>
              <p className="mt-7 max-w-3xl text-lg leading-8 text-[var(--muted)]">{exp.thesis}</p>
              <div className="mt-7 flex flex-wrap gap-x-7 gap-y-2 font-mono text-xs text-[var(--muted)]">
                <span>{exp.dateRange}</span>
                <span>{exp.location}</span>
              </div>
            </div>
          </div>

          <div className="grid border-y journal-rule sm:grid-cols-3">
            {exp.impactMetrics.map((metric, index) => (
              <div key={metric.label} className={`py-6 sm:px-7 sm:py-8 ${index ? "border-t journal-rule sm:border-l sm:border-t-0" : ""}`}>
                <p className="font-serif text-5xl text-[var(--cobalt)] sm:text-6xl">{metric.value}</p>
                <p className="mt-2 font-mono text-xs text-[var(--muted)]">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      <section className="border-y journal-rule bg-[var(--paper-raised)] px-4 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto w-full max-w-[88rem]">
          <div className="grid gap-7 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="journal-kicker">Case file</p>
              <h2 className="mt-4 max-w-[10ch] font-serif text-5xl leading-none">What this chapter proves.</h2>
            </div>
            <div className="lg:col-span-8">
              {sections.map((section) => (
                <article key={section.title} className="grid gap-5 border-b journal-rule py-8 first:border-t lg:grid-cols-[8rem_minmax(0,1fr)] lg:py-10">
                  <p className="font-mono text-xs text-[var(--vermilion)]">{section.number} / {section.title}</p>
                  <div>
                    <p className="font-serif text-2xl leading-snug sm:text-3xl">{section.copy}</p>
                    {section.items.length ? (
                      <ul className="mt-6 space-y-4">
                        {section.items.map((item) => (
                          <li key={item} className="grid grid-cols-[1rem_minmax(0,1fr)] gap-3 text-sm leading-7 text-[var(--muted)] sm:text-base">
                            <span className="mt-[0.65rem] h-1.5 w-1.5 bg-[var(--cobalt)]" aria-hidden />
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto w-full max-w-[88rem]">
          <div className="flex flex-col gap-6 border-b journal-rule pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="journal-kicker">Project ledger</p>
              <h2 className="mt-4 font-serif text-5xl sm:text-6xl">Selected systems</h2>
            </div>
            <div className="flex flex-wrap gap-4">
              {exp.externalLinks.map((link) => (
                <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="journal-link">
                  {link.label}<ArrowUpRight className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} linkEmployerBadge={false} />
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
