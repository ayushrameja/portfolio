import type { BlogPost } from "@/types/blog";

function Content() {
  return (
    <>
      <p>
        SEO has two modes: “this is fine” and “why is Google indexing my 404 page with my login screen title.” This is a
        practical checklist for Next.js apps using the App Router.
      </p>

      <h2>1) Get the basics right (Metadata)</h2>
      <ul>
        <li>
          Set a <strong>unique title + description</strong> per page.
        </li>
        <li>
          Add <strong>canonical URLs</strong> to avoid duplicate pages competing with themselves.
        </li>
        <li>
          Use <strong>Open Graph + Twitter</strong> metadata so links look good when shared.
        </li>
      </ul>
      <p>
        In Next.js App Router, prefer <code>export const metadata</code> for static pages, and{" "}
        <code>generateMetadata()</code> when it depends on route params.
      </p>

      <h2>2) Make pages crawlable (no accidental “invisible site”)</h2>
      <ul>
        <li>
          Ensure <code>robots.txt</code> doesn&apos;t block your whole site (it happens more than you&apos;d think).
        </li>
        <li>
          Don&apos;t hide important content behind client-only rendering if you can avoid it.
        </li>
        <li>
          Avoid requiring auth/cookies for public pages (bots don&apos;t RSVP).
        </li>
      </ul>

      <h2>3) Ship a sitemap (and keep it correct)</h2>
      <p>
        A sitemap is a polite list of URLs you want indexed. It won&apos;t magically rank you, but it makes discovery and
        recrawling easier—especially for new sites.
      </p>
      <ul>
        <li>Include only canonical, indexable pages.</li>
        <li>Exclude staging/preview domains.</li>
        <li>Update it when routes change (you will forget once).</li>
      </ul>

      <h2>4) Use structured data where it matters</h2>
      <p>
        If you have articles, add <strong>JSON-LD</strong> (Article schema). If you have projects/products, consider the
        relevant schema types. Structured data helps search engines understand your content; it doesn&apos;t guarantee fancy
        rich results, but it&apos;s the closest thing SEO has to documentation.
      </p>
      <ul>
        <li>Validate it using Google&apos;s Rich Results test.</li>
        <li>Don&apos;t lie in schema (you&apos;ll just get ignored or penalized).</li>
      </ul>

      <h2>5) Performance is SEO (because users bounce, and Google notices)</h2>
      <ul>
        <li>
          Optimize images with <code>next/image</code> and sane sizes.
        </li>
        <li>
          Avoid shipping a nightclub of JS to render three paragraphs of text.
        </li>
        <li>Watch LCP/CLS/INP in the field, not just Lighthouse on your laptop.</li>
      </ul>

      <h2>6) Content hygiene (the boring part that wins)</h2>
      <ul>
        <li>Write headings like you mean them (H1 once, H2/H3 for structure).</li>
        <li>Make URLs stable and human-readable.</li>
        <li>Keep your internal links intentional (help crawlers, help users).</li>
      </ul>

      <h2>7) A quick Next.js checklist</h2>
      <ul>
        <li>
          Per-route metadata via <code>metadata</code>/<code>generateMetadata</code>
        </li>
        <li>Canonical URLs</li>
        <li>Open Graph + Twitter cards</li>
        <li>Sitemap</li>
        <li>Robots</li>
        <li>Accessible, semantic HTML</li>
        <li>Fast pages, minimal client JS</li>
      </ul>

      <p>
        The trade-off: doing SEO &quot;properly&quot; means being disciplined about content structure and performance. It&apos;s not
        glamorous—like tests—but it saves you from explaining to your manager why your homepage ranks for “untitled
        document.”
      </p>
    </>
  );
}

export const post: BlogPost = {
  slug: "seo-for-developers-nextjs-checklist",
  title: "SEO for Developers: Practical Checklist for Next.js",
  description: "A pragmatic SEO checklist for Next.js App Router: metadata, sitemaps, structured data, and performance.",
  publishedAt: "2026-02-03",
  tags: ["Next.js", "SEO", "Web Performance"],
  readingTime: "6 min",
  coverImage: {
    src: "/assets/blog/blog-seo.svg",
    alt: "Abstract cover art for an SEO checklist article.",
  },
  Content,
};
