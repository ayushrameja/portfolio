import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Footer from "@/app/_components/Footer";
import ProjectCard from "@/components/ProjectCard";
import ExperienceLogo from "@/components/experience/ExperienceLogo";
import { BASE_URL } from "@/constants/links";
import type { EmployerSlug } from "@/types/project";
import { createPageMetadata } from "@/utils/metadata";
import {
  EXPERIENCE_SLUGS,
  getExperienceOrNull,
  getProjectsForEmployer,
} from "@/utils/experienceData";

export const dynamic = "force-static";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return EXPERIENCE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const experience = getExperienceOrNull(slug);
  if (!experience) return { title: "Experience | Ayush Rameja" };

  const title = `${experience.companyName} | Experience | Ayush Rameja`;
  const description = `${experience.roleLine} — ${experience.companyName}. ${experience.dateRange}. ${experience.thesis}`;
  return createPageMetadata({
    title,
    description,
    path: `/experience/${slug}`,
  });
}

export default async function ExperiencePage({ params }: Props) {
  const { slug } = await params;
  const experience = getExperienceOrNull(slug);
  if (!experience) notFound();

  const projects = getProjectsForEmployer(slug as EmployerSlug);
  const sections = [
    { title: "Context", copy: experience.caseStudy.context, items: [] as string[] },
    { title: "Contribution", copy: experience.caseStudy.contribution, items: [] as string[] },
    { title: "Decisions", copy: "The implementation choices that shaped the work.", items: experience.caseStudy.decisions },
    { title: "Impact", copy: "The outcomes produced by the work.", items: experience.caseStudy.impact },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${experience.companyName} | Experience`,
    description: `${experience.roleLine} at ${experience.companyName}`,
    url: `${BASE_URL}/experience/${slug}`,
  };

  return (
    <main className="detail-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="case-study-hero" data-palette="paper">
        <div className="site-container">
          <div className="detail-page__breadcrumb">
            <Link className="text-link" href="/#work">← All experience</Link>
            <span>{experience.dateRange}</span>
          </div>

          <div className="case-study-hero__grid">
            <div>
              <p className="eyebrow">Professional experience</p>
              <ExperienceLogo slug={experience.slug} variant="hero" className="case-study-hero__logo" />
              <p className="case-study-hero__role">{experience.roleLine}</p>
              {experience.viaLabel ? <p className="case-study-hero__via">via {experience.viaLabel}</p> : null}
            </div>
            <div>
              <h1>{experience.headline}</h1>
              <p className="case-study-hero__thesis">{experience.thesis}</p>
              <p className="case-study-hero__location">{experience.location}</p>
            </div>
          </div>

          <dl className="case-study-metrics">
            {experience.impactMetrics.map((metric) => (
              <div key={metric.label}>
                <dt>{metric.label}</dt>
                <dd>{metric.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="case-study-body" data-palette="mist">
        <div className="site-container">
          <div className="section-heading">
            <div><p className="eyebrow">Case study</p><h2>What this experience proves.</h2></div>
            <p>Scope, ownership, decisions, and outcomes—without asking the reader to decode a project diary.</p>
          </div>
          <div className="case-study-sections">
            {sections.map((section, index) => (
              <article key={section.title}>
                <p className="case-study-sections__index">0{index + 1}</p>
                <div>
                  <h3>{section.title}</h3>
                  <p>{section.copy}</p>
                  {section.items.length ? (
                    <ul>{section.items.map((item) => <li key={item}>{item}</li>)}</ul>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="case-study-projects" data-palette="paper">
        <div className="site-container">
          <div className="section-heading">
            <div><p className="eyebrow">Selected projects</p><h2>Systems shipped at {experience.companyName}.</h2></div>
            <div className="case-study-projects__links">
              {experience.externalLinks.map((link) => (
                <a key={link.href} className="text-link" href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.label} <span aria-hidden>↗</span>
                </a>
              ))}
            </div>
          </div>
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} linkEmployerBadge={false} />
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
