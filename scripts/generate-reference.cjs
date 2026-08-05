#!/usr/bin/env node
// ---------------------------------------------------------------------------
// generate-reference.cjs — regenerate the per-class API reference (extended/
// reference/*.md) directly from the INSTALLED @amcharts/amcharts5 package, using
// the TypeScript compiler API as the source of truth instead of scraping the
// website (which lags and silently truncates property lists — that truncation is
// how `yAxisRadius` went missing and produced phantom-setting bugs).
//
// Per Settings/Private/Events/DataItem interface it captures:
//   - the full `extends` inheritance chain (resolved across files)
//   - every OWN member: name, type, JSDoc description, @default
//   - every INHERITED member (flattened), labelled with the interface it's from
//
// Defaults come from THREE sources, in priority order:
//   1. theme  — `rule("Class").setAll({...})` / `.set("k", v)` in *DefaultTheme.js
//   2. jsdoc  — `@default` tag in the .d.ts (handles amCharts typos @defult/@defgault)
//   3. code   — the fallback in `this.get("k", <fallback>)` in the class .js
// It also CROSS-CHECKS the class .js: settings read via `this.get("k")` that are
// NOT in the typings are reported as "runtime-only" (e.g. Hierarchy `idField`,
// which works but is absent from IHierarchySettings).
//
// Usage:
//   TS_PATH=/abs/typescript AMCHARTS_PKG=/abs/@amcharts/amcharts5 \
//   OUT_DIR=extended/reference-generated node scripts/generate-reference.cjs
// ---------------------------------------------------------------------------

const fs = require("fs");
const path = require("path");

const ts = require(process.env.TS_PATH || "typescript");

const PKG = (process.env.AMCHARTS_PKG || resolvePkg()).replace(/\\/g, "/");
const OUT = path.resolve(process.env.OUT_DIR || "extended/reference-generated");
const VERSION = JSON.parse(fs.readFileSync(path.join(PKG, "package.json"), "utf8")).version;

function resolvePkg() {
  try {
    return path.dirname(require.resolve("@amcharts/amcharts5/package.json"));
  } catch {
    console.error("Could not resolve @amcharts/amcharts5; set AMCHARTS_PKG.");
    process.exit(1);
  }
}

// --- File collection --------------------------------------------------------
function collectFiles(dir, test, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === "node_modules" || e.name === "examples") continue;
      collectFiles(p, test, acc);
    } else if (test(p)) {
      acc.push(p);
    }
  }
  return acc;
}

const rootFiles = collectFiles(PKG, (f) => f.endsWith(".d.ts"));
console.error(`Found ${rootFiles.length} .d.ts files in @amcharts/amcharts5@${VERSION}`);

// ===========================================================================
// Pass 1 — theme defaults: parse `rule("Class").setAll({...})` / `.set("k", v)`
// ===========================================================================
// Returns Map<className, { defaults: Map<setting, raw>, tagged: Map<setting, raw> }>
function buildThemeDefaults() {
  const map = new Map();
  const get = (cls) => {
    if (!map.has(cls)) map.set(cls, { defaults: new Map(), tagged: new Map() });
    return map.get(cls);
  };
  for (const tf of collectFiles(PKG, (f) => /DefaultTheme\.js$/.test(f))) {
    const src = fs.readFileSync(tf, "utf8");

    // rule("Class"[, [tags]]).setAll({ ... })
    const head = /(?:\brule|\br)\(\s*"([A-Za-z0-9_]+)"\s*(,\s*\[[^\]]*\])?\s*\)\s*\.setAll\(\s*\{/g;
    let m;
    while ((m = head.exec(src))) {
      const cls = m[1], tagged = !!m[2];
      const openIdx = head.lastIndex - 1; // position of '{'
      const { obj, end } = captureObject(src, openIdx);
      const bucket = tagged ? get(cls).tagged : get(cls).defaults;
      for (const [k, v] of obj) bucket.set(k, v);
      head.lastIndex = end;
    }

    // rule("Class"[, [tags]]).set("k", value);
    const single = /(?:\brule|\br)\(\s*"([A-Za-z0-9_]+)"\s*(,\s*\[[^\]]*\])?\s*\)\s*\.set\(\s*"([^"]+)"\s*,\s*([^;]+?)\)\s*;/g;
    while ((m = single.exec(src))) {
      const cls = m[1], tagged = !!m[2], key = m[3], val = m[4].trim();
      (tagged ? get(cls).tagged : get(cls).defaults).set(key, collapse(val));
    }
  }
  return map;
}

// Capture a brace-balanced object literal starting at src[openIdx] === '{'.
// String- and comment-aware so braces inside strings don't miscount.
// Returns { obj: Map<key, rawValue>, end: indexAfterClosingBrace }.
function captureObject(src, openIdx) {
  let depth = 0, i = openIdx, str = null, end = src.length;
  for (; i < src.length; i++) {
    const c = src[i], p = src[i - 1];
    if (str) { if (c === str && p !== "\\") str = null; continue; }
    if (c === '"' || c === "'" || c === "`") { str = c; continue; }
    if (c === "{" || c === "(" || c === "[") depth++;
    else if (c === "}" || c === ")" || c === "]") { depth--; if (depth === 0) { end = i + 1; break; } }
  }
  const inner = src.slice(openIdx + 1, end - 1);
  return { obj: parsePairs(inner), end };
}

// Split an object body into top-level key:value pairs (depth- & string-aware).
function parsePairs(body) {
  const pairs = new Map();
  let depth = 0, str = null, buf = "";
  const flush = () => {
    const s = buf.trim(); buf = "";
    if (!s) return;
    const ci = splitKey(s);
    if (ci === -1) return;
    let key = s.slice(0, ci).trim().replace(/^["']|["']$/g, "");
    const val = collapse(s.slice(ci + 1).trim());
    if (/^[A-Za-z_$][\w$]*$/.test(key)) pairs.set(key, val);
  };
  for (let i = 0; i < body.length; i++) {
    const c = body[i], p = body[i - 1];
    if (str) { buf += c; if (c === str && p !== "\\") str = null; continue; }
    if (c === '"' || c === "'" || c === "`") { str = c; buf += c; continue; }
    if (c === "{" || c === "(" || c === "[") depth++;
    else if (c === "}" || c === ")" || c === "]") depth--;
    if (c === "," && depth === 0) { flush(); continue; }
    buf += c;
  }
  flush();
  return pairs;
}

// Index of the first top-level ':' separating key from value.
function splitKey(s) {
  let depth = 0, str = null;
  for (let i = 0; i < s.length; i++) {
    const c = s[i], p = s[i - 1];
    if (str) { if (c === str && p !== "\\") str = null; continue; }
    if (c === '"' || c === "'" || c === "`") { str = c; continue; }
    if (c === "{" || c === "(" || c === "[") depth++;
    else if (c === "}" || c === ")" || c === "]") depth--;
    else if (c === ":" && depth === 0) return i;
  }
  return -1;
}

const collapse = (s) => s.replace(/\s+/g, " ").trim();

// ===========================================================================
// Pass 2 — runtime info from the class .js: this.get("k", fallback) names+defaults
// ===========================================================================
const runtimeCache = new Map();
function runtimeInfo(dtsFile) {
  const jsFile = dtsFile.replace(/\.d\.ts$/, ".js");
  if (runtimeCache.has(jsFile)) return runtimeCache.get(jsFile);
  const info = { gets: new Map(), privates: new Set() };
  if (fs.existsSync(jsFile)) {
    const src = fs.readFileSync(jsFile, "utf8");
    let m;
    const reGet = /this\.get\(\s*"([^"]+)"\s*(?:,\s*([^()]*?)\s*)?\)/g;
    while ((m = reGet.exec(src))) {
      const name = m[1], fallback = m[2] ? collapse(m[2]) : null;
      if (!info.gets.has(name) || (fallback && !info.gets.get(name))) info.gets.set(name, fallback);
    }
    const reGp = /this\.getPrivate\(\s*"([^"]+)"/g;
    while ((m = reGp.exec(src))) info.privates.add(m[1]);
  }
  runtimeCache.set(jsFile, info);
  return info;
}

// --- Build the TS program ---------------------------------------------------
const program = ts.createProgram(rootFiles, {
  target: ts.ScriptTarget.ES2020,
  moduleResolution: ts.ModuleResolutionKind.NodeJs,
  skipLibCheck: true,
  noEmit: true,
  allowJs: false,
});
const checker = program.getTypeChecker();

const jsdocText = (sym) => ts.displayPartsToString(sym.getDocumentationComment(checker)).replace(/\s+/g, " ").trim();

function defaultTag(sym) {
  for (const t of sym.getJsDocTags(checker)) {
    if (/^def/i.test(t.name)) return ts.displayPartsToString(t.text).replace(/\s+/g, " ").trim() || null;
  }
  return null;
}
function ownerName(propSym) {
  const d = propSym.declarations && propSym.declarations[0];
  if (d && d.parent && ts.isInterfaceDeclaration(d.parent)) return d.parent.name.text;
  return null;
}
function extendsChain(ifaceType) {
  const chain = [], seen = new Set();
  for (const bt of ifaceType.getBaseTypes ? ifaceType.getBaseTypes() : []) {
    const sym = bt.getSymbol && bt.getSymbol();
    if (!sym || seen.has(sym.getName())) continue;
    seen.add(sym.getName()); chain.push(sym.getName());
    const decl = sym.declarations && sym.declarations[0];
    if (decl && ts.isInterfaceDeclaration(decl)) {
      for (const n of extendsChain(checker.getDeclaredTypeOfSymbol(sym))) if (!seen.has(n)) { seen.add(n); chain.push(n); }
    }
  }
  return chain;
}
function propType(propSym) {
  const decl = propSym.valueDeclaration || (propSym.declarations && propSym.declarations[0]);
  if (!decl) return "unknown";
  return checker.typeToString(checker.getTypeOfSymbolAtLocation(propSym, decl), decl,
    ts.TypeFormatFlags.NoTruncation).replace(/import\([^)]*\)\./g, "");
}

const KINDS = {
  Settings: { label: "settings", augment: true },
  Private: { label: "private settings", augment: false },
  Events: { label: "events", augment: false },
  DataItem: { label: "data fields", augment: false },
  AxisRange: { label: "axis-range settings", augment: false },
  Options: { label: "options", augment: false },
  Generic: { label: "members", augment: false },
};

// --- Emit one interface -----------------------------------------------------
function emitInterface(node, kindKey, themeDefaults) {
  const name = node.name.text;
  const kind = KINDS[kindKey];
  const sym = checker.getSymbolAtLocation(node.name);
  const type = checker.getDeclaredTypeOfSymbol(sym);
  const chain = extendsChain(type);

  const className = name.replace(/^I/, "").replace(/(Settings|Private|Events|DataItem|AxisRange|Options)$/, "");
  const theme = kind.augment ? themeDefaults.get(className) : null;
  const runtime = kind.augment ? runtimeInfo(node.getSourceFile().fileName) : null;

  const own = node.members.filter((m) => ts.isPropertySignature(m) && m.name)
    .map((m) => checker.getSymbolAtLocation(m.name)).filter(Boolean);
  const ownNames = new Set(own.map((s) => s.getName()));
  const all = checker.getPropertiesOfType(type);
  const allNames = new Set(all.map((s) => s.getName()));

  // default resolution: theme → jsdoc → code-fallback
  const resolveDefault = (s) => {
    const n = s.getName();
    if (theme && theme.defaults.has(n)) return { v: theme.defaults.get(n), src: "theme" };
    const jd = defaultTag(s);
    if (jd != null) return { v: jd, src: "jsdoc" };
    if (runtime && runtime.gets.get(n)) return { v: runtime.gets.get(n), src: "code" };
    return null;
  };

  const fmtProp = (s, withOwner) => {
    let line = `- **${s.getName()}** (\`${propType(s)}\`)`;
    const d = resolveDefault(s);
    if (d) line += ` — default \`${d.v}\`${d.src !== "jsdoc" ? ` _(${d.src})_` : ""}`;
    const owner = withOwner ? ownerName(s) : null;
    if (owner && owner !== name) line += ` — _from ${owner}_`;
    const desc = jsdocText(s);
    if (desc) line += ` — ${desc}`;
    return line;
  };

  let body = `## Inheritance\n\n${chain.length ? `Extends: ${chain.join(" → ")}` : "Extends: (none)"}\n\n`;
  body += `## ${cap(kind.label)} (declared on ${name})\n\n`;
  body += own.length ? own.map((s) => fmtProp(s, false)).join("\n") + "\n" : `_(none declared directly — all inherited)_\n`;
  body += `\n## All ${kind.label} (including inherited) — ${all.length} total\n\n`;
  body += all.slice().sort((a, b) => a.getName().localeCompare(b.getName())).map((s) => fmtProp(s, true)).join("\n") + "\n";

  // Runtime-only cross-check (Settings interfaces only)
  let runtimeOnly = [];
  if (kind.augment && runtime) {
    runtimeOnly = [...runtime.gets.keys()].filter((n) => !allNames.has(n)).sort();
    if (runtimeOnly.length) {
      body += `\n## Runtime settings NOT in the typings\n\n`;
      body += `These are read via \`this.get("…")\` in the class code but are absent from \`${name}\`. They work at runtime but won't show up in TypeScript autocomplete.\n\n`;
      body += runtimeOnly.map((n) => {
        const fb = runtime.gets.get(n);
        return `- **${n}**${fb ? ` — code default \`${fb}\`` : ""}`;
      }).join("\n") + "\n";
    }
  }

  const fm = ["---", `title: "${name}"`, `type: "interface"`,
    `source: "https://www.amcharts.com/docs/v5/reference/${name.toLowerCase()}/"`,
    `generatedFrom: "@amcharts/amcharts5@${VERSION}"`, "---", ""].join("\n");

  return {
    file: `${name.toLowerCase()}.md`, content: fm + body,
    stats: { kind: kindKey, own: own.length, total: all.length, themeDefaults: theme ? theme.defaults.size : 0, runtimeOnly: runtimeOnly.length },
  };
}

function emitClass(node) {
  const name = node.name.text;
  let ext = "(none)";
  for (const h of node.heritageClauses || []) {
    if (h.token === ts.SyntaxKind.ExtendsKeyword) ext = h.types.map((t) => t.expression.getText()).join(", ");
  }
  const sym = checker.getSymbolAtLocation(node.name);
  const desc = sym ? jsdocText(sym) : "";
  const settingsName = `I${name}Settings`;

  // Public read-only / accessor PROPERTIES (e.g. chart.plotContainer, chart.xAxes)
  // — class members that are NOT settings. These are what the old scrape listed
  // under "## Properties" and the v1 stub dropped.
  const props = [];
  for (const m of node.members) {
    if (!(ts.isPropertyDeclaration(m) || ts.isGetAccessorDeclaration(m))) continue;
    if (!m.name || !ts.isIdentifier(m.name)) continue;
    const flags = ts.getCombinedModifierFlags(m);
    if (flags & (ts.ModifierFlags.Private | ts.ModifierFlags.Protected | ts.ModifierFlags.Static)) continue;
    const pname = m.name.text;
    if (pname.startsWith("_")) continue;
    const psym = checker.getSymbolAtLocation(m.name);
    if (!psym) continue;
    let line = `- **${pname}** (\`${propType(psym)}\`)`;
    const def = defaultTag(psym);
    if (def != null) line += ` — default \`${def}\``;
    const d = jsdocText(psym);
    if (d) line += ` — ${d}`;
    props.push({ name: pname, line });
  }
  props.sort((a, b) => a.name.localeCompare(b.name));

  let body = `## ${name}\n\n${desc || "(no description)"}\n\n## Inheritance\n\nExtends: ${ext}\n\n` +
    `## Settings\n\nSee \`${settingsName}\` (\`reference/${settingsName.toLowerCase()}\`) for the full settings list with defaults and inheritance.\n`;
  if (props.length) {
    body += `\n## Properties\n\nPublic read-only / accessor properties (not settings):\n\n` +
      props.map((p) => p.line).join("\n") + "\n";
  }
  const fm = ["---", `title: "${name}"`, `type: "class"`,
    `source: "https://www.amcharts.com/docs/v5/reference/${name.toLowerCase()}/"`,
    `generatedFrom: "@amcharts/amcharts5@${VERSION}"`, "---", ""].join("\n");
  return { file: `${name.toLowerCase()}.md`, content: fm + body, props: props.length };
}

function emitTypeAlias(node) {
  const name = node.name.text;
  const sym = checker.getSymbolAtLocation(node.name);
  const desc = sym ? jsdocText(sym) : "";
  const def = node.type.getText().replace(/\s+/g, " ").trim();
  const body = `## ${name}\n\n${desc || "(no description)"}\n\n## Type\n\n\`\`\`ts\ntype ${name} = ${def}\n\`\`\`\n`;
  const fm = ["---", `title: "${name}"`, `type: "type"`,
    `source: "https://www.amcharts.com/docs/v5/reference/${name.toLowerCase()}/"`,
    `generatedFrom: "@amcharts/amcharts5@${VERSION}"`, "---", ""].join("\n");
  return { file: `${name.toLowerCase()}.md`, content: fm + body };
}

function emitEnum(node) {
  const name = node.name.text;
  const sym = checker.getSymbolAtLocation(node.name);
  const desc = sym ? jsdocText(sym) : "";
  const members = node.members.map((m) => {
    const mn = m.name.getText().replace(/^["']|["']$/g, "");
    const val = m.initializer ? m.initializer.getText() : null;
    const msym = checker.getSymbolAtLocation(m.name);
    const d = msym ? jsdocText(msym) : "";
    return `- **${mn}**${val != null ? ` = ${val}` : ""}${d ? ` — ${d}` : ""}`;
  });
  const body = `## ${name}\n\n${desc || "(no description)"}\n\n## Members\n\n${members.join("\n")}\n`;
  const fm = ["---", `title: "${name}"`, `type: "enum"`,
    `source: "https://www.amcharts.com/docs/v5/reference/${name.toLowerCase()}/"`,
    `generatedFrom: "@amcharts/amcharts5@${VERSION}"`, "---", ""].join("\n");
  return { file: `${name.toLowerCase()}.md`, content: fm + body };
}

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const kindOf = (n) => { const m = n.match(/(Settings|Private|Events|DataItem|AxisRange|Options)$/); return m ? m[1] : null; };

// --- Walk -------------------------------------------------------------------
console.error("Parsing theme defaults…");
const themeDefaults = buildThemeDefaults();
console.error(`  theme rules for ${themeDefaults.size} classes`);

fs.mkdirSync(OUT, { recursive: true });
const written = new Set();
const counts = { Settings: 0, Private: 0, Events: 0, DataItem: 0, AxisRange: 0, Options: 0, Generic: 0, class: 0, enum: 0, type: 0 };
let totalThemeDefaults = 0, totalRuntimeOnly = 0, withTheme = 0, totalClassProps = 0, classesWithProps = 0;
const sample = {};

for (const sf of program.getSourceFiles()) {
  if (!sf.fileName.replace(/\\/g, "/").startsWith(PKG)) continue;
  ts.forEachChild(sf, (node) => {
    if (ts.isInterfaceDeclaration(node) && node.name) {
      const k = kindOf(node.name.text) || "Generic";
      const out = emitInterface(node, k, themeDefaults);
      if (written.has(out.file)) return;
      written.add(out.file);
      fs.writeFileSync(path.join(OUT, out.file), out.content);
      counts[k]++;
      if (k === "Settings") {
        totalThemeDefaults += out.stats.themeDefaults;
        totalRuntimeOnly += out.stats.runtimeOnly;
        if (out.stats.themeDefaults) withTheme++;
      }
      if (["iserpentinechartsettings.md", "iwordcloudsettings.md", "ihierarchysettings.md", "iganttsettings.md"].includes(out.file)) sample[out.file] = out.stats;
    } else if (ts.isClassDeclaration(node) && node.name) {
      const out = emitClass(node);
      if (written.has(out.file)) return;
      written.add(out.file);
      fs.writeFileSync(path.join(OUT, out.file), out.content);
      counts.class++;
      if (out.props) { totalClassProps += out.props; classesWithProps++; }
    } else if (ts.isEnumDeclaration(node) && node.name) {
      const out = emitEnum(node);
      if (written.has(out.file)) return;
      written.add(out.file);
      fs.writeFileSync(path.join(OUT, out.file), out.content);
      counts.enum++;
    } else if (ts.isTypeAliasDeclaration(node) && node.name) {
      const out = emitTypeAlias(node);
      if (written.has(out.file)) return;
      written.add(out.file);
      fs.writeFileSync(path.join(OUT, out.file), out.content);
      counts.type++;
    }
  });
}

console.error("");
console.error(`Wrote ${written.size} files to ${path.relative(process.cwd(), OUT)}`);
console.error(`  Settings: ${counts.Settings}   Private: ${counts.Private}   Events: ${counts.Events}   DataItem: ${counts.DataItem}`);
console.error(`  AxisRange: ${counts.AxisRange}   Options: ${counts.Options}   Generic ifaces: ${counts.Generic}   enums: ${counts.enum}   type aliases: ${counts.type}   classes: ${counts.class}`);
console.error(`  Class Properties (read-only accessors): ${totalClassProps} across ${classesWithProps} classes`);
console.error(`  Settings interfaces with theme defaults: ${withTheme} (${totalThemeDefaults} theme-sourced default values)`);
console.error(`  Runtime-only settings found across Settings interfaces: ${totalRuntimeOnly}`);
console.error("");
console.error("Samples:");
for (const [f, s] of Object.entries(sample)) {
  console.error(`  ${f}: own=${s.own} total=${s.total} themeDefaults=${s.themeDefaults} runtimeOnly=${s.runtimeOnly}`);
}
