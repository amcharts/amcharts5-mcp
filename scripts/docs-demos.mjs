// The docs site's Markdown writes each embedded demo out in full after its
// "Example:" link: a "Scripts:" line, then HTML, CSS and JavaScript blocks.
// That is half of the docs text, so a page would bury its prose under demo code.
// takeDemos() moves each demo out of a page into an example of its own
// (extended/examples/docs-demos/<slug>.md, served by get_example) and leaves the
// link with a pointer to it.

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

export const DEMO_CATEGORY = "docs-demos";
const EXAMPLE = /^Example: \[(.+)\]\((https:\/\/docs\.amcharts\.com\/embeds\/v5\/([^/)]+)\/?)\)\s*$/;
const LABELS = { "HTML:": "html", "CSS:": "css", "JavaScript:": "js" };

// The path get_example takes for a demo
export const demoPath = (slug) => `examples/${DEMO_CATEGORY}/${slug}`;

/**
 * @param {string} markdown a docs page as the site serves it
 * @returns {{ markdown: string, demos: {slug, title, url, scripts: string[], html, css, js}[] }}
 */
export function takeDemos(markdown) {
  const L = markdown.split("\n");
  const out = [];
  const demos = [];
  let i = 0;
  while (i < L.length) {
    const m = EXAMPLE.exec(L[i]);
    let j = i + 1;
    while (m && j < L.length && !L[j].trim()) j++;
    if (!m || !/^Scripts: /.test(L[j] || "")) { out.push(L[i]); i++; continue; }
    const demo = { slug: m[3], title: m[1], url: m[2], scripts: L[j].slice(9).split(",").map((s) => s.trim()).filter(Boolean) };
    j++;
    // Labelled fenced blocks follow, until a line that is not one
    for (;;) {
      let k = j; while (k < L.length && !L[k].trim()) k++;
      const key = LABELS[(L[k] || "").trim()];
      if (!key) break;
      let s = k + 1; while (s < L.length && !L[s].trim()) s++;
      if (!/^```/.test(L[s] || "")) break;
      let e = s + 1; while (e < L.length && !/^```\s*$/.test(L[e])) e++;
      demo[key] = L.slice(s + 1, e).join("\n");
      j = e + 1;
    }
    if (!demo.js) { out.push(L[i]); i++; continue; } // not a demo after all: leave it
    demos.push(demo);
    out.push(`Example: [${demo.title}](${demo.url}). Its code: get_example(path: "${demoPath(demo.slug)}").`);
    i = j;
  }
  return { markdown: out.join("\n").replace(/\n{3,}/g, "\n\n"), demos };
}

const quote = (s) => JSON.stringify(s);

// Every demo sets the same system-font rule on body; it has nothing to do with
// the chart. What stays is the chart's size and any real styling.
const BODY_FONT = /body\s*\{\s*font-family:[^}]*\}\s*/;
export const demoCss = (css) => (css || "").replace(BODY_FONT, "").trim();

// The docs keep their demos to the setting they show, so most load only the
// Animated theme. A chart built from one should still follow the skill.
export const FOCUSED = "It shows one setting in isolation: for a chart you build, start the themes with `Animated` and `ResponsiveMax`.";

/** The example file for a demo shown on the given docs pages ([{ path, title }]). */
export function demoExample(demo, pages, scraped) {
  const where = pages.map((p) => `"${p.title}" (get_doc(path: "${p.path}"))`);
  const from = where.length === 1 ? `the docs page ${where[0]}` : `the docs pages ${where.slice(0, -1).join(", ")} and ${where[where.length - 1]}`;
  return [
    "---",
    `title: ${quote(demo.title)}`,
    `source: ${quote(demo.url)}`,
    `category: ${quote(DEMO_CATEGORY)}`,
    `scraped: ${quote(scraped)}`,
    `docsPages: ${JSON.stringify(pages.map((p) => p.path))}`,
    "---",
    "",
    `A demo from ${from}.${/ResponsiveMax/.test(demo.js) ? "" : ` ${FOCUSED}`}`,
    "",
    "## JavaScript",
    "",
    "```javascript",
    demo.js,
    "```",
    "",
    "## HTML",
    "",
    "```html",
    demo.html || '<div id="chartdiv"></div>',
    "```",
    "",
    ...(demoCss(demo.css) ? ["## CSS", "", "```css", demoCss(demo.css), "```", ""] : []),
    "## Required resources",
    "",
    ...demo.scripts.map((s) => `- ${s}`),
    "",
  ].join("\n");
}

/**
 * Writes the demos of one docs page as examples. A demo already written for
 * another page keeps that page in its list.
 */
export function writeDemos(root, page, demos, scraped) {
  const dir = join(root, "extended", "examples", DEMO_CATEGORY);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  const titleOf = (path) => {
    const f = join(root, "extended", path + ".md");
    const m = existsSync(f) && /^title:\s*"(.*)"\s*$/m.exec(readFileSync(f, "utf8"));
    return m ? JSON.parse(`"${m[1]}"`) : path;
  };
  for (const demo of demos) {
    const file = join(dir, demo.slug + ".md");
    let paths = [page.path];
    if (existsSync(file)) {
      const m = /^docsPages:\s*(\[.*\])\s*$/m.exec(readFileSync(file, "utf8"));
      if (m) paths = [...new Set([...JSON.parse(m[1]), page.path])].sort();
    }
    const pages = paths.map((path) => (path === page.path ? page : { path, title: titleOf(path) }));
    writeFileSync(file, demoExample(demo, pages, scraped));
  }
}
