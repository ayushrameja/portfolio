import type { BlogPost } from "@/types/blog";
import { post as seoForDevelopers } from "./seo-for-developers-nextjs-checklist";
import { post as accessibilityFixes } from "./accessibility-fixes-10-minutes";
import { post as gitaKarmaYogaModernWork } from "./gita-karma-yoga-modern-work";
import { post as gitaThreeGunasPracticalModel } from "./gita-three-gunas-practical-model";
import { post as gitaDetachmentVsApathy } from "./gita-detachment-vs-apathy";
import { post as gitaArjunaAnxietyDecisionMaking } from "./gita-arjuna-anxiety-decision-making";
import { post as gita10MinuteDailyPractice } from "./gita-10-minute-daily-practice";

export const allPosts: BlogPost[] = [
  seoForDevelopers,
  accessibilityFixes,
  gitaKarmaYogaModernWork,
  gitaThreeGunasPracticalModel,
  gitaDetachmentVsApathy,
  gitaArjunaAnxietyDecisionMaking,
  gita10MinuteDailyPractice,
].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

export function getPostBySlug(slug: string): BlogPost | undefined {
  return allPosts.find((p) => p.slug === slug);
}
