#!/usr/bin/env node

/**
 * Cleans up example files: extracts code from the demoData JSON blob
 * and restructures into clean markdown.
 */

import fs from "fs/promises";
import { readdirSync, readFileSync } from "fs";
import path from "path";

const EXAMPLES_DIR = path.resolve("extended/examples");

function stripHtml(html) {
  return html
    .replace(/<!-- .*? -->/gs, "")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function unescapeJson(str) {
  return str
    .replace(/\\\//g, "/")
    .replace(/\\r\\n/g, "\n")
    .replace(/\\r/g, "\n")
    .replace(/\\n/g, "\n")
    .replace(/\\t/g, "\t")
    .replace(/\\"/g, '"');
}

async function processDir(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  let cleaned = 0;
  let unchanged = 0;

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const sub = await processDir(fullPath);
      cleaned += sub.cleaned;
      unchanged += sub.unchanged;
      continue;
    }
    if (!entry.name.endsWith(".md")) continue;

    const content = readFileSync(fullPath, "utf-8");

    // Check if it has the demoData JSON pattern
    if (!content.includes("var demoData =")) {
      unchanged++;
      continue;
    }

    // Extract frontmatter
    const fmMatch = content.match(/^(---\n[\s\S]*?\n---)\n/);
    if (!fmMatch) { unchanged++; continue; }
    const frontmatter = fmMatch[1];

    // Extract the JSON blob
    const jsonMatch = content.match(/var demoData = (\{[\s\S]*?\n\})/);
    if (!jsonMatch) { unchanged++; continue; }

    let data;
    try {
      data = JSON.parse(jsonMatch[1]);
    } catch {
      // Try to fix common JSON issues
      try {
        // Sometimes there are trailing commas or other issues
        const fixed = jsonMatch[1].replace(/,\s*}/g, "}").replace(/,\s*]/g, "]");
        data = JSON.parse(fixed);
      } catch {
        unchanged++;
        continue;
      }
    }

    // Build clean markdown
    const parts = [frontmatter, ""];

    // Description
    if (data.description) {
      const desc = stripHtml(data.description);
      // Only include if it's actual description, not just "Related tutorials" links
      const meaningful = desc.split("\n").filter(l => l.trim() && !l.startsWith("Related tutorials")).join("\n").trim();
      if (meaningful.length > 20) {
        parts.push(meaningful, "");
      }
    }

    // JavaScript
    if (data.javascript) {
      const js = unescapeJson(data.javascript);
      parts.push("## JavaScript", "", "```javascript", js, "```", "");
    }

    // HTML
    if (data.html) {
      const html = unescapeJson(data.html);
      parts.push("## HTML", "", "```html", html, "```", "");
    }

    // CSS
    if (data.css) {
      const css = unescapeJson(data.css);
      parts.push("## CSS", "", "```css", css, "```", "");
    }

    // Resources (CDN links)
    if (data.resources && data.resources.length > 0) {
      parts.push("## Required resources", "");
      for (const r of data.resources) {
        parts.push(`- ${r.replace(/\\\//g, "/")}`);
      }
      parts.push("");
    }

    const result = parts.join("\n");
    await fs.writeFile(fullPath, result, "utf-8");
    cleaned++;
  }

  return { cleaned, unchanged };
}

async function main() {
  console.log("Cleaning example files (extracting from JSON)...");
  const result = await processDir(EXAMPLES_DIR);
  console.log(`Done! Cleaned: ${result.cleaned}, Unchanged: ${result.unchanged}`);

  // Check sizes
  let total = 0;
  const countFiles = (dir) => {
    let count = 0;
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      if (e.isDirectory()) count += countFiles(path.join(dir, e.name));
      else if (e.name.endsWith(".md")) {
        total += readFileSync(path.join(dir, e.name)).length;
        count++;
      }
    }
    return count;
  };
  const files = countFiles(EXAMPLES_DIR);
  console.log(`Total: ${files} files, ${(total / 1024 / 1024).toFixed(1)} MB`);
}

main().catch(err => { console.error("Fatal:", err); process.exit(1); });
