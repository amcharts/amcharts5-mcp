---
title: "Pre-zoom the map to a list of countries"
source: "https://docs.amcharts.com/embeds/v5/pre-zoom-the-map-to-a-list-of-countries/"
category: "docs-demos"
scraped: "2026-11-16"
docsPages: ["charts/map-chart/map-pan-zoom"]
---

A demo from the docs page "Panning and zooming the map" (get_doc(path: "charts/map-chart/map-pan-zoom")).

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

// Set themes
root.setThemes([am5themes_Animated.new(root)]);

var chart = root.container.children.push(
  am5map.MapChart.new(root, {
    panX: "rotateX",
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

polygonSeries.mapPolygons.template.setAll({
  tooltipText: "Country: {name}",
  interactive: true
});

polygonSeries.mapPolygons.template.states.create("hover", {
  fill: am5.color(0x677935)
});

polygonSeries.events.on("datavalidated", function () {
  var zoomTargets = ["SE", "FI", "NO", "DK"];
  var zoomDataItems = [];
  zoomTargets.forEach(function (id) {
    zoomDataItems.push(polygonSeries.getDataItemById(id));
  });
  polygonSeries.zoomToDataItems(zoomDataItems);
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
  height: 95vh;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/map.js
- https://cdn.amcharts.com/lib/5/geodata/worldLow.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
