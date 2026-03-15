#!/usr/bin/env node

/**
 * Scrapes amCharts 5 demo pages and saves them as markdown files
 * in the extended/examples/ directory, organized by category.
 *
 * Usage: node scripts/scrape-demos.js
 *
 * Dependencies: npm install jsdom (same as scrape-docs.js)
 */

import fs from "fs/promises";
import path from "path";
import { JSDOM } from "jsdom";

// All demo slugs organized by category
const DEMOS_BY_CATEGORY = {
  "column-bar": [
    "column-with-rotated-series",
    "simple-column-chart",
    "100-stacked-column-chart",
    "clustered-column-chart",
    "columns-with-grainy-gradients",
    "images-as-categories",
    "stacked-clustered-column-chart",
    "stacked-column-chart",
    "stacked-bar-chart",
    "clustered-bar-chart",
    "columns-with-moving-bullets",
    "bars-with-moving-bullets",
    "drag-and-change-column-value",
    "bar-chart-race",
    "real-time-data-sorting",
    "sorted-bar-chart",
    "drag-ordering-of-bars",
    "pictorial-column-chart",
    "column-and-line-mix",
    "bar-and-line-chart-mix",
    "pareto-diagram",
    "stacked-bar-chart-with-negative-values",
    "bullet-chart",
    "layered-column-chart",
    "column-chart-images-top",
    "heat-map-with-legend",
    "risk-heatmap",
    "step-count-chart",
    "curved-columns",
    "horizontal-dumbbell-plot",
    "lollipop-chart",
    "dumbbell-plot",
    "variance-indicators",
    "divergent-stacked-bars",
    "partitioned-bar-chart",
    "grouped-and-sorted-columns",
    "waterfall-chart",
    "stacked-waterfall-chart",
    "carbon-zero-progress",
    "floating-bar-chart",
    "waffle-chart",
    "grouped-stacks",
  ],

  "line-area": [
    "date-axis-with-labels-near-minor-grid-lines",
    "line-with-data-labels",
    "spline-graph",
    "line-graph",
    "draggable-range-with-close-button",
    "line-chart-with-horizontal-target",
    "manipulate-chart-data-with-mouse",
    "line-chart-with-range-slider",
    "line-chart-adding-data-every-second",
    "highlighting-line-chart-series-on-legend-hover",
    "selecting-and-marking-multiple-ranges",
    "no-gap-date-axis",
    "data-grouping-50k-points",
    "smoothed-stacked-area",
    "range-chart-with-different-fill-colors",
    "date-based-data",
    "line-chart-with-scroll-and-zoom",
    "drawing-chart-series-with-mouse-or-touch",
    "show-percentage-change",
    "evenly-spaced-date-axis",
    "comparing-different-date-values-google-analytics-style",
    "duration-on-value-axis",
    "animated-bullet-at-the-end-of-the-series",
    "line-different-colors-ups-downs",
    "zoomable-value-axis",
    "smoothed-line-chart",
    "trend-lines",
    "line-with-changing-color",
    "stacked-area",
    "100-stacked-area-chart",
    "area-with-time-based-data",
    "range-area-chart",
    "step-line-chart",
    "step-line-without-risers",
    "line-with-custom-bullets",
    "vertical-line-chart",
    "chart-with-gaps-in-data",
    "reversed-value-axis",
    "error-chart",
    "multiple-value-axes",
    "multiple-date-axes",
    "logarithmic-scale",
    "control-chart",
    "mixed-daily-and-intra-day-chart",
    "date-based-line-chart",
    "live-order-book-depth-chart",
    "live-data",
    "divergent-lines",
    "stream-chart",
    "process-control-chart",
  ],

  "pie-donut": [
    "pie-chart",
    "two-pie-charts-with-single-legend",
    "grained-gradient-pie",
    "dragging-pie-slices",
    "simple-pie-chart",
    "variable-radius-nested-donut-chart",
    "two-level-pie-chart",
    "donut-with-radial-gradient",
    "animated-time-line-pie-chart",
    "donut-chart",
    "nested-donut-chart",
    "pie-chart-with-legend",
    "pie-chart-broken-slices",
    "variable-radius-pie-chart",
    "semi-circle-pie-chart",
    "pie-of-a-pie",
    "variable-radius-nested-pie",
  ],

  "xy-bubble": [
    "motion-chart",
    "scatter-plot-with-tens-of-thousands-points",
    "bubble-chart",
    "xy-chart-date-based-axis",
    "bubble-based-heat-map",
    "animated-xy-bubble-timeline-chart",
    "bubble-chart-with-pie-bullets",
    "xy-chart-fills-axis",
    "zoomable-bubble-chart",
    "scatter-chart",
    "xy-error-chart",
    "xy-chart-value-based-line-graphs",
    "irregular-interval-xy",
    "beeswarm",
  ],

  "maps": [
    "trumps-reciprocal-tariffs-map",
    "solar-eclipse-map",
    "world-map-with-clustered-points",
    "map-with-animated-bubbles",
    "animations-along-lines",
    "rotate-globe-to-a-selected-country",
    "multi-series-map",
    "rotating-globe-with-circles",
    "zooming-to-countries-map",
    "pacific-centered-map",
    "map-using-d3-projections",
    "world-time-zone-map",
    "map-with-curved-lines",
    "day-and-night-world-map",
    "map-with-pulsating-bullets",
    "drill-down-to-countries",
    "map-with-patterns",
    "approximate-working-hours-map",
    "capitals-map",
    "flight-routes-map",
    "changing-map-projection",
    "location-sensitive-map",
    "us-heat-map",
    "grouped-countries-map",
    "map-bubbles",
    "drill-down-map",
    "selecting-multiple-areas-map",
    "map-image-drill-down",
    "weather-map",
    "map-dynamic-pie-charts",
    "rotating-globe",
    "map-with-sized-pin-bullets",
    "map-timeline",
    "us-congressional-districts",
    "drill-down-congressional-map",
    "map-with-animated-lines",
  ],

  "candlestick-ohlc": [
    "candlestick-chart",
    "professional-candlesticks",
    "on-demand-data-loading",
    "stock-chart-candlesticks",
    "box-plot-chart",
    "ohlc-chart",
  ],

  "stock": [
    "stock-chart",
    "stock-chart-comparing-prices",
    "stock-chart-with-bollinger-bands-indicator",
    "stock-chart-with-relative-strength-index",
    "stock-chart-with-volume-profile",
    "changing-data-granularity",
    "stock-data-grouping",
    "stock-intraday-data",
    "live-stock-data",
    "separate-volume-panel",
  ],

  "gantt": [
    "gantt-chart",
    "editable-multilevel-gantt-chart",
    "gantt-chart-playground",
    "gantt-chart-in-read-only-mode",
    "gantt-chart-dates",
    "gantt-with-hundreds-of-items",
  ],

  "gauges": [
    "gauge-with-bands",
    "gauge-with-gradient-fill",
    "yes-and-no-gauge",
    "clock",
    "clock-with-two-faces",
    "animated-gauge",
    "angular-gauge",
    "solid-gauge",
    "angular-gauge-with-two-axes",
    "multi-part-gauge",
    "compass-chart",
  ],

  "radar-polar": [
    "radar-chart-visualizing-yearly-activities",
    "radial-histogram",
    "zoomable-radar",
    "polar-area-chart",
    "radar-heat-map",
    "radial-line-graph",
    "radar-chart",
    "radar-timeline",
    "flower-chart",
    "live-sorting-of-radar-columns",
    "polar-chart",
    "polar-scatter",
    "wheel-of-life",
    "stacked-area-radar",
    "radar-with-date-axis",
    "radial-bar-chart",
    "variable-radius-radar",
  ],

  "hierarchy": [
    "collapsible-force-directed-tree",
    "force-directed-network",
    "packed-circle-chart",
    "rectangular-voronoi-tree-map",
    "drill-down-sunburst-chart",
    "horizontal-partition-chart",
    "vertical-partition-chart",
    "tree-chart",
    "force-directed-adding-links",
    "zoomable-force-directed-tree",
    "multilevel-tree-map",
    "sunburst-chart",
    "single-level-packed-circles",
    "force-directed-tree",
    "sunburst-flavor-wheel",
    "simple-treemap",
    "drill-down-treemap",
    "dynamic-data-updates-on-treemap",
    "voronoi-treemap",
    "force-directed-tree-with-animated-bullets",
  ],

  "timeline": [
    "serpentine-timeline-chart",
    "spiral-timeline",
    "linear-process-diagram",
    "horizontal-serpentine-timeline",
    "infinity-timeline",
    "stadium-track-chart",
  ],

  "flow": [
    "sankey-diagram",
    "vertical-sankey-diagram",
    "traceable-sankey-diagram",
    "toggleable-chord-diagram",
    "chord-diagram-with-animated-bullets",
    "chord-diagram",
    "animated-sankey-diagram",
    "non-ribbon-chord-diagram",
    "horizontal-arc-diagram",
    "vertical-arc-diagram",
  ],

  "funnel-pyramid": [
    "pictorial-fraction-chart",
    "funnel-chart-with-rounded-corners",
    "pictorial-chart",
    "pyramid-chart",
    "funnel-with-gradient-fill",
    "funnel-chart",
    "horizontal-funnel",
    "pictorial-stacked-chart",
    "horizontal-pictorial-chart",
  ],

  "miscellaneous": [
    "population-pyramid",
    "word-cloud",
    "changing-data-word-cloud",
    "annotating-charts",
    "historical-population-pyramid",
    "sentence-cloud",
    "tile-map",
    "honeycomb-tile-map",
    "vertically-stacked-axes-chart",
    "pictogram",
    "infographic",
    "venn-diagram-with-patterns",
    "strip-plot",
    "complex-venn-diagram",
    "horizontally-stacked-axes",
    "violin-chart",
    "tag-cloud",
    "hybrid-drill-down-pie-bar-chart",
    "mekko",
    "combined-bullet-column-line-chart",
    "micro-charts-sparklines",
    "exporting-chart-to-image",
    "venn-diagram",
    "spectrum-chart",
    "progress-chart",
    "forest-plot",
    "range-bullet-chart",
  ],

  "dashboards": [
    "maps-and-charts-dashboard",
    "road-trip-dashboard-with-map",
  ],
};

const DELAY_MS = 1000;
const BASE_DEMO_URL = "https://www.amcharts.com/demos/";
const OUTPUT_DIR = path.resolve("extended/examples");

/**
 * Sleep for a given number of milliseconds.
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Build a flat list of { url, category, slug } from the category map.
 */
function buildDemoList() {
  const demos = [];
  for (const [category, slugs] of Object.entries(DEMOS_BY_CATEGORY)) {
    for (const slug of slugs) {
      demos.push({
        url: `${BASE_DEMO_URL}${slug}/`,
        category,
        slug,
      });
    }
  }
  return demos;
}

/**
 * Extract the page title from the DOM.
 */
function extractTitle(doc) {
  const h1 = doc.querySelector(".entry-title, article h1, h1");
  if (h1) return h1.textContent.trim();

  const titleEl = doc.querySelector("title");
  if (titleEl) {
    return titleEl.textContent.replace(/ - amCharts.*$/, "").trim();
  }

  return "Untitled";
}

/**
 * Extract the description text from the demo page.
 * This is typically the paragraph(s) before the code/demo area.
 */
function extractDescription(doc) {
  const parts = [];

  // Look for the entry-content area which holds the demo description
  const content = doc.querySelector(".entry-content, article .content, article, main");
  if (!content) return "";

  // Gather paragraph text from the content area, stopping at code blocks or demo containers
  const children = content.children;
  for (let i = 0; i < children.length; i++) {
    const el = children[i];
    const tag = el.tagName.toLowerCase();

    // Stop when we hit code/demo sections
    if (
      tag === "pre" ||
      tag === "script" ||
      tag === "style" ||
      el.classList.contains("codepen") ||
      el.classList.contains("demo-container") ||
      el.classList.contains("chart-demo") ||
      el.id === "chartdiv" ||
      el.classList.contains("tabs") ||
      el.classList.contains("code-tabs") ||
      el.classList.contains("wp-block-code")
    ) {
      break;
    }

    if (tag === "p" || tag === "div") {
      const text = el.textContent.trim();
      if (text && text.length > 10) {
        parts.push(text);
      }
    }
  }

  return parts.join("\n\n");
}

/**
 * Extract code snippets (JavaScript, HTML, CSS) from the demo page.
 * amCharts demo pages typically have code in tabs or pre>code blocks.
 */
function extractCode(doc) {
  const result = {
    javascript: "",
    html: "",
    css: "",
  };

  // Strategy 1: Look for tab-based code sections (common on amCharts demo pages)
  // The tabs usually have labels like "JavaScript", "HTML", "CSS"
  const tabPanels = doc.querySelectorAll(
    ".code-tab-content, .tab-pane, .tab-content > div, [role='tabpanel']"
  );

  if (tabPanels.length > 0) {
    tabPanels.forEach((panel) => {
      const panelId = (panel.id || panel.getAttribute("data-tab") || "").toLowerCase();
      const codeEl = panel.querySelector("pre code, pre, code");
      if (!codeEl) return;
      const code = codeEl.textContent.trim();
      if (!code) return;

      if (panelId.includes("javascript") || panelId.includes("js")) {
        result.javascript = code;
      } else if (panelId.includes("html")) {
        result.html = code;
      } else if (panelId.includes("css")) {
        result.css = code;
      }
    });
  }

  // Strategy 2: Look for labeled code blocks using headings or comments
  if (!result.javascript && !result.html && !result.css) {
    const codeBlocks = doc.querySelectorAll("pre code, pre");
    codeBlocks.forEach((block) => {
      const code = block.textContent.trim();
      if (!code) return;

      const classes = (block.className || "") + " " + ((block.parentElement && block.parentElement.className) || "");

      // Check preceding heading or label
      let label = "";
      const prev = block.closest("div, section, pre")?.previousElementSibling;
      if (prev) {
        label = (prev.textContent || "").toLowerCase();
      }
      label += " " + classes.toLowerCase();

      if (label.includes("javascript") || label.includes("js") || classes.includes("language-javascript") || classes.includes("language-js")) {
        if (!result.javascript) result.javascript = code;
      } else if (label.includes("html") || classes.includes("language-html") || classes.includes("language-markup")) {
        if (!result.html) result.html = code;
      } else if (label.includes("css") || classes.includes("language-css")) {
        if (!result.css) result.css = code;
      }
    });
  }

  // Strategy 3: If we still have no JavaScript, look for the largest code block
  // (demo pages almost always have JS as the primary code)
  if (!result.javascript) {
    const allCode = doc.querySelectorAll("pre code, pre");
    let longestCode = "";
    allCode.forEach((block) => {
      const code = block.textContent.trim();
      // Heuristic: JS code usually contains am5 references or function calls
      if (code.length > longestCode.length) {
        longestCode = code;
      }
    });
    if (longestCode) {
      result.javascript = longestCode;
    }
  }

  // Strategy 4: Look for inline script tags with am5 code
  if (!result.javascript) {
    const scripts = doc.querySelectorAll("script:not([src])");
    scripts.forEach((script) => {
      const code = script.textContent.trim();
      if (code.includes("am5") || code.includes("amcharts")) {
        if (code.length > result.javascript.length) {
          result.javascript = code;
        }
      }
    });
  }

  // Strategy 5: Look for a style block with chart-relevant CSS
  if (!result.css) {
    const styles = doc.querySelectorAll("style");
    styles.forEach((style) => {
      const code = style.textContent.trim();
      if (code.includes("chartdiv") || code.includes("chart")) {
        if (!result.css) {
          result.css = code;
        }
      }
    });
  }

  // Strategy 6: Look for the chartdiv HTML element
  if (!result.html) {
    const chartDiv = doc.querySelector("#chartdiv");
    if (chartDiv) {
      result.html = chartDiv.outerHTML;
    }
  }

  return result;
}

/**
 * Fetch a URL and return the HTML text.
 */
async function fetchPage(url) {
  const response = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (compatible; amCharts-demos-scraper/1.0; documentation archival)",
      Accept: "text/html",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  return await response.text();
}

/**
 * Process a single demo URL: fetch, extract, save as markdown.
 */
async function processDemo(demo) {
  const { url, category, slug } = demo;

  const html = await fetchPage(url);
  const dom = new JSDOM(html);
  const doc = dom.window.document;

  const title = extractTitle(doc);
  const description = extractDescription(doc);
  const code = extractCode(doc);

  // Build the markdown content
  const lines = [
    "---",
    `title: "${title.replace(/"/g, '\\"')}"`,
    `source: "${url}"`,
    `category: "${category}"`,
    `scraped: "2026-03-15"`,
    "---",
    "",
  ];

  if (description) {
    lines.push(description, "");
  }

  if (code.javascript) {
    lines.push("## JavaScript", "", "```javascript", code.javascript, "```", "");
  }

  if (code.html) {
    lines.push("## HTML", "", "```html", code.html, "```", "");
  }

  if (code.css) {
    lines.push("## CSS", "", "```css", code.css, "```", "");
  }

  const content = lines.join("\n") + "\n";

  // Save to extended/examples/{category}/{slug}.md
  const filePath = path.join(OUTPUT_DIR, category, slug + ".md");
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, content, "utf-8");

  return { title, filePath };
}

/**
 * Main entry point.
 */
async function main() {
  const demos = buildDemoList();

  console.log(`amCharts 5 Demo Scraper`);
  console.log(`================================`);
  console.log(`Total demos to scrape: ${demos.length}`);
  console.log(`Categories: ${Object.keys(DEMOS_BY_CATEGORY).length}`);
  console.log(`Output directory: ${OUTPUT_DIR}`);
  console.log();

  let success = 0;
  let failed = 0;
  const errors = [];

  for (let i = 0; i < demos.length; i++) {
    const demo = demos[i];
    const progress = `[${i + 1}/${demos.length}]`;

    try {
      const result = await processDemo(demo);
      success++;
      console.log(`${progress} OK: ${result.title}`);
      console.log(`       -> ${path.relative(process.cwd(), result.filePath)}`);
    } catch (err) {
      failed++;
      errors.push({ url: demo.url, error: err.message });
      console.error(`${progress} FAIL: ${demo.url}`);
      console.error(`       -> ${err.message}`);
    }

    // Polite delay between requests (skip after last one)
    if (i < demos.length - 1) {
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
