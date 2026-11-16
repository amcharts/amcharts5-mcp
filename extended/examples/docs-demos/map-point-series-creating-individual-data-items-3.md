---
title: "Map point series creating individual data items"
source: "https://docs.amcharts.com/embeds/v5/map-point-series-creating-individual-data-items-3/"
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
    include: ["CA", "US", "MX"]
  })
);

// Create point series
var pointSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));

pointSeries.pushDataItem({ polygonId: "CA", name: "Canada" });
pointSeries.pushDataItem({ polygonId: "US", name: "United States" });
pointSeries.pushDataItem({ polygonId: "MX", name: "Mexico" });

pointSeries.bullets.push(function () {
  return am5.Bullet.new(root, {
    sprite: am5.Label.new(root, {
      centerX: am5.p50,
      centerY: am5.p50,
      text: "{name}",
      populateText: true
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
