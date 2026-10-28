# Ayush Rameja — portfolio

Static Astro site for Cloudflare Workers Static Assets. The previous Next.js app was removed on purpose. Archives and design studies stay in this checkout:

- [Site appearance and interactions](SITE_ARCHIVE.md)
- [Writing content](CONTENT_ARCHIVE.md)
- [Discarded professional-first redesign](DESIGN_ARCHIVE.md)
- Approved logo: `design/logo/circular-ar/ar-circular.svg` and `design/logo/circular-ar/ar-circular-white.svg`
- Approved intro study: `design/intro/README.md` and `design/intro/hero-preview.html`

The homepage implements the approved portrait hero in `src/components/Hero.astro`: responsive Inter Tight typography, the approved portrait optimized by Astro, continuous gradient text, a live Bengaluru clock, Resume link, and a native popover menu. “Built from curiosity.” is consistent across screen sizes. The existing loading animation remains in place. Work and Notes use the existing Astro routes; Resume opens the supplied Google Drive preview. Motion can be paused from the menu and respects reduced-motion preferences.

## Stack

Checked against current docs on 2026-10-27.

| Tool | Version | Why |
| --- | --- | --- |
| Node.js | `>=22.23.4` (Astro 7 requirement). Validation used the installed 24.16.0. | [Astro install prerequisites](https://docs.astro.build/en/install-and-setup/) |
| Astro | 7.4.2 | Current release. Default output is static. |
| TypeScript | 6.0.3 | Newest release accepted by `@astrojs/check@0.9.12` (`typescript` `^5` or `^6`). TypeScript 7.0.2 is outside that range. |
| Tailwind CSS | 4.3.3 via `@tailwindcss/vite` | [Astro Tailwind guide](https://docs.astro.build/en/guides/styling/#tailwind) for Astro 5.2 and later. |
| Wrangler | 4.153.0 | Local Worker preview and deploy. |

React is not installed. Nothing on the site needs a component framework.

Static hosting follows the [Cloudflare Astro guide](https://developers.cloudflare.com/workers/framework-guides/web-apps/astro/): pre-rendered files, no `@astrojs/cloudflare` adapter, and no Worker `main` script. `wrangler.jsonc` points `assets.directory` at `./dist`, uses `html_handling: auto-trailing-slash`, and serves `404.html` with `not_found_handling: 404-page`. Compatibility date is 2026-10-27. Logs and traces are enabled for the Worker. There is no application log source until a Worker script exists.

`https://www.ayush.im` is the public site URL recorded in the archived link constants. The old metadata fallback was `https://ayush.im`. This project uses the `www` URL. No DNS or route is configured here.

## Commands

```sh
pnpm install
pnpm dev                  # Astro dev server. Not the Cloudflare runtime.
pnpm check                # astro check
pnpm test                 # redirect, content, and intro regressions
pnpm build                # writes public/_redirects, then ./dist
pnpm preview              # Vite preview of ./dist. Not the Cloudflare runtime.
pnpm preview:cloudflare   # builds, then wrangler dev on http://127.0.0.1:8787
pnpm deploy               # builds and runs wrangler deploy. Not run by setup.
```

`pnpm deploy` publishes the Worker named `ayush-portfolio`. Confirm that name, the account, and any custom domain before using it. Do not point DNS at it from this setup.

## Content

Build-time collections live in `src/content.config.ts`.

- `src/content/notes`: 13 essays from `CONTENT_ARCHIVE.md`, with tags and descriptions taken from commit `0880144`. Section headings are one level higher than in the archive file because that file nested them under each article title. Wording is unchanged.
- `src/content/projects`: public employer projects from that same commit, plus public independent projects from the 2026-10-11 refresh, including Low HP Studio from that refresh’s about page. TypeRush and Receipt creator are not included. Private projects are not included and are not named here.

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

## Intro

Every full page load plays the complete 3.2-second sequence: Loading, diagonal close-up, wireframe, rotation and white-logo hold. Dismissal requires both the completed storyboard and page readiness (document load, fonts settled, eager images decoded). Cached/fast loads never shorten the sequence; slow loads hold the final logo with “Loading page…”. Lazy images are excluded from the decode gate. This behavior is shared by development and production, with no session-storage bypass.

Reduced-motion preference skips playback. Skip and Escape still dismiss intentionally and move focus to content. Without JavaScript, the intro remains hidden and the rendered HTML is available. The hero has no entrance animation.

Failure recovery remains bounded: a module that never starts is bypassed after 6 seconds; the animation watchdog only releases a visibly stalled clock, not healthy playback or a hidden tab. Asset readiness has a 15-second fallback, which still waits for the animation to finish. Broken images/fonts settle instead of trapping visitors. `?introDelay=1500` and `?introDelay=hold` are development-only test hooks and are removed from the production path.

## Contact form

The archived contact address is `ayushrameja@gmail.com`. No form is posted, and no email service or credential is configured.

When a form is wanted, add a Worker in front of these static assets instead of turning the whole site into on-demand Astro rendering:

1. Add a Worker module and set `main` in `wrangler.jsonc`.
2. Set `assets.binding` to `ASSETS` and `assets.run_worker_first` to `["/api/*"]`. Leave `not_found_handling` as `404-page`.
3. Handle `POST /api/contact` in that module. Page navigations should keep coming from static files. With the current compatibility date, browser navigations prefer assets unless `run_worker_first` matches, so the form must `fetch` the endpoint. Opening `/api/contact` in a tab should not be the submission path. See [static site generation routing](https://developers.cloudflare.com/workers/static-assets/routing/static-site-generation/).
4. Validate the archived limits before sending: name up to 100 characters, email up to 254, message up to 5,000, required fields, and an email format check. Escape HTML in the message body.
5. Send with the Cloudflare Email Service Workers binding (`send_email`, `env.EMAIL.send()`). Arbitrary recipients need Workers Paid, and the domain has to be onboarded for Email Sending. See [Email Sending](https://developers.cloudflare.com/email-service/api/send-emails/workers-api/). Do not revive the old Gmail/Nodemailer `SMTP_EMAIL` / `SMTP_PASSWORD` path.
6. Replace the old in-memory per-IP limit. Isolates do not share that counter. Choose a rate-limit binding or KV before implementing it.

Do not add the `send_email` binding, a domain, or an API token until those choices are explicit.

## Not in this foundation

No deployment, DNS change, email credential, React island, finished visual design, Bakbak download page, résumé PDF, or private project.
