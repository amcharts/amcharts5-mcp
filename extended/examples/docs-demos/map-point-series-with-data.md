---
title: "Map point series with data"
source: "https://docs.amcharts.com/embeds/v5/map-point-series-with-data/"
category: "docs-demos"
scraped: "2026-11-16"
docsPages: ["charts/map-chart/map-point-series"]
---

A demo from the docs page "Map point series" (get_doc(path: "charts/map-chart/map-point-series")).

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

pointSeries.data.setAll([
  {
    geometry: {
      type: "Point",
      coordinates: [-73.778137, 40.641312]
    }
  },

  {
    geometry: {
      type: "Point",
      coordinates: [-0.454296, 51.47002]
    }
  },

  {
    geometry: {
      type: "Point",
      coordinates: [116.597504, 40.072498]
    }
  }
]);

pointSeries.bullets.push(function () {
  return am5.Bullet.new(root, {
    sprite: am5.Circle.new(root, {
      radius: 5,
      fill: am5.color(0xffba00)
    })
  });
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
