---
title: "State abbreviations on a US map"
source: "https://docs.amcharts.com/embeds/v5/state-abbreviations-on-a-us-map/"
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

// Create root and chart
var root = am5.Root.new("chartdiv");

// Set themes
root.setThemes([am5themes_Animated.new(root)]);

var chart = root.container.children.push(
  am5map.MapChart.new(root, {
    panX: "rotateX",
    projection: am5map.geoAlbersUsa()
  })
);

// Create polygon series
var polygonSeries = chart.series.push(
  am5map.MapPolygonSeries.new(root, {
    geoJSON: am5geodata_usaLow
  })
);

polygonSeries.mapPolygons.template.setAll({
  tooltipText: "{name}",
  interactive: true
});

polygonSeries.mapPolygons.template.states.create("hover", {
  fill: am5.color(0x677935)
});

// Create series for labels
var pointSeries = chart.series.push(
  am5map.MapPointSeries.new(root, {
    polygonIdField: "polygonId"
  })
);

pointSeries.bullets.push(function () {
  return am5.Bullet.new(root, {
    sprite: am5.Label.new(root, {
      fontSize: 10,
      centerX: am5.p50,
      centerY: am5.p50,
      text: "{name}",
      populateText: true
    })
  });
});

// Add state labels
polygonSeries.events.on("datavalidated", function (ev) {
  var series = ev.target;
  var labelData = [];
  series.mapPolygons.each(function (polygon) {
    var id = polygon.dataItem.get("id");
    labelData.push({
      polygonId: id,
      name: id.split("-").pop()
    });
  });
  pointSeries.data.setAll(labelData);
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
- https://cdn.amcharts.com/lib/5/geodata/usaLow.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
