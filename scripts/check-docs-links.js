#!/usr/bin/env node

/**
 * The amCharts docs moved to docs.amcharts.com (October 2026). Fails if a link
 * to the old address (www.amcharts.com/docs/v5/...) is in the served content
 * (extended/, the skill) or the plugins' metadata, e.g. after a re-scrape or an
 * edit. scripts/docs-links.cjs rewrites them: `rewriteDocsLinks(text)`.
 *
 * Usage: node scripts/check-docs-links.js   (exits 1 on any old link)
 */

import { readdirSync, readFileSync } from "fs";
import path from "path";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const { OLD_DOCS_LINK } = require("./docs-links.cjs");

const files = [];
function walk(dir, test) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.name === ".git" || e.name === "node_modules") continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, test);
    else if (test(e.name)) files.push(p);
  }
}
walk("extended", (n) => n.endsWith(".md"));
walk("amcharts5-skill", (n) => n.endsWith(".md") || n === "cursorrules");
walk("plugin", (n) => /\.(md|json)$/.test(n));
files.push("README.md", "server.json", "scripts/openai-listing.json", "scripts/build-plugin.js", "scripts/build-openai-plugin.js");

const found = [];
for (const f of files) {
  const m = readFileSync(f, "utf8").match(OLD_DOCS_LINK);
  if (m) found.push(`${f.split(path.sep).join("/")}: ${m.length} (e.g. ${m[0]})`);
}
if (found.length) {
  console.error(`Old docs links (www.amcharts.com/docs) in ${found.length} file(s):\n  ${found.slice(0, 20).join("\n  ")}`);
  process.exit(1);
}
console.log(`Docs links: ${files.length} files checked, none to the old address.`);
