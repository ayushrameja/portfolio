# Portfolio: appearance and interaction archive

Archived 2026-10-27 from the restored, pre-redesign checkout. This records the **Engineer’s Field Journal** site the owner reviewed before requesting a fresh start. The later professional-first design is documented separately in `DESIGN_ARCHIVE.md`.

Evidence: inspected local components, styles, content, navigation, and server handlers. These descriptions reflect implemented behavior, not a fresh browser test or confirmation that external links, downloads, or email delivery currently work. No screenshots of this version were captured during cleanup.

## What the site was

A personal portfolio for Ayush Rameja, a Bangalore-based full-stack platform engineer. The cover presented a Senior Software Engineer role at Autodesk via Quarks Technosoft. It combined professional case studies, the independent Bakbak product, engineering/life writing, a web résumé, and a contact form.

The main statement was “I build the systems behind ambitious products.” The résumé described 4+ years across Autodesk, Siemens, and Accenture and displayed 4+ years, 300+ PRs reviewed, and 5M+ monthly page views supported. These are historical website claims, not newly verified facts.

## How it looked

The visual metaphor was a printed field journal: big Newsreader serif headlines, Manrope body text, IBM Plex Mono labels, numbered chapters, thin rules, restrained square-edged buttons, and wide editorial columns. Fonts came from Google Fonts. The maximum main content width was 88rem, with 16px mobile and 32px wider-screen side padding. Most desktop compositions used a 12-column grid and stacked on small screens.

| Token | Paper theme | Night theme |
| --- | --- | --- |
| Page background | `#f4f4ef` | `#10110f` |
| Raised paper | `#fbfbf6` | `#171815` |
| Primary ink | `#151614` | `#f2f2eb` |
| Muted ink | `#62645f` | `#b4b6ae` |
| Fine rules | `#cbccc5` | `#353730` |
| Cobalt accent | `#1d4ed8` | `#7ea2ff` |
| Vermilion accent | `#e34a31` | `#ff765f` |

The decorative background had registration marks and a subtle pointer-responsive offset. Reduced motion disabled that pointer effect. Links and chapter rows changed toward cobalt on hover. Keyboard focus had a cobalt outline. A floating, lightly rounded navigation dock sat at the bottom with a border, raised-paper surface, and shadow. It reserved mobile safe-area space.

### Homepage, in reading order

1. **Cover (`#cover`)** — a ruled masthead with name, Field Journal / 2026, Issue 01, and desktop location/coordinates. Large serif statement on the left; current role, introduction, and two calls to action on the right. A wide cropped portrait followed, with a cobalt strip on the left and a desktop caption column (“Engineering from interface to infrastructure”). The portrait was short on mobile; its side caption was hidden below 640px. The image revealed with a horizontal wipe, while text faded/slid in; hero reduced-motion handling removed those reveals.
2. **Bakbak (`#bakbak`)** — “A small room for big conversations,” violet product accents, private-beta positioning, app icon and product preview, and Explore/Download links. It described a private desktop room for close friends, chat, voice/video, and a shared soundboard. The pictured application was promotional imagery, not an embedded working chat interface.
3. **Featured work (`#work`)** — Autodesk logo, chapter/date/location, an oversized statement, three impact metrics, paired Context and Contribution blocks, selected systems, working range, and Read chapter / Visit Autodesk actions.
4. **Work archive** — three full-width employer chapter rows for Autodesk, Siemens Technology, and Accenture AI. Each included chapter number, logo, role/date, thesis, and arrow. Rows had a background reveal on hover and entrance animations when scrolled into view.
5. **Field notes (`#notes`)** — two editorial desks, Engineering in cobalt and Life in vermilion. Each showed its latest three notes with title, excerpt, publication date, and reading time. Desktop desks were side by side; mobile stacked them.
6. **Correspondence (`#correspondence`)** — “Have a difficult system to make simpler? Write to me.” Contact links and introductory copy on the left; an underlined name/email/message form on the right. Name and email shared a row on wider screens. Submission replaced the form with a thank-you state.
7. **Footer** — ruled copyright/location line, Next.js and Newsreader credit, and Source nearby link. Extra bottom padding left room for the floating navigation.

## What happened when clicked

### Shared navigation and theme

| Control | Result |
| --- | --- |
| AR badge | Navigate to `/`. |
| Cover / home icon | Smooth-scroll to `#cover` on the homepage. |
| Bakbak / chat icon | Smooth-scroll to `#bakbak`, not directly to its product page. |
| Work / briefcase icon | Smooth-scroll to `#work` (the featured Autodesk section). |
| Notes / pen icon | Smooth-scroll to homepage `#notes`. |
| Write / mail icon | Smooth-scroll to `#correspondence`. |
| Additional Notes / book icon | Navigate to `/blogs`; this extra homepage control appeared after scrolling beyond 48% of the viewport height. |
| Additional Resume / document icon | Navigate to `/resume`; appeared at the same scroll threshold. |
| Inner-page Portfolio, Field notes, Resume links | Navigate to `/`, `/blogs`, `/resume` as offered for that page. Writing pages omitted their own index shortcut from the dock; résumé omitted its own shortcut. |
| Moon / Sun | Toggle paper/night theme and save the choice under local storage key `theme`. On first load, a saved choice took precedence over the system preference. |

On mobile, chapter labels were hidden and icons carried accessible labels. Larger screens showed text; chapter numbers and the current route label appeared at larger widths. The active homepage chapter was highlighted in cobalt.

Route changes triggered a full-screen journal wipe carrying chapter number/title (Cover, Bakbak, employer, Field Note, Field Notes, or Resume). The overlay lasted about 540ms; theme changes applied the new theme after 240ms under the overlay, labeled Paper Edition or Night Shift. Reduced motion bypassed this overlay and applied theme changes immediately. Lenis supplied smooth wheel scrolling (`lerp: 0.1`); route changes reset scroll to the top. This older implementation did not gate Lenis by pointer type/reduced motion. Hash links described below express their intended targets; their actual timing against route scroll reset was not retested.

### Homepage actions

| Control | Result |
| --- | --- |
| Explore selected work | Scroll to `#work`. |
| Read field notes | Scroll to `#notes`. |
| Explore Bakbak | Open `/bakbak`. |
| Download (Bakbak showcase) | Open `/bakbak#download`. |
| Read chapter (featured Autodesk) | Open `/experience/autodesk`. |
| Visit Autodesk | Open `https://www.autodesk.com/` in a new tab. |
| Any work archive row/arrow | Open the matching `/experience/autodesk`, `/experience/siemens`, or `/experience/accenture` page. |
| Note title/card/row | Open `/blogs/<that-note-slug>`. |
| Open the complete journal | Open `/blogs`. |
| Email contact row | Open the visitor’s email application using `mailto:ayushrameja@gmail.com`. |
| LinkedIn / GitHub contact row | Open the corresponding profile in a new tab. |
| Source nearby in footer | Navigate to the GitHub profile in the current tab; this was not a direct repository link. |

### Contact form

- The form displayed a loading skeleton until mounted. All three fields were required; email had browser email validation as well as a client-side format check.
- **Send correspondence** validated name/email/message, then posted JSON to `/api/contact`. While pending, the button was disabled and read **Sending note...**. Duplicate submission was guarded.
- Success cleared the fields, showed a success toast, and replaced the form with **Message received.**, a personalized thank-you, and **Send another note**.
- **Send another note** returned to the empty form. Failure kept the form available and displayed the error in a toast.
- The server accepted names up to 100 characters, emails up to 254, and messages up to 5,000. It escaped HTML before composing mail. It imposed three requests per IP per minute using an in-memory counter, returned 429 with retry information when limited, 400 for invalid fields, and 500 for delivery/configuration failure.
- Mail used Nodemailer’s Gmail transport with `SMTP_EMAIL` and `SMTP_PASSWORD`; recipient selection used `CONTACT_EMAIL`, falling back to a valid `SMTP_EMAIL`. Reply-To was the sender’s address and the subject began `Portfolio Contact:`. These are variable names only; no local credential values were read or archived. Delivery was not tested during cleanup.

### Employer chapters

Each `/experience/<slug>` page used a ruled Portfolio backlink, employer logo and chapter label, very large serif chapter title, thesis, role/date/location metadata, impact metrics, a case-file narrative, and a project ledger. The selected project rows contained role/client, skills, and numbered outcomes.

- **Portfolio** returned to `/`.
- Employer external links opened official Autodesk, Quarks Technosoft, Siemens, or Accenture pages in new tabs.
- The reusable project card could link an employer badge to its chapter; the chapter page could disable that self-link.
- **Related project page** appeared only when a project had an external URL; it opened in a new tab. Project names and skills were otherwise static text, not separate portfolio routes.
- Historical project inventory: `.comNext`, `MVP Learn v2`, `IGBT Health App`, `Advaantics`, `Google Customer Experience`, and `CHUBB: Mergers & Acquisitions`. The first four had no external project link. The latter two linked Accenture’s Google Cloud business-group page and Chubb’s mergers/acquisitions insurance page.
- Unknown employer slugs used the not-found page.

### Writing index and articles

`/blogs` opened with “Two desks. One curious engineer.”, a published-note count, and two side-by-side editorial desks (stacked on mobile). Each desk gave its newest article a larger featured treatment, followed by numbered rows. There was no search, category-toggle widget, or pagination; the two desks were displayed together.

- The Portfolio backlink opened `/`; every featured card and subsequent row opened its article.
- `/blogs/<slug>` used a narrow 52rem reading column, serif prose/headline, desk accent, date, reading time, author, and tags. Tags were labels, not filter links.
- A fixed top header included a back arrow to `/blogs` and a reading-progress line. The compact article title appeared after scrolling 220px.
- **Older from this desk** and **Newer from this desk** opened adjacent articles within the same desk. At the ends, static messages replaced the unavailable link.
- Article-body hyperlinks, where present, were ordinary links. Unknown slugs used the not-found page.

The article inventory and readable article text are preserved in `CONTENT_ARCHIVE.md`.

### Résumé

`/resume` was a curated HTML résumé, not an embedded PDF. It used a large name/statement, summary, three metrics, employer timeline, selected project list, technical-range grid, and correspondence footer.

- **Portfolio** opened `/`.
- **Download complete PDF** linked to `https://drive.google.com/uc?export=download&id=1KH4dnH50ocYFxv0Cut7gqMltRDHgC088` with the download attribute. Actual cross-origin download behavior depended on Google/browser handling.
- **Open PDF** opened `https://drive.google.com/file/d/1KH4dnH50ocYFxv0Cut7gqMltRDHgC088/preview` in a new tab.
- LinkedIn/GitHub footer links opened new tabs. Résumé project entries, skills, email/phone text, and employment rows were informational, not additional buttons.

### Bakbak product page

`/bakbak` expanded the violet-accented product identity: app icon, private-beta status, “Your small room for big conversations,” large preview image, three explanatory feature cards, an invite explanation, and a dark purple download panel. The cards described persistent chat, drop-in voice/video, and a shared soundboard; clicking the screenshot or feature text did not launch those features.

- **Download Bakbak** targeted `#download` on the page.
- The source/repository action opened `https://github.com/ayushrameja/bakbak` in a new tab.
- The server fetched GitHub’s latest release and selected assets by suffix: `_aarch64.dmg`, `_x64.dmg`, `_x64-setup.exe`.
- Visitor platform detection recommended Apple Silicon on Mac (with a separate Intel Mac link), or Windows x64 on Windows. The recommended button displayed installer size and linked directly to the release asset; it did not install automatically.
- Unknown/unsupported platforms showed explanatory copy rather than an automatic recommendation. Linux and mobile were described as unavailable in this version.
- **All releases** opened `https://github.com/ayushrameja/bakbak/releases` in a new tab.
- Missing release data showed **Release feed unavailable**, an explanation, and the releases fallback; nonexistent installer URLs were not fabricated.
- Downloading was described as open, while joining a room required a host-issued single-use invite. There was no invite request or sign-in form on the portfolio.
- Historical first-launch text described the beta as not notarized on macOS/not signed on Windows. This was old page copy, not verified current distribution status or advice for a future release.

### Loading, failure, and missing pages

- Journal-styled loading screens appeared while content loaded; the shared fallback said **Opening journal...**.
- Unexpected errors displayed **This page lost the plot.** and **Try this chapter again**, which called the framework error reset callback.
- Missing routes displayed **This page was never typeset.** and **Return to the cover**, which opened `/`.

## External destination directory

| Purpose | Historical destination |
| --- | --- |
| Personal website | `https://www.ayush.im` (metadata default `https://ayush.im`) |
| Email | `ayushrameja@gmail.com` |
| LinkedIn | `https://www.linkedin.com/in/ayushrameja` |
| GitHub | `https://github.com/ayushrameja` |
| Autodesk | `https://www.autodesk.com/` |
| Quarks Technosoft | `https://www.qtsolv.com/` |
| Siemens | `https://www.siemens.com/` |
| Accenture | `https://www.accenture.com/in-en` |
| Google project reference | `https://www.accenture.com/in-en/services/software-platforms/accenture-google-cloud-business-group` |
| Chubb project reference | `https://www.chubb.com/us-en/business-insurance/industries/mergers-acquisitions-insurance.html` |

## Technical inventory and recovery

The removed application used Next.js 16 / React 19 / TypeScript, Tailwind CSS 4, Framer Motion, Lenis, Lucide icons, Nodemailer, Sonner, and Zustand in its dependency manifest. It used pnpm, ESLint, App Router pages, static article modules, employer/project/profile data modules, a server contact endpoint, generated sitemap/robots, a web manifest, favicons, and public portrait/product/employer images. No portfolio database was defined in this checkout.

The old source and original image assets are recoverable from Git commit `0880144eb30ae2a0a161ce9fd6b24c171ca74aca`. The professional-first redesign is recoverable from `dff9f2dc2315afe2fca145c9045dc8651dc056b7`; its later source refinements are embedded in `DESIGN_ARCHIVE.md`. Neither commit was removed or rewritten.

To inspect a former file without restoring the project:

```sh
git show 0880144eb30ae2a0a161ce9fd6b24c171ca74aca:app/page.tsx
git ls-tree -r --name-only 0880144eb30ae2a0a161ce9fd6b24c171ca74aca
```

For a separate source export, choose an empty destination outside this documentation checkout and extract `git archive 0880144eb30ae2a0a161ce9fd6b24c171ca74aca` there. Reinstall dependencies and configure credentials separately before attempting to run it. Credentials, node_modules, and generated build caches are not part of the retained source history.

Original asset paths in that commit include `public/assets/image/profile-pic.png`, `public/assets/image/logo.svg`, employer SVGs under `public/assets/experience/`, and Bakbak `icon.svg`, `app-preview.jpg`, and `og.png` under `public/assets/bakbak/`. These are source assets, not screenshots of portfolio pages.

## Fresh-start boundary

The cleanup removes the local app, components, content source modules, dependency manifests/lockfile, installed dependencies, framework/tool configuration, public runtime assets, build caches, test output, and local environment files. Documentation, Git metadata/history, license/notice, and ignore rules remain. No deployment, remote repository, other checkout, global package store, email account, or hosted site is changed.

These notes preserve the old design and behavior as reference material. They do not require the next design to reuse its layout, wording, navigation, animation, technology, or historical factual claims.

Cleanup verification: only the four Markdown documents, `.git`, `.gitignore`, `LICENSE`, and `NOTICE` remained. Both recovery commits were verified present. The portfolio development server was stopped to prevent regenerated build output. No build/test run applies to this documentation-only checkout.
