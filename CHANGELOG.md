# Changelog

All notable changes to this project are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

> Entries for versions up to 1.2.0 were reconstructed from git history.

## [1.4.0] - 2026-08-05

### Added
Brought the skill and served docs up to date with **amCharts 5.20.0** (2026-07-22) and **5.20.1** (2026-08-03). Everything below was verified against the `@amcharts/amcharts5@5.20.1` type definitions and default themes, not the changelog text alone.

- **Themes** — documented the ~20 themes added in 5.20.0: new palettes (`Midnight`, `Ember`, `Nord`, `Pastel`, `Petroleum`, `Savanna`, `Colorblind`, `Patterns`) and dark variants (`DatavizDark`, `FrozenDark`, `KellyDark`, `MaterialDark`, `MoonriseDark`, `SpiritedDark`, `NordDark`, `PastelDark`, `ColorblindDark`, `PatternsDark`). The old flat list in `SKILL.md` was replaced with a categorized table.
- **Parameterized themes** — `Monochrome` and `Adaptive` ship as **factory functions**, not classes, and take a settings object (`color`/`accent`/`count`/`dark`, `baseColor`/`baseColor2`/`count`/`dark`). Documented in `SKILL.md`, `cursorrules`, and `extended/concepts/themes.md` with full option defaults.
- **Patterns** — new `StarPattern` and `TrianglePattern` classes (`extended/reference/starpattern.md`, `trianglepattern.md`, plus their settings interfaces) and the `rotateShapes` setting on `RectanglePattern`/`StarPattern`/`TrianglePattern`, including why it should be preferred over a whole-pattern `rotation`.
- **WordCloud shape support** (5.20.1) — `svgPath`, `maskByShape`, `shapeTolerance`, plus `randomizeAngles` and `allowNesting`, with worked examples in `references/wordcloud.md`. Also documented the `series.shape` element (style `fill`/`stroke` only — geometry and `forceHidden` are series-managed).
- **XY** — `XYChart.strokeWidths` / `strokeDasharrays` (cycled across line series like `colors`), `XYCursor.clickTolerance`, `Series.fillGradient` / `strokeGradient`, bullet paint inheritance, and post-creation changes to series value fields and `xAxis`/`yAxis`.
- **Events** — `globalpointerdown` added to `extended/concepts/events.md`, alongside the previously undocumented `globalpointermove`/`globalpointerup`.
- **Stock** — a table of the 5.19.0–5.20.0 indicator behavior changes (Volume Profile distribution, `MACross` default periods, Williams %R lookback, Momentum first value, RSI flat-market result, Acceleration Bands `factor` scaling and band order, CCI typical price), plus the new `scale`/`maxValue`/`step` properties on `IIndicatorEditableSetting`.
- **Root/security** — `sanitizeHTML` and export `escapeFormulas` (5.19.0), `ariaLabel` on the focusable-element container, and `MapChart.projectionName` (5.19.0).

### Fixed
- **`extended/reference-generated/` is no longer loaded, served, or published.** `src/content-fs.js` walked all of `extended/` with no exclusions, so the work-in-progress generated reference (1,311 files) loaded alongside the served `extended/reference/`. This made `search_all` / `search_docs(scope:'all')` return every class twice, and `get_doc`'s not-found message advertise an unfinished section. It also shipped: `files: ["extended/"]` packs from the filesystem, not from git, so untracked did not mean unpublished — the tarball was 2,845 files / 11.6 MB unpacked (now 1,534 / 4.9 MB). Excluded in three places, since any one alone is insufficient: `EXTENDED_SKIP_DIRS` in the loader, `.gitignore`, and a `!extended/reference-generated/` negation in `files`.
- **`npm test` now exits non-zero when a test fails.** `test.js` printed ✗ for failures but called `process.exit(0)` unconditionally, so a fully red suite reported success to any caller.
- **`MapPointSeries` pitfall corrected** in `SKILL.md`, `cursorrules` and `references/map.md`. It claimed points "silently won't appear" unless `latitudeField`/`longitudeField` are declared, which contradicted the same file's note that these became defaults in 5.16.1. Verified against 5.20.1 (`MapPointSeries.js` calls `_setRawDefault("longitudeField", "longitude")` and the latitude equivalent): data using exactly `latitude`/`longitude` needs no declaration; only other field names do.
- `server.json` version bumped to match `package.json` — it was left at 1.3.2.

### Added
- CI test workflow (`.github/workflows/test.yml`) running the suite on every push and PR, plus a tarball check that fails the build if `reference-generated/` would ship. The Cloudflare deploy workflow now runs the tests before deploying, so a failing build cannot reach the hosted server.
- Two regression tests (24 total, was 22): `get_doc` with a bad path must return a graceful error listing no work-in-progress sections, and `search_all` must not return duplicates from a stray reference set.

### Changed
- **`WordCloud` breaking change in 5.20.1 is called out explicitly** in `SKILL.md`, `cursorrules`, `references/wordcloud.md` and the served `iwordcloudsettings` reference: the layout is now computed synchronously in one pass, `dataItem.get("ghostLabel")` no longer exists, and code walking `series.children` for labels must use `series.labels` / `dataItem.get("label")` instead.
- `references/stock.md` now uses `maType` rather than the deprecated `type` in its Moving Average example.
- `references/wordcloud.md` no longer claims WordCloud cannot render words into a shape — that became false in 5.20.1.
- Corrected several WordCloud defaults in the served reference against `WordCloudDefaultTheme`: `maxFontSize` 15%, `minFontSize` 2%, `angles` `[0, -90]`, `step` 15, and `autoFit` **true** (the typings' `@default false` is stale).
- Regenerated `extended/reference-generated/` from `@amcharts/amcharts5@5.20.1` (1311 files, was 1282 at 5.19.1).

## [1.3.2] - 2026-06-29

### Fixed
- **Audited every documented setting against the installed `@amcharts/amcharts5@5.19.1` type definitions and runtime, and corrected settings that don't exist on the class they were documented under** (amCharts silently ignores unknown settings, so these failed silently):
  - **Timeline** (`references/timeline.md`, `cursorrules`): removed the phantom `yAxisInnerRadius` (Serpentine/Spiral) and chart-level `inversed` (Spiral). Kept the real `yAxisRadius` (a `Percent`, default 50%) and documented that curve band radius lives on the chart for Serpentine/Spiral, or on `AxisRendererCurveY.axisLength` for a plain `CurveChart`.
  - **XY** (`references/xy.md`): `arrangeFields` → the real `arrangeTooltips`.
  - **Stock** (`references/stock.md`): indicator class `MovingAverageCross` → `MACross`; the `periodselected` event fires on `PeriodSelector`, not `stockChart`.
  - **UI elements** (`references/ui-elements.md`): `Button` has no `togglable` setting or `isActive()` method → use `toggleKey: "active"` and `.get("active")`.
  - **Word cloud** (`references/wordcloud.md`): corrected defaults (`maxFontSize` 100, `minFontSize` 10, `angles` [0], `randomness` 0).
  - **Gantt** (`references/gantt.md`): `childCellSize` default 0.8 (was 0.7); `excludeWeekends` default false; `sidebarWidth` is `number | Percent`, default 30%.
- Added the missing `yAxisRadius` property to the scraped `ISerpentineChartSettings` / `ISpiralChartSettings` reference (`extended/reference/`), which the API reference served as incomplete.

## [1.3.1] - 2026-06-29

### Security
- Updated build/dev dependencies in the `agents` / `wrangler` tree to clear 7 advisories (hono, fast-uri, ip-address, path-to-regexp, qs, @hono/node-server). These are transitive devDependencies; no change to the stdio/npm or Worker runtime behavior.

### Changed
- Deduplicated the content build step in the Cloudflare deploy workflow (it previously ran `build:worker` twice per deploy).

## [1.3.0] - 2026-06-19

### Added
- **Self-hostable remote MCP server on Cloudflare Workers.** The server can now
  be deployed as a public HTTPS endpoint and connected by URL — no install
  required — in addition to the existing npm/stdio usage.
  - Streamable HTTP transport at `/mcp` and legacy SSE at `/sse`
    (`cloudflare/index.js`, via `McpAgent` + a SQLite-backed Durable Object).
  - Build step that bundles all skill + extended content into the Worker
    (`scripts/build-worker-content.js`, `npm run build:worker`).
  - One-push auto-deploy via GitHub Actions
    (`.github/workflows/deploy.yml`) — every push to `main` rebuilds and deploys.
  - `wrangler.jsonc` config and `dev:worker` / `deploy` npm scripts.
  - `cloudflare/DEPLOYMENT.md` with one-time setup instructions.
- `npm test` script wired to the existing `test.js` suite.

### Changed
- Refactored content loading and tool registration into shared, transport-agnostic
  modules (`src/content.js`, `src/content-fs.js`, `src/tools.js`) so the stdio
  server and the Worker run identical logic from a single source. **No change to
  stdio/npm behavior** (verified: all 22 tests pass).

### Fixed
- `test.js` no longer hard-codes a local absolute path; it resolves the project
  directory relative to itself.

## [1.2.0]

### Changed
- Updated documentation for amCharts 5.16.2–5.18.0 API changes.

### Added
- `MapSankeySeries` example in the extended examples.

## [1.1.9]

### Added
- `get_api_reference` tool for per-class API + settings/defaults lookup.
- `scope` parameter on `search_docs` to optionally include the extended docs.
- Real ES-module imports in `get_quick_start` (distinct from the CDN/HTML form).
- Server version now sourced from `package.json`.

## [1.1.8]

### Fixed
- Skill submodule: `MapSankeySeries` data timing; added a further example.

## [1.1.6]

### Fixed
- Skill submodule: corrected `mapCircles` to `nodes.mapPolygons`.

## [1.1.5]

### Fixed
- Cursor line hiding now uses `forceHidden` instead of `visible: false`.

## [1.1.4]

### Added
- MIT `LICENSE` file.

## [1.1.3]

### Added
- MCP Registry metadata (`server.json`).

## [1.1.0]

### Added
- Extended documentation, code examples, and per-class API reference with
  inheritance notes.

## [1.0.0]

### Added
- Initial release of the amCharts 5 MCP server (stdio): chart references,
  core skill docs, search, quick-start templates, and examples.
