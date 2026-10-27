# AR logo studies

Figma file: https://www.figma.com/design/o3lBiU5i0hx0Rva02tYbb1/Logo

The original `ar-solid.svg` and `ar-outline.svg` are editable reference reconstructions, not embedded bitmaps. The rounded files are new refinements; original masters remain untouched.

- `ar-solid-rounded.svg`: transparent black filled mark, softened outer/inner corners.
- `ar-outline-rounded.svg`: transparent black ribbon mark, consistent 5px stroke, simplified fold detail.
- `*-white.svg`: white versions for dark backgrounds.
- `ar-rounded-comparison.svg`: presentation only; both logo groups are individually editable and backgrounds are separate.

Main corner fillets use circular arcs of radius 10 at 400px artwork width. Short segments clamp the radius to prevent overlap. Radius scales with the artwork: at 40px wide, those 10px master corners become approximately 1px. These are real path curves, not a rounded rectangular crop or CSS border radius. In Figma they import as editable vector paths; baked arcs do not expose a single live Corner radius property of 10. Use vector editing for individual curves.

The outlined option remains detail-heavy at favicon sizes; the solid option is the stronger small-size starting point. These studies are based on supplied third-party references, not a claim of an original final identity.

Figma delivery verified: page **AR — Rounded masters**, comparison frame https://www.figma.com/design/o3lBiU5i0hx0Rva02tYbb1/Logo?node-id=4002-2. Both marks are component definitions with separate editable vector children; presentation tiles are outside the components. Original reference page retained.

## AYR exploration — draft 01

Requested variation: retain the left A, replace the upper letter with Y and lower letter with R, with heavier outlines and rounded corners. `ayr-draft-01.svg` is the transparent monochrome artwork; `ayr-draft-01-anatomy.svg` identifies A/Y/R in blue/orange/purple; `ayr-draft-01-board.svg` is the editable presentation. These are exploration files, not a replacement for the approved solid AR.

Figma page: **AYR — Draft 01**. Board: https://www.figma.com/design/o3lBiU5i0hx0Rva02tYbb1/Logo?node-id=4009-32. The monochrome master was verified as a component with editable letter paths. Figma displayed a reconnection/sync warning during creation; local SVGs are retained independently of cloud sync.

## Softer AR — draft v2

`ar-soft-v2.svg` and `ar-soft-v2-white.svg` are transparent editable vector drafts. `ar-soft-v2-comparison.html` compares the current approved mark and the draft at large and small sizes.

- Inset the silhouette edges by 3.5 master units. Nominal 35.3-unit bars become 28.3 units: approximately 20% thinner; diagonal widths and junctions vary.
- Increase A apex and outer left-foot radii to 24 units, with a 19-unit inner apex.
- Rebuild the R bowl with concentric semicircular outer/inner curves (49.441 and 21.147 radii), joined to the existing diagonal structure.
- Curves are baked into the path; transparent SVGs have no masking/background tricks.

The previously approved assets and intro remain unchanged pending draft review. Comparison preview visually checked at large, 48px, and 24px sizes. This draft has not been imported to Figma.

## Balanced AR — draft v3

`ar-balanced-v3.svg` / `ar-balanced-v3-white.svg` rebuild the monogram with editable centerline paths and a uniform 22-unit stroke, round caps, and round joins. This replaces uneven silhouette offsets with one shared nominal weight across A, R, and the connector. Intersections naturally appear heavier where strokes merge.

The A and R centerlines have matching top extrema at y=48 and baseline endpoints at y=198. The R bowl is reduced to a compact 36-unit-high-radius curve and moved down to match the A. Letter footprints are optically balanced, not identical rectangular bounding boxes (the interlocking connector belongs to both letters).

`ar-balanced-v3-comparison.html` compares v2 and v3, including 48px and 24px sizes. Previous drafts and the intro are untouched. Not yet imported to Figma. Stroke paths can be outlined later for production, after shape approval.

## Current selection

User selected **softer AR v2** (`ar-soft-v2.svg` / `ar-soft-v2-white.svg`) after reviewing v3. V3 is rejected: its uniform-stroke reconstruction changed the identity and removed the desired inner A curves. Ignore v3 for future logo work. Preserve v2's inner curves. The intro still embeds the earlier approved geometry and has not been changed in this selection-only step.
