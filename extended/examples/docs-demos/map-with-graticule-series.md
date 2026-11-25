---
title: "Map with graticule series"
source: "https://docs.amcharts.com/embeds/v5/map-with-graticule-series/"
category: "docs-demos"
scraped: "2026-11-25"
docsPages: ["charts/map-chart/graticule-series"]
---

A demo from the docs page "Graticule series" (get_doc(path: "charts/map-chart/graticule-series")). It shows one setting in isolation: for a chart you build, start the themes with `Animated` and `ResponsiveMax`.

## JavaScript

```javascript
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

## HTML

```html
<div id="chartdiv"></div>
```

## CSS

```css
#chartdiv {
  width: 100%;
  height: 400px;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/map.js
- https://cdn.amcharts.com/lib/5/geodata/worldLow.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
