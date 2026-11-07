---
title: "SEO for Developers: Practical Checklist for Next.js"
description: "A pragmatic SEO checklist for Next.js App Router: metadata, sitemaps, structured data, and performance."
desk: "engineering"
publishedAt: "2026-02-03"
readingTime: "6 min"
tags: ["Next.js","SEO","Web Performance"]
archivedRoute: "/blogs/seo-for-developers-nextjs-checklist"
---

SEO has two modes: “this is fine” and “why is Google indexing my 404 page with my login screen title.” This is a practical checklist for Next.js apps using the App Router.

## 1) Get the basics right (Metadata)

- Set a **unique title + description** per page.

- Add **canonical URLs** to avoid duplicate pages competing with themselves.

- Use **Open Graph + Twitter** metadata so links look good when shared.

In Next.js App Router, prefer `export const metadata` for static pages, and `generateMetadata()` when it depends on route params.

## 2) Make pages crawlable (no accidental “invisible site”)

- Ensure `robots.txt` doesn't block your whole site (it happens more than you'd think).

- Don't hide important content behind client-only rendering if you can avoid it.

- Avoid requiring auth/cookies for public pages (bots don't RSVP).

## 3) Ship a sitemap (and keep it correct)

A sitemap is a polite list of URLs you want indexed. It won't magically rank you, but it makes discovery and recrawling easier—especially for new sites.

- Include only canonical, indexable pages.

- Exclude staging/preview domains.

- Update it when routes change (you will forget once).

## 4) Use structured data where it matters

If you have articles, add **JSON-LD** (Article schema). If you have projects/products, consider the relevant schema types. Structured data helps search engines understand your content; it doesn't guarantee fancy rich results, but it's the closest thing SEO has to documentation.

- Validate it using Google's Rich Results test.

- Don't lie in schema (you'll just get ignored or penalized).

## 5) Performance is SEO (because users bounce, and Google notices)

- Optimize images with `next/image` and sane sizes.

- Avoid shipping a nightclub of JS to render three paragraphs of text.

- Watch LCP/CLS/INP in the field, not just Lighthouse on your laptop.

## 6) Content hygiene (the boring part that wins)

- Write headings like you mean them (H1 once, H2/H3 for structure).

- Make URLs stable and human-readable.

- Keep your internal links intentional (help crawlers, help users).

## 7) A quick Next.js checklist

- Per-route metadata via `metadata`/`generateMetadata`

- Canonical URLs

- Open Graph + Twitter cards

- Sitemap

- Robots

- Accessible, semantic HTML

- Fast pages, minimal client JS

The trade-off: doing SEO "properly" means being disciplined about content structure and performance. It's not glamorous—like tests—but it saves you from explaining to your manager why your homepage ranks for “untitled document.”
