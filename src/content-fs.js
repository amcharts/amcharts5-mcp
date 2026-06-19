// ---------------------------------------------------------------------------
// Node-only disk loader.
//
// Reads raw markdown off the filesystem into the { skillFiles, extendedFiles }
// shape consumed by buildContent(). Used by the stdio server (src/index.js) and
// by the Worker content build script (scripts/build-worker-content.js).
//
// NOTE: imports `fs` — must NOT be imported by the Worker bundle.
// ---------------------------------------------------------------------------

import { readFileSync, readdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { buildContent } from "./content.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

// Submodule path (local dev) or content/ fallback (npm install)
const SUBMODULE_DIR = join(ROOT, "amcharts5-skill", "amcharts5-skill");
const CONTENT_DIR = join(ROOT, "content");
const SKILL_DIR = existsSync(SUBMODULE_DIR) ? SUBMODULE_DIR : CONTENT_DIR;
const REFERENCES_DIR = existsSync(join(SKILL_DIR, "references"))
  ? join(SKILL_DIR, "references")
  : SKILL_DIR;
const EXTENDED_DIR = join(ROOT, "extended");

/**
 * Read all skill + extended markdown into the raw { skillFiles, extendedFiles }
 * shape that buildContent() expects.
 */
export function readRawFiles() {
  const skillFiles = {};
  const extendedFiles = {};

  // Core SKILL.md
  const skillPath = join(SKILL_DIR, "SKILL.md");
  if (existsSync(skillPath)) {
    skillFiles["SKILL"] = readFileSync(skillPath, "utf-8");
  }

  // Reference files (skip SKILL.md if it lives in the same dir as references)
  if (existsSync(REFERENCES_DIR)) {
    for (const file of readdirSync(REFERENCES_DIR)) {
      if (!file.endsWith(".md") || file === "SKILL.md") continue;
      skillFiles[file.replace(".md", "")] = readFileSync(join(REFERENCES_DIR, file), "utf-8");
    }
  }

  // Extended docs + examples (recursive)
  walkExtended(EXTENDED_DIR, "", extendedFiles);

  return { skillFiles, extendedFiles };
}

function walkExtended(dir, prefix, out) {
  if (!existsSync(dir)) return;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      walkExtended(fullPath, prefix ? `${prefix}/${entry.name}` : entry.name, out);
    } else if (entry.name.endsWith(".md")) {
      const key = prefix
        ? `${prefix}/${entry.name.replace(".md", "")}`
        : entry.name.replace(".md", "");
      out[key] = readFileSync(fullPath, "utf-8");
    }
  }
}

/** Read from disk and build the in-memory content structures. */
export function loadContentFromDisk() {
  return buildContent(readRawFiles());
}
