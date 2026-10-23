#!/usr/bin/env node

/**
 * Builds the amCharts plugin for OpenAI's plugin directory (ChatGPT, Codex),
 * in the portable Agent Plugins format, as a folder and a ZIP to upload:
 *
 *   dist/openai-plugin/                 the package (dist/ is gitignored)
 *   dist/openai-plugin-<version>.zip    the same files, for the upload
 *
 * Usage: node scripts/build-openai-plugin.js [--skip-url-check] [--listing=<file>] [--committed-skill]
 *
 * Package contents (all at the ZIP root):
 *   plugin.json   portable manifest; extensions["com.openai"].interface is the
 *                 listing, from scripts/openai-listing.json
 *   mcp.json      the hosted server, https://mcp.amcharts.com/mcp
 *   skills/amcharts5/  SKILL.md and references/ from the amcharts5-skill submodule
 *   assets/icon.png    logo and composer icon (the 558x558 amCharts tile)
 *   README.md, LICENSE the same as the Claude plugin's (plugin/)
 * No Claude-specific files (.claude-plugin/, .mcp.json), hooks or apps.
 *
 * The script fails if a listing field breaks OpenAI's limits, or (unless
 * --skip-url-check) a listing URL doesn't answer 200.
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync, rmSync, statSync } from "fs";
import { join, dirname, relative } from "path";
import { fileURLToPath } from "url";
import { deflateRawSync, crc32 } from "zlib";
import { execFileSync } from "child_process";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SKILL_SRC = join(ROOT, "amcharts5-skill", "amcharts5-skill");
const OUT = join(ROOT, "dist", "openai-plugin");

const pkg = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8"));
// --listing=<file> reads another listing file (for testing the checks)
const listingArg = process.argv.find((a) => a.startsWith("--listing="));
const listingPath = listingArg ? listingArg.slice("--listing=".length) : join(ROOT, "scripts", "openai-listing.json");
const listing = JSON.parse(readFileSync(listingPath, "utf8"));

// --- Listing limits (developers.openai.com/plugins/deploy/submission) ---
const problems = [];
const maxLen = (field, value, max) => {
  if (typeof value !== "string" || !value.trim()) problems.push(`${field} is required`);
  else if (value.length > max) problems.push(`${field} is ${value.length} characters (max ${max}): "${value}"`);
};
// "review" and "publication" go beside "interface" in extensions["com.openai"];
// every other key in the listing file is an interface field.
const { review, publication, ...ui } = listing;
maxLen("displayName", listing.displayName, 30);
maxLen("shortDescription", listing.shortDescription, 30);
maxLen("developerName", listing.developerName, 80);
maxLen("longDescription", listing.longDescription, 4000);
maxLen("category", listing.category, 100);
if (!Array.isArray(listing.capabilities) || listing.capabilities.length > 20) problems.push("capabilities: at most 20");
(listing.capabilities || []).forEach((c, i) => maxLen(`capabilities[${i}]`, c, 120));
if (!Array.isArray(listing.defaultPrompt) || listing.defaultPrompt.length > 3) problems.push("defaultPrompt: at most 3");
(listing.defaultPrompt || []).forEach((p, i) => maxLen(`defaultPrompt[${i}]`, p, 128));
const urls = ["websiteURL", "supportURL", "privacyPolicyURL", "termsOfServiceURL"];
for (const key of urls) {
  if (!/^https:\/\/[^@\s]+$/.test(listing[key] || "")) problems.push(`${key} must be an https URL without credentials`);
}
if (!process.argv.includes("--skip-url-check")) {
  for (const key of urls) {
    try {
      const res = await fetch(listing[key], { redirect: "manual" });
      if (res.status !== 200) problems.push(`${key} ${listing[key]} answers ${res.status}`);
    } catch (e) {
      problems.push(`${key} ${listing[key]} failed: ${e.message}`);
    }
  }
}
// Review cases, when the package carries them (else they're entered in the
// dashboard): initial MCP review needs exactly 5 positive and 3 negative.
if (review?.test_cases) {
  const { positive = [], negative = [] } = review.test_cases;
  if (positive.length !== 5 || negative.length !== 3) problems.push(`review.test_cases: ${positive.length} positive and ${negative.length} negative (initial review needs 5 and 3)`);
  positive.forEach((c, i) => {
    for (const key of ["description", "prompt", "tools_triggered", "expected_behavior"]) {
      if (!c[key]) problems.push(`review.test_cases.positive[${i}].${key} is required`);
    }
  });
  negative.forEach((c, i) => {
    for (const key of ["description", "prompt"]) {
      if (!c[key]) problems.push(`review.test_cases.negative[${i}].${key} is required`);
    }
  });
}
// The demo video is required to submit for review, not to upload: warn only.
// Leave the key out until there is a link (an empty string would clear a
// value saved in the dashboard).
const warnings = [];
if (review && !review.demo_recording_url) {
  warnings.push("Missing demo URL: review.demo_recording_url is not set. The upload works, but submitting for review needs it. Add it to the listing and rebuild.");
} else if (review?.demo_recording_url && !/^https:\/\//.test(review.demo_recording_url)) {
  problems.push("review.demo_recording_url must be an https URL");
}
if (problems.length) {
  console.error(`Listing problems (${relative(ROOT, listingPath)}):\n  ` + problems.join("\n  "));
  process.exit(1);
}

// --- Package files: path in the package -> contents ---
const files = new Map();
const text = (path) => readFileSync(path, "utf8").replace(/\r\n/g, "\n");
const ICON = "./assets/icon.png";

files.set("plugin.json", JSON.stringify({
  $schema: "https://agent-plugins.org/schemas/1.0.0/plugin.schema.json",
  name: "amcharts5",
  version: pkg.version,
  description: "Build charts and maps with amCharts 5: the amCharts 5 skill, and the hosted amCharts MCP server for docs, code examples and the API reference",
  author: { name: "amCharts", url: "https://www.amcharts.com" },
  homepage: "https://www.amcharts.com/docs/v5/ai/",
  repository: "https://github.com/amcharts/amcharts5-mcp",
  license: pkg.license,
  keywords: ["amcharts", "charts", "maps", "data-visualization", "javascript", "mcp"],
  extensions: {
    "com.openai": {
      interface: { ...ui, logo: ICON, composerIcon: ICON },
      ...(review ? { review } : {}),
      ...(publication ? { publication } : {}),
    },
  },
}, null, 2) + "\n");

files.set("mcp.json", JSON.stringify({
  $schema: "https://agent-plugins.org/schemas/1.0.0/mcp.schema.json",
  mcpServers: {
    amcharts5: { type: "streamable-http", url: "https://mcp.amcharts.com/mcp" },
  },
}, null, 2) + "\n");

// --committed-skill takes the skill from the submodule's last commit, leaving
// out unfinished, uncommitted work in it
if (process.argv.includes("--committed-skill")) {
  const git = (...args) => execFileSync("git", ["-C", join(ROOT, "amcharts5-skill"), ...args], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
  const prefix = "amcharts5-skill/";
  const tracked = git("ls-tree", "-r", "--name-only", "HEAD", prefix).split("\n")
    .filter((p) => p === `${prefix}SKILL.md` || /^amcharts5-skill\/references\/[^/]+\.md$/.test(p))
    .sort();
  for (const p of tracked) {
    files.set(`skills/amcharts5/${p.slice(prefix.length)}`, git("show", `HEAD:${p}`).replace(/\r\n/g, "\n"));
  }
} else {
  files.set("skills/amcharts5/SKILL.md", text(join(SKILL_SRC, "SKILL.md")));
  for (const name of readdirSync(join(SKILL_SRC, "references")).filter((f) => f.endsWith(".md")).sort()) {
    files.set(`skills/amcharts5/references/${name}`, text(join(SKILL_SRC, "references", name)));
  }
}
files.set("README.md", text(join(ROOT, "plugin", "README.md")));
files.set("LICENSE", text(join(ROOT, "LICENSE")));
files.set("assets/icon.png", readFileSync(join(ROOT, "plugin", "icon.png")));

// --- Write the folder ---
rmSync(OUT, { recursive: true, force: true });
for (const [rel, contents] of files) {
  const path = join(OUT, rel);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, contents);
}

// --- Write the ZIP (deflate; no dependencies) ---
function zip(entries) {
  const local = [];
  const central = [];
  let offset = 0;
  // 1 January 2026, 00:00 (DOS date and time), so the same input gives the same ZIP
  const dosTime = 0, dosDate = ((2026 - 1980) << 9) | (1 << 5) | 1;
  for (const [name, contents] of entries) {
    const data = Buffer.isBuffer(contents) ? contents : Buffer.from(contents, "utf8");
    const packed = deflateRawSync(data, { level: 9 });
    const nameBuf = Buffer.from(name, "utf8");
    const crc = crc32(data);
    const header = Buffer.alloc(30);
    header.writeUInt32LE(0x04034b50, 0);
    header.writeUInt16LE(20, 4);        // version needed
    header.writeUInt16LE(0x0800, 6);    // UTF-8 names
    header.writeUInt16LE(8, 8);         // deflate
    header.writeUInt16LE(dosTime, 10);
    header.writeUInt16LE(dosDate, 12);
    header.writeUInt32LE(crc, 14);
    header.writeUInt32LE(packed.length, 18);
    header.writeUInt32LE(data.length, 22);
    header.writeUInt16LE(nameBuf.length, 26);
    header.writeUInt16LE(0, 28);
    local.push(header, nameBuf, packed);
    const entry = Buffer.alloc(46);
    entry.writeUInt32LE(0x02014b50, 0);
    entry.writeUInt16LE(20, 4);         // version made by
    entry.writeUInt16LE(20, 6);         // version needed
    entry.writeUInt16LE(0x0800, 8);
    entry.writeUInt16LE(8, 10);
    entry.writeUInt16LE(dosTime, 12);
    entry.writeUInt16LE(dosDate, 14);
    entry.writeUInt32LE(crc, 16);
    entry.writeUInt32LE(packed.length, 20);
    entry.writeUInt32LE(data.length, 24);
    entry.writeUInt16LE(nameBuf.length, 28);
    entry.writeUInt32LE(offset, 42);    // other fields stay 0
    central.push(entry, nameBuf);
    offset += header.length + nameBuf.length + packed.length;
  }
  const centralBuf = Buffer.concat(central);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(entries.length, 8);
  end.writeUInt16LE(entries.length, 10);
  end.writeUInt32LE(centralBuf.length, 12);
  end.writeUInt32LE(offset, 16);
  return Buffer.concat([...local, centralBuf, end]);
}

const zipPath = join(ROOT, "dist", `openai-plugin-${pkg.version}.zip`);
writeFileSync(zipPath, zip([...files].sort(([a], [b]) => a.localeCompare(b))));
console.log(`Wrote ${relative(ROOT, OUT)}/ (${files.size} files) and ${relative(ROOT, zipPath)} (${(statSync(zipPath).size / 1024).toFixed(0)} KiB), version ${pkg.version}.`);
for (const w of warnings) console.warn(`WARNING: ${w}`);
