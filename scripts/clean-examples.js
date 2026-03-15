#!/usr/bin/env node

/**
 * Cleans up scraped example files:
 * Removes duplicated code that appears before the ## JavaScript section.
 */

import fs from "fs/promises";
import { readdirSync, readFileSync } from "fs";
import path from "path";

const EXAMPLES_DIR = path.resolve("extended/examples");

async function processDir(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  let cleaned = 0;
  let unchanged = 0;
  let totalBefore = 0;
  let totalAfter = 0;

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const sub = await processDir(fullPath);
      cleaned += sub.cleaned;
      unchanged += sub.unchanged;
      totalBefore += sub.totalBefore;
      totalAfter += sub.totalAfter;
    } else if (entry.name.endsWith(".md")) {
      const content = readFileSync(fullPath, "utf-8");
      totalBefore += content.length;

      // Extract frontmatter
      const fmMatch = content.match(/^(---\n[\s\S]*?\n---\n)([\s\S]*)$/);
      if (!fmMatch) {
        unchanged++;
        totalAfter += content.length;
        continue;
      }

      const frontmatter = fmMatch[1];
      const body = fmMatch[2];

      // Find ## JavaScript section
      const jsIdx = body.indexOf("## JavaScript");
      if (jsIdx === -1) {
        // No JavaScript section - keep as-is
        unchanged++;
        totalAfter += content.length;
        continue;
      }

      // Check if there's substantial content before ## JavaScript that looks like code
      const beforeJs = body.slice(0, jsIdx).trim();
      if (beforeJs.length < 50 || !beforeJs.includes("am5")) {
        // Description is short or doesn't look like code duplication
        unchanged++;
        totalAfter += content.length;
        continue;
      }

      // Strip the duplicated content, keep only from ## JavaScript onward
      const cleaned_content = frontmatter + "\n" + body.slice(jsIdx);
      await fs.writeFile(fullPath, cleaned_content, "utf-8");
      cleaned++;
      totalAfter += cleaned_content.length;
    }
  }

  return { cleaned, unchanged, totalBefore, totalAfter };
}

async function main() {
  console.log("Cleaning example files...");
  const result = await processDir(EXAMPLES_DIR);
  console.log();
  console.log(`Done!`);
  console.log(`  Cleaned: ${result.cleaned}`);
  console.log(`  Unchanged: ${result.unchanged}`);
  console.log(`  Before: ${(result.totalBefore / 1024 / 1024).toFixed(1)} MB`);
  console.log(`  After: ${(result.totalAfter / 1024 / 1024).toFixed(1)} MB`);
  console.log(`  Reduction: ${Math.round((1 - result.totalAfter / result.totalBefore) * 100)}%`);
}

main().catch(err => {
  console.error("Fatal:", err);
  process.exit(1);
});
