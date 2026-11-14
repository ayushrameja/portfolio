# Site design system and pages

## Current direction

**Request (2026-11-13):** after approving the loader and hero ("this is good"), the user asked for the rest of the website to be built "in the similar fashion": audit what exists, and redesign it to go with the changes made so far. Content comes from the live site (ayush.im) or the `main` branch. "You have the freedom to change anything you desire but make sure the design values we have given till now should be same." The user also asked that subagents be used for the work.

Everything below the "Design values" list is an implementation decision made under that freedom and awaits review.

**Request (2026-11-13, later the same day):** "the website currently have same black background with curves on a white background, I wanted to keep that on hero section only, and make the website have same design but have different patterns of background not same." Asked how far to take it, the user chose **open patterned canvas**: only the hero stays a dark rounded panel; every other section sits open on the light canvas with its own pattern built from the mark, and cards stay dark. The two alternatives offered and not chosen were alternating light and dark sections, and keeping every dark panel with a different texture inside. This revises design value 1 below. The same message asked for a scroll story; that has its own record, [scroll-story.md](scroll-story.md).

### Design values (user-given; do not trade these away)

These come from the user's feedback recorded in [loading-screen.md](loading-screen.md).

1. **White canvas; the hero is the one dark rounded panel.** *(Revised 2026-11-13 by the user. Until then every section was a near-black rounded panel with a white gutter, which the user found repetitive.)* Below the hero, sections sit open on the canvas. Each has its own background pattern, and no two neighbours share one. Cards and controls inside a section stay dark. No framing borders or shadows on the hero panel; the contrast defines the shape.
2. **Four accents: violet, lime, coral, sky.** The user approved these colours.
3. **Never flat colour.** Coloured surfaces are soft, muffled gradients with a dotted, clay-like grain. Dark surfaces get very light colour glowing in from their edges.
4. **Shapes from the mark.** Quarter discs, discs and pills taken from the `ar` logo are the decorative vocabulary.
5. **Centred composition.** The user rejected a two-column split for the hero and asked for the centred arrangement back. Section openers are centred.
6. **Playful, but with character rather than noise.** The CTA eyes and turning tiles were welcomed; "creative and unique" was asked for.
7. **Motion must be smooth.** The user noticed and reported lag. Prefer compositor-only motion, measure anything heavier, and always honour reduced motion.
8. **Hover states must be visible** against the dark surface (a near-black hover on black was reported as a bug).

## Implementation

### Tokens (`src/styles/tokens.css`)

- Accents `--violet #7c5cff`, `--lime #c8f53c`, `--coral #ff5a3c`, `--sky #5cc8ff`.
- Accents for text on the canvas: `--violet-ink #5b3fe6`, `--lime-ink #4f6b00`, `--coral-ink #c2351c`, `--sky-ink #0b6ca8` (each at least 5.5:1 on white).
- Canvas `--canvas #fff` with `--canvas-ink`, `--canvas-soft`, `--canvas-muted`.
- `--surface #0a0a0c` is the hero's surface and the text colour on any accent shape; it is the same in every scope.
- **Two scopes share one set of role names.** `--ink`, `--ink-soft`, `--muted`, `--line`, `--line-strong`, `--surface-raised`, `--surface-high`, `--control`, `--control-line`, `--ink-contrast` hold the dark-surface values on `:root`, `.card`, `.button-quiet` and `.on-dark` (one rule in `tokens.css`). `.panel` redefines them for the canvas. So a rule that says `color: var(--muted)` is right both on a section and inside a card, and anything dark placed straight on a section needs `.card` or `.on-dark`.
- `--accent` / `--accent-blend` are the section's pair for gradients and shapes; `--accent-ink` / `--accent-blend-ink` are the same pair for text, underlines, markers and strokes. On the canvas they are the deepened inks; inside a dark island they fall back to the bright accents.
- Geometry `--gutter` 20px (10px at 600px and below), `--radius-panel` 64px (36px, hero and loader only), `--radius-card` 28px (22px), `--radius-control` 14px, `--panel-pad`, `--panel-block` (a section's top and bottom padding), `--content-width` 1180px, `--reading-width` 720px.
- `--grain` (opaque grey noise for `background-blend-mode: overlay` on colour), `--grain-light` (white speckle for dark surfaces) and `--grain-dark` (dark speckle for the canvas).
- `--ease-out`, `--ease-spring`.
- The hero keeps its `--hero-*` roles; `src/styles/hero-theme.css` maps them onto these tokens.

### Shared building blocks (`src/styles/site.css`, imported by `global.css`)

| Class | Use |
| --- | --- |
| `.panel` (+ `data-glow="violet\|lime\|coral\|sky"`) | An open section on the canvas. Sets the accent pair and the canvas roles for its contents, and draws a wash of the accent, grain, and (through `Panel.astro`, which adds the `.panel-pattern` element) the accent's pattern. `pattern={false}` leaves the wash only and closes the gap to the section above; use it for sections that continue the one before, and for long text. |
| `.on-dark` | Restores the dark roles on a dark element that is not a `.card` or `.button-quiet` (the contact section's location strip). |
| `.panel-inner`, `.panel-reading` | Centred content columns at `--content-width` and `--reading-width`. |
| `.display`, `.heading`, `.subheading`, `.lead`, `.muted`, `.eyebrow` | Type scale. Inter Tight, weight 500 for headings, tight tracking. |
| `.section-head` | Centred section opener (eyebrow, heading, lead). |
| `.shape` + `.tone-*` + `.shape-tl/tr/br/bl/pill/disc` | The mark's tiles as gradient-and-grain blocks. Text on a shape is `--surface`. |
| `.card` | Raised dark card; `a.card` lifts and brightens on hover. |
| `.button`, `.button-quiet`, `.text-link` | Lime gradient primary; dark control that fills with lime from below; underlined link in the panel's accent. |
| `.chip`, `.chip-list`, `.breadcrumb`, `.facts` | Small recurring pieces. |
| `.prose` | Rendered Markdown on a dark panel. |
| `[data-reveal]` and its variants | Arrive with the scroll. See [scroll-story.md](scroll-story.md). |

Section backgrounds, one per accent:

| Accent | Pattern | Where it sits |
| --- | --- | --- |
| violet | dot grid | whole field, dimmed through the centre column |
| sky | quarter discs with a small disc | gathered in the top right corner |
| lime | rings | both margins, clear through the middle |
| coral | pills | rising from the foot of the section |

Each pattern is an SVG tile used as a mask over a gradient of the two accent inks, so the pattern itself is never flat colour. Wash, grain and pattern all end before the section's top and bottom edges, so two sections always meet on plain canvas.

### Shell

- `src/layouts/BaseLayout.astro`: document head, skip link, `<main id="content">`, `SiteFooter`, `SiteDock`, and the scroll story script (scroll-story.md). A `head` slot carries the home page's loader bootstrap.
- `src/components/Panel.astro`, `Mark.astro` (gradient `ar` mark; each instance needs its own `id`).
- `src/components/SiteDock.astro`: the one persistent navigation, a floating dock at the bottom. On the home page: mark, Work, Experience, Notes, Contact, Resume. **On other pages (2026-11-14, user request):** mark, the area's index ("All work" → `/projects/`, "All notes" → `/notes/`, "All experience" → `/#experience`; current when on that index; absent on 404), then "Back to home". It comes first in the tab order. On the home page an inline script hides it while the hero, which has its own menu, fills the viewport, and it marks the section in view; without JavaScript it is simply always there. On other pages it marks the current area. `html` has `scroll-padding-bottom: 96px` so focus and anchors stop clear of it.
- `src/components/SiteFooter.astro`: a quiet line on the white canvas, padded to clear the dock.
- Moving between pages uses cross-document view transitions where supported: the old page lifts 24px and fades over 280ms, the new one rises 40px and fades in over 560ms after 120ms, and the dock (`view-transition-name: site-dock`) stays put. *(Until 2026-11-14 the browser's default cross-fade, which the user did not notice as an animation.)* There is no client router.
- **Superseded 2026-11-14:** the loader played only on a first arrival at the home page, not for deep links. It now plays on every page, on a first arrival and on every refresh; see loading-screen.md.

### Pages and their accents

| Area | Accent | Files |
| --- | --- | --- |
| Home hero | all four | `Hero.astro` (see loading-screen.md) |
| Selected work, `/projects/`, `/projects/[slug]/` | violet | `SelectedWork.astro`, `src/pages/projects/`, `src/styles/work.css` |
| Experience, `/experience/[slug]/` | sky | `ExperienceSection.astro`, `CompanyMark.astro`, `src/pages/experience/`, `src/styles/experience.css` |
| Notes, `/notes/`, `/notes/[slug]/` | lime | `NotesSection.astro`, `src/pages/notes/`, `src/styles/notes.css` |
| Contact, 404 | coral | `ContactSection.astro`, `src/scripts/contact-form.ts`, `src/styles/contact.css`, `src/pages/404.astro` |

### Rules for building a page or section

- Start from a `Panel`. Home sections are `<Panel id="…" glow="…" tabindex="-1" aria-labelledby="…">` with the id the dock expects (`selected-work`, `experience`, `notes`, `contact`) and an `h2`. Other pages put an `h1` in their first panel, which carries the pattern; the panels after it pass `pattern={false}`.
- Compose the shared classes before writing new CSS. Area-specific CSS goes in that area's stylesheet or a scoped `<style>`; do not restyle shared classes globally.
- Accent colour appears as gradient plus grain (`.shape`, `.button`, hover fills) or as thin details (underlines, markers, small shapes). No flat accent backgrounds.
- Body text is `--ink-soft` or `--ink`; secondary text is `--muted`. These resolve for the canvas or for a card on their own. Accent-coloured text, underlines and strokes use `--accent-ink`, never `--accent`: lime and sky are unreadable on white. Keep contrast at WCAG AA.
- Every interactive element needs a visible hover and `:focus-visible` state that reads where it sits. `--focus` is dark on a section and light inside a card; a card's own ring is drawn outside it, on the canvas, so `a.card` sets a dark ring.
- Motion: `data-reveal` for arrival; hover transitions on `opacity`, `translate`, `scale`, `rotate`. No SVG filters on large elements. Scroll-linked motion goes through `scroll-story.ts` and nowhere else (this replaces the earlier ban on per-frame JavaScript and scroll-linked effects; see [scroll-story.md](scroll-story.md)). Honour `prefers-reduced-motion`.
- Layouts must work from 360px to 2560px wide. The dock covers about 80px at the bottom of the viewport.
- Copy and facts come from the existing content collections and data files. Do not invent claims, metrics, clients or dates.

## Change history

### 2026-11-13 — Foundation for the full site

**User intent:** see Current direction.

Audited `main`: it has a home page with five sections (hero, selected work, experience, field notes, contact), project and note indexes and detail pages, experience detail pages, a 404, a bottom dock with previews, a client router with route transitions, and about 2,900 lines of section CSS in a pale green palette. The redesign branch had removed all of that except the hero, while keeping the content collections, data files and contact worker.

Decided to rebuild those pages on a small shared system instead of restoring and recolouring the old styles, because the old styles assume pale surfaces and a different shape language.

- Moved the palette, grain and geometry from the hero's stylesheet into site-wide tokens; the hero now maps its roles onto them. `neutral`-era globals (`--paper`, `.content`, `.site-shell`, intro classes) were removed from `global.css`.
- Added the shared classes, `BaseLayout`, `Panel`, `Mark`, `SiteDock`, `SiteFooter`, and the scroll reveal.
- Home page now uses `BaseLayout`. The loader bootstrap moved into its `head` slot and gained the first-arrival rule.
- Hero menu and CTA point at local routes again (`/projects/`, `#experience`, `/notes/`, `#contact`, `#selected-work`); the menu closes when one of its links is used. Theme overrides that depended on stylesheet order were folded into `Hero.astro`.
- Deleted unused `src/styles/base.css` and `src/scripts/hero-palette.ts`.

**Not carried over from `main`:** the client router and its route-transition scripts, the dock's section previews, Lenis smooth scrolling, and the per-card animated artwork with its pause control. These are omissions by choice, open to review. *(Lenis came back later the same day at the user's request: scroll-story.md.)*

### 2026-11-13 — Pages built by four subagents, then audited

Four subagents built the areas in parallel in one working tree, each owning its own files: Work, Experience, Notes, and Contact with the 404. A server restart cancelled all four about fourteen minutes in, before any of them reported. Their files were on disk and already passed `astro check`; only the 404 page had not been started. I wrote the 404 and did not restart the builders. Their decisions below are read from the code and the screenshots, not from their reports, which never arrived.

What the areas ended up as:

- **Work.** Home: a bento of six cards; each has the company mark, a quarter-disc arrow tile, and artwork made from shapes plus the existing screenshots (a sliced Autodesk capture mixed with tiles, shape diagrams for Learn v2 and Google, a bar signal for IGBT Health, the two studio games, Templio's site). `/projects/`: numbered rows in two groups. Detail pages: numbered tile, facts, gallery, prose, skills, next project. `projectTile` and `projectGroups` were added to `project-presentation.ts`.
- **Experience.** Home: three role cards with the company mark on a quarter disc and a small tenure bar. Detail pages: facts, three contribution cards, that company's projects, next chapter.
- **Notes.** Home: a featured card with the pull quote and margin note, two supporting cards. `/notes/`: rows by desk. Reading page: 720px measure, an outline that becomes a sticky side column at 1360px and wider and marks the current section, previous/next cards.
- **Contact.** The email address sits on a large coral quarter disc beside two tiles; location and links below; the form in a card with inline errors and a status line. `contact-form.ts` was restored from `main` and called directly.
- **404.** "404" with the zero as a coral disc whose eyes search left, right and up (CSS only).

A fifth subagent then audited everything read-only. Fixed from its findings:

- Previous/next cards on note pages overflowed the panel at phone widths (implicit grid column).
- The dock's Resume link turned cream-on-lime on hover (specificity), and its fill was flat lime.
- Keyboard focus could land under the dock, fully hidden in some cases.
- The outline's current-section marker went stale after a jump.
- The primary button's hover was a 2px move and nothing else; it now lifts, brightens, glows, and moves its arrow.
- `.button-quiet` and the hero's Resume/Menu filled with flat lime; they now use the grained gradient.
- The dock was last in the tab order and stayed hidden without JavaScript.
- Invalid nesting in the notes index and the experience contributions list.
- "Chubb via Accenture" beside a title reading "CHUBB"; the client name is left as the record has it.
- The contact status line had no reserved space on phones.
- The scroll reveal had no fallback if its script failed, and it blurred whole cards while they arrived; the blur is gone and there is a timeout.
- Dead selectors removed; hard-coded control colours moved to `--control` and `--control-line`.

**Left as found, by choice:** the audit's notes on duplicated header grids, the repeated arrow path, small 21px-tall breadcrumb and footer links, the hard-coded footer year, and "Resume" versus "View résumé".

**Lesson:** the builders were given disjoint files and a written brief (this record) to share, and their work fitted together without merging. An interruption cost their reports, so the independent audit was what established the state of the work; it found two defects a visitor would have hit at once.

### 2026-11-13 — Open patterned canvas below the hero

**User intent:** see the second request under Current direction.

Audit before the change: all four home sections and every inner page used one `.panel` rule: the same near-black surface, radius, two corner glows and grain. Only the glow's tint differed, so the page read as one slab repeated.

What changed:

- `.panel` is now an open section. It has no surface colour, radius or side margin; its inline padding grew by the old gutter, so content widths are unchanged.
- The token roles were split into two scopes (see Tokens). This is what let the area stylesheets keep working: text set straight on a section turned dark, and everything inside a card stayed as it was, with no per-area rewrite.
- Accent-coloured text and thin details moved from `--accent` to `--accent-ink` in `site.css`, `work.css`, `notes.css`, `experience.css` and the Selected work heading. `.work-jump`'s hover count uses the new `--ink-contrast`.
- `Panel.astro` gained `pattern` and renders the pattern element. Inner pages keep the pattern on their first panel only.
- `.contact-place` took `.on-dark`. `.card` sets its own text colour instead of inheriting.
- The hero, the loader, the dock and the footer were not touched.

**Corrections made while building:**

- *Edge fades as CSS masks on the wash and grain.* They worked in a still page but left a hard line at each section's top once the pattern beside them was on its own compositor layer for the scroll drift. The washes are now sized in percentages so they end inside the section at any height, and the grain is covered at both ends by a canvas-coloured gradient in the same background. Only the pattern element is masked. **Lesson:** check backgrounds with motion on, not only in reduced-motion screenshots.
- *Dots falling from the top at full strength.* On project pages they ran behind the title and summary and made them busy. The dot field is now dimmed to 38% through the centre column.
- *Grain at 16%.* It gave whole sections a grey cast against the pure white between them. It is 10%.

**Implementation assumptions, not yet reviewed by the user:** which pattern goes with which accent, their strengths, and that secondary panels on inner pages carry no pattern.

### 2026-11-14 — Sub-page dock and page transitions

**User requests:** on notes and the other sub-routes the dock repeated the home sections; instead show the logo, the area's index ("all notes", or experience), then back to home. Pages changed with no visible animation; add a simple one.

**Changed:** the dock and transitions described under Shell. Experience has no index page, so "All experience" goes to the home section. On a phone "All notes" wrapped onto two lines until the dock links got `white-space: nowrap`.

**Status:** awaiting review. Transition distances and timings are implementation choices.

## Verification

Sub-page dock and transitions (2026-11-14): `/notes/` and a note at 412×915 show mark, "All notes" (current on the index) and "Back to home" on one line; a click from `/notes/` to a note fired `pageswap` and `pagereveal` with a view transition that finished, in desktop and mobile emulation. One earlier run logged an aborted transition that did not reproduce. Not checked: Safari, Firefox, the 404 dock.

Open canvas (2026-11-13):

- `pnpm check`: zero errors, warnings, hints. `pnpm test`: 7/7. `pnpm build`: 35 pages. `git diff --check` passed.
- Screenshots (Chrome, reduced motion) of the home page at 1440 and 390 wide, a note, a project, the projects index and the 404; and of the home sections with motion on.
- Average colour sampled down the seam between Selected work and Experience with motion on: an even ramp from 251 to 255 and back, no step.
- Computed styles: section text resolves to the canvas inks; text inside cards, `.contact-place` and `.button-quiet` to the dark set; focus rings are dark for cards and quiet buttons on the canvas and light for the inputs and the submit button inside the form card.
- The ink accents measure 6.4 (violet), 6.1 (lime), 5.5 (coral) and 5.6 (sky) to 1 on white.
- Not checked: every inner page at every width, forced colours, print, and real Safari, and Firefox. A Playwright WebKit run rendered the patterns correctly; Firefox could not be launched here (scroll-story.md).

Full site (2026-11-13, latest):

- `pnpm check`: zero errors, warnings, or hints. `pnpm test`: 7/7 (nonvisual, pre-existing). `pnpm build`: 35 pages. `git diff --check` passed.
- Screenshots of every page type at 1440×900 and 390×844 with reduced motion, and each home section at full resolution.
- The audit (headless Chrome, software rendering) reported: every internal link and anchor on all 35 routes resolves; one `h1` per page with no heading skips; no duplicate ids; no horizontal overflow at 360, 390, 430, 768, 1024, 1440, 2560 apart from the note-page defect since fixed; focus rings visible on dark and on the canvas; no solid-background text under AA on 12 sampled routes; the contact form's validation, loading, success, and four error paths behave correctly with `fetch` stubbed. No message was sent to the contact endpoint.
- After the fixes: the note-end grid ends at 358px in a 390px viewport with no page overflow; the dock's Resume hover is dark text on the grained gradient; the dock is the first element after the skip link, hidden and inert on a home load, visible elsewhere.
- Loader and hero re-checked on the full home page on the real GPU: 156 of 156 frames from 2.0s to 4.6s at 1440×900 @2× and 390×844 @3×; no canvas or `data-intro` left afterwards.
- Not checked: Safari, Firefox, touch devices, a screen reader, forced colours, print, a true no-JavaScript render, cross-document view transitions, a real submission of the contact form, and GPU cost of the dock's backdrop blur.

Foundation (2026-11-13): `pnpm check` zero errors with stub sections; home page screenshots at 1440×900 and 390×844 showed the hero unchanged, panels stacking on the canvas, and the dock appearing after the hero.

## Deferred decisions

- Whether to bring back a client router, the dock's previews, or animated project artwork.
- Whether secondary panels on inner pages should carry a pattern of their own.
- `src/data/site-copy.json` is an inventory of the old components' copy; it is not imported.
- Tests for the restored `contact-form.ts` and for the new components were not added; `main` had tests for its dock, intro and artwork that no longer apply.
- Whether the home page should carry all six project cards or fewer.
