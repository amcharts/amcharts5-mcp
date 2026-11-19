---
name: amcharts5
description: >
  Build any chart with the amCharts 5 JavaScript library — XY (line, area, bar,
  column, candlestick, scatter), pie, donut, funnel, pyramid, geographic maps,
  hierarchy (treemap, sunburst, force-directed), flow (Sankey, chord, arc), radar,
  gauge, stock/financial, word cloud, Venn, Gantt, and timeline charts. Use this
  skill whenever the user mentions amCharts, asks for amCharts 5 code, needs a
  JavaScript chart built with amCharts, wants to create any data visualization
  using the amCharts library, is migrating from amCharts v4 to v5, or needs help
  with amCharts configuration, theming, exporting, tooltips, legends, or axis
  setup, including amCharts in React, Next.js, Vue, Nuxt, Angular, Svelte or
  React Native apps. Also use when the user mentions chart types that amCharts supports, even
  if they don't say "amCharts" explicitly, if amCharts is already present in the
  project or was discussed in the conversation.
metadata:
  author: amCharts
  version: 1.0.0
  category: code
  tags: [charts, maps]
  documentation: https://docs.amcharts.com/v5/
  support: contact@amcharts.com
---

# amCharts 5

Build any chart with the amCharts 5 JavaScript charting library.

Docs: https://docs.amcharts.com/v5/

## Critical rules — apply to ALL chart types

1. **Check demos first (if you can browse the web)** — Before building a chart, search or browse https://www.amcharts.com/demos/ for a demo that matches the user's request. Demo source code is the most reliable starting point — adapt it rather than writing from scratch. Skip this step if you have no web access.
2. **Read the docs (if you can browse the web)** — For unfamiliar features or configuration, check https://docs.amcharts.com/v5/ for guides and tutorials. The docs explain concepts, patterns, and options that the class reference alone does not. Skip if you have no web access.
3. **Always use amCharts 5** — never v3 or v4. The APIs are completely different.
4. **Use `.new()` factory** — never `new ClassName()`. Every object is created via `ClassName.new(root, { settings })`.
5. **Root is always the first argument** to `.new()` (except Root itself, which takes a div ID).
6. **Set data last** — once data is set, objects are created. Configuration applied after may not take effect.
7. **Colors use `am5.color()`** — e.g. `am5.color(0xff0000)`, `am5.color("#ff0000")`, or `am5.color("rgb(255,0,0)")`. Never raw hex strings.
8. **Percent values use `am5.percent()`** — e.g. `am5.percent(50)`, not `50` or `"50%"`.
9. **Every axis needs a renderer** — `am5xy.AxisRendererX.new(root, {})` or `AxisRendererY`.
10. **CategoryAxis must receive data** — call `xAxis.data.setAll(data)` in addition to series data. Forgetting this is the #1 bug.
11. **DateAxis values must be timestamps** — use `new Date().getTime()`, not Date objects.
12. **Disposal is mandatory in SPAs** — in React, Vue, Angular, Svelte or React Native use amCharts' framework package, which creates and disposes the root for you (see "Frameworks"); without one, call `root.dispose()` on component unmount. Not `chart.dispose()`.
13. **Style through amCharts, not CSS** — charts draw on canvas by default, so CSS cannot reach chart internals. Even with the optional SVG renderer the shapes carry no per-element classes or ids, are rewritten as the chart redraws, and exports ignore page CSS. Use amCharts settings/templates/themes instead.
14. **Dark backgrounds require Dark theme** — If the user requests or the page clearly has a dark background, always add `am5themes_Dark.new(root)` to `root.setThemes()` after Animated and ResponsiveMax. Without it, labels, grid, and tooltips will be invisible. If the background is not clearly dark, default to white/light and do NOT add the Dark theme unless asked.
15. **Use default amCharts colors** — Do NOT invent custom color palettes unless the user explicitly asks for specific colors. amCharts assigns colors automatically from its built-in ColorSet. If you need a color programmatically, use `chart.get("colors").getIndex(index)` or `chart.get("colors").next()`. For pie/percent charts, use `series.get("colors")` instead. With 3 or more series in one XY chart, the default colors are close blues and violets (hues 18° apart): set `chart.get("colors").set("step", 3)` before adding series, or use the `Colorblind` theme (see "ColorSet").
16. **Every chart gets `Animated` and `ResponsiveMax`** — `root.setThemes([am5themes_Animated.new(root), am5themes_ResponsiveMax.new(root)])`, with a palette or `Dark` theme after them. ResponsiveMax fits labels and legends at any size and adapts the chart on small screens: axis labels are spaced to fit, legends shrink and then scroll, and scrollbars give way to pinch zoom on phones. Import `@amcharts/amcharts5/themes/ResponsiveMax`, or load `themes/ResponsiveMax.js` after `themes/Animated.js`. One exception: a `Micro` sparkline keeps `Micro` alone.

## Package / module map

| Chart family | ES module import | CDN script | Main classes |
|-------------|-----------------|-----------|-------------|
| Core | `@amcharts/amcharts5` | `index.js` | Root, Theme, Legend, Tooltip, Label, Container |
| XY charts | `@amcharts/amcharts5/xy` | `xy.js` | XYChart, axes, series |
| Pie / Sliced | `@amcharts/amcharts5/percent` | `percent.js` | PieChart, SlicedChart, PieSeries, FunnelSeries, PyramidSeries, PictorialStackedSeries |
| Map | `@amcharts/amcharts5/map` | `map.js` | MapChart, MapPolygonSeries, MapPointSeries, MapLineSeries, MapSankeySeries, PixelMapSeries, MapRasterSeries, NightSeries |
| Hierarchy | `@amcharts/amcharts5/hierarchy` | `hierarchy.js` | Treemap, VoronoiTreemap, ForceDirected, Sunburst, Pack, Partition, Tree |
| Flow | `@amcharts/amcharts5/flow` | `flow.js` | Sankey, Chord, ChordDirected, ChordNonRibbon, ArcDiagram |
| Radar | `@amcharts/amcharts5/radar` | `radar.js` | RadarChart, AxisRendererCircular, AxisRendererRadial |
| Stock | `@amcharts/amcharts5/stock` | `stock.js` | StockChart, StockPanel, StockToolbar |
| Timeline | `@amcharts/amcharts5/timeline` | `timeline.js` | CurveChart, SerpentineChart, SpiralChart, CurveLineSeries, CurveColumnSeries |
| Word cloud | `@amcharts/amcharts5/wc` | `wc.js` | WordCloud |
| Venn | `@amcharts/amcharts5/venn` | `venn.js` | Venn |
| Gantt | `@amcharts/amcharts5/gantt` | `gantt.js` | Gantt (also needs `xy.js` and `plugins/colorPicker.js`, both before `gantt.js`) |
| Geodata | `@amcharts/amcharts5-geodata/*` | `geodata/*.js` | worldLow, usaLow, etc. |
| Themes | `@amcharts/amcharts5/themes/Animated`, `@amcharts/amcharts5/themes/ResponsiveMax` | `themes/Animated.js`, `themes/ResponsiveMax.js` | am5themes_Animated, am5themes_ResponsiveMax |
| Exporting | `@amcharts/amcharts5/plugins/exporting` | `plugins/exporting.js` | Exporting, ExportingMenu |
| JSON | `@amcharts/amcharts5/plugins/json` | `plugins/json.js` | ChartSerializer, JsonParser |
| Chart element | `@amcharts/amcharts5/element` | `element.js` (after `plugins/json.js`) | `<am5-chart>` — see "Serializing to JSON" |
| Framework packages | `@amcharts/amcharts5-react`, `-vue`, `-angular`, `-svelte`, `-react-native` (separate npm packages) | — | `useAmChart`, `<AmChart>`, `[amChart]`, `attachAmChart` — see "Frameworks" |

**Plain HTML, no bundler.** Load the script files ("CDN script" above) with `<script>` tags: `index.js` first, then the chart packages, then themes. They are on the amCharts CDN (`https://cdn.amcharts.com/lib/5/index.js`), and in the npm package's `dist/` folder, so npm CDNs serve them. On jsDelivr they are under `https://cdn.jsdelivr.net/npm/@amcharts/amcharts5@5.23.0/dist/`, with the same file names: `index.js`, `xy.js`, `themes/Animated.js`, `themes/ResponsiveMax.js`.

- **Which CDN:** cdn.amcharts.com by default. Where only npm CDNs are allowed (Claude artifacts and other AI sandboxes, strict CSPs), use jsDelivr or unpkg (`https://unpkg.com/@amcharts/amcharts5@5.23.0/dist/index.js`). The files are also at `node_modules/@amcharts/amcharts5/dist/`.
- **Pin one version for every file,** and use classic script tags, not `type="module"`: the lazy parts (PDF, Excel and annotation export) load from the `deps/` folder beside `index.js`.
- **Maps:** the package's `dist/geodata/` has only `worldLow.js` and `usaLow.js`. Other maps are in the `@amcharts/amcharts5-geodata` package's `dist/`, at the same path as below `geodata/` on the amCharts CDN (`dist/worldLow.js`, `dist/region/world/europeLow.js`), on jsDelivr (`https://cdn.jsdelivr.net/npm/@amcharts/amcharts5-geodata@5.2.0/dist/worldLow.js`) and unpkg.
- **PDF fonts** (`am5fonts_*`) are only on cdn.amcharts.com.

**Bundling.** Keep code splitting on (esbuild: `splitting: true`, `format: "esm"`). With the stock toolbar's drawing or indicator controls, `<am5-chart>`, the JSON plugin or the exporting plugin, a single-file bundle inlines the exporting plugin's lazy parts (PDF, Excel, annotations), about 1 MB gzipped more: a stock chart with those controls loads about 275 KB gzipped split, 1.4 MB as one file (the toolbar itself and `PeriodSelector` add almost nothing). So does `import * as am5stock` when the whole namespace object is kept (assigned to a variable or `window`); `am5stock.StockChart` and the like keep only what they use. A stock chart without those controls bundles to about 130–200 KB, core + `xy` to about 170 KB. The script files gzipped: `index.js` + `xy.js` 182 KB, + `stock.js` 260 KB. Docs: https://docs.amcharts.com/v5/getting-started/#bundling.

**The npm package also ships** `AGENTS.md`, `docs/` (a bundled copy of these notes, possibly older) and `examples/<name>/index.ts` (62 also as `config.json`; `examples/examples.json` lists what each shows). When the package is installed, those examples are verified starting points.

## Which reference to read

Based on the chart type the user is building, read the relevant reference file for detailed API, patterns, and examples:

| User wants | Read |
|-----------|------|
| Line, area, bar, column, candlestick, OHLC, scatter, stacked charts | `references/xy.md` |
| Pie, donut, semi-circle, funnel, pyramid, pictorial stacked charts | `references/pie.md` |
| World map, country map, choropleth, bubble map, point map, map sankey, pixel/dot map, satellite image or day/night map, globe with raised arcs | `references/map.md` |
| Treemap, sunburst, force-directed, pack, partition, tree, org chart | `references/hierarchy.md` |
| Sankey, chord, arc diagram, alluvial, flow visualization | `references/flow.md` |
| Radar, spider, polar chart, gauge, speedometer, meter | `references/radar.md` |
| Financial stock chart, candlestick with indicators, trading chart | `references/stock.md` |
| Serpentine, spiral, curve chart, custom-shape timeline | `references/timeline.md` |
| Gantt chart, project timeline, task management chart | `references/gantt.md` |
| Word cloud, tag cloud, sentence cloud | `references/wordcloud.md` |
| Venn diagram, set overlap visualization | `references/venn.md` |
| Interactive controls: buttons, sliders, steppers, color pickers | `references/ui-elements.md` |
| A chart as a JSON config: "JSON config", "amCharts JSON", a `<am5-chart>` element, a framework package's `config` prop, a Chart Maker link | `references/json.md` (with the chart type's reference for its settings) |

If the chart type is unclear, start with `references/xy.md` — XY charts are by far the most common.

If the user asks about core setup (theming, colors, exporting, legends, tooltips, disposal, responsive) without a specific chart type, the information below is sufficient — no reference file needed. For a chart in a React, Vue, Angular, Svelte or React Native app, read "Frameworks" below as well as the chart type's reference.

## Root element setup

```js
const root = am5.Root.new("chartdiv"); // div id or HTMLElement reference

// Apply theme(s): Animated and ResponsiveMax on every chart; a palette or Dark after them
root.setThemes([am5themes_Animated.new(root), am5themes_ResponsiveMax.new(root)]);

// Set locale (optional)
import am5locales_de_DE from "@amcharts/amcharts5/locales/de_DE";
root.locale = am5locales_de_DE;

// Set date/number formats (optional)
root.dateFormatter.setAll({ dateFormat: "yyyy-MM-dd" });
root.numberFormatter.setAll({ numberFormat: "#,###.##" });

// Time zone (optional): date axes, formatters, data grouping and the stock
// PeriodSelector/DateRangeSelector follow it; root.utc = true for UTC
root.timezone = am5.Timezone.new("America/New_York");
```

One Root per DOM element: a second `am5.Root.new()` on the same element throws "You cannot have multiple Roots on the same DOM node", so dispose the old root first. Separate elements on one page can each have their own Root (for example, a chart in a modal), and each is disposed on its own.

**Canvas or SVG.** Charts draw on canvas by default. `am5.SVGRenderer` draws the same chart as live SVG instead — it can only be chosen when the root is created:

```js
const root = am5.Root.new("chartdiv", { renderer: am5.SVGRenderer });
// or, before creating any root, for every chart on the page:
am5.Root.defaultRenderer = am5.SVGRenderer;
```

Charts look and behave the same with either (text is measured the same way, interaction and image export work as usual); only blend modes `DST_OVER`, `SRC_ATOP` and `XOR` are canvas-only (drawn as normal in SVG, with a console warning). Keep the canvas default unless the user asks for SVG in the page. An SVG **file** does not need it — `am5.renderToSVG()` and the exporting menu make SVG from either renderer (see "Exporting"). In SVG mode pointer input is still resolved by amCharts (the `<svg>` layers have `pointer-events="none"`), so attach handlers with `events.on()`, not DOM listeners.

**Available themes:**

| Kind | Themes |
|------|--------|
| Behavioral | `Animated` (animations), `ResponsiveMax` (on every chart: fits labels, legends and scrollbars; see "Responsive rules"), `Micro` (stripped-down micro charts, alone), `Responsive` (a size-based theme, which mostly hides parts on small charts) |
| Light palettes | `Dataviz`, `Frozen`, `Kelly`, `Material`, `Moonrise`, `Spirited`, `Ember`, `Nord`, `Pastel`, `Petroleum`, `Savanna`, `Colorblind` (Okabe-Ito, color-blindness safe), `Patterns` (pattern fills instead of flat colors) |
| Dark | `Dark`, `Midnight`, plus a dark variant of most palettes: `DatavizDark`, `FrozenDark`, `KellyDark`, `MaterialDark`, `MoonriseDark`, `SpiritedDark`, `NordDark`, `PastelDark`, `ColorblindDark`, `PatternsDark` |
| Parameterized | `Monochrome`, `Adaptive` — see below |

Palette themes are additive: put them after `Animated` and `ResponsiveMax`, e.g. `root.setThemes([am5themes_Animated.new(root), am5themes_ResponsiveMax.new(root), am5themes_Nord.new(root)])`. The `*Dark` variants already carry dark interface colors, so do NOT also add `Dark`.

## Colors

```js
// From hex integer or CSS string — only these forms are valid
am5.color(0xff0000)
am5.color("#ff0000")
am5.color("rgb(255, 0, 0)")

// WRONG — {r,g,b} objects are NOT accepted
// am5.color({ r: 255, g: 0, b: 0 })  // throws!

// Lighten / darken — STATIC methods on am5.Color (NOT instance methods)
am5.Color.lighten(am5.color(0xff0000), 0.3)   // lighter
am5.Color.lighten(am5.color(0xff0000), -0.3)  // darker (use negative value; there is NO .darken())
am5.Color.brighten(am5.color(0xff0000), 0.3)  // brighter
// WRONG: am5.color(0xff0000).lighten(0.3) — this does NOT work, lighten is not an instance method

// Color sets (auto-cycle)
chart.get("colors").getIndex(0)   // first color in palette
chart.get("colors").next()        // next color

// Custom color set
chart.get("colors").set("colors", [
  am5.color(0x095256),
  am5.color(0x087f8c),
  am5.color(0x5aaa95),
  am5.color(0x86a873),
  am5.color(0xbb9f06)
]);

// A color on a scale through several colors: position 0–1, clamped, colors evenly spaced; a third argument "hsl" blends in HSL (default "rgb")
var ic = root.interfaceColors;
var mid = am5.Color.interpolateColors(0.5, [ic.get("negative"), ic.get("warning"), ic.get("positive")]);   // = warning
```

The interface color `warning` is a yellow between `negative` (red) and `positive` (green), for the middle of a bad-to-good scale. Prefer `interpolateColors()` through it over `am5.Color.interpolate(t, negative, positive)`, whose middle is brown.

## Legend

```js
const legend = chart.children.push(am5.Legend.new(root, {
  centerX: am5.percent(50),
  x: am5.percent(50),
  layout: root.horizontalLayout  // or verticalLayout, gridLayout
}));
// XY charts:
legend.data.setAll(chart.series.values);
// Pie/Percent charts:
legend.data.setAll(series.dataItems);
```

**A legend that fits: `autoFit: true`.** As room runs out, it fits the legend in steps:
1. Empty value labels give their room back.
2. A legend that fits at three quarters of its size or more gets smaller.
3. One that wouldn't fit even then scrolls instead, usually at full size, and item names too wide are shortened.
4. When not even one row fits, the legend is hidden.

Above or below the chart it takes at most 30% of the chart's height, beside it at most 40% of its width. A `width`, `height`, `maxWidth`, `maxHeight`, `scale` or `verticalScrollbar` you set on the legend is kept. Without it, a long legend below a pie can take the whole chart and leave the pie no room.

**A right-to-left chart**, for Hebrew or Arabic: set the Root's `direction` when you create it.

```js
const root = am5.Root.new("chartdiv", { direction: "rtl" });
```

- Text with no `direction` of its own is drawn right to left.
- Legends start on the right: a row's first item is on the right, and a vertical legend lines its items up on its right edge. Each item reads from the right: the marker, then the name, then the value.
- `"ltr"` keeps everything left to right, e.g. an English chart on a `dir="rtl"` page.
- Not set, text follows the CSS direction of the chart's element, and legends stay left to right.

Set it in `Root.new()` (or a JSON config's `root` section), not later. Don't also set `reverseChildren` on legend items: the two undo each other and the legend flips back.

A `Label` with a `width` keeps its text inside its box for every `textAlign` and `direction`: `left` and `right` are the box's sides, `start` and `end` follow the direction.

## Tooltip

```js
series.set("tooltip", am5.Tooltip.new(root, {
  labelText: "{name}: {valueY}"   // data placeholders in {}
}));
```

**Placeholders:** `{name}`, `{valueX}`, `{valueY}`, `{categoryX}`, `{categoryY}`, `{value}`, `{category}`, `{valuePercentTotal}`, `{sum}`.

**Inline formatting:** `"[bold]{name}[/]: [fontSize: 20px]{value}[/]"`

Numbers in placeholders get thousands separators (`{year}` shows `2,024`): see "Number formats".

**A tooltip with no text renders as an empty bubble.** Enabling a `am5.Tooltip` without `labelText` (or `series.tooltipText`) shows a blank tooltip. Series text lives on `tooltip.labelText` or `series.set("tooltipText", ...)`; for column/bar charts the text usually goes on `series.columns.template.set("tooltipText", "{categoryX}: {valueY}")`.

### Styling a tooltip

The tooltip background is a **`PointedRectangle`** (NOT a `RoundedRectangle`), so it has a single `cornerRadius` — there are no `cornerRadiusTL/TR/BL/BR`:

```js
const tooltip = am5.Tooltip.new(root, { labelText: "{valueY}" });

// Background color + shape — must turn OFF getFillFromSprite, else bg copies the series color
tooltip.set("getFillFromSprite", false);
tooltip.get("background").setAll({
  fill: am5.color(0x000000),
  fillOpacity: 0.8,
  stroke: am5.color(0xffffff),
  strokeOpacity: 0.3,
  cornerRadius: 6        // single radius — PointedRectangle, not four corners
});

// Text color — must turn OFF autoTextColor (it auto-picks for contrast), then set on the label
tooltip.set("autoTextColor", false);
tooltip.label.setAll({ fill: am5.color(0xffffff) });   // tooltip.label is read-only accessor

series.set("tooltip", tooltip);
```

`getStrokeFromSprite` (default `false`) copies the sprite's stroke color when `true`.

### Shared vs per-sprite tooltip

Setting **only** `tooltipText` on a sprite (no `tooltip:` instance anywhere on it) is enough to get a hover tooltip: the sprite lazily resolves the **Root's shared default `Tooltip`** (`sprite.getTooltip()` returns it). You only need your own `am5.Tooltip.new(root, {...})` when that element's tooltip must **look different** from the shared one, or on XY charts, where series/axis tooltips are **cursor-driven** rather than hover-driven and need their own instance.

So for non-XY charts do not create a Tooltip per series — set `tooltipText` on the right template and style the look once on the shared tooltip:

```js
// Where tooltipText goes on non-XY charts
pieSeries.slices.template.set("tooltipText", "{category}: {value}");   // pie / funnel / venn slices
hierarchySeries.nodes.template.set("tooltipText", "{category}: {sum}"); // hierarchy nodes
flowSeries.nodes.nodes.template.set("tooltipText", "{name}");           // flow nodes
flowSeries.links.template.set("tooltipText", "{sourceId} → {targetId}: {value}"); // flow links
wordCloud.labels.template.set("tooltipText", "{category}: {value}");    // word cloud words
polygonSeries.mapPolygons.template.set("tooltipText", "{name}");        // map polygons (map points: the bullet sprite)

// Style the shared tooltip once — it lives on root.container (applies everywhere no dedicated Tooltip was set)
var shared = root.container.get("tooltip");
shared.set("getFillFromSprite", false);
shared.get("background").setAll({ fill: am5.color(0x000000), fillOpacity: 0.8 });
```

**A tooltip on a `Container` has no background.** The tooltip takes its color from the target's `fill` (`getFillFromSprite`, default `true`), and a Container has none, even with a `background`: only black text shows. Put `tooltipText` on a child that has a fill. An invisible circle as the last child still takes hover and gives a bigger target. Or set `getFillFromSprite: false` and a background fill (above).

```js
pointSeries.bullets.push(function (root, series, dataItem) {
  var box = am5.Container.new(root, {});
  box.children.push(am5.Circle.new(root, { radius: 8, fill: am5.color(0xcc3300) }));
  box.children.push(am5.Label.new(root, { text: "{name}", populateText: true, x: 10, centerY: am5.p50, fontSize: 12 }));
  box.children.push(am5.Circle.new(root, {
    radius: 12, fill: am5.color(0xcc3300), fillOpacity: 0,   // invisible; its fill colors the tooltip
    tooltipText: "{name}"
  }));
  return am5.Bullet.new(root, { sprite: box });
});
```

## Number formats

Numbers in `{placeholders}` use `root.numberFormatter`'s `numberFormat` (default `"#,###.#####"`: separators, at most 5 decimals). Format one placeholder with `{valueY.formatNumber('#,###.00')}`; a `ValueAxis` has its own `numberFormat` and `tooltipNumberFormat`. A `numberFormatter` on a tooltip or a template doesn't change placeholders. Docs: https://docs.amcharts.com/v5/concepts/formatters/formatting-numbers/#rounding-to-whole-numbers, https://docs.amcharts.com/v5/concepts/formatters/formatting-numbers/#years-without-thousands-separators.

| Format | 6708.044000000005 | 1.125 | 2024 |
|---|---|---|---|
| `#,###` | 6,708.044 | 1.125 | 2,024 |
| `#,###.` | 6,708 | 1 | 2,024 |
| `#,###.#` | 6,708 | 1.1 | 2,024 |
| `#,###.00` | 6,708.04 | 1.13 | 2,024.00 |
| `#` | 6708.044 | 1.125 | 2024 |

- The part after `.` decides rounding. With no `.` the decimals stay, unlike Excel's `#,###`, and only floating-point noise is dropped; a format ending in `.` rounds to a whole number. For animated values (`{valueXWorking}` in a bar race) use `'#,###.'`.
- Every number placeholder gets a thousands separator, so a year `{year}` shows `2,024`. Use `{year.formatNumber('#')}`, or keep the year a string in the data.
- Positive, negative and zero formats are split by `|`, not `;` (`"#,###;'-'#,###;0"` prints `500;-500;0`). The negative part still gets a minus unless it has the `s` modifier: `"#,###|(#,###s)|'-'"` gives `1,000`, `(1,000)`, `-`.
- Prices: `root.numberFormatter.set("numberFormat", "#,###.00##")` shows cents, and up to four decimals for small prices (`48.50`, `0.0123`). A value axis formats its labels by its grid step instead; `preferredDecimals: [0, 2]` on it makes them whole numbers or cents (`80`, `100`; `48.50`, `49.00`). See `references/stock.md`.

## Chart title

Do NOT add titles as HTML elements — they are outside the chart and won't appear in exports. Add an `am5.Label` to the container BEFORE the chart, and set `verticalLayout`:

```js
// Option 1: directly on root.container
root.container.children.push(am5.Label.new(root, {
  text: "Chart Title",
  fontSize: "1.3em",
  x: am5.p50,
  centerX: am5.p50
}));
root.container.set("layout", root.verticalLayout);

var chart = root.container.children.push(am5xy.XYChart.new(root, { ... }));

// Option 2: with a wrapper container
var container = root.container.children.push(am5.Container.new(root, {
  width: am5.p100,
  height: am5.p100,
  layout: root.verticalLayout
}));
container.children.push(am5.Label.new(root, {
  text: "Chart Title",
  fontSize: "1.3em",
  x: am5.p50,
  centerX: am5.p50
}));
var chart = container.children.push(am5xy.XYChart.new(root, { ... }));
```

## Exporting

```js
import * as am5plugins_exporting from "@amcharts/amcharts5/plugins/exporting";

const exporting = am5plugins_exporting.Exporting.new(root, {
  menu: am5plugins_exporting.ExportingMenu.new(root, {}),
  filePrefix: "my-chart",
  pngOptions: { quality: 0.8 },
  pdfOptions: { addURL: true }
});
```

**SVG export** works whichever renderer draws the chart. The `ExportingMenu` lists "SVG" by default (`svgOptions: { disabled: true }` removes it; `svgOptions: { precision: 3 }` sets the decimals); in code use `exporting.download("svg")`, `exporting.getSVG()` (markup) or `exporting.exportSVG()` (data URI). Without the plugin, the core has `am5.renderToSVG()`:

```js
// The chart as last drawn — after a change, wait for the frame to be drawn
root.events.once("frameended", function () {
  const svg = am5.renderToSVG(root);                              // SVG markup string
  const part = am5.renderToSVG(series, { background: "#ffffff" }); // one element, where it sits on the chart
});
```

Options: `width`, `height`, `precision` (default `3`), `idPrefix` (`"am5-"`; vary it when several SVGs share a page), `title` (screen-reader name; default the Root `ariaLabel`), `background` (CSS color; default transparent), `includeNonExportable` (default `false`: also write elements marked `exportable: false`, such as scrollbar grips). Left out: elements with `exportable: false` (unless `includeNonExportable`), cross-origin images without CORS, and fully transparent elements. The SVG suits design tools such as Figma: fonts are attributes with sizes in pixels, text is placed without `dominant-baseline`, patterns are drawn as shapes, and layers are named after series, data items, axes and the legend.

## Responsive rules

**`am5themes_ResponsiveMax` goes on every chart** (Critical rule 16). It fits labels and legends at any size, and adapts the chart on small screens, hiding parts only as the last step:

```js
import am5themes_ResponsiveMax from "@amcharts/amcharts5/themes/ResponsiveMax";   // script tag: themes/ResponsiveMax.js
root.setThemes([am5themes_Animated.new(root), am5themes_ResponsiveMax.new(root)]);
```

What it does:
- It turns on the settings in the table below: `autoLabels` on axis renderers and on series (pie labels included), `autoFit` on legends and stock toolbars, and `autoHide` on a chart's scrollbars.
- It sets the root's `touchGestures` to `"auto"`: on a phone, a vertical swipe over the chart scrolls the page. See "Touch" below.
- A vertical scrollbar hides on a chart 400 px wide or less, a horizontal one on a chart 300 px tall or less, or 400 px wide or less. Pinching zooms instead. A stock chart is measured whole, not by panel.
- A stock chart 400 px wide or less gets less padding, and less space above each panel.
- When the chart's div is 400 px or less in either direction, text is drawn at 85% of its size (`fontSize: "0.85em"`).
- Scrollbar margins shrink too: a horizontal scrollbar's when the div is 400 px tall or less, a vertical one's when it is 400 px wide or less.
- Labels you add with your own `fontSize`, such as a title, shrink when the div is smaller than 600 × 450 px, down to three quarters of their size.
- Axis labels get `keepInView`: x axis labels on a chart 400 px wide or less, y axis labels on one 400 px tall or less.
- A Gantt chart 600 px wide or less drops its expand, collapse and color buttons. Its two scrollbars hide at 500 px wide or less, and the horizontal one also at 400 px tall or less; its plot is dragged to move.

A setting you set in code wins over the theme: `autoLabels: false` on one series or renderer turns that part off. The theme also has `addRule()`, as below.

The settings also work on their own. All are off by default:

| Setting | On | Does |
|---|---|---|
| `autoLabels: true` | any axis renderer (`AxisRendererX`, `AxisRendererY`, radar's) | Spaces labels by their own size. A short axis gets more labels (up to about eight). A category axis shows every label that fits, even closer than `minGridDistance`. Long labels are spaced by their width, so there can be fewer than without it. A label that would be cut off, or overlap another axis's labels, is hidden. |
| `autoLabels: true` | `PieSeries` | Moves the pie aside or makes it smaller (down to half the chart's shorter side) to make room. Labels then wrap, are shortened or are hidden, smallest slices first. See `references/pie.md`, "Labels". |
| `autoLabels: true` | any other series | Hides a bullet's label while it overlaps an earlier label or is cut off. The bullet's shape stays. |
| `keepInView: true` | axis labels (`renderer.labels.template`) | A label whose category or date period is only partly in view, such as the first month after zooming, moves into the part in view instead of hiding. It hides only where that part is too short for it. For unrotated labels inside their cell (`location` or `multiLocation` between 0 and 1), as they are by default when every category or period has a label. Where the grid steps over several (every 2 months), labels sit on grid lines unless `multiLocation` is set, e.g. `0.5`. Not for value axis labels. On by default for a Gantt chart's date rows. |
| `autoFit: true` | `Legend` | See "Legend". |
| `autoFit: true` | `StockToolbar` | Folds the controls that don't fit in one row, a step at a time: first the labels of Indicators, Draw, Comparison and the series type control (their icons stay), then the period buttons into one button that lists them. Needs the toolbar's default CSS. |
| `autoHide: 300` | a chart's `scrollbarX` / `scrollbarY` | Hides the scrollbar when the chart is that many pixels across it or less: a `scrollbarX` by the chart's height, a `scrollbarY` by its width. Meanwhile it turns on `pinchZoomX` / `pinchZoomY`, unless that is set in code. |

`ChartSerializer` saves these settings when you set them in code. It does not save what they decide (hidden labels, a smaller legend, the pinch zoom), nor what a theme turns on, so a config saved from a small chart opens full size.

**Touch: `root.touchGestures`** decides who gets a touch gesture that starts on the chart:
- `"chart"` (default): the chart, wherever it drags, pans, zooms or selects, so the page doesn't scroll by a swipe there.
- `"tap"`: the page, until the chart is tapped; then the chart, until `tapToActivateTimeout` passes without a touch.
- `"auto"`: a vertical swipe scrolls the page. A swipe that starts sideways, or uses two fingers, works the chart. Scrollbar grips, buttons, stock drawing tools and radar charts take any swipe that starts on them.

ResponsiveMax sets `"auto"` unless `touchGestures` or `tapToActivate` is set in code. So with ResponsiveMax, don't set `root.tapToActivate`: `true` is the same as `"tap"`. To keep the chart taking every gesture, set `root.touchGestures = "chart"`.

**Rules of your own** go on the `am5themes_ResponsiveMax` instance (`am5themes_Responsive` takes them too, but also hides parts of its own):

```js
const responsive = am5themes_ResponsiveMax.new(root);
responsive.addRule({
  relevant: am5themes_ResponsiveMax.widthXS,  // <= 200px
  applying: function() {
    legend.setAll({ visible: false });
  },
  removing: function() {
    legend.setAll({ visible: true });
  }
});
root.setThemes([am5themes_Animated.new(root), responsive]);
```

## Heat rules

Color or size elements by value. Requires `calculateAggregates: true` on the series (unless `minValue`/`maxValue` are set manually).

```js
// Color columns by value
series.set("heatRules", [{
  target: series.columns.template,
  dataField: "valueY",
  min: am5.color(0xe5dc36),
  max: am5.color(0x5faa46),
  key: "fill"
}]);

// Scale bullet radius by value
series.set("heatRules", [{
  target: bulletTemplate,        // am5.Template.new({})
  dataField: "value",
  min: 3,
  max: 30,
  key: "radius"
}]);

// Through more than two values: `stops` in place of min/max, e.g. red–yellow–green
var ic = root.interfaceColors;
series.set("heatRules", [{
  target: series.columns.template,
  dataField: "valueY",
  stops: [ic.get("negative"), ic.get("warning"), ic.get("positive")],
  key: "fill"
}]);
```

A `radius` rule is linear in radius: areas grow with the square of the value, and the smallest value gets `min`, not zero. For bubbles whose area matches the value, set the radius in the bullet function instead: `radius: maxRadius * Math.sqrt(value / maxValue)` (see `references/xy.md`, "Scatter / Bubble chart").

**Heat rule settings:**

| Setting | Type | Description |
|---------|------|-------------|
| `target` | Template | Element template to apply heat to |
| `key` | string | Setting to modify: `"fill"`, `"radius"`, `"opacity"`, `"strokeWidth"`, `"fontSize"`, etc. |
| `dataField` | string | Data field for the value: `"valueY"`, `"value"`, `"valueX"`, etc. |
| `min` | color/number | Value applied at the lowest data value |
| `max` | color/number | Value applied at the highest data value |
| `neutral` | color/number | Value for elements whose data item has no value (otherwise they keep the template's) |
| `stops` | array | Values for a scale through more than two, in place of `min`/`max`: the lowest data value gets the first, the highest the last, blended between. Numbers, percents or colors, all of one kind |
| `minValue` | number | Override auto-calculated min (skips `calculateAggregates`; `0` is honored) |
| `maxValue` | number | Override auto-calculated max (skips `calculateAggregates`; `0` is honored) |
| `logarithmic` | boolean | Spreads the values between `min` and `max` on a logarithmic scale; zero and below get `min` (default `false`) |
| `customFunction` | function | `(sprite, min, max, value)` — full control over the rule |

Values outside `minValue` / `maxValue` get `min` / `max`.

**Using heat rules on bullets** — bullets need an explicit `am5.Template`, and the series must track the field the rule reads:

```js
var circleTemplate = am5.Template.new({});

series.bullets.push(function(root, series, dataItem) {
  return am5.Bullet.new(root, {
    sprite: am5.Circle.new(root, {
      fill: series.get("fill"),
      tooltipText: "{valueX}: {valueY}"
    }, circleTemplate)              // pass template as 3rd arg
  });
});

series.set("heatRules", [{
  target: circleTemplate,
  dataField: "valueY",
  min: 3,
  max: 25,
  key: "radius"
}]);
```

Rules that make bullet heat rules work (each failure is **silent** — every bullet just comes out the same size):
- `target` must be the **`Template`** the bullet sprites are built from (3rd argument of `am5.Circle.new(...)`), not the sprite and not `series.bullets`.
- `dataField` is the data item **property key** (`"valueY"`, `"valueX"`, `"value"`, …), **not** the raw column name. To size XY bullets by a column that is not already an axis value, register it as the base value field: `series.set("valueField", "population")` and use `dataField: "value"`.
- `calculateAggregates: true` is required (unless `minValue`/`maxValue` are given) — without it `valueLow`/`valueHigh` are never computed and every bullet gets the midpoint size.
- Setting `valueField` (or any `*Field`) **after** the series has processed data does not re-read the data — re-set it: `series.data.setAll(series.data.values.slice())`.
- Bullet heat rules survive `ChartSerializer`.

**HeatLegend:**

```js
var heatLegend = chart.children.push(am5.HeatLegend.new(root, {
  orientation: "horizontal",       // or "vertical"
  startColor: am5.color(0xe5dc36),
  endColor: am5.color(0x5faa46),
  stepCount: 5                     // number of color stops
}));

// Sync legend range with series data: the end labels show these numbers
series.events.on("datavalidated", function() {
  heatLegend.set("startValue", series.getPrivate("valueLow"));
  heatLegend.set("endValue", series.getPrivate("valueHigh"));
});

// Through several colors: `colors` in place of startColor/endColor, matching a heat rule's `stops`
var ic = root.interfaceColors;
var scaleLegend = chart.children.push(am5.HeatLegend.new(root, {
  orientation: "horizontal",
  colors: [ic.get("negative"), ic.get("warning"), ic.get("positive")]
  // stepCount: 1 (default) = a gradient through them; with stepCount > 1, one step per color
}));
```

`startText`/`endText` replace the numbers at the ends: with `startText: "Low"` the label says only "Low", whatever `startValue` is, and `""` leaves it blank. `{startValue}` in them is not filled in. Leave them out to show `startValue`/`endValue` as formatted numbers. On a map, give the legend a `background` so a zoomed map doesn't show through it (`references/map.md` → Choropleth). Docs: https://docs.amcharts.com/v5/concepts/legend/heat-legend/#startend-labels.


## Continued

The rest of this file is in `references/skill-part-2.md`. Read it as part of this file.
