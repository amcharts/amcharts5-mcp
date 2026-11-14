#!/usr/bin/env node
// Imports docs pages from docs.amcharts.com, which serves each page as Markdown
// (https://docs.amcharts.com/v5/<path>.md), into extended/<path>.md.
//
//   node scripts/import-docs-md.mjs <path> [<path> …]          report only
//   node scripts/import-docs-md.mjs --write <path> [<path> …]  write extended/
//
// Paths are the page paths below /v5/, e.g. charts/hierarchy/treemap or ai/mcp.
// Each page loses its "# Title" line and the "> summary" that repeats its first
// paragraph, gets front matter (title, source, scraped), and its old
// www.amcharts.com/docs links are rewritten by scripts/docs-links.cjs.
//
// extended/ pages can carry hand-added notes the live site lacks. Before
// writing, the report lists, per page, the lines that MCP commits added to the
// repo copy (not the first import, 94598cd) and whose words the new page lacks.
// Carry the ones that still hold over by hand after writing.

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { execFileSync } from "child_process";
import { createRequire } from "module";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const { rewriteDocsLinks } = createRequire(import.meta.url)("./docs-links.cjs");
const args = process.argv.slice(2);
const write = args.includes("--write");
const pages = args.filter((a) => !a.startsWith("--")).map((p) => p.replace(/^\/?(v5\/)?|\/$|\.md$/g, ""));
if (!pages.length) {
  console.error("Usage: node scripts/import-docs-md.mjs [--write] <path> [<path> …]");
  process.exit(1);
}
const today = new Date().toISOString().slice(0, 10);
const norm = (s) => s.toLowerCase().replace(/\\/g, "").replace(/[^a-z0-9.]+/g, " ");

for (const page of pages) {
  const res = await fetch(`https://docs.amcharts.com/v5/${page}.md`, { headers: { "User-Agent": "amcharts5-mcp docs import" } });
  if (!res.ok) { console.log(`!! ${page}: ${res.status}`); continue; }
  const lines = (await res.text()).replace(/\r\n/g, "\n").split("\n");
  const t = lines.findIndex((l) => l.startsWith("# "));
  const title = t === -1 ? page : lines[t].slice(2).trim();
  lines.splice(0, t + 1);
  while (lines.length && !lines[0].trim()) lines.shift();
  if (lines[0]?.startsWith("> ")) {
    const next = lines.slice(1).find((l) => l.trim());
    if (next && next.trim() === lines[0].slice(2).trim()) lines.shift();
  }
  while (lines.length && !lines[0].trim()) lines.shift();
  const body = rewriteDocsLinks(lines.join("\n").replace(/\n{3,}/g, "\n\n").trimEnd() + "\n");
  const out = `---\ntitle: ${JSON.stringify(title)}\nsource: "https://docs.amcharts.com/v5/${page}/"\nscraped: "${today}"\n---\n\n${body}`;

  // Lines MCP commits added to the repo copy that the new page doesn't cover
  const file = `extended/${page}.md`;
  const fresh = norm(out);
  const missing = [];
  if (existsSync(join(ROOT, file))) {
    const shas = execFileSync("git", ["-C", ROOT, "log", "--format=%h", "--", file], { encoding: "utf8" }).split("\n").filter(Boolean).filter((s) => s !== "94598cd");
    for (const sha of shas) {
      const diff = execFileSync("git", ["-C", ROOT, "show", "--format=", sha, "--", file], { encoding: "utf8", maxBuffer: 1e8 });
      for (const l of diff.split("\n")) {
        if (!l.startsWith("+") || l.startsWith("+++") || l.trim().length < 40) continue;
        const ws = [...new Set(norm(l.slice(1)).split(" ").filter((w) => w.length >= 6))];
        if (ws.length && ws.filter((w) => fresh.includes(w)).length / ws.length < 0.7) missing.push(`[${sha}] ${l.slice(1, 200)}`);
      }
    }
  }
  console.log(`\n== ${page}: ${out.length} chars; ${missing.length} added line(s) the new page may lack`);
  for (const m of [...new Set(missing)].slice(0, 20)) console.log("   " + m);
  if (write) {
    mkdirSync(dirname(join(ROOT, file)), { recursive: true });
    writeFileSync(join(ROOT, file), out);
  }
}
