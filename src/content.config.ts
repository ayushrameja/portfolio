import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// Public records only.
// Excluded on purpose: TypeRush, Receipt creator, and private projects.
const notes = defineCollection({
  loader: glob({ base: "./src/content/notes", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    desk: z.enum(["engineering", "life"]),
    publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    readingTime: z.string(),
    tags: z.array(z.string()),
    archivedRoute: z.string(),
  }),
});

const projects = defineCollection({
  loader: glob({ base: "./src/content/projects", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    kind: z.enum(["employer", "independent"]),
    visibility: z.literal("public"),
    order: z.number().int(),
    record: z.string(),
    role: z.string().optional(),
    status: z.string().optional(),
    client: z.string().optional(),
    employer: z.enum(["autodesk", "siemens", "accenture"]).optional(),
    timeline: z.string().optional(),
    skills: z.array(z.string()).optional(),
    href: z.url().optional(),
    source: z.url().optional(),
    archivedRoute: z.string().optional(),
  }),
});

export const collections = { notes, projects };
