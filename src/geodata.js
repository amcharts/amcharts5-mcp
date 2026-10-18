// ---------------------------------------------------------------------------
// list_geodata: find amCharts 5 geodata (map) files by name, country, region
// or pack, and print how to load each one.
//
// Pure logic (no filesystem), so the Worker bundles it as-is. The index is
// extended/geodata/index.json, generated from the pinned
// @amcharts/amcharts5-geodata package by scripts/generate-geodata-index.cjs.
// Each entry stores its path under geodata/ without the detail suffix; the CDN
// path, script global and ES import are derived here by the package's rule.
// ---------------------------------------------------------------------------

const MAX_LISTED = 25;

// User text echoed back in a reply, capped so a huge query can't balloon it
const echo = (s) => { s = String(s ?? ""); return s.length > 200 ? s.slice(0, 200) + "…" : s; };
const GROUP_ORDER = ["world", "continents", "countries", "regions", "data", "lang"];

export const geodataCdnPath = (e, variant = "") => `geodata/${e.path}${variant}.js`;
export const geodataGlobal = (e, variant = "") => `am5geodata_${e.path.replace(/\//g, "_")}${variant}`;
export const geodataImport = (e, variant = "") => `@amcharts/amcharts5-geodata/${e.path}${variant}`;

const HUMP_RE = /[A-Z]+(?![a-z])|[A-Z]?[a-z]+|[0-9]+/g;

/** Words an entry answers to: path parts and their camelCase humps, codes, variants, label words. */
function entryWords(e, packNote) {
  const words = new Set();
  const add = (text) => {
    for (const w of String(text).split(/[^A-Za-z0-9]+/)) {
      if (!w) continue;
      words.add(w.toLowerCase());
      for (const h of w.match(HUMP_RE) || []) words.add(h.toLowerCase());
    }
  };
  add(e.path);
  add(e.label);
  add(e.group);
  for (const c of e.codes || []) add(c);
  for (const v of e.variants || []) add(v);
  if (packNote) add(packNote);
  return words;
}

/**
 * Normalise one filter word: "geodata/region/usa/congressional120/usaCongressionalLow.js"
 * and "am5geodata_region_usa_congressional120_usaCongressionalLow" both become
 * "region/usa/congressional120/usacongressional".
 */
function normalizeWord(word) {
  let w = word.toLowerCase().replace(/\.js$/, "").replace(/^\/+|\/+$/g, "");
  w = w.replace(/^https?:\/\/cdn\.amcharts\.com\/lib\/5\//, "").replace(/^geodata\//, "")
    .replace(/^@amcharts\/amcharts5-geodata\//, "");
  if (w.startsWith("am5geodata_")) w = w.slice("am5geodata_".length).replace(/_/g, "/");
  // A specific file name means its map: drop the detail suffix.
  if (/[a-z0-9](low|high|ultra)$/.test(w) && w.length > 6) w = w.replace(/(low|high|ultra)$/, "");
  return w;
}

function matches(e, packNote, words) {
  const hay = [e.path, e.label, e.group, ...(e.codes || []), ...(e.variants || []), packNote || ""]
    .join(" ").toLowerCase();
  let entrySet = null;
  return words.every((w) => {
    // Short words ("ca", "us", "116") must be a whole word: a state or ISO
    // code, a pack number. Longer ones may be part of one ("congress").
    if (w.length <= 3 && !w.includes("/")) {
      entrySet = entrySet || entryWords(e, packNote);
      return entrySet.has(w);
    }
    return hay.includes(w);
  });
}

function formatEntry(e) {
  const v = e.variants ? e.variants[0] : "";
  const facts = [
    e.codes ? `ISO ${e.codes.join(", ")}` : null,
    e.areas != null ? `${e.areas} area${e.areas === 1 ? "" : "s"}` : null,
    e.variants ? e.variants.join(" / ") : null,
  ].filter(Boolean).join(" · ");
  let text = `- **${e.path}** — ${e.label}${facts ? ` (${facts})` : ""}\n`;
  text += `  CDN \`${geodataCdnPath(e, v)}\` · global \`${geodataGlobal(e, v)}\` · ESM \`${geodataImport(e, v)}\`\n`;
  if (e.added) text += `  Added in ${e.added}\n`;
  return text;
}

function header(index) {
  return `Package \`${index.package}\` ${index.version} · CDN base ${index.cdnBase}\n` +
    `Names below are for the first detail level listed (usually Low, the smallest); for High or Ultra, swap the suffix in all three. ` +
    `A \`<script>\` from the CDN defines the global; with npm, \`import am5geodata_x from "<ESM path>"\`.\n\n`;
}

function overview(index) {
  const byGroup = new Map(GROUP_ORDER.map((g) => [g, []]));
  for (const e of index.maps) byGroup.get(e.group)?.push(e);
  let text = `# amCharts 5 geodata — ${index.maps.length} maps and data files\n\n` + header(index);
  const names = (list) => list.map((e) => e.path.split("/").pop()).join(", ");
  text += `## world (${byGroup.get("world").length})\n${names(byGroup.get("world"))}\n\n`;
  text += `## continents (${byGroup.get("continents").length})\n${byGroup.get("continents").map((e) => e.path).join(", ")}\n\n`;
  text += `## countries (${byGroup.get("countries").length})\nOne or more maps per country (e.g. france, franceDepartments, franceDepartments2). Filter by country name or ISO code.\n\n`;
  const regions = byGroup.get("regions");
  const folders = new Map();
  for (const e of regions) {
    const dir = e.path.split("/").slice(0, -1).join("/");
    folders.set(dir, (folders.get(dir) || 0) + 1);
  }
  text += `## regions (${regions.length})\n`;
  for (const [dir, count] of folders) {
    const pack = index.packs?.[dir];
    text += `- ${dir}/ (${count})${pack ? ` — ${pack.note}` : ""}\n`;
  }
  text += `\n## data (${byGroup.get("data").length})\n${byGroup.get("data").map((e) => `${e.path} — ${e.label}`).join("\n")}\n\n`;
  text += `## lang (${byGroup.get("lang").length})\nCountry-name translations: lang/<code> (e.g. lang/DE, lang/FR).\n\n`;
  text += `Call list_geodata with a filter for paths, globals and imports, e.g. "germany", "FR", "region/canada", "usa counties", "congressional120", "continents", "countries2".`;
  return text;
}

/**
 * Text answer for list_geodata.
 * @param {object|null} index  parsed extended/geodata/index.json
 * @param {string} [filter]
 */
export function listGeodata(index, filter) {
  if (!index || !Array.isArray(index.maps)) {
    return "The geodata index is not available in this build (run `npm run build:geodata`).";
  }
  const words = String(filter || "").trim().split(/[\s,]+/).filter(Boolean).map(normalizeWord).filter(Boolean);
  if (!words.length) return overview(index);

  const packNote = (e) => (e.pack ? index.packs?.[e.pack]?.note : null);
  const found = index.maps.filter((e) => matches(e, packNote(e), words));
  // Whole-country maps (usaCounties, each congressional pack's usaCongressional)
  // first, so a broad filter still shows every pack's main file.
  if (found.length > MAX_LISTED) {
    const whole = (e) => (e.label.includes("whole country") ? 0 : 1);
    found.sort((a, b) => whole(a) - whole(b)); // stable: index order otherwise
  }
  if (!found.length) {
    return `No geodata matches "${echo(filter)}".\n\nTry a country name or ISO code ("germany", "DE"), a folder ("region/usa", "region/canada"), ` +
      `a pack ("congressional120"), a group ("world", "continents", "data", "lang"), or call list_geodata without a filter for an overview.`;
  }

  let text = `# amCharts 5 geodata — ${found.length} match${found.length === 1 ? "" : "es"} for "${echo(filter)}"\n\n` + header(index);

  const packs = [...new Set(found.map((e) => e.pack).filter(Boolean))];
  if (packs.length) {
    text += `**Versioned packs** (US congressional districts are versioned per Congress; examples may pin an older one):\n`;
    for (const p of packs) {
      const info = index.packs[p];
      text += `- ${p}/ — ${info.note}${info.added ? `. Added in ${info.added}` : ""}\n`;
    }
    text += "\n";
  }

  if (found.length > MAX_LISTED) {
    const folders = new Map();
    for (const e of found) {
      const dir = e.path.includes("/") ? e.path.split("/").slice(0, -1).join("/") + "/" : `(${e.group})`;
      folders.set(dir, (folders.get(dir) || 0) + 1);
    }
    text += `Matches by folder: ${[...folders].map(([d, n]) => `${d} ${n}`).join(", ")}\n\n`;
  }

  for (const e of found.slice(0, MAX_LISTED)) text += formatEntry(e);
  if (found.length > MAX_LISTED) {
    text += `\n…${found.length - MAX_LISTED} more, refine the filter (add a state or ISO code, a folder or pack name, or "whole country").\n`;
  }
  return text.trimEnd();
}
