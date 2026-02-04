import type { BlogPost } from "./post";
import { post as accessibilityFixes } from "./accessibility-fixes-10-minutes";
import { post as seoForDevelopers } from "./seo-for-developers-nextjs-checklist";

export const allPosts: BlogPost[] = [seoForDevelopers, accessibilityFixes].sort((a, b) =>
  b.publishedAt.localeCompare(a.publishedAt)
);

export function getPostBySlug(slug: string): BlogPost | undefined {
  return allPosts.find((p) => p.slug === slug);
}

