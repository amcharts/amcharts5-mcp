---
title: "Chart Serializer"
source: "https://www.amcharts.com/docs/v5/concepts/serializing/chart-serializer/"
scraped: "2026-10-08"
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

var serializer = am5plugins\_json.ChartSerializer.new(root, {});

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

`maxDepth`

`number`

`10`

Maximum depth of recursion when traversing the target object.

`includeStates`

`boolean`

`true`

Include element and template states.

`includeAdapters`

`boolean`

`true`

Include adapters in the output.

`includeRoot`

`boolean`

`false`

Include settings and exportable properties from the related `Root` element: a top-level `root` section with the `Root` object's settings and properties (`interfaceColors`, formatters, `utc`, `fps`, `tabindex`). `JsonParser` applies a `root` section before parsing the chart. Themes are not included. Since 5.21.0 the `renderer` setting is not written: it is a runtime choice, not chart configuration. *(5.20.2)*

`functionsAs`

`"string" | "function"`

`"function"`

Export functions as references or stringify them.

`runningAnimations`

`boolean`

`true`

Write an animation started in code that loops forever (`loops: Infinity`) into the element's `animations` setting, so the parsed chart plays it too. See "Animations" below. *(5.20.8)*

**What gets serialized (5.20.3+):** only **user-set** settings — theme and library defaults are left out, so the output is much smaller than in earlier versions and a value you never set will not appear. Chart-set values and data a chart builds for itself (a flow's nodes, a word cloud's words) are not written. Objects pointing at one another are written as references (e.g. `"@series.get('fill')"`) instead of copies, and big values (a map's `geoJSON`, a `Root`'s locale) are written as the name of the pack they came from and rebuilt on parse. Since 5.20.7 a map series' data rows no longer carry the properties the map copies onto them from its geodata (`name`, and on some maps `CNTRY`, `TYPE`) — only values that differ from the feature's are written, and a row left with nothing but its id is dropped.

**Also written since 5.21.0** (lost in earlier versions):

-   A series hidden with `hide()` or a legend click — written as `visible: false`.
-   Elements you add to a chart's plot container (e.g. `chart.plotContainer.children.push(label)`), without a `"serialize"` theme tag.
-   `Date` values in settings — written as timestamps (milliseconds).
-   Settings you set on a series' `bulletsContainer`, and on a pie or funnel series' `labelsContainer` / `ticksContainer`.
-   The `axisFills` template of an axis renderer, the `rectangles` template (`Treemap`, `Partition`) and the `polygons` template (`VoronoiTreemap`).
-   A `NightSeries`' own `sun`, when styled.
-   A looping animation started in code on a data item (see "Animations" below).
-   Colors taken from `root.interfaceColors` — as references (see "Theme colors" below).

Also since 5.21.0: a formatter set on an element (e.g. a heat legend's `numberFormatter`) and a color in a legend's own data are written with their `type`; a `DurationAxis`' `maxPrecision: 0` and a grouped `DateAxis`' `groupIntervals`, which the axes set themselves, are no longer written; a bullet function that hands out cached sprites no longer has them disposed by the serializer; and a series placed straight in the root container (e.g. a Sankey, treemap or word cloud without a chart around it) is serialized correctly.

The below instructs serializer to also include the `Root` object's settings, and to output functions as strings:

const serializer = am5plugins\_json.ChartSerializer.new(root, {
  includeRoot: true,
  functionsAs: "string"
});

var serializer = am5plugins\_json.ChartSerializer.new(root, {
  includeRoot: true,
  functionsAs: "string"
});

Both states and adapters are included by default. The below instructs serializer to leave them out of the output:

```javascript
var serializer = am5plugins_json.ChartSerializer.new(root, {
  includeStates: false,
  includeAdapters: false
});
```

### Animations (5.20.8)

An element's `animations` setting (see "[Animations: Animations as settings](https://www.amcharts.com/docs/v5/concepts/animations/#Animations_as_settings)") is written as configured. A setting one of its entries animates is written with the value it was configured with, never one caught mid-animation.

With `runningAnimations: true` (the default) *(5.20.8)*, an animation started in code with `animate()` that loops forever (`loops: Infinity`) and uses a named easing is written as an `animations` entry (`{ key, from, to, duration, loops: 0 }`, plus `easing`, `ease` and `yoyo` where they apply), and the setting it animates is left out of the output. A globe that keeps turning or a bullet that keeps pulsing thus plays on in the parsed chart.

Since 5.21.0 this also covers a loop started in code on a **data item** of a series with bullets (e.g. `dataItem.animate({ key: "positionOnLine", loops: Infinity, ... })` flying a map point along its line): it is written on the series' first bullet sprite as an `animations` entry with `target: "dataItem"`, taken from the first data item that has such a loop playing, so after parsing every data item that has a bullet plays it.

Never written:

-   Animations that end: `appear()`, state transitions, zooming, any `animate()` with a finite `loops`.
-   Animations whose easing is a function of your own, a wrapped `am5.ease.pow`, or an easing that cannot be named (e.g. `am5.ease.out(am5.ease.yoyo(...))`). `am5.ease.easingInfo()` tells whether an easing has a name.

To turn this off:

```javascript
var serializer = am5plugins_json.ChartSerializer.new(root, {
  runningAnimations: false
});
```

### Including related elements

#### Legend

The serializer will detect `Legend` or `HeatLegend` and include it in the output if it's a child of one of the chart's built-in containers, like `rightAxesContainer`, its series or the chart itself.

Since 5.20.7 a legend placed inside an axis header (`axisHeader`) round-trips too. Before, parsing such a config failed with "Could not find ref", because the legend names a series defined further down the config (see "[Grouping referenced objects](https://www.amcharts.com/docs/v5/concepts/serializing/#Grouping_referenced_objects)").

#### Custom elements

Custom elements, like labels and the like, will not be included in the output unless they have a `"serialize"` in their `themeTags`:

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

The tag is only required for elements added to a plain `Container`. Elements added to something the library builds — a series, an axis, or the chart itself — are included automatically, as long as they are your own additions and not data-driven (like bullets) or the element's built-in parts.

This includes elements added to a chart's plot container since 5.21.0; before, they were left out unless tagged.

#### Theme tags (5.20.6)

Since 5.20.6 the `themeTags` you give an element are written to the output too, so anything styled through them (e.g. a `Button` with `themeTags: ["switch"]`) keeps that styling when the config is parsed again. Only tags passed to the element's `.new()` call are written — tags added later via `set("themeTags", …)`, and tags the library adds itself, are left out. On parse, the tags are added to the ones an existing element already has rather than replacing them.

### Theme colors

A color taken from the root's [interface colors](https://www.amcharts.com/docs/v5/concepts/themes/) is saved as a reference to it, not as a fixed value:

polygonSeries.mapPolygons.template.setAll({
  stroke: root.interfaceColors.get("background")
});

polygonSeries.mapPolygons.template.setAll({
  stroke: root.interfaceColors.get("background")
});

The above is saved as:

"stroke": "@root.interfaceColors.get('background')"

When the config is parsed into a chart with a different theme, e.g. a dark one, the color comes from that theme.

NOTEThis works when the color is the exact object returned by `root.interfaceColors.get()`. A color made from it, e.g. with `am5.Color.brighten()`, is saved as a fixed value.

Colors in data rows are always written as values (a string starting with `@` in data is text, not a reference), and so are the colors inside the `root` section that `includeRoot` writes. The reference works with `JsonParser` in 5.21.0 or later. *(5.21.0)*

## Supported chart types

-   XY
-   Percent (Pie, Funnel, Pyramid)
-   Radar
-   Curve charts (Serpentine, Spiral)
-   Venn
-   Hierarchy (Tree, Pack, Partition, Force-directed)
-   Flow (Sankey, Chord, Arc diagram)
-   WordCloud
-   MapChart
-   Gantt *(5.20.3)*

## Limitations

### Limited functionality

-   Bullets (series or axis): No support for bullets that reference outside objects or context-based bullets (where bullet code depends on context to determine its appearance). Declare bullet factories as `function(root, series, dataItem)` — a factory that closes over an outer `root` dangles on re-bind.
-   Bullets or adapters that rely on global variables. Parser runs in a different scope, thus global variables might not be available.
-   **Adapters do not round-trip.** With `includeAdapters: true` (the default) each adapter is written as `{ key, callback: "function (…) {…}" }` (a string) — `JsonParser` does not turn it back into a function. Before 5.20.4 the string was registered as a callback and crashed the chart (`i[s] is not a function` in `Entity.fold`); since 5.20.4 such adapters are skipped on parse. Prefer declarative equivalents (`colorByDataItem` on column series, per-item `fill` + `templateField`, `heatRules`).
-   **Serialize the chart's top-level container child** (`serializeAll(root.container.children.getIndex(0))`): the chart, or on chart-less types (hierarchy, flow, word cloud, Venn) the series itself. Before 5.21.0 a series placed straight in `root.container`, or one whose `selectedDataItem` points back at itself, overflowed the stack or made `JSON.stringify` throw "Converting circular structure"; 5.21.0 serializes them. A drilled-down hierarchy's `selectedDataItem` is still not restored on parse as of 5.21.0.

### Unsupported features

-   Maps: projections that are not registered by name. A projection set via `projectionName`, one of the bundled factories (`am5map.geoMercator()`, `am5map.geoOrthographic()`, etc.), or the factory returned by `am5map.registerProjection()` is written as `projectionName` and round-trips.
-   Bullets: Full charts in bullets
-   Templates: `setup` function
-   Custom draw functions
-   Events
-   `ZoomableContainer`: since 5.21.0 its `contents.children` are serialized and restored (before, it parsed back empty), but a `ZoomTools` inside it is written with a copy of its `target`, so after parsing it drives a different container. Prefer `SerialChartContainer` (5.20.2), which builds its own zoomable wrapper and zoom tools, or re-create the `ZoomTools` in code after parsing.
-   Venn: `hoverGraphics` is not serialized — re-apply a custom set outline in code after parsing. (Slice-template `states`, e.g. a custom hover state, do round-trip.)

### Unsupported chart types

-   StockChart

## Visual JSON config editor

You can create and edit JSON configs using [amCharts Editor](https://live.amcharts.com/).

For more info, refer to "[JSON Editor](https://www.amcharts.com/docs/v5/concepts/serializing/json-editor/)".
