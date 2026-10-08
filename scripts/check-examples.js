#!/usr/bin/env node

/**
 * Checks every example in extended/examples:
 * - it has a JavaScript block, and the block parses. Catches cleaning bugs that
 *   turn escapes inside the demo code into raw line breaks or bare quotes,
 *   which get_example would otherwise serve as code that throws a SyntaxError;
 * - it lists its required resources and holds no leftover `var demoData`
 *   blob, i.e. it went through the cleaning passes rather than shipping raw;
 * - the resources load every amCharts script the code uses (am5themes_X needs
 *   themes/X.js, and so on), or the example throws "X is not defined".
 *
 * Usage: node scripts/check-examples.js   (exits 1 on any failure)
 */

import { readdirSync, readFileSync } from "fs";
import path from "path";
import vm from "vm";
import { CDN, requiredScripts } from "./am5-scripts.js";

const EXAMPLES_DIR = path.resolve("extended/examples");

function walk(dir, out) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(fullPath, out);
    else if (entry.name.endsWith(".md")) out.push(fullPath);
  }
  return out;
}

const files = walk(EXAMPLES_DIR, []);
const failures = [];

for (const file of files) {
  const id = path.relative(EXAMPLES_DIR, file).split(path.sep).join("/").replace(/\.md$/, "");
  const md = readFileSync(file, "utf-8");

  if (md.includes("var demoData =")) failures.push(`${id}: raw scrape (demoData blob left in)`);
  if (!md.includes("## Required resources")) failures.push(`${id}: no "## Required resources" section`);

  const at = md.indexOf("## JavaScript");
  // The closing fence must start a line, as in any markdown code block
  const match = at === -1 ? null : /```javascript\r?\n([\s\S]*?)\r?\n```/.exec(md.slice(at));
  if (!match) {
    failures.push(`${id}: no JavaScript block`);
    continue;
  }
  try {
    new vm.Script(match[1], { filename: id });
  } catch (err) {
    failures.push(`${id}: ${err.message}`);
  }

  const resourcesAt = md.indexOf("## Required resources");
  const listed = resourcesAt === -1 ? "" : md.slice(resourcesAt);
  const missing = [...requiredScripts(match[1])].filter((file) => !listed.includes(CDN + file));
  if (missing.length) failures.push(`${id}: the code needs ${missing.join(", ")}, not in "## Required resources"`);
}

const failed = new Set(failures.map((f) => f.slice(0, f.indexOf(":")))).size;
console.log(`Examples: ${files.length} checked, ${failed} failed`);
for (const f of failures) console.log(`  ${f}`);
if (failures.length) process.exit(1);
