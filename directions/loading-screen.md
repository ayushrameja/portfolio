# Loading screen and hero

## Current direction

**Accepted baseline (2026-11-09):** the user approved the dark `a` → light `r` → dark hero experiment (“This is way better”) and asked to make it part of the main codebase. It is now the accepted default implementation in the existing redesign checkout, with the approved 5.45-second timing and fixed rounded geometry. The pre-experiment checkpoint remains available for rollback.

**Timing (2026-11-13, requested; values await review):** the loader is shortened to two quick page turns, about 3.1 seconds in total, with each letter resting long enough to be noticed. This supersedes the approved 5.45-second reference pacing. See the 2026-11-13 history entry.

**Colour and layout (2026-11-13):** the hero is no longer monochrome. User-approved: the four accent colours ("these are great") and the logo-shape tiles. User-required after the first attempt: a centred layout (the two-column split was rejected), and no flat colour: muffled gradients with a dotted, clay-like grain, plus very light gradients glowing in from the panel's borders, like the edge glow when Google Assistant is invoked. The hero background (edge glow and grain) is user-approved ("thanks for the background colors it looks good"), as is the seam-synced load-in timing. Third-pass requests, implemented and awaiting review: loader pages as soft multi-colour blends, gradient fills in the header mark, and hero content arriving through the same colour-fringed distortion as the loader's logo. See the three 2026-11-13 colour entries. The user then confirmed "it is good" and asked for a fourth pass (performance, darker loader pages, visible button hover colours, more lifelike and funnier CTA eyes), implemented and awaiting review; see the last 2026-11-13 entry.

**Silhouette refinement (2026-11-11, approved):** the turning page now has its own rounded, bowed, flaring seam end, so the silhouette and corner radius change during each turn. Resting geometry still matches the hero. See the 2026-11-11 history entry.

**Earlier refinement:** the canvas outside the rounded surface must always be white. Remove the loader/hero outline so the background contrast alone defines the curves. Preserve the accepted animation and dark content surface. This supersedes the experiment's nearly black outer canvas and inset border.

- The loading screen occupies the hero's actual rounded panel. The frame stays in place and becomes the hero; it is not a separate full-viewport overlay.
- Preserve the hero's outer padding and corner radius from the very first frame: desktop 20px / 64px; mobile 10px / 36px.
- **Superseded 2026-11-13:** the loader pages take the hero's accents. Latest: each page is a deep, soft blend of accents with a cream letter, violet-led for `a` and sky-led for `r`, then the dark hero. The user asked for the pastel pages to be darker. (Before that, the same day: pastel blends of all four accents with near-black letters, the user's pick over "dark with glow" and "same colours, gentler", violet-led and lime-led. Earlier still: cream `a` on saturated violet, black `r` on saturated lime. Before that: white `a` on black, black `r` on white.) Hero content must not show through behind the loading animation. Both letters still use their original independent paths.
- Use a travelling, bowed fold with logo refraction and transient spectral color, inspired by the [Vibrant reference](https://vibrant.design/feed/14hclpw-ripple-refraction-d-logo-icon).
- **Superseded 2026-11-11:** the panel silhouette is no longer frozen during a turn. The turning page may bow, flare into the white gutter, and round its seam end (so its radius tightens as it narrows), matching the reference. At rest between turns and after the reveal, position, padding, and the 64px/36px corners are exactly the hero's.
- **Superseded 2026-11-11:** after the intro, the hero keeps the dark monochrome treatment (no palette cycling) but now has motion: a seam-synced entrance, marquee drift, button eyes, and menu entrance/exit/hover motion. This replaces the earlier "static, no marquee/eyes/menu animation" rule at the user's request.
- **Superseded 2026-11-13:** the "dark monochrome, no colour" part of the rule above. The hero keeps its near-black surface but uses four vivid accents (violet, lime, coral, sky) and a full-colour portrait. Palette cycling stays off.
- Keep the hero centred: header with the mark in the middle, then visual, name, copy, and CTA in one centred stack. Do not return to a two-column split.
- Coloured surfaces are soft gradients with grain, never flat fills, the header mark included. The dark surface carries a light multi-colour glow from its edges.
- Hero text, tiles, and portrait load in through the loader's lens (distortion with colour fringes), not a plain fade.
- Keep the outer canvas and gutters white throughout. Use the accepted dark content surface and no framing border/shadow.

## Implementation

- `src/components/Hero.astro` owns the panel. `PageTurnIntro.astro` sits in `.hero-frame` (beside `.hero`, not inside it) so its canvas covers the gutter too; the renderer reads the hero's live rect and border radius for its resting shape.
- `src/components/BrandMark.astro` and `src/brand/monogram.ts` expose the original `a` and `r` separately.
- Hero layout (2026-11-13, second pass): centred. Header is clock / mark / location. The visual is a 4×2 tile mosaic: violet and lime quarter discs on the left, the portrait across the middle 2×2 cells, sky and coral quarter discs on the right, so the group closes into one rounded shape. The "Built from curiosity." marquee is back behind the visual as large text with a faint four-accent gradient fill (hidden at 600px and below). Name, copy, and CTA sit centred underneath; footer unchanged. At 600px and below the discs run out to the panel's edges. The mark's eight tiles each carry an SVG gradient from a lightened accent toward a neighbouring accent (same pairs as the mosaic); the four menu rows each take one accent. Tiles rotate a quarter turn on hover.
- Texture (2026-11-13): `.hero-glow` holds two layers of edge-anchored radial gradients (one accent per side) and a white-speckle grain. The second layer has the accents moved round one side and fades in and out over 9s, so the glow appears to travel; it pauses with the marquee and stops for reduced motion. Tiles and the CTA face are a linear gradient from a lightened accent toward a neighbouring accent, with grey noise overlay-blended and soft inset shading. Both grain textures are inline SVG turbulence in `hero-theme.css`. The mark stays flat.
- `src/styles/hero-theme.css` (renamed from `neutral-hero.css`) holds the palette: surface `#0a0a0c`, ink `#f4f1ea`, violet `#7c5cff`, lime `#c8f53c`, coral `#ff5a3c`, sky `#5cc8ff`. It also defines `--intro-a-page`, `--intro-a-ink`, `--intro-r-page`, `--intro-r-ink`; the renderer reads these, `--hero-top`, `--hero-sky`, and `--hero-coral` from the hero's computed style into shader uniforms, and the no-WebGL fallback panel uses the page and ink roles. In the shader each page starts from its leading accent scaled to 30% brightness, then blends in sky, coral, and the other page's accent, scaled the same way, from three corners (mirrored on the `r` page); the final colour gets per-pixel grain. Both ink roles are the cream `--hero-ink`. `--intro-r-page` is sky, not lime: lime at that depth is olive. `ink()` samples the letter atlas without branching and masks afterwards.
- `src/scripts/fold-renderer.ts` packs the original `a` and `r` into a single two-letter texture atlas and draws the panel shape itself with a rounded-box SDF. Each turn has a back page at the resting shape and a front page drawn as a span ending at the seam: outgoing page in front until the edge-on midpoint, incoming page after. The front span's seam end has its own rounded corners, bows convex, and flares vertically near the seam (flare and bow capped at 85% of the gutter). A cylindrical curl compresses content toward the seam end; a green-gold rim lights dark fronts, lavender lights white ones. Refraction haze is warm (red/orange) on dark surfaces and cool (cyan/lavender) on light ones. In the reveal the incoming page is the live hero: transparent inside its rect, dark only where the front page flares past it. During the reveal the shader skips the incoming page's letter lookups and paper, since that page is the hero; these branches depend only on time, so they are the same for every pixel (2026-11-14). The backing canvas uses up to 2× device pixels within a 4.2-megapixel budget; the letter atlas is 2048×1024 (1024px per letter) with mipmaps.
- `src/scripts/intro-timing.ts` owns the timing: first turn at 800ms, second turn at 2150ms, each travelling for 850ms including off-panel lead-in/out, with completion at 3100ms. The edge is visible for roughly half a second per turn; the `a` rests undistorted for about 0.65s after its fade-in and the `r` for about 1.1s. (Until 2026-11-13 this was 650/3650/1600/5450ms, matching the reference's pacing.)
- `src/scripts/page-turn-intro.ts` controls the sequence and caps rendering at 60 fps. On completion or early exit it removes the canvas at once, clears the `data-intro*` attributes one frame later (at once on page exit or in a hidden tab), and two seconds later deletes the GL objects and shrinks the drawing buffer when the browser is idle. It no longer calls `loseContext()` (changed 2026-11-14).
- CTA and footer buttons (2026-11-13): when the CTA's lime face lifts, a body fades in behind it; it is transparent at rest. *(Revised 2026-11-13: the body was a violet-to-coral gradient until the user said the pink "looks odd with the background". It is now the face's own lime and sky darkened by about half, so the lifted button reads as one object.)* Resume and Menu fill with lime from below on hover or focus, with dark text.
- `src/scripts/button-eyes.ts` (2026-11-13): each eye is an eyeball with an amber iris, pupil, fixed glint, and an upper lid that blinks by dropping. While out, each eye aims at the pointer on its own (a pointer between them crosses them), anywhere on the page. Moods are classes on the button: `surprised` when pressed, caught mid-peek, or woken; `sleepy` after the pointer rests on the button for 3.2s, then `asleep` 2.2s later; `dizzy` with counter-rotating pupils for 1.4s when the pointer covers more than 620px in 420ms over the button; `shifty` and `curious` during unprompted glances. On leaving, the eyes watch the pointer for 600ms before hiding. Visit timing, drift along the button, and the reduced-motion/intro guards are as before.
- `src/styles/page-turn-intro.css` positions the intro over the whole hero frame and keeps a rounded fallback panel (`__art`, inset by the gutter, in the first page's colours) for the no-WebGL path. Since 2026-11-13 the hero is not hidden during the loader: it is painted underneath the opaque pages, clipped 2px inside its edge so it cannot show at their antialiased rim, with the marquee and glow paused. The clip is removed 300ms before the reveal (when the entrance is prepared), not on its first frame. The controller makes the hero inert until it is revealed. (Before: `visibility:hidden` until the reveal started.)
- **Until 2026-11-13** `src/styles/neutral-hero.css` supplied a dark monochrome surface/menu, light text, an inverted light call-to-action, and a grayscale portrait. Still true in `hero-theme.css`: white outer canvas and scrollbar track, no framing shadow, no loader outline, and a dark base (`--hero-button-base`, now `#25252b`) under the lifting CTA face so the light eyes read. The CTA face is now lime with dark text.
- `src/components/Hero.astro` wires `setupHeroMotion` (pauses the marquee offscreen/hidden/reduced motion), `setupButtonEyes`, and `setupMenuMotion` again. `button-eyes.ts` now waits for the `data-intro` attribute to clear (it checked a stale `intro-pending` class).
- `src/scripts/hero-entrance.ts` gives each header item, mosaic tile, the portrait, title, copy line, CTA, and footer item its own SVG filter: a sideways displacement from one-dimensional noise that varies only down the element (baked once into a 1px-wide image per element and stretched by `feImage`; it was live `feTurbulence` until 2026-11-14), a horizontal blur, and red/blue channel offsets recombined with screen blending. A Web Animation per element fades it in, relaxes a 10% horizontal stretch and 22px offset, and (tiles only) turns it a quarter turn into place over 1100ms; a frame loop reads that animation's progress and drives the filter strengths as (1 − progress)², so everything closes to the exact element. Start time is still the moment the final page's seam crosses the element's centre (mirroring the shader's seam curve) plus a small top-to-bottom stagger. An element carries its filter only while its lens is open, and the filter region grows only sideways. The marquee just fades. The controller measures the elements and builds the filters 300ms before the reveal, while the final page is at rest, and starts the entrance when the reveal begins; Escape/early exit plays it immediately; `?introAt` freezes it, and leaving a frozen frame finishes it. The frame loop changes filter values at most every 30ms and closes a lens once its throw and fringe are both under half a pixel (until 2026-11-14: strength under 1%).
- `src/pages/index.astro` provides the inline initialization and bundle-failure deadline (4500ms; 6500ms before 2026-11-13). Reduced-motion and JavaScript-disabled visits expose the hero directly; unavailable WebGL uses a short static-logo fallback.
- Escape, hidden-tab changes, page exit, and graphics-context loss release the intro. There is no visible Skip button (removed 2026-11-11 at the user's request). Local-only `?introAt=0` through `?introAt=3100` freezes a frame for review; Escape exits that preview.
- The current sequence shows a near-black `a` on a violet-led pastel blend, a near-black `r` on a lime-led pastel blend, then reveals the dark hero. Hero content becomes visible underneath the opaque final sheet at the start of that turn, and stays inert until completion.
- Work and Notes link to local routes again (2026-11-13); see site-design.md.

## Change history

### 2026-11-07 — First ripple experiment

Implemented an isolated `a` with an expanding circular refraction wave, then revealed a text-only hero.

**What was wrong:** it captured the rainbow/refraction idea but missed the reference's travelling fold. It also treated the intro as an independent full-screen surface.

**Lesson:** inspect the actual animation, not only its description or a single still. Similar colors do not establish similar motion.

### 2026-11-09 — Whole-sheet turn and restored live hero

Replaced the circular ripple with a white sheet rotating away to reveal black. Restored the live hero, including its portrait, palette animation, marquee, and interactions.

**What was wrong:** rotating the entire sheet was the wrong motion. The loader did not preserve the rounded hero frame from its initial state, and restoring the colorful animated hero went beyond the user's layout request.

**Lesson:** distinguish the container's geometry from its content and visual theme. Do not interpret “same hero layout” as approval to restore every existing effect.

### 2026-11-09 — Clarified scope and accepted baseline

The user specified a blank white start, the same padding and rounded corners throughout, a centered logo, reference-like fold/refraction/color motion confined to that panel, and a static neutral hero afterward. They explicitly deferred color theming.

Inspected the reference video frame by frame. Its transition uses a narrow bowed seam travelling across the icon, with refraction and color following it. Replaced the rotating sheet with a bounded WebGL effect inside the actual hero panel. Hid and disabled hero content during loading, removed the hero animation hooks, and applied a neutral grayscale treatment.

**What is working:** the frame remains stable, the fold stays inside it, and the same panel reveals the static hero. The user accepted this version as the baseline for refinement.

### 2026-11-09 — Direction records established

Moved detailed loading-screen documentation out of the root README into this record, including rejected approaches and the accepted baseline. Added `directions/README.md` as the index and root `AGENTS.md` instructions to maintain topic records after future changes.

### 2026-11-09 — Reference pacing and page-fold reveal

**User intent:** the animation is good; refine its speed to match the original inspiration and improve both the logo's fold and the transition into the hero.

Re-read the rejected approaches before editing. Inspected the currently served 17.98-second reference clip at normal playback rate and sampled its first 4.5 seconds at six frames per second. The visible edge crosses the icon in roughly one second; successive turns are approximately three seconds apart. These are visual timing estimates, not recovered source keyframes.

Replaced the compressed 4.4-second sequence with a 5.45-second sequence that preserves those pauses. Added cylindrical texture distortion, a reflected underside, and edge/contact shading without moving the rounded container. The second pass now removes the black sheet progressively over the actual hero, using premultiplied alpha and the same bowed seam. Centralized timing so rendering, lifecycle completion, and frame previews stay synchronized.

**Lesson:** match visible travel and dwell separately; neither the total reel length nor a single transition-duration number describes the reference. A page-turn reveal must be continuous with the fold itself, rather than a final visibility cut. Do not restore the rejected whole-panel rotation or add hero effects.

**Status:** implementation assumptions include the precise curl radius, refraction strength, 650ms opening lead-in, and 200ms finish margin. Await visual feedback on those values. No commit, push, or deployment was requested or performed.

### 2026-11-09 — Broader page silhouette and resolving distortion

**Correction:** the user accepted the speed but said the result still looked like a moving curtain. They requested more visible moving page borders and more distortion of the initial content that clears as the transition progresses. This supersedes the earlier assumption that shading a narrow cylindrical seam was sufficient to communicate a page turn.

Kept all timing values unchanged. Replaced the narrow underside with a broad folded surface (maximum width 20% of the panel's shorter dimension), raised its free top/bottom corners, and outlined its three free edges. The next surface is visible around those lifted corners. Added reflected arc-length logo mapping, stronger localized spatial stretching, RGB separation, and a resolving trail. The stationary rounded frame still clips the effect. The live hero is uncovered without being transformed or rasterized.

**Lesson:** the moving page needs a visible silhouette and underside, not just a full-height highlight/shadow stripe. Strong distortion must decay to the exact original logo between turns. Fixed the subpixel join between flat paper and underside so it cannot reveal a hairline gap through to the hero.

**Accepted baseline:** the 5.45-second sequence and its existing turn cadence are user-approved. The new width, corner lift, rim, and distortion strengths are implementation choices awaiting visual feedback. No commit, push, or deployment performed.

### 2026-11-09 — Reverted broader page experiment

The user said the page animation was bad and asked to revert only the most recent change. Restored the exact preceding fragment shader, removing the broad underside, lifted corners, three-sided rim, and stronger distortion/trail. Preserved the approved timing, progressive hero reveal, controller, fixed panel geometry, and all unrelated working-tree changes.

**Lesson:** the broad folded-page treatment was rejected; its previous visual checks established rendering, not user acceptance. Do not restore this experiment without new direction. The narrower prior renderer is the rollback baseline, while its previously reported curtain-like appearance remains an unresolved design concern.

### 2026-11-09 — Protected dark a → r → hero experiment

**User intent:** use the reference analysis to build an experiment with `a` on black, `r` on white, then a black/dark hero; keep the current state safe for rollback.

Before editing, created a verified source checkpoint at:
`/Users/ayushrameja/.codex/visualizations/2026/11/09/01a1c0d7-2bcd-7881-a40c-751e16f10e36/checkpoints/pre-dark-intro-experiment/`

The archive includes all 92 existing tracked/nonignored untracked source files, with SHA-256 verification, Git HEAD, working-tree status (including deletions), and a tracked binary diff. No Git index/branch state was changed. Dependencies, Git internals, and ignored local files are excluded. Restore only the experiment's edited source files from `source.tar.gz`, preserving unrelated later work and appending a direction-history rollback entry.

Changed runtime files: `src/scripts/fold-renderer.ts`, `src/styles/page-turn-intro.css`, `src/styles/neutral-hero.css`, and the comment in `src/brand/monogram.ts`. No timing or lifecycle-controller changes.

The fold now changes facing across its travel: a curved outgoing face narrows near an edge-on midpoint, then the incoming face opens with reversed bow/lighting. This is a visual approximation from sampled reference frames, not the reference author's original 3D model. Used the original independent letter paths in a texture atlas, darkened the opening/fallback, and applied the requested dark palette to the hero and menu.

**Lesson retained:** the prior broad slab was rejected. Do not make the folded surface widest at the midpoint. The outer frame stays fixed; the restrained face lift happens within it. Exact appearance remains an experiment awaiting user review.

### 2026-11-09 — Accepted baseline and white surrounding canvas

The user approved the dark `a` → white `r` → dark hero experiment for the main codebase. The implementation was already the default local route; removed experimental status from the current direction without changing the accepted motion. The existing checkout remains `feat/portfolio-redesign-v2`; this acceptance is not recorded as a Git merge, commit, push, or deployment.

Changed the document/body, panel gutter, and scrollbar track to white. Removed the hero's inset framing shadow and the loader's outline pseudo-element. Curves now read from the dark surface against white, while the content layout, padding, corner radii, letter sequence, and animation timing remain unchanged. The pre-experiment source checkpoint is retained.

**Lesson:** a near-black surround plus an outline made the surface feel like a separate banner/card. The requested white negative space defines the rounded page without that extra frame. Borders on actual navigation controls remain functional UI details, separate from the removed page outline.

### 2026-11-09 — Approved for branch commit and push

The user approved the white surround and borderless dark surface, then explicitly requested committing and pushing the changes to the current branch. The accepted implementation and earlier redesign reset are included together on `feat/portfolio-redesign-v2`; no deployment or merge to `main` was requested. The previous source checkpoint remains local and is not part of the repository commit.

### 2026-11-11 — Reference silhouette: page turn with changing corners

**User intent:** the loader was good but not close enough to the [reference](https://vibrant.design/feed/14hclpw-ripple-refraction-d-logo-icon), mainly the page turn and the border-radius changes during the animation. Study the animation and make it more accurate and appealing.

Downloaded the reference's 720p card video (960×720, 60fps, 17.98s) and sampled full-icon frames at 4–16fps. Findings:

- The whole icon silhouette changes during a turn. The page in front is a separate rounded shape whose seam end has its own rounded corners; as it narrows, those corners shrink with it. The seam end bows outward and flares a few percent above/below the resting edges, like the end of a rolled cylinder.
- The page behind stays at its resting rounded shape. Front/back swap at the edge-on midpoint: the outgoing page is in front first, then the incoming page bulges past the outgoing edge and settles.
- Rim at the curl is olive-green on black and lavender/white on white. Refraction haze is red/orange on black and cyan/pink on white, wide around the seam and lingering briefly after it passes. The logo smears horizontally with only modest chromatic fringing.

Replaced the fixed-clip seam shading with the two-layer SDF model described in Implementation. Moved the intro from inside `.hero` (which clipped to its radius) to the frame so the flare can enter the gutter. Reduced RGB split (0.025 → 0.012), replaced the hard rainbow `cos` palette with surface-dependent warm/cool haze, and increased the liquid wave slightly. Timing values are unchanged.

**Supersedes:** the 2026-11-09 requirement that the panel's corners stay fixed through the reveal. Resting geometry is still identical to the hero. The rejected broad slab (widest at midpoint, three-sided rim) is still not restored: lip strength is `|cos|·sin` of progress, so it is zero at the edge-on midpoint.

**Lesson:** a separate-page silhouette needs the renderer to own the panel shape; clipping the effect to the hero's CSS radius made the requested corner changes impossible. The white gutter limits flare (20px desktop, 10px mobile), so it is smaller in absolute terms than the reference's ~3.5%.

**Status:** user-approved on 2026-11-11 ("it looks insane"). The bow (6% of the panel's shorter side × lip), flare (≤3.5%, gutter-capped), curl width, and haze strengths in this version are now the accepted baseline. No commit, push, or deployment performed.

### 2026-11-11 — Removed Skip button; crisp logo on large screens

**User intent:** remove the “Skip intro” button; the logo looked distorted on big screens and should render correctly at good quality.

Removed the button, its styles, and the now-unused `data-started` flag. Escape still ends the intro as a keyboard path, and the other release conditions are unchanged.

Diagnosed the distortion at 2560×1440 @2x: the 900k-pixel canvas budget rendered the panel at ~0.49 CSS px per pixel, and the 512px-per-letter texture was minified without mipmaps, so arcs showed stair-steps that the browser then enlarged ~4×. Raised the budget to 4.2MP with a 2× DPR cap, doubled the atlas to 1024px per letter, and enabled mipmapping. The same frame now has smooth arc edges. The higher budget costs more GPU per frame on large displays; not measured on physical hardware.

**Status:** awaiting user review. No commit, push, or deployment.

### 2026-11-11 — Hero motion restored in dark mono

**User intent:** make the hero after the loader "correct", taking inspiration from the current layout or the live ayush.im, including animations. Asked before implementing: the user chose to keep the dark monochrome hero, and to add the reveal entrance, marquee drift, button eyes, and menu/hover motion. They also said something about the layout is off but did not say what yet — **open question, nothing changed for it.**

Compared the live site (green palette) and local hero at 1440×900: layout is identical; only the theme and motion differ. Re-wired the existing motion modules instead of rewriting them, removed the blanket motion kill from `neutral-hero.css`, and added the seam-synced entrance so the hero arrives as part of the page turn rather than appearing statically under it.

**Supersedes:** the 2026-11-09 static-hero rule (no marquee, eyes, or menu animation). Palette cycling remains off.

**Status:** awaiting user review, plus the layout issue. Entrance duration (900ms), lead (120ms), stagger (220ms over panel height), and blur (6px) are implementation choices. No commit, push, or deployment.

### 2026-11-13 — Shorter loader: two quick turns

**User intent:** make the loading screen shorter. Reduce it to two quick page turns while leaving enough time to notice the two different icons. In the same message the user asked for a colorful hero redesign; that direction was still being clarified when this entry was written and is not recorded here as decided.

Changed only timing constants: first turn 650 → 800ms, travel 1600 → 850ms, second turn 3650 → 2150ms, completion 5450 → 3100ms. The first turn starts slightly later so the `a` still gets a clean rest after its fade-in, since the faster edge reaches the logo sooner. The shader, silhouette, haze, and hero entrance derive from these constants and were not edited. Lowered the inline bundle-failure deadline from 6500 to 4500ms to keep it proportionate.

**Supersedes:** the 2026-11-09 approved 5.45-second sequence and its "one second of edge travel, three seconds between turns" reference pacing.

**Status:** the shorter, two-quick-turn direction is the user's; the specific values are implementation choices awaiting visual review. The hero entrance (900ms, 220ms stagger) is unchanged and now runs about 0.6s past loader completion, up from about 0.4s. No commit, push, or deployment.

### 2026-11-13 — Colourful hero, new layout, coloured loader

**User intent:** redesign the hero and make it colourful instead of mono. Asked before implementing; the user chose "dark + vivid accents" (over the live-site pastels or a fully coloured surface), "colour + layout" (over colour only), and "colour the loader" (over keeping it black and white).

The user had said on 2026-11-11 that something in the centred layout felt off without saying what. They did not specify it this time either, so the new arrangement is my proposal, not a fix for a named problem: a left-aligned name at display size beside a tile mosaic built from the mark's own shapes. The marquee moved from giant background text into the coral pill. The portrait is back in full colour. Copy, links, clock, CTA eyes, and menu behaviour are unchanged.

For the loader, the shader's fixed black/white constants became five colour uniforms read from the theme's custom properties, so the loader cannot drift from the hero palette. The haze and rim maths are untouched; they key off the surface's green channel, which puts warm haze on violet and cool haze on lime.

**Supersedes:** the 2026-11-09 black `a` page / white `r` page, the dark monochrome hero, the grayscale portrait, and the centred hero stack.

**Rejected/unused:** did not restore palette cycling or the pastel palettes in `src/scripts/hero-palette.ts` (that file is still unimported). Did not add a background glow; flat colour keeps the reveal's gutter flare matched to the hero edge.

**Status:** direction is user-chosen; every specific value (hex colours, which accent goes where, multi-colour mark, mosaic arrangement, type size, 26s marquee, tile hover) is an implementation choice awaiting review. No commit, push, or deployment.

### 2026-11-13 — Back to centred; gradients and grain instead of flat colour

**User feedback on the split layout:** the colour choices are great and the logo-shape tiles can stay, but the two-column arrangement with the name on the left is not wanted; keep the previous centred formatting, with freedom to redesign inside it. Separately, the colours should not be solid: muffled gradients with a dotted, plain clay-like texture, and very light gradients coming from the borders, like the edge glow when Google Assistant is pulled up.

**What was wrong:** given "colour + layout" and an unspecified layout complaint, I replaced the centred structure itself. The user wanted the centred structure kept and the redesign to happen within it. The flat fills also read harder and more graphic than intended.

**Lesson:** "redesign the layout" did not license changing the page's basic axis. When the complaint about a layout is unspecified, ask what should stay before moving the structure. Treat the centred stack as fixed from here.

Restored the centred header and stack. Rearranged the tiles around the portrait instead of beside the copy, and moved the marquee from the coral pill back behind the visual. Added the edge glow, grain, and gradient tiles described under Implementation, and gave the loader pages the same treatment in the shader so they are not flat either.

**Supersedes:** the same day's two-column layout, the coral marquee pill, the stacked 760px breakpoint, and flat tile/CTA/loader-page fills.

**Status:** centred layout, gradients with grain, and edge glow are user direction. Glow strengths (20–42% per accent), grain amounts, the travelling-glow crossfade, the gradient-filled marquee at 17% opacity, tile blend pairs, and gradient + grain on the loader pages are implementation choices awaiting review. The user did not ask for the loader pages to change; that was my extension of "not solid colours". No commit, push, or deployment.

### 2026-11-13 — Pastel loader pages, hairline fix, gradient mark, lens entrance

**User feedback:** the hero background colours look good. The loader pages still read as solid colours with a gradient on top; make them subtle gradients. Thin outlines appear around the logo on the loading screens (screenshot supplied). The hero mark should not be solid colours either. The load-in timing is good, but text and image should arrive with the logo's coloured distortion; "cook something creative and unique".

Asked what the loader pages should become; the user chose "soft multi-colour blend" over "dark with glow, like hero" and "same colours, gentler".

- **Loader pages:** replaced the one-accent-plus-two-corner-tints pages with pastel blends of all four accents. Cream ink no longer has contrast on a pastel page, so the `a` is near-black like the `r`. The rim light now treats only the hero as the dark page.
- **Hairlines:** reproduced on the real GPU at 2× as 1px lines along the letter's bounding box. Cause: `ink()` returned early outside the letter's box, so pixels on the boundary had no valid derivatives for the texture lookup and fell to the smallest mip level, which is a grey average of the atlas. This arrived with mipmapping on 2026-11-11. The lookup is now unconditional with clamped coordinates and a mask.
- **Mark:** per-tile SVG gradients instead of flat fills.
- **Entrance:** rebuilt as the lens described under Implementation. The fade/rise/blur entrance from 2026-11-11 is superseded; its seam-synced start times are kept.

**Lessons:** a texture lookup inside a branch is a mip-mapping hazard; software rendering did not show it, so check shader changes on a real GPU. Applying fifteen filters in one frame and giving them generous regions cost long frames; applying each only while its element resolves and limiting the region to sideways throw removed most of that.

**Status:** all four items await review. Pastel amounts, lens strengths (warp up to 48px, fringe up to 16px), 1100ms duration, the tiles' quarter turn, and mark gradient stops are implementation choices. No commit, push, or deployment.

### 2026-11-13 — CTA body recoloured

**User feedback:** the pink under the lifted "Explore my work" face "looks odd with the background"; change it. The violet-to-coral body became the face's lime and sky in shadow (`Hero.astro`, `.work-link::before`). Checked with a 2× screenshot of the hovered button with the eyes out: the body reads as dark olive-green and the eyes stay clear on it. Shade (about 50% toward black) is my choice and awaits review.

### 2026-11-13 — Reveal performance, darker pages, button hovers, livelier eyes

**User feedback (testing in Helium):** "it is good". A lag is visible after loading, before the reveal; make it performant. Make the loading screen colour darker. The button's hover background is black on a black page; fix it. The hover eyes are good; make them more real and funny if possible.

- **Lag:** measured before changing anything. Starting the reveal cost about 3ms. Finishing the loader cost about 48ms in one call, `WEBGL_lose_context.loseContext()`, while the lenses were still open; around it, one frame in five ran long because every lens re-rasterised on every frame. Fixes: release the context two seconds later; step the lenses at about 33 fps and close them under 1% strength; paint the hero under the loader so the reveal has nothing to rasterise. Grouping elements, dropping the blur, and pre-warming filters were considered and not needed.
- **Darker pages:** pages are scaled to a fixed brightness instead of mixed toward white, with cream letters again. Lime at that depth rendered as olive with brown corners, so the `r` page is led by sky. Coral was also tried (brick red) and not kept. This choice of hue is mine, not the user's.
- **Hover colours:** the body under the CTA face was `#25252b`, and Resume/Menu hovered to a near-black grey. I read "the button" as the CTA and fixed the footer buttons as the same class of problem.
- **Eyes:** rebuilt as described under Implementation.

**Supersedes:** the same day's pastel pages and near-black letters; the lime-led `r` page; the dark CTA base (`--hero-button-base`, removed); hiding the hero with `visibility:hidden` during the loader; the flat cream eyes that blinked by squashing.

**Lessons:** measure before optimising: the stall was the GL teardown, not the filters I suspected first. Frame-time checks need the timestamp of each slow frame, not only counts, to find the cause.

**Status:** all four await review. Page brightness (30%), the sky-led `r` page, the violet CTA body, lime footer hover, and every eye behaviour and threshold are implementation choices. No commit, push, or deployment.

### 2026-11-13 — Hero joined to the rebuilt site

The rest of the site was rebuilt around the hero; see [site-design.md](site-design.md). Changes that touched the hero or loader:

- The palette, grain and geometry moved to site-wide tokens; `hero-theme.css` now only maps the `--hero-*` and `--intro-*` roles onto them. Overrides that relied on stylesheet order moved into `Hero.astro`.
- The home page uses `BaseLayout`. The loader bootstrap moved to its `head` slot and now plays only on a first arrival: not for deep links, history restores, or returns from another page of the site.
- The menu and CTA point at local routes (`/projects/`, `#experience`, `/notes/`, `#contact`, `#selected-work`); the menu gained an Experience row and closes when a link in it is used.
- Resume and Menu fill with the grained lime gradient on hover instead of flat lime.

Checked afterwards on the real GPU: 156 of 156 frames through the reveal at laptop and phone sizes, and the usual cleanup state.

### 2026-11-14 — Mobile reveal lag: lighter reveal for every device

**User feedback:** on a Nothing Phone 4 and 4 Pro, the move from the loader to the hero lags a lot. They asked for an analysis, then for a fix that applies to every device, not a mobile-only path: "I can't compromise with looks, I can compromise with animation and other things." From the options offered they chose a lighter lens (one filter instead of many, baked noise, no blur, cheaper fringes) plus the general items: prepare before the reveal, a lighter shader, gentler GL teardown, and a staggered restyle at the end.

**Analysis (from the code, not profiled on the phone):** the reveal stacks about 12 per-element SVG filters (each repainted about every 30ms at the phone's 2.6–3× density), the full-screen WebGL canvas still drawing over the hero, and a full hero repaint plus filter setup in its first frame. On 120 Hz screens the lens also steps at about 33 fps while the motion runs at 120. The earlier tuning was measured only on an M1 Pro at 60 Hz.

**Changed:**

- Lens noise is baked once per element instead of recomputed by `feTurbulence` on every repaint. Its amplitude was matched to the old noise; the first attempt was about three times too weak and the warp barely showed.
- Measuring, filter building and unclipping the hero moved 300ms ahead of the reveal.
- Shader: the incoming page's lookups are skipped during the reveal. Turn frames are pixel-identical to before.
- No `loseContext()`; cleanup on idle. The end-of-intro restyle is a frame after the loader leaves.
- Lenses close below half a pixel of throw instead of at 1% strength.

**Rejected, with reasons:**

- **Dropping the blur** (offered as option 3, chosen by the user). Without it the lens became hard RGB ghosting instead of a liquid smear, a visible change to the look, so the blur is back. With it kept, the saving from the baked noise is small (see Verification).
- **One filter for a group of elements** (option 1). Grouping is not implemented: the children move, fade and turn on their own clocks inside the group, so a shared filter would have to be re-run on every frame of their motion rather than every 30ms, and each element's lens would no longer close on its own timing. This is reasoning, not a measurement.
- **Closing the lens faster** (cubic instead of square decay): about 5% less GPU work in one comparison, not worth the change in feel.
- **Lower canvas resolution and medium precision**: not done. Resolution softens the letter at rest, and medium precision would break the per-pixel grain at phone coordinates.

**Pending the user's choice (animation trade-offs, measured):** stepping the lens at about 20 fps instead of 33, or keeping the lens only on the tiles, portrait, title and CTA (smaller text arrives with the fade, slide and stretch only). Each cut GPU-side work in the reveal by roughly 30% against the current build.

**Lessons:** compare stills against the previous build before calling a filter change look-neutral. Same-origin navigations count as internal visits and skip the loader, so frame captures must start from `about:blank`. On desktop, trace time mostly reflects the GPU process's CPU work, not the phone GPU's execution time.

**Status:** implementation awaiting review on the phones. Not committed, pushed or deployed; on branch `perf/hero-reveal`.

## Verification

Mobile reveal lag (2026-11-14):

- `pnpm check`: zero errors, warnings, or hints. `pnpm test` passed. `pnpm build` passed.
- Headless Chrome on the real GPU (Apple M1 Pro), production builds, 412×915 @2.625× with touch and 4× CPU throttling, trace sums from 2150 to 3600ms after load (the reveal). GPU process (`GpuChannel::ExecuteDeferredRequest`): before ≈ 430–480ms; with no lens at all ≈ 80; displacement only ≈ 200; the final build ≈ 380–440. That is a small saving, because the blur was kept. Variants: 20 fps lens steps ≈ 300–313; lens on large pieces only ≈ 288–300. Frame pacing stayed at 84–86 frames with at most two over 20ms in every variant, so this machine does not reproduce the phone's lag; the numbers show relative cost only.
- `?introAt` stills at 1000 and 1900ms: pixel-identical to before. At 2450 and 2700ms (lens): side by side with the previous build, the same character of warp, smear and fringes.
- Cleanup after normal playback and after Escape at 1s and 2s: no `data-intro` or `data-intro-revealing`, no filter sheet, no filtered elements, no canvas, no exceptions. One `[inert]` element remains in both the old and new builds and is not the hero.
- Not checked: the Nothing phones themselves, a 120 Hz display, Safari and Firefox, the no-WebGL fallback.

Performance, darker pages, hovers, eyes (2026-11-13):

- `pnpm check`: zero errors, warnings, or hints. `pnpm test`: 7/7 (nonvisual). `pnpm build` and `git diff --check` passed.
- Frame pacing, headless Chrome on the real GPU (Apple M1 Pro), `requestAnimationFrame` intervals from 2.0s to 4.6s after load: before, 148–151 of 156 frames with 33–67ms frames clustered around the loader's finish and one ~53ms long task; after, 156 of 156 with no long tasks in three runs at 1440×900 @2× and one run each at 390×844 @3× and 2560×1440 @2×. Headless runs at 60 Hz, so a 120 Hz display was not measured. Helium itself was not tested.
- Loader frames at 450, 1250, 1900, 2600ms: deep violet-led and sky-led pages, cream letters, reveal intact. A 4× crop of a panel corner and frames at 150ms and 400ms after load show no hero content or dark rim through the loader.
- Eyes and hovers, by dispatching pointer events and capturing 4× crops of the CTA: tracking left and right, crossing with the pointer between the eyes, a blink in progress, sleepy then asleep with the pointer resting, waking, dizzy after a shake, and surprised on press, all with the violet body visible. Resume fills lime with dark text on hover.
- Cleanup after normal playback and after Escape at 1s: zero filters, canvases, inert elements, no `data-intro`. With reduced motion emulated and the pointer moved over the CTA, the eyes stay hidden.
- Not checked: Helium, Safari, Firefox, 120 Hz, slower hardware, a production build's pacing, touch devices, keyboard focus on the CTA, shifty/curious glances (random, not captured), the Menu toggle's hover after this change, and the no-WebGL fallback.

Pastel pages, hairline fix, gradient mark, lens entrance (2026-11-13, third pass):

- `pnpm check`: zero errors, warnings, or hints. `pnpm test`: 7/7 (nonvisual). `pnpm build` and `git diff --check` passed.
- Headless Chrome on the machine's real GPU (ANGLE Metal, Apple M1 Pro), driven over the DevTools protocol. `?introAt=1900` at 2×: hairlines present before the fix, absent after. `?introAt` frames at 450, 1150, 1350, 1900, 2500, 2650, 2850ms at 1440×900 and 2800ms at 390×844: pastel pages, both letters, lens entrance with fringes and turning tiles. Real playback to completion at 1440×900 @2×: settled hero, gradient mark, CTA eyes showing over the gradient face.
- Frame pacing during real playback, from `requestAnimationFrame` intervals: at 1440×900 @2× and 2560×1440 @2×, 55 of 57 frames in the reveal and 74–75 of 78 in the 1.3s after it, worst frame 33–50ms; at 390×844 @3×, 56–57 of 57 and 77 of 78, worst 33ms. The first load after a source edit showed 250–450ms hitches in every variant, including with no filters, so those were attributed to the dev server, not measured in a production build.
- Cleanup: after normal playback, after Escape at 1s, after Escape from a frozen `?introAt=2700` frame, and with reduced motion emulated: zero filters, zero filtered elements, zero canvases, zero inert elements, no `data-intro`, title opacity 1.
- Not checked: Safari and Firefox (SVG filters on HTML and `feDisplacementMap` vary by engine), slower hardware, a production build's pacing, the no-WebGL fallback, the open menu, and tile hover.

Centred layout with gradients and grain (2026-11-13, second pass):

- `pnpm check`: zero errors, warnings, or hints. `pnpm test`: 7/7 (nonvisual). `pnpm build` and `git diff --check` passed.
- Headless Chrome with reduced motion forced: 1440×900, 1280×720, 1920×1080, and 390×844, 375×667, 700×900 iframes. Content centred, nothing clipped, mobile discs meet the panel edges symmetrically.
- Headless Chrome (SwiftShader) `?introAt` frames at 450, 1150, 1350, 1900, 2500, and 2750ms: gradient pages, both letters, hero and glow uncovered behind the seam.
- Normal playback under virtual time ended with zero canvases, zero inert elements, no intro element, and no `data-intro`.
- Not checked: the glow crossfade and marquee in motion, grain and glow on a real display (headless downscaling changes how grain reads), GPU cost of the full-panel layers, the open menu, tile hover, CTA eyes on the gradient face, Escape/early exit, the no-WebGL fallback, and physical devices.

Shorter loader and first colourful hero (2026-11-13, layout since superseded):

- `pnpm check`: zero errors, warnings, or hints. `pnpm test`: 7/7 (nonvisual). `pnpm build` and `git diff --check` passed.
- Headless Chrome with reduced motion forced, against the local dev server: hero at 1440×900, 1280×720, 1920×1080, 900×800, and in 390×844, 375×667, and 700×900 iframes. No overflow or clipped copy seen; the 700px stacked layout leaves the right of the mosaic row empty.
- Headless Chrome (SwiftShader) `?introAt` frames at 450, 1150, 1350, 1900, 2500, and 2750ms at 1280×800: cream `a` on violet, lime page arriving, `r` at rest on lime, hero uncovered behind the seam with the entrance in progress.
- Normal playback in headless Chrome under virtual time ended with zero canvases, zero inert elements, no intro element, and no `data-intro` attribute.
- Not checked: real-time feel of the faster turns, real-GPU colour of the haze on the new pages, the open menu and its coloured hover rows, tile hover, CTA eyes on the lime face, Escape/early exit, the no-WebGL fallback, and physical devices.

The implementation session on **2026-11-09** recorded:

- `pnpm check`: zero errors, warnings, or hints.
- `pnpm test`: all seven existing tests passed. These are existing backend/content/redirect tests, not automated visual coverage of the intro.
- `pnpm build` and `git diff --check`: passed.
- Browser inspection: intro and hero bounding rectangles matched on desktop and at a mobile breakpoint; corner radii matched 64px and 36px respectively.
- Skip/Escape and reduced-motion behavior were checked in the browser.
- After normal completion, browser inspection reported zero canvases, zero running animations, and zero inert elements left behind.

These checks describe that implementation session, not a permanent guarantee. Physical-device performance and a cross-browser compatibility matrix have not been established. The redesign changes remain local; no deployment was performed in this work.

The **reference pacing and page-fold reveal refinement** was checked separately:

- `pnpm check`: zero errors, warnings, or hints; all seven existing tests passed; `pnpm build` and `git diff --check` passed. Existing tests do not cover the shader visually.
- Browser frame previews: empty white start, mid-fold logo, and partially uncovered hero; desktop and mobile canvas/panel rectangles matched, with the mobile 36px radius preserved.
- During the reveal, all five hero children remained inert. Skip and Escape removed the canvas, pending/revealing state, and inert attributes.
- Emulated reduced motion bypassed the loader with no canvas or inert content; the emulation was reset after checking.
- Normal playback completed with the hero visible and zero canvases, inert elements, pending flags, or revealing flags remaining. Browser error/warning logs were empty.

The **broader silhouette and distortion refinement** was checked separately:

- `pnpm check`: zero errors, warnings, or hints; `pnpm build` and `git diff --check` passed. Existing nonvisual tests were not repeated for this shader-only change.
- Browser frames showed the broad underside/lifted corners, stretched logo at 1750ms, and crisp undistorted logo during the 2600ms pause. WebGL renderer reported ready.
- Mobile reveal preserved identical canvas/panel rectangles and five inert hero children; the temporary viewport override was reset.
- Normal completion left the hero visible with no canvas, inert elements, or pending state. Browser error/warning logs were empty.

Revert verification: `pnpm check` reported zero errors, warnings, or hints; `git diff --check` passed. Browser checks were not repeated for the exact restoration of the previously checked shader.

Dark a → r experiment verification:

- Checkpoint readback verified all 92 archived file hashes. Compared the final working files against that manifest: only the four listed runtime files and this direction record changed. The timing file is byte-for-byte unchanged.
- `pnpm check`: zero errors, warnings, or hints; seven existing tests passed; `pnpm build` and `git diff --check` passed. Check/build were repeated after the final shader and hover refinements; these are not visual regression tests.
- Browser inspection confirmed white `a` on black, the narrow midpoint, black `r` on white, and the dark hero/menu. Mobile canvas and panel rectangles matched during the reveal; all five hero children remained inert then.
- Skip and normal completion left zero canvas/inert elements and visible hero content. Emulated reduced motion exposed the dark hero immediately; emulation and viewport overrides were reset. Browser error/warning logs were empty.
- Visual fidelity remains for user review. No deployment, commit, or push performed; physical-device performance and cross-browser behavior were not tested.

White surrounding canvas verification:

- `pnpm build` and `git diff --check` passed. No additional tests were added for the CSS-only refinement.
- Desktop browser readback: document/body/gutter all `rgb(255, 255, 255)`; content surface `rgb(9, 9, 9)`; framing shadow `none`; radius still 64px.
- Mobile opening frame: white gutter, no loader outline pseudo-element, and the existing 36px radius. Skip revealed the hero successfully. Reset the viewport override and left the ordinary local preview URL open.
- Source changes are limited to the two surface stylesheets and this record; animation code/timing were not edited. No Git merge, commit, push, or deployment performed.

Reference silhouette refinement (2026-11-11):

- `pnpm check`: zero errors, warnings, or hints. `pnpm test`: seven of seven passed (nonvisual). `pnpm build` and `git diff --check` passed.
- Headless Chrome (SwiftShader WebGL) `?introAt` frames at 1280×800 across both turns and the reveal: rounded seam end with shrinking radius, bow and gutter flare, green rim on dark, cool haze on white, hero uncovered through the front page in the reveal's second half. A 390px-wide pass showed the same, with the mobile gutter cap.
- Not repeated this session: Skip/Escape, reduced motion, normal completion cleanup, and real-GPU/physical-device playback. The controller lifecycle code changed only to pass the hero element to the renderer.

Skip removal and large-screen quality (2026-11-11):

- `pnpm check`: zero errors/warnings; `pnpm build` and `git diff --check` passed.
- Headless Chrome at 2560×1440 @2x, `?introAt=3000`: before/after crops of the `r` showed the stair-stepping removed.
- Normal playback in headless Chrome finished with zero canvases, zero inert elements, and no `data-intro` attribute.

Hero motion (2026-11-11):

- `pnpm check` zero errors/warnings/hints; `pnpm test` 7/7; `pnpm build` and `git diff --check` passed.
- `?introAt` frames 4350–5450ms: entrance proceeds left to right behind the seam, with blur/rise settling by completion.
- Headless real playback: marquee drifting; eyes visible on the dark base under the tilted face with dark pupils. Normal completion left zero canvases/inert elements and no `data-intro`.
- Not checked: menu open/close motion and hover states in a real browser, reduced-motion with the new hero motion, and physical-device performance.

## Deferred decisions

- Further refinements beyond the accepted dark theme and white outer canvas.
- Preserve the accepted a → r animation (speed superseded 2026-11-13); the pre-experiment narrow-fold/light-hero state remains checkpointed for rollback.
- The 2026-11-11 "something off in the hero layout" was never specified. The layout was replaced on 2026-11-13; confirm whether the concern is gone.
- Whether the background marquee still earns its place.
- Whether the lens entrance needs a lighter path for slow devices or non-Chromium engines. (2026-11-14: the user wants one path for all devices; two animation trade-offs, 20 fps steps and lens on large pieces only, await their choice.)
- Whether the `r` page should stay sky-led, and how dark the pages should be.
- `--hero-secondary` in `hero-theme.css` is now unused.
- `src/scripts/hero-palette.ts` is unused; remove or keep.
- Additional design ideas the user plans to share. Do not invent those decisions or treat the current parameters as final approval.
