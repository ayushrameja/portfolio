# Ayush Rameja’s Portfolio (2026)

Live site: https://ayush.im

## Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4
- Framer Motion
- Self-hosted Bricolage Grotesque and Manrope
- One cream/cobalt palette, native scrolling, accessible loading states

## Local setup

```bash
pnpm install
pnpm dev
```

## Environment

No environment variables are needed for the public portfolio preview. The homepage Contact link opens `wave@ayush.im`. The retained contact API still uses the existing SMTP settings; no provider or email configuration is changed.

## Scripts

- `pnpm dev` — run locally
- `pnpm build` — production build
- `pnpm start` — start production server
- `pnpm lint` — lint
- `pnpm test` — Bakbak release parsing and fallback regression checks (Node 24)

## Portfolio content

- `/`: concise introduction, current engineering role, portrait, two selected projects, and links to explore.
- `/work`: five featured projects; `/work/[slug]` records role, scope, current status, and live/source links.
- `/about`: engineering experience and Low HP Studio.
- `/playground`: small tools, prototypes, and a clearly labelled TypeRush archive.
- `/blogs`, `/resume`, `/bakbak`, and `/experience/[slug]`: existing URLs retained.
- Résumé downloads use `public/files/ayush-rameja-resume.pdf`, copied from the existing local portfolio work.

Edit `utils/selectedWork.ts` for the featured collection. Project images are local WebP captures; provenance is recorded in `docs/portfolio-refresh.md`. Keep private projects out of public content unless explicitly approved.

The ASCII loader runs only during actual image/route loading. There is no minimum loading delay. It pauses when hidden or offscreen, and uses one static face for reduced motion. The decorative cursor only appears over links on fine-pointer devices; keyboard, touch, and reduced-motion navigation remain native.

## Cloudflare deployment

The Next.js app runs on Cloudflare Workers through OpenNext. `wrangler.jsonc`
configures the `portfolio` Worker and the `ayush.im/*` route.

```bash
pnpm install --frozen-lockfile
pnpm run preview:cloudflare
NEXT_PUBLIC_SITE_URL=https://ayush.im pnpm run deploy:cloudflare
```

`preview:cloudflare` starts a local Workers preview. `deploy:preview` publishes
a branch Preview URL without changing the production deployment.

Configure the existing Worker in Settings > Builds:

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Root directory | `/` |
| Build command | `pnpm run build:cloudflare` |
| Deploy command | `pnpm exec opennextjs-cloudflare deploy` |
| Preview command | `pnpm exec wrangler preview` |
| Enable Preview builds | Enabled |
| Build variable `PNPM_VERSION` | `11.3.0` |
| Build variable `NODE_VERSION` | `24` |
| Build variable `NEXT_PUBLIC_SITE_URL` | `https://ayush.im` |

Worker Previews use the `previews` configuration and do not inherit production
secrets. The Preview contact form has no Gmail credentials; use production for
email delivery testing. Builds require the Git connection and deployment token
to be configured in the Cloudflare dashboard.

The contact form uses `SMTP_EMAIL`, `SMTP_PASSWORD`, and `CONTACT_EMAIL` as
encrypted Worker secrets. `NEXT_PUBLIC_SITE_URL` must be available when building
the app; its public production value is `https://ayush.im`. Keep secret values
out of Git. The public email links use `wave@ayush.im`, which forwards to the
existing Gmail inbox through Cloudflare Email Routing.

### Domain redirects

`infra/domain-redirects/` contains the separate `portfolio-domain-redirects`
Worker. It redirects the `.com` aliases to their `.im` equivalents and the
configured `www` aliases to their primary addresses, preserving paths and query
strings.

```bash
pnpm run deploy:redirects
```

The redirect Worker deploys independently of the Next.js app. Connect the same
GitHub repository to `portfolio-domain-redirects` with these settings:

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Root directory | `/infra/domain-redirects` |
| Build command | Leave empty |
| Deploy command | `npx --yes wrangler@4.146.0 deploy` |
| Preview command | `npx --yes wrangler@4.146.0 preview` |
| Enable Preview builds | Enabled |
| Build variable `NODE_VERSION` | `24` |
| Included build watch path | `infra/domain-redirects/*` |

The pinned Wrangler command also works from the redirect directory, which does
not have its own package manifest. Keep the associated Cloudflare DNS records
proxied while using its Worker Routes.

© 2026 Ayush Rameja
