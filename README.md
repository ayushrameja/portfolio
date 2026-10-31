# Ayush Rameja — portfolio

Static Astro portfolio for Cloudflare Workers Static Assets. The current source is the maintained design; superseded prototypes, migration archives, and unused assets have been removed.

## Stack and commands

Astro, TypeScript, and Tailwind CSS, with Wrangler for Cloudflare preview and deployment. Exact versions are pinned in `package.json` and `pnpm-lock.yaml`. Use the Node.js and pnpm versions specified in `package.json`.

```sh
pnpm install
pnpm dev                  # Astro development server
pnpm check                # Astro and TypeScript diagnostics
pnpm test                 # Content, redirects, intro, and palette regressions
pnpm build                # Regenerates redirects and builds dist/
pnpm preview              # Local static preview
pnpm preview:cloudflare   # Build and preview with Wrangler on port 8787
pnpm deploy               # Build and publish ayush-portfolio
```

The canonical URL is `https://www.ayush.im`. `wrangler.jsonc` serves `dist/` with trailing-slash handling and `404.html` for missing pages. Deployment is a separate action; confirm the target account and domain before publishing.

## Source map

- `src/components/Hero.astro`: portrait hero, marquee, Bengaluru clock, navigation, and résumé link.
- `src/components/Intro.astro` and `src/scripts/intro.ts`: homepage loading sequence.
- `src/scripts/hero-palette.ts`: three palettes on a 30-second CSS animation cycle.
- `src/scripts/button-eyes.ts` and `src/scripts/menu-motion.ts`: button and menu interactions.
- `src/brand/hero-tiles.ts`: shared homepage and intro logo geometry.
- `src/assets/portrait-approved.png`: portrait source, optimized by Astro during the build.
- `public/brand/ar-circular.svg`: inner-page header logo.
- `public/fonts/`: Inter Tight WOFF2 and its license.
- `src/content/notes/` and `src/content/projects/`: maintained public content, validated by `src/content.config.ts`.
- `scripts/legacy-routes.mjs`: compatibility redirects for earlier site URLs.

There are 13 notes and 15 project records. Their original copy came from earlier portfolio revisions; Git history retains the migration archives. Private projects are excluded.

## Homepage behavior

Each full homepage load plays the complete four-second logo and expanding-aperture sequence. Slow page readiness pauses playback at the visible logo before the hero opens. Readiness includes document load, fonts, and eager-image decoding; lazy images do not block it. A 15-second readiness fallback and stalled-playback recovery prevent trapping visitors.

Reduced-motion preferences bypass the intro and disable the continuous hero animations. Escape does not skip the storyboard. Without JavaScript, the intro stays hidden and the HTML remains available. Inner pages do not play the intro. Development-only `?introDelay=1500` and `?introDelay=hold` hooks support failure testing.

Contact opens `mailto:ayushrameja@gmail.com`; Resume opens the configured Google Drive preview. No contact backend or email credentials are configured.

## Redirects


Archived URLs that have a replacement page are permanent `301` rules in `public/_redirects`. Workers Static Assets reads that file from the build output. The default status is 302, so every rule sets 301. Destinations use the canonical trailing slash (`/notes/…/`, `/projects/…/`) so `html_handling: auto-trailing-slash` does not add a second hop. Rules are exact paths, including both slash variants. Unknown article slugs are not covered by a splat, so they stay 404.

`scripts/write-redirects.mjs` regenerates the file from note and project `archivedRoute` values, plus the five `/work/<slug>` pages from the unpublished 2026-10-11 refresh. `pnpm build` runs it before `astro build`. Astro’s dev server does not apply `_redirects`; check those rules with `pnpm preview:cloudflare`.

| Old URL | Destination |
| --- | --- |
| `/blogs` and `/blogs/` | `/notes/` |
| `/blogs/<archived-slug>` and the slashed form | `/notes/<slug>/` |
| `/bakbak` and `/bakbak/` | `/projects/bakbak/` |
| `/work/bakbak`, `/work/masala`, `/work/burnhop`, `/work/templio`, `/work/greytrace`, and their slashed forms | the matching `/projects/<slug>/` |

`/bakbak#download` uses the `/bakbak` rule. Cloudflare does not match fragments. The project page has no download section.

These archived routes have no single replacement and are not redirected to the homepage. Both slash variants return the site 404:

- `/resume` — production résumé page was not rebuilt.
- `/experience/autodesk`, `/experience/siemens`, `/experience/accenture` — employer chapters covered several projects.
- `/api/contact` — no contact Worker is configured.
- `/about` — unpublished about page. Low HP Studio does not replace that page.
- `/playground` — unpublished index included Receipt creator and TypeRush, which this site excludes.
- `/work` — unpublished selected-work index. `/projects/` is a different collection.
