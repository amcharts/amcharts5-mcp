---
title: "Map line and point series used together"
source: "https://docs.amcharts.com/embeds/v5/map-line-and-point-series-used-together/"
category: "docs-demos"
scraped: "2026-11-16"
docsPages: ["charts/map-chart/map-line-series","charts/map-chart/map-point-series"]
---

A demo from the docs pages "Map line series" (get_doc(path: "charts/map-chart/map-line-series")) and "Map point series" (get_doc(path: "charts/map-chart/map-point-series")). It shows one setting in isolation: for a chart you build, start the themes with `Animated` and `ResponsiveMax`.

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

// Create point series
var pointSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));

pointSeries.bullets.push(function () {
  let circle = am5.Circle.new(root, {
    radius: 7,
    tooltipY: 0,
    fill: am5.color(0xffba00),
    stroke: root.interfaceColors.get("background"),
    strokeWidth: 2,
    draggable: true
  });

  return am5.Bullet.new(root, {
    sprite: circle
  });
});

var nyc = pointSeries.pushDataItem({ latitude: 40.641312, longitude: -73.778137 });
var london = pointSeries.pushDataItem({ latitude: 51.47002, longitude: -0.454296 });
var beijing = pointSeries.pushDataItem({ latitude: 40.072498, longitude: 116.597504 });

// Create line series
var lineSeries = chart.series.push(am5map.MapLineSeries.new(root, {}));

lineSeries.pushDataItem({
  pointsToConnect: [nyc, london, beijing]
});

lineSeries.mapLines.template.setAll({
  stroke: am5.color(0xffba00),
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
