---
title: "Pixel map series"
source: "https://www.amcharts.com/docs/v5/charts/map-chart/pixel-map-series/"
scraped: "2026-10-08"
---

`PixelMapSeries` draws map polygons as a grid of pixels: squares, circles, diamonds or hexagons. It works like [Map polygon series](https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/), with the same data, heat rules, states and tooltips.

## Adding series

Pixel map series is created the same way as a polygon series:

let pixelSeries = chart.series.push(
  am5map.PixelMapSeries.new(root, {
    geoJSON: am5geodata\_worldLow,
    exclude: \["AQ"\]
  })
);

var pixelSeries = chart.series.push(
  am5map.PixelMapSeries.new(root, {
    geoJSON: am5geodata\_worldLow,
    exclude: \["AQ"\]
  })
);

The polygons themselves are not drawn. Each pixel takes the fill of the polygon it falls in, and the polygons stay in place, invisible, to handle tooltips, hovers and clicks.

This means pixels are styled through `mapPolygons.template`, the same as polygons in a regular polygon series:

pixelSeries.mapPolygons.template.setAll({
  fill: am5.color(0x6794dc),
  tooltipText: "{name}"
});

pixelSeries.mapPolygons.template.states.create("hover", {
  fill: am5.color(0x297373)
});

pixelSeries.mapPolygons.template.setAll({
  fill: am5.color(0x6794dc),
  tooltipText: "{name}"
});

pixelSeries.mapPolygons.template.states.create("hover", {
  fill: am5.color(0x297373)
});

## Grid

`step` sets the distance between pixel centers, in degrees (default: `2`). A small map, such as a single country, can use a much finer step, e.g. `0.01`.

NOTEA series draws at most 500,000 pixels. If a step would make more, it is made coarser, with a warning in the console.

`pixelSize` sets the size of a pixel relative to the step (default: `0.8`). At `1`, neighbouring pixels touch.

let pixelSeries = chart.series.push(
  am5map.PixelMapSeries.new(root, {
    geoJSON: am5geodata\_worldLow,
    step: 1.5,
    pixelSize: 1
  })
);

var pixelSeries = chart.series.push(
  am5map.PixelMapSeries.new(root, {
    geoJSON: am5geodata\_worldLow,
    step: 1.5,
    pixelSize: 1
  })
);

### Pixel shape

`pixelType` sets the shape: `"square"` (default), `"circle"`, `"diamond"` or `"hexagon"`.

Each shape packs in its own way: squares line up in columns, while circles, diamonds and hexagons are staggered, with every other row shifted by half a pixel. Set `stagger` to `true` or `false` to change it for squares and circles. Diamonds and hexagons are always staggered, since that is the only way they fit together.

let pixelSeries = chart.series.push(
  am5map.PixelMapSeries.new(root, {
    geoJSON: am5geodata\_worldLow,
    pixelType: "hexagon",
    pixelSize: 1
  })
);

var pixelSeries = chart.series.push(
  am5map.PixelMapSeries.new(root, {
    geoJSON: am5geodata\_worldLow,
    pixelType: "hexagon",
    pixelSize: 1
  })
);

### On the map or on the screen

By default, pixels lie on the surface of the map. They follow the projection: on a globe they turn and shrink towards the edge, and they get narrower towards the poles.

Pixels are spread evenly over the globe, with fewer per row towards the poles. Set `equalArea: false` to have the same number of pixels in every row instead. They will line up across the whole map, but crowd towards the poles.

`equalWidth: true` draws every pixel as wide as one on the equator, so they do not narrow towards the poles. They overlap there instead.

For something that looks like a pixel image of the map, set `uniform: true`. Pixels are then laid out on an even grid on the screen, all the same size and upright. The grid scales when the map is zoomed, and stays level when it is rotated.

let pixelSeries = chart.series.push(
  am5map.PixelMapSeries.new(root, {
    geoJSON: am5geodata\_worldLow,
    pixelType: "circle",
    uniform: true
  })
);

var pixelSeries = chart.series.push(
  am5map.PixelMapSeries.new(root, {
    geoJSON: am5geodata\_worldLow,
    pixelType: "circle",
    uniform: true
  })
);

With `uniform: true`, `step` is measured at the center of the map, and `equalArea`, `equalWidth` and `columnHeight` have no effect.

## Coloring by value

Since pixels take their polygon's fill, [heat rules](https://www.amcharts.com/docs/v5/concepts/settings/heat-rules/) work the same as in a polygon series:

let pixelSeries = chart.series.push(
  am5map.PixelMapSeries.new(root, {
    geoJSON: am5geodata\_worldLow,
    valueField: "value",
    calculateAggregates: true
  })
);

pixelSeries.set("heatRules", \[{
  target: pixelSeries.mapPolygons.template,
  dataField: "value",
  min: am5.color(0xffd19a),
  max: am5.color(0xb3261e),
  key: "fill"
}\]);

pixelSeries.data.setAll(\[
  { id: "US", value: 38 },
  { id: "BR", value: 33 },
  { id: "IN", value: 28 },
  { id: "NG", value: 18 }
\]);

var pixelSeries = chart.series.push(
  am5map.PixelMapSeries.new(root, {
    geoJSON: am5geodata\_worldLow,
    valueField: "value",
    calculateAggregates: true
  })
);

pixelSeries.set("heatRules", \[{
  target: pixelSeries.mapPolygons.template,
  dataField: "value",
  min: am5.color(0xffd19a),
  max: am5.color(0xb3261e),
  key: "fill"
}\]);

pixelSeries.data.setAll(\[
  { id: "US", value: 38 },
  { id: "BR", value: 33 },
  { id: "IN", value: 28 },
  { id: "NG", value: 18 }
\]);

## Outlines

Pixels have no outline by default. Set `strokeWidth` (and `stroke`) on the polygon template to outline each pixel:

pixelSeries.mapPolygons.template.setAll({
  stroke: am5.color(0xffffff),
  strokeWidth: 0.5
});

pixelSeries.mapPolygons.template.setAll({
  stroke: am5.color(0xffffff),
  strokeWidth: 0.5
});

## 3D columns

`columnHeight` raises pixels into 3D columns. It sets the height of the tallest column, as a share of the globe's radius. On flat maps, columns rise up the screen by the same measure.

let pixelSeries = chart.series.push(
  am5map.PixelMapSeries.new(root, {
    geoJSON: am5geodata\_worldLow,
    valueField: "value",
    calculateAggregates: true,
    columnHeight: 0.2
  })
);

var pixelSeries = chart.series.push(
  am5map.PixelMapSeries.new(root, {
    geoJSON: am5geodata\_worldLow,
    valueField: "value",
    calculateAggregates: true,
    columnHeight: 0.2
  })
);

By default, column height follows the polygon's value, from the series' lowest to its highest. This needs `calculateAggregates: true`. Polygons with no value stay flat. If no polygon has a value, every column is full height.

To set heights differently, use a heat rule with the polygon's `pixelHeight` setting, from `0` to `1` of `columnHeight`:

pixelSeries.set("heatRules", \[{
  target: pixelSeries.mapPolygons.template,
  dataField: "value",
  min: 0.1,
  max: 1,
  key: "pixelHeight"
}\]);

pixelSeries.set("heatRules", \[{
  target: pixelSeries.mapPolygons.template,
  dataField: "value",
  min: 0.1,
  max: 1,
  key: "pixelHeight"
}\]);

For full control, `pixelHeightFunction` sets the height of each pixel separately. It receives the pixel's data item, longitude and latitude, and returns a number from `0` to `1`:

pixelSeries.set("pixelHeightFunction", function(dataItem, longitude, latitude) {
  // Taller towards the equator
  return 1 - Math.abs(latitude) / 90;
});

pixelSeries.set("pixelHeightFunction", function(dataItem, longitude, latitude) {
  // Taller towards the equator
  return 1 - Math.abs(latitude) / 90;
});

NOTEFunctions are not saved when a chart is [serialized to JSON](https://www.amcharts.com/docs/v5/concepts/serializing/). Heights set with heat rules are.

## Finding a polygon

`getPolygonByPoint()` returns the polygon whose pixel is under a point, given in coordinates relative to the root element. Gaps between a polygon's pixels count as part of it.

let polygon = pixelSeries.getPolygonByPoint({ x: 200, y: 150 });

var polygon = pixelSeries.getPolygonByPoint({ x: 200, y: 150 });

## SVG export

When the chart is [exported as SVG](https://www.amcharts.com/docs/v5/concepts/exporting/exporting-svg/), each polygon's pixels are grouped together, with the polygon's `id` and name. This makes the result easy to edit in a vector editor.

To export just the pixels, without the rest of the chart:

let svg = am5.renderToSVG(pixelSeries.pixels);

var svg = am5.renderToSVG(pixelSeries.pixels);

## Settings

Besides the settings of [Map polygon series](https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/), these are available:

Setting

Default

Comment

`step`

`2`

Distance between pixel centers, in degrees.

`pixelSize`

`0.8`

Pixel size relative to `step`. At `1`, pixels touch.

`pixelType`

`"square"`

Shape of a pixel: `"square"`, `"circle"`, `"diamond"` or `"hexagon"`.

`stagger`

Shifts every other row by half a pixel. By default, depends on the shape.

`equalArea`

`true`

Fewer pixels per row towards the poles, so they spread evenly over the globe.

`equalWidth`

`false`

Every pixel as wide as one on the equator.

`uniform`

`false`

Even grid on the screen, with all pixels the same size and upright.

`columnHeight`

`0`

Height of the tallest 3D column, as a share of the globe's radius.

`pixelHeightFunction`

Function that returns each pixel's column height, from `0` to `1`.
