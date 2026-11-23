# amCharts 5 MCP server: working guide

The amCharts 5 MCP server (npm `@amcharts/amcharts5-mcp`, hosted at https://mcp.amcharts.com/mcp) and the amCharts 5 skill it serves.
- How it's built: `docs/architecture.md`.
- Running your own hosted copy: `cloudflare/DEPLOYMENT.md`.
- Releases (npm, the hosted server, the MCP registry and the plugins) are done by the amCharts team.

## Where things are

| What | Where |
|---|---|
| Tools and search | `src/tools.js`, `src/content.js`, `src/geodata.js`; stdio entry `src/index.js`; `src/content-fs.js` loads the content from disk |
| Hosted server (Cloudflare Worker) | `cloudflare/index.js`, `wrangler.jsonc` |
| The skill | submodule `amcharts5-skill/` (repo amcharts/amcharts5-skill): `amcharts5-skill/SKILL.md`, `amcharts5-skill/references/*.md`, `cursorrules`. Its own rules: `amcharts5-skill/AGENTS.md` |
| Docs pages | `extended/` (imported from docs.amcharts.com, see "The docs copy") |
| API reference | `extended/reference/` (generated: `npm run build:reference`) |
| Examples | `extended/examples/<category>/` (amcharts.com demos), `json-configs/` (generated: `npm run build:json-configs`), `docs-demos/` (the docs pages' demos, written by the docs importer) |
| Geodata index | `extended/geodata/index.json` (generated: `npm run build:geodata`) |
| Claude plugin | `plugin/` (generated from the skill by `npm run build:plugin`; only `plugin/README.md` and `plugin/icon.png` are hand-written) |
| ChatGPT plugin | `npm run build:openai` builds `dist/openai-plugin-<version>.zip`; its listing is `scripts/openai-listing.json` |
| Tests | `npm test`: example and docs-link checks, the plugin copy check, then `test.js` (tool calls against the server) |

Don't edit generated files by hand; change the generator or its input and rebuild.

## Rules for what the skill and the server say

These cover the skill (SKILL.md, the references, cursorrules), the tool descriptions, and the notes we add to `extended/`.

- **Describe only the latest amCharts release.**
  - No version history: no "since 5.x", "fixed in", "before 5.x", "older versions", "no longer", and no "(5.21.0)" tags. Users are on the latest version, and history only makes the skill bigger.
  - When a release fixes a bug, its pitfall and any workaround are removed, not annotated.
  - SKILL.md keeps one "New in <latest>" list, because models are trained before new settings exist. Each release replaces the list instead of adding to it.
  - Version numbers stay only where they decide what code to write: a package's minimum version (e.g. a framework package's peer range), and the CDN path or version pin a page should load.
  - Version history goes in `CHANGELOG.md`. The API reference has its `@since` tags.
- **No workarounds for library bugs.** When a check finds a library bug, report it to the amCharts library team and keep it out of the skill and the docs copy. That covers workarounds and "still broken in x.y" notes alike. Documented behaviour, and recipes built from the public API for things the library has no setting for, belong in the skill.
- **Verify every claim against the released library before writing it.**
  - Settings and types come from the installed typings of the pinned devDependency `@amcharts/amcharts5`. Follow the full `extends` chain before calling a setting missing.
  - Defaults resolve in the library's order: the class's soft defaults (`_setSoft`), theme rules (`*DefaultTheme`), the class's own defaults (`_setDefault`), then the `@default` tag. A `get()` fallback in the code is the default only when none of these sets one. The generated API reference resolves defaults this way.
  - Behaviour claims are checked in a browser against `https://cdn.amcharts.com/lib/version/<version>/`.
  - Changelog prose is not proof.
- **Write plainly.** Short sentences, current behaviour, lists and tables for options and steps. Say what to do, not what changed.

## The docs copy (`extended/`)

- Pages are imported from the docs site's Markdown (`https://docs.amcharts.com/v5/<path>.md`) with `node scripts/import-docs-md.mjs [--write] <path>…`.
  - Without `--write` it only reports.
  - Its report lists the lines our earlier commits added to a page that the new page lacks.
- **Hand notes.** Keep a note we added only if it states current behaviour that neither the page nor the skill has. Write it as a line starting `NOTE `, without version history.
- **Wrong live pages.** If a live page is wrong for the current release, correct our copy and report it to the docs team (repo amcharts/docs).
- **Check each import.** Every code line in the page's source (`src/content/docs/v5/<path>.mdx` in amcharts/docs) must be in our copy.
- **Embedded demos.** The site writes each embedded demo out in full. The importer moves them to `extended/examples/docs-demos/<name>.md` and leaves a `get_example` pointer on the page (`scripts/docs-demos.mjs`).
- **Old links.** Links to the old `www.amcharts.com/docs/v5/` addresses are rewritten by `scripts/docs-links.cjs`; `npm test` fails on any that remain.

## The amcharts.com demos (`extended/examples/<category>/`)

- **Import.** `npm run build:examples` scrapes every demo listed in amcharts.com's demos sitemap (`/demos/sitemap.xml`), then cleans and checks them.
  - `npm run build:examples -- --changed` scrapes only the demos that are new or whose source changed (the sitemap's `<lastmod>`) after our copy was scraped.
  - `npm run build:examples -- <name>` scrapes one.
- **Folders.** A demo we already have keeps its folder. A new demo's category comes from its page's link to its gallery section; `CATEGORY_NAMES` in `scripts/scrape-demos.js` maps the site's names to our folders.
- **Removed demos.** The import lists examples whose demo is gone from the site; delete them if that is intended.
- **When.** Re-import when demos are added or changed on the site (the website team tells the MCP maintainers), and before each release, so the examples follow the skill's rules and the current library.

## Making changes

- **Setup.** Clone with the submodule, `git clone --recurse-submodules` (or run `git submodule update --init` in a clone), then `npm ci`. Without the submodule the tests and builds fail.
- **Pull** with the submodule: `git pull --recurse-submodules`.
- Work on a release branch (`release-<version>`). A push to `main` deploys the hosted server, so pushing to `main`, here or in the skill repo, and publishing are for the maintainers.
- **Skill edits.** Commit them in the submodule, then run `npm run build:plugin` here: `npm test` fails while `plugin/` differs from the skill.
- **Tests.** `npm test` must pass, and a fix to tool behaviour or search ranking gets a test.
- **Review.** Have every change reviewed before release by someone, or an independent agent, other than its author. Give the reviewer the sources of truth: the typings, the library source at the release tag, a browser.
- **Versions.** Suggest the next version when a change is worth one, without waiting to be asked: a patch for fixes and content updates, a minor when the server or skill gains something new (a tool, a tool argument, server instructions, a new kind of answer), a major for a change that breaks existing clients.
- **Commits.** No AI attribution trailers. Stage only the files your change is about, not `git add -A`: local working files and notes don't belong in a commit.
- **Privacy.** When the Worker changes, keep README's "Privacy" section true: idle sessions are deleted after 24 hours, and Workers invocation logs are off.
- **Hosted costs.** Before each release and at least once a month, check the Worker's usage in Cloudflare: Durable Objects stored data, requests and rows written, log volume, and the invoice.
  - Stored data should stay level. If it keeps growing, objects aren't being deleted.
  - When the Worker or the `agents` package changes, run `npm run check:storage`. It runs the Worker locally and fails if any way a session can end leaves storage behind.

## Gotchas

- In Git Bash on Windows, heredocs mangle backslashes, which breaks regexes in inline `node -e` or `node - <<EOF` scripts. Write such scripts to a file.
