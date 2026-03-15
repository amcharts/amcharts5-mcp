#!/usr/bin/env node

/**
 * Cleans up scraped reference files:
 * 1. Removes sidebar navigation content
 * 2. Removes inherited settings/properties/methods/events (keeps only own members)
 * 3. Restructures into clean markdown
 */

import fs from "fs/promises";
import { readdirSync, readFileSync } from "fs";
import path from "path";

const REF_DIR = path.resolve("extended/reference");

async function cleanFile(filePath) {
  const raw = readFileSync(filePath, "utf-8");

  // Extract frontmatter
  const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!fmMatch) return { skipped: true };

  const fm = fmMatch[1];
  const body = fmMatch[2];

  // Extract title from frontmatter
  const titleMatch = fm.match(/title:\s*"(.+?)"/);
  const title = titleMatch ? titleMatch[1] : path.basename(filePath, ".md");

  // Find where the actual class content starts (after nav menu)
  // Look for the "Type class/interface/type/enum" pattern
  const typeMatch = body.match(/Type\s+(class|interface|type|enum)\s*\n/i);
  if (!typeMatch) {
    // Try alternate: look for "Sources" or the class name followed by "can be used"
    const srcMatch = body.match(/Sources\n/);
    if (!srcMatch) return { skipped: true };
  }

  // Find the class content start - look for "Type class" or the title appearing as a heading
  const lines = body.split("\n");
  let contentStart = 0;

  for (let i = 0; i < lines.length; i++) {
    if (/^\s*Type\s+(class|interface|type|enum)\s*$/i.test(lines[i])) {
      // Go back a few lines to catch the class name
      contentStart = Math.max(0, i - 3);
      break;
    }
  }

  const contentLines = lines.slice(contentStart);
  const content = contentLines.join("\n");

  // Extract key parts
  const classType = (content.match(/Type\s+(class|interface|type|enum)/i) || [])[1] || "class";
  const description = extractDescription(content);
  const imports = extractImports(content);
  const inheritance = extractInheritance(content, title);
  const ownSettings = extractOwnMembers(content, "Settings", title);
  const ownProperties = extractOwnMembers(content, "Properties", title);
  const ownMethods = extractOwnMembers(content, "Methods", title);
  const ownEvents = extractOwnMembers(content, "Events", title);

  // Build clean markdown
  const parts = [
    "---",
    `title: "${title}"`,
    `type: "${classType.toLowerCase()}"`,
    fm.match(/source:.+/) ? fm.match(/source:.+/)[0] : "",
    `scraped: "2026-03-15"`,
    "---",
    "",
    description,
    "",
  ];

  if (imports) {
    parts.push("## Import", "", imports, "");
  }

  if (inheritance) {
    parts.push("## Inheritance", "", inheritance, "");
  }

  if (ownSettings) {
    parts.push("## Settings", "", ownSettings, "");
  }

  if (ownProperties) {
    parts.push("## Properties", "", ownProperties, "");
  }

  if (ownMethods) {
    parts.push("## Methods", "", ownMethods, "");
  }

  if (ownEvents) {
    parts.push("## Events", "", ownEvents, "");
  }

  const cleaned = parts.filter(p => p !== undefined).join("\n").trim() + "\n";
  await fs.writeFile(filePath, cleaned, "utf-8");

  return {
    skipped: false,
    before: raw.length,
    after: cleaned.length,
    reduction: Math.round((1 - cleaned.length / raw.length) * 100),
  };
}

function extractDescription(content) {
  // Get the line after "Type class/interface/..."
  const match = content.match(/Type\s+(?:class|interface|type|enum)\s*\n(.+?)(?:\n(?:Click here|Sources|Inheritance))/s);
  if (match) return match[1].trim();

  const descMatch = content.match(/Type\s+(?:class|interface|type|enum)\s*\n(.+)/);
  return descMatch ? descMatch[1].trim().split("\n")[0] : "";
}

function extractImports(content) {
  const match = content.match(/\/\/ Import .+?\n.+?from\s+".+?"/);
  if (match) return "```javascript\n" + match[0] + "\n```";
  return "";
}

function extractInheritance(content, title) {
  const parts = [];
  const extendsMatch = content.match(new RegExp(title + "\\s+extends\\s+(.+?)\\.", "i"));
  if (extendsMatch) parts.push(`Extends: ${extendsMatch[1].trim()}`);

  const extendedByMatch = content.match(new RegExp(title + "\\s+is extended by\\s+(.+?)\\.", "i"));
  if (extendedByMatch) parts.push(`Extended by: ${extendedByMatch[1].trim()}`);

  return parts.join("\n");
}

function extractOwnMembers(content, sectionName, className) {
  // Find the section
  const sectionRegex = new RegExp(`^${sectionName}\\s*$`, "m");
  const sectionMatch = content.match(sectionRegex);
  if (!sectionMatch) return "";

  const startIdx = content.indexOf(sectionMatch[0]) + sectionMatch[0].length;

  // Find end of section (next major section heading)
  const nextSections = ["Settings", "Private settings", "Properties", "Methods", "Events", "Adapters"];
  let endIdx = content.length;
  for (const next of nextSections) {
    if (next === sectionName) continue;
    const nextRegex = new RegExp(`^${next}\\s*$`, "m");
    const nextMatch = content.slice(startIdx).match(nextRegex);
    if (nextMatch) {
      const idx = startIdx + nextMatch.index;
      if (idx < endIdx) endIdx = idx;
    }
  }

  const sectionContent = content.slice(startIdx, endIdx);

  // Parse entries - look for member name patterns
  const entries = [];
  const entryRegex = /\s{2,}(\w+)\s+#\s*\n\s*Type\s+(.+?)\s*\n((?:(?!Inherited from).)*?)(?:Inherited from (\S+)|(?=\s{2,}\w+\s+#))/gs;

  let match;
  while ((match = entryRegex.exec(sectionContent)) !== null) {
    const name = match[1];
    const type = match[2].trim();
    const desc = match[3].trim().split("\n").map(l => l.trim()).filter(Boolean).join(" ");
    const inheritedFrom = match[4];

    // Skip inherited members
    if (inheritedFrom && !inheritedFrom.includes(className)) {
      continue;
    }

    entries.push(`- **${name}** (\`${type}\`) — ${desc || "(no description)"}`);
  }

  // Fallback: simpler extraction without the regex
  if (entries.length === 0) {
    // Try to find entries that are NOT inherited
    const simpleLines = sectionContent.split("\n");
    let currentEntry = null;
    let currentType = "";
    let currentDesc = [];
    let isInherited = false;

    for (const line of simpleLines) {
      const trimmed = line.trim();

      // New entry
      const nameMatch = trimmed.match(/^(\w+)\s+#\s*$/);
      if (nameMatch) {
        // Save previous entry if it wasn't inherited
        if (currentEntry && !isInherited) {
          const desc = currentDesc.join(" ").trim();
          entries.push(`- **${currentEntry}**${currentType ? ` (\`${currentType}\`)` : ""} — ${desc || "(no description)"}`);
        }
        currentEntry = nameMatch[1];
        currentType = "";
        currentDesc = [];
        isInherited = false;
        continue;
      }

      if (!currentEntry) continue;

      const typeMatch = trimmed.match(/^Type\s+(.+)$/);
      if (typeMatch) {
        currentType = typeMatch[1];
        continue;
      }

      if (/^Inherited from\s/.test(trimmed)) {
        // Check if inherited from a parent (not self)
        if (!trimmed.includes(className) && !trimmed.includes(`I${className}Settings`)) {
          isInherited = true;
        }
        continue;
      }

      // Skip noise
      if (trimmed === "#" || trimmed === "" || /^Read about/.test(trimmed) || /^Set these/.test(trimmed)) continue;

      currentDesc.push(trimmed);
    }

    // Don't forget the last entry
    if (currentEntry && !isInherited) {
      const desc = currentDesc.join(" ").trim();
      entries.push(`- **${currentEntry}**${currentType ? ` (\`${currentType}\`)` : ""} — ${desc || "(no description)"}`);
    }
  }

  return entries.join("\n");
}

async function main() {
  const files = readdirSync(REF_DIR).filter(f => f.endsWith(".md"));
  console.log(`Cleaning ${files.length} reference files...`);
  console.log();

  let cleaned = 0;
  let skipped = 0;
  let totalBefore = 0;
  let totalAfter = 0;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const filePath = path.join(REF_DIR, file);

    try {
      const result = await cleanFile(filePath);
      if (result.skipped) {
        skipped++;
      } else {
        cleaned++;
        totalBefore += result.before;
        totalAfter += result.after;
      }

      if ((i + 1) % 100 === 0 || i === files.length - 1) {
        console.log(`[${i + 1}/${files.length}] Cleaned: ${cleaned}, Skipped: ${skipped}`);
      }
    } catch (err) {
      skipped++;
      console.error(`[${i + 1}/${files.length}] ERROR ${file}: ${err.message}`);
    }
  }

  console.log();
  console.log(`Done!`);
  console.log(`  Cleaned: ${cleaned}`);
  console.log(`  Skipped: ${skipped}`);
  console.log(`  Before: ${(totalBefore / 1024 / 1024).toFixed(1)} MB`);
  console.log(`  After: ${(totalAfter / 1024 / 1024).toFixed(1)} MB`);
  console.log(`  Reduction: ${Math.round((1 - totalAfter / totalBefore) * 100)}%`);
}

main().catch(err => {
  console.error("Fatal:", err);
  process.exit(1);
});
