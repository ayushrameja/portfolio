export const profile = {
  name: "Ayush Rameja",
  title: "Full-stack platform engineer",
  statement: "I build the systems behind ambitious products.",
  intro:
    "Full-stack platform engineer at Autodesk, working across product UI, backend services, cloud delivery, performance, and the engineering that keeps all of it dependable.",
  headline:
    "I build scalable React, Next.js, backend, and cloud systems that move from idea to production.",
  summary:
    "4+ years across Autodesk, Siemens, and Accenture building content platforms, learning systems, industrial dashboards, microservices, and cloud-backed product workflows.",
  edition: "Field Journal / 2026",
  location: "Bangalore, India",
  featuredEmployer: "autodesk" as const,
  currentRole: {
    label: "Current chapter",
    role: "Senior Software Engineer",
    company: "Autodesk",
    note: "via Quarks Technosoft",
  },
  ctas: {
    work: "Explore selected work",
    notes: "Read field notes",
  },
  sections: {
    cover: "Cover",
    work: "Selected work",
    notes: "Field notes",
    correspondence: "Correspondence",
  },
  metrics: [
    { value: "4+", label: "years shipping product systems" },
    { value: "300+", label: "PRs reviewed across teams" },
    { value: "5M+", label: "monthly page views supported" },
  ],
  focusAreas: [
    "Full-stack product platforms",
    "Next.js performance and SEO",
    "Node.js services and cloud delivery",
    "Enterprise workflows and reliability",
  ],
  proofPoints: [
    "React, Next.js, TypeScript, Node.js, AWS",
    "Microservices, Redis, queues, WebSockets",
    "Performance, architecture, and product delivery",
  ],
} as const;
