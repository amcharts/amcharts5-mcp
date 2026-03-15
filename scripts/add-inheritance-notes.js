#!/usr/bin/env node

/**
 * Adds inheritance guidance notes to reference files.
 * Tells AI to look up parent classes for inherited settings/properties/methods/events.
 */

import { readdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";

const REF_DIR = path.resolve("extended/reference");

let modified = 0;
let skipped = 0;

const files = readdirSync(REF_DIR).filter(f => f.endsWith(".md"));

for (const file of files) {
  const filePath = path.join(REF_DIR, file);
  const content = readFileSync(filePath, "utf-8");

  // Find the Extends line
  const extendsMatch = content.match(/^Extends:\s+(.+)$/m);
  if (!extendsMatch) {
    skipped++;
    continue;
  }

  // Already has a guidance note?
  if (content.includes("also inherits all settings")) {
    skipped++;
    continue;
  }

  const parentClass = extendsMatch[1].trim();

  // Build the full inheritance chain note
  const note = `\n> **Note:** This class also inherits all settings, properties, methods, and events from ${parentClass} (and its ancestors). Use \`get_doc\` or \`get_core_reference\` with the parent class name to see inherited members.`;

  // Insert after the Extends line (and optional "Extended by" line)
  const inheritanceSection = content.match(/## Inheritance\n\n(Extends:.*\n(?:Extended by:.*\n)?)/);
  if (!inheritanceSection) {
    skipped++;
    continue;
  }

  const oldBlock = inheritanceSection[0];
  const newBlock = oldBlock.trimEnd() + "\n" + note + "\n";

  const updated = content.replace(oldBlock, newBlock);
  writeFileSync(filePath, updated, "utf-8");
  modified++;
}

console.log(`Done! Modified: ${modified}, Skipped: ${skipped}`);
