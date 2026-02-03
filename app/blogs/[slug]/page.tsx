import type { Metadata } from "next";
import { notFound } from "next/navigation";

import BlogPostShell from "../_components/BlogPostShell";
import { allPosts, getPostBySlug } from "../_posts";

export const dynamic = "force-static";

export function generateStaticParams() {
  return allPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const title = `${post.title} | Ayush Rameja`;
  const description = post.description;
  const canonical = `/blogs/${post.slug}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      type: "article",
      url: canonical,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <BlogPostShell post={post}>
      <post.Content />
    </BlogPostShell>
  );
}
