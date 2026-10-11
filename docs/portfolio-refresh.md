# Portfolio refresh — 11 October 2026

Implemented locally from production `main` at `895563730dd65b6ae8b95531f5bc2fd198d4e8f4`, in an isolated managed worktree. The original `feat/professional-first-portfolio` checkout and its 12 modified files were preserved. No production deployment, DNS, email, redirect, or Low HP website changes.

## Approved direction

A single cream/cobalt palette, lilac/lime project surfaces, Bricolage Grotesque display type and Manrope body text. The wordmark uses **Ayush Rameja**. A short home leads to separate Work, About, Playground, Writing, and Résumé destinations. Real project previews use a brief blur-to-focus interaction. The portrait replaces the hero ASCII; cute ASCII faces appear only while content is actually pending. No artificial delay, compulsory preloader, scroll trapping, or autoplay media.

## Assets and content

- Portrait: existing `public/assets/image/profile-pic.png`, compressed to `portrait.jpg`. Original retained.
- Bakbak: current local 2.0 renderer, explicitly started in `VITE_DATA_MODE=mock`, photographed in the browser with fictional demo members and an empty conversation. No private messages or live backend data. Capture is not a claim of installed desktop acceptance.
- Burnhop: original game entrance capture reused from the approved study. Browser build labelled solo practice; inactive multiplayer and the separate native rewrite are described accurately.
- Masala and Templio: captured from their public homepages on 11 October, compressed to WebP. No changes to either site.
- Greytrace: current public title screen, compressed to WebP. Described as a web shooting prototype with practice maps, not a released multiplayer service.
- QRMint, Receipts, unofficial Arveen site, and KeyBrawl appear in Playground. TypeRush is separately marked archived.
- Private work is excluded. No new usage or performance metrics were added. Existing employer case-study copy remains the owner's previous content; it has not been independently substantiated. The homepage and About use role/scope rather than numerical claims.
- Local résumé PDF copied from the existing portfolio checkout; no new résumé content was invented.

## Bakbak releases

The release parser accepts the actual hyphenated Windows installer and existing macOS/legacy patterns. A User-Agent header and a five-second request timeout bound the GitHub feed request. If it fails, a verified v2.0.0 snapshot is labelled **Latest known release** with its verification date and an All releases link. The page distinguishes current Apple Silicon/Windows builds from legacy Intel v0.4.0. Snapshot data lives beside the parser so it can be updated when a new release is verified.

## Verification

- Next production build and TypeScript passed.
- Five release regression tests passed: current naming, legacy naming, malformed data, three feed-failure paths, live-release preference.
- Scoped ESLint passed for the new shell, routes, effects, and release modules.
- Browser inspection: desktop, 390px and 320px requested viewport sizes (in-app browser reports effective content widths of 354px and 291px), no horizontal overflow on checked routes.
- Axe WCAG A/AA checks passed on home, Work, a project detail, About, Playground, Résumé, Bakbak, Writing, a blog article, and Autodesk experience. This is automated coverage, not a complete manual accessibility certification.
- Keyboard skip link moved focus to content. All four navigation labels remain visible on mobile. Reduced motion disables entrance motion and the custom cursor.
- A paused portrait network request showed the loader; observed happy, sleepy, and surprised frames. Resuming the request replaced it with the portrait. The desktop link cursor was observed responding to pointer movement.
- Cloudflare build result and final handoff recorded below.

Final validation: `pnpm lint`, `pnpm test`, `pnpm build:cloudflare`, and `git diff --check` passed. Lint now excludes generated `.open-next` and `.wrangler` output, which previously caused false failures after a Worker build. A local Wrangler runtime returned HTTP 200 for 15 checked routes/assets, including all five project pages, Résumé PDF, and sitemap; the Next image endpoint also returned the expected WebP. No production traffic was changed. Temporary preview servers and capture tabs were closed after verification.

Desktop/mobile screenshots are saved in the task's `implementation-captures` directory. Run `pnpm dev` from this worktree to review interactively. The implementation is submitted as a draft pull request for review.

The existing Worker has no `IMAGES` binding. OpenNext therefore serves the supplied image through its fallback (verified HTTP 200); the new project WebPs are already compressed locally (roughly 19–54 KB each). No image-service binding was added.
