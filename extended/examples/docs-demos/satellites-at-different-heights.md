---
title: "Satellites at different heights"
source: "https://docs.amcharts.com/embeds/v5/satellites-at-different-heights/"
category: "docs-demos"
scraped: "2026-11-16"
docsPages: ["charts/map-chart/map-point-series"]
---

A demo from the docs page "Map point series" (get_doc(path: "charts/map-chart/map-point-series")). It shows one setting in isolation: for a chart you build, start the themes with `Animated` and `ResponsiveMax`.

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

// Create the map chart: a globe
// https://docs.amcharts.com/v5/charts/map-chart/
var chart = root.container.children.push(
  am5map.MapChart.new(root, {
    panX: "rotateX",
    panY: "rotateY",
    projection: am5map.geoOrthographic(),
    rotationY: -20
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
var polygonSeries = chart.series.push(
  am5map.MapPolygonSeries.new(root, {
    geoJSON: am5geodata_worldLow
  })
);

// Create point series that reads heights (metres) from data
// https://docs.amcharts.com/v5/charts/map-chart/map-point-series/#altitude
var pointSeries = chart.series.push(
  am5map.MapPointSeries.new(root, {
    latitudeField: "lat",
    longitudeField: "long",
    altitudeField: "altitude"
  })
);

pointSeries.bullets.push(function () {
  var container = am5.Container.new(root, {});

  container.children.push(
    am5.Circle.new(root, {
      radius: 5,
      fill: am5.color(0xff5500),
      stroke: root.interfaceColors.get("background"),
      strokeWidth: 2,
      tooltipText: "{name}: {altitude.formatNumber('#,###')} m"
    })
  );

  container.children.push(
    am5.Label.new(root, {
      text: "{name}",
      fontSize: 12,
      centerY: am5.p50,
      dx: 8,
      populateText: true
    })
  );

  return am5.Bullet.new(root, {
    sprite: container
  });
});

// Positions are made up; heights are roughly real
pointSeries.data.setAll([
  { name: "Tiangong", long: 20, lat: 35, altitude: 390000 },
  { name: "ISS", long: -10, lat: 45, altitude: 420000 },
  { name: "Hubble", long: 0, lat: 20, altitude: 540000 },
  { name: "Sentinel", long: 30, lat: 10, altitude: 790000 },
  { name: "Iridium", long: 10, lat: 60, altitude: 1100000 },
  { name: "Globalstar", long: -20, lat: 15, altitude: 1400000 }
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
