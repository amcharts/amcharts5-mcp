---
title: "Pixel shapes"
source: "https://docs.amcharts.com/embeds/v5/pixel-shapes/"
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

function createMap(div, pixelType) {
  // Create root element
  // https://docs.amcharts.com/v5/getting-started/#root-element
  var root = am5.Root.new(div);

  root.setThemes([am5themes_Animated.new(root)]);

  // Create chart
  // https://docs.amcharts.com/v5/charts/map-chart/
  var chart = root.container.children.push(
    am5map.MapChart.new(root, {
      projection: am5map.geoNaturalEarth1()
    })
  );

  // Add series: countries drawn as a grid of pixels
  // https://docs.amcharts.com/v5/charts/map-chart/pixel-map-series/#pixel-shape
  var pixelSeries = chart.series.push(
    am5map.PixelMapSeries.new(root, {
      geoJSON: am5geodata_worldLow,
      exclude: ["AQ"],
      pixelType: pixelType,
      pixelSize: 0.9,
      step: 3
    })
  );

  pixelSeries.mapPolygons.template.setAll({
    tooltipText: "{name}"
  });

  // Label
  chart.children.push(
    am5.Label.new(root, {
      text: 'pixelType: "' + pixelType + '"',
      fontSize: 14,
      x: am5.p50,
      centerX: am5.p50
    })
  );

  chart.appear(1000, 100);
}

createMap("chartdiv1", "square");
createMap("chartdiv2", "circle");
createMap("chartdiv3", "diamond");
createMap("chartdiv4", "hexagon");
```

## HTML

```html
<div id="charts">
  <div id="chartdiv1" class="chartdiv"></div>
  <div id="chartdiv2" class="chartdiv"></div>
  <div id="chartdiv3" class="chartdiv"></div>
  <div id="chartdiv4" class="chartdiv"></div>
</div>
```

## CSS

```css
#charts {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.chartdiv {
  width: 100%;
  height: 45vh;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/map.js
- https://cdn.amcharts.com/lib/5/geodata/worldLow.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
