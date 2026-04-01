import type { EmployerSlug } from "@/types/project";
import { projects } from "@/utils/projectData";
import { LINKS } from "@/constants/links";

export const EXPERIENCE_SLUGS: EmployerSlug[] = [
  "autodesk",
  "siemens",
  "accenture",
];

export type ExperienceEntry = {
  slug: EmployerSlug;
  companyName: string;
  roleLine: string;
  viaLabel?: string;
  viaHref?: string;
  location: string;
  dateRange: string;
  summaryBullets: string[];
  externalLinks: { label: string; href: string }[];
};

export const experienceBySlug: Record<EmployerSlug, ExperienceEntry> = {
  autodesk: {
    slug: "autodesk",
    companyName: "Autodesk",
    roleLine: "Senior Software Engineer",
    viaLabel: "Quarks Technosoft",
    viaHref: LINKS.quarks,
    location: "Bangalore, India",
    dateRange: "Dec 2024 – Present",
    summaryBullets: [
      "Led full-stack delivery across Autodesk web platforms and learning systems within a 15-member cross-functional team.",
      "Reviewed 300+ PRs, led development of key student-facing services, and collaborated closely with product and UX teams.",
      "Served as rotating Scrum Master and contributed to system design, architecture evolution, and performance improvements.",
    ],
    externalLinks: [
      { label: "Autodesk", href: "https://www.autodesk.com/" },
      { label: "Quarks Technosoft", href: LINKS.quarks },
    ],
  },
  siemens: {
    slug: "siemens",
    companyName: "Siemens Technology",
    roleLine: "Software Engineer",
    location: "Bangalore, India",
    dateRange: "Aug 2023 – Dec 2024",
    summaryBullets: [
      "Built scalable systems for industrial monitoring and predictive maintenance.",
      "Worked across frontend, backend, and Docker-based deployments with a focus on performance and reliability.",
    ],
    externalLinks: [
      { label: "Siemens", href: "https://www.siemens.com/" },
    ],
  },
  accenture: {
    slug: "accenture",
    companyName: "Accenture AI",
    roleLine: "Analyst",
    location: "Bangalore, India",
    dateRange: "Jun 2021 – Aug 2023",
    summaryBullets: [
      "Developed frontend applications and API integrations using Angular, React, and Node.js.",
      "Supported deployments on Azure and Google Cloud.",
    ],
    externalLinks: [
      { label: "Accenture", href: "https://www.accenture.com/in-en" },
    ],
  },
};

export function experiencePath(slug: EmployerSlug): string {
  return `/experience/${slug}`;
}

export function getProjectsForEmployer(slug: EmployerSlug) {
  return projects.filter((p) => p.employerKey === slug);
}

export function getOrderedExperiences(): ExperienceEntry[] {
  return EXPERIENCE_SLUGS.map((slug) => experienceBySlug[slug]);
}

export function getExperienceOrNull(slug: string): ExperienceEntry | null {
  if ((EXPERIENCE_SLUGS as readonly string[]).includes(slug)) {
    return experienceBySlug[slug as EmployerSlug];
  }
  return null;
}
