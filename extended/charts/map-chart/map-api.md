---
title: "Map API"
source: "https://docs.amcharts.com/v5/charts/map-chart/map-api/"
scraped: "2026-11-14"
---

> This tutorial will look at various API functions that can be used with a MapChart.

This tutorial will look at various API functions that can be used with a `MapChart`.

## Converting between screen and geographical coordinates

A map chart has two methods that can be used to convert screen coordinates to longitude/latitude and back:

* [invert](https://docs.amcharts.com/v5/reference/mapchart/#invert_method)() - converts screen coordinates to latitude/longitude.
* [convert](https://docs.amcharts.com/v5/reference/mapchart/#convert_method)() - converts latitude/longitude to screen coordinates.

Both work in the coordinates of the chart's `seriesContainer`, the area inside the chart's padding. An event's `point` is relative to the whole chart area (root), so convert it with `seriesContainer.toLocal()` first. Without that, the result is off by the chart's position and padding, e.g. when a title sits above the map.

The following code will capture click on a map chart and retrieve latitude/longitude of the click place:

TypeScript:

```ts
chart.events.on("click", function(ev) {
  console.log(chart.invert(chart.seriesContainer.toLocal(ev.point)));
});
```

JavaScript:

```js
chart.events.on("click", function(ev) {
  console.log(chart.invert(chart.seriesContainer.toLocal(ev.point)));
});
```

Similarly, if we need to convert geographical coordinates to an X/Y coordinate within the map chart area, we can use `convert()` method:

TypeScript:

```ts
console.log("NYC", chart.convert({
  latitude: 40.712776,
  longitude: -74.005974
}));
```

JavaScript:

```js
console.log("NYC", chart.convert({
  latitude: 40.712776,
  longitude: -74.005974
}));
```

For a point relative to the whole chart area, use `chart.seriesContainer.toGlobal(chart.convert(geoPoint))`. Add the chart div's position on the page (`getBoundingClientRect()`) to get page coordinates.

Example: [Retrieving lat/long coordinates of a map click](https://docs.amcharts.com/embeds/v5/retrieving-latlong-coordinates-of-a-map-click/)

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

// Create root and chart
var root = am5.Root.new("chartdiv");

// Set themes
root.setThemes([am5themes_Animated.new(root)]);

var chart = root.container.children.push(
  am5map.MapChart.new(root, {
    panX: "rotateX",
    projection: am5map.geoNaturalEarth1()
  })
);

// Create polygon series
var polygonSeries = chart.series.push(
  am5map.MapPolygonSeries.new(root, {
    geoJSON: am5geodata_worldLow,
    exclude: ["AQ"]
  })
);

polygonSeries.mapPolygons.template.setAll({
  tooltipText: "{name}",
  interactive: true
});

polygonSeries.mapPolygons.template.states.create("hover", {
  fill: am5.color(0x677935)
});

chart.events.on("click", function (ev) {
  console.log(chart.invert(chart.seriesContainer.toLocal(ev.point)));
});
```

## Getting object by ID

While there's no dedicated methods to get map series object by its id, we can use generic series `getDataItemById()` method, and in turn extract actual target element from it.

The following code will grab a polygon by id from the `MapPolygonSeries`:

TypeScript:

```ts
let dataItem = polygonSeries.getDataItemById("FR");
let polygon = countryDataItem.get("mapPolygon");
```

JavaScript:

```js
var dataItem = polygonSeries.getDataItemById("FR");
var polygon = countryDataItem.get("mapPolygon");
```
