#!/usr/bin/env node

/**
 * Final cleanup pass across all extended content:
 * 1. Remove empty reference files (only frontmatter, no content)
 * 2. Strip "See the Pen..." lines from docs
 * 3. Strip empty image refs [](url) from docs
 * 4. Strip "Posted in Uncategorized..." from reference files
 * 5. Remove @todo markers from reference files
 * 6. Convert [amb href="url"]text[/amb] to [text](url) in examples
 * 7. Collapse runs of 3+ blank lines to 2
 * Steps 2-7 only touch prose: fenced code blocks are left exactly as they are.
 *
 * Usage: node scripts/clean-all.js [dir]
 *   dir defaults to extended/; pass extended/examples to clean only the
 *   examples (e.g. after re-scraping them) and leave docs/reference alone.
 */

import { readdirSync, readFileSync, writeFileSync, unlinkSync } from "fs";
import path from "path";

const EXTENDED_DIR = path.resolve("extended");
const ROOT_DIR = path.resolve(process.argv[2] || EXTENDED_DIR);

const stats = {
  emptyRemoved: 0,
  seeThePen: 0,
  emptyImages: 0,
  postedIn: 0,
  todoMarkers: 0,
  ambTags: 0,
  filesModified: 0,
  filesScanned: 0,
};

// [stats key, transform] for steps 2-7
const PROSE_STEPS = [
  ["seeThePen", (s) => s.replace(/^.*See the Pen .+$/gm, "")],
  // [ \t]*, not \s*: eating the newline would glue the next line (or fence) on
  ["emptyImages", (s) => s.replace(/\[]\(https?:\/\/[^\)]+\)[ \t]*/g, "")],
  ["postedIn", (s) => s.replace(/^.*Posted in Uncategorized.*$/gm, "")],
  ["todoMarkers", (s) => s.replace(/@todo\s+(needs description|requires description|review\s*)/gi, "")],
  ["ambTags", (s) => s.replace(/\[amb href="([^"]+)"\]([^\[]*)\[\/amb\]/g, "[$2]($1)")],
  [null, (s) => s.replace(/\n{4,}/g, "\n\n\n")],
];

// Splits content into prose and fenced code blocks (odd indices are code).
// A demo's code can hold any of the patterns below in a string or template
// literal, and must not be rewritten.
function splitFences(content) {
  return content.split(/(^[ \t]*```[^\n]*\n[\s\S]*?\n[ \t]*```[ \t]*\r?(?=\n|$))/m);
}

function processFile(filePath) {
  const original = readFileSync(filePath, "utf-8");
  let content = original;
  const relPath = path.relative(EXTENDED_DIR, filePath);

  // 1. Check for empty reference files (only frontmatter)
  if (relPath.startsWith("reference")) {
    const fmMatch = content.match(/^---\n[\s\S]*?\n---\n([\s\S]*)$/);
    if (fmMatch) {
      const body = fmMatch[1].trim();
      if (body.length < 10) {
        unlinkSync(filePath);
        stats.emptyRemoved++;
        return;
      }
    }
  }

  // 2-7, on the prose parts only
  const changed = new Set();
  content = splitFences(content)
    .map((part, i) => {
      if (i % 2) return part;
      for (const [key, fn] of PROSE_STEPS) {
        const before = part;
        part = fn(part);
        if (key && part !== before) changed.add(key);
      }
      return part;
    })
    .join("");
  for (const key of changed) stats[key]++;

  // Write back if changed
  if (content !== original) {
    stats.filesModified++;
    return content;
  }
  return null;
}

function walkDir(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath);
    } else if (entry.name.endsWith(".md")) {
      stats.filesScanned++;
      const result = processFile(fullPath);
      if (result !== null && result !== undefined) {
        writeFileSync(fullPath, result, "utf-8");
      }
    }
  }
}

console.log("Final cleanup pass...\n");
walkDir(ROOT_DIR);

console.log("Results:");
console.log(`  Files scanned: ${stats.filesScanned}`);
console.log(`  Files modified: ${stats.filesModified}`);
console.log(`  Empty reference files removed: ${stats.emptyRemoved}`);
console.log(`  "See the Pen" lines stripped: ${stats.seeThePen} files`);
console.log(`  Empty image refs stripped: ${stats.emptyImages} files`);
console.log(`  "Posted in..." stripped: ${stats.postedIn} files`);
console.log(`  @todo markers removed: ${stats.todoMarkers} files`);
console.log(`  [amb] tags converted: ${stats.ambTags} files`);
