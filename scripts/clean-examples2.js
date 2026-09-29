#!/usr/bin/env node

/**
 * Cleans up example files: extracts code from the demoData JSON blob
 * and restructures into clean markdown.
 */

import fs from "fs/promises";
import { readdirSync, readFileSync } from "fs";
import path from "path";

const EXAMPLES_DIR = path.resolve("extended/examples");

const NAMED_ENTITIES = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ",
  rarr: "→", larr: "←", hellip: "…", mdash: "—", ndash: "–",
  lsquo: "‘", rsquo: "’", ldquo: "“", rdquo: "”", times: "×", deg: "°", copy: "©",
};

function stripHtml(html) {
  return html
    .replace(/<!-- .*? -->/gs, "")
    // Drop elements whose content is not prose (inline promo styling, icons)
    .replace(/<(style|script|svg)\b[\s\S]*?<\/\1>/gi, "")
    .replace(/<[^>]+>/g, "")
    // One pass, so "&amp;lt;" decodes to "&lt;", not "<"
    .replace(/&(#\d+|#x[0-9a-f]+|[a-z]+);/gi, (entity, name) => {
      if (name[0] === "#") {
        const code = name[1] === "x" || name[1] === "X" ? parseInt(name.slice(2), 16) : parseInt(name.slice(1), 10);
        return code <= 0x10ffff ? String.fromCodePoint(code) : entity;
      }
      return NAMED_ENTITIES[name.toLowerCase()] ?? entity;
    })
    // Indented lines would render as markdown code blocks
    .split("\n").map((line) => line.trim()).join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
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
    if (!fmMatch) { console.warn(`  No frontmatter, left raw: ${fullPath}`); unchanged++; continue; }
    const frontmatter = fmMatch[1];

    // Extract the JSON blob. A raw scrape also holds an indented copy of it in
    // the page text before ## JavaScript, which does not end in a column-0
    // "}"; read the one inside the JavaScript section.
    const jsAt = content.indexOf("## JavaScript");
    const jsonMatch = content.slice(Math.max(jsAt, 0)).match(/var demoData = (\{[\s\S]*?\n\})/);
    if (!jsonMatch) { console.warn(`  demoData not found, left raw: ${fullPath}`); unchanged++; continue; }

    // No "repair" on failure: rewriting the JSON text would also rewrite the
    // code strings inside it. A file left raw fails check-examples loudly.
    let data;
    try {
      data = JSON.parse(jsonMatch[1]);
    } catch {
      console.warn(`  demoData is not valid JSON, left raw: ${fullPath}`);
      unchanged++;
      continue;
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

    // Code. JSON.parse has already decoded the JSON string escapes, so the
    // code is used as-is: unescaping it again turns escapes inside the code
    // itself ("a\nb", "say \"hi\"") into raw line breaks and bare quotes,
    // and the JavaScript no longer parses.
    if (data.javascript) {
      parts.push("## JavaScript", "", "```javascript", data.javascript, "```", "");
    }

    // HTML
    if (data.html) {
      parts.push("## HTML", "", "```html", data.html, "```", "");
    }

    // CSS
    if (data.css) {
      parts.push("## CSS", "", "```css", data.css, "```", "");
    }

    // Resources (CDN links)
    if (data.resources && data.resources.length > 0) {
      parts.push("## Required resources", "");
      for (const r of data.resources) {
        parts.push(`- ${r}`);
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
