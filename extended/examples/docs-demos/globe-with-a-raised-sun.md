---
title: "Globe with a raised sun"
source: "https://docs.amcharts.com/embeds/v5/globe-with-a-raised-sun/"
category: "docs-demos"
scraped: "2026-11-16"
docsPages: ["charts/map-chart/night-series"]
---

A demo from the docs page "Night series" (get_doc(path: "charts/map-chart/night-series")). It shows one setting in isolation: for a chart you build, start the themes with `Animated` and `ResponsiveMax`.

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

// Where the sun is overhead right now
var sun = am5map.getSunPosition(new Date());

// Create the map chart: a globe, turned so that the sun is just past its
// right edge
// https://docs.amcharts.com/v5/charts/map-chart/
var chart = root.container.children.push(
  am5map.MapChart.new(root, {
    panX: "rotateX",
    panY: "rotateY",
    projection: am5map.geoOrthographic(),
    rotationX: 100 - sun.longitude
  })
);

// Add water
var backgroundSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {}));

backgroundSeries.mapPolygons.template.setAll({
  fill: root.interfaceColors.get("alternativeBackground"),
  fillOpacity: 0.1,
  strokeOpacity: 0
});

backgroundSeries.data.push({
  geometry: am5map.getGeoRectangle(90, 180, -90, -180)
});

// Create polygon series for countries
// https://docs.amcharts.com/v5/charts/map-chart/map-polygon-series/
var polygonSeries = chart.series.push(
  am5map.MapPolygonSeries.new(root, {
    geoJSON: am5geodata_worldLow
  })
);

// Shade the night side and show the sun
// https://docs.amcharts.com/v5/charts/map-chart/night-series/
var nightSeries = chart.series.push(
  am5map.NightSeries.new(root, {
    sunDate: "now", // the night as it is right now
    sunAltitude: 2000000 // raise the sun 2,000 km, so it peeks over the edge
  })
);

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
