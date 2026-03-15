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

## Limitations

### Limited functionality

-   Bullets (series or axis): No support for bullets that reference outside objects or context-based bullets (where bullet code depends on context to determine its appearance)
-   Bullets or adapters that rely on global variables. Parser runs in a different scope, thus global variables might not be available.

### Unsupported features

-   Maps: Projections
-   Bullets: Full charts in bullets
-   Axes: Legend inside axis header
-   Templates: `setup` function
-   Custom draw functions
-   Events

### Unsupported chart types

-   Gantt
-   StockChart
