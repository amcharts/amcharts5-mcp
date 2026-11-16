---
title: "Marker moving along a route"
source: "https://docs.amcharts.com/embeds/v5/marker-moving-along-a-route/"
category: "docs-demos"
scraped: "2026-11-14"
docsPages: ["concepts/animations"]
---

A demo from the docs page "Animations" (get_doc(path: "concepts/animations")).

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

// Create the map chart
// https://docs.amcharts.com/v5/charts/map-chart/
var chart = root.container.children.push(
  am5map.MapChart.new(root, {
    panX: "rotateX",
    projection: am5map.geoNaturalEarth1()
  })
);

// Create polygon series for countries
var polygonSeries = chart.series.push(
  am5map.MapPolygonSeries.new(root, {
    geoJSON: am5geodata_worldLow,
    exclude: ["AQ"]
  })
);

// Create the route: New York > London > Beijing
// https://docs.amcharts.com/v5/charts/map-chart/map-line-series/
var lineSeries = chart.series.push(am5map.MapLineSeries.new(root, {}));

lineSeries.mapLines.template.setAll({
  stroke: root.interfaceColors.get("alternativeBackground"),
  strokeOpacity: 0.6,
  strokeDasharray: [3, 3]
});

lineSeries.data.setAll([
  {
    id: "route",
    geometry: {
      type: "LineString",
      coordinates: [
        [-73.778137, 40.641312],
        [-0.454296, 51.47002],
        [116.597504, 40.072498]
      ]
    }
  }
]);

// Create a point that sits on the route
// https://docs.amcharts.com/v5/charts/map-chart/map-point-series/#points-on-a-line
var pointSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));

pointSeries.bullets.push(function () {
  return am5.Bullet.new(root, {
    sprite: am5.Circle.new(root, {
      radius: 7,
      fill: am5.color(0xff5500),
      stroke: root.interfaceColors.get("background"),
      strokeWidth: 2,

      // Animate positionOnLine of the point's data item, from start to end
      // and back, forever
      // https://docs.amcharts.com/v5/concepts/animations/#animations-as-settings
      animations: [
        {
          key: "positionOnLine",
          target: "dataItem",
          from: 0,
          to: 1,
          duration: 6000,
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
    lineId: "route",
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
