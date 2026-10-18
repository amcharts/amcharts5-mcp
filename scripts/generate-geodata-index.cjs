#!/usr/bin/env node
// Usage: npm run build:geodata [-- --verify-cdn]
// ---------------------------------------------------------------------------
// generate-geodata-index.cjs — builds extended/geodata/index.json, the map
// list served by the list_geodata tool, from the @amcharts/amcharts5-geodata
// package at GEODATA_VERSION below. The package is ~355 MB unpacked, so it is
// not a devDependency (every CI run would install it for nothing): this script
// fetches it with `npm pack` into a temp folder and deletes it afterwards.
// Set GEODATA_PKG=<folder> to use an unpacked copy instead. To update, bump
// GEODATA_VERSION and re-run.
//
// One entry per map, with its detail variants (Low / High / Ultra) folded in:
//   - group: world | continents | countries | regions | data | lang
//   - path: under geodata/, without the variant, e.g.
//           "region/usa/congressional120/usaCongressional"
//   - label: what it shows (country name from data/countries2, the state or
//            province from the features, a curated note for versioned packs)
//   - areas: feature count of the smallest variant
// The tool derives the rest from `path` + variant:
//   CDN:    https://cdn.amcharts.com/lib/5/geodata/<path><Variant>.js
//   global: am5geodata_<path with "/" → "_"><Variant>
//   ESM:    @amcharts/amcharts5-geodata/<path><Variant>
// The npm files are ES modules (`export default map`), so the global name is
// not in them: it was read from the CDN builds, whose first line is
// `window.am5geodata_region_usa_congressional120_usaCongressionalLow = (function () {`.
// `--verify-cdn` re-checks that rule (and that the file exists) for a sample
// of entries against the live CDN.
//
// Versioned packs (US congressional districts) get a note naming the Congress,
// taken from the package CHANGELOG; any other "Added" CHANGELOG bullet that
// names a map (e.g. `india2023*`) is attached to that map as `added`.
// ---------------------------------------------------------------------------
"use strict";

const fs = require("fs");
const path = require("path");

const GEODATA_VERSION = "5.1.6";

const ROOT = path.join(__dirname, "..");
const PKG_DIR = process.env.GEODATA_PKG ? path.resolve(process.env.GEODATA_PKG) : fetchPackage();
const PKG = JSON.parse(fs.readFileSync(path.join(PKG_DIR, "package.json"), "utf8"));

// `npm pack` the pinned version into a temp folder, unpack it, and remove the
// folder when the script exits. Returns the unpacked package folder.
function fetchPackage() {
  const { execFileSync } = require("child_process");
  const os = require("os");
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "amcharts5-geodata-"));
  process.on("exit", () => fs.rmSync(tmp, { recursive: true, force: true }));
  console.log(`Fetching @amcharts/amcharts5-geodata@${GEODATA_VERSION}…`);
  const npm = process.platform === "win32" ? "npm.cmd" : "npm";
  const tgz = execFileSync(npm, ["pack", `@amcharts/amcharts5-geodata@${GEODATA_VERSION}`, "--silent"],
    { cwd: tmp, encoding: "utf8", shell: process.platform === "win32" }).trim().split("\n").pop();
  execFileSync("tar", ["-xzf", tgz], { cwd: tmp });
  return path.join(tmp, "package");
}
const OUT = path.join(ROOT, "extended", "geodata", "index.json");
const CDN_BASE = "https://cdn.amcharts.com/lib/5/";

const VARIANTS = ["Low", "High", "Ultra"];
const VARIANT_RE = /(Low|High|Ultra)$/;

// The US congressional district packs are versioned per Congress, and the
// folder names don't say which: unversioned, then year-based, then
// Congress-numbered from the 120th. Checked against the package CHANGELOG
// (see `added`) and the features' CDSESSION / SESSION fields (116 in the
// original set, 118 in congressional2022).
const PACK_NOTES = {
  "region/usa/congressional": "US congressional districts, 117th Congress (2021–2023; the original set, also the 116th's districts)",
  "region/usa/congressional2022": "US congressional districts, 118th Congress (2023–2025; 2022 redistricting)",
  "region/usa/congressional2025": "US congressional districts, 119th Congress (2025–2027)",
  "region/usa/congressional120": "US congressional districts, 120th Congress (2027–2029; newest, includes proposed changes for some states)",
};
// Newest first, so a filter like "congressional" lists the current pack first.
const PACK_ORDER = ["region/usa/congressional120", "region/usa/congressional2025", "region/usa/congressional2022", "region/usa/congressional"];

const REGION_COUNTRY = { usa: "United States", canada: "Canada", mexico: "Mexico", world: "World" };

// --- helpers ----------------------------------------------------------------

const toPosix = (p) => p.split(path.sep).join("/");

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.name.endsWith(".js")) out.push(full);
  }
  return out;
}

/** Parse an npm geodata module: `const map = {…};\nexport default map;` */
function readModuleObject(file) {
  const src = fs.readFileSync(file, "utf8");
  const start = src.indexOf("{");
  const end = src.lastIndexOf("}", src.lastIndexOf("export default"));
  return JSON.parse(src.slice(start, end + 1));
}

function humanize(name) {
  return name
    .replace(/([a-z])([A-Z0-9])/g, "$1 $2")
    .replace(/([0-9])([A-Za-z])/g, "$1 $2")
    .replace(/^./, (c) => c.toUpperCase());
}

function mostCommon(values) {
  const counts = new Map();
  for (const v of values) if (v) counts.set(v, (counts.get(v) || 0) + 1);
  let best = null;
  for (const [v, n] of counts) if (!best || n > best[1]) best = [v, n];
  return best ? best[0] : null;
}

const plural = (type) => {
  const t = type.toLowerCase();
  if (/y$/.test(t) && !/ay$/.test(t)) return t.slice(0, -1) + "ies";
  if (/(sh|ch|x|z)$/.test(t)) return t + "es";
  return /s$/.test(t) ? t : t + "s";
};

// What a map's areas are: their TYPE when all agree; the noun the types share
// ("Metropolitan department" + "Overseas department" → departments); else the
// majority type plus a count of the rest. A mixed map must not read as if it
// held only its majority (franceDepartments2 includes overseas departments).
function areaKind(props) {
  const types = props.map((p) => p.TYPE).filter(Boolean);
  if (!types.length) return null;
  if (types.every((t) => t === types[0])) return plural(types[0]);
  const nouns = new Set(types.map((t) => t.trim().split(/\s+/).pop().toLowerCase()));
  if (nouns.size === 1) return plural([...nouns][0]);
  const major = mostCommon(types);
  const others = props.length - types.filter((t) => t === major).length;
  return `${plural(major)} (+${others} other area${others === 1 ? "" : "s"})`;
}

// --- CHANGELOG: "Added" bullets that name a map or a folder ------------------

function readChangelogAdditions() {
  const file = path.join(PKG_DIR, "CHANGELOG.md");
  if (!fs.existsSync(file)) return [];
  const additions = [];
  let version = null;
  let section = null;
  const seen = new Set();
  for (const line of fs.readFileSync(file, "utf8").split("\n")) {
    const v = line.match(/^## \[([^\]]+)\]/);
    if (v) {
      version = v[1];
      // The file repeats its oldest entries at the end; keep the first copy.
      if (seen.has(version)) version = null;
      else seen.add(version);
      continue;
    }
    const s = line.match(/^### (\w+)/);
    if (s) { section = s[1]; continue; }
    if (!version || section !== "Added" || !line.startsWith("- ")) continue;
    for (const m of line.matchAll(/`([^`]+)`|\(\/?(region\/[^)\s]+)\)/g)) {
      // "`spain2*` … same as `spain*`": the second one is not new.
      if (/same as\s*$/i.test(line.slice(0, m.index))) continue;
      const token = (m[1] || m[2]).replace(/^\/+/, "").replace(/\/?\*$/, "").replace(/^regions\//, "region/");
      additions.push({ token, version, text: line.slice(2).trim() });
    }
  }
  return additions;
}

// --- build ------------------------------------------------------------------

function build() {
  const countries2 = readModuleObject(path.join(PKG_DIR, "data", "countries2.js"));
  const mapCountry = new Map(); // "franceLow" → [{ code, country }]
  for (const [code, info] of Object.entries(countries2)) {
    for (const m of info.maps || []) {
      if (!mapCountry.has(m)) mapCountry.set(m, []);
      mapCountry.get(m).push({ code, country: info.country });
    }
  }
  const additions = readChangelogAdditions();
  // US state names for the per-state region maps, whose features only carry
  // the two-letter code: from the root USA map ("US-AL" → "Alabama").
  const usStates = new Map(readModuleObject(path.join(PKG_DIR, "usaLow.js")).features
    .map((f) => [String(f.properties.id).replace(/^US-/, ""), f.properties.name]));

  // Group files into map families: path without the variant → variants.
  const families = new Map();
  const files = walk(PKG_DIR)
    .map((f) => toPosix(path.relative(PKG_DIR, f)))
    .filter((f) => !f.startsWith(".internal/") && !f.startsWith("json/") && !f.startsWith("node_modules/") && f !== "index.js");
  for (const rel of files) {
    const noExt = rel.replace(/\.js$/, "");
    const top = noExt.split("/")[0];
    const isMap = !["data", "lang"].includes(top);
    const variant = isMap ? (noExt.match(VARIANT_RE) || [])[1] : null;
    if (isMap && !variant) throw new Error(`Map file without a Low/High/Ultra variant: ${rel}`);
    const base = variant ? noExt.slice(0, -variant.length) : noExt;
    if (!families.has(base)) families.set(base, { base, variants: [] });
    if (variant) families.get(base).variants.push(variant);
  }

  const entries = [];
  for (const { base, variants } of families.values()) {
    variants.sort((a, b) => VARIANTS.indexOf(a) - VARIANTS.indexOf(b));
    const parts = base.split("/");
    const name = parts[parts.length - 1];
    const dir = parts.slice(0, -1).join("/");
    const entry = { group: null, path: base };
    if (variants.length) entry.variants = variants;

    if (parts[0] === "data") {
      entry.group = "data";
      entry.label = name === "countries2"
        ? "Country data: ISO code → country name, continent and its map names"
        : "Country data: ISO code → its map names";
      entries.push(entry);
      continue;
    }
    if (parts[0] === "lang") {
      entry.group = "lang";
      const first = fs.readFileSync(path.join(PKG_DIR, base + ".js"), "utf8").split("\n")[0];
      const language = (first.match(/^\/\/\s*(.+)/) || [])[1];
      entry.label = `Country names in ${language ? humanize(language.trim().toLowerCase()) : name} (for map translations)`;
      entries.push(entry);
      continue;
    }

    // Map: read the smallest variant for its areas.
    const smallest = path.join(PKG_DIR, base + variants[0] + ".js");
    const geo = readModuleObject(smallest);
    const features = geo.features || [];
    const props = features.map((f) => f.properties || {});
    entry.areas = features.length;
    const kind = areaKind(props);

    if (parts[0] !== "region") {
      if (name.startsWith("world")) {
        entry.group = "world";
        entry.label = name === "world" ? "World: countries" : `World: countries (${humanize(name.slice(5))} variant)`;
        if (name === "worldTimeZones") entry.label = "World: time zones";
        if (name === "worldTimeZoneAreas") entry.label = "World: time zone areas";
        if (name === "worldOutline") entry.label = "World: land outline";
      } else if (/^(continents|unRegions)/.test(name)) {
        entry.group = "continents";
        entry.label = name === "unRegions" ? "World: UN regions (geoscheme)" : `World: continents${name === "continents" ? "" : ` (${humanize(name.slice(10))} variant)`}`;
      } else {
        entry.group = "countries";
        // "spain2", "usaAlbers", "irelandProvinces" aren't all listed in
        // countries2: fall back to the longest listed map name they extend.
        let owners = mapCountry.get(name + variants[0]);
        for (let i = name.length - 1; !owners && i >= 3; i--) owners = mapCountry.get(name.slice(0, i) + "Low");
        owners = owners || [];
        if (owners.length) {
          entry.codes = [...new Set(owners.map((o) => o.code))];
          entry.label = [...new Set(owners.map((o) => o.country))].join(" / ");
        } else {
          entry.label = humanize(name);
        }
        if (kind) entry.label += `: ${kind}`;
      }
    } else if (parts[1] === "world") {
      entry.group = "continents";
      entry.label = `${humanize(name)}: countries`;
    } else {
      entry.group = "regions";
      const country = REGION_COUNTRY[parts[1]] || humanize(parts[1]);
      // The original congressional set puts the two-letter code in STATENAME.
      const stateName = (v) => (parts[1] === "usa" && usStates.has(v) ? usStates.get(v) : v);
      const state = mostCommon(props.map((p) => stateName(p.STATENAME || p.PROVINCE ||
        (parts[1] === "mexico" || parts[1] === "usa" ? p.STATE : null))));
      const pack = PACK_NOTES[dir];
      const multiState = new Set(props.map((p) => p.STATEID || p.STATEABBR || p.STATE || p.PROVINCE)).size > 1;
      const where = multiState ? `${country}, whole country` : (state ? `${country}, ${state}` : country);
      // Canada's census divisions come in a dozen local types (CDR, RD, CT, …).
      const what = pack ? "congressional districts"
        : parts[1] === "canada" ? "census divisions"
        : kind ? kind
        : props.some((p) => p.COUNTYID) ? "counties"
        : "areas";
      entry.label = `${where}: ${what}`;
      if (pack) entry.pack = dir;
    }

    // CHANGELOG "Added" note naming this map or its folder.
    const added = additions.find((a) => a.token === base || a.token === name || (dir && a.token === dir && !PACK_NOTES[dir]));
    if (added) entry.added = `${added.version}: ${added.text.replace(/`/g, "")}`;
    entries.push(entry);
  }

  const GROUPS = ["world", "continents", "countries", "regions", "data", "lang"];
  const packRank = (e) => (e.pack ? PACK_ORDER.indexOf(e.pack) : -1);
  entries.sort((a, b) =>
    GROUPS.indexOf(a.group) - GROUPS.indexOf(b.group) ||
    // regions: plain folders before versioned packs, newest pack first
    packRank(a) - packRank(b) ||
    a.path.split("/").slice(0, -1).join("/").localeCompare(b.path.split("/").slice(0, -1).join("/")) ||
    // whole-country maps (usaCongressional, usaCounties) before per-state ones
    (b.label.includes("whole country") - a.label.includes("whole country")) ||
    a.path.localeCompare(b.path));

  const packs = {};
  for (const [dir, note] of Object.entries(PACK_NOTES)) {
    const count = entries.filter((e) => e.pack === dir).length;
    if (!count) throw new Error(`Pack ${dir} has no maps in ${PKG.version} — update PACK_NOTES`);
    const added = additions.find((a) => a.token === dir);
    packs[dir] = { note, maps: count, ...(added ? { added: `${added.version}: ${added.text.replace(/`/g, "")}` } : {}) };
  }
  for (const dir of Object.keys(packs).filter((d) => !PACK_ORDER.includes(d))) {
    throw new Error(`Pack ${dir} missing from PACK_ORDER`);
  }
  // A congressional folder the notes don't know about means a new pack shipped.
  const knownDirs = new Set(entries.map((e) => e.path.split("/").slice(0, -1).join("/")));
  for (const d of knownDirs) {
    if (/congressional/.test(d) && !PACK_NOTES[d]) throw new Error(`New congressional pack ${d}: add it to PACK_NOTES / PACK_ORDER`);
  }

  return {
    package: PKG.name,
    version: PKG.version,
    cdnBase: CDN_BASE,
    rules: {
      cdn: "geodata/<path><Variant>.js, relative to cdnBase",
      global: "am5geodata_<path with / replaced by _><Variant> (set by the CDN script)",
      esm: "import am5geodata_x from \"@amcharts/amcharts5-geodata/<path><Variant>\"",
    },
    packs,
    maps: entries,
  };
}

// --- CDN verification ---------------------------------------------------------

const cdnFile = (e, variant) => `geodata/${e.path}${variant || ""}.js`;
const globalName = (e, variant) => `am5geodata_${e.path.replace(/\//g, "_")}${variant || ""}`;

async function verifyCdn(index) {
  // A sample across every group and pack, plus each pack's whole-country map.
  const sample = [];
  const byGroup = new Map();
  for (const e of index.maps) {
    if (!byGroup.has(e.group)) byGroup.set(e.group, []);
    byGroup.get(e.group).push(e);
  }
  for (const list of byGroup.values()) sample.push(list[0], list[Math.floor(list.length / 2)], list[list.length - 1]);
  for (const dir of Object.keys(index.packs)) sample.push(index.maps.find((e) => e.pack === dir));
  let failed = 0;
  for (const e of [...new Set(sample)]) {
    for (const variant of e.variants || [null]) {
      const url = CDN_BASE + cdnFile(e, variant);
      const res = await fetch(url, { headers: { Range: "bytes=0-300" } });
      const head = res.ok ? await res.text() : "";
      const want = globalName(e, variant);
      const ok = res.ok && head.includes(`${want} =`);
      if (!ok) failed++;
      console.log(`${ok ? "ok  " : "FAIL"} ${res.status} ${url}${ok ? "" : `  (want ${want})`}`);
    }
  }
  if (failed) {
    console.error(`${failed} CDN check(s) failed.`);
    process.exit(1);
  }
}

// --- main -------------------------------------------------------------------

(async () => {
  const index = build();
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  // One map per line: small diffs when the package changes.
  const json = JSON.stringify({ ...index, maps: [] }, null, 2)
    .replace(/"maps": \[\]/, `"maps": [\n${index.maps.map((m) => "    " + JSON.stringify(m)).join(",\n")}\n  ]`);
  fs.writeFileSync(OUT, json + "\n");
  const count = (g) => index.maps.filter((m) => m.group === g).length;
  console.log(
    `Wrote ${toPosix(path.relative(ROOT, OUT))} from ${index.package}@${index.version}: ${index.maps.length} entries ` +
    `(world ${count("world")}, continents ${count("continents")}, countries ${count("countries")}, regions ${count("regions")}, ` +
    `data ${count("data")}, lang ${count("lang")}); ` +
    `${index.maps.reduce((n, m) => n + (m.variants ? m.variants.length : 1), 0)} files; ` +
    `packs: ${Object.entries(index.packs).map(([d, p]) => `${d} (${p.maps})`).join(", ")}`
  );
  if (process.argv.includes("--verify-cdn")) await verifyCdn(index);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
