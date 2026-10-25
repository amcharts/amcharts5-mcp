// The amCharts docs moved from www.amcharts.com/docs/v5/ to docs.amcharts.com/v5/
// (October 2026). The old addresses redirect, but a redirect loses the section
// anchor, and the new site writes its anchors differently ("#Global_events"
// became "#global-events"). rewriteDocsLinks() turns the old docs links in a
// text into new ones:
// - the same path on docs.amcharts.com, except the few pages that moved (MOVED);
// - reference paths in lower case, as the new site has them;
// - the anchor as the new page has it, from docs-anchors.json, which
//   scripts/map-docs-anchors.cjs builds from the live pages. An anchor whose
//   section is gone is dropped, so the link opens the page. An anchor that
//   isn't in the table gets the new site's usual form (lower case, "_" -> "-").
// Used by the reference generator, and once over the docs, examples and skill.

const ANCHORS = require("./docs-anchors.json"); // "new/path/#Old_anchor": "new-anchor" or ""

// Pages at a new path. By hand: pages the new site has no redirect for (their
// old path is a 404 there). A target with "#" replaces the old anchor too.
const MOVED_BY_HAND = {
  "charts/stock-chart/": "charts/stock/",
  "charts/stock-chart/stock-legend/": "charts/stock/stock-legend/",
  "charts/timeline-chart/": "charts/timeline/",
  "concepts/using-formatters/": "concepts/formatters/",
  "concepts/common-elements/polygon/": "concepts/common-elements/graphics/",
  "concepts/cors/": "concepts/common-elements/images/#cross-domain-issues",
  "themes/": "concepts/themes/",
  "tutorials/creating-translations/": "concepts/locales/creating-translations/",
  "getting-started/integrations/using-amcharts-5-with-remix/": "getting-started/integrations/remix/",
  "getting-started/integrations/using-amcharts-5-with-sveltekit/": "getting-started/integrations/sveltekit/",
};
// And the redirects the new site has (e.g. concepts/states/ -> concepts/settings/states/),
// which scripts/map-docs-anchors.cjs records, so links skip the extra hop
const MOVED = { ...require("./docs-moved.json"), ...MOVED_BY_HAND };

// An old docs link as it appears in text, including Markdown-escaped "\_".
// Braces end it: the typings write `{@link https://…/charts/hierarchy/}`.
const OLD_DOCS_LINK = /https?:\/\/(?:www\.)?amcharts\.com\/docs\/v5\/?(?:[^\s)"'`<>\]\\{}]|\\_)*/g;

// An old docs path in one form: "charts/xy-chart/axes" -> "charts/xy-chart/axes/",
// reference paths in lower case, as the new site has them
function oldPath(path) {
  let p = path.replace(/^\/+/, "");
  if (p && !p.endsWith("/")) p += "/";
  if (p.startsWith("reference/")) p = p.toLowerCase();
  return p;
}
// ...and where that page is on the new site
const newPath = (path) => { const p = oldPath(path); return MOVED[p] || p; };

// The new site's usual id for a heading: lower case, one "-" per space, other
// punctuation dropped. A dropped "&" between spaces leaves "--", as the new
// site has it ("Standalone usage & API" is "#standalone-usage--api").
const usualAnchor = (a) => a.toLowerCase().replace(/_/g, "-").replace(/[^a-z0-9-]/g, "").replace(/^-+|-+$/g, "");

// One old docs URL (no trailing punctuation, no Markdown escapes) -> the new URL
function newDocsUrl(url) {
  const m = /^https?:\/\/(?:www\.)?amcharts\.com\/docs\/v5\/?([^#?]*)(?:\?[^#]*)?(?:#(.*))?$/.exec(url);
  if (!m) return url;
  const p = newPath(m[1]);
  if (p.includes("#")) return "https://docs.amcharts.com/v5/" + p; // moved to a section of another page
  const base = "https://docs.amcharts.com/v5/" + p;
  if (!m[2]) return base;
  let anchor = m[2];
  try { anchor = decodeURIComponent(anchor); } catch {}
  const key = `${p}#${anchor}`;
  const mapped = Object.prototype.hasOwnProperty.call(ANCHORS, key) ? ANCHORS[key] : usualAnchor(anchor);
  return mapped ? `${base}#${mapped}` : base;
}

// Every old docs link in a text, rewritten. Punctuation that ends a sentence
// stays outside the link.
function rewriteDocsLinks(text) {
  return text.replace(OLD_DOCS_LINK, (raw) => {
    const tail = /[.,;:!?]+$/.exec(raw);
    const link = (tail ? raw.slice(0, -tail[0].length) : raw).split("\\_").join("_");
    return newDocsUrl(link) + (tail ? tail[0] : "");
  });
}

module.exports = { OLD_DOCS_LINK, MOVED, MOVED_BY_HAND, oldPath, newPath, usualAnchor, newDocsUrl, rewriteDocsLinks };
