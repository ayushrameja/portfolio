import type { ReactElement } from "react";

export type BlogPost = {
  desk: "engineering" | "life";
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  readingTime: string;
  Content: () => ReactElement;
};
