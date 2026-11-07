---
title: "Accessibility Fixes I Made That Took 10 Minutes and Helped Real People"
description: "High-impact accessibility tweaks you can ship fast: focus states, labels, semantics, contrast, and motion."
desk: "engineering"
publishedAt: "2026-02-03"
readingTime: "5 min"
tags: ["Accessibility","Frontend","UX"]
archivedRoute: "/blogs/accessibility-fixes-10-minutes"
---

Accessibility isn't a side quest. It's just… the main quest, except nobody gives you XP until you break something. Here are fixes that are genuinely "10 minutes" and actually help real people.

## 1) Visible focus (keyboard users exist)

If you remove focus rings, you're basically telling keyboard users "good luck, champ." Ensure interactive elements have a clear `:focus-visible` state.

## 2) Use semantic HTML (free a11y, no subscription)

- Use `<button>` for buttons, not `<div onClick>`.

- Use `<nav>`, `<main>`, `<header>`, `<footer>`.

- Headings in order (H1 → H2 → H3), not “whatever looks big.”

## 3) Label your inputs (screens readers aren't telepathic)

Every input needs a label: `<label htmlFor>` or `aria-label` if you truly can't show text. Placeholder text is not a label; it's a suggestion that disappears.

## 4) Color contrast (pretty is optional, readable isn't)

Check contrast for text and UI controls. Tailwind makes it easy to accidentally ship “zinc-400 on zinc-200” and call it minimalist.

## 5) Link text that makes sense out of context

“Click here” is useless when a screen reader lists links. Use descriptive text like “Read the SEO checklist” or “View resume.”

## 6) Reduced motion (not everyone wants the cinema experience)

If your UI has animations, respect `prefers-reduced-motion`. You can still be stylish without making users nauseous.

## 7) Images need alt text (and "image" isn't helpful)

- Decorative images: empty alt (alt="").

- Meaningful images: describe what matters in context.

## 8) Don't trap focus in modals/menus

If you open a dialog, focus should move into it, and keyboard users should be able to escape. Focus traps are a real thing. They are also how your website becomes a haunted house.

## Quick sanity checks

- Tab through the entire page.

- Turn on VoiceOver/Narrator for 2 minutes.

- Run Lighthouse a11y and fix the easy stuff.

The trade-off: a11y work is iterative. You'll "fix it" and then discover three more things. Congratulations— you've unlocked the infinite backlog, but at least your site is usable.
