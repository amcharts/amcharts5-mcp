#!/usr/bin/env node
// Builds the tables docs-links.cjs uses, from the live docs.amcharts.com:
// - docs-moved.json: old paths the new site redirects, and where to;
// - docs-anchors.json: every old-style section anchor in the scanned files,
//   resolved against the page it now leads to:
//   - the new site's usual form, if the page has that id (no entry needed);
//   - else an id that matches ignoring case and punctuation ("Start_end_angles"
//     is "startend-angles" there; reference pages keep "maxDeviation_setting");
//   - else "" (the section is gone; the link opens the page).
// It scans our docs (extended/), the skill and the installed library's typings,
// plus any folders given as arguments (e.g. another repo). The files must
// still have the OLD links: run it before rewriting them.
// It also lists links to pages that don't exist on the new site; those need
// an entry in MOVED_BY_HAND in docs-links.cjs.
// Usage: node scripts/map-docs-anchors.cjs [extra folder ...]   (network)

const fs = require("fs");
const path = require("path");
const { OLD_DOCS_LINK, MOVED_BY_HAND, oldPath, usualAnchor } = require("./docs-links.cjs");

const ROOT = path.join(__dirname, "..");
const SKIP = new Set(["node_modules", ".git", ".claude", "evals", "dist", "content", ".wrangler", "plugin", "tmp"]);
const files = [];
function walk(dir, test) {
  if (!fs.existsSync(dir)) return;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP.has(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, test);
    else if (test(e.name)) files.push(p);
  }
}
const text = (n) => /\.(md|mdx|ts|js|mjs|cjs|json|html)$|^cursorrules$/.test(n);
walk(path.join(ROOT, "extended"), text);
walk(path.join(ROOT, "amcharts5-skill"), text);
(function typings(dir) {
  if (!fs.existsSync(dir)) return;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) typings(p); else if (e.name.endsWith(".d.ts")) files.push(p);
  }
})(path.join(ROOT, "node_modules/@amcharts/amcharts5/.internal"));
for (const extra of process.argv.slice(2)) walk(path.resolve(extra), text);

// old path -> the old anchors linked on it
const wanted = new Map();
for (const f of files) {
  for (const raw of fs.readFileSync(f, "utf8").match(OLD_DOCS_LINK) || []) {
    const link = raw.replace(/[.,;:!?]+$/, "").split("\\_").join("_");
    const m = /docs\/v5\/?([^#?]*)(?:\?[^#]*)?(?:#(.*))?$/.exec(link);
    const p = oldPath(m[1]);
    if (!wanted.has(p)) wanted.set(p, new Set());
    if (m[2]) { let a = m[2]; try { a = decodeURIComponent(a); } catch {} wanted.get(p).add(a); }
  }
}

const SITE = "https://docs.amcharts.com/v5/";
async function load(p) {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const r = await fetch(SITE + p);
      const final = r.url.startsWith(SITE) ? decodeURI(r.url.slice(SITE.length)) : p;
      if (r.status !== 200) return { status: r.status, final, ids: [] };
      const html = await r.text();
      return { status: 200, final, ids: [...new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((x) => x[1]))] };
    } catch (e) {
      if (attempt === 2) throw e;
      await new Promise((r) => setTimeout(r, 1000));
    }
  }
}

(async () => {
  const olds = [...wanted.keys()].sort();
  const pages = new Map(); // old path -> { status, final, ids }
  let next = 0;
  await Promise.all(Array.from({ length: 6 }, async () => {
    while (next < olds.length) {
      const old = olds[next++];
      const target = MOVED_BY_HAND[old];
      if (target && target.includes("#")) { pages.set(old, { status: "section", final: target, ids: [] }); continue; }
      pages.set(old, await load(target || old));
    }
  }));
  const alnum = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
  const moved = {};
  const anchors = {};
  const missing = [];
  let gone = 0;
  for (const old of olds) {
    const page = pages.get(old);
    if (page.status === "section") continue;
    if (page.status !== 200) { missing.push(old); continue; }
    const at = MOVED_BY_HAND[old] || old;
    if (page.final !== at) moved[old] = page.final;
    for (const a of [...wanted.get(old)].sort()) {
      if (page.ids.includes(usualAnchor(a))) continue; // the usual form is right: no entry needed
      const hit = page.ids.find((id) => alnum(id) === alnum(a));
      anchors[`${page.final}#${a}`] = hit || "";
      if (!hit) gone++;
    }
  }
  const sorted = (o) => Object.fromEntries(Object.entries(o).sort(([a], [b]) => a.localeCompare(b)));
  fs.writeFileSync(path.join(__dirname, "docs-moved.json"), JSON.stringify(sorted(moved), null, 1) + "\n");
  fs.writeFileSync(path.join(__dirname, "docs-anchors.json"), JSON.stringify(sorted(anchors), null, 1) + "\n");
  console.log(`${files.length} files, ${olds.length} pages; ${Object.keys(moved).length} redirected; ${Object.keys(anchors).length} anchors need a table entry (${gone} sections gone)`);
  const notRef = missing.filter((p) => !p.startsWith("reference/"));
  console.log(`pages not on docs.amcharts.com: ${missing.length} (${missing.length - notRef.length} reference pages); others: ${notRef.join(" ")}`);
})();
