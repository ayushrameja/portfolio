export type EmployerSlug = "autodesk" | "siemens" | "accenture";

export type Project = {
  id: number;
  name: string;
  role: string;
  client: string;
  employerKey: EmployerSlug;
  skills: string[];
  points: string[];
  link: string;
  timeline?: string;
};
