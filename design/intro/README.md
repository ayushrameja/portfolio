# AR intro prototype 01

Open `index.html` directly in a browser. Standalone HTML/SVG/CSS/JavaScript; no packages, build, network assets, or server required.

Uses the approved `design/logo/ar-solid-rounded-white.svg` geometry, embedded unchanged. Glossy red close-up and outline echoes pull back to a white AR mark, then reveal a placeholder hero. Inspired by the MKBHD openings inspected in Zen on 2026-10-27:
- https://www.youtube.com/watch?v=ESABTN4VtrA
- https://www.youtube.com/watch?v=HLUamwXQ218
- https://www.youtube.com/watch?v=DqAKQwagCDg

Duration: 2.4 seconds. Replay, 0.35x slow motion, timeline scrubbing, and skip controls are provided for review. Reduced-motion preference skips automatic playback; replay remains explicitly available. No audio. This is a simulated entrance, not a measurement of loading progress. Hero content/layout is only a transition placeholder.

Uses layered SVG and transforms for simulated depth rather than real 3D rendering. Production integration should tie dismissal to critical content readiness, avoid unnecessary repeat playback within a session, and retain a static/reduced-motion path. Session gating is intentionally absent from this review prototype.

Validation: desktop (728px) and mobile (390px) HTML previews; separately inspected logo-hold and final-hero states. No console errors in those previews. No full website was restored or deployed.

## Revision 02 — supplied storyboard

`index.html` now follows the four supplied screenshot stages. Original revision retained as `prototype-01.html`.

- 0–0.3s: centered red cross-grid “Loading” on black.
- 0.3–0.75s: oversized diagonal from the actual AR path, glossy red with fine outline echoes.
- 0.75–1.55s: pull back; wireframe bounding box starts drawing at 1.15s.
- 1.55–1.85s: angled AR inside the box and its eight corner handles.
- 1.85–2.45s: rotate to face forward, fade the box, resolve to white AR.
- 2.45–2.8s: logo hold; 2.8–3.2s: transition to placeholder hero.

Added four stage-jump buttons. Duration is now 3.2s (superseding the revision-01 duration above). Checked all four sampled states with HTML previews, including mobile final mark; no reported console errors. SVG layers and CSS perspective simulate the reference's depth; this is not a physically rendered 3D model.

## Loading-to-hero handoff — current scope

`hero-preview.html` is a self-contained review of the current Astro implementation. Replay and slow-motion controls are review-only; production retains once-per-tab playback and reduced-motion handling. Regenerate after `pnpm build` with `python3 design/intro/export-hero-preview.py`.

The approved v2 logo plays the existing 0.3s Loading, diagonal, wireframe, and rotation sequence. It fades away over 2.9–3.2s while the minimal name/subtitle placeholder appears. No logo remains in the hero. The final hero layout and copy are undecided; no other homepage sections are part of this design. The earlier full-site draft is superseded.

Checked: Astro type check, seven regression tests including hero reveal cleanup, static 32-page build, and inline mobile/desktop previews. No deployment.

## Current finish and ending

The active intro uses an ice-blue, mint and violet metallic gradient instead of red. At 3.2 seconds the overlay is hidden instantly; the hero has no fade or movement. The existing loading, close-up, wireframe, rotation and white-logo hold are retained. Hero entrance design is deferred. This supersedes earlier fade-out descriptions above.
