# Changelog

All notable changes to this project are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

> Entries for versions up to 1.2.0 were reconstructed from git history.

## [1.6.0] - 2026-09-29

### Fixed
- **36 of the 284 examples served JavaScript that did not parse** (e.g. `candlestick-ohlc/candlestick-chart`, most stacked-area and sankey demos, `timeline/infinity-timeline`): `get_example` returned code that threw a `SyntaxError` before the chart was created. `scripts/clean-examples2.js` unescaped the demo code a second time after `JSON.parse` had already decoded it, turning `\n` and `\"` inside string literals into raw line breaks and bare quotes. The code is now used as parsed, and every example was re-scraped and re-cleaned. All 284 parse, and all run in headless Chromium against the amCharts 5.20.8 CDN except three whose upstream demos are broken on amcharts.com too (two load data from a dead `s.cdpn.io` bucket, one uses an undefined `homeButton`).
- **Example descriptions:** inline `<style>` / `<svg>` markup from demo pages leaked CSS into six map examples; HTML entities (`&nbsp;`, `&rarr;`, numeric) were left undecoded while `&amp;lt;` was decoded twice; indented lines rendered as markdown code blocks.
- `maps/map-sankey-series` had no HTML, CSS or "Required resources" section, so it did not say which scripts to load.
- **Pre-existing errors in the docs and reference:**
  - The phantom `ChartSerializer` setting `includeProjection` is removed; it does not exist.
  - `includeStates` / `includeAdapters` default to `true`, not `false`.
  - Projections set by name or with a bundled `am5map.geoXxx()` factory do round-trip; the docs listed all projections as unsupported.
  - `am5.ease.pow` was listed as a plain easing, but it is `pow(t, e)` and returns `NaN` without an exponent.
  - A plain `Serializer`'s `functionsAs` defaults to `"string"`.
  - Missing defaults were added for `clipFront`, `stateAnimationDuration` and `stateAnimationEasing`.
  - `latitudeField` was described as longitude.
  - A missing `to` row was added to `AnimationOptions`.
  - An unterminated string was fixed in the serializer's custom-label sample.
- **Security:** `npm audit fix` cleared 19 advisories (11 high, e.g. `fast-uri`, `undici`, `hono`) in transitive dependencies of the MCP SDK and `wrangler`. This changes only the lockfile.

### Changed
- **Examples refreshed from amcharts.com (2026-09-29).** Besides the 36 fixes, about 80 demos that amCharts has rewritten since the March scrape now show current 5.20.x code: `SerialChartContainer` for hierarchy / flow / venn / word cloud, `colorByDataItem`, map points on lines as data rows, and declared `animations`.

### Added
- **amCharts 5.20.6 – 5.20.8** (2026-09-16 to 2026-09-23) in `SKILL.md`, `cursorrules`, the chart references, the served docs and the API reference. Everything was verified against the 5.20.8 source and npm typings, and the new snippets were run in a browser:
  - **New API:**
    - The `animations` setting on every element: animations described as data, which round-trip through JSON. It is new page `reference/ideclaredanimation`.
    - `ChartSerializer` / `Serializer` `runningAnimations`.
    - `am5.ease.byName()` / `easingInfo()`, with new page `reference/ieasinginfo`.
    - Series links: `urlField` / `linkTarget` / `openUrl()` and the data item's `url`.
    - `MapPointSeries` `lineIdField` / `positionOnLineField` / `autoRotateField` / `autoRotateAngleField`, so points on lines can be plain data rows.
    - An auto-rotating point turns to face its travel direction.
  - **Version-tag note:** the 5.20.8 additions carry `@since 5.21.0` in the typings and in the live API reference, but ship in 5.20.8. They are documented as 5.20.8.
  - **Behavior changes:**
    - Series data no longer has to follow `CategoryAxis` order.
    - Log axis labels use round powers of ten.
    - `axisHeader` content added later gets room.
    - A `Container` `background` `templateField` reads the data item.
    - `CSVParser.parse("")` no longer hangs. It returns `[{}]` by default and `[]` with `useColumnNames: true`.
    - `JsonParser` resolves forward references, so a legend inside an `axisHeader` round-trips.
    - User `themeTags` are serialized.
    - Map data rows drop geodata properties.
- **Example tooling:**
  - `npm run build:examples [-- slug …]` scrapes, cleans and checks.
    - Cleaning always runs, even when some demos failed to scrape, and the exit code reports any failure.
  - `npm run clean:examples` runs the cleaning passes on their own.
  - `npm run check:examples` checks every example for a JavaScript block that parses, a "Required resources" list and no raw `demoData` left over.
  - `npm test` now runs `check:examples` first, so CI and the deploy workflow reject a broken example.
  - `scripts/scrape-demos.js` takes demo slugs, rejects unknown ones and stamps the real scrape date.
  - `scripts/clean-examples2.js` reads `demoData` from the JavaScript section. It no longer "repairs" invalid JSON, which could rewrite the code inside it; such a file is left raw and fails the check. This makes `scripts/clean-examples.js` redundant, so it is removed.
  - `scripts/clean-all.js` takes a directory. It never rewrites fenced code, and no longer glues text onto a following fence when it strips an empty image link.

## [1.5.0] - 2026-09-14

### Added
Brought the skill and served docs up to date with **amCharts 5.20.2 – 5.20.5** (2026-08-13 to 2026-09-03). Every new setting was verified against the library source (`@since 5.20.x` tags, default themes and `_setRawDefault` calls), not the changelog text — which mattered twice: `MapChart.boxZoom` is an enum naming the modifier key, not a boolean, and `updateTargets` is an option of `JsonParser.parse()`, not a parser setting.

- **New API (5.20.2–5.20.4)** in `SKILL.md`, `cursorrules` and the served reference: `MapChart.doubleClickZoom` (default **true** — a behavior change) and `boxZoom` / `boxZoomSelection`; `MapLineSeries` `pointIds` data field with `pointSeries` / `pointIdsField`; column series `colorByDataItem` + `colors`; `Scrollbar.opposite`; `Root.fontFamily` / `fontSize` / `fontWeight`; `ChartSerializer.includeRoot` and the top-level `root` config section; `JsonParser.parse(config, { updateTargets })`; `Entity.once()` / `onceDebounced()`; and the new `am5.SerialChartContainer` (with its `zoomTools` setting and `zoomableContainer` property) — new served pages `reference/serialchartcontainer`, `iserialchartcontainersettings` and `iparsesettings`.
- **Serialization guide** — a new "Serializing to JSON" section in `SKILL.md` and expanded `concepts/serializing*` docs: only user-set settings are serialized (5.20.3), Gantt is now supported, adapters never round-trip (skipped on parse since 5.20.4; crashed the chart before), serialize the top container child rather than a bare series (`selectedDataItem` cycles), and what `ChartSerializer` still does not capture as of 5.20.5 (`ZoomableContainer` contents, Venn `hoverGraphics` / slice states).
- **Behavior changes (5.20.2)** — bullets on flow nodes, `ArcDiagram` nodes and funnel/pyramid slices are now positioned properly; an unpainted bullet takes its own slice/node color and is therefore invisible unless styled. Noted in `SKILL.md`, `references/flow.md` and a new "Bullets on slices" section in `references/pie.md`.
- **Gotchas surfaced by editor tooling**, each verified at runtime or in source: custom GeoJSON needs **clockwise** exterior rings or the map floods (`references/map.md` + pitfall #34, with a rewind snippet and `zoomToGeoBounds`); `axis.dispose()` does not remove an axis from `chart.xAxes`/`yAxes` — use `removeValue()` (pitfall #35, `references/xy.md`); `DateAxis` format maps need `markDirtySize()` and `groupIntervals` needs the data re-set to take effect live; heat rules on bullets need `valueField` + `calculateAggregates` and a `Template` target, with the serializer crash explained; a `ColorSet` must hold ≥1 color; HeatLegend segments are styled through `markers.template` with a width/height-by-orientation thickness rule; the "shared vs per-sprite tooltip" model with the correct `tooltipText` target per chart type; WordCloud parser settings re-parse `text` since 5.20.0.
- **"Settings that already equal the default — omit them"** — a verified cheat-sheet in `SKILL.md` (hierarchy depth/branch settings, percent `alignLabels`, `maskBullets` **true**, `connect`, `noRisers`, …) so generated code stops restating defaults.
- Every `series.bullets.push(...)` example in the skill and `cursorrules` now uses the `function(root, series, dataItem)` signature (24 call sites), which is what JSON round-trips require; pitfall #36 states the rule.

### Fixed
- **Phantom `MapChart` settings removed** from an in-progress `SKILL.md` edit: `keyboardNavigation`, `keyboardRotateStep` and `keyboardPanStep` do not exist in 5.20.5 (no such identifiers anywhere in the library source or changelog).
- **`get_section` now accepts the source label search results print** (`skill/SKILL.md`, `skill/xy`, `extended/concepts/events`, `reference/xycursor`, with or without `.md` / prefixes) and reaches extended docs as well as skill files. Previously every form of the printed label was rejected with `File "skill/SKILL.md" not found`, so a truncated result could not be expanded.
- **`search_docs` truncation no longer loses the answer.** Excerpts still cut at 2,000 characters (6,000 when only one or two sections match), but a truncated excerpt now ends with the exact `get_section(...)` call that returns the full section and quotes up to eight query-matching lines that fell beyond the cut. Re-querying with wording from the truncated line previously returned the same excerpt cut at the same point.
- **`get_doc` exposes the skill corpus** under `skill/<name>` and lists `skill` among the available sections; `get_section` / `get_doc` responses carry a `(source: …)` line that is itself a valid identifier.
- `package-lock.json` root version was stale at 1.3.2; now tracks `package.json`.

### Added
- Four regression tests (28 total): `get_section` with a search-result label and with an extended path, `get_doc('skill/SKILL.md')`, and a truncated `search_docs` excerpt carrying the fetch hint and matching lines.

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
