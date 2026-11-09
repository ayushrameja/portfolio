# Loading screen and hero

## Current direction

**Accepted baseline (2026-11-09):** the user approved the dark `a` → light `r` → dark hero experiment (“This is way better”) and asked to make it part of the main codebase. It is now the accepted default implementation in the existing redesign checkout, with the approved 5.45-second timing and fixed rounded geometry. The pre-experiment checkpoint remains available for rollback.

**Latest refinement:** the canvas outside the rounded surface must always be white. Remove the loader/hero outline so the background contrast alone defines the curves. Preserve the accepted animation and dark content surface. This supersedes the experiment's nearly black outer canvas and inset border.

- The loading screen occupies the hero's actual rounded panel. The frame stays in place and becomes the hero; it is not a separate full-viewport overlay.
- Preserve the hero's outer padding and corner radius from the very first frame: desktop 20px / 64px; mobile 10px / 36px.
- Start with a black surface and introduce the white `a`. Hero content must not show through behind the loading animation.
- Transition to a white surface with the independent black `r`, using the existing original paths for both letters.
- Use a travelling, bowed fold with logo refraction and transient spectral color, inspired by the [Vibrant reference](https://vibrant.design/feed/14hclpw-ripple-refraction-d-logo-icon).
- Confine the effect to the rounded panel. Keep its position, dimensions, padding, and corners stable through the reveal.
- After the intro, show the existing hero layout and content in a static dark monochrome treatment. No palette cycling, scrolling marquee, button-eye animation, or animated menu entrance.
- Keep the outer canvas and gutters white throughout. Use the accepted dark content surface and no framing border/shadow; spectral highlights belong only to the transition.

## Implementation

- `src/components/Hero.astro` owns the panel and contains `PageTurnIntro.astro`. This shared container ensures the loader and hero use the same bounds.
- `src/components/BrandMark.astro` and `src/brand/monogram.ts` expose the original `a` and `r` separately.
- `src/scripts/fold-renderer.ts` packs the original `a` and `r` into a single two-letter texture atlas. It narrows the curved face near the midpoint, reverses the bow/lighting as the next face opens, and applies localized distortion to both letters. Subtle top/bottom lift is confined to the moving face inside the stationary frame. The second turn uses alpha to uncover the live hero. The backing canvas is capped at 900,000 pixels.
- `src/scripts/intro-timing.ts` owns the timing: first turn at 650ms, second turn at 3650ms, each travelling for 1600ms including off-panel lead-in/out, with completion at 5450ms. This targets approximately one second of visible edge travel and three seconds between turns, measured from the reference rather than copying its entire multi-logo reel.
- `src/scripts/page-turn-intro.ts` controls the sequence, caps rendering at 60 fps, and disposes resources on completion or early exit.
- `src/styles/page-turn-intro.css` clips the effect to the inherited radius and hides hero content during the intro. The controller also makes that content inert until it is revealed.
- `src/styles/neutral-hero.css` supplies the accepted dark monochrome surface/menu, light text, and inverted light call-to-action on a white outer canvas and scrollbar track. The hero has no framing shadow, and the loader has no outline pseudo-element. The portrait remains grayscale and hero animations remain disabled.
- `src/pages/index.astro` provides the inline initialization and bundle-failure deadline. Reduced-motion and JavaScript-disabled visits expose the hero directly; unavailable WebGL uses a short static-logo fallback.
- Skip, Escape, hidden-tab changes, page exit, and graphics-context loss release the intro. Local-only `?introAt=0` through `?introAt=5450` freezes a frame for review; Skip exits that preview.
- The current sequence shows white `a` on black, black `r` on white, then reveals the dark hero. Hero content becomes visible underneath the opaque final sheet at the start of that turn, and stays inert until completion.
- Work and Notes link to the live site while their local routes remain removed in the redesign checkout.

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

## Verification

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

## Deferred decisions

- Further refinements beyond the accepted dark theme and white outer canvas.
- Preserve the accepted a → r animation and speed; the pre-experiment narrow-fold/light-hero state remains checkpointed for rollback.
- Additional design ideas the user plans to share. Do not invent those decisions or treat the current parameters as final approval.
