# skill (part 4)

## Recent API changes

Latest release covered here: **5.23.0** (2026-11-19), with geodata 5.2.0, and the framework packages react 5.0.1, vue 5.0.2, angular 5.0.1, svelte 5.0.3 and react-native 5.0.4. These are the renames, new settings and behaviors that code written from older knowledge most often gets wrong — prefer these names/settings. For exact types and defaults, use the typings (`*.d.ts`) or the amCharts MCP server's `get_api_reference`, which is generated from them; for anything newer, verify against the live docs (see next section).

**Renamed settings (old name still works but is deprecated — use the new one):**

| Class(es) | Old | New |
|-----------|-----|-----|
| `MovingAverage`, `MovingAverageDeviation`, `MovingAverageEnvelope`, `BollingerBands` | `type` | `maType` |
| `VoronoiTreemap` | `type` | `shapeType` |

```js
// Moving-average indicators: use maType, not type
am5stock.MovingAverage.new(root, { maType: "exponential", period: 20 });
am5hierarchy.VoronoiTreemap.new(root, { shapeType: "rectangle" }); // not type
```

**WordCloud labels:** the layout is computed synchronously in one pass. There is no per-data-item `ghostLabel`, and labels live in an internal container, so reach them with `series.labels` / `dataItem.get("label")`, not by walking `series.children`.

**Framework packages:** `@amcharts/amcharts5-react`, `@amcharts/amcharts5-vue`, `@amcharts/amcharts5-angular`, `@amcharts/amcharts5-svelte` and `@amcharts/amcharts5-react-native`. They make and dispose the chart with the component and work with server rendering. Prefer them over hand-written `Root.new()`/`dispose()` code in those frameworks. See "Frameworks".

**New in 5.23.0 (2026-11-19):**
- **Touch:** `root.touchGestures` is `"chart"` (default), `"tap"` or `"auto"`. With `"auto"`, which ResponsiveMax sets, a vertical swipe over the chart scrolls the page and a sideways or two-finger swipe works the chart, so phones need no tap first. With ResponsiveMax, don't set `root.tapToActivate`. See "Responsive rules".
- **Value axis decimals:** `preferredDecimals` lists the decimal counts labels may show. With `[0, 2]`, labels read `48.50` and `49.00` instead of `48.5` and `49.0`, and whole prices stay whole. The axis tooltip shows the step's decimals plus `extraTooltipPrecision`, rounded up to the list. Not used with the axis's own `numberFormat`, nor on logarithmic axes. See `references/stock.md`.
- **Stock toolbar:** `autoFit` folds the controls that don't fit in one row. ResponsiveMax turns it on.
- **ResponsiveMax** on charts 400 px wide or less: horizontal chart scrollbars hide too, and pinching zooms instead; stock charts get less padding.
- **Number formats** without decimals drop floating-point noise: `#,###` shows 6708.044000000005 as `6,708.044`.
- react-native 5.0.4 loads 5.23.0.

**Settings and methods worth knowing** (newer than most training data):

*Declared animations, links, map points on lines*
- `animations` setting on **every** element: an array of `IDeclaredAnimation` entries `{ key, from?, to, duration, delay?, loops?, yoyo?, easing?, ease?, target? }` — animations described as data (`loops: 0` = forever, `easing` by **name**, `target: "dataItem"` for data-item values). Round-trips through JSON. `IDeclaredAnimation` is not exported from the package index. See "Animations" above for the snippet, defaults and the `from` caveat.
- `am5.ease.byName(name, mode?)` / `am5.ease.easingInfo(fn)` — easing function ↔ name; only the 8 named base easings (and `out`/`inOut`/`yoyo` of them) have names. See "Easing functions" above.
- `ChartSerializer`: `runningAnimations` (default `true`) — saves endless code-started loops as `animations` entries. See "Serializing to JSON" above.
- `Series` links: `urlField` (no default — links are off until set) names the data field holding a URL; the data item's `url` field gets it. Clicking the item's bullet (any series), column (`ColumnSeries`, candlestick, OHLC, Gantt…), slice (pie, funnel, pyramid, pictorial, Venn), `MapPolygon` or `MapLine` opens it in `linkTarget` (default `"_self"`; `"_blank"` opens with `noopener`; a chart inside an iframe usually wants `"_blank"` or `"_top"`). `cursorOverStyle: "pointer"` is set automatically unless you set one. `javascript:`/`data:`/`vbscript:` URLs are never opened. Override `series.openUrl(dataItem)` to intercept clicks. `urlField` can be set after the data, and a URL added later (`data.setIndex()`) links too. **Not linked:** hierarchy nodes, flow nodes/links, word-cloud labels, `MapSankeySeries` nodes.
- `MapPointSeries`: `lineIdField` (default `"lineId"`), `positionOnLineField` (`"positionOnLine"`), `autoRotateField` (`"autoRotate"`), `autoRotateAngleField` (`"autoRotateAngle"`) — a point on a line can be a plain data row `{ lineId: "jfk-lhr", positionOnLine: 0.5, autoRotate: true }` instead of `pushDataItem({ lineDataItem, positionOnLine })`, so it is saved by `ChartSerializer`. Data values of `autoRotate`/`autoRotateAngle` win over the bullet's. See `references/map.md`.
- `MapPointSeries`: an auto-rotating point turns round to face its travel direction on the way back — **only** while a bullet-sprite `animations` entry (`target: "dataItem"`, `key: "positionOnLine"`, e.g. with `yoyo: true`) moves it toward the line start. A point moved by `dataItem.animate()` in code is not flipped; that code must turn it.

*Themes & styling*
- Palette themes: `Midnight`, `Ember`, `Nord`, `Pastel`, `Colorblind`, `Patterns`, `Petroleum`, `Savanna`, plus `*Dark` variants of most palettes. Two parameterized factory themes, `Monochrome` and `Adaptive` — see "Parameterized themes" above.
- Fill patterns `am5.StarPattern` (`radius`, `innerRadius`, `spikes`, `gap`, `checkered`) and `am5.TrianglePattern` (`maxWidth`, `maxHeight`, `gap`, `checkered`).
- `rotateShapes` on `RectanglePattern`/`StarPattern`/`TrianglePattern`: `rotation` then spins each shape around its own center instead of the whole grid — tiles seamlessly and is much faster. Prefer it over a whole-pattern `rotation` on large tiles.
- `Series`: `fillGradient` / `strokeGradient` settings, handed to bullets (the series' own fills, lines and columns don't use them: set gradients on `fills.template` / `columns.template` / `strokes.template`). A bullet `Graphics` with no paint of its own (`fill`, `fillGradient`, `fillPattern`, `stroke`, `strokeGradient`) inherits all of them from its series — and on pie, funnel, flow and hierarchy charts, from its own slice/node.

*XY charts*
- `XYChart`: `strokeWidths` (array of pixel widths) and `strokeDasharrays` (array of dash arrays) — cycled across line series as they are added, exactly like `colors`. Lets series be told apart without relying on color, e.g. with the `Patterns` theme.
- `XYCursor`: `clickTolerance` (default `0`) — how many pixels outside the plot area a press may start and still begin a zoom/selection. The selection itself still starts at the plot edge.
- `XYSeries`: a value field (`valueYField`, `openValueYField`, …) can be changed after creation — re-set the series data afterwards for it to take effect. A series can also be reassigned to a different `xAxis`/`yAxis` after creation.
- Column series (`ColumnSeries`, `CandlestickSeries`, `OHLCSeries`, …): `colorByDataItem: true` (default `false`) gives each column its own color from the series' `colors` (`ColorSet`) setting — the series makes its own `ColorSet` if none is given. The color lands on the data item's `fill` field. Prefer this over an adapter on `columns.template` `fill`: it is declarative and survives JSON serialization.
- `Scrollbar`: `opposite: true` (default `false`) puts a chart's `scrollbarX` **below** the plot and `scrollbarY` to the **left**, instead of above / right. Only affects scrollbars set via `chart.set("scrollbarX"/"scrollbarY", …)`. This is a **different** setting from `opposite` on `AxisRendererX`/`AxisRendererY`.

*WordCloud*
- `svgPath` arranges words into a shape (experimental), with `maskByShape` to clip them to the outline and `shapeTolerance` to control spill (negative = padding inside). See `references/wordcloud.md`.
- `randomizeAngles: false` cycles `angles` in order for a reproducible layout; `allowNesting: false` packs words as non-overlapping bounding boxes (use it when labels have opaque backgrounds).
- `angles` accepts **any** angle (e.g. `[0, -30, -45]`).

*Core / events*
- `globalpointerdown` event on all elements — fires on a press anywhere on the chart surface, mirroring `globalpointermove`/`globalpointerup`.
- `Root`: `sanitizeHTML` (default `true`) — dynamically-set HTML (`html`/`labelHTML`, HTML tooltips, modal content) is sanitized; set `false` in code to opt out. A JSON config's `root` section can't turn it off unless parsed with `trusted: true`. Exports have `escapeFormulas` (default `true`) to guard CSV/XLSX against formula injection.
- `Root`: `ariaLabel` is applied to the `<div>` holding the chart's focusable elements.
- `Label`: `oversizedBehavior: "truncate"` ignores `maxHeight` (there is no way to truncate text vertically).
- A `Container`'s `Rectangle`/`RoundedRectangle` background defaults `crisp` to `true` unless set explicitly.
- A `Container`'s `background` with its own `templateField` reads the container's data item, so a per-bullet label background works: `am5.Label.new(root, { text: "{valueY}", populateText: true, background: am5.RoundedRectangle.new(root, { templateField: "labelBg" }) })` with `labelBg: { fill: am5.color(0xff0000) }` in the data row.
- `Root`: `fontFamily`, `fontSize` (number or string) and `fontWeight` (`"normal" | "bold" | "bolder" | "lighter"`, or `"100"` … `"900"`) settings — defaults for **all** text elements unless overridden on an element. Set them in `am5.Root.new("chartdiv", { fontFamily: "Inter" })` or `root.setAll({...})` instead of a custom theme rule on `Label`.
- `am5.SerialChartContainer` — a directly usable `SerialChart` whose `seriesContainer` sits inside a `ZoomableContainer` (exposed as `chart.zoomableContainer`), so series such as `ForceDirected` can be zoomed and panned. Exported from the **`am5` root module**, not a chart package. Optional `zoomTools` setting takes a `ZoomTools` instance whose `target` is pointed at the series container automatically. Bullets on its series are drawn, flow-chart bullets included. See `references/hierarchy.md`.

*JSON config / serialization*
- Gantt charts serialize and parse. Cross-references are written as references (`"@series.get('fill')"`) instead of copies; large values (a map's `geoJSON`, a `Root`'s locale) are written as the name of the pack they came from and rebuilt on parse.
- `JsonParser` resolves **forward references**: a setting/property naming a ref defined further down the config is resolved after the rest instead of throwing "Could not find ref" — a legend inside an `axisHeader` naming a series round-trips. Axis-range `axis`/`series` lookups are immediate, so keep those ordered.
- Map data rows written by `ChartSerializer` don't carry the geodata's own feature properties (`name`, `CNTRY`, `TYPE`); a row left with only its id is dropped.

*Bullets on non-XY charts*
- `ArcDiagram`: bullets on nodes are placed on the node circle, `locationX`/`locationY` being fractions of it. Flow charts (`Sankey`/`Chord`): node bullets are children of the node, drawn above its shape and below its label, positioned relative to the node. `FunnelSeries`/`PyramidSeries`: bullet `locationX`/`locationY` follow the slice's sloping edges instead of its bounding box.
- A bullet `Graphics` with no paint of its own takes the color of **its own slice or node** on pie, funnel, flow and hierarchy charts — so it is the same color as what it sits on and **invisible** unless offset, stroked, or given a contrasting `fill` deliberately. Setting `fill` on the bullet sprite turns the inheritance off.

*Maps*
- `MapChart`: `doubleClickZoom` (default **`true`**: a double click/tap zooms in, shift + double click zooms out; set `false` to opt out). On maps panned by rotating (`panX: "rotateX"` / `panY: "rotateY"`) the clicked point rotates to the center, otherwise it stays under the pointer. `boxZoom: "none" | "drag" | "shift" | "ctrl" | "alt"` (default `"none"`) is **not a boolean** — it names the key held while dragging a rectangle to zoom into; `"drag"` needs no key, so pair it with `panX`/`panY: "none"`. The rectangle is the readonly `chart.boxZoomSelection` element (a `Rectangle`). There are no keyboard-navigation settings on `MapChart`.
- `MapLineSeries`: `pointIds` data field (`{ pointIds: ["JFK", "LAX"] }`) names the `MapPointSeries` points a line connects, looked up in the series given by the `pointSeries` setting; `pointIdsField` (default `"pointIds"`) renames the field. `pointsToConnect` wins if both are set. See `references/map.md`.
- `MapChart`: `projectionName` — string alternative to `projection`, e.g. `"geoOrthographic"`, mainly for JSON config. Register extra ones with `am5map.registerProjection()`. Unused bundled projections tree-shake away.
- `MapSankeySeries` — Sankey overlaid on a map; it resolves `sourceId`/`targetId` once the `polygonSeries` geoJSON loads, so no `datavalidated` wrapper is needed. See `references/map.md`.

*Hierarchy & axes*
- `Tree`: `fitNodes` (exclude hidden nodes from layout), `nodeSeparation` (custom node-spacing fn), `clustered` (dendrogram layout — leaves at same depth).
- `ValueAxis`: `syncZeros` (align zero across synced axes — needs `syncWithAxis`).
- `Hierarchy`: `parentIdField` setting + `setFlatData(data)` method — feed flat `{id, parentId}` data instead of nested `children`.

*Stock*
- Indicator numeric settings enforce min/max limits. `IIndicatorEditableSetting` has `scale`, `maxValue` and `step`.
- Volume Profile spreads each bar's volume across its full high/low range. See `references/stock.md`.

*All entities*
- `onDebounced(key, cb, delay)` / `offDebounced(key, cb?)` and `onPrivateDebounced` / `offDebouncedPrivate` — fire once after rapid changes settle.
- `once(key, cb)` and `onceDebounced(key, cb, delay)` — like `on()`/`onDebounced()` for a **settings** key, but the callback fires only the first time that setting changes, then removes itself. Both return an `IDisposer`. (Distinct from `events.once("eventName", …)` for events.)
- `Label`: `fontFamily: "inherit"` uses the chart container's computed font. Text markup takes font names with spaces and font lists: `[fontFamily: 'Source Code Pro', monospace]`.

## Verify unfamiliar API before using it

If you are unsure whether a method, property, or setting exists on an amCharts 5 class, **verify it before using it**. Check the class reference (class name in lowercase, e.g. `LineSeries` → `lineseries`):

1. **Primary:** `https://docs.amcharts.com/v5/reference/{classname}/` — e.g. `https://docs.amcharts.com/v5/reference/lineseries/`
2. **Fallback (if primary is unavailable):** Check the TypeScript source on GitHub — `https://raw.githubusercontent.com/amcharts/amcharts5/master/src/.internal/charts/` and navigate to the relevant file. Settings interfaces are named `I{ClassName}Settings`.

Common source file paths:
- XY series: `charts/xy/series/{ClassName}.ts`
- XY axes: `charts/xy/axes/{ClassName}.ts`
- Pie: `charts/percent/pie/{ClassName}.ts`
- Radar: `charts/radar/{ClassName}.ts`
- Map: `charts/map/{ClassName}.ts`
- Hierarchy: `charts/hierarchy/{ClassName}.ts`
- Flow: `charts/flow/{ClassName}.ts`
- Core sprites: `core/render/{ClassName}.ts`
