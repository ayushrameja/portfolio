import Link from "next/link";

import Footer from "@/app/_components/Footer";
import type { BlogPost } from "@/types/blog";
import { getAdjacentPosts } from "../_posts";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default function BlogPostShell({ post, children }: { post: BlogPost; children: React.ReactNode }) {
  const { previous, next } = getAdjacentPosts(post.slug);

  return (
    <main className="article-page" data-palette="paper">
      <article className="article-shell">
        <header className="article-header">
          <div className="detail-page__breadcrumb">
            <Link className="text-link" href="/blogs">← All writing</Link>
            <span>{post.desk === "engineering" ? "Engineering" : "Life and attention"}</span>
          </div>
          <div className="article-header__meta">
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            <span>{post.readingTime}</span>
          </div>
          <h1>{post.title}</h1>
          <p className="article-header__description">{post.description}</p>
          <div className="article-header__author">
            <div><strong>Ayush Rameja</strong><span>Senior full-stack engineer</span></div>
            <ul className="tag-list" aria-label="Article tags">
              {post.tags.slice(0, 3).map((tag) => <li key={tag}>{tag}</li>)}
            </ul>
          </div>
        </header>

        <div className="article-content">{children}</div>

        <nav className="article-pagination" aria-label="Adjacent articles">
          {previous ? (
            <Link href={`/blogs/${previous.slug}`}>
              <span>← Older</span><strong>{previous.title}</strong>
            </Link>
          ) : <span />}
          {next ? (
            <Link href={`/blogs/${next.slug}`}>
              <span>Newer →</span><strong>{next.title}</strong>
            </Link>
          ) : <span />}
        </nav>
      </article>
      <Footer />
    </main>
  );
}
