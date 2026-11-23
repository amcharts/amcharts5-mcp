# Architecture

## Summary

- The server answers AI assistants' questions about amCharts 5 from content in this repo: the skill, the docs pages, the API reference, examples and a geodata index. It answers from that content only and calls no other service. The hosted server also keeps each session's MCP initialize message for up to 24 hours (see "Hosted server").
- One codebase runs two ways:
  - **npm package**, stdio: `src/index.js`, run with `npx @amcharts/amcharts5-mcp`;
  - **hosted Cloudflare Worker**, Streamable HTTP and SSE: `cloudflare/index.js`, at https://mcp.amcharts.com/mcp.

  Both use `src/content.js` (content and search) and `src/tools.js` (the tools), so they behave the same.
- Most content is generated from a pinned amCharts release. The skill is the curated layer on top.

## Content

| Content | Source | Built by |
|---|---|---|
| Skill: SKILL.md and the references | repo amcharts/amcharts5-skill (submodule `amcharts5-skill/`); its `cursorrules` copy is for Cursor users and isn't served | written by hand |
| Docs pages (`extended/<path>.md`) | docs.amcharts.com, each page's Markdown | `scripts/import-docs-md.mjs`, page by page |
| Docs demos (`extended/examples/docs-demos/`) | the demos embedded in docs pages | the same importer (`scripts/docs-demos.mjs`) |
| amcharts.com demos (`extended/examples/<category>/`) | amcharts.com/demos | `scripts/build-examples.js` |
| JSON configs (`extended/examples/json-configs/`) | the npm package's `examples/<name>/config.json` | `npm run build:json-configs` |
| API reference (`extended/reference/`) | the npm package's typings (TypeScript compiler API), with defaults resolved from theme rules | `npm run build:reference` (`scripts/generate-reference.cjs`; facts the typings lack go in `scripts/reference-notes.md`) |
| Geodata index (`extended/geodata/index.json`) | `@amcharts/amcharts5-geodata` at `GEODATA_VERSION` | `npm run build:geodata` |

Links in the content point at docs.amcharts.com: `scripts/docs-links.cjs` rewrites old `www.amcharts.com/docs/v5/` links when pages are imported and the reference is generated.

The npm package ships `src/`, `extended/` and the skill files (copied into `content/` on publish). `src/content-fs.js` loads them from disk, from the submodule or from `content/`. The Worker gets everything bundled into `cloudflare/content.generated.js` (`npm run build:worker`, run by the deploy job; about 10 MB raw, 2 MB compressed).

## Tools

- **Skill:**
  - `get_core_reference`: SKILL.md;
  - `get_chart_reference`: one reference;
  - `list_chart_types`;
  - `get_section`: one section of any doc.

  A reference over `OVERVIEW_CAP` (12,000 characters) comes as an overview: its first sections, and a list of the rest for `get_section`.
- **Docs and reference:**
  - `get_doc`: a docs page or a skill file;
  - `get_api_reference`: one class or interface.
- **Examples:**
  - `list_examples`, `get_example`: by path, by name, or by amcharts.com demo or docs embed address;
  - `get_quick_start`: a runnable example from the chart's reference.
- **Maps:** `list_geodata`, with each map's CDN path, global name and import.
- **Search:**
  - `search_all`: everything, meaning the skill, the docs pages, the API reference and the examples;
  - `search_docs`: the skill. With `scope: "all"` it covers everything, like `search_all`.
- **Pasted links.**
  - `search_all`, `search_docs`, `get_doc` and `get_example` answer an amcharts.com demo, docs or reference address in their input with the call that returns it (`linkPointer()` in `src/tools.js`).
  - `get_api_reference` takes a reference address.

## Search

`rankContent()` in `src/content.js`, shared by both search tools.
- **Ranking:** BM25 over word tokens. Identifiers are split into words (`strokeSettings` also indexes as `stroke` and `settings`), so a rare API name pins the pages that use it.
- **Titles:** they weigh more than body text, and a unit whose titles cover most of the query is boosted.
- **Coverage:** a unit's score is scaled by the share of the query it matches.
- **Length:** normalised per kind (skill, docs, examples).
- **Units:**
  - A skill section is one unit. A section over `SPLIT_OVER` (6,000 characters) is searched by its `###` subsections, and a hit names its parent section.
  - Docs demos rank at half weight, so they don't crowd out the skill and the amcharts.com demos on shared words. They still come first when searched by name.
- **Order:** the skill gets a small boost on near-ties. Further sections of the same doc count a little less each, so one page can't fill the results.

## Hosted server

- **What runs it:** `cloudflare/index.js` serves the same tools on two routes.
  - `/mcp` builds a server for each request (`cloudflare/stateless-mcp.js`): no sessions, nothing stored.
  - The legacy `/sse` needs a connection that spans requests, so it uses an `McpAgent` (Cloudflare's `agents` package), one Durable Object per session.
- **Privacy:**
  - SSE sessions are deleted 24 hours after their last request.
  - Workers invocation logs are off, so the logs don't hold request headers.
  - README's "Privacy" section describes this and must stay true.
- **Deploying:** a push to `main` runs the tests and deploys (`.github/workflows/deploy.yml`, wrangler).

## Plugins and listings

- **Claude plugin:** `plugin/`, generated from the skill. Anthropic's plugin directory follows `main`.
- **ChatGPT plugin:** `npm run build:openai` builds a ZIP that is uploaded on platform.openai.com. Its listing text is `scripts/openai-listing.json`.
- **MCP registry:** `server.json`, published as `io.github.amcharts/amcharts5`.

The amCharts team publishes each release to these.
