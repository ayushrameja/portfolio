export type EmployerSlug = "autodesk" | "siemens" | "accenture";

export type PortfolioProject = {
  slug: string;
  employerKey: EmployerSlug;
  title: string;
  role: string;
  summary: string;
  skills: readonly string[];
  outcomes: readonly string[];
  featured: boolean;
};
