import type { ReactElement } from "react";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string; // ISO date
  updatedAt?: string; // ISO date
  tags: string[];
  readingTime: string;
  Content: () => ReactElement;
};
