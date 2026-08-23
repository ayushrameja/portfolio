import Link from "next/link";

import { getPostsByDesk } from "@/app/blogs/_posts";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default function FieldNotesSection() {
  const posts = getPostsByDesk("engineering").slice(0, 3);

  return (
    <section id="writing" className="writing-preview" data-palette="paper" aria-labelledby="writing-title">
      <div className="site-container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Writing</p>
            <h2 id="writing-title">Notes on building software with judgment.</h2>
          </div>
          <p>
            Practical thinking on architecture, delivery, reviews, accessibility,
            and the decisions that make software easier to trust.
          </p>
        </div>

        <div className="writing-list">
          {posts.map((post, index) => (
            <article key={post.slug} className="writing-row">
              <span className="writing-row__index">0{index + 1}</span>
              <div>
                <p className="writing-row__meta">
                  {formatDate(post.publishedAt)} · {post.readingTime}
                </p>
                <h3><Link href={`/blogs/${post.slug}`}>{post.title}</Link></h3>
                <p>{post.description}</p>
              </div>
              <Link className="text-link" href={`/blogs/${post.slug}`} aria-label={`Read ${post.title}`}>
                Read <span aria-hidden>↗</span>
              </Link>
            </article>
          ))}
        </div>

        <Link className="site-button site-button--secondary writing-preview__all" href="/blogs">
          View all writing
        </Link>
      </div>
    </section>
  );
}
