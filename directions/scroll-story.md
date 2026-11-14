# Scroll story

## Current direction

**Request (2026-11-13):** "I wanted to make the website not normal scroll and see, I wanted to make it say a story like scroll and see things coming in, with skew locomotive scroll with lenis." The design was to stay the same.

Asked how far to take it, the user chose **choreographed, no pinning**: Lenis smooth scrolling, a skew that follows scroll speed, headings and cards arriving in sequence tied to the scroll, and shapes drifting slower than the page, with the page length unchanged. Offered and not chosen: pinning one or two sections (Selected work travelling sideways, Experience stacking), and pinning every section.

This supersedes two earlier decisions in [site-design.md](site-design.md): leaving Lenis out, and the rule against per-frame JavaScript and scroll-linked effects. The design value that motion must be smooth still stands and is what the implementation is measured against.

**Status:** built on all pages; awaiting the user's review of the feel. The strengths and timings below are implementation choices, not reviewed values.

## Implementation

Everything is in `src/scripts/scroll-story.ts`, started from `BaseLayout.astro`. Styles are under "Reveal" in `src/styles/site.css`.

**Arming.** The layout's head script adds `reveal-ready` to `<html>` only when JavaScript runs, motion is allowed and `IntersectionObserver` exists. Without it the script returns at once: native scrolling, nothing hidden, no Lenis. If the script never arrives, the class is removed after four seconds.

**Lenis.** `new Lenis({ anchors: true, allowNestedScroll: true })`, driven from the script's own frame loop.

- `html.lenis` turns CSS `scroll-behavior` off; without Lenis, anchor jumps still scroll smoothly through CSS.
- Same-page links (the dock, the hero menu, outlines) are scrolled by Lenis. The browser still performs the navigation, so the hash and keyboard focus move as before.
- While the loader runs (`data-intro` on `<html>`), Lenis is stopped so wheel input does not queue up behind it.
- **Since 2026-11-14 touch is smoothed too** (`syncTouch: true`), at the user's request. Until then touch scrolling stayed native and Lenis only smoothed the wheel.
- When the loader ends, Lenis glides to the place a home refresh left off (see loading-screen.md).

**Arrival.** Every `[data-reveal]` element is a piece. A piece starts to arrive when its top reaches the foot of the viewport and has arrived after a further 30% of the viewport height (180 to 320px). Progress is written to the piece as `--p`, 0 to 1, and CSS turns that into the look:

| `data-reveal` | Look |
| --- | --- |
| *(empty)* | fades in and rises 64px |
| `left`, `right` | slides in 72px from that side |
| `grow` | rises 44px and grows from 90% |
| `turn` | a quarter turn and growth from 60%, for shapes |
| `words` | headings; the script wraps each word, and the words rise one after another. The heading keeps its text as `aria-label` and the wrapped copy is `aria-hidden` |

Rules the progress follows:

- It never runs backwards.
- Past halfway a piece commits and finishes by itself, so stopping the scroll never leaves something half arrived.
- Pieces in one row start 56px of scroll apart, left to right. A piece inside another (a disc in a card) starts 48px after its parent.
- While the loader runs, pieces wait; they start arriving when its last page begins to turn (2026-11-14).
- A piece waits until the one before it is under way. A reload or an anchor jump with many pieces already in view therefore still plays as a sequence.
- Pieces already above the viewport are finished without animation.
- A finished piece gets `is-revealed` and loses its inline `--p`; the Experience tenure bars key off that class.

Current assignments: section and page headings use `words`; Selected work cards `grow`; Experience rows alternate `left` and `right`; the Notes lead card comes from the left and the two side cards from the right; the contact email disc `grow`s; shapes `turn`.

**Lean.** Top-level pieces in view get `skewY` in proportion to scroll speed: 0.06 degrees per pixel-per-frame, capped at 3 degrees, eased over about 90ms, and removed entirely at rest. Pieces taller than 1.1 viewports (an essay, a long project write-up) do not lean.

**Drift.** `[data-drift]` layers, the section patterns, are translated by 12% of the distance scrolled past them, up to 140px.

Lean and drift run for every pointer since 2026-11-14, because Lenis now drives touch as well. *(Before: fine pointer with hover only, since a natively scrolled finger runs ahead of any script.)*

**Layers.** Whatever the scroll moves must already be a picture on the compositor, or every frame repaints it. The script sets `data-layer` on a piece, which gives it `will-change: transform, opacity`, until the piece has arrived, and permanently if it leans. A heading's words are promoted until the heading has arrived; the patterns always are. On the home page that is 31 layers at rest for a fine pointer, and none once everything has arrived on touch.

**Cost per frame.** Positions are measured once and again when the body resizes; they come from `offsetTop`, which the reveal transforms do not affect. A frame reads the scroll position from Lenis and writes `--p` or `transform` to the few pieces in play. When nothing is moving the loop returns before doing any of that. `--p` is registered with `inherits: false` so setting it on a card does not restyle the card's contents.

## Change history

### 2026-11-13 — First build

**Audit before the change:** scrolling was native. `lenis` was in `package.json` and imported nowhere. The only motion on scroll was `src/scripts/reveal.ts`: an `IntersectionObserver` that added a class, with a fixed 700ms fade and 22px rise for everything.

**What changed:** `reveal.ts` was replaced by `scroll-story.ts`. The CSS reveal went from a triggered transition to the `--p` mapping, and gained the `left`, `right`, `grow` and `words` variants. Reveal attributes on the home sections and on every page heading were updated. The Notes section head, which revealed as one block, now reveals its three lines separately like the other sections.

**Corrections made while building:**

- *Heading text appeared twice.* The word splitter moved elements into its wrapper but left the original text nodes in the heading. It now replaces the heading's children.
- *`data-lenis-prevent` on the contact message box and the note outline.* With it, a wheel over the message box did nothing at all, because the box had nothing to scroll and the page was told not to. A test that scrolled back up from the bottom of the home page stayed at the bottom. Replaced with Lenis's `allowNestedScroll`, which lets an inner scroller use the wheel only while it can move. **Lesson:** test the wheel over every element type on the page, not only over empty canvas.
- *Stopping mid-arrival left pieces half turned* (a company disc resting as a diamond). Added the halfway commit, and made nested pieces start from their parent's position instead of their own.
- *Lean at 0.034 and a 2.2 degree cap* was barely visible at ordinary wheel speeds. Raised to 0.06 and 3.
- *Section washes and grain masked with CSS* broke when the drifting pattern got its own layer; recorded in site-design.md.

### 2026-11-13 — The skew lagged

**User report, after trying the first build:** "when I scroll up and down, I see lag, the scroll is smooth, I see the skew lagging."

**Cause.** The lean was an inline `transform` on elements that were not on compositor layers, so each frame Chrome painted every visible card again (images, grain, gradients) to draw it skewed. A Chrome trace of wheeling down and back up the settled home page at 1440×900 @2× showed 3,059 raster tasks taking 486ms. The first build's verification missed this because it only timed `requestAnimationFrame` callbacks; raster happens off the main thread and those stayed at 16.7ms throughout.

**Fix.** Layers, as described under Implementation. The same trace afterwards: 1,280 raster tasks taking 44ms. With lean and drift switched off entirely it is 1,304 tasks and 32ms, so the lean now costs about what plain scrolling costs. The lean's easing was also shortened from 140ms to 90ms so it follows the scroll more closely.

**Lesson:** frame callbacks alone do not show paint cost. For anything that transforms large elements per frame, trace it and read the raster work.

**Left alone on purpose:** the hero and the loader take no part in the scroll story. They have their own entrance, and the user asked for the hero to stay as it is.

### 2026-11-14 — Smooth touch

**User request:** "Currently there is no smooth scroll implemented." Wheel smoothing worked on desktop (a 400px wheel step eased over about 40 frames in headless Chrome); touch was native by design. Asked, the user chose smooth touch too, with lean and drift following touch (over touch smoothing without lean, or investigating desktop).

**Changed:** `syncTouch: true`; lean and drift no longer gated on a fine pointer; arrivals held under the loader until its reveal.

**Status:** not felt on a real phone yet. Lenis's touch inertia defaults are kept; if a flick feels floaty, `syncTouchLerp` and `touchInertiaExponent` are the levers. Lean and drift on touch add compositor layers on phones.

## Verification

2026-11-13, against the dev server:

- `pnpm check` zero errors, warnings, hints; `pnpm test` 7/7; `pnpm build` 35 pages; `git diff --check` passed.
- **Chrome, real GPU (ANGLE Metal, Apple M1 Pro), wheel down the whole page and back up:** home at 1440×900 @2×, 516 frames, median 16.7ms, 99th percentile 16.8ms, one frame at 33ms; home at 390×844 @3×, 628 frames, one at 33ms; a note page, 406 frames, one at 33ms; the projects index, 292 frames, one at 33ms. All pieces revealed (36/36 on home), no lean left on any element at rest, no horizontal overflow.
- **Chrome, behaviour:** a deep link to `/#contact` lands on the section with focus on it; a dock link scrolls smoothly to its section, sets the hash and moves focus; tabbing into a project row below the fold brings it in fully; a filled message box scrolls first and then hands the wheel to the page; with reduced motion there is no `reveal-ready`, no Lenis, and everything is visible.
- **WebKit (Playwright build 2336):** Lenis active, bottom of the home page reached, 36/36 revealed, `mask-composite: intersect` supported, no horizontal overflow, and screenshots mid-scroll show the patterns, the lean and the rising words.
- **After the layer fix (Chrome trace, real GPU, home 1440×900 @2×, down and back up on a settled page):** raster 44ms in 1,280 tasks, against 486ms in 3,059 before and 32ms in 1,304 with lean off; no dropped frames reported. A first pass with every piece arriving: raster 90ms. The notes index: raster 18ms. Frame callbacks unchanged: one 33ms frame in about 500 on home at both sizes and on the projects index; all pieces revealed; nothing left leaning at rest. A screenshot of the Notes section at rest looks as before.
- **Limits:** the trace comes from headless Chrome, which draws to no display; it shows the work per frame, not what a 120Hz screen presents. The user's own check is the real test of the lag. Frame times were measured there with a synthetic wheel, not by hand on a trackpad. Not checked: real Safari, a real touch device, a screen reader reading the split headings, a 120Hz display.
- **Firefox: not verified.** Playwright's Firefox build would not launch in this environment (its headless compositor failed before any page loaded), so nothing is known about the patterns' masks or the registered `--p` there.

## Deferred decisions

- Pinned scenes (sideways work, stacking experience) were offered and declined for now.
- Whether the hero should join the story, for instance by receding as it scrolls away.
- Whether touch devices should get lean or drift through another route.
- The lean strength, arrival distances and drift rate are first values.
