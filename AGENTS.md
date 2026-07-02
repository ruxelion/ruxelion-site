# ruxelion-site — Claude guide

Marketing / org site for **ruxelion.com**. **Astro 5** static site, Tailwind v4,
bilingual (English default, French prefixed). Deployed to Cloudflare (`wrangler.toml`).

## Commands

```sh
npm run dev        # astro dev (hot-reload)
npm run build      # astro build → dist/
npm run preview    # astro preview (serve the build)
npm run check      # astro check (type / content validation)
npm run lint       # biome check . (formatting + lint, report-only)
npm run lint:fix   # biome check --write . (auto-fixes safe issues)
npm run check:i18n # src/pages/ vs src/pages/fr/ route-existence parity
```

CI (`.github/workflows/ci.yml`) runs check + lint + check:i18n + build on
every PR. The `.claude/hooks/typecheck.py` PostToolUse hook also runs
`biome check --write` on each edited `.ts`/`.tsx`/`.astro` file, blocking the
turn (exit 2) if real lint errors remain after the auto-fix.

## Before coding

<!-- keep in sync with the "Before coding" section in every other repo's AGENTS.md -->
**Plan before coding non-trivial changes.** For a change that touches more
than one file, alters shared layout/component structure, or isn't an obvious
one-liner, propose a short plan (approach, files touched, trade-offs) before
writing code — use Claude Code's Plan Mode rather than diving straight into
edits. Skip this for trivial fixes; planning every one-line change only adds
friction.

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
- Biome (`biome.json`) formats and lints `.ts`/`.astro`/`.mjs` files — 2-space
  indent, single quotes, no semicolons. Run `npm run check` (astro check) too
  before considering a change done — Biome's Astro support is experimental
  and doesn't catch type errors.
- `lint/correctness/noUnusedImports` and `noUnusedVariables` are **disabled
  for `.astro` files** (see `biome.json` → `overrides`): Biome's Astro parser
  doesn't yet track usage across the frontmatter/template boundary, so it
  false-flags every component import and `Astro.props` destructure that's
  only referenced in the template. Don't re-enable without verifying this
  has been fixed upstream.
- `TranslationKey`/`Translations` (from `src/i18n/en.ts`) must be re-exported
  from `src/i18n/utils.ts` (`export type { TranslationKey, Translations }`)
  — components import them from `utils.ts`, not `en.ts` directly.
- This is the **org** site (ruxelion.com). Product documentation lives in the separate
  `rs-grid-site` repo (rs-grid.com) — do not put API docs here.
- The `rs-grid` engine repo is **PRIVATE**. This marketing site is **PUBLIC**. Never
  reference private `rs-grid` repo paths, URLs, internal file names, or unreleased
  features in copy, commits, or generated output.
