---
title: "Pixel map series"
source: "https://docs.amcharts.com/v5/charts/map-chart/pixel-map-series/"
scraped: "2026-11-16"
---

> PixelMapSeries draws map polygons as a grid of pixels: squares, circles, diamonds or hexagons. It works like Map polygon series, with the same data, heat rules, states and tooltips.

`PixelMapSeries` draws map polygons as a grid of pixels: squares, circles, diamonds or hexagons. It works like [Map polygon series](https://docs.amcharts.com/v5/charts/map-chart/map-polygon-series/), with the same data, heat rules, states and tooltips.

## Adding series

Pixel map series is created the same way as a polygon series:

TypeScript:

```ts
let pixelSeries = chart.series.push(
  am5map.PixelMapSeries.new(root, {
    geoJSON: am5geodata_worldLow,
    exclude: ["AQ"]
  })
);
```

JavaScript:

```js
var pixelSeries = chart.series.push(
  am5map.PixelMapSeries.new(root, {
    geoJSON: am5geodata_worldLow,
    exclude: ["AQ"]
  })
);
```

The polygons themselves are not drawn. Each pixel takes the fill of the polygon it falls in, and the polygons stay in place, invisible, to handle tooltips, hovers and clicks.

This means pixels are styled through `mapPolygons.template`, the same as polygons in a regular polygon series:

TypeScript:

```ts
pixelSeries.mapPolygons.template.setAll({
  fill: am5.color(0x6794dc),
  tooltipText: "{name}"
});

pixelSeries.mapPolygons.template.states.create("hover", {
  fill: am5.color(0x297373)
});
```

JavaScript:

```js
pixelSeries.mapPolygons.template.setAll({
  fill: am5.color(0x6794dc),
  tooltipText: "{name}"
});

pixelSeries.mapPolygons.template.states.create("hover", {
  fill: am5.color(0x297373)
});
```

## Grid

`step` sets the distance between pixel centers, in degrees (default: `2`). A small map, such as a single country, can use a much finer step, e.g. `0.01`.

> **Note:** A series draws at most 500,000 pixels. If a step would make more, it is made coarser, with a warning in the console.

`pixelSize` sets the size of a pixel relative to the step (default: `0.8`). At `1`, neighbouring pixels touch.

TypeScript:

```ts
let pixelSeries = chart.series.push(
  am5map.PixelMapSeries.new(root, {
    geoJSON: am5geodata_worldLow,
    step: 1.5,
    pixelSize: 1
  })
);
```

JavaScript:

```js
var pixelSeries = chart.series.push(
  am5map.PixelMapSeries.new(root, {
    geoJSON: am5geodata_worldLow,
    step: 1.5,
    pixelSize: 1
  })
);
```

### Pixel shape

`pixelType` sets the shape: `"square"` (default), `"circle"`, `"diamond"` or `"hexagon"`.

Each shape packs in its own way: squares line up in columns, while circles, diamonds and hexagons are staggered, with every other row shifted by half a pixel. Set `stagger` to `true` or `false` to change it for squares and circles. Diamonds and hexagons are always staggered, since that is the only way they fit together.

TypeScript:

```ts
let pixelSeries = chart.series.push(
  am5map.PixelMapSeries.new(root, {
    geoJSON: am5geodata_worldLow,
    pixelType: "hexagon",
    pixelSize: 1
  })
);
```

JavaScript:

```js
var pixelSeries = chart.series.push(
  am5map.PixelMapSeries.new(root, {
    geoJSON: am5geodata_worldLow,
    pixelType: "hexagon",
    pixelSize: 1
  })
);
```

### On the map or on the screen

By default, pixels lie on the surface of the map. They follow the projection: on a globe they turn and shrink towards the edge, and they get narrower towards the poles.

Pixels are spread evenly over the globe, with fewer per row towards the poles. Set `equalArea: false` to have the same number of pixels in every row instead. They will line up across the whole map, but crowd towards the poles.

`equalWidth: true` draws every pixel as wide as one on the equator, so they do not narrow towards the poles. They overlap there instead.

For something that looks like a pixel image of the map, set `uniform: true`. Pixels are then laid out on an even grid on the screen, all the same size and upright. The grid scales when the map is zoomed, and stays level when it is rotated.

TypeScript:

```ts
let pixelSeries = chart.series.push(
  am5map.PixelMapSeries.new(root, {
    geoJSON: am5geodata_worldLow,
    pixelType: "circle",
    uniform: true
  })
);
```

JavaScript:

```js
var pixelSeries = chart.series.push(
  am5map.PixelMapSeries.new(root, {
    geoJSON: am5geodata_worldLow,
    pixelType: "circle",
    uniform: true
  })
);
```

With `uniform: true`, `step` is measured at the center of the map, and `equalArea`, `equalWidth` and `columnHeight` have no effect.

Example: [Pixel shapes](https://docs.amcharts.com/embeds/v5/pixel-shapes/)

Scripts: https://cdn.amcharts.com/lib/5/index.js, https://cdn.amcharts.com/lib/5/map.js, https://cdn.amcharts.com/lib/5/geodata/worldLow.js, https://cdn.amcharts.com/lib/5/themes/Animated.js

HTML:

```html
<div id="charts">
  <div id="chartdiv1" class="chartdiv"></div>
  <div id="chartdiv2" class="chartdiv"></div>
  <div id="chartdiv3" class="chartdiv"></div>
  <div id="chartdiv4" class="chartdiv"></div>
</div>
```

CSS:

```css
body {
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

#charts {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.chartdiv {
  width: 100%;
  height: 45vh;
}
```

JavaScript:

```js
/**
 * ---------------------------------------
 * This demo was created using amCharts 5.
 *
 * For more information visit:
 * https://www.amcharts.com/
 *
 * Documentation is available at:
 * https://docs.amcharts.com/v5/
 * ---------------------------------------
 */

function createMap(div, pixelType) {
  // Create root element
  // https://docs.amcharts.com/v5/getting-started/#root-element
  var root = am5.Root.new(div);

  root.setThemes([am5themes_Animated.new(root)]);

  // Create chart
  // https://docs.amcharts.com/v5/charts/map-chart/
  var chart = root.container.children.push(
    am5map.MapChart.new(root, {
      projection: am5map.geoNaturalEarth1()
    })
  );

  // Add series: countries drawn as a grid of pixels
  // https://docs.amcharts.com/v5/charts/map-chart/pixel-map-series/#pixel-shape
  var pixelSeries = chart.series.push(
    am5map.PixelMapSeries.new(root, {
      geoJSON: am5geodata_worldLow,
      exclude: ["AQ"],
      pixelType: pixelType,
      pixelSize: 0.9,
      step: 3
    })
  );

  pixelSeries.mapPolygons.template.setAll({
    tooltipText: "{name}"
  });

  // Label
  chart.children.push(
    am5.Label.new(root, {
      text: 'pixelType: "' + pixelType + '"',
      fontSize: 14,
      x: am5.p50,
      centerX: am5.p50
    })
  );

  chart.appear(1000, 100);
}

createMap("chartdiv1", "square");
createMap("chartdiv2", "circle");
createMap("chartdiv3", "diamond");
createMap("chartdiv4", "hexagon");
```

## Coloring by value

Since pixels take their polygon's fill, [heat rules](https://docs.amcharts.com/v5/concepts/settings/heat-rules/) work the same as in a polygon series:

TypeScript:

```ts
let pixelSeries = chart.series.push(
  am5map.PixelMapSeries.new(root, {
    geoJSON: am5geodata_worldLow,
    valueField: "value",
    calculateAggregates: true
  })
);

pixelSeries.set("heatRules", [{
  target: pixelSeries.mapPolygons.template,
  dataField: "value",
  min: am5.color(0xffd19a),
  max: am5.color(0xb3261e),
  key: "fill"
}]);

pixelSeries.data.setAll([
  { id: "US", value: 38 },
  { id: "BR", value: 33 },
  { id: "IN", value: 28 },
  { id: "NG", value: 18 }
]);
```

JavaScript:

```js
var pixelSeries = chart.series.push(
  am5map.PixelMapSeries.new(root, {
    geoJSON: am5geodata_worldLow,
    valueField: "value",
    calculateAggregates: true
  })
);

pixelSeries.set("heatRules", [{
  target: pixelSeries.mapPolygons.template,
  dataField: "value",
  min: am5.color(0xffd19a),
  max: am5.color(0xb3261e),
  key: "fill"
}]);

pixelSeries.data.setAll([
  { id: "US", value: 38 },
  { id: "BR", value: 33 },
  { id: "IN", value: 28 },
  { id: "NG", value: 18 }
]);
```

Example: [Dotted world map with heat rules](https://docs.amcharts.com/embeds/v5/dotted-world-map-with-heat-rules/)

Scripts: https://cdn.amcharts.com/lib/5/index.js, https://cdn.amcharts.com/lib/5/map.js, https://cdn.amcharts.com/lib/5/geodata/worldLow.js, https://cdn.amcharts.com/lib/5/themes/Animated.js

HTML:

```html
<div id="chartdiv"></div>
```

CSS:

```css
body {
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

#chartdiv {
  width: 100%;
  height: 95vh;
}
```

JavaScript:

```js
/**
 * ---------------------------------------
 * This demo was created using amCharts 5.
 *
 * For more information visit:
 * https://www.amcharts.com/
 *
 * Documentation is available at:
 * https://docs.amcharts.com/v5/
 * ---------------------------------------
 */

// Create root element
// https://docs.amcharts.com/v5/getting-started/#root-element
var root = am5.Root.new("chartdiv");

// Set themes
// https://docs.amcharts.com/v5/concepts/themes/
root.setThemes([am5themes_Animated.new(root)]);

// Create chart
// https://docs.amcharts.com/v5/charts/map-chart/
var chart = root.container.children.push(
  am5map.MapChart.new(root, {
    projection: am5map.geoNaturalEarth1() // a rounded world map, with sizes close to true
  })
);

// Add series: countries drawn as a grid of dots
// https://docs.amcharts.com/v5/charts/map-chart/pixel-map-series/
var pixelSeries = chart.series.push(
  am5map.PixelMapSeries.new(root, {
    geoJSON: am5geodata_worldLow,
    exclude: ["AQ"], // no Antarctica, which would be a long band of dots at the bottom
    pixelType: "circle", // round dots; also "square", "diamond" or "hexagon"
    step: 2, // a dot about every 2 degrees, measured at the map's center
    uniform: true, // an even grid on screen: every dot the same size, in straight rows
    valueField: "value",
    calculateAggregates: true // works out the lowest and highest value, which the heat rule needs
  })
);

// the pixels take their color from the country under them: style the countries, not the dots
pixelSeries.mapPolygons.template.setAll({
  fill: root.interfaceColors.get("disabled"), // countries without data stay grey
  tooltipText: "{name}: {value}" // the name comes from the map data, the value from yours
});

// Color countries by value
// https://docs.amcharts.com/v5/concepts/settings/heat-rules/
pixelSeries.set("heatRules", [
  {
    target: pixelSeries.mapPolygons.template,
    dataField: "value",
    min: am5.color(0xffd19a), // pale orange for the youngest population...
    max: am5.color(0xb3261e), // ...dark red for the oldest
    key: "fill"
  }
]);

// Set data: median age, years
pixelSeries.data.setAll([
  { id: "US", value: 38 },
  { id: "CA", value: 41 },
  { id: "MX", value: 29 },
  { id: "BR", value: 33 },
  { id: "AR", value: 32 },
  { id: "RU", value: 39 },
  { id: "KZ", value: 31 },
  { id: "CN", value: 38 },
  { id: "IN", value: 28 },
  { id: "ID", value: 30 },
  { id: "AU", value: 38 },
  { id: "EG", value: 24 },
  { id: "NG", value: 18 },
  { id: "ET", value: 19 },
  { id: "ZA", value: 28 }
]);

// Make stuff animate on load
// https://docs.amcharts.com/v5/concepts/animations/
chart.appear(1000, 100);
```

## Outlines

Pixels have no outline by default. Set `strokeWidth` (and `stroke`) on the polygon template to outline each pixel:

TypeScript:

```ts
pixelSeries.mapPolygons.template.setAll({
  stroke: am5.color(0xffffff),
  strokeWidth: 0.5
});
```

JavaScript:

```js
pixelSeries.mapPolygons.template.setAll({
  stroke: am5.color(0xffffff),
  strokeWidth: 0.5
});
```

## 3D columns

`columnHeight` raises pixels into 3D columns. It sets the height of the tallest column, as a share of the globe's radius. On flat maps, columns rise up the screen by the same measure.

TypeScript:

```ts
let pixelSeries = chart.series.push(
  am5map.PixelMapSeries.new(root, {
    geoJSON: am5geodata_worldLow,
    valueField: "value",
    calculateAggregates: true,
    columnHeight: 0.2
  })
);
```

JavaScript:

```js
var pixelSeries = chart.series.push(
  am5map.PixelMapSeries.new(root, {
    geoJSON: am5geodata_worldLow,
    valueField: "value",
    calculateAggregates: true,
    columnHeight: 0.2
  })
);
```

By default, column height follows the polygon's value, from the series' lowest to its highest. This needs `calculateAggregates: true`. Polygons with no value stay flat. If no polygon has a value, every column is full height.

To set heights differently, use a heat rule with the polygon's `pixelHeight` setting, from `0` to `1` of `columnHeight`:

TypeScript:

```ts
pixelSeries.set("heatRules", [{
  target: pixelSeries.mapPolygons.template,
  dataField: "value",
  min: 0.1,
  max: 1,
  key: "pixelHeight"
}]);
```

JavaScript:

```js
pixelSeries.set("heatRules", [{
  target: pixelSeries.mapPolygons.template,
  dataField: "value",
  min: 0.1,
  max: 1,
  key: "pixelHeight"
}]);
```

For full control, `pixelHeightFunction` sets the height of each pixel separately. It receives the pixel's data item, longitude and latitude, and returns a number from `0` to `1`:

TypeScript:

```ts
pixelSeries.set("pixelHeightFunction", function(dataItem, longitude, latitude) {
  // Taller towards the equator
  return 1 - Math.abs(latitude) / 90;
});
```

JavaScript:

```js
pixelSeries.set("pixelHeightFunction", function(dataItem, longitude, latitude) {
  // Taller towards the equator
  return 1 - Math.abs(latitude) / 90;
});
```

> **Note:** Functions are not saved when a chart is [serialized to JSON](https://docs.amcharts.com/v5/concepts/serializing/). Heights set with heat rules are.

Example: [Globe with value columns](https://docs.amcharts.com/embeds/v5/globe-with-value-columns/)

Scripts: https://cdn.amcharts.com/lib/5/index.js, https://cdn.amcharts.com/lib/5/map.js, https://cdn.amcharts.com/lib/5/geodata/worldLow.js, https://cdn.amcharts.com/lib/5/themes/Animated.js

HTML:

```html
<div id="chartdiv"></div>
```

CSS:

```css
body {
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

#chartdiv {
  width: 100%;
  height: 95vh;
}
```

JavaScript:

```js
/**
 * ---------------------------------------
 * This demo was created using amCharts 5.
 *
 * For more information visit:
 * https://www.amcharts.com/
 *
 * Documentation is available at:
 * https://docs.amcharts.com/v5/
 * ---------------------------------------
 */

// Create root element
// https://docs.amcharts.com/v5/getting-started/#root-element
var root = am5.Root.new("chartdiv");

// Set themes
// https://docs.amcharts.com/v5/concepts/themes/
root.setThemes([am5themes_Animated.new(root)]);

// Create chart: a globe
// https://docs.amcharts.com/v5/charts/map-chart/
var chart = root.container.children.push(
  am5map.MapChart.new(root, {
    panX: "rotateX",
    panY: "rotateY",
    projection: am5map.geoOrthographic(),
    rotationX: -40,
    rotationY: -30
  })
);

// Add series: countries as pixels raised into columns by value
// https://docs.amcharts.com/v5/charts/map-chart/pixel-map-series/#3d-columns
var pixelSeries = chart.series.push(
  am5map.PixelMapSeries.new(root, {
    geoJSON: am5geodata_worldLow,
    exclude: ["AQ"],
    step: 2,
    pixelSize: 0.8,
    valueField: "value",
    calculateAggregates: true,
    columnHeight: 0.15 // tallest column: 15% of the globe's radius
  })
);

pixelSeries.mapPolygons.template.setAll({
  fill: root.interfaceColors.get("disabled"),
  tooltipText: "{name}: {value}"
});

// Color by value too
pixelSeries.set("heatRules", [
  {
    target: pixelSeries.mapPolygons.template,
    dataField: "value",
    min: am5.color(0xffd19a),
    max: am5.color(0xb3261e),
    key: "fill"
  }
]);

// Set data: median age, years
pixelSeries.data.setAll([
  { id: "DE", value: 45 },
  { id: "FR", value: 42 },
  { id: "IT", value: 47 },
  { id: "ES", value: 45 },
  { id: "GB", value: 40 },
  { id: "PL", value: 41 },
  { id: "UA", value: 41 },
  { id: "RU", value: 39 },
  { id: "TR", value: 32 },
  { id: "SA", value: 30 },
  { id: "IR", value: 32 },
  { id: "EG", value: 24 },
  { id: "DZ", value: 28 },
  { id: "NG", value: 18 },
  { id: "KZ", value: 31 }
]);

// Make stuff animate on load
// https://docs.amcharts.com/v5/concepts/animations/
chart.appear(1000, 100);
```

## Finding a polygon

`getPolygonByPoint()` returns the polygon whose pixel is under a point, given in coordinates relative to the root element. Gaps between a polygon's pixels count as part of it.

TypeScript:

```ts
let polygon = pixelSeries.getPolygonByPoint({ x: 200, y: 150 });
```

JavaScript:

```js
var polygon = pixelSeries.getPolygonByPoint({ x: 200, y: 150 });
```

## SVG export

When the chart is [exported as SVG](https://docs.amcharts.com/v5/concepts/exporting/exporting-svg/), each polygon's pixels are grouped together, with the polygon's `id` and name. This makes the result easy to edit in a vector editor.

To export just the pixels, without the rest of the chart:

TypeScript:

```ts
let svg = am5.renderToSVG(pixelSeries.pixels);
```

JavaScript:

```js
var svg = am5.renderToSVG(pixelSeries.pixels);
```

## Settings

Besides the settings of [Map polygon series](https://docs.amcharts.com/v5/charts/map-chart/map-polygon-series/), these are available:

| Setting               | Default    | Comment                                                                       |
| --------------------- | ---------- | ----------------------------------------------------------------------------- |
| `step`                | `2`        | Distance between pixel centers, in degrees.                                   |
| `pixelSize`           | `0.8`      | Pixel size relative to `step`. At `1`, pixels touch.                          |
| `pixelType`           | `"square"` | Shape of a pixel: `"square"`, `"circle"`, `"diamond"` or `"hexagon"`.         |
| `stagger`             |            | Shifts every other row by half a pixel. By default, depends on the shape.     |
| `equalArea`           | `true`     | Fewer pixels per row towards the poles, so they spread evenly over the globe. |
| `equalWidth`          | `false`    | Every pixel as wide as one on the equator.                                    |
| `uniform`             | `false`    | Even grid on the screen, with all pixels the same size and upright.           |
| `columnHeight`        | `0`        | Height of the tallest 3D column, as a share of the globe's radius.            |
| `pixelHeightFunction` |            | Function that returns each pixel's column height, from `0` to `1`.            |
