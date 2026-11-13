# Portfolio

Redesign workspace on `feat/portfolio-redesign-v2`. The previous UI has been removed. The homepage has a rounded-panel refraction intro followed by a static dark version of the ayush.im hero on a white surrounding canvas. Project, note, and experience routes will be rebuilt with the new UI.

Design decisions, rejected approaches, and change history are recorded in [directions/](directions/README.md).

## Preserved content

- `src/content/`: original project records and notes.
- `src/data/`: experience, contact links, project metadata, image captions, and extracted UI copy in `site-copy.json`.
- `src/assets/`, `src/brand/`, and `public/`: portrait, project imagery, brand assets, and fonts.
- `src/content.config.ts` and `src/lib/`: content schema and helpers.

Dependencies and the lockfile are unchanged. Contact backend, Cloudflare configuration, and legacy redirect tooling remain available for the rebuild. Redirect destinations currently have no page templates.

## Development

```sh
pnpm dev
pnpm check
pnpm test
pnpm build
```

The redesign has not been deployed. The previous implementation remains in Git history.
