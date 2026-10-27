# Archived portfolio design direction

Saved 2026-10-27 before reverting the design direction. These are reference instructions, not a request to reimplement them automatically.

## Source and recovery

- Checkout: `feat/professional-first-portfolio`.
- Committed professional-first redesign: `dff9f2dc2315afe2fca145c9045dc8651dc056b7`.
- Pre-redesign baseline: `0880144eb30ae2a0a161ce9fd6b24c171ca74aca`.
- Later uncommitted refinements: preserved as an exact text patch at the end of this document. Apply only on top of the committed redesign after reviewing scope.
- Six regenerated hero PNG snapshots accompanied those refinements (390px and 1440px, Chromium/Firefox/WebKit on Darwin). Regenerate these from a running implementation; their binary contents are not embedded here.
- Scope is this checkout. Other branches/worktrees and remote deployments are outside this archive.

## Rollback completed

On 2026-10-27, restored all tracked files in this checkout to pre-redesign commit `0880144eb30ae2a0a161ce9fd6b24c171ca74aca`, including the earlier dependencies, contact form/API, and supporting assets. The rollback is an uncommitted working-tree change; Git history and other worktrees remain untouched. This archive is retained as a new file.

## Reusable design brief

Create a minimal, modern portfolio that makes professional experience easy to understand, especially on mobile. Lead with senior full-stack/product-platform engineering, clear text navigation, concrete employer experience, and selected case studies. Give personal work a distinct section after professional work. Keep factual claims and project availability current when reusing this brief.

### Committed foundation

- Use Manrope for primary text and IBM Plex Mono for labels, metadata, and diagrams. Local font files are configured in `app/layout.tsx`.
- Palette: paper `#f4f0e8`, ink `#11120f`, cobalt `#3157e8`, readable cobalt `#1f3ca6`, mist `#ced8ff`, sand `#dcc7a8`, orange signal `#f16a43`. Use fine borders, strong typography, generous spacing, and restrained accents.
- Homepage order: hero, professional experience, ASCII transition, selected professional work, Bakbak showcase, field notes, contact, footer.
- Use visible text navigation, an accessible mobile menu, skip link, current-page indicators, and header-aware cross-route anchors.
- Give employer rows role, dates, concise impact statements, and case-study links. Reuse the experience data instead of duplicating facts in components.
- On fine-pointer desktop at 1024px and above, selected work uses a measured, pinned horizontal sequence driven by vertical scrolling. Mobile/tablet/coarse-pointer/reduced-motion layouts stack vertically. Keyboard focus reveals the corresponding card.
- Use Lenis only for fine-pointer users without reduced motion; retain native scrolling elsewhere and reset/restore route anchors correctly.
- Animate an interface/service/cloud ASCII map between sections; pause when offscreen or the tab is hidden, and use a static frame for reduced motion.
- Carry the same visual language through experience pages, Bakbak, writing index/articles, résumé, loading/error/not-found states, and footer.
- Replace the contact form with direct email, LinkedIn, and GitHub links. This commit also removed the contact API and form hooks; restoring it wholesale restores that older behavior too.
- Provide a local downloadable résumé PDF, embedded desktop preview and mobile fallback link. Update social image, canonical metadata, and manifest with the design.
- The commit also changed dependencies, lockfile, environment example, and configuration. Inspect those separately if reusing only the visual parts.

### Later hero and identity refinements

- Replace the plain name wordmark with a square AR monogram: dark background, cobalt left stripe, small orange corner detail, and a slight hover rotation. Place Ayush Rameja alongside with the surname bold; reuse in the mobile menu.
- Use a 12-column desktop hero. Headline occupies eight columns, current role/context four; portrait occupies nine columns below, metrics three.
- Headline: “Building reliable product platforms, end to end.” Highlight “reliable” in cobalt with a slightly angled orange underline.
- Split senior-engineer label and Bangalore location across a ruled kicker. Give current role, employer, supporting copy and actions a separate context column with a left border.
- Make the portrait wide (2.75:1 desktop; 4:3 mobile), with subtle grid overlay, an “UI → API → Cloud” badge, offset shadow, and dark caption bar: “Engineering, end to end.” / “Interface craft · service design · cloud delivery”.
- Display metrics as three stacked cells beside the desktop portrait, then three columns on narrower screens. Collapse the overall hero to a single column at 900px; refine typography/actions at 767px.

### Later canvas and ASCII refinements

- Move palette activation from the viewport midpoint to 66% of viewport height so the incoming section changes the canvas earlier.
- Add `palette-enhanced` only when observation is active. Make top-level palette sections transparent so the body owns the transition; retain solid section backgrounds without JavaScript.
- Transition canvas/header/text over 550ms. Define active foreground and accent per palette; let project cards, contact links, borders, and captions inherit those colors to maintain contrast through transitions.
- Replace Unicode boxes with equal-width plain ASCII boxes and programmatically composed frames. Label nodes UI/BUILD, API/CONNECT, CLOUD/SCALE; use horizontal desktop and vertical mobile layouts.
- Disable font ligatures/contextual alternates on the ASCII text, preserve whitespace, center the map vertically, and ensure the entire diagram fits its container.

## Validation to repeat when reusing

Run the relevant lint/build and Playwright checks after implementation; no prior pass is evidence for a future version. Cover 320px/390px mobile, 768px tablet, 1024px coarse pointer, 1440px desktop, keyboard menu/focus/anchors, reduced motion, reversible horizontal scrolling, route rendering, résumé links, and Axe contrast/heading checks. Review hero snapshots across Chromium, Firefox, and WebKit. Check foreground contrast during palette changes, including offscreen sections.

## Exact uncommitted source refinements

This patch is relative to the committed professional-first redesign above. It includes the test-title change; screenshot binaries must be regenerated.

```diff
diff --git a/app/_components/HeroSection.tsx b/app/_components/HeroSection.tsx
index 8e470f4..913cf2e 100644
--- a/app/_components/HeroSection.tsx
+++ b/app/_components/HeroSection.tsx
@@ -12,8 +12,20 @@ export default function HeroSection() {
     <section id="home" className="hero-section" data-palette="paper">
       <div className="site-container hero-grid">
         <div className="hero-copy">
-          <p className="eyebrow">Bangalore, India · Product platforms</p>
-          <h1>Senior full-stack engineer building reliable product platforms.</h1>
+          <div className="hero-kicker">
+            <p className="eyebrow">Senior full-stack engineer</p>
+            <p className="hero-location">Bangalore, India</p>
+          </div>
+          <h1>
+            Building <span className="hero-title__accent">reliable</span> product
+            platforms, end to end.
+          </h1>
+        </div>
+
+        <div className="hero-context">
+          <p className="hero-context__label">
+            <span aria-hidden="true" /> Currently
+          </p>
           <p className="hero-role">
             Senior Software Engineer at Autodesk <span>via Quarks Technosoft</span>
           </p>
@@ -38,13 +50,17 @@ export default function HeroSection() {
               alt="Ayush Rameja"
               fill
               priority
-              sizes="(max-width: 768px) 100vw, 38vw"
-              className="object-cover object-[center_42%]"
+              sizes="(max-width: 767px) calc(100vw - 2rem), 72vw"
+              className="object-cover object-center"
             />
+            <div className="hero-portrait__grid" aria-hidden="true" />
+            <p className="hero-portrait__signal" aria-hidden="true">
+              UI <span>→</span> API <span>→</span> Cloud
+            </p>
           </div>
           <figcaption>
-            <span>Currently</span>
-            Building web and learning platforms used at meaningful scale.
+            <strong>Engineering, end to end.</strong>
+            <span>Interface craft · service design · cloud delivery</span>
           </figcaption>
         </figure>
 
diff --git a/app/globals.css b/app/globals.css
index 1c4d740..433283b 100644
--- a/app/globals.css
+++ b/app/globals.css
@@ -142,12 +142,66 @@
   display: inline-flex;
   min-height: 2.75rem;
   align-items: center;
+  gap: 0.7rem;
   color: var(--ink);
-  font: 700 0.82rem/1 var(--font-mono);
-  text-transform: uppercase;
   text-decoration: none;
 }
 
+.site-wordmark__mark {
+  position: relative;
+  display: grid;
+  width: 2.55rem;
+  height: 2.55rem;
+  flex: 0 0 auto;
+  place-items: center;
+  overflow: hidden;
+  background: var(--ink);
+  color: var(--paper);
+  font: 650 0.76rem/1 var(--font-mono);
+  letter-spacing: -0.08em;
+  transition: background-color 180ms ease, transform 180ms ease;
+}
+
+.site-wordmark__mark::before {
+  position: absolute;
+  inset: 0 auto 0 0;
+  width: 0.3rem;
+  background: var(--cobalt);
+  content: "";
+}
+
+.site-wordmark__mark::after {
+  position: absolute;
+  top: 0.25rem;
+  right: 0.25rem;
+  width: 0.35rem;
+  height: 0.35rem;
+  background: var(--signal);
+  content: "";
+}
+
+.site-wordmark__mark span {
+  translate: 0.08rem 0;
+}
+
+a.site-wordmark:hover .site-wordmark__mark {
+  background: var(--cobalt);
+  transform: rotate(-3deg);
+}
+
+.site-wordmark__name {
+  display: inline-flex;
+  gap: 0.28rem;
+  align-items: baseline;
+  font-size: 0.88rem;
+  font-weight: 500;
+  letter-spacing: -0.025em;
+}
+
+.site-wordmark__name strong {
+  font-weight: 800;
+}
+
 .site-nav {
   display: flex;
   align-items: center;
@@ -220,6 +274,11 @@
   color: white;
 }
 
+.site-menu .site-wordmark__mark {
+  background: white;
+  color: var(--cobalt);
+}
+
 .site-menu .site-menu-trigger {
   border-color: rgb(255 255 255 / 65%);
 }
@@ -257,55 +316,120 @@
 
 .hero-section {
   min-height: calc(100svh - var(--header-height));
+  overflow: clip;
   background: var(--paper);
   color: var(--ink);
-  padding-block: clamp(2.5rem, 6vw, 6rem) 2rem;
+  padding-block: clamp(3rem, 5vw, 5.5rem) 2.5rem;
 }
 
 .hero-grid {
   display: grid;
-  grid-template-columns: minmax(0, 1.45fr) minmax(20rem, 0.65fr);
-  gap: clamp(2rem, 5vw, 6rem);
+  grid-template-columns: repeat(12, minmax(0, 1fr));
+  column-gap: clamp(1.25rem, 2.3vw, 2.5rem);
+  row-gap: clamp(2.5rem, 4vw, 4rem);
   align-items: end;
 }
 
+.hero-copy {
+  grid-column: 1 / span 8;
+}
+
+.hero-kicker {
+  display: flex;
+  align-items: center;
+  justify-content: space-between;
+  gap: 1rem;
+  border-bottom: 1px solid var(--rule-strong);
+  padding-bottom: 0.8rem;
+}
+
 .eyebrow {
   color: var(--cobalt-ink);
-  font: 600 0.72rem/1.5 var(--font-mono);
+  font: 650 0.7rem/1.5 var(--font-mono);
+  text-transform: uppercase;
+}
+
+.hero-location {
+  color: var(--muted);
+  font: 500 0.68rem/1.5 var(--font-mono);
   text-transform: uppercase;
 }
 
 .hero-copy h1 {
-  max-width: 13ch;
-  margin-top: 1.4rem;
-  font-size: clamp(3.25rem, 7.4vw, 7.5rem);
-  font-weight: 650;
-  line-height: 0.91;
-  letter-spacing: -0.065em;
+  max-width: 11.5ch;
+  margin-top: clamp(1.5rem, 2.5vw, 2.5rem);
+  font-size: clamp(3.7rem, 6.5vw, 6.6rem);
+  font-weight: 680;
+  line-height: 0.92;
+  letter-spacing: -0.067em;
   text-wrap: balance;
 }
 
+.hero-title__accent {
+  position: relative;
+  display: inline-block;
+  margin-right: 0.1em;
+  color: var(--cobalt);
+  isolation: isolate;
+}
+
+.hero-title__accent::after {
+  position: absolute;
+  z-index: -1;
+  right: -0.02em;
+  bottom: 0.03em;
+  left: 0.02em;
+  height: 0.08em;
+  background: var(--signal);
+  content: "";
+  rotate: -1deg;
+}
+
+.hero-context {
+  grid-column: 9 / -1;
+  border-left: 1px solid var(--rule-strong);
+  padding-left: clamp(1.25rem, 2.5vw, 2.5rem);
+}
+
+.hero-context__label {
+  display: flex;
+  align-items: center;
+  gap: 0.55rem;
+  color: var(--cobalt-ink);
+  font: 650 0.68rem/1.5 var(--font-mono);
+  text-transform: uppercase;
+}
+
+.hero-context__label span {
+  width: 0.55rem;
+  height: 0.55rem;
+  background: var(--signal);
+}
+
 .hero-role {
-  max-width: 36rem;
-  margin-top: clamp(2rem, 4vw, 3.75rem);
-  font-size: clamp(1.15rem, 1.8vw, 1.6rem);
+  max-width: 28rem;
+  margin-top: 1.25rem;
+  font-size: clamp(1.2rem, 1.7vw, 1.55rem);
   font-weight: 750;
+  line-height: 1.2;
+  letter-spacing: -0.03em;
 }
 
 .hero-role span {
   display: block;
-  margin-top: 0.35rem;
+  margin-top: 0.55rem;
   color: var(--muted);
-  font: 500 0.72rem/1.5 var(--font-mono);
+  font: 550 0.68rem/1.5 var(--font-mono);
+  letter-spacing: 0;
   text-transform: uppercase;
 }
 
 .hero-summary {
-  max-width: 40rem;
+  max-width: 30rem;
   margin-top: 1.25rem;
   color: var(--muted);
-  font-size: clamp(1rem, 1.25vw, 1.15rem);
-  line-height: 1.7;
+  font-size: clamp(0.94rem, 1.15vw, 1.05rem);
+  line-height: 1.65;
 }
 
 .hero-actions {
@@ -349,68 +473,152 @@
 }
 
 .hero-portrait {
+  position: relative;
+  grid-column: 1 / span 9;
+  align-self: stretch;
+  margin-top: 0.25rem;
   border: 1px solid var(--rule-strong);
-  background: var(--sand);
+  background: var(--ink);
+  box-shadow: -0.55rem 0.55rem 0 var(--mist);
 }
 
 .hero-portrait__image {
   position: relative;
-  min-height: clamp(24rem, 53vw, 40rem);
+  aspect-ratio: 2.75 / 1;
   overflow: hidden;
   border-bottom: 1px solid var(--rule-strong);
+  background: var(--sand);
+}
+
+.hero-portrait__image img {
+  filter: saturate(0.94) contrast(1.03);
+}
+
+.hero-portrait__grid {
+  position: absolute;
+  inset: 0;
+  background-image: linear-gradient(rgb(17 18 15 / 9%) 1px, transparent 1px),
+    linear-gradient(90deg, rgb(17 18 15 / 9%) 1px, transparent 1px);
+  background-size: 3rem 3rem;
+  mix-blend-mode: multiply;
+  pointer-events: none;
+}
+
+.hero-portrait__signal {
+  position: absolute;
+  right: 0.75rem;
+  bottom: 0.75rem;
+  background: var(--ink);
+  color: var(--paper);
+  padding: 0.65rem 0.8rem;
+  font: 600 0.65rem/1 var(--font-mono);
+  text-transform: uppercase;
+}
+
+.hero-portrait__signal span {
+  color: var(--signal);
+  padding-inline: 0.2rem;
 }
 
 .hero-portrait figcaption {
-  display: grid;
-  gap: 0.6rem;
-  padding: 1rem;
-  font-size: 0.84rem;
-  line-height: 1.5;
+  display: flex;
+  min-height: 3.4rem;
+  align-items: center;
+  justify-content: space-between;
+  gap: 1.5rem;
+  background: var(--ink);
+  color: var(--paper);
+  padding: 0.85rem 1rem;
+}
+
+.hero-portrait figcaption strong {
+  font-size: 0.82rem;
+  font-weight: 700;
 }
 
 .hero-portrait figcaption span {
-  color: var(--cobalt-ink);
-  font: 600 0.65rem/1.2 var(--font-mono);
+  color: color-mix(in srgb, var(--paper) 66%, transparent);
+  font: 500 0.61rem/1.4 var(--font-mono);
+  text-align: right;
   text-transform: uppercase;
 }
 
 .hero-metrics {
   display: grid;
-  grid-column: 1 / -1;
-  grid-template-columns: repeat(3, minmax(0, 1fr));
-  margin-top: 0.5rem;
-  border-top: 1px solid var(--rule-strong);
-  border-bottom: 1px solid var(--rule-strong);
+  grid-column: 10 / -1;
+  align-self: stretch;
+  grid-template-rows: repeat(3, minmax(0, 1fr));
+  margin-top: 0.25rem;
+  border: 1px solid var(--rule-strong);
+  background: var(--mist);
 }
 
 .hero-metrics div {
-  display: flex;
-  min-height: 7.5rem;
-  align-items: flex-end;
-  justify-content: space-between;
-  gap: 1rem;
-  padding: 1rem;
+  display: grid;
+  align-content: space-between;
+  gap: 0.75rem;
+  padding: clamp(1rem, 1.5vw, 1.5rem);
 }
 
 .hero-metrics div + div {
-  border-left: 1px solid var(--rule-strong);
+  border-top: 1px solid var(--rule-strong);
 }
 
 .hero-metrics dt {
-  max-width: 15rem;
+  max-width: 10rem;
   color: var(--muted);
-  font: 500 0.68rem/1.5 var(--font-mono);
+  font: 550 0.63rem/1.45 var(--font-mono);
   text-transform: uppercase;
 }
 
 .hero-metrics dd {
+  order: -1;
   color: var(--cobalt);
-  font-size: clamp(2.5rem, 5vw, 5rem);
-  font-weight: 700;
-  line-height: 0.8;
+  font-size: clamp(2.5rem, 4.5vw, 4.5rem);
+  font-weight: 750;
+  line-height: 0.9;
   letter-spacing: -0.06em;
 }
 
+@media (max-width: 900px) {
+  .hero-grid {
+    grid-template-columns: 1fr;
+  }
+
+  .hero-copy,
+  .hero-context,
+  .hero-portrait,
+  .hero-metrics {
+    grid-column: 1;
+  }
+
+  .hero-context {
+    border-top: 1px solid var(--rule-strong);
+    border-left: 0;
+    padding-top: 1.5rem;
+    padding-left: 0;
+  }
+
+  .hero-summary {
+    max-width: 40rem;
+  }
+
+  .hero-portrait {
+    margin-top: 0;
+  }
+
+  .hero-metrics {
+    grid-template-columns: repeat(3, minmax(0, 1fr));
+    grid-template-rows: none;
+    margin-top: 0;
+  }
+
+  .hero-metrics div + div {
+    border-top: 0;
+    border-left: 1px solid var(--rule-strong);
+  }
+}
+
 @media (max-width: 767px) {
   .site-nav--desktop {
     display: none;
@@ -420,33 +628,61 @@
     display: inline-flex;
   }
 
+  .hero-section {
+    padding-block: 2.25rem 2rem;
+  }
+
   .hero-grid {
-    grid-template-columns: 1fr;
+    row-gap: 2rem;
+  }
+
+  .hero-kicker {
+    align-items: flex-start;
   }
 
   .hero-copy h1 {
-    font-size: clamp(2.9rem, 15vw, 5rem);
+    margin-top: 1.4rem;
+    font-size: clamp(2.7rem, 12vw, 4.25rem);
+    line-height: 0.94;
   }
 
-  .hero-portrait {
-    margin-top: 0.5rem;
+  .hero-role {
+    font-size: 1.2rem;
   }
 
   .hero-portrait__image {
-    min-height: min(112vw, 32rem);
+    aspect-ratio: 4 / 3;
   }
 
-  .hero-metrics {
-    grid-template-columns: 1fr;
+  .hero-portrait figcaption {
+    display: grid;
+    gap: 0.35rem;
+  }
+
+  .hero-portrait figcaption span {
+    text-align: left;
+  }
+
+  .hero-actions .site-button--primary {
+    flex: 1 1 100%;
+  }
+
+  .hero-actions .site-button--secondary {
+    flex: 1;
   }
 
   .hero-metrics div {
-    min-height: 5.5rem;
+    min-width: 0;
+    min-height: 6.5rem;
+    padding: 0.8rem;
   }
 
-  .hero-metrics div + div {
-    border-top: 1px solid var(--rule-strong);
-    border-left: 0;
+  .hero-metrics dd {
+    font-size: clamp(2rem, 10vw, 2.75rem);
+  }
+
+  .hero-metrics dt {
+    font-size: 0.55rem;
   }
 }
 
@@ -461,37 +697,42 @@
 html[data-active-palette="paper"] {
   --active-bg: var(--paper);
   --active-fg: var(--ink);
+  --active-accent: var(--cobalt-ink);
 }
 
 html[data-active-palette="mist"] {
   --active-bg: var(--mist);
   --active-fg: var(--ink);
+  --active-accent: var(--cobalt-ink);
 }
 
 html[data-active-palette="ink"] {
   --active-bg: var(--ink);
   --active-fg: var(--paper);
+  --active-accent: var(--signal);
 }
 
 html[data-active-palette="sand"] {
   --active-bg: var(--sand);
   --active-fg: var(--ink);
+  --active-accent: var(--cobalt-ink);
 }
 
 html[data-active-palette="cobalt"] {
   --active-bg: var(--cobalt);
   --active-fg: #ffffff;
+  --active-accent: #ffffff;
 }
 
 body {
   background: var(--active-bg);
-  transition: background-color 500ms cubic-bezier(0.22, 1, 0.36, 1);
+  transition: background-color 550ms cubic-bezier(0.22, 1, 0.36, 1);
 }
 
 .site-header {
   border-color: color-mix(in srgb, var(--active-fg) 22%, transparent);
   background: color-mix(in srgb, var(--active-bg) 88%, transparent);
-  transition: background-color 500ms cubic-bezier(0.22, 1, 0.36, 1), border-color 500ms ease;
+  transition: background-color 550ms cubic-bezier(0.22, 1, 0.36, 1), border-color 550ms ease;
 }
 
 .site-header .site-wordmark,
@@ -508,6 +749,38 @@ body {
   min-height: 100dvh;
 }
 
+/* Keep solid section colors as the no-JavaScript fallback. Once palette
+   observation is active, the document canvas owns the color transition. */
+.palette-enhanced .site-page-shell main > section[data-palette] {
+  background-color: transparent !important;
+  color: var(--active-fg) !important;
+  transition: color 550ms cubic-bezier(0.22, 1, 0.36, 1);
+}
+
+.palette-enhanced .selected-work-section .eyebrow,
+.palette-enhanced .selected-project-card__role,
+.palette-enhanced .bakbak-decisions .eyebrow,
+.palette-enhanced .bakbak-decisions__grid span {
+  color: var(--active-accent);
+  transition: color 550ms cubic-bezier(0.22, 1, 0.36, 1);
+}
+
+.palette-enhanced .contact-section .eyebrow,
+.palette-enhanced .contact-section__body > p,
+.palette-enhanced .contact-links a {
+  color: var(--active-fg);
+  transition: color 550ms cubic-bezier(0.22, 1, 0.36, 1);
+}
+
+.palette-enhanced .contact-links,
+.palette-enhanced .contact-links a {
+  border-color: color-mix(in srgb, var(--active-fg) 42%, transparent);
+}
+
+.palette-enhanced .contact-links a > span:last-child {
+  color: var(--active-accent);
+}
+
 .section-heading {
   display: grid;
   grid-template-columns: minmax(0, 1.35fr) minmax(16rem, 0.65fr);
@@ -673,19 +946,29 @@ body {
   display: grid;
   grid-template-columns: 0.45fr minmax(28rem, 1.1fr) 0.65fr;
   gap: clamp(1.5rem, 4vw, 4rem);
-  align-items: end;
+  align-items: center;
   border-top: 1px solid color-mix(in srgb, var(--ink) 42%, transparent);
   padding-top: clamp(2rem, 4vw, 3.5rem);
 }
 
 .ascii-system-map {
-  min-height: 8.2rem;
-  overflow: hidden;
-  color: var(--cobalt-ink);
+  display: flex;
+  min-width: 0;
+  min-height: 7rem;
+  align-items: center;
+  overflow: clip;
+  color: color-mix(in srgb, var(--active-fg) 68%, var(--cobalt) 32%);
+  transition: color 550ms cubic-bezier(0.22, 1, 0.36, 1);
 }
 
 .ascii-system-map pre {
-  font: 500 clamp(0.57rem, 1vw, 0.82rem)/1.45 var(--font-mono);
+  width: max-content;
+  max-width: 100%;
+  margin: 0;
+  font: 520 clamp(0.62rem, 0.9vw, 0.82rem)/1.3 var(--font-mono);
+  font-variant-ligatures: none;
+  font-feature-settings: "liga" 0, "calt" 0;
+  letter-spacing: 0;
   white-space: pre;
 }
 
@@ -699,6 +982,11 @@ body {
   line-height: 1.7;
 }
 
+.ascii-transition .eyebrow {
+  color: color-mix(in srgb, var(--active-fg) 68%, var(--cobalt) 32%);
+  transition: color 550ms cubic-bezier(0.22, 1, 0.36, 1);
+}
+
 .selected-work-section {
   position: relative;
   background: var(--ink);
@@ -719,7 +1007,7 @@ body {
   align-items: end;
   justify-content: space-between;
   gap: 2rem;
-  border-bottom: 1px solid rgb(244 240 232 / 35%);
+  border-bottom: 1px solid color-mix(in srgb, currentColor 35%, transparent);
   padding-bottom: 2rem;
 }
 
@@ -734,7 +1022,7 @@ body {
 
 .selected-work-header > p {
   max-width: 22rem;
-  color: rgb(244 240 232 / 68%);
+  color: color-mix(in srgb, currentColor 68%, transparent);
   font: 500 0.68rem/1.6 var(--font-mono);
   text-transform: uppercase;
 }
@@ -750,8 +1038,8 @@ body {
   display: grid;
   min-height: 38rem;
   grid-template-rows: auto 1fr auto;
-  border: 1px solid rgb(244 240 232 / 38%);
-  background: color-mix(in srgb, var(--paper) 4%, transparent);
+  border: 1px solid color-mix(in srgb, currentColor 38%, transparent);
+  background: color-mix(in srgb, currentColor 4%, transparent);
 }
 
 .selected-project-card__topline,
@@ -764,8 +1052,8 @@ body {
 }
 
 .selected-project-card__topline {
-  border-bottom: 1px solid rgb(244 240 232 / 28%);
-  color: rgb(244 240 232 / 68%);
+  border-bottom: 1px solid color-mix(in srgb, currentColor 28%, transparent);
+  color: color-mix(in srgb, currentColor 68%, transparent);
   font: 500 0.68rem/1.4 var(--font-mono);
   text-transform: uppercase;
 }
@@ -795,7 +1083,7 @@ body {
 
 .selected-project-card__summary {
   align-self: end;
-  color: rgb(244 240 232 / 72%);
+  color: color-mix(in srgb, currentColor 72%, transparent);
   font-size: 1rem;
   line-height: 1.7;
 }
@@ -811,15 +1099,19 @@ body {
 }
 
 .selected-project-card__outcomes li {
-  border-top: 1px solid rgb(244 240 232 / 30%);
+  border-top: 1px solid color-mix(in srgb, currentColor 30%, transparent);
   padding-top: 1rem;
-  color: rgb(244 240 232 / 82%);
+  color: color-mix(in srgb, currentColor 82%, transparent);
   font-size: 0.86rem;
   line-height: 1.65;
 }
 
 .selected-project-card__footer {
-  border-top: 1px solid rgb(244 240 232 / 28%);
+  border-top: 1px solid color-mix(in srgb, currentColor 28%, transparent);
+}
+
+.selected-work-section .text-link--light {
+  color: currentColor;
 }
 
 .selected-work-section.is-pinned {
@@ -1189,7 +1481,7 @@ body {
 
 @media (max-width: 767px) {
   .ascii-system-map {
-    min-height: 12rem;
+    min-height: 16rem;
   }
 
   .ascii-system-map__wide {
diff --git a/components/AsciiSystemMap.tsx b/components/AsciiSystemMap.tsx
index eb77495..822f35b 100644
--- a/components/AsciiSystemMap.tsx
+++ b/components/AsciiSystemMap.tsx
@@ -3,95 +3,52 @@
 import { useReducedMotion } from "framer-motion";
 import { useEffect, useRef, useState } from "react";
 
+const BOX_RULE = "+------------+";
+const GAP = "       ";
+
+function desktopFrame(leftFlow: string, rightFlow: string) {
+  return [
+    `${BOX_RULE}${GAP}${BOX_RULE}${GAP}${BOX_RULE}`,
+    `|     UI     |${leftFlow}|    API     |${rightFlow}|   CLOUD    |`,
+    `|   BUILD    |${GAP}|  CONNECT   |${GAP}|   SCALE    |`,
+    `${BOX_RULE}${GAP}${BOX_RULE}${GAP}${BOX_RULE}`,
+  ].join("\n");
+}
+
 const frames = [
-  String.raw`┌────────┐       ┌────────┐       ┌────────┐
-│   UI   │ ───→  │  API   │      │ CLOUD  │
-└────────┘       └────────┘       └────────┘
-     build          connect          scale`,
-  String.raw`┌────────┐       ┌────────┐       ┌────────┐
-│   UI   │      │  API   │ ───→  │ CLOUD  │
-└────────┘       └────────┘       └────────┘
-     build          connect          scale`,
-  String.raw`┌────────┐       ┌────────┐       ┌────────┐
-│   UI   │      │  API   │      │ CLOUD  │
-└────────┘       └────────┘       └────────┘
-     build          connect       ←─ scale`,
-  String.raw`┌────────┐       ┌────────┐       ┌────────┐
-│   UI   │      │  API   │  ←──  │ CLOUD  │
-└────────┘       └────────┘       └────────┘
-     build          connect          scale`,
-  String.raw`┌────────┐       ┌────────┐       ┌────────┐
-│   UI   │  ←──  │  API   │      │ CLOUD  │
-└────────┘       └────────┘       └────────┘
-     build          connect          scale`,
+  desktopFrame("  ==>  ", "  ...  "),
+  desktopFrame("  -->  ", "  ==>  "),
+  desktopFrame("  ...  ", "  <==  "),
+  desktopFrame("  <==  ", "  <--  "),
+  desktopFrame("  ==>  ", "  ...  "),
 ] as const;
 
+const nodes = {
+  ui: [BOX_RULE, "|     UI     |", "|   BUILD    |", BOX_RULE],
+  api: [BOX_RULE, "|    API     |", "|  CONNECT   |", BOX_RULE],
+  cloud: [BOX_RULE, "|   CLOUD    |", "|   SCALE    |", BOX_RULE],
+} as const;
+
+function mobileFrame(firstFlow: readonly string[], secondFlow: readonly string[]) {
+  return [
+    ...nodes.ui,
+    ...firstFlow,
+    ...nodes.api,
+    ...secondFlow,
+    ...nodes.cloud,
+  ].join("\n");
+}
+
+const down = ["      ||", "      vv"] as const;
+const idle = ["      ..", "      .."] as const;
+const up = ["      ^^", "      ||"] as const;
+
 const mobileFrames = [
-  String.raw`┌────────┐
-│   UI   │
-└────────┘
-     │
-     ↓
-┌────────┐
-│  API   │
-└────────┘
-     ·
-     ·
-┌────────┐
-│ CLOUD  │
-└────────┘`,
-  String.raw`┌────────┐
-│   UI   │
-└────────┘
-     ·
-     ·
-┌────────┐
-│  API   │
-└────────┘
-     │
-     ↓
-┌────────┐
-│ CLOUD  │
-└────────┘`,
-  String.raw`┌────────┐
-│   UI   │
-└────────┘
-     ·
-     ·
-┌────────┐
-│  API   │
-└────────┘
-     ↑
-     │
-┌────────┐
-│ CLOUD  │
-└────────┘`,
-  String.raw`┌────────┐
-│   UI   │
-└────────┘
-     ↑
-     │
-┌────────┐
-│  API   │
-└────────┘
-     ·
-     ·
-┌────────┐
-│ CLOUD  │
-└────────┘`,
-  String.raw`┌────────┐
-│   UI   │
-└────────┘
-     │
-     ↓
-┌────────┐
-│  API   │
-└────────┘
-     ·
-     ·
-┌────────┐
-│ CLOUD  │
-└────────┘`,
+  mobileFrame(down, idle),
+  mobileFrame(idle, down),
+  mobileFrame(idle, up),
+  mobileFrame(up, idle),
+  mobileFrame(down, idle),
 ] as const;
 
 export default function AsciiSystemMap({ label = "Systems in motion" }: { label?: string }) {
diff --git a/components/Nav.tsx b/components/Nav.tsx
index 7ae389d..094b096 100644
--- a/components/Nav.tsx
+++ b/components/Nav.tsx
@@ -20,6 +20,19 @@ const links = [
 const PENDING_ANCHOR_KEY = "portfolio-pending-anchor";
 const homepageAnchors = new Set(["work", "contact"]);
 
+function Wordmark() {
+  return (
+    <>
+      <span className="site-wordmark__mark" aria-hidden="true">
+        <span>AR</span>
+      </span>
+      <span className="site-wordmark__name">
+        Ayush <strong>Rameja</strong>
+      </span>
+    </>
+  );
+}
+
 function scrollToHomepageSection(id: string) {
   const target = document.getElementById(id);
   if (!target) return false;
@@ -151,7 +164,7 @@ export default function Nav() {
     <header className="site-header">
       <div className="site-header__inner">
         <Link href="/" className="site-wordmark" aria-label="Ayush Rameja home">
-          Ayush Rameja
+          <Wordmark />
         </Link>
 
         <nav className="site-nav site-nav--desktop" aria-label="Primary navigation">
@@ -196,7 +209,9 @@ export default function Nav() {
           }}
         >
           <div className="site-menu__bar">
-            <span className="site-wordmark">Ayush Rameja</span>
+            <span className="site-wordmark">
+              <Wordmark />
+            </span>
             <button type="button" className="site-menu-trigger" onClick={closeMenu}>
               Close
             </button>
diff --git a/components/PaletteObserver.tsx b/components/PaletteObserver.tsx
index 13650f3..44c873f 100644
--- a/components/PaletteObserver.tsx
+++ b/components/PaletteObserver.tsx
@@ -16,11 +16,11 @@ export default function PaletteObserver() {
         (section.dataset.palette as PaletteName | undefined) ?? "paper";
     };
 
-    const setPaletteAtViewportMidpoint = () => {
-      const midpoint = window.innerHeight / 2;
+    const setPaletteAtScrollTrigger = () => {
+      const triggerLine = window.innerHeight * 0.66;
       const active = sections.findLast((section) => {
         const bounds = section.getBoundingClientRect();
-        return bounds.top <= midpoint && bounds.bottom >= midpoint;
+        return bounds.top <= triggerLine && bounds.bottom >= triggerLine;
       });
       if (active) setPalette(active);
     };
@@ -32,16 +32,19 @@ export default function PaletteObserver() {
         document.querySelectorAll<HTMLElement>("[data-palette]"),
       );
       if (!sections.length) return;
-      const midpointInset = Math.max(0, window.innerHeight / 2 - 1);
-      observer = new IntersectionObserver(setPaletteAtViewportMidpoint, {
-        rootMargin: `-${midpointInset}px 0px -${midpointInset}px 0px`,
+      const triggerLine = window.innerHeight * 0.66;
+      const topInset = Math.max(0, triggerLine - 1);
+      const bottomInset = Math.max(0, window.innerHeight - triggerLine - 1);
+      observer = new IntersectionObserver(setPaletteAtScrollTrigger, {
+        rootMargin: `-${topInset}px 0px -${bottomInset}px 0px`,
         threshold: 0,
       });
       sections.forEach((section) => observer?.observe(section));
-      setPaletteAtViewportMidpoint();
+      setPaletteAtScrollTrigger();
     };
 
     observeMidpoint();
+    document.documentElement.classList.add("palette-enhanced");
     window.addEventListener("resize", observeMidpoint);
     const mutationObserver = new MutationObserver(observeMidpoint);
     mutationObserver.observe(document.body, { childList: true, subtree: true });
@@ -49,6 +52,7 @@ export default function PaletteObserver() {
       observer?.disconnect();
       mutationObserver.disconnect();
       window.removeEventListener("resize", observeMidpoint);
+      document.documentElement.classList.remove("palette-enhanced");
     };
   }, [pathname]);
 
diff --git a/tests/e2e/portfolio.spec.ts b/tests/e2e/portfolio.spec.ts
index 3a28ad3..5d2aa01 100644
--- a/tests/e2e/portfolio.spec.ts
+++ b/tests/e2e/portfolio.spec.ts
@@ -194,7 +194,7 @@ test("reduced motion uses static work and ASCII fallbacks", async ({ page }) =>
   await expect(page.locator("html")).toHaveAttribute("data-active-palette", "cobalt");
 });
 
-test("the header palette follows the section at the viewport midpoint", async ({ page }) => {
+test("the page canvas follows the section approaching the viewport focus", async ({ page }) => {
   await page.setViewportSize({ width: 1440, height: 900 });
   await page.goto("/", { waitUntil: "networkidle" });
   await page.locator(".selected-work-section").evaluate((element) => element.scrollIntoView());

```
