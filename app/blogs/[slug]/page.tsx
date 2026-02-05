import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { allPosts, getPostBySlug } from "../_posts";
import BlogPostShell from "../_components/BlogPostShell";

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
  const images = post.coverImage?.src ? [{ url: post.coverImage.src }] : undefined;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      type: "article",
      url: canonical,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
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
