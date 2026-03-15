#!/usr/bin/env node

/**
 * Final cleanup pass across all extended content:
 * 1. Remove empty reference files (only frontmatter, no content)
 * 2. Strip "See the Pen..." lines from docs
 * 3. Strip empty image refs [](url) from docs
 * 4. Strip "Posted in Uncategorized..." from reference files
 * 5. Remove @todo markers from reference files
 * 6. Convert [amb href="url"]text[/amb] to [text](url) in examples
 * 7. Fix venn-diagram.md missing closing brace
 */

import fs from "fs/promises";
import { readdirSync, readFileSync, existsSync, statSync } from "fs";
import path from "path";
import { unlinkSync } from "fs";

const EXTENDED_DIR = path.resolve("extended");

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

  // 2. Strip "See the Pen..." lines
  const seeThePenBefore = content;
  content = content.replace(/^.*See the Pen .+$/gm, "");
  if (content !== seeThePenBefore) stats.seeThePen++;

  // 3. Strip empty image references [](url)
  const emptyImgBefore = content;
  content = content.replace(/\[]\(https?:\/\/[^\)]+\)\s*/g, "");
  if (content !== emptyImgBefore) stats.emptyImages++;

  // 4. Strip "Posted in Uncategorized..." lines
  const postedBefore = content;
  content = content.replace(/^.*Posted in Uncategorized.*$/gm, "");
  if (content !== postedBefore) stats.postedIn++;

  // 5. Remove @todo markers
  const todoBefore = content;
  content = content.replace(/@todo\s+(needs description|requires description|review\s*)/gi, "");
  if (content !== todoBefore) stats.todoMarkers++;

  // 6. Convert [amb href="url"]text[/amb] to [text](url)
  const ambBefore = content;
  content = content.replace(/\[amb href="([^"]+)"\]([^\[]*)\[\/amb\]/g, "[$2]($1)");
  if (content !== ambBefore) stats.ambTags++;

  // 7. Clean up excessive blank lines (3+ -> 2)
  content = content.replace(/\n{4,}/g, "\n\n\n");

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
        require("fs").writeFileSync(fullPath, result, "utf-8");
      }
    }
  }
}

// Can't use require in ESM, so use writeFileSync from fs
import { writeFileSync } from "fs";

function walkDirFixed(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDirFixed(fullPath);
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
walkDirFixed(EXTENDED_DIR);

console.log("Results:");
console.log(`  Files scanned: ${stats.filesScanned}`);
console.log(`  Files modified: ${stats.filesModified}`);
console.log(`  Empty reference files removed: ${stats.emptyRemoved}`);
console.log(`  "See the Pen" lines stripped: ${stats.seeThePen} files`);
console.log(`  Empty image refs stripped: ${stats.emptyImages} files`);
console.log(`  "Posted in..." stripped: ${stats.postedIn} files`);
console.log(`  @todo markers removed: ${stats.todoMarkers} files`);
console.log(`  [amb] tags converted: ${stats.ambTags} files`);
