#!/usr/bin/env node
// Mechanical i18n parity check: every route under src/pages/ (excluding
// fr/ itself) must have a counterpart under src/pages/fr/, and vice versa.
// This only checks existence, not translation freshness/content — see
// AGENTS.md's "when adding a page, add both locales" rule.
//
// EXCLUDED: conventional special routes that intentionally have no
// per-locale variant (Astro serves these locale-agnostically).
const EXCLUDED = new Set(["404.astro", "500.astro"]);

import { readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const PAGES_DIR = join(ROOT, "src", "pages");
const FR_DIR = join(PAGES_DIR, "fr");

function walk(dir, skipDirNames = new Set()) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (skipDirNames.has(entry.name)) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full, skipDirNames));
    else out.push(relative(dir, full).split("\\").join("/"));
  }
  return out;
}

const en = new Set(walk(PAGES_DIR, new Set(["fr"])).filter((p) => !EXCLUDED.has(p)));
const fr = new Set(walk(FR_DIR));

const missingInFr = [...en].filter((p) => !fr.has(p)).sort();
const missingInEn = [...fr].filter((p) => !en.has(p)).sort();

if (missingInFr.length === 0 && missingInEn.length === 0) {
  console.log(`i18n parity OK — ${en.size} pages in both locales.`);
  process.exit(0);
}

if (missingInFr.length) {
  console.error("Missing in src/pages/fr/:");
  for (const p of missingInFr) console.error(`  - ${p}`);
}
if (missingInEn.length) {
  console.error("Missing in src/pages/ (root locale):");
  for (const p of missingInEn) console.error(`  - ${p}`);
}
process.exit(1);
