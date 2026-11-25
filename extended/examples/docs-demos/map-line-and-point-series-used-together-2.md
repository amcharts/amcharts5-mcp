---
title: "Map line and point series used together"
source: "https://docs.amcharts.com/embeds/v5/map-line-and-point-series-used-together-2/"
category: "docs-demos"
scraped: "2026-11-25"
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

// Create line series
var lineSeries = chart.series.push(am5map.MapLineSeries.new(root, {}));

lineSeries.mapLines.template.setAll({
  stroke: am5.color(0xffba00),
  strokeWidth: 2,
  strokeOpacity: 1
});

var route = lineSeries.pushDataItem({
  geometry: {
    type: "LineString",
    coordinates: [
      [-73.778137, 40.641312],
      [-0.454296, 51.47002],
      [116.597504, 40.072498]
    ]
  }
});

// Create point series
var pointSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));

pointSeries.bullets.push(function () {
  var container = am5.Container.new(root, {});
  container.children.push(
    am5.Graphics.new(root, {
      svgPath:
        "m2,106h28l24,30h72l-44,-133h35l80,132h98c21,0 21,34 0,34l-98,0 -80,134h-35l43,-133h-71l-24,30h-28l15,-47",
      scale: 0.06,
      centerY: am5.p50,
      centerX: am5.p50,
      fill: am5.color(0x000000)
    })
  );

  return am5.Bullet.new(root, { sprite: container });
});

var plane = pointSeries.pushDataItem({
  lineDataItem: route,
  positionOnLine: 0.7,
  autoRotate: true
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
