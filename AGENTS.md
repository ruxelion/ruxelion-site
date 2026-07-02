# ruxelion-site — Claude guide

Marketing / org site for **ruxelion.com**. **Astro 5** static site, Tailwind v4,
bilingual (English default, French prefixed). Deployed to Cloudflare (`wrangler.toml`).

## Commands

```sh
npm run dev      # astro dev (hot-reload)
npm run build    # astro build → dist/
npm run preview  # astro preview (serve the build)
npm run check    # astro check (type / content validation)
```

## Structure

| Path | Role |
| --- | --- |
| `src/pages/` | Routes (`.astro`). English at root, French under `fr/`. |
| `src/layouts/` | Page layouts |
| `src/components/` | Reusable components |
| `src/i18n/` | Translation strings / helpers |
| `src/styles/` | Tailwind v4 entry & global CSS |
| `astro.config.mjs` | Site config: i18n (en/fr), sitemap, Tailwind, prefetch |
| `wrangler.toml` | Cloudflare deployment |

## Conventions

- i18n: `defaultLocale: 'en'` with `prefixDefaultLocale: false` — English URLs are
  unprefixed, French lives under `/fr/`. When adding a page, add **both** locales.
- `output: 'static'` — no SSR/runtime; everything renders at build time.
- No formatter is wired yet. Run `npm run check` before considering a change done.
- This is the **org** site (ruxelion.com). Product documentation lives in the separate
  `rs-grid-site` repo (rs-grid.com) — do not put API docs here.
- The `rs-grid` engine repo is **PRIVATE**. This marketing site is **PUBLIC**. Never
  reference private `rs-grid` repo paths, URLs, internal file names, or unreleased
  features in copy, commits, or generated output.
