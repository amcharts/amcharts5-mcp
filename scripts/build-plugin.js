#!/usr/bin/env node

/**
 * Builds plugin/, the amCharts plugin for Anthropic's plugin directory: the
 * amCharts 5 skill plus the hosted MCP server (https://mcp.amcharts.com/mcp).
 *
 * Usage:
 *   node scripts/build-plugin.js           write the generated files
 *   node scripts/build-plugin.js --check   exit 1 if any generated file is stale
 *
 * Generated (never edit them in plugin/, edit the sources):
 *   .claude-plugin/plugin.json   from package.json (version, description, ...)
 *   .mcp.json                    the hosted server
 *   skills/amcharts5/            SKILL.md and references/ from the
 *                                amcharts5-skill submodule
 *   LICENSE                      the repository's LICENSE
 * Handwritten: plugin/README.md and plugin/icon.png.
 *
 * The directory reads only real files in the plugin folder (no submodules or
 * symlinks), so the skill is copied. `npm test` runs --check, so a copy that
 * falls behind the submodule fails CI. plugin/ is not in package.json "files",
 * so the npm package never ships it.
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync, rmSync } from "fs";
import { join, dirname, relative } from "path";
import { fileURLToPath } from "url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PLUGIN = join(ROOT, "plugin");
const SKILL_SRC = join(ROOT, "amcharts5-skill", "amcharts5-skill");
const SKILL_DEST = join(PLUGIN, "skills", "amcharts5");
const check = process.argv.includes("--check");

const pkg = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8"));

if (!existsSync(join(SKILL_SRC, "SKILL.md"))) {
  console.error("ERROR: amcharts5-skill/amcharts5-skill/SKILL.md not found. Check out the submodule first:\n  git submodule update --init");
  process.exit(1);
}

// Every generated file: plugin-relative path -> contents. Sources are read
// with LF line endings, so a CRLF checkout still writes LF files.
const files = new Map();
const read = (path) => readFileSync(path, "utf8").replace(/\r\n/g, "\n");

files.set(".claude-plugin/plugin.json", JSON.stringify({
  name: "amcharts5",
  displayName: "amCharts 5",
  version: pkg.version,
  description: "Build charts and maps with amCharts 5: the amCharts 5 skill, and the hosted amCharts MCP server for docs, code examples and the API reference",
  author: { name: "amCharts", url: "https://www.amcharts.com" },
  homepage: "https://www.amcharts.com/docs/v5/ai/",
  repository: "https://github.com/amcharts/amcharts5-mcp",
  license: pkg.license,
  keywords: ["amcharts", "charts", "maps", "data-visualization", "javascript", "mcp"],
  icon: "./icon.png",
  documentationUrl: "https://www.amcharts.com/docs/v5/ai/",
  supportUrl: "https://github.com/amcharts/amcharts5-mcp/issues",
  privacyPolicyUrl: "https://www.amcharts.com/privacy-policy/",
  termsOfServiceUrl: "https://www.amcharts.com/terms-conditions/",
}, null, 2) + "\n");

files.set(".mcp.json", JSON.stringify({
  mcpServers: {
    amcharts5: { type: "http", url: "https://mcp.amcharts.com/mcp" },
  },
}, null, 2) + "\n");

files.set("LICENSE", read(join(ROOT, "LICENSE")));

files.set("skills/amcharts5/SKILL.md", read(join(SKILL_SRC, "SKILL.md")));
for (const name of readdirSync(join(SKILL_SRC, "references")).filter((f) => f.endsWith(".md")).sort()) {
  files.set(`skills/amcharts5/references/${name}`, read(join(SKILL_SRC, "references", name)));
}

// Files under skills/amcharts5 that the skill no longer has
function listFiles(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? listFiles(join(dir, e.name)) : [join(dir, e.name)]
  );
}
const extra = listFiles(SKILL_DEST)
  .map((f) => relative(PLUGIN, f).replace(/\\/g, "/"))
  .filter((rel) => !files.has(rel));

// Line endings don't count, so a CRLF checkout still passes --check
const same = (path, contents) =>
  existsSync(path) && readFileSync(path, "utf8").replace(/\r\n/g, "\n") === contents.replace(/\r\n/g, "\n");

if (check) {
  const stale = [...files].filter(([rel, contents]) => !same(join(PLUGIN, rel), contents)).map(([rel]) => rel);
  const missing = ["README.md", "icon.png"].filter((rel) => !existsSync(join(PLUGIN, rel)));
  if (stale.length || extra.length || missing.length) {
    console.error("plugin/ is out of date. Run: npm run build:plugin");
    for (const rel of stale) console.error(`  stale:   plugin/${rel}`);
    for (const rel of extra) console.error(`  extra:   plugin/${rel}`);
    for (const rel of missing) console.error(`  missing: plugin/${rel} (handwritten)`);
    process.exit(1);
  }
  console.log(`plugin/ is up to date (${files.size} generated files, version ${pkg.version}).`);
} else {
  for (const [rel, contents] of files) {
    const path = join(PLUGIN, rel);
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, contents);
  }
  for (const rel of extra) rmSync(join(PLUGIN, rel));
  console.log(`Wrote ${files.size} files to plugin/ (version ${pkg.version})${extra.length ? `, removed ${extra.length}` : ""}.`);
}
