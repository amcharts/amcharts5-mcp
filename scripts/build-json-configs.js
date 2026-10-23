#!/usr/bin/env node

/**
 * Builds extended/examples/json-configs/: the JSON configs that ship in the
 * pinned @amcharts/amcharts5 devDependency (examples/<name>/config.json, made
 * by the library team), one markdown page each, so get_example, list_examples
 * and search serve real, valid configs (JsonParser, <am5-chart>, the framework
 * packages' `config` prop, Chart Maker links).
 *
 * Usage: node scripts/build-json-configs.js   (npm run build:json-configs)
 * Rerun after bumping @amcharts/amcharts5; the folder is replaced each time.
 */

import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { CDN } from "./am5-scripts.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PKG_DIR = join(ROOT, "node_modules", "@amcharts", "amcharts5");
const EXAMPLES = join(PKG_DIR, "examples");
const OUT = join(ROOT, "extended", "examples", "json-configs");

if (!existsSync(join(EXAMPLES, "examples.json"))) {
  console.error("ERROR: node_modules/@amcharts/amcharts5/examples/examples.json not found. Run npm install.");
  process.exit(1);
}
const version = JSON.parse(readFileSync(join(PKG_DIR, "package.json"), "utf8")).version;
const index = JSON.parse(readFileSync(join(EXAMPLES, "examples.json"), "utf8"));
const entries = (Array.isArray(index) ? index : index.examples || Object.values(index))
  .filter((e) => existsSync(join(EXAMPLES, e.name, "config.json")));

const CDN_DEPENDENCIES = { gantt: ["xy", "plugins/colorPicker"], stock: ["xy"], timeline: ["xy"] };

// am5geodata_region_usa_congressional120_flLow -> geodata/region/usa/congressional120/flLow.js
const geodataScript = (global) => `geodata/${global.slice("am5geodata_".length).split("_").join("/")}.js`;
const yamlString = (s) => `"${String(s).replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

for (const e of entries) {
  const raw = readFileSync(join(EXAMPLES, e.name, "config.json"), "utf8");
  const config = JSON.parse(raw); // throws on a broken config: better here than served
  const json = JSON.stringify(config, null, 2);

  // Scripts the page needs: the core, the JSON plugin, then the chart packages.
  // Themes are not part of a config; they are listed apart.
  const modules = e.modules || [];
  const scripts = ["index.js", "plugins/json.js"];
  for (const m of modules) {
    if (m.startsWith("themes/") || m.startsWith("geodata/")) continue;
    // On the CDN these packages need xy.js (and Gantt the color picker) loaded
    // first; through npm their import brings them, so examples.json doesn't
    // list them
    for (const dep of CDN_DEPENDENCIES[m] || []) {
      if (!scripts.includes(`${dep}.js`)) scripts.push(`${dep}.js`);
    }
    if (!scripts.includes(`${m}.js`)) scripts.push(`${m}.js`);
  }
  const geodata = [...new Set(json.match(/am5geodata_[A-Za-z0-9_]+/g) || [])];
  for (const g of geodata) scripts.push(geodataScript(g));
  const themes = modules.filter((m) => m.startsWith("themes/")).map((m) => m.slice("themes/".length));
  const relativeFiles = [...new Set((json.match(/"src":\s*"([^"]+)"/g) || [])
    .map((s) => s.replace(/^"src":\s*"|"$/g, ""))
    .filter((s) => !/^(https?:)?\/\//.test(s)))];

  const lines = [
    "---",
    `title: ${yamlString(`${e.title} (JSON config)`)}`,
    `category: "json-configs"`,
    `source: "@amcharts/amcharts5@${version}: examples/${e.name}/config.json"`,
    "---",
    "",
    `# ${e.title} (JSON config)`,
    "",
    e.description || "",
    "",
    `Chart family: ${e.category}${e.tags && e.tags.length ? ` · Tags: ${e.tags.join(", ")}` : ""}`,
    "",
    `A complete amCharts 5 JSON config, as shipped in the \`@amcharts/amcharts5\` npm package (examples/${e.name}/config.json, version ${version}). It works with \`am5plugins_json.JsonParser\`, the \`<am5-chart>\` element, the framework packages' \`config\` prop, and Chart Maker links. The rules for writing one are in the skill's JSON reference (get_chart_reference("json")).`,
    "",
  ];
  if (themes.length) {
    lines.push(`Themes are not part of a config. The example is meant for: ${themes.join(", ")}, set with \`root.setThemes()\`, the element's \`themes\` attribute, or a Chart Maker link's \`theme\`.`, "");
  }
  if (relativeFiles.length) {
    lines.push(`It loads files by relative path, which must be served beside the page: ${relativeFiles.map((f) => `\`${f}\``).join(", ")}.`, "");
  }
  lines.push("## Required resources", "");
  for (const s of scripts) lines.push(`- ${CDN}${s}`);
  for (const t of themes) lines.push(`- ${CDN}themes/${t}.js (theme, applied separately)`);
  lines.push("", "## JSON config", "", "```json", json, "```", "");

  writeFileSync(join(OUT, `${e.name}.md`), lines.join("\n"));
}

console.log(`Wrote ${entries.length} JSON configs to extended/examples/json-configs/ (@amcharts/amcharts5 ${version}).`);
