---
title: "Surface bullets on a globe"
source: "https://docs.amcharts.com/embeds/v5/surface-bullets-on-a-globe/"
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

// Create root element
// https://docs.amcharts.com/v5/getting-started/#root-element
var root = am5.Root.new("chartdiv");

// Set themes
// https://docs.amcharts.com/v5/concepts/themes/
root.setThemes([am5themes_Animated.new(root)]);

// Create the map chart: a globe that keeps turning
// https://docs.amcharts.com/v5/charts/map-chart/
var chart = root.container.children.push(
  am5map.MapChart.new(root, {
    panX: "rotateX",
    panY: "rotateY",
    projection: am5map.geoOrthographic(),
    rotationY: -20,
    animations: [{ key: "rotationX", from: 0, to: 360, duration: 60000, loops: 0 }]
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

// Create point series with surface bullets: each marker lies on the map,
// turning and squashing with the globe
// https://docs.amcharts.com/v5/charts/map-chart/map-point-series/#surface-bullets
var pointSeries = chart.series.push(
  am5map.MapPointSeries.new(root, {
    surfaceBullets: true
  })
);

pointSeries.bullets.push(function () {
  return am5.Bullet.new(root, {
    sprite: am5.Rectangle.new(root, {
      width: 24,
      height: 24,
      centerX: am5.p50,
      centerY: am5.p50,
      fill: am5.color(0xff5500),
      fillOpacity: 0.8
    })
  });
});

// A marker every 30 degrees
var data = [];
for (var longitude = -180; longitude < 180; longitude += 30) {
  for (var latitude = -60; latitude <= 60; latitude += 30) {
    data.push({ geometry: { type: "Point", coordinates: [longitude, latitude] } });
  }
}
pointSeries.data.setAll(data);

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
