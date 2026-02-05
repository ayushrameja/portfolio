import type { ReactElement } from "react";

export type BlogPostCoverImage = {
  src: string;
  alt: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  readingTime: string;
  coverImage?: BlogPostCoverImage;
  Content: () => ReactElement;
};
