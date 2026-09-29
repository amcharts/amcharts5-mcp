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

`includeStates`

`boolean`

`true`

Include element and template states.

`includeAdapters`

`boolean`

`true`

Include adapters in the output.

`functionsAs`

`"string" | "function"`

`"function"`

Export functions as references or stringify them.

`includeRoot`

`boolean`

`false`

Add a top-level `root` section with the `Root` object's settings and properties (`interfaceColors`, formatters, `utc`, `fps`, `tabindex`) to the output. `JsonParser` applies a `root` section before parsing the chart. *(5.20.2)*

`runningAnimations`

`boolean`

`true`

Write an animation started in code that loops forever (`loops: Infinity`) into the element's `animations` setting, so the parsed chart plays it too. See "Animations" below. *(5.20.8)*

**What gets serialized (5.20.3+):** only **user-set** settings — theme and library defaults are left out, so the output is much smaller than in earlier versions and a value you never set will not appear. Chart-set values and data a chart builds for itself (a flow's nodes, a word cloud's words) are not written. Objects pointing at one another are written as references (e.g. `"@series.get('fill')"`) instead of copies, and big values (a map's `geoJSON`, a `Root`'s locale) are written as the name of the pack they came from and rebuilt on parse. Since 5.20.7 a map series' data rows no longer carry the properties the map copies onto them from its geodata (`name`, and on some maps `CNTRY`, `TYPE`) — only values that differ from the feature's are written, and a row left with nothing but its id is dropped.

Both states and adapters are included by default. The below instructs serializer to leave them out of the output:

const serializer = am5plugins\_json.ChartSerializer.new(root, {
  includeStates: false,
  includeAdapters: false
});

var serializer = am5plugins\_json.ChartSerializer.new(root, {
  includeStates: false,
  includeAdapters: false
});

### Animations (5.20.8)

An element's `animations` setting (see "[Animations: Declarative animations](https://www.amcharts.com/docs/v5/concepts/animations/)") is written as configured. A setting one of its entries animates is written with the value it was configured with, never one caught mid-animation.

With `runningAnimations: true` (the default) *(5.20.8)*, an animation started in code with `animate()` that loops forever (`loops: Infinity`) and uses a named easing is written as an `animations` entry (`{ key, from, to, duration, loops: 0 }`, plus `easing`, `ease` and `yoyo` where they apply), and the setting it animates is left out of the output. A globe that keeps turning or a bullet that keeps pulsing thus plays on in the parsed chart.

Never written:

-   Animations that end: `appear()`, state transitions, zooming, any `animate()` with a finite `loops`.
-   Animations whose easing is a function of your own, a wrapped `am5.ease.pow`, or an easing that cannot be named (e.g. `am5.ease.out(am5.ease.yoyo(...))`). `am5.ease.easingInfo()` tells whether an easing has a name.
-   As of 5.20.8, a loop started in code on a **data item** (e.g. `dataItem.animate({ key: "positionOnLine", loops: Infinity })`). Declare it as an `animations` entry with `target: "dataItem"` on the bullet's sprite instead.

To turn this off:

```javascript
var serializer = am5plugins_json.ChartSerializer.new(root, {
  runningAnimations: false
});
```

### Including related elements

#### Legend

The serializer will detect `Legend` or `HeatLegend` and include it in the output if its a child of one of the chart's built-in containers, like `rightAxesContainer`, its series or the chart itself.

Since 5.20.7 a legend placed inside an axis header (`axisHeader`) round-trips too. Before, parsing such a config failed with "Could not find ref", because the legend names a series defined further down the config (see "[Grouping referenced objects](https://www.amcharts.com/docs/v5/concepts/serializing/#Grouping_referenced_objects)").

#### Custom elements

Custom elements, like labels and the like, will not be included in the output unless the have a `"serialize"` in their `themeTags`:

pieSeries.children.push(am5.Label.new(root, {
  text: "Hello",
  x: am5.p50,
  y: am5.p50,
  themeTags: \["serialize"\]
}));

pieSeries.children.push(am5.Label.new(root, {
  text: "Hello",
  x: am5.p50,
  y: am5.p50,
  themeTags: \["serialize"\]
}));

#### Theme tags (5.20.6)

Since 5.20.6 the `themeTags` you give an element are written to the output too, so anything styled through them (e.g. a `Button` with `themeTags: ["switch"]`) keeps that styling when the config is parsed again. Only tags passed to the element's `.new()` call are written — tags added later via `set("themeTags", …)`, and tags the library adds itself, are left out. On parse, the tags are added to the ones an existing element already has rather than replacing them.

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
-   **Adapters do not round-trip.** With `includeAdapters: true` (the default) each adapter is written as `{ key, callback: "function (…) {…}" }` (a string) — `JsonParser` does not turn it back into a function. Before 5.20.4 the string was registered as a callback and crashed the chart (`i[s] is not a function` in `Entity.fold`); since 5.20.4 such adapters are skipped on parse. Prefer declarative equivalents (`colorByDataItem` on column series, per-item `fill` + `templateField`, `heatRules`).
-   **Serialize the chart's top-level container child, not a bare series.** A series whose settings point back at itself (e.g. `selectedDataItem`, a `DataItem` whose `component` is the series) forms a cycle; serialized on its own it overflows `removeEmptyObjects` pruning or makes `JSON.stringify` throw "Converting circular structure". As a child of the serialized container it becomes a `#series-0` reference and the cycle disappears.
-   A bullet heat rule's throwaway sprite (created while the serializer introspects the bullet factory) has no `dataItem`; as of 5.20.8 the heat-rule loop then throws and, on a `LineSeries`, the stroke disappears. Have the factory call `sprite._setDataItem(dataItem)` or serialize before adding the rule.

### Unsupported features

-   Maps: projections that are not registered by name. A projection set via `projectionName`, one of the bundled factories (`am5map.geoMercator()`, `am5map.geoOrthographic()`, etc.), or the factory returned by `am5map.registerProjection()` is written as `projectionName` and round-trips.
-   Bullets: Full charts in bullets
-   Templates: `setup` function
-   Custom draw functions
-   Events
-   `ZoomableContainer`: its `contents.children` and any `ZoomTools` are not serialized — a serialized `ZoomableContainer` parses back empty. Use `SerialChartContainer` (5.20.2), which builds its own zoomable wrapper, or re-wrap in code after parsing.
-   Venn: `hoverGraphics` and slice-template `states` are not serialized — re-apply a custom hover in code after parsing.

### Unsupported chart types

-   StockChart
