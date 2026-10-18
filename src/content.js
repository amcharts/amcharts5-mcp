// ---------------------------------------------------------------------------
// Shared, transport-agnostic content layer.
//
// Pure logic only — NO filesystem, NO Node built-ins — so this module can be
// bundled into the Cloudflare Worker as-is. The stdio server reads files from
// disk (see content-fs.js) and the Worker imports a pre-generated bundle (see
// scripts/build-worker-content.js); both feed the same buildContent() here so
// the two deployments behave identically.
// ---------------------------------------------------------------------------

/** Chart type aliases → reference file mapping */
export const CHART_TYPE_MAP = {
  // XY family
  "xy": "xy", "line": "xy", "area": "xy", "bar": "xy", "column": "xy",
  "candlestick": "xy", "ohlc": "xy", "scatter": "xy", "bubble": "xy",
  "stacked": "xy", "stacked-bar": "xy", "stacked-column": "xy",
  "stacked-area": "xy", "range": "xy", "waterfall": "xy",
  // Pie family
  "pie": "pie", "donut": "pie", "funnel": "pie", "pyramid": "pie",
  "semi-circle": "pie", "pictorial": "pie", "sliced": "pie",
  // Map
  "map": "map", "choropleth": "map", "geo": "map", "geographic": "map",
  "world": "map", "country": "map", "bubble-map": "map", "point-map": "map",
  // Hierarchy
  "hierarchy": "hierarchy", "treemap": "hierarchy", "sunburst": "hierarchy",
  "force-directed": "hierarchy", "pack": "hierarchy", "partition": "hierarchy",
  "tree": "hierarchy", "org-chart": "hierarchy",
  // Flow
  "flow": "flow", "sankey": "flow", "chord": "flow", "arc": "flow",
  "alluvial": "flow",
  // Radar
  "radar": "radar", "spider": "radar", "polar": "radar", "gauge": "radar",
  "speedometer": "radar", "meter": "radar",
  // Stock
  "stock": "stock", "financial": "stock", "trading": "stock",
  // Timeline
  "timeline": "timeline", "serpentine": "timeline", "spiral": "timeline",
  "curve": "timeline",
  // Gantt
  "gantt": "gantt", "project-timeline": "gantt",
  // Word cloud
  "wordcloud": "wordcloud", "word-cloud": "wordcloud", "tag-cloud": "wordcloud",
  // Venn
  "venn": "venn",
  // UI
  "ui": "ui-elements", "ui-elements": "ui-elements", "button": "ui-elements",
  "slider": "ui-elements", "controls": "ui-elements",
};

export function parseSections(content) {
  const sections = [];
  const lines = content.split("\n");
  let currentHeading = "";
  let currentBody = [];

  for (const line of lines) {
    const headingMatch = line.match(/^(#{1,3})\s+(.+)/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const title = headingMatch[2].trim();
      if (level <= 2) {
        // Major section boundary (# or ##)
        if (currentHeading || currentBody.length > 0) {
          sections.push({ heading: currentHeading, body: currentBody.join("\n") });
        }
        currentHeading = title;
        currentBody = [];
      } else {
        // Sub-heading (###) — include in current section body
        currentBody.push(line);
      }
    } else {
      currentBody.push(line);
    }
  }
  if (currentHeading || currentBody.length > 0) {
    sections.push({ heading: currentHeading, body: currentBody.join("\n") });
  }
  return sections;
}

/**
 * Import sections carry two ### sub-blocks: one for ES modules, one for CDN /
 * script tags. Return only the requested one (esm | html), or "" if not found.
 */
export function extractImportBlock(body, format) {
  const lines = body.split("\n");
  const wantEsm = format === "esm";
  let capturing = false;
  let captured = [];
  let sawSub = false;
  for (const line of lines) {
    const sub = line.match(/^###\s+(.+)/);
    if (sub) {
      sawSub = true;
      const h = sub[1].toLowerCase();
      const isEsm = /es module|esm|typescript|import/.test(h);
      // Note: "typescript" contains "script", so match "script tag"/"cdn", not bare "script".
      const isCdn = /cdn|script tag|<script/.test(h);
      capturing = wantEsm ? isEsm : isCdn;
      continue;
    }
    if (capturing) captured.push(line);
  }
  if (!sawSub) return ""; // no sub-blocks → caller falls back to full body
  return captured.join("\n").trim();
}

/**
 * Build the in-memory content structures from raw markdown files.
 *
 * @param {{ skillFiles: Record<string,string>, extendedFiles: Record<string,string>, geodata?: object }} raw
 *   skillFiles  — name (no .md) → raw markdown for SKILL.md + references/*.md
 *   extendedFiles — path key (no .md) → raw markdown for everything under extended/
 *   geodata — the parsed extended/geodata/index.json (list_geodata), or null
 * @returns {{ docs: Map, extendedDocs: Map, examples: Map, geodata: object|null }}
 */
export function buildContent({ skillFiles = {}, extendedFiles = {}, geodata = null } = {}) {
  /** @type {Map<string, {title: string, content: string, sections: {heading: string, body: string}[]}>} */
  const docs = new Map();
  /** @type {Map<string, {title: string, content: string, sections: {heading: string, body: string}[], path: string}>} */
  const extendedDocs = new Map();
  /** @type {Map<string, {title: string, category: string, content: string, source: string}>} */
  const examples = new Map();

  // Skill docs (SKILL.md + references/*.md)
  for (const [name, content] of Object.entries(skillFiles)) {
    const titleMatch = content.match(/^#\s+(.+)/m);
    const title = titleMatch ? titleMatch[1] : name;
    docs.set(name, { title, content, sections: parseSections(content) });
  }

  // Extended docs + examples (frontmatter-tagged markdown)
  for (const [key, content] of Object.entries(extendedFiles)) {
    const fmMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    const body = fmMatch ? fmMatch[2].trim() : content;
    const fm = fmMatch ? fmMatch[1] : "";
    const titleMatch = fm.match(/title:\s*"(.+?)"/);
    const categoryMatch = fm.match(/category:\s*"(.+?)"/);
    const sourceMatch = fm.match(/source:\s*"(.+?)"/);
    const fallbackTitle = key.split("/").pop();
    const title = titleMatch ? titleMatch[1] : fallbackTitle;

    if (key.startsWith("examples/")) {
      examples.set(key, {
        title,
        category: categoryMatch ? categoryMatch[1] : "",
        content: body,
        source: sourceMatch ? sourceMatch[1] : "",
      });
    } else {
      extendedDocs.set(key, {
        title,
        content: body,
        sections: parseSections(body),
        path: key,
      });
    }
  }

  return { docs, extendedDocs, examples, geodata };
}

/**
 * API reference pages end with a names-only "Other inherited …" list (every
 * settings page repeats e.g. ISpriteSettings' names). Searching it would rank
 * hundreds of pages equal to the one that declares the setting, so search
 * skips it; get_api_reference / get_section still return it.
 */
export function isUnsearchedSection(key, section) {
  return key.startsWith("reference/") && section.heading.startsWith("Other inherited ");
}

// ---------------------------------------------------------------------------
// Search — one ranked index shared by search_docs and search_all.
//
// Every searchable unit goes into one index: each section of a skill doc, each
// section of an extended doc, and each example (title + prose + code). Both
// tools rank through rankContent(), so they agree on what is relevant.
//
// Ranking is BM25 over word tokens, plus:
//  - identifiers are words: `strokeSettings` indexes as strokesettings, stroke
//    and settings, so a query that names an API identifier pins the pages and
//    examples whose code uses it — and a rare identifier weighs far more than
//    common words like "line" or "chart";
//  - title fields (section heading, doc title + path, example title) weigh
//    more than body text, and a unit whose titles cover most of the query is
//    boosted, so an example titled like the query ranks near the top;
//  - coverage: a unit's score is scaled by the share of the query (weighted by
//    rarity) it matches at all, so a long generic section that happens to use
//    a few common query words can't outrank one that matches all of them;
//  - length normalisation within each kind (skill / docs / examples), so a
//    section doesn't win just by being long.
// ---------------------------------------------------------------------------

const STOPWORDS = new Set((
  "a an the of to in on at by for from with without via and or not no nor is are was were be been " +
  "it its this that these those how what which when where who why do does did can could should would " +
  "will i me my we our you your use using used into onto as than then so if but about any each some " +
  "such only also just want need like per"
).split(" "));

// Words the suffix rules below would mangle or split from their partner.
const STEM_EXCEPTIONS = new Map([
  ["axes", "axis"], ["series", "series"], ["canvas", "canvas"], ["alias", "alias"],
  ["setting", "setting"], ["settings", "setting"], ["string", "string"], ["strings", "string"],
]);

/**
 * Light stemmer: folds plurals and -ing / -ed / trailing-e forms so "changing"
 * meets "change", "dragged" meets "drag", "dots" meets "dot". "-able" is kept:
 * every example's comments say "drag the plot", so folding "draggable" into
 * "drag" would make it match everything.
 * Applied identically to the index and the query, so a stem only has to be
 * consistent, not a real word.
 */
export function stem(word) {
  let w = word;
  if (w.length <= 3 || /[0-9]/.test(w)) return w; // short words, am5xy, congressional2022
  const exception = STEM_EXCEPTIONS.get(w);
  if (exception) return exception;
  if (w.endsWith("ies") && w.length > 4) w = w.slice(0, -3) + "y";
  else if (/(?:ss|us|is)$/.test(w)) { /* class, status, axis: not plurals */ }
  else if (/(?:x|z|ch|sh|ss)es$/.test(w)) w = w.slice(0, -2);
  else if (w.endsWith("s")) w = w.slice(0, -1);
  const m = w.match(/^(.{3,}?)(?:ing|ed)$/);
  if (m) {
    w = m[1];
    // dragg → drag, but keep fill / pass / buzz
    if (/([b-df-hj-np-tv-z])\1$/.test(w) && !/(?:ll|ss|zz)$/.test(w)) w = w.slice(0, -1);
  }
  if (w.length > 4 && w.endsWith("e")) w = w.slice(0, -1);
  return w;
}

const WORD_RE = /[A-Za-z0-9]+/g;
// camelCase / PascalCase humps: "IPixelMapSeries" → I, Pixel, Map, Series; "XYChart" → XY, Chart
const HUMP_RE = /[A-Z]+(?![a-z])|[A-Z]?[a-z]+|[0-9]+/g;

/**
 * Text → stemmed lowercase tokens. A mixed-case identifier yields itself AND
 * its humps, so "strokeSettings" matches a query for "strokeSettings" (exact,
 * rare, high weight) as well as one for "stroke settings".
 */
export function tokenize(text) {
  const out = [];
  WORD_RE.lastIndex = 0;
  let m;
  while ((m = WORD_RE.exec(text))) {
    const tokens = wordTokens(m[0]);
    for (let i = 0; i < tokens.length; i++) out.push(tokens[i]);
  }
  return out;
}

// The corpus has a few million words but only tens of thousands of distinct
// ones, so memoise word → tokens (stem + humps). Bounded so a long-running
// server fed odd queries can't grow it without limit.
const wordCache = new Map();
function wordTokens(word) {
  let tokens = wordCache.get(word);
  if (tokens) return tokens;
  const lower = word.toLowerCase();
  tokens = [stem(lower)];
  if (word !== lower && /[a-z]/.test(word)) { // mixed case: an identifier
    const humps = word.match(HUMP_RE);
    if (humps && humps.length > 1) {
      for (const h of humps) if (h.length > 1) tokens.push(stem(h.toLowerCase()));
    }
  }
  if (wordCache.size > 200000) wordCache.clear();
  wordCache.set(word, tokens);
  return tokens;
}

/**
 * Query → search terms: stemmed, deduplicated, stop words dropped (unless the
 * query is nothing but stop words). Each term keeps the humps of the word it
 * came from, used when the whole identifier is not in the index at all.
 */
export function queryTerms(query) {
  const words = String(query || "").match(WORD_RE) || [];
  const all = [];
  const kept = [];
  for (const word of words) {
    const lower = word.toLowerCase();
    const humps = (word.match(HUMP_RE) || []).filter(h => h.length > 1).map(h => stem(h.toLowerCase()));
    const term = { term: stem(lower), humps: humps.length > 1 ? humps : [] };
    all.push(term);
    if (!STOPWORDS.has(lower)) kept.push(term);
  }
  const seen = new Set();
  return (kept.length ? kept : all).filter(t => !seen.has(t.term) && seen.add(t.term));
}

let lastLineQuery = null;
let lastLineTerms = null;

/** Does this line contain any of the query's terms? (For quoting matches.) */
export function lineMatchesQuery(line, query) {
  if (query !== lastLineQuery) {
    lastLineQuery = query;
    lastLineTerms = new Set(queryTerms(query).map(t => t.term));
  }
  return tokenize(line).some(t => lastLineTerms.has(t));
}

const normalizeTitle = (s) => String(s || "").toLowerCase().replace(/[^a-z0-9]/g, "");

const KIND_SKILL = 0, KIND_EXTENDED = 1, KIND_EXAMPLE = 2;
const KIND_NAMES = ["skill", "extended", "example"];
// Title field weights per kind: [primary, secondary].
//   sections: primary = section heading, secondary = doc title + path
//   examples: primary = example title + slug, secondary = category
const TITLE_WEIGHTS = [[1.5, 1.0], [1.5, 1.0], [2.5, 0.5]];
// The skill is the curated layer; nudge it ahead of the exhaustive extended
// docs on near-ties.
const KIND_BOOST = [1.1, 1.0, 1.0];
// Weight of an identifier's humps when the identifier itself is in the query.
const AUX_FACTOR = 0.3;
// Score factor for the 2nd, 3rd, … section of the same doc in one result list.
const SAME_DOC_DECAY = 0.8;
const BM25_K1 = 1.2;
const BM25_B = 0.75;

const indexCache = new WeakMap();

function buildSearchIndex(content) {
  const units = [];
  const kinds = [];
  const lengths = [];
  const exactTitles = [];
  const bodyPostings = new Map();  // term → [unit, tf, unit, tf, …]
  const titlePostings = new Map(); // term → [unit, fieldMask, …]  (1 primary, 2 secondary)
  const df = new Map();

  function add(kind, unit, primaryText, secondaryText, bodyText, exact) {
    const u = units.length;
    units.push(unit);
    kinds.push(kind);
    exactTitles.push(exact.map(normalizeTitle).filter(Boolean));

    const tf = new Map();
    const bodyTokens = tokenize(bodyText);
    for (const t of bodyTokens) tf.set(t, (tf.get(t) || 0) + 1);
    lengths.push(bodyTokens.length);

    const fields = new Map();
    for (const t of tokenize(primaryText)) fields.set(t, (fields.get(t) || 0) | 1);
    for (const t of tokenize(secondaryText)) fields.set(t, (fields.get(t) || 0) | 2);

    for (const [t, n] of tf) {
      let p = bodyPostings.get(t);
      if (!p) bodyPostings.set(t, (p = []));
      p.push(u, n);
      df.set(t, (df.get(t) || 0) + 1);
    }
    for (const [t, mask] of fields) {
      let p = titlePostings.get(t);
      if (!p) titlePostings.set(t, (p = []));
      p.push(u, mask);
      if (!tf.has(t)) df.set(t, (df.get(t) || 0) + 1);
    }
  }

  const pathWords = (key) => key.split("/").join(" ").replace(/-/g, " ");

  for (const [name, doc] of content.docs) {
    for (const section of doc.sections) {
      add(KIND_SKILL,
        { kind: "skill", file: name, docTitle: doc.title, heading: section.heading, body: section.body },
        section.heading || doc.title, `${doc.title} ${name}`, section.body, [section.heading]);
    }
  }
  for (const [key, doc] of content.extendedDocs) {
    for (const section of doc.sections) {
      if (isUnsearchedSection(key, section)) continue;
      add(KIND_EXTENDED,
        { kind: "extended", file: key, docTitle: doc.title, heading: section.heading, body: section.body },
        // A page's untitled intro speaks for the whole page: its title is the doc title.
        section.heading || doc.title, `${doc.title} ${pathWords(key)}`, section.body, [section.heading, doc.title]);
    }
  }
  for (const [key, ex] of content.examples) {
    const slug = key.split("/").pop();
    add(KIND_EXAMPLE,
      { kind: "example", file: key, docTitle: ex.title, heading: ex.category, body: ex.content },
      `${ex.title} ${slug.replace(/-/g, " ")}`, ex.category.replace(/-/g, " "), ex.content, [ex.title, slug]);
  }

  const avgLength = [0, 0, 0];
  const counts = [0, 0, 0];
  for (let u = 0; u < units.length; u++) { avgLength[kinds[u]] += lengths[u]; counts[kinds[u]]++; }
  for (let k = 0; k < 3; k++) avgLength[k] = counts[k] ? avgLength[k] / counts[k] : 1;

  // Compact: typed arrays hold the postings in a third of the memory of the
  // growable arrays they were built in (this matters in the Worker's 128 MB).
  for (const postings of [bodyPostings, titlePostings]) {
    for (const [t, p] of postings) postings.set(t, Int32Array.from(p));
  }
  wordCache.clear();

  return {
    units,
    kinds: Uint8Array.from(kinds),
    lengths: Uint32Array.from(lengths),
    exactTitles,
    bodyPostings,
    titlePostings,
    df,
    avgLength,
  };
}

function getSearchIndex(content) {
  let index = indexCache.get(content);
  if (!index) {
    index = buildSearchIndex(content);
    indexCache.set(content, index);
  }
  return index;
}

/**
 * Rank every searchable unit against a query.
 *
 * @param {{docs: Map, extendedDocs: Map, examples: Map}} content
 * @param {string} query
 * @param {{kinds?: string[], maxResults?: number, explain?: boolean}} [options]
 *   kinds — any of "skill", "extended", "example" (default: all three)
 *   explain — attach each result's score components as `why` (for tuning)
 * @returns {{ total: number, results: {kind, file, docTitle, heading, body, score}[] }}
 */
export function rankContent(content, query, { kinds = KIND_NAMES, maxResults = 10, explain = false } = {}) {
  // 1..50; 0, NaN or a non-number means the default (a negative used to slice
  // off only the last result and dump the rest of the index)
  maxResults = Math.max(1, Math.min(50, Math.floor(Number(maxResults)) || 10));
  const index = getSearchIndex(content);
  const { units, lengths, avgLength, df, bodyPostings, titlePostings, exactTitles } = index;
  const unitKinds = index.kinds;
  const n = units.length;
  const allowed = KIND_NAMES.map(k => kinds.includes(k));

  // Resolve query terms against the index. An identifier the index has never
  // seen ("lineSeriesStroke") falls back to its humps (line, series, stroke).
  // One it has seen keeps its humps as weak auxiliary terms: they don't decide
  // whether a unit matches, but among units that use "createAxisRange" they
  // lift the ones about axis ranges (the "Axis ranges" page) over the ones
  // that merely call it.
  const weighted = [];
  const idfOf = (t) => { const d = df.get(t); return Math.log(1 + (n - d + 0.5) / (d + 0.5)); };
  const terms = queryTerms(query);
  for (const { term, humps } of terms) {
    const resolved = df.has(term) ? [term] : humps.filter(h => df.has(h));
    for (const t of resolved) {
      const existing = weighted.find(w => w.term === t);
      if (existing) { existing.factor = 1; continue; }
      weighted.push({ term: t, idf: idfOf(t), factor: 1 });
    }
  }
  for (const { term, humps } of terms) {
    if (!df.has(term)) continue;
    for (const h of humps) {
      if (df.has(h) && !weighted.some(w => w.term === h)) weighted.push({ term: h, idf: idfOf(h), factor: AUX_FACTOR });
    }
  }
  const totalWeight = weighted.reduce((sum, w) => sum + (w.factor === 1 ? w.idf : 0), 0);
  if (!totalWeight) return { total: 0, results: [] };

  const score = new Float64Array(n);
  const matched = new Float64Array(n);
  const titled = new Float64Array(n);
  const lastTerm = new Int32Array(n).fill(-1);
  const touched = [];

  weighted.forEach(({ term, idf: rawIdf, factor }, ti) => {
    const idf = rawIdf * factor;
    const counts = factor === 1; // auxiliary terms don't count towards coverage
    const body = bodyPostings.get(term);
    if (body) {
      for (let i = 0; i < body.length; i += 2) {
        const u = body[i];
        const tf = body[i + 1];
        const norm = BM25_K1 * (1 - BM25_B + BM25_B * lengths[u] / avgLength[unitKinds[u]]);
        score[u] += idf * (tf * (BM25_K1 + 1)) / (tf + norm);
        if (lastTerm[u] === -1) touched.push(u);
        if (lastTerm[u] !== ti) { if (counts) matched[u] += idf; lastTerm[u] = ti; }
      }
    }
    const title = titlePostings.get(term);
    if (title) {
      for (let i = 0; i < title.length; i += 2) {
        const u = title[i];
        const mask = title[i + 1];
        const [wPrimary, wSecondary] = TITLE_WEIGHTS[unitKinds[u]];
        score[u] += idf * ((mask & 1 ? wPrimary : 0) + (mask & 2 ? wSecondary : 0));
        // Only the primary title (heading / example title) counts fully as
        // "the title says it"; a doc title or category is shared by many units.
        titled[u] += mask & 1 ? idf : (mask & 2 ? idf * 0.5 : 0);
        if (lastTerm[u] === -1) touched.push(u);
        if (lastTerm[u] !== ti) { if (counts) matched[u] += idf; lastTerm[u] = ti; }
      }
    }
  });

  const exactQuery = normalizeTitle(query);
  const ranked = [];
  for (const u of touched) {
    const kind = unitKinds[u];
    if (!allowed[kind]) continue;
    const coverage = matched[u] / totalWeight;
    const titleCoverage = Math.min(1, titled[u] / totalWeight);
    let s = score[u] * coverage * coverage * (1 + 2 * titleCoverage * titleCoverage) * KIND_BOOST[kind];
    if (exactQuery && exactTitles[u].includes(exactQuery)) s *= 2;
    if (!(s > 0)) continue; // matched auxiliary terms only
    ranked.push(explain ? { u, s, why: { bm25: score[u], coverage, titleCoverage } } : { u, s });
  }
  ranked.sort((a, b) => b.s - a.s);

  // Variety: each further section of the same doc counts a little less, so one
  // long page can't take every slot from the next-best doc or example.
  const seenPerDoc = new Map();
  for (const r of ranked) {
    const doc = unitKinds[r.u] + ":" + units[r.u].file;
    const seen = seenPerDoc.get(doc) || 0;
    if (seen) r.s *= Math.pow(SAME_DOC_DECAY, seen);
    seenPerDoc.set(doc, seen + 1);
  }
  ranked.sort((a, b) => b.s - a.s);

  const results = ranked.slice(0, maxResults).map(({ u, s, why }) => ({
    ...units[u],
    body: units[u].body.trim(),
    score: Math.round(s * 100) / 100,
    ...(why ? { why } : {}),
  }));
  return { total: ranked.length, results };
}

/**
 * Ranked search for search_docs: the skill docs only (scope "skill"), or the
 * skill docs + extended docs + examples (scope "all").
 * @param {{docs: Map, extendedDocs: Map, examples: Map}} content
 */
export function searchDocs(content, query, maxResults = 10, scope = "skill") {
  const kinds = scope === "all" ? KIND_NAMES : ["skill"];
  return rankContent(content, query, { kinds, maxResults }).results;
}
