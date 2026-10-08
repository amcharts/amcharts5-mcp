---
title: "Globe with Surface Bullets"
source: "https://www.amcharts.com/demos/globe-with-surface-bullets/"
category: "maps"
scraped: "2026-10-08"
---

Twelve city pins that lie on the surface of the globe, as if painted on it: they turn with the globe and flatten towards its edge.

Bullets that lie on the map: Map bullets normally face the viewer wherever they are. With surfaceBullets on, each one is laid onto the map's surface instead, and turns, squashes and stretches with the projection where it stands. On a globe the pins flatten towards the edge; on Mercator they grow towards the poles, as the land does.

Good for:
- Pins and icons that belong to the map
- Turning globes, where upright markers look pasted on
- Showing how a projection stretches the world

Think twice when:
- Markers that must stay readable: near the edge they flatten to slivers
- Text labels: keep them upright
- Hundreds of places: small dots or clusters are lighter

Prompt: Create a draggable globe with map pins on 12 cities around the world that lie on the globe’s surface, as if painted on it, so they flatten towards its edge, with the city’s name in a tooltip. Use the amCharts 5 library with its Responsive theme.

## JavaScript

```javascript
// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root),
  am5themes_Responsive.new(root)
]);

// Colors from the theme, so the globe follows the theme
var colors = am5.ColorSet.new(root, {});

// Create the map chart
// https://www.amcharts.com/docs/v5/charts/map-chart/
var chart = root.container.children.push(am5map.MapChart.new(root, {
  // near-black space behind the satellite picture, shown only with it
  background: am5.Rectangle.new(root, {
    fill: am5.color(0x101318),
    fillOpacity: 0 // clear until the satellite view turns it on
  }),
  minZoomLevel: 0.5,                    // zoom out to half the fitted size at most
  // go to the home view once the map is fitted
  autoHome: true,
  projection: am5map.geoOrthographic(), // a globe: the Earth as seen from space
  panX: "rotateX",                      // drag sideways to spin the globe...
  panY: "rotateY"                       // ...or up and down to tilt it
}));

// Create series for background fill
// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/#Background_polygon
var backgroundSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {}));

backgroundSeries.mapPolygons.template.setAll({
  fill: root.interfaceColors.get("alternativeBackground"), // dark on a light background, light on a dark one
  fillOpacity: 0.06, // faint
  strokeOpacity: 0   // no outline
});

backgroundSeries.data.push({
  geometry: am5map.getGeoRectangle(90, 180, -90, -180) // north, east, south and west edges: the whole world
});

// Satellite view: NASA's picture of the Earth by day, under the grid lines and the countries. Hidden at first
// (visible: false): make it visible for the satellite view
// https://www.amcharts.com/docs/v5/charts/map-chart/map-raster-series/
var satelliteSeries = chart.series.push(am5map.MapRasterSeries.new(root, {
  visible: false,
  // the map fits the countries, not the whole picture
  affectsBounds: false
}));

// Create graticule series: grid lines every 10 degrees
// https://www.amcharts.com/docs/v5/charts/map-chart/graticule-series/
var graticuleSeries = chart.series.push(am5map.GraticuleSeries.new(root, {
  step: 10
}));

graticuleSeries.mapLines.template.setAll({
  stroke: root.interfaceColors.get("alternativeBackground"), // dark on a light background, light on a dark one
  strokeOpacity: 0.08 // very faint
});

// Create main polygon series for countries
// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
var polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
  geoJSON: am5geodata_worldLow
}));

// Create point series for the cities. surfaceBullets lays the bullets onto
// the surface of the map, so they turn and squash with it: on the globe they
// flatten towards the edge
// https://www.amcharts.com/docs/v5/charts/map-chart/map-point-series/
var pointSeries = chart.series.push(am5map.MapPointSeries.new(root, {
  surfaceBullets: true,
  latitudeField: "latitude",
  longitudeField: "longitude"
}));

// All the pins share one template: their color and size
var pinTemplate = am5.Template.new({
  fill: colors.getIndex(10), // a palette color
  scale: 1.5                 // 1.5 times the size the path is drawn at
});

// A pin, drawn with its tip at the point
pointSeries.bullets.push(function() {
  return am5.Bullet.new(root, {
    sprite: am5.Graphics.new(root, {
      // the pin's outline and its hole, as SVG path data
      svgPath: "M0,0 C-5,-7 -9,-11 -9,-17 A9,9 0 1 1 9,-17 C9,-11 5,-7 0,0 Z M0,-20.5 A3.5,3.5 0 1 0 0,-13.5 A3.5,3.5 0 1 0 0,-20.5 Z",
      stroke: root.interfaceColors.get("background"), // an outline in the background color...
      strokeWidth: 1,        // ...1px wide
      tooltipText: "{title}" // the city's name on hover
    }, pinTemplate)
  });
});

pointSeries.data.setAll([
  { title: "New York", latitude: 40.7128, longitude: -74.006 },
  { title: "Mexico City", latitude: 19.4326, longitude: -99.1332 },
  { title: "Sao Paulo", latitude: -23.5505, longitude: -46.6333 },
  { title: "Reykjavik", latitude: 64.1466, longitude: -21.9426 },
  { title: "London", latitude: 51.5072, longitude: -0.1276 },
  { title: "Lagos", latitude: 6.5244, longitude: 3.3792 },
  { title: "Cape Town", latitude: -33.9249, longitude: 18.4241 },
  { title: "Cairo", latitude: 30.0444, longitude: 31.2357 },
  { title: "Moscow", latitude: 55.7558, longitude: 37.6173 },
  { title: "Delhi", latitude: 28.6139, longitude: 77.209 },
  { title: "Tokyo", latitude: 35.6895, longitude: 139.6917 },
  { title: "Sydney", latitude: -33.8688, longitude: 151.2093 }
]);

// The image credit
var credit = chart.children.push(am5.Label.new(root, {
  text: "Imagery: NASA Earth Observatory",
  fontSize: 12,              // small text...
  fill: am5.color(0xffffff), // ...in white, over the dark satellite picture...
  fillOpacity: 0.6,          // ...a little see-through
  x: am5.p100,               // at the chart's right edge...
  centerX: am5.p100,         // ...aligned by its own right edge
  dx: -10,                   // 10px in from the edge
  y: 10,                     // 10px from the top
  visible: false             // shown only with the satellite picture
}));

// The countries' own look, to go back to
var landTemplate = polygonSeries.mapPolygons.template;
var landLook = {
  fillOpacity: landTemplate.get("fillOpacity", 1),
  stroke: landTemplate.get("stroke", root.interfaceColors.get("background")),
  strokeOpacity: landTemplate.get("strokeOpacity", 1)
};

// The picture loads the first time it shows. Then the countries turn to white outlines over it, the grid lines
// turn white, the credit shows and the map sits in near-black space
satelliteSeries.on("visible", function(visible) {
  if (visible) {
    satelliteSeries.set("src", "https://cdn.amcharts.com/lib/5/geodata/images/earthDay2048.jpg");
  }
  credit.set("visible", visible);
  chart.get("background").set("fillOpacity", visible ? 1 : 0);
  landTemplate.setAll(visible ? { fillOpacity: 0, stroke: am5.color(0xffffff), strokeOpacity: 0.6 } : landLook);
  graticuleSeries.mapLines.template.set("stroke", visible ? am5.color(0xffffff) : root.interfaceColors.get("alternativeBackground"));
});

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
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
  height: 500px;
  font-size: 0.875rem;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/map.js
- https://cdn.amcharts.com/lib/5/geodata/worldLow.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
