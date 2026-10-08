#!/usr/bin/env node
// Usage: npm run build:reference [-- --force] — regenerates extended/reference/*.md from the installed @amcharts/amcharts5 (optional env: AMCHARTS_PKG, OUT_DIR, TS_PATH, NOTES_FILE).
// ---------------------------------------------------------------------------
// generate-reference.cjs — builds the per-class API reference served by the
// get_api_reference tool, straight from the INSTALLED @amcharts/amcharts5
// package (pinned in devDependencies), instead of scraping the website (which
// lags, and whose scrape silently truncated property lists).
//
// Sources, all inside the installed package:
//   - .d.ts typings, via the TypeScript compiler API: classes, interfaces,
//     members, types, JSDoc (description, @default, @since, @see, @ignore,
//     @deprecated), inheritance;
//   - compiled *DefaultTheme.js files: theme rules (`r("X").setAll({...})`,
//     block form `const rule = r("X"); rule.setAll/set(...)`, `setColor(...)`);
//   - compiled class .js files: `this._setSoft/_setDefault/_setRawDefault("k", v)`
//     in `_afterNew()`, the class's own theme tags, and `this.get("k", fallback)`.
//   All JS is read through the TypeScript parser, so commented-out code is
//   never picked up.
//
// A setting's default is resolved the way the library applies it:
//   1. `_setSoft` in the class (or an ancestor)            → _(class default)_
//   2. theme rules: the root DefaultTheme, plus a chart's own DefaultTheme
//      only for classes of that chart module; rules for ancestor classes
//      apply, the most specific class wins; tagged rules only when the class
//      tags itself with those tags                          → _(theme)_
//   3. `_setDefault` / `_setRawDefault`                     → _(class default)_
//   4. JSDoc `@default`                                      → (unlabelled)
//   5. the fallback in `this.get("k", fallback)`             → _(code fallback)_
// A layer-1–3 value that depends on runtime state (e.g. a list built in code) is
// shown as "default computed at runtime" and hides the lower layers.
//
// Page layout (kept small so pages and search stay useful):
//   - own members in full;
//   - inherited settings in full only where this class's default differs from
//     the declaring interface's;
//   - all other inherited members as a names-only list ("Other inherited …",
//     which src/content.js leaves out of search).
//
// Hand-written facts the TSDoc lacks live in scripts/reference-notes.md and are
// merged in (see the format notes at the top of that file).
//
// Output: only pages this generator wrote (frontmatter `generatedFrom:
// "@amcharts/amcharts5@…"`) are replaced. If OUT_DIR holds other .md files the
// run stops, unless `--force` is given, which removes those too.
// Third-party typings bundled in the package (.internal/bundled, e.g. SheetJS)
// are not documented.
// ---------------------------------------------------------------------------
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const ts = require(process.env.TS_PATH || "typescript");

const toPosix = (p) => p.replace(/\\/g, "/");
const PKG = toPosix(process.env.AMCHARTS_PKG
  ? path.resolve(process.env.AMCHARTS_PKG)
  : path.dirname(require.resolve("@amcharts/amcharts5/package.json", { paths: [ROOT] })));
const OUT = path.resolve(process.env.OUT_DIR || path.join(ROOT, "extended", "reference"));
const NOTES_FILE = path.resolve(process.env.NOTES_FILE || path.join(__dirname, "reference-notes.md"));
const VERSION = JSON.parse(fs.readFileSync(path.join(PKG, "package.json"), "utf8")).version;
const GENERATED_FROM = `@amcharts/amcharts5@${VERSION}`;
const SITE = "https://www.amcharts.com/docs/v5/reference/";
const FORCE = process.argv.includes("--force");

const stats = {
  themeRules: 0, themeTaggedRules: 0, classDefaults: 0, conditionalClassDefaults: 0,
  softOverTheme: [], defaults: { theme: 0, class: 0, jsdoc: 0, fallback: 0, dynamic: 0 },
  collisions: [], appended: [], dynamicBlocked: new Set(), runtimeOnly: [],
  plainDefaults: 0, summaries: 0, dedupedExamples: 0,
};

// --- Output directory check (before any work) ------------------------------
// A page is ours if its frontmatter carries `generatedFrom: "@amcharts/amcharts5@…"`.
const isGeneratedPage = (file) => /^---\n(?:.*\n)*?generatedFrom: "@amcharts\/amcharts5@[^"]*"\n(?:.*\n)*?---\n/
  .test(fs.readFileSync(file, "utf8").slice(0, 4000).replace(/\r\n/g, "\n"));
const existingPages = fs.existsSync(OUT) ? fs.readdirSync(OUT).filter((f) => f.endsWith(".md")) : [];
const foreignPages = existingPages.filter((f) => !isGeneratedPage(path.join(OUT, f)));
if (foreignPages.length && !FORCE) {
  console.error(`Refusing to write to ${OUT}: ${foreignPages.length} .md file(s) there were not made by this generator ` +
    `(e.g. ${foreignPages.slice(0, 3).join(", ")}). Check OUT_DIR, or re-run with --force to replace them too.`);
  process.exit(1);
}

// --- Files + program --------------------------------------------------------
// Typings of third-party code the package bundles (SheetJS under .internal/bundled)
// are not amCharts API and get no pages.
const BUNDLED = /\/\.internal\/bundled\//;
function collectFiles(dir, test, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (["node_modules", "examples", "docs", "bundled"].includes(e.name)) continue;
      collectFiles(p, test, acc);
    } else if (test(p)) {
      acc.push(toPosix(p));
    }
  }
  return acc;
}

const dtsFiles = collectFiles(PKG, (f) => f.endsWith(".d.ts"));
console.error(`Found ${dtsFiles.length} .d.ts files in ${GENERATED_FROM}`);

const program = ts.createProgram(dtsFiles, {
  target: ts.ScriptTarget.ES2020,
  moduleResolution: ts.ModuleResolutionKind.NodeJs,
  skipLibCheck: true,
  noEmit: true,
  types: [],
});
const checker = program.getTypeChecker();
const inPkg = (sf) => { const f = toPosix(sf.fileName); return f.startsWith(PKG + "/") && !BUNDLED.test(f); };
const printer = ts.createPrinter({ removeComments: true, newLine: ts.NewLineKind.LineFeed });
const collapse = (s) => s.replace(/\s+/g, " ").trim();

// --- Values printed from JS (theme rules, class defaults) -------------------
function prettify(v) {
  let s = collapse(v)
    .replace(/\[ /g, "[").replace(/,? \]/g, "]")
    .replace(/this\._?root\b/g, "root")
    .replace(/\$ease\./g, "am5.ease.")
    .replace(/(?<![\w.$])ic\.get\(/g, "root.interfaceColors.get(")
    .replace(/(?<![\w.$])language\.translate/g, "root.language.translate")
    .replace(/(?<![\w.$])(p0|p50|p100)(?![\w$])/g, "am5.$1")
    .replace(/(?<![\w.$])(percent|color)\(/g, "am5.$1(")
    .replace(/(?<![\w.$])(geo[A-Z]\w*)\(/g, "am5map.$1(")
    .replace(/(?<![\w.$])Color\.fromHex\(/g, "am5.Color.fromHex(");
  if (s.length > 200) s = s.slice(0, 197) + "…";
  return s;
}
const isLiteral = (e) => ts.isNumericLiteral(e) || ts.isStringLiteralLike(e) ||
  e.kind === ts.SyntaxKind.TrueKeyword || e.kind === ts.SyntaxKind.FalseKeyword ||
  (ts.isPrefixUnaryExpression(e) && ts.isNumericLiteral(e.operand));
const printExpr = (e, sf) => printer.printNode(ts.EmitHint.Expression, e, sf);
// A value is only shown as a default if it does not depend on runtime state:
// literals, arrays/objects of them, the root's members, am5 helpers
// (percent(), color(), ease, translations) and `X.new(root, {…})`. Anything
// that reads a variable, such as `chart.getPrivate(…)` or `cond ? a : b`, is not.
const STATIC_IDS = new Set(["undefined", "Infinity", "NaN", "p0", "p50", "p100"]);
const STATIC_REF = /^(this\._?root\b|\$ease\.|Math\.|Number\.|BlendMode\.|ic\.|language\.|l\.)/;
const STATIC_CALL = /^(percent|color|Color\.from\w+|\$ease\.\w+|ic\.get|this\._?root\.interfaceColors\.get|[\w.]*\.translate(Any|Func)?|[A-Z]\w*\.new|geo[A-Z]\w*)$/;
// A theme or class default that cannot be shown statically still takes effect:
// it is recorded as DYNAMIC so lower layers (JSDoc, code fallback) don't show a wrong value.
const DYNAMIC = "\u0000dynamic";
function isStatic(e, sf, consts) {
  const rec = (x) => isStatic(x, sf, consts);
  if (isLiteral(e) || e.kind === ts.SyntaxKind.NullKeyword) return true;
  if (ts.isParenthesizedExpression(e)) return rec(e.expression);
  if (ts.isPrefixUnaryExpression(e)) return rec(e.operand);
  if (ts.isBinaryExpression(e)) return rec(e.left) && rec(e.right);
  if (ts.isIdentifier(e)) return STATIC_IDS.has(e.text) || !!(consts && consts.has(e.text));
  if (ts.isArrayLiteralExpression(e)) return e.elements.every(rec);
  if (ts.isObjectLiteralExpression(e)) return e.properties.every((p) => ts.isPropertyAssignment(p) && rec(p.initializer));
  if (ts.isPropertyAccessExpression(e)) return STATIC_REF.test(e.getText(sf));
  if (ts.isCallExpression(e)) return STATIC_CALL.test(e.expression.getText(sf)) && e.arguments.every(rec);
  return false;
}
function valueOf(e, sf, consts) {
  if (ts.isArrowFunction(e) || ts.isFunctionExpression(e)) return "(function)";
  // `ColorSet.new(root, { step: 2 })._markC("step")` is the ColorSet itself
  while (ts.isCallExpression(e) && ts.isPropertyAccessExpression(e.expression) && e.expression.name.text === "_markC") e = e.expression.expression;
  if (!isStatic(e, sf, consts)) {
    if (process.env.DEBUG_REJECTS) console.error("  not a static default:", collapse(e.getText(sf)).slice(0, 120));
    return null;
  }
  let s = collapse(printExpr(e, sf));
  if (consts && /^[A-Za-z_$][\w$]*$/.test(s) && consts.has(s)) s = consts.get(s);
  return prettify(s.replace(/(?<![\w.$])l\.translate/g, "language.translate"));
}
const propKey = (n) => (ts.isIdentifier(n) || ts.isStringLiteralLike(n) || ts.isNumericLiteral(n)) ? n.text : null;
const parseJs = (file) => ts.createSourceFile(file, fs.readFileSync(file, "utf8"), ts.ScriptTarget.ES2020, true, ts.ScriptKind.JS);

// ===========================================================================
// Theme rules (compiled *DefaultTheme.js)
// ===========================================================================
const BASE_THEME = `${PKG}/.internal/themes/DefaultTheme.js`;
const moduleOf = (f) => { const m = toPosix(f).match(/\/\.internal\/((?:charts|plugins)\/[^/]+)\//); return m ? m[1] : null; };

function parseTheme(file) {
  const sf = parseJs(file);
  const rules = new Map();
  const bindings = new Map();
  const consts = new Map();
  const getRule = (cls, tags) => {
    const key = cls + "|" + tags.join(",");
    if (!rules.has(key)) rules.set(key, { cls, tags, settings: new Map(), seq: rules.size });
    return rules.get(key);
  };
  const ruleCall = (e) => {
    if (!e || !ts.isCallExpression(e)) return null;
    const c = e.expression;
    const isRule = (ts.isIdentifier(c) && (c.text === "r" || c.text === "rule")) ||
      (ts.isPropertyAccessExpression(c) && c.name.text === "rule" && c.expression.kind === ts.SyntaxKind.ThisKeyword);
    if (!isRule || !e.arguments.length || !ts.isStringLiteralLike(e.arguments[0])) return null;
    let tags = [];
    const t = e.arguments[1];
    if (t) {
      if (!ts.isArrayLiteralExpression(t) || !t.elements.every(ts.isStringLiteralLike)) return null;
      tags = t.elements.map((x) => x.text).sort();
    }
    return getRule(e.arguments[0].text, tags);
  };
  const ruleOf = (e) => ruleCall(e) || (e && ts.isIdentifier(e) ? bindings.get(e.text) : null) || null;
  const put = (rule, k, v) => { if (k) rule.settings.set(k, v == null ? DYNAMIC : v); };

  (function visit(n) {
    if (ts.isVariableDeclaration(n) && ts.isIdentifier(n.name) && n.initializer) {
      const rr = ruleCall(n.initializer);
      if (rr) bindings.set(n.name.text, rr);
      else {
        bindings.delete(n.name.text);
        // e.g. `const horizontalLayout = this._root.horizontalLayout;`
        if (isStatic(n.initializer, sf, consts)) consts.set(n.name.text, collapse(printExpr(n.initializer, sf)));
      }
    }
    if (ts.isCallExpression(n)) {
      const c = n.expression;
      if (ts.isPropertyAccessExpression(c) && (c.name.text === "setAll" || c.name.text === "set")) {
        const rule = ruleOf(c.expression);
        if (rule && c.name.text === "setAll" && n.arguments[0] && ts.isObjectLiteralExpression(n.arguments[0])) {
          for (const p of n.arguments[0].properties) {
            if (ts.isPropertyAssignment(p)) put(rule, propKey(p.name), valueOf(p.initializer, sf, consts));
            else if (ts.isShorthandPropertyAssignment(p)) put(rule, p.name.text, valueOf(p.name, sf, consts));
          }
        } else if (rule && c.name.text === "set" && n.arguments.length >= 2 && ts.isStringLiteralLike(n.arguments[0])) {
          put(rule, n.arguments[0].text, valueOf(n.arguments[1], sf, consts));
        }
      } else if (ts.isIdentifier(c) && c.text === "setColor" && n.arguments.length >= 4) {
        const rule = ruleOf(n.arguments[0]);
        if (rule && ts.isStringLiteralLike(n.arguments[1]) && ts.isStringLiteralLike(n.arguments[3])) {
          put(rule, n.arguments[1].text, `root.interfaceColors.get("${n.arguments[3].text}")`);
        }
      }
    }
    ts.forEachChild(n, visit);
  })(sf);

  const list = [...rules.values()].filter((r) => r.settings.size);
  stats.themeRules += list.length;
  stats.themeTaggedRules += list.filter((r) => r.tags.length).length;
  return list;
}

const themeFiles = collectFiles(PKG, (f) => /DefaultTheme\.js$/.test(f));
const themes = new Map(themeFiles.map((f) => [f, parseTheme(f)]));
console.error(`Parsed ${themes.size} default theme files (${stats.themeRules} rules, ${stats.themeTaggedRules} tagged)`);

// ===========================================================================
// Class code (compiled class .js): constructor defaults, own tags, fallbacks
// ===========================================================================
const jsCache = new Map();
function classCode(dtsFile, className) {
  const jsFile = dtsFile.replace(/\.d\.ts$/, ".js");
  if (!jsCache.has(jsFile)) {
    const perClass = new Map();
    if (fs.existsSync(jsFile)) {
      const sf = parseJs(jsFile);
      ts.forEachChild(sf, (n) => {
        if (ts.isClassDeclaration(n) && n.name) perClass.set(n.name.text, readClass(n, sf));
      });
    }
    jsCache.set(jsFile, perClass);
  }
  return jsCache.get(jsFile).get(className) || { soft: new Map(), setDefault: new Map(), fallback: new Map(), tags: [], gets: new Set() };
}

function readClass(cls, sf) {
  const info = { soft: new Map(), setDefault: new Map(), fallback: new Map(), tags: [], gets: new Set() };
  const isThisCall = (e, names) => ts.isCallExpression(e) && ts.isPropertyAccessExpression(e.expression) &&
    e.expression.expression.kind === ts.SyntaxKind.ThisKeyword && names.includes(e.expression.name.text);
  const SETTERS = ["_setSoft", "_setDefault", "_setRawDefault"];
  for (const m of cls.members) {
    if (!ts.isMethodDeclaration(m) || !m.body || !m.name || m.name.getText(sf) !== "_afterNew") continue;
    // Only unconditional calls directly in the method body count as defaults.
    let all = 0, top = 0;
    (function countCalls(n) { if (isThisCall(n, SETTERS)) all++; ts.forEachChild(n, countCalls); })(m.body);
    for (const st of m.body.statements) {
      if (!ts.isExpressionStatement(st)) continue;
      const e = st.expression;
      if (isThisCall(e, SETTERS) && e.arguments.length >= 2 && ts.isStringLiteralLike(e.arguments[0])) {
        top++;
        const v = valueOf(e.arguments[1], sf);
        const bucket = e.expression.name.text === "_setSoft" ? info.soft : info.setDefault;
        if (!bucket.has(e.arguments[0].text)) { bucket.set(e.arguments[0].text, v == null ? DYNAMIC : v); stats.classDefaults++; }
      }
      // this._settings.themeTags = $utils.mergeTags(this._settings.themeTags, ["a", x || "b"])
      if (ts.isBinaryExpression(e) && e.operatorToken.kind === ts.SyntaxKind.EqualsToken &&
        /\.themeTags$/.test(e.left.getText(sf)) && ts.isCallExpression(e.right) &&
        /mergeTags$/.test(e.right.expression.getText(sf)) && e.right.arguments[1] &&
        ts.isArrayLiteralExpression(e.right.arguments[1])) {
        for (const el of e.right.arguments[1].elements) {
          if (ts.isStringLiteralLike(el)) info.tags.push(el.text);
          else if (ts.isBinaryExpression(el) && el.operatorToken.kind === ts.SyntaxKind.BarBarToken && ts.isStringLiteralLike(el.right)) info.tags.push(el.right.text);
        }
      }
    }
    stats.conditionalClassDefaults += all - top;
  }
  // `this.get("k", fallback)` gives the setting's effective default only where the
  // result is used as is: assigned, returned or tested. Inside a larger expression
  // (`this.get("maxWidth", 0) - padding`, `label.get("text", this.get("name", ""))`)
  // the fallback is just a convenience, so it is skipped. Two different direct
  // fallbacks for one key are ambiguous and skipped too.
  const conflicting = new Set();
  (function walk(n) {
    if (isThisCall(n, ["get"]) && n.arguments.length >= 1 && ts.isStringLiteralLike(n.arguments[0])) info.gets.add(n.arguments[0].text);
    if (isThisCall(n, ["get"]) && n.arguments.length === 2 && ts.isStringLiteralLike(n.arguments[0]) && usedDirectly(n)) {
      const k = n.arguments[0].text;
      const v = valueOf(n.arguments[1], sf);
      if (v != null && !/=>|\bfunction\b/.test(v) && !conflicting.has(k)) {
        if (!info.fallback.has(k)) info.fallback.set(k, v);
        else if (info.fallback.get(k) !== v) { info.fallback.delete(k); conflicting.add(k); }
      }
    }
    ts.forEachChild(n, walk);
  })(cls);
  return info;
}
function usedDirectly(call) {
  let n = call;
  let p = n.parent;
  while (p && ts.isParenthesizedExpression(p)) { n = p; p = p.parent; }
  if (!p) return false;
  return (ts.isVariableDeclaration(p) && p.initializer === n) ||
    ts.isReturnStatement(p) ||
    (ts.isArrowFunction(p) && p.body === n) ||
    (ts.isBinaryExpression(p) && p.operatorToken.kind === ts.SyntaxKind.EqualsToken && p.right === n) ||
    (ts.isPropertyAssignment(p) && p.initializer === n) ||
    (ts.isIfStatement(p) && p.expression === n) ||
    (ts.isConditionalExpression(p) && p.condition === n) ||
    (ts.isPrefixUnaryExpression(p) && p.operator === ts.SyntaxKind.ExclamationToken && usedDirectly(p));
}

// ===========================================================================
// Exports (entry points), then the class / interface index
// ===========================================================================

// Entry points → how a symbol is imported.
function entryImport(rel) {
  const module = rel === "index" ? "@amcharts/amcharts5" : `@amcharts/amcharts5/${rel}`;
  let alias = "am5" + rel;
  if (rel === "index") alias = "am5";
  else if (rel.startsWith("plugins/")) alias = "am5plugins_" + rel.slice(8);
  else if (rel.startsWith("themes/")) alias = "am5themes_" + rel.slice(7);
  return { module, alias };
}
const entryRels = [];
for (const dir of ["", "plugins/", "themes/"]) {
  const abs = path.join(PKG, dir);
  if (!fs.existsSync(abs)) continue;
  for (const f of fs.readdirSync(abs).sort()) if (f.endsWith(".d.ts")) entryRels.push(dir + f.replace(/\.d\.ts$/, ""));
}
entryRels.sort((a, b) => (a === "index" ? -1 : b === "index" ? 1 : 0)); // index first, rest in order

const exportsByDecl = new Map(); // declaration node -> { alias, module, name, isDefault }
const namespaces = [];           // { name, alias, module, sym }
const exportedFunctions = new Map(); // "alias.name" -> { name, alias, module, decls }
for (const rel of entryRels) {
  const sf = program.getSourceFile(`${PKG}/${rel}.d.ts`);
  const msym = sf && checker.getSymbolAtLocation(sf);
  if (!msym) continue;
  const { module, alias } = entryImport(rel);
  for (const e of checker.getExportsOfModule(msym)) {
    const target = (e.flags & ts.SymbolFlags.Alias) ? checker.getAliasedSymbol(e) : e;
    const name = e.getName();
    if ((target.flags & ts.SymbolFlags.ValueModule) && name !== "default") {
      if (!namespaces.some((n) => n.name === name && n.alias === alias)) namespaces.push({ name, alias, module, sym: target });
      continue;
    }
    for (const d of target.declarations || []) {
      if (!d.getSourceFile || !inPkg(d.getSourceFile())) continue;
      if (!exportsByDecl.has(d)) exportsByDecl.set(d, { alias, module, name, isDefault: name === "default" });
      if (ts.isFunctionDeclaration(d)) {
        const key = `${alias}.${name}`;
        if (!exportedFunctions.has(key)) exportedFunctions.set(key, { name, alias, module, decls: [] });
        const fn = exportedFunctions.get(key);
        if (!fn.decls.includes(d)) fn.decls.push(d);
      }
    }
  }
}
const exportOf = (node) => exportsByDecl.get(node) || null;

// The same name can be declared more than once (e.g. IEntityEvents in Entity.d.ts,
// the real one, and an internal @ignore copy in Animation.d.ts). The page goes to
// the declaration exported from an entry point and not @ignore; any other public
// declaration is appended to that page as a section; the rest are dropped.
const isIgnoredDecl = (n) => ts.getJSDocTags(n).some((t) => t.tagName.text === "ignore");
const hasExportModifier = (n) => (ts.getCombinedModifierFlags(n) & ts.ModifierFlags.Export) !== 0;
const relFile = (n) => toPosix(n.getSourceFile().fileName).slice(PKG.length + 1);
const declRank = (n) => (exportsByDecl.has(n) ? 0 : 4) + (isIgnoredDecl(n) ? 2 : 0) + (hasExportModifier(n) ? 0 : 1);
const declKind = (n) => ts.isClassDeclaration(n) ? "class" : ts.isInterfaceDeclaration(n) ? "interface"
  : ts.isEnumDeclaration(n) ? "enum" : ts.isTypeAliasDeclaration(n) ? "type" : null;
const candidates = new Map(); // "kind:name" -> declaration nodes, in program order
for (const sf of program.getSourceFiles()) {
  if (!inPkg(sf)) continue;
  ts.forEachChild(sf, (n) => {
    if (!n.name || !ts.isIdentifier(n.name) || !declKind(n)) return;
    const key = `${declKind(n)}:${n.name.text}`;
    if (!candidates.has(key)) candidates.set(key, []);
    candidates.get(key).push(n);
  });
}
const primaryDecls = [];
const secondaryDecls = [];
for (const [key, nodes] of candidates) {
  const sorted = nodes.slice().sort((a, b) => declRank(a) - declRank(b)); // stable: program order on ties
  primaryDecls.push(sorted[0]);
  if (nodes.length < 2) continue;
  const fates = sorted.slice(1).map((n) => {
    if (exportsByDecl.has(n) && !isIgnoredDecl(n)) { secondaryDecls.push(n); return `${relFile(n)} appended as a section`; }
    const why = [exportsByDecl.has(n) ? null : "not exported from an entry point", isIgnoredDecl(n) ? "@ignore" : null].filter(Boolean).join(", ");
    return `${relFile(n)} dropped (${why})`;
  });
  stats.collisions.push(`${key.replace(":", " ")}: kept ${relFile(sorted[0])}; ${fates.join("; ")}`);
}

const classIndex = new Map();      // name -> { node, sym, file } (the chosen declaration)
const interfaceIndex = new Map();  // name -> node (the chosen declaration)
for (const n of primaryDecls) {
  if (ts.isClassDeclaration(n)) classIndex.set(n.name.text, { node: n, sym: checker.getSymbolAtLocation(n.name), file: toPosix(n.getSourceFile().fileName) });
  if (ts.isInterfaceDeclaration(n)) interfaceIndex.set(n.name.text, n);
}

function baseClassName(name) {
  const ci = classIndex.get(name);
  if (!ci) return null;
  for (const h of ci.node.heritageClauses || []) {
    if (h.token === ts.SyntaxKind.ExtendsKeyword && h.types[0]) return h.types[0].expression.getText().replace(/<.*$/, "");
  }
  return null;
}
function classChain(name) {
  const out = [];
  const seen = new Set();
  let cur = name;
  while (cur && classIndex.has(cur) && !seen.has(cur)) {
    seen.add(cur);
    out.push(cur);
    cur = baseClassName(cur);
  }
  return out; // [C, parent, …] (in-package classes only)
}
const subclasses = new Map();
for (const name of classIndex.keys()) {
  const b = baseClassName(name);
  if (b && classIndex.has(b)) {
    if (!subclasses.has(b)) subclasses.set(b, []);
    subclasses.get(b).push(name);
  }
}

// Built-in themes and the classes that add them: `this._defaultThemes.push(XTheme.new(…))`
// (or `this._rootContainer._defaultThemes.push(…)` in Root). Read through the parser.
const themeAddedBy = new Map(); // theme class -> [{ by, toRootContainer }]
for (const f of collectFiles(PKG, (p) => p.endsWith(".js") && !BUNDLED.test(toPosix(p)))) {
  if (!fs.readFileSync(f, "utf8").includes("_defaultThemes.push(")) continue;
  const sf = parseJs(f);
  (function visit(n) {
    if (ts.isCallExpression(n) && ts.isPropertyAccessExpression(n.expression) && n.expression.name.text === "push" &&
      /^this(\._rootContainer)?\._defaultThemes$/.test(n.expression.expression.getText(sf)) && n.arguments[0] &&
      ts.isCallExpression(n.arguments[0]) && /^\w+\.new$/.test(n.arguments[0].expression.getText(sf))) {
      const theme = n.arguments[0].expression.getText(sf).replace(/\.new$/, "");
      let c = n.parent;
      while (c && !ts.isClassDeclaration(c)) c = c.parent;
      if (c && c.name) {
        if (!themeAddedBy.has(theme)) themeAddedBy.set(theme, []);
        themeAddedBy.get(theme).push({ by: c.name.text, toRootContainer: /_rootContainer/.test(n.expression.expression.getText(sf)) });
      }
    }
    ts.forEachChild(n, visit);
  })(sf);
}

// A one-line summary for a class the typings leave undescribed — only facts the
// package states: how a theme is applied, or what the class extends.
function classSummary(name, chain, ex) {
  if (chain.includes("Theme") && name !== "Theme") {
    if (ex && ex.isDefault) return `A theme. Apply it with \`root.setThemes([${ex.alias}.new(root)])\`.`;
    const by = themeAddedBy.get(name);
    if (by && by.length) {
      const names = [...new Set(by.map((b) => b.by))].map((b) => `\`${b}\``);
      if (by.every((b) => b.toRootContainer)) {
        return `The built-in default theme: ${names.join(" and ")} adds it to its root container, so its rules apply to every element of the chart.`;
      }
      const one = names.length === 1;
      return `Built-in theme rules: ${names.join(" and ")} add${one ? "s" : ""} this theme to ${one ? "its" : "their"} default themes, so its rules apply to ${one ? "that element" : "those elements"} and everything inside ${one ? "it" : "them"}.`;
    }
    return "A `Theme` subclass.";
  }
  const base = baseClassName(name);
  return base ? `${/^[AEIOU]/.test(base) ? "An" : "A"} \`${base}\` subclass.` : "";
}

// ===========================================================================
// Default resolution
// ===========================================================================
const ctxCache = new Map();
function contextFor(className) {
  if (ctxCache.has(className)) return ctxCache.get(className);
  const chain = classChain(className);
  const files = chain.map((c) => classIndex.get(c).file);
  const mods = new Set(files.map(moduleOf).filter(Boolean));
  const applicable = [...themes.keys()].filter((f) => f === BASE_THEME || mods.has(moduleOf(f)))
    .sort((a, b) => (a === BASE_THEME ? -1 : b === BASE_THEME ? 1 : a.localeCompare(b)));
  const code = chain.map((c, i) => classCode(files[i], c));
  const tags = new Set(code.flatMap((c) => c.tags));

  const theme = new Map();
  for (const cls of chain.slice().reverse()) { // root ancestor first; the class itself wins
    const cand = [];
    applicable.forEach((f, fi) => {
      for (const r of themes.get(f)) {
        if (r.cls === cls && r.tags.every((t) => tags.has(t))) cand.push({ r, fi });
      }
    });
    cand.sort((a, b) => a.r.tags.length - b.r.tags.length || a.fi - b.fi || a.r.seq - b.r.seq);
    for (const { r } of cand) for (const [k, v] of r.settings) theme.set(k, v);
  }
  const pick = (key) => {
    const m = new Map();
    for (const c of code) for (const [k, v] of c[key]) if (!m.has(k)) m.set(k, v);
    return m;
  };
  const ctx = { className, chain, theme, soft: pick("soft"), setDefault: pick("setDefault"), fallback: pick("fallback") };
  for (const [k, v] of ctx.soft) if (theme.has(k) && theme.get(k) !== v) stats.softOverTheme.push(`${className}.${k}: _setSoft ${v} over theme ${theme.get(k)}`);
  ctxCache.set(className, ctx);
  return ctx;
}
const EMPTY_CTX = { className: null, theme: new Map(), soft: new Map(), setDefault: new Map(), fallback: new Map(), chain: [] };

function jsdocDefault(sym) {
  for (const t of sym.getJsDocTags(checker)) {
    if (/^def/i.test(t.name)) {
      const v = collapse(ts.displayPartsToString(t.text || []));
      return v || null;
    }
  }
  return null;
}
// noFallback: leave out the code-fallback layer (used when comparing a class's
// default with the declaring interface's: a fallback is not a class-level default).
function resolveDefault(sym, ctx, noFallback = false) {
  const n = sym.getName();
  const layers = [[ctx.soft, "class"], [ctx.theme, "theme"], [ctx.setDefault, "class"]];
  for (let i = 0; i < layers.length; i++) {
    const [m, src] = layers[i];
    if (!m.has(n)) continue;
    if (m.get(n) !== DYNAMIC) return { v: m.get(n), src };
    // Set from runtime state: say so, rather than show a lower layer's wrong value.
    const below = resolveBelow(sym, ctx, i + 1, noFallback);
    if (below) stats.dynamicBlocked.add(`${ctx.className}.${n}: ${src} value is dynamic; would otherwise show \`${below.v}\` (${below.src})`);
    return { dynamic: true, src };
  }
  return resolveBelow(sym, ctx, layers.length, noFallback);
}
function resolveBelow(sym, ctx, from, noFallback) {
  const n = sym.getName();
  const layers = [[ctx.soft, "class"], [ctx.theme, "theme"], [ctx.setDefault, "class"]];
  for (let i = from; i < layers.length; i++) {
    const [m, src] = layers[i];
    if (m.has(n) && m.get(n) !== DYNAMIC) return { v: m.get(n), src };
  }
  const jd = jsdocDefault(sym);
  if (jd != null) return { v: jd, src: "jsdoc" };
  if (!noFallback && ctx.fallback.has(n)) return { v: ctx.fallback.get(n), src: "fallback" };
  return null;
}
const SRC_LABEL = { theme: " _(theme)_", class: " _(class default)_", jsdoc: "", fallback: " _(code fallback)_" };
function normDefault(d) {
  if (!d) return "";
  if (d.dynamic) return `(dynamic ${d.src})`;
  return d.v.replace(/^am5\./, "").replace(/^percent\((\d+)\)$/, "p$1").replace(/^(\d+)%$/, "p$1")
    .replace(/am5\.ease|\$ease/g, "ease").replace(/'/g, '"').replace(/\s+/g, "");
}

// ===========================================================================
// Notes / overrides (scripts/reference-notes.md)
// ===========================================================================
// Headings: "## member: Owner.member", "## page: Title" (a title may contain dots,
// e.g. "ease.byName"), "## @since" with lines "- member: Owner.member = x.y.z" or
// "- page: Title = x.y.z". Anything else is reported and ignored.
function readNotes(file) {
  const res = { since: new Map(), member: new Map(), page: new Map(), bad: [] };
  if (!fs.existsSync(file)) return res;
  const text = fs.readFileSync(file, "utf8").replace(/\r\n/g, "\n").replace(/<!--[\s\S]*?-->/g, "");
  const parts = text.split(/^## +(.+)$/m);
  for (let i = 1; i < parts.length; i += 2) {
    const heading = parts[i].trim();
    const body = parts[i + 1].trim();
    let m;
    if (heading === "@since") {
      for (const l of body.split("\n").filter((x) => x.trim())) {
        if ((m = l.match(/^\s*-\s*(member|page):\s*(\S+)\s*=\s*(\S+)\s*$/))) res.since.set(`${m[1]}:${m[2]}`, m[3]);
        else res.bad.push(`@since line "${l.trim()}"`);
      }
    } else if ((m = heading.match(/^member:\s*(\w+\.\w+)$/))) {
      res.member.set(m[1], collapse(body));
    } else if ((m = heading.match(/^page:\s*(\S+)$/))) {
      res.page.set(m[1], body);
    } else {
      res.bad.push(`heading "## ${heading}"`);
    }
  }
  return res;
}
const notes = readNotes(NOTES_FILE);
const usedNotes = new Set();
function memberNote(key) { if (notes.member.has(key)) { usedNotes.add("m:" + key); return notes.member.get(key); } return null; }
// key: "member:Owner.member" or "page:Title"
function sinceOverride(key) { if (notes.since.has(key)) { usedNotes.add("s:" + key); return notes.since.get(key); } return null; }

// ===========================================================================
// JSDoc → markdown
// ===========================================================================
function linkify(s) {
  return s
    .replace(/\{@link\s+([^}\s|]+)\s*(?:\|\s*)?([^}]*)\}/g, (_, target, label) => {
      label = label.trim();
      if (/^https?:/.test(target)) return label ? `${label} (${target})` : target;
      return label || `\`${target}\``;
    })
    .replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_, target, label) => `\`${(label || target).trim()}\``);
}
// Split a doc comment into text paragraphs and fenced code blocks.
function docBlocks(raw) {
  const blocks = [];
  let para = [];
  let code = null;
  const flush = () => {
    if (para.length) blocks.push({ text: linkify(collapse(para.map((l) => l.replace(/^[*-]\s+/, "• ")).join(" "))) });
    para = [];
  };
  for (const line of (raw || "").replace(/\r/g, "").split("\n")) {
    const fence = line.match(/^\s*```\s*([\w-]*)\s*$/);
    if (code) {
      if (fence) { blocks.push({ code: dedent(code.lines), lang: code.lang }); code = null; } else code.lines.push(line);
      continue;
    }
    if (fence) { flush(); code = { lang: fence[1] || "", lines: [] }; continue; }
    if (!line.trim()) { flush(); continue; }
    para.push(line.trim());
  }
  flush();
  if (code) blocks.push({ code: dedent(code.lines), lang: code.lang });
  return dropDuplicateExamples(blocks);
}
// TSDoc often gives one example twice, as TypeScript and as JavaScript, differing
// only in `const`/`let` vs `var`. Keep the TypeScript one then; keep both if they
// differ in anything else.
function dropDuplicateExamples(blocks) {
  const isTs = (b) => b && b.code != null && /^(ts|typescript)$/i.test(b.lang || "");
  const isJs = (b) => b && b.code != null && /^(js|javascript)$/i.test(b.lang || "");
  const norm = (c) => c.replace(/\b(const|let|var)\b/g, "var").replace(/\s+/g, " ").trim();
  const out = [];
  for (let i = 0; i < blocks.length; i++) {
    const a = blocks[i], b = blocks[i + 1];
    if ((isTs(a) && isJs(b)) || (isJs(a) && isTs(b))) {
      if (norm(a.code) === norm(b.code)) {
        out.push(isTs(a) ? a : b);
        stats.dedupedExamples++;
        i++;
        continue;
      }
    }
    out.push(a);
  }
  return out;
}
function dedent(lines) {
  while (lines.length && !lines[0].trim()) lines.shift();
  while (lines.length && !lines[lines.length - 1].trim()) lines.pop();
  const ind = Math.min(...lines.filter((l) => l.trim()).map((l) => l.match(/^\s*/)[0].length));
  return lines.map((l) => l.slice(Number.isFinite(ind) ? ind : 0)).join("\n");
}
// Fenced code, indented by `indent`. A "#"-led line is shifted so it can never read as a heading.
function fence(b, indent = "") {
  const lang = (b.lang || "").toLowerCase() === "typescript" ? "ts" : (b.lang || "").toLowerCase() === "javascript" ? "js" : b.lang;
  const body = b.code.split("\n").map((l) => indent + (/^#/.test(l) ? " " + l : l)).join("\n");
  return `${indent}\`\`\`${lang}\n${body}\n${indent}\`\`\``;
}
const docOf = (sym) => ts.displayPartsToString(sym.getDocumentationComment(checker));
function tagsOf(sym) {
  const out = { since: null, deprecated: null, ignore: false, see: [] };
  for (const t of sym.getJsDocTags(checker)) {
    const txt = linkify(collapse(ts.displayPartsToString(t.text || [])));
    if (t.name === "since") out.since = txt;
    else if (t.name === "deprecated") out.deprecated = txt || "yes";
    else if (t.name === "ignore") out.ignore = true;
    else if (t.name === "see") out.see.push(...(txt.match(/https?:\/\/[^\s)]+/g) || []));
  }
  return out;
}

// One member row: "- **name** (`type`) — default … — description …", code blocks indented below.
function renderRow(sym, { type, def, from, noteKey }) {
  const name = sym.getName();
  const tags = tagsOf(sym);
  const since = (noteKey && sinceOverride(`member:${noteKey}`)) || tags.since;
  const note = noteKey ? memberNote(noteKey) : null;
  const blocks = docBlocks(docOf(sym));
  const firstCode = blocks.findIndex((b) => b.code != null);
  const lead = (firstCode < 0 ? blocks : blocks.slice(0, firstCode)).map((b) => b.text);
  const rest = firstCode < 0 ? [] : blocks.slice(firstCode);

  const segs = [];
  if (def && def.dynamic) segs.push(`default computed at runtime _(${def.src === "theme" ? "theme" : "class default"})_`);
  else if (def) segs.push(`default \`${def.v}\`${SRC_LABEL[def.src]}`);
  if (from) segs.push(`_from ${from}_`);
  const words = [];
  if (tags.ignore) words.push("_(internal)_");
  if (tags.deprecated) words.push(`**Deprecated:** ${tags.deprecated}`);
  words.push(...lead);
  const tail = [];
  if (since) tail.push(`_Since ${since}._`);
  if (tags.see.length) tail.push(`Docs: ${tags.see.join(", ")}`);
  if (note && !rest.length) tail.push(`_Note:_ ${note}`);
  if (!rest.length) words.push(...tail);

  let line = `- **${name}** (\`${type}\`)`;
  if (segs.length) line += " — " + segs.join(" — ");
  if (words.length) line += " — " + words.join(" ");
  if (!rest.length) return line;
  const more = rest.map((b) => (b.code != null ? fence(b, "  ") : "  " + b.text));
  if (tail.length) more.push("  " + tail.join(" "));
  if (note) more.push(`  _Note:_ ${note}`);
  return [line, "", ...more.flatMap((m) => [m, ""])].join("\n").trimEnd() + "\n";
}

function propType(sym) {
  const decl = sym.valueDeclaration || (sym.declarations && sym.declarations[0]);
  if (!decl) return "unknown";
  return checker.typeToString(checker.getTypeOfSymbolAtLocation(sym, decl), decl, ts.TypeFormatFlags.NoTruncation)
    .replace(/import\([^)]*\)\./g, "");
}
function ownerName(sym) {
  const d = sym.declarations && sym.declarations[0];
  if (d && d.parent && (ts.isInterfaceDeclaration(d.parent) || ts.isClassDeclaration(d.parent)) && d.parent.name) return d.parent.name.text;
  return null;
}
// A page-level description: paragraphs and code, plus since / docs links. With no
// description in the typings, `summary` (a line derived from facts, or "") is used.
function docSection(sym, pageTitle, summary = "") {
  const blocks = docBlocks(docOf(sym));
  const tags = tagsOf(sym);
  const out = blocks.map((b) => (b.code != null ? fence(b) : b.text));
  if (!out.length && summary) { out.push(summary); stats.summaries++; }
  const meta = [];
  if (tags.deprecated) meta.push(`**Deprecated:** ${tags.deprecated}`);
  const since = sinceOverride(`page:${pageTitle || sym.getName()}`) || tags.since;
  if (since) meta.push(`_Since ${since}._`);
  if (tags.see.length) meta.push(`Docs: ${tags.see.join(", ")}`);
  if (meta.length) out.push(meta.join(" "));
  return out.join("\n\n");
}

// ===========================================================================
// Pages
// ===========================================================================
const pages = new Map(); // file -> { title, type, source, body }
// get_api_reference looks pages up by lowercased alphanumerics, so two symbols that
// differ only in case (JSONParser / JsonParser, type Time / namespace time) share
// one page: the second is appended to the first as its own section.
function addPage(title, type, body, { source = true, heading } = {}) {
  const file = title.toLowerCase().replace(/[^a-z0-9]/g, "") + ".md";
  if (pages.has(file)) {
    const p = pages.get(file);
    p.body = p.body.trimEnd() + `\n\n## ${heading || `${title} (${type})`}\n\n` + body.replace(/^## /gm, "### ");
    stats.appended.push(`${title} (${type}) → ${file}`);
    return file;
  }
  pages.set(file, { title, type, source: source ? `${SITE}${title.toLowerCase()}/` : null, body });
  return file;
}
function appendNotes(title, body) {
  if (!notes.page.has(title)) return body;
  usedNotes.add("p:" + title);
  return body.trimEnd() + "\n\n## Notes\n\n" + notes.page.get(title) + "\n";
}

const KINDS = {
  Settings: { own: "Settings", inherited: "settings" },
  Private: { own: "Private settings", inherited: "private settings" },
  Events: { own: "Events", inherited: "events" },
  DataItem: { own: "Data item fields", inherited: "data item fields" },
  AxisRange: { own: "Axis range settings", inherited: "axis range settings" },
  Options: { own: "Options", inherited: "options" },
  Generic: { own: "Properties", inherited: "properties" },
};
const kindOf = (n) => { const m = n.match(/(Settings|Private|Events|DataItem|AxisRange|Options)$/); return m ? m[1] : "Generic"; };
const classOfInterface = (iname) => iname.replace(/^I/, "").replace(/(Settings|Private|Events|DataItem|AxisRange|Options)$/, "");

function interfaceAncestors(node) {
  const direct = [];
  for (const h of node.heritageClauses || []) for (const t of h.types) direct.push(t.expression.getText().replace(/<.*$/, ""));
  const all = [];
  const queue = [...direct];
  while (queue.length) {
    const n = queue.shift();
    if (all.includes(n)) continue;
    all.push(n);
    const d = interfaceIndex.get(n);
    if (d) for (const h of d.heritageClauses || []) for (const t of h.types) queue.push(t.expression.getText().replace(/<.*$/, ""));
  }
  return { direct, all };
}
function typeImportLine(node) {
  const ex = exportOf(node);
  if (!ex) return `TypeScript: not exported by name from the package.`;
  return `TypeScript: \`${ex.alias}.${ex.name}\` (\`import type { ${ex.name} } from "${ex.module}"\`)`;
}

function emitInterface(node, secondary = false) {
  const name = node.name.text;
  const kindKey = kindOf(name);
  const kind = KINDS[kindKey];
  const sym = checker.getSymbolAtLocation(node.name);
  const type = checker.getDeclaredTypeOfSymbol(sym);
  const isSettings = kindKey === "Settings";
  const className = classOfInterface(name);
  const hasClass = isSettings && classIndex.has(className);
  const ctx = isSettings ? (hasClass ? contextFor(className) : EMPTY_CTX) : null;

  const own = node.members.filter((m) => ts.isPropertySignature(m) && m.name)
    .map((m) => checker.getSymbolAtLocation(m.name)).filter(Boolean);
  const ownNames = new Set(own.map((s) => s.getName()));
  // Members of a merged second declaration of this interface count as its own.
  for (const s of checker.getPropertiesOfType(type)) {
    if (!ownNames.has(s.getName()) && ownerName(s) === name) { own.push(s); ownNames.add(s.getName()); }
  }
  const inherited = checker.getPropertiesOfType(type).filter((s) => !ownNames.has(s.getName()));
  const { direct, all } = interfaceAncestors(node);

  const parts = [];
  const desc = docSection(sym, name);
  if (desc) parts.push(desc);

  const inh = [`Extends: ${direct.length ? direct.join(", ") : "(none)"}`];
  if (all.length > direct.length) inh.push(`All ancestors: ${all.join(", ")}`);
  if (hasClass) {
    const ex = exportOf(classIndex.get(className).node);
    inh.push(`Settings of: \`${ex ? `${ex.alias}.${className}` : className}\` (see its page for the class)`);
  }
  inh.push(typeImportLine(node));
  parts.push("## Inheritance\n\n" + inh.join("\n"));

  const row = (s, from) => {
    const owner = ownerName(s) || name;
    let def = null;
    if (isSettings) {
      // inherited rows (`from`) never show a code fallback — see the comparison below
      def = resolveDefault(s, ctx, !!from);
      if (def) stats.defaults[def.dynamic ? "dynamic" : def.src]++;
    } else {
      const jd = jsdocDefault(s); // plain interfaces: the documented @default
      if (jd != null) { def = { v: jd, src: "jsdoc" }; stats.plainDefaults++; }
    }
    return renderRow(s, { type: propType(s), def, from, noteKey: `${owner}.${s.getName()}` });
  };
  parts.push(`## ${kind.own}\n\n` + (own.length ? own.map((s) => row(s)).join("\n") : inherited.length ? `_(none declared here — all inherited)_` : `_(none)_`));

  const differ = [];
  const groups = new Map();
  for (const s of inherited.sort((a, b) => a.getName().localeCompare(b.getName()))) {
    const owner = ownerName(s) || "(other)";
    if (hasClass) { // a settings interface with no class of its own has no class defaults to differ
      // Code fallbacks don't count: they stay on the declaring interface's own rows.
      const here = resolveDefault(s, ctx, true);
      const ownerCls = classOfInterface(owner);
      const base = resolveDefault(s, classIndex.has(ownerCls) ? contextFor(ownerCls) : EMPTY_CTX, true);
      if (normDefault(here) !== normDefault(base)) { differ.push(row(s, owner)); continue; }
    }
    if (!groups.has(owner)) groups.set(owner, []);
    groups.get(owner).push(s.getName());
  }
  if (differ.length) {
    parts.push(`## Inherited ${kind.inherited} with a different default on ${className}\n\n` + differ.join("\n"));
  }
  if (groups.size) {
    const order = [...groups.keys()].sort((a, b) => {
      const ia = all.indexOf(a), ib = all.indexOf(b);
      return (ia < 0 ? 1e9 : ia) - (ib < 0 ? 1e9 : ib) || a.localeCompare(b);
    });
    parts.push(`## Other inherited ${kind.inherited}\n\n` +
      `Names only — see the declaring interface's page (e.g. \`get_api_reference("${order[0]}")\`) for types, defaults and descriptions.\n\n` +
      order.map((o) => `- _${o}_: ${groups.get(o).join(", ")}`).join("\n"));
  }
  finishPage(name, "interface", parts.join("\n\n"), node, secondary);
}
// A second public declaration of a name goes onto the first one's page as a section.
function finishPage(name, type, body, node, secondary) {
  if (secondary) addPage(name, type, body, { heading: `${name} (also declared in ${relFile(node)})` });
  else addPage(name, type, appendNotes(name, body));
}

function emitClass(node, secondary = false) {
  const name = node.name.text;
  const sym = checker.getSymbolAtLocation(node.name);
  const chain = classChain(name);
  const ex = exportOf(node);
  const isAbstract = (ts.getCombinedModifierFlags(node) & ts.ModifierFlags.Abstract) !== 0;

  const parts = [];
  const desc = docSection(sym, name, classSummary(name, chain, ex));
  if (desc) parts.push(desc);

  let imp;
  if (!ex) {
    imp = "Not exported from any `@amcharts/amcharts5` entry point (internal class).";
  } else if (ex.isDefault) {
    imp = "```js\n" + `import ${ex.alias} from "${ex.module}";` + (chain.includes("Theme") ? `\n\nroot.setThemes([${ex.alias}.new(root)]);` : "") + "\n```";
  } else {
    const usage = chain.includes("Entity") && !isAbstract ? `\n\n${ex.alias}.${ex.name}.new(root, { /* settings */ });` : "";
    imp = "```js\n" + `import * as ${ex.alias} from "${ex.module}";` + usage + "\n```";
  }
  parts.push("## Import\n\n" + imp);

  const ancestors = chain.slice(1);
  const outside = baseClassName(chain[chain.length - 1]); // e.g. HTMLElement
  if (outside && !classIndex.has(outside)) ancestors.push(outside);
  const inh = [`Extends: ${ancestors.length ? ancestors.join(" → ") : "(none)"}`];
  if (subclasses.has(name)) inh.push(`Extended by: ${subclasses.get(name).sort().join(", ")}`);
  parts.push("## Inheritance\n\n" + inh.join("\n"));

  const related = [["Settings", "Settings"], ["Private", "Private settings"], ["Events", "Events"], ["DataItem", "Data item fields"]]
    .filter(([k]) => interfaceIndex.has(`I${name}${k}`))
    .map(([k, label]) => `- ${label}: \`I${name}${k}\`${k === "Settings" ? " — get_api_reference shows it after this page" : ""}`);
  if (related.length) parts.push("## Settings and related interfaces\n\n" + related.join("\n"));

  const props = [];
  for (const m of node.members) {
    if (!(ts.isPropertyDeclaration(m) || ts.isGetAccessorDeclaration(m)) || !m.name || !ts.isIdentifier(m.name)) continue;
    const flags = ts.getCombinedModifierFlags(m);
    if (flags & (ts.ModifierFlags.Private | ts.ModifierFlags.Protected | ts.ModifierFlags.Static)) continue;
    if (m.name.text.startsWith("_")) continue;
    const psym = checker.getSymbolAtLocation(m.name);
    if (!psym || tagsOf(psym).ignore) continue;
    const jd = jsdocDefault(psym);
    props.push({
      name: m.name.text,
      line: renderRow(psym, { type: propType(psym), def: jd != null ? { v: jd, src: "jsdoc" } : null, noteKey: `${name}.${m.name.text}` }),
    });
  }
  props.sort((a, b) => a.name.localeCompare(b.name));
  if (props.length) parts.push("## Properties\n\nPublic properties (not settings):\n\n" + props.map((p) => p.line).join("\n"));

  finishPage(name, "class", parts.join("\n\n"), node, secondary);
}

function emitEnum(node, secondary = false) {
  const name = node.name.text;
  const sym = checker.getSymbolAtLocation(node.name);
  const members = node.members.map((m) => {
    const mn = m.name.getText().replace(/^["']|["']$/g, "");
    const val = m.initializer ? m.initializer.getText() : null;
    const msym = checker.getSymbolAtLocation(m.name);
    const d = msym ? docBlocks(docOf(msym)).filter((b) => b.text).map((b) => b.text).join(" ") : "";
    return `- **${mn}**${val != null ? ` = ${val}` : ""}${d ? ` — ${d}` : ""}`;
  });
  const body = [docSection(sym, name), typeImportLine(node), "## Members\n\n" + members.join("\n")].filter(Boolean).join("\n\n");
  finishPage(name, "enum", body, node, secondary);
}

function emitTypeAlias(node, secondary = false) {
  const name = node.name.text;
  const sym = checker.getSymbolAtLocation(node.name);
  const def = collapse(node.type.getText());
  const body = [docSection(sym, name), typeImportLine(node),
    "## Type\n\n```ts\n" + `type ${name}${node.typeParameters ? "<" + node.typeParameters.map((p) => p.getText()).join(", ") + ">" : ""} = ${def}` + "\n```"].filter(Boolean).join("\n\n");
  finishPage(name, "type", body, node, secondary);
}

// --- Functions ----------------------------------------------------------------
function signatureText(name, decl) {
  const sig = checker.getSignatureFromDeclaration(decl);
  // Method-style "(params): ret". Arrow style plus rewriting its first ") =>"
  // broke any signature with a callback parameter, e.g. am5.ready(f: () => void)
  return name + checker.signatureToString(sig, decl, ts.TypeFormatFlags.NoTruncation)
    .replace(/import\([^)]*\)\./g, "");
}
function functionBody(title, call, decls, imp) {
  const first = decls[0];
  const sym = checker.getSymbolAtLocation(first.name);
  const parts = [docSection(sym, title)].filter(Boolean);
  if (imp) parts.push("## Import\n\n```js\n" + imp + "\n```");
  parts.push("## Signature\n\n```ts\n" + decls.map((d) => signatureText(call, d)).join("\n") + "\n```");
  const params = [];
  for (const p of first.parameters) {
    const pname = p.name.getText();
    const ptype = checker.typeToString(checker.getTypeAtLocation(p), p, ts.TypeFormatFlags.NoTruncation).replace(/import\([^)]*\)\./g, "");
    const pdoc = ts.getJSDocParameterTags(p).map((t) => linkify(collapse(typeof t.comment === "string" ? t.comment : ts.getTextOfJSDocComment(t.comment) || ""))).join(" ");
    params.push(`- **${pname}** (\`${ptype}\`${p.questionToken || p.initializer ? ", optional" : ""})${pdoc ? ` — ${pdoc}` : ""}`);
  }
  if (params.length) parts.push("## Parameters\n\n" + params.join("\n"));
  const sig = checker.getSignatureFromDeclaration(first);
  const rtype = checker.typeToString(checker.getReturnTypeOfSignature(sig), first, ts.TypeFormatFlags.NoTruncation).replace(/import\([^)]*\)\./g, "");
  const rtag = ts.getJSDocReturnTag(first);
  const rdoc = rtag ? linkify(collapse(typeof rtag.comment === "string" ? rtag.comment : ts.getTextOfJSDocComment(rtag.comment) || "")) : "";
  parts.push(`## Returns\n\n\`${rtype}\`${rdoc ? ` — ${rdoc}` : ""}`);
  return parts.join("\n\n");
}
function emitFunction(fn) {
  // A default-exported function (e.g. themes/Monochrome) is called by its import name.
  const isDefault = fn.name === "default";
  const title = isDefault ? fn.decls[0].name.text : fn.name;
  const call = isDefault ? fn.alias : `${fn.alias}.${fn.name}`;
  const imp = isDefault
    ? `import ${fn.alias} from "${fn.module}";\n\n${call}(…);`
    : `import * as ${fn.alias} from "${fn.module}";\n\n${call}(…);`;
  const body = appendNotes(title, functionBody(title, call, fn.decls, imp));
  addPage(title, "function", body, { source: false, heading: `Function \`${call}()\`` });
}

function emitNamespace(ns) {
  const full = `${ns.alias}.${ns.name}`;
  const fns = [], others = [];
  for (const m of checker.getExportsOfModule(ns.sym).sort((a, b) => a.getName().localeCompare(b.getName()))) {
    const target = (m.flags & ts.SymbolFlags.Alias) ? checker.getAliasedSymbol(m) : m;
    const decls = (target.declarations || []).filter((d) => ts.isFunctionDeclaration(d));
    if (decls.length) {
      const t = tagsOf(target);
      const lead = docBlocks(docOf(target)).filter((b) => b.text).map((b) => b.text)[0] || "";
      fns.push(`- \`${signatureText(m.getName(), decls[0])}\`${lead ? ` — ${lead}` : ""}${t.since ? ` _Since ${t.since}._` : ""}`);
      if (ns.name === "ease" && ns.alias === "am5") {
        // Easing helpers get pages of their own, e.g. get_api_reference("ease.byName").
        const imp = `import * as am5 from "@amcharts/amcharts5";\n\n${full}.${m.getName()}(…);`;
        addPage(`${ns.name}.${m.getName()}`, "function", appendNotes(`${ns.name}.${m.getName()}`, functionBody(`${ns.name}.${m.getName()}`, `${full}.${m.getName()}`, decls, imp)), { source: false });
      }
    } else {
      const d = (target.declarations || [])[0];
      const kind = d ? (ts.isInterfaceDeclaration(d) ? "interface" : ts.isTypeAliasDeclaration(d) ? "type" : ts.isVariableDeclaration(d) ? "constant" : ts.isClassDeclaration(d) ? "class" : "member") : "member";
      others.push(`- \`${m.getName()}\` (${kind})`);
    }
  }
  const parts = [`Helpers exported as \`${full}\`.`, "## Import\n\n```js\n" + `import * as ${ns.alias} from "${ns.module}";\n\n${full}.…` + "\n```"];
  if (fns.length) parts.push("## Functions\n\n" + fns.join("\n"));
  if (others.length) parts.push("## Other members\n\n" + others.join("\n"));
  addPage(ns.name, "namespace", appendNotes(ns.name, parts.join("\n\n")), { source: false });
}

// ===========================================================================
// Walk
// ===========================================================================
const counts = { interface: 0, class: 0, enum: 0, type: 0, function: 0, namespace: 0 };
const EMIT = { class: emitClass, interface: emitInterface, enum: emitEnum, type: emitTypeAlias };
for (const n of primaryDecls) EMIT[declKind(n)](n, false);
for (const n of secondaryDecls) EMIT[declKind(n)](n, true);
for (const fn of exportedFunctions.values()) emitFunction(fn);
for (const ns of namespaces) emitNamespace(ns);
for (const p of pages.values()) counts[p.type] = (counts[p.type] || 0) + 1;

// --- Runtime-only cross-check -------------------------------------------------
// Settings a class reads with this.get("k") that its settings interface (with
// everything it inherits) does not declare: they work, but TypeScript won't offer them.
for (const [cname, ci] of classIndex) {
  const iface = interfaceIndex.get(`I${cname}Settings`);
  if (!iface) continue;
  const declared = new Set(checker.getPropertiesOfType(checker.getDeclaredTypeOfSymbol(checker.getSymbolAtLocation(iface.name))).map((s) => s.getName()));
  const missing = [...classCode(ci.file, cname).gets].filter((k) => !declared.has(k)).sort();
  if (missing.length) stats.runtimeOnly.push(`${cname}: ${missing.join(", ")}`);
}

// --- Write -------------------------------------------------------------------
// Only pages this generator made are replaced (see the check at the top).
fs.mkdirSync(OUT, { recursive: true });
for (const f of existingPages) {
  if (FORCE || isGeneratedPage(path.join(OUT, f))) fs.unlinkSync(path.join(OUT, f));
}
let bytes = 0;
for (const [file, p] of [...pages].sort((a, b) => a[0].localeCompare(b[0]))) {
  const fm = ["---", `title: "${p.title}"`, `type: "${p.type}"`];
  if (p.source) fm.push(`source: "${p.source}"`);
  fm.push(`generatedFrom: "${GENERATED_FROM}"`, "---", "");
  const content = fm.join("\n") + "\n" + p.body.trim().replace(/\n{3,}/g, "\n\n") + "\n";
  fs.writeFileSync(path.join(OUT, file), content);
  bytes += Buffer.byteLength(content);
}

// --- Report ------------------------------------------------------------------
const unused = [
  ...[...notes.member.keys()].filter((k) => !usedNotes.has("m:" + k)).map((k) => `member note ${k}`),
  ...[...notes.page.keys()].filter((k) => !usedNotes.has("p:" + k)).map((k) => `page note ${k}`),
  ...[...notes.since.keys()].filter((k) => !usedNotes.has("s:" + k)).map((k) => `@since override ${k}`),
];
console.error(`Wrote ${pages.size} pages (${(bytes / 1024 / 1024).toFixed(2)} MB) to ${path.relative(process.cwd(), OUT) || "."}`);
console.error(`  ${Object.entries(counts).map(([k, v]) => `${k}: ${v}`).join("   ")}`);
console.error(`  settings defaults shown — theme: ${stats.defaults.theme}, class: ${stats.defaults.class}, jsdoc: ${stats.defaults.jsdoc}, code fallback: ${stats.defaults.fallback}, computed at runtime: ${stats.defaults.dynamic}`);
console.error(`  @default shown on plain-interface rows: ${stats.plainDefaults}; summaries for undescribed classes: ${stats.summaries}`);
console.error(`  class defaults read: ${stats.classDefaults} (skipped ${stats.conditionalClassDefaults} conditional calls)`);
const list = (title, items) => { if (items.length) console.error(`  ${title}:\n    ${items.join("\n    ")}`); };
list("_setSoft overriding a theme rule", [...new Set(stats.softOverTheme)]);
list("dynamic (not statically known) defaults that hide a lower layer's value", [...stats.dynamicBlocked].sort());
list("declarations sharing a name", stats.collisions);
list("pages sharing a lookup name (appended as a section)", stats.appended);
list("runtime-only settings (read via this.get, not in the typings)", stats.runtimeOnly);
list("WARNING — notes not applied", unused);
list("WARNING — unrecognized lines in the notes file", notes.bad);
