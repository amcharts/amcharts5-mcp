---
title: "Map line pushing data items"
source: "https://docs.amcharts.com/embeds/v5/map-line-pushing-data-items/"
category: "docs-demos"
scraped: "2026-11-16"
docsPages: ["charts/map-chart/map-line-series"]
---

A demo from the docs page "Map line series" (get_doc(path: "charts/map-chart/map-line-series")). It shows one setting in isolation: for a chart you build, start the themes with `Animated` and `ResponsiveMax`.

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

// Create root
var root = am5.Root.new("chartdiv");

// Set themes
root.setThemes([am5themes_Animated.new(root)]);

// Create chart
var chart = root.container.children.push(
  am5map.MapChart.new(root, {
    panX: "rotateX",
    panY: "none",
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

// Create line series
var lineSeries = chart.series.push(am5map.MapLineSeries.new(root, {}));

lineSeries.pushDataItem({
  geometry: {
    type: "LineString",
    coordinates: [
      [-73.778137, 40.641312],
      [-0.454296, 51.47002],
      [116.597504, 40.072498]
    ]
  }
});

lineSeries.mapLines.template.setAll({
  stroke: am5.color(0xff0000),
  strokeWidth: 2,
  strokeOpacity: 1
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
