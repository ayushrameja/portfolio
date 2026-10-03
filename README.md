# Ayush Rameja’s Portfolio (2026)

Live site: https://ayush.im

## Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4
- Framer Motion
- Sonner (toasts)

## Local setup

```bash
pnpm install
pnpm dev
```

## Environment

Copy `.env.example` → `.env.local` and fill in SMTP settings for the contact form.

## Scripts

- `pnpm dev` — run locally
- `pnpm build` — production build
- `pnpm start` — start production server
- `pnpm lint` — lint

## Cloudflare deployment

The Next.js app runs on Cloudflare Workers through OpenNext. `wrangler.jsonc`
configures the `portfolio` Worker and the `ayush.im/*` route.

```bash
pnpm install --frozen-lockfile
pnpm run preview:cloudflare
NEXT_PUBLIC_SITE_URL=https://ayush.im pnpm run deploy:cloudflare
```

`preview:cloudflare` builds the app and starts a local Workers preview. GitHub
production builds and branch preview deployments require a separate Workers
Builds connection after this migration is merged.

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

The redirect Worker deploys independently of the Next.js app. Keep the associated
Cloudflare DNS records proxied while using its Worker Routes.

© 2026 Ayush Rameja
