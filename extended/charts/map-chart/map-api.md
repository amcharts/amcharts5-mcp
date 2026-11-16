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

Example: [Retrieving lat/long coordinates of a map click](https://docs.amcharts.com/embeds/v5/retrieving-latlong-coordinates-of-a-map-click/). Its code: get_example(path: "examples/docs-demos/retrieving-latlong-coordinates-of-a-map-click").

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
