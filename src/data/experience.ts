/** Roles and dates supplied in the owner's experience reference, November 2026.
 * Contributions are drawn from the existing public project records. */
export const experiences = [
  {
    id: "autodesk", company: "Autodesk", role: "Senior Software Engineer",
    start: "Dec 2024", end: "Present", title: "Platforms at scale",
    summary: "Content and learning platforms, built to grow.",
    description: "Building content systems and learning experiences across Autodesk’s web platforms.",
    focus: "From publishing to learning",
    story: "My work spans .comNext’s content architecture and MVP Learn v2’s course and teaching workflows.",
    contributions: [
      ["Content architecture", "Migrating static pages to Contentful and Next.js."],
      ["Learning workflows", "Building courses, live sessions and roadmaps with APIs and WebSockets."],
      ["Performance", "Working across rendering, caching, asset delivery and queue-based scheduling."],
    ],
    projects: ["comnext", "mvp-learn-v2"],
  },
  {
    id: "siemens", company: "Siemens Technology", role: "Software Engineer",
    start: "Aug 2023", end: "Dec 2024", title: "Systems on the factory floor",
    summary: "Real-time industrial data, made useful to operators.",
    description: "Turning industrial telemetry into responsive monitoring tools and dependable operator workflows.",
    focus: "From a signal to a decision",
    story: "On the IGBT Health App, I worked across the data pipeline and the interface, taking an industrial monitoring system from early proofs of concept through production releases.",
    contributions: [
      ["Live monitoring", "Building real-time performance views in React, with Zustand managing frontend state."],
      ["Data and APIs", "Connecting MQTT, microservices and InfluxDB to support industrial monitoring workflows."],
      ["Delivery", "Iterating through proofs of concept and user testing, with Docker-based releases."],
    ],
    projects: ["igbt-health-app"],
  },
  {
    id: "accenture", company: "Accenture AI", role: "Analyst",
    start: "Jun 2021", end: "Aug 2023", title: "Building the foundation",
    summary: "Enterprise work across interfaces, APIs and cloud infrastructure.",
    description: "Building enterprise applications across backend services, frontend interfaces and cloud deployments.",
    focus: "Across the application stack",
    story: "At Accenture, I contributed to client projects for Google and CHUBB, working on customer-experience services and mergers-and-acquisitions workflows.",
    contributions: [
      ["Backend services", "Building APIs, custom role management and GCP bucket integrations for Google Customer Experience."],
      ["Product workflows", "Developing Angular components and deal-review automation for CHUBB’s mergers-and-acquisitions application."],
      ["Cloud delivery", "Working with PostgreSQL, Docker, GCP and Azure to improve deployment and application reliability."],
    ],
    projects: ["google-customer-experience", "chubb-mergers-and-acquisitions"],
  },
] as const;
