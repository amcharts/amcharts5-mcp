#!/usr/bin/env node

/**
 * Scrapes amCharts 5 documentation pages and saves them as clean markdown
 * in the extended/ directory.
 *
 * Usage: node scripts/scrape-docs.js
 *
 * Dependencies: npm install turndown jsdom
 */

import fs from "fs/promises";
import path from "path";
import { JSDOM } from "jsdom";
import TurndownService from "turndown";

// All documentation URLs to scrape
const URLS = [
  // Getting Started
  "https://www.amcharts.com/docs/v5/getting-started/",
  "https://www.amcharts.com/docs/v5/getting-started/root-element/",
  "https://www.amcharts.com/docs/v5/getting-started/integrations/",
  "https://www.amcharts.com/docs/v5/getting-started/integrations/react/",
  "https://www.amcharts.com/docs/v5/getting-started/integrations/angular/",
  "https://www.amcharts.com/docs/v5/getting-started/integrations/vue/",
  "https://www.amcharts.com/docs/v5/getting-started/integrations/next-js/",
  "https://www.amcharts.com/docs/v5/getting-started/integrations/jest/",
  "https://www.amcharts.com/docs/v5/getting-started/integrations/nuxt/",
  "https://www.amcharts.com/docs/v5/getting-started/integrations/ember-js/",
  "https://www.amcharts.com/docs/v5/getting-started/integrations/using-amcharts-5-with-sveltekit/",
  "https://www.amcharts.com/docs/v5/getting-started/integrations/using-amcharts-5-with-remix/",
  "https://www.amcharts.com/docs/v5/getting-started/integrations/cypress/",

  // Charts - XY
  "https://www.amcharts.com/docs/v5/charts/xy-chart/",
  "https://www.amcharts.com/docs/v5/charts/xy-chart/axes/",
  "https://www.amcharts.com/docs/v5/charts/xy-chart/axes/value-axis/",
  "https://www.amcharts.com/docs/v5/charts/xy-chart/axes/date-axis/",
  "https://www.amcharts.com/docs/v5/charts/xy-chart/axes/category-axis/",
  "https://www.amcharts.com/docs/v5/charts/xy-chart/axes/gapless-date-axis/",
  "https://www.amcharts.com/docs/v5/charts/xy-chart/axes/duration-axis/",
  "https://www.amcharts.com/docs/v5/charts/xy-chart/axes/axis-ranges/",
  "https://www.amcharts.com/docs/v5/charts/xy-chart/axes/axis-headers/",
  "https://www.amcharts.com/docs/v5/charts/xy-chart/series/",
  "https://www.amcharts.com/docs/v5/charts/xy-chart/series/line-series/",
  "https://www.amcharts.com/docs/v5/charts/xy-chart/series/column-series/",
  "https://www.amcharts.com/docs/v5/charts/xy-chart/series/step-line-series/",
  "https://www.amcharts.com/docs/v5/charts/xy-chart/series/candlestick-series/",
  "https://www.amcharts.com/docs/v5/charts/xy-chart/series/smoothed-series/",
  "https://www.amcharts.com/docs/v5/charts/xy-chart/zoom-and-pan/",
  "https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/",
  "https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/",
  "https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/",
  "https://www.amcharts.com/docs/v5/charts/xy-chart/xy-chart-containers/",

  // Charts - Percent/Pie
  "https://www.amcharts.com/docs/v5/charts/percent-charts/",
  "https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/",
  "https://www.amcharts.com/docs/v5/charts/percent-charts/sliced-chart/",
  "https://www.amcharts.com/docs/v5/charts/percent-charts/sliced-chart/funnel-series/",
  "https://www.amcharts.com/docs/v5/charts/percent-charts/sliced-chart/pyramid-series/",
  "https://www.amcharts.com/docs/v5/charts/percent-charts/sliced-chart/pictorial-stacked-series/",
  "https://www.amcharts.com/docs/v5/charts/percent-charts/legend-percent-series/",
  "https://www.amcharts.com/docs/v5/charts/percent-charts/grouping-slices/",

  // Charts - Radar
  "https://www.amcharts.com/docs/v5/charts/radar-chart/",
  "https://www.amcharts.com/docs/v5/charts/radar-chart/radar-axes/",
  "https://www.amcharts.com/docs/v5/charts/radar-chart/radar-series/",
  "https://www.amcharts.com/docs/v5/charts/radar-chart/gauge-charts/",

  // Charts - Map
  "https://www.amcharts.com/docs/v5/charts/map-chart/",
  "https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/",
  "https://www.amcharts.com/docs/v5/charts/map-chart/map-line-series/",
  "https://www.amcharts.com/docs/v5/charts/map-chart/map-point-series/",
  "https://www.amcharts.com/docs/v5/charts/map-chart/clustered-point-series/",
  "https://www.amcharts.com/docs/v5/charts/map-chart/graticule-series/",
  "https://www.amcharts.com/docs/v5/charts/map-chart/map-pan-zoom/",
  "https://www.amcharts.com/docs/v5/charts/map-chart/map-drill-down/",
  "https://www.amcharts.com/docs/v5/charts/map-chart/country-data/",
  "https://www.amcharts.com/docs/v5/charts/map-chart/map-translations/",
  "https://www.amcharts.com/docs/v5/charts/map-chart/map-api/",

  // Charts - Hierarchy
  "https://www.amcharts.com/docs/v5/charts/hierarchy/",
  "https://www.amcharts.com/docs/v5/charts/hierarchy/force-directed/",
  "https://www.amcharts.com/docs/v5/charts/hierarchy/treemap/",
  "https://www.amcharts.com/docs/v5/charts/hierarchy/partition/",
  "https://www.amcharts.com/docs/v5/charts/hierarchy/tree/",
  "https://www.amcharts.com/docs/v5/charts/hierarchy/sunburst/",
  "https://www.amcharts.com/docs/v5/charts/hierarchy/pack/",
  "https://www.amcharts.com/docs/v5/charts/hierarchy/voronoi-treemap/",
  "https://www.amcharts.com/docs/v5/charts/hierarchy/hierarchy-node-colors/",
  "https://www.amcharts.com/docs/v5/charts/hierarchy/hierarchy-drill-down/",
  "https://www.amcharts.com/docs/v5/charts/hierarchy/breadcrumbs/",
  "https://www.amcharts.com/docs/v5/charts/hierarchy/legend-hierarchy-series/",
  "https://www.amcharts.com/docs/v5/charts/hierarchy/hierarchy-link-bullets/",
  "https://www.amcharts.com/docs/v5/charts/hierarchy/hierarchy-api/",

  // Charts - Flow
  "https://www.amcharts.com/docs/v5/charts/flow-charts/",
  "https://www.amcharts.com/docs/v5/charts/flow-charts/sankey-diagram/",
  "https://www.amcharts.com/docs/v5/charts/flow-charts/chord-diagram/",
  "https://www.amcharts.com/docs/v5/charts/flow-charts/arc-diagram/",
  "https://www.amcharts.com/docs/v5/charts/flow-charts/flow-chart-bullets/",

  // Charts - Specialized
  "https://www.amcharts.com/docs/v5/charts/word-cloud/",
  "https://www.amcharts.com/docs/v5/charts/venn/",
  "https://www.amcharts.com/docs/v5/charts/timeline/",
  "https://www.amcharts.com/docs/v5/charts/gantt/",
  "https://www.amcharts.com/docs/v5/charts/gantt/serializing-gantt-data/",
  "https://www.amcharts.com/docs/v5/charts/gantt/cgantt-appearance/",

  // Charts - Stock
  "https://www.amcharts.com/docs/v5/charts/stock/",
  "https://www.amcharts.com/docs/v5/charts/stock/panels/",
  "https://www.amcharts.com/docs/v5/charts/stock/stock-legend/",
  "https://www.amcharts.com/docs/v5/charts/stock/indicators/",
  "https://www.amcharts.com/docs/v5/charts/stock/percent-mode/",
  "https://www.amcharts.com/docs/v5/charts/stock/stock-annotations/",
  "https://www.amcharts.com/docs/v5/charts/stock/serializing-indicators-annotations/",
  "https://www.amcharts.com/docs/v5/charts/stock/translating-stock-chart/",

  // Concepts
  "https://www.amcharts.com/docs/v5/concepts/",
  "https://www.amcharts.com/docs/v5/concepts/settings/",
  "https://www.amcharts.com/docs/v5/concepts/settings/states/",
  "https://www.amcharts.com/docs/v5/concepts/settings/list-templates/",
  "https://www.amcharts.com/docs/v5/concepts/settings/template-fields/",
  "https://www.amcharts.com/docs/v5/concepts/settings/adapters/",
  "https://www.amcharts.com/docs/v5/concepts/settings/heat-rules/",
  "https://www.amcharts.com/docs/v5/concepts/data/",
  "https://www.amcharts.com/docs/v5/concepts/data/net-load-utility/",
  "https://www.amcharts.com/docs/v5/concepts/legend/",
  "https://www.amcharts.com/docs/v5/concepts/legend/heat-legend/",
  "https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/",
  "https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/gradients/",
  "https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/patterns/",
  "https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/shadows/",
  "https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/filters/",
  "https://www.amcharts.com/docs/v5/concepts/common-elements/",
  "https://www.amcharts.com/docs/v5/concepts/common-elements/bullets/",
  "https://www.amcharts.com/docs/v5/concepts/common-elements/labels/",
  "https://www.amcharts.com/docs/v5/concepts/common-elements/graphics/",
  "https://www.amcharts.com/docs/v5/concepts/common-elements/images/",
  "https://www.amcharts.com/docs/v5/concepts/common-elements/buttons/",
  "https://www.amcharts.com/docs/v5/concepts/common-elements/containers/",
  "https://www.amcharts.com/docs/v5/concepts/common-elements/tooltips/",
  "https://www.amcharts.com/docs/v5/concepts/common-elements/modals/",
  "https://www.amcharts.com/docs/v5/concepts/common-elements/layers/",
  "https://www.amcharts.com/docs/v5/concepts/common-elements/html-content/",
  "https://www.amcharts.com/docs/v5/concepts/formatters/",
  "https://www.amcharts.com/docs/v5/concepts/formatters/formatting-numbers/",
  "https://www.amcharts.com/docs/v5/concepts/formatters/formatting-dates/",
  "https://www.amcharts.com/docs/v5/concepts/formatters/formatting-durations/",
  "https://www.amcharts.com/docs/v5/concepts/formatters/data-placeholders/",
  "https://www.amcharts.com/docs/v5/concepts/formatters/text-styling/",
  "https://www.amcharts.com/docs/v5/concepts/themes/",
  "https://www.amcharts.com/docs/v5/concepts/themes/creating-themes/",
  "https://www.amcharts.com/docs/v5/concepts/events/",
  "https://www.amcharts.com/docs/v5/concepts/locales/",
  "https://www.amcharts.com/docs/v5/concepts/locales/creating-translations/",
  "https://www.amcharts.com/docs/v5/concepts/locales/right-to-left-support/",
  "https://www.amcharts.com/docs/v5/concepts/responsive/",
  "https://www.amcharts.com/docs/v5/concepts/exporting/",
  "https://www.amcharts.com/docs/v5/concepts/exporting/exporting-images/",
  "https://www.amcharts.com/docs/v5/concepts/exporting/exporting-data/",
  "https://www.amcharts.com/docs/v5/concepts/exporting/exporting-pdf/",
  "https://www.amcharts.com/docs/v5/concepts/exporting/printing/",
  "https://www.amcharts.com/docs/v5/concepts/exporting/export-menu/",
  "https://www.amcharts.com/docs/v5/concepts/exporting/annotator/",
  "https://www.amcharts.com/docs/v5/concepts/exporting/exporting-api/",
  "https://www.amcharts.com/docs/v5/concepts/accessibility/",
  "https://www.amcharts.com/docs/v5/concepts/animations/",
  "https://www.amcharts.com/docs/v5/concepts/serializing/",
  "https://www.amcharts.com/docs/v5/concepts/serializing/chart-serializer/",

  // Migration & Reference
  "https://www.amcharts.com/docs/v5/migrating-from-amcharts-4/",
];

const DELAY_MS = 1000;
const BASE_URL_PREFIX = "/docs/v5/";
const OUTPUT_DIR = path.resolve("extended");

/**
 * Sleep for a given number of milliseconds.
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Convert a documentation URL to a local file path.
 * e.g. https://www.amcharts.com/docs/v5/charts/xy-chart/axes/ → extended/charts/xy-chart/axes.md
 */
function urlToFilePath(url) {
  const urlObj = new URL(url);
  let pathname = urlObj.pathname; // e.g. /docs/v5/charts/xy-chart/axes/

  // Strip the /docs/v5/ prefix
  const prefixIndex = pathname.indexOf(BASE_URL_PREFIX);
  if (prefixIndex !== -1) {
    pathname = pathname.substring(prefixIndex + BASE_URL_PREFIX.length);
  }

  // Remove trailing slash
  pathname = pathname.replace(/\/+$/, "");

  // If empty (root docs page), use "index"
  if (!pathname) {
    pathname = "index";
  }

  return path.join(OUTPUT_DIR, pathname + ".md");
}

/**
 * Extract the page title from the DOM.
 */
function extractTitle(doc) {
  // Try the main heading first
  const h1 = doc.querySelector(".entry-title, article h1, .doc-content h1, h1");
  if (h1) return h1.textContent.trim();

  // Fall back to <title>
  const titleEl = doc.querySelector("title");
  if (titleEl) {
    return titleEl.textContent.replace(/ - amCharts.*$/, "").trim();
  }

  return "Untitled";
}

/**
 * Extract the main documentation content element from the page.
 */
function extractContent(doc) {
  // Try several selectors in order of specificity for the amCharts docs site
  const selectors = [
    ".entry-content",
    "article .content",
    ".doc-content",
    "article",
    "main",
    "#content",
    ".content",
  ];

  for (const selector of selectors) {
    const el = doc.querySelector(selector);
    if (el) {
      // Remove elements that are not part of the main content
      const removeSelectors = [
        "nav",
        ".navigation",
        ".sidebar",
        ".breadcrumb",
        ".breadcrumbs",
        ".share-buttons",
        ".social-share",
        ".comments",
        "#comments",
        ".related-posts",
        ".post-navigation",
        ".ad",
        ".ads",
        ".advertisement",
        "script",
        "style",
        "iframe:not([src*='codepen']):not([src*='jsfiddle'])",
        ".wp-block-spacer",
      ];

      for (const removeSelector of removeSelectors) {
        el.querySelectorAll(removeSelector).forEach((node) => node.remove());
      }

      return el;
    }
  }

  return null;
}

/**
 * Configure and return a TurndownService instance.
 */
function createTurndownService() {
  const turndown = new TurndownService({
    headingStyle: "atx",
    codeBlockStyle: "fenced",
    bulletListMarker: "-",
    emDelimiter: "*",
    strongDelimiter: "**",
  });

  // Preserve code blocks with language hints
  turndown.addRule("codeBlocks", {
    filter: (node) => {
      return (
        node.nodeName === "PRE" &&
        node.querySelector("code")
      );
    },
    replacement: (content, node) => {
      const codeEl = node.querySelector("code");
      const code = codeEl.textContent;

      // Try to detect language from class names
      let lang = "";
      const classes = (codeEl.className || "") + " " + (node.className || "");
      const langMatch = classes.match(
        /(?:language-|lang-|brush:\s*)([\w+#-]+)/i
      );
      if (langMatch) {
        lang = langMatch[1].toLowerCase();
        // Normalize common language names
        if (lang === "js") lang = "javascript";
        if (lang === "ts") lang = "typescript";
      }

      return `\n\n\`\`\`${lang}\n${code.replace(/\n+$/, "")}\n\`\`\`\n\n`;
    },
  });

  // Handle inline code
  turndown.addRule("inlineCode", {
    filter: (node) => {
      return (
        node.nodeName === "CODE" &&
        node.parentNode.nodeName !== "PRE"
      );
    },
    replacement: (content) => {
      if (!content.trim()) return "";
      // Use backticks, escaping any internal backticks
      if (content.includes("`")) {
        return "`` " + content + " ``";
      }
      return "`" + content + "`";
    },
  });

  // Remove images that are likely decorative/ads
  turndown.addRule("removeDecorativeImages", {
    filter: (node) => {
      if (node.nodeName !== "IMG") return false;
      const src = node.getAttribute("src") || "";
      return (
        src.includes("ad") ||
        src.includes("banner") ||
        src.includes("tracking")
      );
    },
    replacement: () => "",
  });

  // Keep demo/codepen iframes as links
  turndown.addRule("iframes", {
    filter: "iframe",
    replacement: (content, node) => {
      const src = node.getAttribute("src");
      if (src) {
        return `\n\n[See the live demo](${src})\n\n`;
      }
      return "";
    },
  });

  return turndown;
}

/**
 * Fetch a URL and return the HTML text.
 */
async function fetchPage(url) {
  const response = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (compatible; amCharts-docs-scraper/1.0; documentation archival)",
      Accept: "text/html",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  return await response.text();
}

/**
 * Process a single URL: fetch, extract, convert, save.
 */
async function processUrl(url, turndown) {
  const html = await fetchPage(url);
  const dom = new JSDOM(html);
  const doc = dom.window.document;

  const title = extractTitle(doc);
  const contentEl = extractContent(doc);

  if (!contentEl) {
    throw new Error("Could not find main content element");
  }

  const markdown = turndown.turndown(contentEl.innerHTML);

  // Build frontmatter
  const frontmatter = [
    "---",
    `title: "${title.replace(/"/g, '\\"')}"`,
    `source: "${url}"`,
    `scraped: "${new Date().toISOString().split("T")[0]}"`,
    "---",
  ].join("\n");

  const fullContent = frontmatter + "\n\n" + markdown.trim() + "\n";

  // Determine output path and ensure directory exists
  const filePath = urlToFilePath(url);
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, fullContent, "utf-8");

  return { title, filePath };
}

/**
 * Main entry point.
 */
async function main() {
  console.log(`amCharts 5 Documentation Scraper`);
  console.log(`================================`);
  console.log(`Total pages to scrape: ${URLS.length}`);
  console.log(`Output directory: ${OUTPUT_DIR}`);
  console.log();

  const turndown = createTurndownService();

  let success = 0;
  let failed = 0;
  const errors = [];

  for (let i = 0; i < URLS.length; i++) {
    const url = URLS[i];
    const progress = `[${i + 1}/${URLS.length}]`;

    try {
      const result = await processUrl(url, turndown);
      success++;
      console.log(`${progress} OK: ${result.title}`);
      console.log(`       -> ${path.relative(process.cwd(), result.filePath)}`);
    } catch (err) {
      failed++;
      errors.push({ url, error: err.message });
      console.error(`${progress} FAIL: ${url}`);
      console.error(`       -> ${err.message}`);
    }

    // Polite delay between requests (skip after last one)
    if (i < URLS.length - 1) {
      await sleep(DELAY_MS);
    }
  }

  console.log();
  console.log(`================================`);
  console.log(`Done! Success: ${success}, Failed: ${failed}`);

  if (errors.length > 0) {
    console.log();
    console.log(`Failed URLs:`);
    for (const { url, error } of errors) {
      console.log(`  - ${url}: ${error}`);
    }
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
