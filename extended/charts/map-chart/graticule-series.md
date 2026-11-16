---
title: "Graticule series"
source: "https://docs.amcharts.com/v5/charts/map-chart/graticule-series/"
scraped: "2026-11-16"
---

Graticule is a special kind of map series that will draw a map grid.

## Adding

To add a graticule grid to map we need to do two things:

* Add `GraticuleSeries` instance to map.
* Configure its line settings.

TypeScript:

```ts
let graticuleSeries = chart.series.unshift(
  am5map.GraticuleSeries.new(root, {})
);

graticuleSeries.mapLines.template.setAll({
  stroke: am5.color(0x000000),
  strokeOpacity: 0.1
});
```

JavaScript:

```js
var graticuleSeries = chart.series.unshift(
  am5map.GraticuleSeries.new(root, {})
);

graticuleSeries.mapLines.template.setAll({
  stroke: am5.color(0x000000),
  strokeOpacity: 0.1
});
```

The `unshift()` call above is used to insert graticule series at the beginning of the series list so it stays behind all the other series we may have.

Please note that graticule series is actually a line series under the hood. Please refer to the "[Map line series](https://docs.amcharts.com/v5/charts/map-chart/map-line-series/)" tutorial for further info on how to configure appearance of the lines.

Example: [Map with graticule series](https://docs.amcharts.com/embeds/v5/map-with-graticule-series/)

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
  height: 400px;
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
var chart = root.container.children.push(
  am5map.MapChart.new(root, {
    panX: "rotateX",
    panY: "none",
    projection: am5map.geoNaturalEarth1()
  })
);

// Set themes
root.setThemes([am5themes_Animated.new(root)]);

// Create polygon series
var polygonSeries = chart.series.push(
  am5map.MapPolygonSeries.new(root, {
    geoJSON: am5geodata_worldLow
  })
);

polygonSeries.mapPolygons.template.setAll({
  tooltipText: "{name}"
});

// polygonSeries.mapPolygons.template.states.create("hover").setAll({
//   fill: am5.color(0x6779356)
// })

var graticuleSeries = chart.series.insertIndex(0, am5map.GraticuleSeries.new(root, {}));

graticuleSeries.mapLines.template.setAll({
  stroke: am5.color(0x000000),
  strokeOpacity: 0.2
});

var backgroundSeries = chart.series.unshift(am5map.MapPolygonSeries.new(root, {}));

backgroundSeries.mapPolygons.template.setAll({
  fill: am5.color(0xd4f1f9),
  stroke: am5.color(0xd4f1f9)
});

backgroundSeries.data.push({
  geometry: am5map.getGeoRectangle(90, 180, -90, -180)
});
```

## Grid density

Normally. graticule series places a line every 10 degrees of latitude and longitude.

We can change the density using series' `step` setting:

TypeScript:

```ts
let graticuleSeries = chart.series.unshift(
  am5map.GraticuleSeries.new(root, {
    step: 20
  })
);
```

JavaScript:

```js
var graticuleSeries = chart.series.unshift(
  am5map.GraticuleSeries.new(root, {
    step: 20
  })
);
```

![](https://docs.amcharts.com/v5/images/charts/map-chart/graticule-series/graticule_step_10-1024x621.png "`step: 10` (default)")

![](https://docs.amcharts.com/v5/images/charts/map-chart/graticule-series/graticule_step_20-1024x621.png "`step: 20`")

![](https://docs.amcharts.com/v5/images/charts/map-chart/graticule-series/graticule_step_5-1024x621.png "`step: 5`")
