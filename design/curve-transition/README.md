# Curve reveal prototype

Open `prototype.html` directly; fonts and portrait are embedded. No server required.

Replay, pause/resume, scrub, half speed, and Skip/Escape are available. Reduced motion shows the finished hero directly. This standalone study is now integrated as the default homepage intro. The production version retains resource readiness, failure recovery, and accessible skipping.

## Timing

- 0–857 ms: warm white fades to the hero's charcoal frame color.
- 619–1190 ms: the whole ivory logo fades in; hold to 1571 ms.
- 1571–2048 ms: logo fades away.
- 1762–3381 ms: a central opening expands from the center in both width and height simultaneously; its corner radius grows into the hero's final curves.
- 2381–3810 ms: marquee, portrait, text, and navigation settle into place with small offsets and overlapping fades.
- 4000 ms: complete. No repeating intro.

The preview holds the hero's initial palette and uses compact dimensions. Hero navigation is presentation-only. In production, the reveal waits at the logo until the existing document/font/eager-image readiness gate settles; this prototype waits for its embedded assets before playback.

Edit `template.html`, then run `python3 design/curve-transition/build-prototype.py`. The generator uses the latest `dist/index.html`; run `pnpm build` first if the hero source changes.

Validation: desktop midpoint and mobile final frame visually inspected; white start, logo hold, intermediate clipping, scrub, pause/resume, skip, overlay cleanup, final mobile radius, and horizontal overflow checks passed in the HTML preview.
