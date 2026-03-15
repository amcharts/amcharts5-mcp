#!/usr/bin/env node

/**
 * Scrapes the amCharts 5 API class reference and saves each class
 * as a markdown file in extended/reference/{classname}.md
 *
 * Usage: node scripts/scrape-reference.js
 *
 * Two phases:
 *   Phase 1 — Collect all class URLs from paginated index (115 pages)
 *   Phase 2 — Scrape each class page and extract structured data
 *
 * Dependencies: jsdom (already installed)
 */

import fs from "fs/promises";
import path from "path";
import { JSDOM } from "jsdom";

const INDEX_PAGES = 115;
const DELAY_MS = 500;
const BASE_REF_URL = "https://www.amcharts.com/docs/v5/reference/";
const OUTPUT_DIR = path.resolve("extended", "reference");
const TODAY = new Date().toISOString().split("T")[0];

// ─── Helpers ────────────────────────────────────────────────────────────────

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

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

// ─── Phase 1: Collect class URLs ────────────────────────────────────────────

async function collectClassUrls() {
  const allUrls = new Set();

  for (let page = 1; page <= INDEX_PAGES; page++) {
    const url =
      page === 1
        ? BASE_REF_URL
        : `${BASE_REF_URL}page/${page}/`;

    const progress = `[Phase 1] [${page}/${INDEX_PAGES}]`;

    try {
      const html = await fetchPage(url);
      const dom = new JSDOM(html);
      const doc = dom.window.document;

      // Find all links that point to a class reference page
      const links = doc.querySelectorAll("a[href]");
      let found = 0;

      for (const link of links) {
        const href = link.getAttribute("href");
        if (!href) continue;

        // Match links like /docs/v5/reference/xychart/ but NOT /docs/v5/reference/page/N/
        // and NOT the base /docs/v5/reference/ itself
        const match = href.match(
          /\/docs\/v5\/reference\/([a-z0-9_-]+)\/?$/i
        );
        if (match && match[1] !== "page") {
          const classSlug = match[1].toLowerCase();
          const classUrl = `https://www.amcharts.com/docs/v5/reference/${classSlug}/`;
          if (!allUrls.has(classUrl)) {
            allUrls.add(classUrl);
            found++;
          }
        }
      }

      console.log(`${progress} OK — found ${found} new class links (total: ${allUrls.size})`);
    } catch (err) {
      console.error(`${progress} FAIL: ${url} — ${err.message}`);
    }

    // Delay between pages (skip after last)
    if (page < INDEX_PAGES) {
      await sleep(DELAY_MS);
    }
  }

  return Array.from(allUrls).sort();
}

// ─── Phase 2: Scrape class pages ────────────────────────────────────────────

/**
 * Determine the class type from the page content.
 */
function detectClassType(doc) {
  const body = doc.body ? doc.body.textContent : "";

  // Check subtitle, badges, or specific keywords in the intro area
  const subtitle = doc.querySelector(".entry-subtitle, .class-type, .badge");
  if (subtitle) {
    const text = subtitle.textContent.toLowerCase();
    if (text.includes("interface")) return "interface";
    if (text.includes("enum")) return "enum";
    if (text.includes("type")) return "type";
    if (text.includes("class")) return "class";
  }

  // Fallback: scan introductory text
  const intro = doc.querySelector(".entry-content, .reference-intro, article");
  if (intro) {
    const text = intro.textContent.substring(0, 500).toLowerCase();
    if (text.includes("this interface")) return "interface";
    if (text.includes("this enum")) return "enum";
    if (text.includes("type alias")) return "type";
  }

  return "class";
}

/**
 * Extract the class name from the page heading.
 */
function extractClassName(doc) {
  const h1 = doc.querySelector(".entry-title, article h1, h1");
  if (h1) return h1.textContent.trim();

  const title = doc.querySelector("title");
  if (title) {
    return title.textContent
      .replace(/ - amCharts.*$/i, "")
      .replace(/API Reference:\s*/i, "")
      .trim();
  }

  return "Unknown";
}

/**
 * Extract introductory description text before the first section heading.
 */
function extractDescription(doc) {
  const content = doc.querySelector(".entry-content, article, main");
  if (!content) return "";

  const lines = [];
  for (const child of content.children) {
    const tag = child.tagName.toLowerCase();
    // Stop at the first h2/h3 (section heading)
    if (tag === "h2" || tag === "h3") break;
    // Skip the h1 title
    if (tag === "h1") continue;
    // Skip nav/breadcrumbs
    if (child.classList && (child.classList.contains("breadcrumb") || child.classList.contains("breadcrumbs"))) continue;

    const text = child.textContent.trim();
    if (text) lines.push(text);
  }

  return lines.join("\n\n");
}

/**
 * Extract inheritance info (extends / extended by).
 */
function extractInheritance(doc) {
  const content = doc.querySelector(".entry-content, article, main");
  if (!content) return { extends_: "", extendedBy: "" };

  let extends_ = "";
  let extendedBy = "";

  // Look for text or specific elements containing "Extends" / "Extended by"
  const allText = content.innerHTML;

  // Strategy: find elements or text patterns
  const labels = content.querySelectorAll("dt, strong, b, .label, th");
  for (const label of labels) {
    const labelText = label.textContent.trim().toLowerCase();
    const nextEl = label.nextElementSibling || label.parentElement;
    const nextText = nextEl ? nextEl.textContent.trim() : "";

    if (labelText.includes("extends") && !labelText.includes("extended")) {
      // Get the sibling dd or adjacent text
      if (label.tagName === "DT" && label.nextElementSibling && label.nextElementSibling.tagName === "DD") {
        extends_ = label.nextElementSibling.textContent.trim();
      } else {
        // Try to extract from same parent after the label
        extends_ = nextText.replace(label.textContent, "").trim();
      }
    }
    if (labelText.includes("extended by")) {
      if (label.tagName === "DT" && label.nextElementSibling && label.nextElementSibling.tagName === "DD") {
        extendedBy = label.nextElementSibling.textContent.trim();
      } else {
        extendedBy = nextText.replace(label.textContent, "").trim();
      }
    }
  }

  // Also check for links in Type hierarchy or similar section
  if (!extends_ && !extendedBy) {
    const sections = content.querySelectorAll("h2, h3");
    for (const section of sections) {
      const heading = section.textContent.trim().toLowerCase();
      if (heading.includes("hierarchy") || heading.includes("inherit")) {
        let el = section.nextElementSibling;
        while (el && !["H2", "H3"].includes(el.tagName)) {
          const text = el.textContent.trim();
          if (text.toLowerCase().includes("extends")) {
            extends_ = text.replace(/extends:?\s*/i, "").trim();
          }
          if (text.toLowerCase().includes("extended by")) {
            extendedBy = text.replace(/extended by:?\s*/i, "").trim();
          }
          el = el.nextElementSibling;
        }
      }
    }
  }

  return { extends_, extendedBy };
}

/**
 * Extract import/source info from the page.
 */
function extractSource(doc) {
  const content = doc.querySelector(".entry-content, article, main");
  if (!content) return "";

  const lines = [];

  // Look for source/module/import info
  const labels = content.querySelectorAll("dt, strong, b, .label, th");
  for (const label of labels) {
    const text = label.textContent.trim().toLowerCase();
    if (text.includes("source") || text.includes("module") || text.includes("import")) {
      const nextEl = label.nextElementSibling || label.parentElement;
      if (nextEl) {
        const info = nextEl.textContent.trim().replace(label.textContent, "").trim();
        if (info) lines.push(info);
      }
    }
  }

  return lines.join("\n");
}

/**
 * Find all sections in the content, grouped by their heading.
 * Returns an array of { heading, elements }.
 */
function findSections(doc) {
  const content = doc.querySelector(".entry-content, article, main");
  if (!content) return [];

  const sections = [];
  let currentSection = null;

  for (const child of content.children) {
    const tag = child.tagName.toLowerCase();
    if (tag === "h2" || tag === "h3") {
      if (currentSection) sections.push(currentSection);
      currentSection = {
        heading: child.textContent.trim(),
        elements: [],
      };
    } else if (currentSection) {
      currentSection.elements.push(child);
    }
  }

  if (currentSection) sections.push(currentSection);
  return sections;
}

/**
 * Extract structured entries from a section's elements.
 * Looks for tables, definition lists, or repeated patterns.
 */
function extractEntries(elements) {
  const entries = [];

  for (const el of elements) {
    const tag = el.tagName.toLowerCase();

    // Handle tables (common in API references)
    if (tag === "table") {
      const rows = el.querySelectorAll("tr");
      for (const row of rows) {
        const cells = row.querySelectorAll("td");
        if (cells.length >= 2) {
          const name = cells[0].textContent.trim();
          const type = cells.length >= 3 ? cells[1].textContent.trim() : "";
          const desc = cells[cells.length - 1].textContent.trim();
          if (name) {
            entries.push({ name, type, description: desc });
          }
        }
      }
      continue;
    }

    // Handle definition lists
    if (tag === "dl") {
      const dts = el.querySelectorAll("dt");
      for (const dt of dts) {
        const dd = dt.nextElementSibling;
        const name = dt.textContent.trim();
        const desc = dd && dd.tagName === "DD" ? dd.textContent.trim() : "";
        entries.push({ name, type: "", description: desc });
      }
      continue;
    }

    // Handle divs/sections that contain individual entries
    // (common pattern: div.member or div.entry for each property/method)
    if (tag === "div" || tag === "section") {
      const memberHeading = el.querySelector("h3, h4, .member-name, .entry-name, strong, b");
      if (memberHeading) {
        const name = memberHeading.textContent.trim();

        // Look for type info
        let type = "";
        const typeEl = el.querySelector(".type, code, .member-type, .returns");
        if (typeEl && typeEl !== memberHeading) {
          type = typeEl.textContent.trim();
        }

        // Get description: the remaining text
        const allText = el.textContent.trim();
        const desc = allText
          .replace(name, "")
          .replace(type, "")
          .trim()
          .split("\n")
          .map((l) => l.trim())
          .filter(Boolean)
          .join(" ");

        if (name) {
          entries.push({ name, type, description: desc });
        }
        continue;
      }
    }

    // Handle unordered/ordered lists
    if (tag === "ul" || tag === "ol") {
      const items = el.querySelectorAll("li");
      for (const item of items) {
        const strongEl = item.querySelector("strong, b, code");
        if (strongEl) {
          const name = strongEl.textContent.trim();
          const desc = item.textContent.replace(name, "").trim();
          entries.push({ name, type: "", description: desc });
        } else {
          const text = item.textContent.trim();
          if (text) entries.push({ name: text, type: "", description: "" });
        }
      }
      continue;
    }

    // Handle paragraphs with bold names (fallback)
    if (tag === "p") {
      const strongEl = el.querySelector("strong, b");
      if (strongEl) {
        const name = strongEl.textContent.trim();
        const desc = el.textContent.replace(name, "").trim();
        entries.push({ name, type: "", description: desc });
      }
    }
  }

  return entries;
}

/**
 * Format entries as markdown list items depending on the section type.
 */
function formatEntries(entries, sectionType) {
  return entries
    .map((entry) => {
      const name = entry.name.replace(/[`*]/g, "");
      const type = entry.type ? ` (\`${entry.type.replace(/[`]/g, "")}\`)` : "";
      const desc = entry.description ? ` - ${entry.description}` : "";

      if (sectionType === "methods") {
        // Try to detect params and return type from the name or type
        // Methods often have the full signature in the name
        if (name.includes("(")) {
          return `- **${name}**${type ? `: ${type}` : ""}${desc}`;
        }
        return `- **${name}**${type}${desc}`;
      }

      return `- **${name}**${type}${desc}`;
    })
    .join("\n");
}

/**
 * Classify a section heading into a known category.
 */
function classifySection(heading) {
  const h = heading.toLowerCase();
  if (h.includes("setting")) return "settings";
  if (h.includes("propert")) return "properties";
  if (h.includes("method")) return "methods";
  if (h.includes("event")) return "events";
  if (h.includes("accessor")) return "properties";
  return null;
}

/**
 * Scrape a single class page and return structured markdown.
 */
async function scrapeClassPage(url) {
  const html = await fetchPage(url);
  const dom = new JSDOM(html);
  const doc = dom.window.document;

  const className = extractClassName(doc);
  const classType = detectClassType(doc);
  const description = extractDescription(doc);
  const { extends_, extendedBy } = extractInheritance(doc);
  const sourceInfo = extractSource(doc);
  const sections = findSections(doc);

  // Build markdown
  const md = [];

  // Frontmatter
  md.push("---");
  md.push(`title: "${className.replace(/"/g, '\\"')}"`);
  md.push(`type: "${classType}"`);
  md.push(`source: "${url}"`);
  md.push(`scraped: "${TODAY}"`);
  md.push("---");
  md.push("");

  // Description
  if (description) {
    md.push(description);
    md.push("");
  }

  // Source/import info
  if (sourceInfo) {
    md.push(`Import: ${sourceInfo}`);
    md.push("");
  }

  // Inheritance
  if (extends_ || extendedBy) {
    md.push("## Inheritance");
    if (extends_) md.push(`Extends: ${extends_}`);
    if (extendedBy) md.push(`Extended by: ${extendedBy}`);
    md.push("");
  }

  // Categorized sections
  const sectionBuckets = {
    settings: [],
    properties: [],
    methods: [],
    events: [],
  };

  const otherSections = [];

  for (const section of sections) {
    const category = classifySection(section.heading);
    if (category) {
      const entries = extractEntries(section.elements);
      sectionBuckets[category].push(...entries);
    } else {
      // Keep other sections as-is
      const entries = extractEntries(section.elements);
      if (entries.length > 0) {
        otherSections.push({ heading: section.heading, entries });
      }
    }
  }

  // Output categorized sections
  if (sectionBuckets.settings.length > 0) {
    md.push("## Settings");
    md.push(formatEntries(sectionBuckets.settings, "settings"));
    md.push("");
  }

  if (sectionBuckets.properties.length > 0) {
    md.push("## Properties");
    md.push(formatEntries(sectionBuckets.properties, "properties"));
    md.push("");
  }

  if (sectionBuckets.methods.length > 0) {
    md.push("## Methods");
    md.push(formatEntries(sectionBuckets.methods, "methods"));
    md.push("");
  }

  if (sectionBuckets.events.length > 0) {
    md.push("## Events");
    md.push(formatEntries(sectionBuckets.events, "events"));
    md.push("");
  }

  // Other sections
  for (const section of otherSections) {
    md.push(`## ${section.heading}`);
    md.push(formatEntries(section.entries, "other"));
    md.push("");
  }

  return { className, markdown: md.join("\n") };
}

/**
 * Derive the output filename from a class URL slug.
 */
function urlToFilePath(url) {
  const urlObj = new URL(url);
  let slug = urlObj.pathname
    .replace(/^\/docs\/v5\/reference\//, "")
    .replace(/\/+$/, "");

  if (!slug) slug = "index";

  return path.join(OUTPUT_DIR, slug + ".md");
}

// ─── Main ───────────────────────────────────────────────────────────────────

async function main() {
  console.log("amCharts 5 API Reference Scraper");
  console.log("=================================");
  console.log(`Output directory: ${OUTPUT_DIR}`);
  console.log();

  // Phase 1: Collect all class URLs
  console.log("Phase 1: Collecting class URLs from index pages...");
  console.log(`Scanning ${INDEX_PAGES} index pages with ${DELAY_MS}ms delay`);
  console.log();

  const classUrls = await collectClassUrls();

  console.log();
  console.log(`Phase 1 complete. Found ${classUrls.length} classes.`);
  console.log();

  if (classUrls.length === 0) {
    console.error("No class URLs found. Aborting.");
    process.exit(1);
  }

  // Ensure output directory exists
  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  // Phase 2: Scrape each class page
  console.log("Phase 2: Scraping class reference pages...");
  console.log(`Total classes: ${classUrls.length}, delay: ${DELAY_MS}ms`);
  console.log();

  let success = 0;
  let failed = 0;
  const errors = [];

  for (let i = 0; i < classUrls.length; i++) {
    const url = classUrls[i];
    const progress = `[Phase 2] [${i + 1}/${classUrls.length}]`;

    try {
      const { className, markdown } = await scrapeClassPage(url);
      const filePath = urlToFilePath(url);

      await fs.mkdir(path.dirname(filePath), { recursive: true });
      await fs.writeFile(filePath, markdown, "utf-8");

      success++;
      console.log(`${progress} OK: ${className}`);
    } catch (err) {
      failed++;
      errors.push({ url, error: err.message });
      console.error(`${progress} FAIL: ${url} — ${err.message}`);
    }

    // Delay between requests (skip after last)
    if (i < classUrls.length - 1) {
      await sleep(DELAY_MS);
    }
  }

  // Summary
  console.log();
  console.log("=================================");
  console.log("Scraping complete!");
  console.log(`  Total classes found: ${classUrls.length}`);
  console.log(`  Successfully scraped: ${success}`);
  console.log(`  Failed: ${failed}`);

  if (errors.length > 0) {
    console.log();
    console.log("Failed URLs:");
    for (const { url, error } of errors) {
      console.log(`  - ${url}: ${error}`);
    }
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
