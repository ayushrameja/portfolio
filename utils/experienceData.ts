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
  headline: string;
  thesis: string;
  companyName: string;
  roleLine: string;
  viaLabel?: string;
  viaHref?: string;
  location: string;
  dateRange: string;
  summaryBullets: string[];
  focus: string[];
  impactMetrics: { value: string; label: string }[];
  caseStudy: {
    context: string;
    contribution: string;
    decisions: string[];
    impact: string[];
  };
  externalLinks: { label: string; href: string }[];
};

export const experienceBySlug: Record<EmployerSlug, ExperienceEntry> = {
  autodesk: {
    slug: "autodesk",
    headline: "Platforms at scale",
    thesis:
      "Shipping and evolving content and learning platforms used at meaningful scale.",
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
    focus: ["Next.js platforms", "Learning systems", "AWS services"],
    impactMetrics: [
      { value: "100+", label: "pages migrated" },
      { value: "5M+", label: "monthly page views" },
      { value: "300+", label: "PRs reviewed" },
    ],
    caseStudy: {
      context:
        "The work spans Autodesk web platforms and learning systems inside a 15-member cross-functional team, with product, UX, backend, and delivery concerns moving in parallel.",
      contribution:
        "Led full-stack delivery, developed key student-facing services, reviewed 300+ pull requests, collaborated with product and UX, and served as rotating Scrum Master.",
      decisions: [
        "Moved 100+ pages toward a Contentful-driven architecture using Next.js, SSR, React Server Components, code splitting, and CloudFront delivery.",
        "Built learning workflows with schema and API changes, WebSockets, authentication-aware flows, Redis caching, queues, and scheduled work.",
      ],
      impact: [
        "Improved page performance by 15–30% and raised Lighthouse performance scores from the 60–70 range to 80–90.",
        "Supported SEO growth from 1M to 5M+ monthly page views and increased initial learning-platform engagement by 50%.",
      ],
    },
    externalLinks: [
      { label: "Autodesk", href: "https://www.autodesk.com/" },
      { label: "Quarks Technosoft", href: LINKS.quarks },
    ],
  },
  siemens: {
    slug: "siemens",
    headline: "Systems on the factory floor",
    thesis:
      "Turning real-time industrial data into dependable operator workflows.",
    companyName: "Siemens Technology",
    roleLine: "Software Engineer",
    location: "Bangalore, India",
    dateRange: "Aug 2023 – Dec 2024",
    summaryBullets: [
      "Built scalable systems for industrial monitoring and predictive maintenance.",
      "Worked across frontend, backend, and Docker-based deployments with a focus on performance and reliability.",
    ],
    focus: ["Industrial dashboards", "Microservices", "Docker delivery"],
    impactMetrics: [
      { value: "40%", label: "less monitoring time" },
      { value: "2", label: "industrial platforms" },
      { value: "Real-time", label: "machine feedback" },
    ],
    caseStudy: {
      context:
        "Industrial monitoring and predictive-maintenance products needed responsive operator interfaces, reliable machine feedback, and deployment paths that worked beyond a developer laptop.",
      contribution:
        "Worked across frontend, backend, state management, integrations, performance, user testing, and packaged production delivery from early proof of concept onward.",
      decisions: [
        "Used microservices, MQTT, WebSockets, and OPCUA or FOCUS integrations to keep machine and application data synchronized in real time.",
        "Delivered React and Zustand interfaces with Docker and Nexe packaging for repeatable shop-floor releases.",
      ],
      impact: [
        "Reduced monitoring time by 40% while improving API performance, data handling, and real-time operator visibility.",
        "Streamlined setup, reporting, and production delivery across two industrial platforms.",
      ],
    },
    externalLinks: [
      { label: "Siemens", href: "https://www.siemens.com/" },
    ],
  },
  accenture: {
    slug: "accenture",
    headline: "Building the foundation",
    thesis:
      "Learning to own enterprise product work across interface, API, and cloud boundaries.",
    companyName: "Accenture AI",
    roleLine: "Analyst",
    location: "Bangalore, India",
    dateRange: "Jun 2021 – Aug 2023",
    summaryBullets: [
      "Developed frontend applications and API integrations using Angular, React, and Node.js.",
      "Supported deployments on Azure and Google Cloud.",
    ],
    focus: ["API platforms", "Cloud deployments", "Enterprise UX"],
    impactMetrics: [
      { value: "50%", label: "performance boost" },
      { value: "40%", label: "reliability gain" },
      { value: "2", label: "cloud providers" },
    ],
    caseStudy: {
      context:
        "Enterprise customer-experience and transaction-workflow projects required frontend applications, backend APIs, data workflows, and cloud deployments to move as one system.",
      contribution:
        "Built APIs, responsive Angular and React interfaces, role-management workflows, database integrations, and production delivery across GCP and Azure.",
      decisions: [
        "Helped move one application from a monolith toward microservices and optimized PostgreSQL queries for scalability and reliability.",
        "Used Docker-based delivery and cloud services to make production transitions faster and more repeatable.",
      ],
      impact: [
        "Improved application performance by up to 50% and reliability by 40% on an enterprise customer-experience platform.",
        "Reduced deployment time by 35%, operational cost by 20%, and improved usability on an enterprise workflow platform.",
      ],
    },
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
