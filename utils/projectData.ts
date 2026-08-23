import type { PortfolioProject } from "@/types/project";

export const projects: PortfolioProject[] = [
  {
    slug: "global-web-platform-migration",
    employerKey: "autodesk",
    title: "Global Web Platform Migration",
    role: "Full-Stack Engineer",
    summary:
      "Modernized a global content estate into a faster, maintainable Next.js platform backed by structured content and cloud delivery.",
    skills: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "AWS",
      "Contentful",
      "WebSockets",
    ],
    outcomes: [
      "Migrated more than 100 pages from several legacy frontend stacks into one Contentful-driven architecture.",
      "Improved page-load performance by 15–30% and raised Lighthouse performance scores from the 60–70 range to 80–90.",
      "Supported organic growth from 1M to more than 5M monthly page views across the platform.",
    ],
    featured: true,
  },
  {
    slug: "learning-platform-modernization",
    employerKey: "autodesk",
    title: "Learning Platform Modernization",
    role: "Full-Stack Engineer",
    summary:
      "Evolved a learning product across course architecture, real-time workflows, integrations, caching, and scheduled services.",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Deno",
      "Redis",
      "AWS",
      "WebSockets",
    ],
    outcomes: [
      "Delivered more than 30 features across course creation, support sessions, and student-teacher workflows.",
      "Designed a hybrid course architecture spanning schemas, APIs, authentication-aware flows, and WebSockets.",
      "Improved performance by 15–30%, increased initial user engagement by 50%, sustained 5–10% quarterly growth, and lifted course creation by 15%.",
    ],
    featured: false,
  },
  {
    slug: "industrial-health-monitoring-platform",
    employerKey: "siemens",
    title: "Industrial Health Monitoring Platform",
    role: "Full-Stack Developer",
    summary:
      "Built a real-time industrial monitoring system that turned machine telemetry into dependable operator workflows.",
    skills: [
      "React",
      "Node.js",
      "Express",
      "Zustand",
      "InfluxDB",
      "MQTT",
      "Docker",
    ],
    outcomes: [
      "Reduced monitoring time by 40% with responsive performance views and clearer operator workflows.",
      "Improved API and data handling through microservices, MQTT integration, and focused state management.",
      "Took the product from proof of concept through user testing to containerized production releases.",
    ],
    featured: true,
  },
  {
    slug: "real-time-shop-floor-operations-platform",
    employerKey: "siemens",
    title: "Real-Time Shop-Floor Operations Platform",
    role: "Full-Stack Developer",
    summary:
      "Connected industrial equipment, backend services, and operator interfaces in a production-ready monitoring platform.",
    skills: [
      "Angular",
      "Node.js",
      "Express",
      "WebSockets",
      "MQTT",
      "OPCUA",
      "Nexe",
      "Docker",
    ],
    outcomes: [
      "Reduced data lag through WebSocket synchronization and reliable machine-to-cloud feedback loops.",
      "Streamlined setup, reporting, and data operations with industrial protocol integrations.",
      "Packaged repeatable shop-floor deployments with Docker and standalone executables.",
    ],
    featured: false,
  },
  {
    slug: "enterprise-customer-experience-platform",
    employerKey: "accenture",
    title: "Enterprise Customer Experience Platform",
    role: "Full-Stack Developer",
    summary:
      "Built the service and data foundation for an enterprise customer-experience platform operating on Google Cloud.",
    skills: [
      "Node.js",
      "Express",
      "PostgreSQL",
      "GCP",
      "Microservices",
      "Monolithic Architecture",
      "Nexe",
      "Docker",
    ],
    outcomes: [
      "Built backend APIs, cloud-storage integrations, and role-management workflows from the ground up.",
      "Improved application performance by 50% while moving the system toward a microservice architecture.",
      "Increased reliability by 40% through query optimization and more scalable service boundaries.",
    ],
    featured: true,
  },
  {
    slug: "ma-workflow-platform",
    employerKey: "accenture",
    title: "M&A Workflow Platform",
    role: "Full-Stack Developer",
    summary:
      "Improved an enterprise deal-review platform across interface usability, backend scalability, and cloud delivery.",
    skills: [
      "Angular",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Azure",
      "Custom Algorithms",
      "Docker",
    ],
    outcomes: [
      "Improved application performance by 40% and scalability by 50% through backend and infrastructure work.",
      "Reduced deployment time by 35% and operational cost by 20% with Azure-based delivery.",
      "Raised user engagement by 20% and interface usability by 30% while automating repetitive review steps for brokers.",
    ],
    featured: false,
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
