import type { Metadata } from "next";
import Link from "next/link";

import type { BlogPost } from "@/types/blog";
import { createPageMetadata } from "@/utils/metadata";
import { getPostsByDesk } from "./_posts";

export const dynamic = "force-static";

export const metadata: Metadata = createPageMetadata({
  title: "Writing | Ayush Rameja",
  description: "Writing about software engineering, product judgment, work, attention, and practical philosophy.",
  path: "/blogs",
});

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    timeZone: "UTC",
  });
}

function WritingCollection({ title, description, posts }: { title: string; description: string; posts: BlogPost[] }) {
  return (
    <section className="writing-collection">
      <header>
        <h2>{title}</h2>
        <p>{description}</p>
      </header>
      <div>
        {posts.map((post, index) => (
          <article key={post.slug} className="writing-row">
            <span className="writing-row__index">{String(index + 1).padStart(2, "0")}</span>
            <div>
              <p className="writing-row__meta">{formatDate(post.publishedAt)} · {post.readingTime}</p>
              <h3><Link href={`/blogs/${post.slug}`}>{post.title}</Link></h3>
              <p>{post.description}</p>
            </div>
            <Link className="text-link" href={`/blogs/${post.slug}`} aria-label={`Read ${post.title}`}>
              Read <span aria-hidden>↗</span>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function BlogsPage() {
  const engineering = getPostsByDesk("engineering");
  const life = getPostsByDesk("life");

  return (
    <main className="writing-page" data-palette="paper">
      <section className="writing-page-hero">
        <div className="site-container">
          <div className="detail-page__breadcrumb">
            <Link className="text-link" href="/">← Portfolio</Link>
            <span>{engineering.length + life.length} published essays</span>
          </div>
          <div className="section-heading">
            <div><p className="eyebrow">Writing</p><h1>Ideas that survived contact with a difficult Tuesday.</h1></div>
            <p>Practical notes on engineering judgment, delivery, attention, and philosophy without pretending any of them fit in a motivational poster.</p>
          </div>
        </div>
      </section>

      <div className="site-container writing-page__collections">
        <WritingCollection
          title="Engineering"
          description="Architecture, reviews, accessibility, product judgment, and shipping software with standards intact. Mostly intact."
          posts={engineering}
        />
        <WritingCollection
          title="Life and attention"
          description="Modern work, decisions, the Bhagavad Gita, and ways to care without making chaos a full-time hobby."
          posts={life}
        />
      </div>
    </main>
  );
}
