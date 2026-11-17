---
title: "Map chart heat map"
source: "https://docs.amcharts.com/embeds/v5/map-chart-heat-map/"
category: "docs-demos"
scraped: "2026-11-16"
docsPages: ["concepts/settings/heat-rules"]
---

A demo from the docs page "Heat rules" (get_doc(path: "concepts/settings/heat-rules")). It shows one setting in isolation: for a chart you build, start the themes with `Animated` and `ResponsiveMax`.

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
    projection: am5map.geoAlbersUsa()
  })
);

// Create polygon series
var polygonSeries = chart.series.push(
  am5map.MapPolygonSeries.new(root, {
    geoJSON: am5geodata_usaLow,
    valueField: "value",
    calculateAggregates: true
  })
);

polygonSeries.mapPolygons.template.setAll({
  tooltipText: "{name}: {value}"
});

polygonSeries.set("heatRules", [
  {
    target: polygonSeries.mapPolygons.template,
    dataField: "value",
    min: am5.color(0xff621f),
    max: am5.color(0x661f00),
    key: "fill"
  }
]);

polygonSeries.data.setAll([
  { id: "US-AL", value: 4447100 },
  { id: "US-AK", value: 626932 },
  { id: "US-AZ", value: 5130632 },
  { id: "US-AR", value: 2673400 },
  { id: "US-CA", value: 33871648 },
  { id: "US-CO", value: 4301261 },
  { id: "US-CT", value: 3405565 },
  { id: "US-DE", value: 783600 },
  { id: "US-FL", value: 15982378 },
  { id: "US-GA", value: 8186453 },
  { id: "US-HI", value: 1211537 },
  { id: "US-ID", value: 1293953 },
  { id: "US-IL", value: 12419293 },
  { id: "US-IN", value: 6080485 },
  { id: "US-IA", value: 2926324 },
  { id: "US-KS", value: 2688418 },
  { id: "US-KY", value: 4041769 },
  { id: "US-LA", value: 4468976 },
  { id: "US-ME", value: 1274923 },
  { id: "US-MD", value: 5296486 },
  { id: "US-MA", value: 6349097 },
  { id: "US-MI", value: 9938444 },
  { id: "US-MN", value: 4919479 },
  { id: "US-MS", value: 2844658 },
  { id: "US-MO", value: 5595211 },
  { id: "US-MT", value: 902195 },
  { id: "US-NE", value: 1711263 },
  { id: "US-NV", value: 1998257 },
  { id: "US-NH", value: 1235786 },
  { id: "US-NJ", value: 8414350 },
  { id: "US-NM", value: 1819046 },
  { id: "US-NY", value: 18976457 },
  { id: "US-NC", value: 8049313 },
  { id: "US-ND", value: 642200 },
  { id: "US-OH", value: 11353140 },
  { id: "US-OK", value: 3450654 },
  { id: "US-OR", value: 3421399 },
  { id: "US-PA", value: 12281054 },
  { id: "US-RI", value: 1048319 },
  { id: "US-SC", value: 4012012 },
  { id: "US-SD", value: 754844 },
  { id: "US-TN", value: 5689283 },
  { id: "US-TX", value: 20851820 },
  { id: "US-UT", value: 2233169 },
  { id: "US-VT", value: 608827 },
  { id: "US-VA", value: 7078515 },
  { id: "US-WA", value: 5894121 },
  { id: "US-WV", value: 1808344 },
  { id: "US-WI", value: 5363675 },
  { id: "US-WY", value: 493782 }
]);
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
- https://cdn.amcharts.com/lib/5/geodata/usaLow.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
