#!/usr/bin/env node

/**
 * Scrapes amCharts 5 demo pages and saves them as markdown files
 * in the extended/examples/ directory, organized by category.
 *
 * Usage: node scripts/scrape-demos.js [--changed] [slug | category/slug ...]
 *   With no arguments every demo on amcharts.com (its demos sitemap) is scraped;
 *   otherwise only the named ones. --changed scrapes only demos that are new or
 *   changed since our copy was scraped (sitemap <lastmod> after the example's date).
 *   The output is raw and still needs the cleaning passes, so prefer
 *     npm run build:examples [-- slug ...]     (scrape + clean + check)
 *
 * Dependencies: npm install jsdom (same as scrape-docs.js)
 */

import fs from "fs/promises";
import path from "path";
import { JSDOM } from "jsdom";
import { CDN, requiredScripts } from "./am5-scripts.js";

// The demo list comes from amcharts.com: /demos/sitemap.xml lists every demo
// with the date its source last changed (<lastmod>), and each demo's page
// links to its gallery section ("../../demos/#pie"), which is its category.
// The site's category names that differ from our folder names:
const CATEGORY_NAMES = {
  pie: "pie-donut",
  radar: "radar-polar",
  candlestick: "candlestick-ohlc",
  misc: "miscellaneous",
};
const SITEMAP_URL = "https://www.amcharts.com/demos/sitemap.xml";
// Our category folders for amcharts.com demos
const KNOWN_CATEGORIES = new Set(["candlestick-ohlc", "column-bar", "dashboards", "flow", "funnel-pyramid", "gantt", "gauges", "hierarchy", "line-area", "maps", "miscellaneous", "pie-donut", "radar-polar", "stock", "timeline", "xy-bubble"]);
// Folders that hold examples from elsewhere, never scraped demos
const OTHER_FOLDERS = new Set(["json-configs", "docs-demos"]);

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
 * The examples we have from amcharts.com: slug -> { category, scraped, source }.
 */
async function existingExamples() {
  const found = new Map();
  for (const dir of await fs.readdir(OUTPUT_DIR, { withFileTypes: true })) {
    if (!dir.isDirectory() || OTHER_FOLDERS.has(dir.name)) continue;
    for (const file of await fs.readdir(path.join(OUTPUT_DIR, dir.name))) {
      if (!file.endsWith(".md")) continue;
      const text = await fs.readFile(path.join(OUTPUT_DIR, dir.name, file), "utf-8");
      const scraped = /^scraped:\s*"([^"]*)"/m.exec(text)?.[1] || "";
      const source = /^source:\s*"([^"]*)"/m.exec(text)?.[1] || "";
      found.set(file.slice(0, -3), { category: dir.name, scraped, source });
    }
  }
  return found;
}

/**
 * Every demo on amcharts.com, from its sitemap: [{ url, slug, lastmod, category }].
 * A demo we already have keeps its folder; a new one gets its category from
 * its page (processDemo).
 */
async function buildDemoList(existing) {
  const xml = await fetchPage(SITEMAP_URL);
  const demos = [];
  for (const m of xml.matchAll(/<url>[\s\S]*?<\/url>/g)) {
    const loc = /<loc>https:\/\/www\.amcharts\.com\/demos\/([a-z0-9-]+)\/<\/loc>/.exec(m[0]);
    if (!loc) continue; // the gallery itself
    const lastmod = /<lastmod>([^<]+)<\/lastmod>/.exec(m[0])?.[1] || "";
    const slug = loc[1];
    demos.push({ url: `${BASE_DEMO_URL}${slug}/`, slug, lastmod, category: existing.get(slug)?.category || null });
  }
  if (!demos.length) throw new Error(`No demos in ${SITEMAP_URL}`);
  return demos;
}

/**
 * A demo page's category: its link back to its gallery section, in our folder names.
 */
function categoryOf(html) {
  const m = /href="[^"]*demos\/#([a-z0-9-]+)"/.exec(html);
  if (!m) throw new Error("no category link (../../demos/#<category>) on the page");
  const category = CATEGORY_NAMES[m[1]] || m[1];
  if (!KNOWN_CATEGORIES.has(category)) console.warn(`  New category "${category}": a new folder (add it to CATEGORY_NAMES if it should map to an existing one)`);
  return category;
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
 * Demo pages redesigned in October 2026 carry the demo in a JSON block
 * (<script type="application/json" id="demo-config">: name, lead, prompt,
 * resources, html, css) and the code in <code id="code-out">. They need no
 * cleaning pass, so this returns the parts of the final example, or null for
 * an old-style page (which holds a `var demoData` blob for clean-examples2).
 */
function extractDemoConfigPage(doc) {
  const configEl = doc.querySelector('script#demo-config[type="application/json"]');
  const codeEl = doc.querySelector("#code-out");
  if (!configEl || !codeEl) return null;

  const config = JSON.parse(configEl.textContent);
  const text = (el) => el.textContent.replace(/\s+/g, " ").trim();
  // The JSON's strings are HTML-escaped ("Micro Charts &amp; Sparklines")
  const decode = (s) => {
    const el = doc.createElement("textarea");
    el.innerHTML = s;
    return el.value;
  };
  for (const key of ["name", "lead", "prompt"]) if (typeof config[key] === "string") config[key] = decode(config[key]);

  // Lead, then the "About this chart" block and its "Good for" / "Think twice
  // when" cards, then the request the demo answers
  const description = [];
  if (config.lead) description.push(config.lead);
  const about = doc.querySelector(".about-text");
  if (about) {
    const heading = about.querySelector("h2");
    const paragraphs = [...about.querySelectorAll("p")].map(text).filter(Boolean);
    if (paragraphs.length) description.push((heading ? `${text(heading)}: ` : "") + paragraphs.join("\n\n"));
  }
  for (const card of doc.querySelectorAll(".about-card")) {
    const heading = card.querySelector("h3");
    const items = [...card.querySelectorAll("li")].map((li) => `- ${text(li)}`);
    if (heading && items.length) description.push(`${text(heading)}:\n${items.join("\n")}`);
  }
  if (config.prompt) description.push(`Prompt: ${config.prompt}`);
  // The page adds its own controls (demo.json "controls", run from the page's
  // controls.js), which copied code never has; the lead may name them
  const controls = (config.controls || []).map((c) => decode(String(c.label || "")).trim()).filter(Boolean);
  if (controls.length) description.push(`The demo's page on amcharts.com adds controls that are not part of this code: ${controls.join(", ")}.`);

  const javascript = codeEl.textContent.replace(/\s+$/, "");

  // The live pages load some scripts (e.g. themes/Responsive.js) on every
  // demo, so a demo's own list can miss one its code uses: add it, ahead of
  // any file that needs it loaded first (index.js, then chart modules, then
  // the rest)
  const resources = (config.resources || []).map((r) => (/^https?:\/\//.test(r) ? r : CDN + r));
  const rank = (url) => {
    const file = url.startsWith(CDN) ? url.slice(CDN.length) : url;
    return file === "index.js" ? 0 : /^[a-z]+\.js$/.test(file) ? 1 : 2;
  };
  for (const file of requiredScripts(javascript)) {
    if (resources.includes(CDN + file)) continue;
    const at = resources.findIndex((r) => rank(r) >= rank(CDN + file));
    resources.splice(at === -1 ? resources.length : at, 0, CDN + file);
    console.warn(`       added ${file}: the code uses it but the demo's resources leave it out`);
  }

  return {
    title: config.name,
    description: description.join("\n\n"),
    javascript,
    html: config.html || "",
    css: config.css || "",
    resources,
  };
}

/**
 * Process a single demo URL: fetch, extract, save as markdown.
 */
async function processDemo(demo) {
  const { url, slug } = demo;

  const html = await fetchPage(url);
  const category = demo.category || categoryOf(html);
  const dom = new JSDOM(html);
  const doc = dom.window.document;

  const page = extractDemoConfigPage(doc);
  const title = page?.title || extractTitle(doc);
  const description = page ? page.description : extractDescription(doc);
  const code = page || extractCode(doc);

  // Build the markdown content
  const lines = [
    "---",
    `title: "${title.replace(/"/g, '\\"')}"`,
    `source: "${url}"`,
    `category: "${category}"`,
    `scraped: "${new Date().toISOString().slice(0, 10)}"`,
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

  if (page?.resources.length) {
    lines.push("## Required resources", "", ...page.resources.map((r) => `- ${r}`), "");
  }

  const content = lines.join("\n").replace(/\n*$/, "\n");

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
  const args = process.argv.slice(2);
  const changedOnly = args.includes("--changed");
  const flags = args.filter((a) => a.startsWith("--"));
  const unknownFlags = flags.filter((f) => f !== "--changed");
  if (unknownFlags.length) {
    console.error(`Unknown option(s): ${unknownFlags.join(", ")}. The only option is --changed.`);
    process.exit(1);
  }
  const only = args.filter((a) => !a.startsWith("--"));
  const existing = await existingExamples();
  const all = await buildDemoList(existing);

  // Examples of demos the site no longer has: reported, not deleted
  const live = new Set(all.map((d) => d.slug));
  const gone = [...existing].filter(([slug, ex]) => ex.source.startsWith(BASE_DEMO_URL) && !live.has(slug));
  if (gone.length) {
    console.log(`No longer on amcharts.com (delete the examples if that is intended): ${gone.map(([slug, ex]) => `${ex.category}/${slug}`).join(", ")}`);
  }
  const unknown = only.filter((a) => !all.some((d) => a === d.slug || a === `${d.category}/${d.slug}`));
  if (unknown.length) {
    console.error(`Unknown demo(s): ${unknown.join(", ")}`);
    process.exit(1);
  }
  // --changed: new demos, and those whose source changed after our copy was scraped
  const isChanged = (d) => !existing.has(d.slug) || !existing.get(d.slug).scraped || d.lastmod.slice(0, 10) >= existing.get(d.slug).scraped; // both are dates: a same-day edit is scraped again
  const demos = all.filter(
    (d) => (!only.length || only.includes(d.slug) || only.includes(`${d.category}/${d.slug}`)) && (!changedOnly || isChanged(d))
  );

  console.log(`amCharts 5 Demo Scraper`);
  console.log(`================================`);
  console.log(`Total demos to scrape: ${demos.length}`);
  console.log(`Demos on amcharts.com: ${all.length}${changedOnly ? " (only new or changed ones are scraped)" : ""}`);
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
    // The demos that did scrape are raw until cleaned: build:examples cleans
    // them anyway and then fails on this exit code.
    console.log();
    console.log(`Scraped demos still need cleaning (build:examples does it; otherwise npm run clean:examples).`);
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
