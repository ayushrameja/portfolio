# Lighthouse / DevTools Insights (ayush.im) — Feb 5, 2026

This note is based on the screenshots you shared from Chrome DevTools / Lighthouse-style “Insights & Diagnostics”.
Treat it as a prioritized backlog of *likely* wins, not gospel—audits are useful, but they also love crying wolf when extensions/dev builds are involved.

## TL;DR (what to do first)

1. **Fix LCP “element render delay” (940ms)** by reducing hydration/JS work and not animating the LCP element into existence.
2. **Make the LCP image explicitly high priority** (`fetchpriority="high"`), and ensure `sizes` is accurate so you don’t preload a billboard.
3. **Replace `filter: blur(...)` animations** (non-composited) with `opacity/transform` for smoother rendering and fewer main-thread tantrums.
4. **Address contrast failures** (text colors) so humans can read your website without evolving night vision.

## What the audit is telling you (and what it probably means here)

### 1) LCP request discovery → “fetchpriority=high should be applied”
**Observed**
- LCP element: `img.object-cover` (your hero profile image).
- “Request is discoverable in initial document” ✅
- “lazy load not applied” ✅
- Missing: `fetchpriority=high` ❌

**Where in this repo**
- `app/_components/HeroSection.tsx` (profile image has `priority`, `fill`, `className="object-cover"`).

**Likely fixes**
- Add `fetchPriority="high"` to the `next/image` in the hero.
- Add a correct `sizes` prop for the `fill` image (preloading the wrong size is just paying extra to be slower).
- Confirm the asset itself is sane (dimensions and compression) since it’s the LCP candidate.

**Trade-offs**
- If you overuse `fetchpriority=high`, you’ll starve other critical resources and “optimize” your way into worse overall loading.

---

### 2) LCP breakdown → element render delay dominates (940ms)
**Observed**
- TTFB: ~50ms
- Resource load delay: ~10ms
- Resource load duration: ~80ms
- **Element render delay: ~940ms** (this is the problem)

**What this usually means**
- The image downloads fast enough, but the page is busy *doing JavaScript things* before the browser paints it as the LCP.

**Where in this repo**
- `app/_components/HeroSection.tsx` is a **client component** (`"use client"`) and uses **framer-motion**.
- `components/Nav.tsx` also uses framer-motion and animates `filter: blur(...)`.
- `app/ClientLayout.tsx` runs effects on mount (storm trigger + route bookkeeping).

**Likely fixes**
- Avoid animating the LCP element (or its container) from hidden → visible via JS.
- Move as much of the hero as possible back to a **server component** (keep only the tiny interactive parts as client).
- If you keep framer-motion, consider loading it *after* initial paint (e.g., dynamic import / reduced motion strategy).

**Trade-offs**
- Less JS upfront usually means fewer “wow” animations. Your site becomes faster and more boring—aka the highest form of maturity.

---

### 3) Render blocking requests / network dependency tree → CSS chunk on the critical path
**Observed**
- A CSS chunk (~11.6 KiB) is render-blocking and appears in the dependency tree.
- Critical path latency shown ~150ms (not horrifying, but still flagged).

**Likely fixes**
- Reduce CSS that must be present at startup (trim global styles, avoid dragging unused component CSS into the root).
- Keep the “first screen” styles lean; defer the rest where practical.

**Trade-offs**
- Aggressive CSS splitting can create a death-by-1000-requests situation. Tiny site + one CSS file is often fine.

---

### 4) Legacy JavaScript → estimated savings ~14 KiB
**Observed**
- Polyfills/transforms for modern features (e.g., `Array.prototype.at`, `flat`, `Object.fromEntries`, `String.prototype.trim*`).

**Likely fixes**
- Revisit target browser support (modern-only builds reduce transforms/polyfills).
- Validate whether this is a production build audit; dev tooling can skew this.

**Trade-offs**
- Shipping “less legacy JS” can mean shipping “less compatibility”. If you still care about older browsers, you pay the bytes tax.

---

### 5) Reduce unused JavaScript → estimated savings ~48 KiB
**Observed**
- Two JS chunks called out with meaningful “unused” savings.

**Likely fixes**
- Reduce client component surface area (the App Router makes it easy to accidentally hydrate your entire personality).
- Lazy-load non-critical UI affordances (animations, toasts, transitions).
- Audit dependencies that are imported on the home route but not needed immediately.

**Trade-offs**
- Code-splitting adds complexity and more network requests. You’re trading “one bigger download” for “many smaller downloads” and hoping the cache gods smile.

---

### 6) Minify JavaScript → savings shown (but screenshot includes a Chrome extension)
**Observed**
- The “Minify JavaScript” table references `chrome-extension://...`

**What this probably means**
- The audit run was affected by a browser extension. That’s not your app; that’s your browser being messy.

**Likely fixes**
- Re-run in **Incognito** with extensions disabled, against a **production build** (`pnpm build && pnpm start`).

**Trade-offs**
- None, except you’ll lose the comforting illusion that your ad blocker is “free”.

---

### 7) Avoid non-composited animations → 5 animated elements found (filter-related)
**Observed**
- Multiple elements animate `filter` (blur), which forces paints and can increase jank/CLS risk.

**Where in this repo**
- `components/Nav.tsx` uses variants that animate `filter: "blur(...)"` in multiple places.

**Likely fixes**
- Replace blur animations with `opacity` + `transform` (translate/scale) which are typically GPU-friendly.
- Keep blur effects static (no animation), or gate them behind `prefers-reduced-motion`.

**Trade-offs**
- Blur is a nice vibe, but it’s also the web equivalent of running with a backpack full of rocks.

---

### 8) Accessibility → contrast failures (score ~96 overall)
**Observed**
- “Background and foreground colors do not have a sufficient contrast ratio.”
- Failing selectors include text using `text-zinc-500 dark:text-zinc-400` against light backgrounds.

**Likely fixes**
- Bump low-contrast text tokens (e.g., `zinc-500 → zinc-600/700`, `dark:zinc-400 → dark:zinc-300`).
- For small text (xs), be stricter: contrast issues hit harder there.

**Trade-offs**
- Higher contrast can look “less subtle”. That’s fine; subtlety is overrated when nobody can read it.

## Verification checklist (so we don’t optimize ghosts)

- Run the audit against **production**:
  - `pnpm build`
  - `pnpm start`
- Use **Incognito** (extensions off) and keep conditions consistent (throttling, device emulation).
- Confirm the LCP element is still the hero image (it can change if you tweak layout/animations).
- After each change, re-check:
  - LCP subparts (esp. element render delay)
  - unused JS savings
  - animation diagnostics
  - contrast checks

## Suggested next “real work” sequence (when you’re ready for code changes)

1. **De-client the hero**: make `HeroSection` server-first; isolate motion to tiny child components.
2. **Stop animating blur** in `components/Nav.tsx`; switch to transform/opacity.
3. **Explicitly set `fetchPriority` + `sizes`** on the LCP image.
4. **Tune contrast tokens** for failing text.
5. Re-run audits and decide if the remaining warnings are worth your time (they usually aren’t, but we pretend they are).

