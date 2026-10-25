#!/usr/bin/env node
// Builds scripts/docs-anchors.json for docs-links.cjs: every old-style section
// anchor in our docs, examples, skill and the installed library's typings,
// resolved against the live page on docs.amcharts.com.
// - the new site's usual form of the anchor, if the page has that id;
// - else an id that matches ignoring case and punctuation ("Start_end_angles"
//   is "startend-angles" there; reference pages keep "maxDeviation_setting");
// - else "" (the section is gone; the link opens the page).
// It also lists links to pages that don't exist on the new site.
// Usage: node scripts/map-docs-anchors.cjs   (network; about 1,000 page loads)

const fs = require("fs");
const path = require("path");
const { OLD_DOCS_LINK, newPath, usualAnchor } = require("./docs-links.cjs");

const ROOT = path.join(__dirname, "..");
const SKIP = new Set(["node_modules", ".git", ".claude", "evals", "dist", "content", ".wrangler", "plugin"]);
const files = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP.has(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.md$|^cursorrules$/.test(e.name)) files.push(p);
  }
})(path.join(ROOT, "extended"));
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === ".git") continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.md$|^cursorrules$/.test(e.name)) files.push(p);
  }
})(path.join(ROOT, "amcharts5-skill"));
const typings = path.join(ROOT, "node_modules/@amcharts/amcharts5/.internal");
(function walk(dir) {
  if (!fs.existsSync(dir)) return;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith(".d.ts")) files.push(p);
  }
})(typings);

// page path on the new site -> the old anchors linked on it
const wanted = new Map();
for (const f of files) {
  for (const raw of fs.readFileSync(f, "utf8").match(OLD_DOCS_LINK) || []) {
    const link = raw.replace(/[.,;:!?]+$/, "").split("\\_").join("_");
    const m = /docs\/v5\/?([^#?]*)(?:\?[^#]*)?(?:#(.*))?$/.exec(link);
    const p = newPath(m[1]);
    if (!wanted.has(p)) wanted.set(p, new Set());
    if (m[2]) { let a = m[2]; try { a = decodeURIComponent(a); } catch {} wanted.get(p).add(a); }
  }
}

async function ids(p) {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const r = await fetch("https://docs.amcharts.com/v5/" + p);
      if (r.status !== 200) return { status: r.status, ids: [] };
      const html = await r.text();
      return { status: 200, ids: [...new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((x) => x[1]))] };
    } catch (e) {
      if (attempt === 2) throw e;
      await new Promise((r) => setTimeout(r, 1000));
    }
  }
}

(async () => {
  const pages = [...wanted.keys()];
  const found = new Map();
  let next = 0;
  await Promise.all(Array.from({ length: 6 }, async () => {
    while (next < pages.length) { const p = pages[next++]; found.set(p, await ids(p)); }
  }));
  const alnum = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
  const table = {};
  const missing = [];
  let dropped = 0;
  for (const p of pages.sort()) {
    const page = found.get(p);
    if (page.status !== 200) { missing.push(p); continue; }
    for (const a of [...wanted.get(p)].sort()) {
      const usual = usualAnchor(a);
      if (page.ids.includes(usual)) continue; // the default form is right: no entry needed
      const hit = page.ids.find((id) => alnum(id) === alnum(a));
      table[`${p}#${a}`] = hit || "";
      if (!hit) dropped++;
    }
  }
  fs.writeFileSync(path.join(__dirname, "docs-anchors.json"), JSON.stringify(table, null, 1) + "\n");
  console.log(`${files.length} files, ${pages.length} pages; ${Object.keys(table).length} anchors need a table entry (${dropped} sections gone)`);
  console.log(`pages not on docs.amcharts.com (${missing.length}): ${missing.join(" ")}`);
})();
