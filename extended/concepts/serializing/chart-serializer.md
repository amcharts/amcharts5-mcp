---
title: "Chart Serializer"
source: "https://docs.amcharts.com/v5/concepts/serializing/chart-serializer/"
scraped: "2026-11-16"
---

> Use ChartSerializer to serialize the whole chart objects into JSON which can be stored and parsed back into a functional object.

Use ChartSerializer to serialize the whole chart objects into JSON which can be stored and [parsed back](https://docs.amcharts.com/v5/concepts/serializing/#parsing) into a functional object.

## Getting started

### Initializing

The chart serializer is part of the [JSON plugin](https://docs.amcharts.com/v5/concepts/serializing/), which needs to be loaded.

You can import those in your TypeScript / ES6 application as JavaScript modules:

```ts
import * as am5plugins_json from "@amcharts/amcharts5/plugins/json";
```

For vanilla JavaScript applications and web pages, you can use "script" version:

```html
<script src="https://cdn.amcharts.com/lib/5/plugins/json.js"></script>
```

> **More info:** For more information on installing amCharts 5 as well as loading modules refer to our "[Getting started](https://docs.amcharts.com/v5/getting-started/)" tutorial.

### Creating serializer object

To create a serializer, we'll need to instantiate a `ChartSerializer` object:

TypeScript:

```ts
const serializer = am5plugins_json.ChartSerializer.new(root, {});
```

JavaScript:

```js
var serializer = am5plugins_json.ChartSerializer.new(root, {});
```

### Serializing

Use the serializer's `serializeAll()` method, passing in the top-level object like a chart or a `Container`:

TypeScript:

```ts
const serializer = am5plugins_json.ChartSerializer.new(root, {});
let json = serializer.serializeAll(chart)
```

JavaScript:

```js
var serializer = am5plugins_json.ChartSerializer.new(root, {});
var json = serializer.serializeAll(chart)
```

### Settings

There is a number of settings, that serializer supports:

| Setting              | Type                     | Default      | Comment                                                                                                                     |
| -------------------- | ------------------------ | ------------ | --------------------------------------------------------------------------------------------------------------------------- |
| `removeEmptyObjects` | `boolean`                | `true`       | Remove the empty objects from the resulting JSON.                                                                           |
| `maxDepth`           | `number`                 | `10`         | Maximum depth of recursion when traversing the target object.                                                               |
| `includeStates`      | `boolean`                | `true`       | Include element and template states.                                                                                        |
| `includeAdapters`    | `boolean`                | `true`       | Include adapters in the output.                                                                                             |
| `includeRoot`        | `boolean`                | `false`      | Include settings and exportable properties from the related `Root` element. \* NOTE: This option will not include themes.\* |
| `functionsAs`        | `"string" \| "function"` | `"function"` | Export functions as references or stringify them.                                                                           |
| `resources`          | `object`                 |              | Geodata and locales to write by name, e.g. `{ am5geodata_worldLow }`. See "Maps and locales" below.                         |

The below instructs serializer to also include the `Root` object's settings, and to output functions as strings:

TypeScript:

```ts
const serializer = am5plugins_json.ChartSerializer.new(root, {
  includeRoot: true,
  functionsAs: "string"
});
```

JavaScript:

```js
var serializer = am5plugins_json.ChartSerializer.new(root, {
  includeRoot: true,
  functionsAs: "string"
});
```

### Including related elements

#### Legend

The serializer will detect `Legend` or `HeatLegend` and include it in the output if it's a child of one of the chart's built-in containers, like `rightAxesContainer`, its series or the chart itself.

#### Custom elements

Custom elements, like labels and the like, will not be included in the output unless they have a `"serialize"` in their `themeTags`:

TypeScript:

```ts
pieSeries.children.push(am5.Label.new(root, {
  text: "Hello",
  x: am5.p50,
  y: am5.p50,
  themeTags: ["serialize"]
});
```

JavaScript:

```js
pieSeries.children.push(am5.Label.new(root, {
  text: "Hello",
  x: am5.p50,
  y: am5.p50,
  themeTags: ["serialize"]
});
```

The tag is only required for elements added to a plain `Container`. Elements added to something the library builds — a series, an axis, or the chart itself — are included automatically, as long as they are your own additions and not data-driven (like bullets) or the element's built-in parts.

### Maps and locales

A map's geodata is written by the name it was loaded under, e.g. `"geoJSON": "am5geodata_worldLow"`, so the config stays small. So is the root's locale, with `includeRoot`. With script tags, the serializer finds the names among the globals. With npm imports, give it the same objects in `resources`:

TypeScript:

```ts
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";

const serializer = am5plugins_json.ChartSerializer.new(root, {
  resources: { am5geodata_worldLow }
});
```

JavaScript:

```js
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";

var serializer = am5plugins_json.ChartSerializer.new(root, {
  resources: { am5geodata_worldLow }
});
```

Without it, the whole geodata is copied into the config. To build a chart from such a config, give the parser the same `resources` (see "[Maps and locales](https://docs.amcharts.com/v5/concepts/serializing/#maps-and-locales)").

> **Note:** `resources` is available since version 5.21.4.

### Theme colors

A color taken from the root's [interface colors](https://docs.amcharts.com/v5/concepts/themes/) is saved as a reference to it, not as a fixed value:

TypeScript:

```ts
polygonSeries.mapPolygons.template.setAll({
  stroke: root.interfaceColors.get("background")
});
```

JavaScript:

```js
polygonSeries.mapPolygons.template.setAll({
  stroke: root.interfaceColors.get("background")
});
```

The above is saved as:

```json
"stroke": "@root.interfaceColors.get('background')"
```

When the config is parsed into a chart with a different theme, e.g. a dark one, the color comes from that theme.

A color taken from the theme's series palette with `getIndex()` is saved the same way, so it follows the theme's palette:

TypeScript:

```ts
series.set("fill", chart.get("colors").getIndex(2));
```

JavaScript:

```js
series.set("fill", chart.get("colors").getIndex(2));
```

The above is saved as:

```json
"fill": "@colors.getIndex(2)"
```

> **Note:** Palette references are available since version 5.21.3. Colors the color set makes after its list runs out are saved as fixed values.

> **Note:** This works when the color is the exact object returned by `root.interfaceColors.get()`. A color made from it, e.g. with `am5.Color.brighten()`, is saved as a fixed value.

## Supported chart types

* XY
* Percent (Pie, Funnel, Pyramid)
* Radar
* Curve charts (Serpentine, Spiral)
* Venn
* Hierarchy (Tree, Pack, Partition, Force-directed)
* Flow (Sankey, Chord, Arc diagram)
* WordCloud
* MapChart
* Gantt

## Limitations

### Limited functionality

* Bullets (series or axis): No support for bullets that reference outside objects or context-based bullets (where bullet code depends on context to determine its appearance)
* Bullets or adapters that rely on global variables. Parser runs in a different scope, thus global variables might not be available.

### Unsupported features

* Bullets: Full charts in bullets
* Axes: Legend inside axis header
* Templates: `setup` function
* Custom draw functions
* Events

### Unsupported chart types

* StockChart

## Visual JSON config editor

You can create and edit JSON configs using [Chart Maker](https://live.amcharts.com/).

For more info, refer to "[JSON Editor](https://docs.amcharts.com/v5/concepts/serializing/json-editor/)".
