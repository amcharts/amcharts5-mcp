---
title: "Chart Serializer"
source: "https://www.amcharts.com/docs/v5/concepts/serializing/chart-serializer/"
scraped: "2026-03-15"
---

Use ChartSerializer to serialize the whole chart objects into JSON which can be stored and [parsed back](https://www.amcharts.com/docs/v5/concepts/serializing/#Parsing) into a functional object.

## Getting started

### Initializing

The chart serializer is part of the [JSON plugin](https://www.amcharts.com/docs/v5/concepts/serializing/), which needs to be loaded.

You can import those in your TypeScript / ES6 application as JavaScript modules:

import \* as am5plugins\_json from "@amcharts/amcharts5/plugins/json";

For vanilla JavaScript applications and web pages, you can use "script" version:

<script src="https://cdn.amcharts.com/lib/5/plugins/json.js"></script>

MORE INFOFor more information on installing amCharts 5 as well as loading modules refer to our "[Getting started](https://www.amcharts.com/docs/v5/getting-started/)" tutorial.

### Creating serializer object

To create a serializer, we'll need to instantiate a `ChartSerializer` object:

const serializer = am5plugins\_json.ChartSerializer.new(root, {});

const serializer = am5plugins\_json.ChartSerializer.new(root, {});

### Serializing

Use the serializer's `serializeAll()` method, passing in the top-level object like a chart or a `Container`:

const serializer = am5plugins\_json.ChartSerializer.new(root, {});
let json = serializer.serializeAll(chart)

var serializer = am5plugins\_json.ChartSerializer.new(root, {});
var json = serializer.serializeAll(chart)

### Settings

There is a number of settings, that serializer supports:

Setting

Type

Default

Comment

`removeEmptyObjects`

`boolean`

`true`

Remove the empty objects from the resulting JSON.

`includeProjection`

`boolean`

`false`

Include `projection` setting for `MapChart`.

`includeStates`

`boolean`

`false`

Include element and template states.

`includeAdapters`

boolean

`false`

Include adapters in the output.

`functionsAs`

`"string" | "function"`

`"function"`

Export functions as references or stringify them.

`includeRoot`

`boolean`

`false`

Add a top-level `root` section with the `Root` object's settings and properties (`interfaceColors`, formatters, `utc`, `fps`, `tabindex`) to the output. `JsonParser` applies a `root` section before parsing the chart. *(5.20.2)*

**What gets serialized (5.20.3+):** only **user-set** settings — theme and library defaults are left out, so the output is much smaller than in earlier versions and a value you never set will not appear. Chart-set values and data a chart builds for itself (a flow's nodes, a word cloud's words) are not written. Objects pointing at one another are written as references (e.g. `"@series.get('fill')"`) instead of copies, and big values (a map's `geoJSON`, a `Root`'s locale) are written as the name of the pack they came from and rebuilt on parse.

The below instructs serializer to include both states and adapters in the output:

const serializer = am5plugins\_json.ChartSerializer.new(root, {
  includeAdapters: true,
  includeProjection: true
});

var serializer = am5plugins\_json.ChartSerializer.new(root, {
  includeAdapters: true,
  includeProjection: true
});

### Including related elements

#### Legend

The serializer will detect `Legend` or `HeatLegend` and include it in the output if its a child of one of the chart's built-in containers, like `rightAxesContainer`, its series or the chart itself.

#### Custom elements

Custom elements, like labels and the like, will not be included in the output unless the have a `"serialize"` in their `themeTags`:

pieSeries.children.push(am5.Label.new(root, {
  text: "Hello,
  x: am5.p50,
  y: am5.p50,
  themeTags: \["serialize"\]
});

pieSeries.children.push(am5.Label.new(root, {
  text: "Hello,
  x: am5.p50,
  y: am5.p50,
  themeTags: \["serialize"\]
});

## Supported chart types

-   XY
-   Percent (Pie, Funnel, Pyramid)
-   Radar
-   Curve charts (Serpentine, Spiral)
-   Venn
-   WordCloud
-   MapChart
-   Gantt *(5.20.3)*

## Limitations

### Limited functionality

-   Bullets (series or axis): No support for bullets that reference outside objects or context-based bullets (where bullet code depends on context to determine its appearance). Declare bullet factories as `function(root, series, dataItem)` — a factory that closes over an outer `root` dangles on re-bind.
-   Bullets or adapters that rely on global variables. Parser runs in a different scope, thus global variables might not be available.
-   **Adapters do not round-trip.** With `includeAdapters: true` each adapter is written as `{ key, callback: "function (…) {…}" }` (a string) — `JsonParser` does not turn it back into a function. Before 5.20.4 the string was registered as a callback and crashed the chart (`i[s] is not a function` in `Entity.fold`); since 5.20.4 such adapters are skipped on parse. Prefer declarative equivalents (`colorByDataItem` on column series, per-item `fill` + `templateField`, `heatRules`).
-   **Serialize the chart's top-level container child, not a bare series.** A series whose settings point back at itself (e.g. `selectedDataItem`, a `DataItem` whose `component` is the series) forms a cycle; serialized on its own it overflows `removeEmptyObjects` pruning or makes `JSON.stringify` throw "Converting circular structure". As a child of the serialized container it becomes a `#series-0` reference and the cycle disappears.
-   A bullet heat rule's throwaway sprite (created while the serializer introspects the bullet factory) has no `dataItem`; as of 5.20.5 the heat-rule loop then throws and, on a `LineSeries`, the stroke disappears. Have the factory call `sprite._setDataItem(dataItem)` or serialize before adding the rule.

### Unsupported features

-   Maps: Projections
-   Bullets: Full charts in bullets
-   Axes: Legend inside axis header
-   Templates: `setup` function
-   Custom draw functions
-   Events
-   `ZoomableContainer`: its `contents.children` and any `ZoomTools` are not serialized — a serialized `ZoomableContainer` parses back empty. Use `SerialChartContainer` (5.20.2), which builds its own zoomable wrapper, or re-wrap in code after parsing.
-   Venn: `hoverGraphics` and slice-template `states` are not serialized — re-apply a custom hover in code after parsing.

### Unsupported chart types

-   StockChart
