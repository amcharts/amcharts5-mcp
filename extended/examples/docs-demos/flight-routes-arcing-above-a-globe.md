---
title: "Flight routes arcing above a globe"
source: "https://docs.amcharts.com/embeds/v5/flight-routes-arcing-above-a-globe/"
category: "docs-demos"
scraped: "2026-11-16"
docsPages: ["charts/map-chart/map-line-series"]
---

A demo from the docs page "Map line series" (get_doc(path: "charts/map-chart/map-line-series")).

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
    rotationX: 30,
    rotationY: -30
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

// Create routes, each arcing to its own height (metres)
// https://docs.amcharts.com/v5/charts/map-chart/map-line-series/#altitude
var lineSeries = chart.series.push(am5map.MapLineSeries.new(root, {}));

lineSeries.mapLines.template.setAll({
  stroke: am5.color(0xff5500),
  strokeWidth: 2,
  templateField: "lineSettings"
});

var london = [-0.454296, 51.47002];

lineSeries.data.setAll([
  {
    id: "london-newyork",
    geometry: { type: "LineString", coordinates: [london, [-73.778137, 40.641312]] },
    lineSettings: { altitude: 800000 }
  },
  {
    geometry: { type: "LineString", coordinates: [london, [116.597504, 40.072498]] },
    lineSettings: { altitude: 1500000 }
  },
  {
    geometry: { type: "LineString", coordinates: [london, [55.364444, 25.252778]] },
    lineSettings: { altitude: 500000 }
  },
  {
    geometry: { type: "LineString", coordinates: [london, [28.246, -26.139]] },
    lineSettings: { altitude: 1100000 }
  }
]);

// A point riding one of the routes, at the route's height
var pointSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));

pointSeries.bullets.push(function () {
  return am5.Bullet.new(root, {
    sprite: am5.Circle.new(root, {
      radius: 6,
      fill: am5.color(0xffffff),
      stroke: am5.color(0xff5500),
      strokeWidth: 2,
      animations: [
        {
          key: "positionOnLine",
          target: "dataItem",
          from: 0,
          to: 1,
          duration: 5000,
          loops: 0,
          yoyo: true,
          easing: "sine",
          ease: "inOut"
        }
      ]
    })
  });
});

pointSeries.data.setAll([
  {
    lineId: "london-newyork",
    positionOnLine: 0
  }
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
