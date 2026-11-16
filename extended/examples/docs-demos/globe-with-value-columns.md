---
title: "Globe with value columns"
source: "https://docs.amcharts.com/embeds/v5/globe-with-value-columns/"
category: "docs-demos"
scraped: "2026-11-16"
docsPages: ["charts/map-chart/pixel-map-series"]
---

A demo from the docs page "Pixel map series" (get_doc(path: "charts/map-chart/pixel-map-series")).

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

// Create root element
// https://docs.amcharts.com/v5/getting-started/#root-element
var root = am5.Root.new("chartdiv");

// Set themes
// https://docs.amcharts.com/v5/concepts/themes/
root.setThemes([am5themes_Animated.new(root)]);

// Create chart: a globe
// https://docs.amcharts.com/v5/charts/map-chart/
var chart = root.container.children.push(
  am5map.MapChart.new(root, {
    panX: "rotateX",
    panY: "rotateY",
    projection: am5map.geoOrthographic(),
    rotationX: -40,
    rotationY: -30
  })
);

// Add series: countries as pixels raised into columns by value
// https://docs.amcharts.com/v5/charts/map-chart/pixel-map-series/#3d-columns
var pixelSeries = chart.series.push(
  am5map.PixelMapSeries.new(root, {
    geoJSON: am5geodata_worldLow,
    exclude: ["AQ"],
    step: 2,
    pixelSize: 0.8,
    valueField: "value",
    calculateAggregates: true,
    columnHeight: 0.15 // tallest column: 15% of the globe's radius
  })
);

pixelSeries.mapPolygons.template.setAll({
  fill: root.interfaceColors.get("disabled"),
  tooltipText: "{name}: {value}"
});

// Color by value too
pixelSeries.set("heatRules", [
  {
    target: pixelSeries.mapPolygons.template,
    dataField: "value",
    min: am5.color(0xffd19a),
    max: am5.color(0xb3261e),
    key: "fill"
  }
]);

// Set data: median age, years
pixelSeries.data.setAll([
  { id: "DE", value: 45 },
  { id: "FR", value: 42 },
  { id: "IT", value: 47 },
  { id: "ES", value: 45 },
  { id: "GB", value: 40 },
  { id: "PL", value: 41 },
  { id: "UA", value: 41 },
  { id: "RU", value: 39 },
  { id: "TR", value: 32 },
  { id: "SA", value: 30 },
  { id: "IR", value: 32 },
  { id: "EG", value: 24 },
  { id: "DZ", value: 28 },
  { id: "NG", value: 18 },
  { id: "KZ", value: 31 }
]);

// Make stuff animate on load
// https://docs.amcharts.com/v5/concepts/animations/
chart.appear(1000, 100);
```

## HTML

```html
<div id="chartdiv"></div>
```

## CSS

```css
#chartdiv {
  width: 100%;
  height: 95vh;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/map.js
- https://cdn.amcharts.com/lib/5/geodata/worldLow.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
