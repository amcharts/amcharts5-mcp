---
title: "Map API"
source: "https://www.amcharts.com/docs/v5/charts/map-chart/map-api/"
scraped: "2026-03-15"
---

This tutorial will look at various API functions that can be used with a `MapChart`.

## Converting between screen and geographical coordinates

A map chart has two methods that can be used to convert screen coordinates to longitude/latitude and back:

-   [invert](https://www.amcharts.com/docs/v5/reference/mapchart/#invert_method)() - converts screen coordinates to latitude/longitude.
-   [convert](https://www.amcharts.com/docs/v5/reference/mapchart/#convert_method)() - converts latitude/longitude to screen coordinates.

The following code will capture click on a map chart and use `point` (which holds screen coordinates) to retrieve latitude/longitude of the click place.

chart.events.on("click", function(ev) {
  console.log(chart.invert(ev.point))
});

chart.events.on("click", function(ev) {
  console.log(chart.invert(ev.point))
});

Similarly, if we need to convert geographical coordinates to an X/Y coordinate within the map chart area, we can use `convert()` method:

console.log("NYC", chart.convert({
  latitude: 40.712776,
  longitude: -74.005974
}));

console.log("NYC", chart.convert({
  latitude: 40.712776,
  longitude: -74.005974
}));


## Getting object by ID

While there's no dedicated methods to get map series object by its id, we can use generic series `getDataItemById()` method, and in turn extract actual target element from it.

The following code will grab a polygon by id from the `MapPolygonSeries`:

let dataItem = polygonSeries.getDataItemById("FR");
let polygon = countryDataItem.get("mapPolygon");

var dataItem = polygonSeries.getDataItemById("FR");
var polygon = countryDataItem.get("mapPolygon");
