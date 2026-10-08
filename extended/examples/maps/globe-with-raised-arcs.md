---
title: "Globe with Raised Arcs"
source: "https://www.amcharts.com/demos/globe-with-raised-arcs/"
category: "maps"
scraped: "2026-10-08"
---

Two routes around the world on a globe, one through the north and one through the south, drawn as arcs that rise above the surface like flight paths. Where a route runs over the edge of the globe, its arc stays in view.

Lines that leave the ground: Set altitude on a map line, in meters, and its middle rises off the surface in an arc, highest halfway along. On a globe the arcs rise away from the surface and stay in view past its edge; on a flat map they rise up the screen. The routes read like trajectories, which suits flights and other long-distance links.

Good for:
- Flight routes between hubs
- Connections between continents
- A globe that opens a landing page

Think twice when:
- Many routes: arcs pile up, so show fewer or group them
- Volumes on each route: a map Sankey sizes the bands
- Paths on the ground, like roads or rivers: keep the lines flat

Prompt: Create a draggable globe with two routes around the world, a northern and a southern one, each linking major cities in a loop. Draw each route in its own color as a dashed line raised into arcs above the surface. Use the amCharts 5 library with its Responsive theme.

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

// Create the map chart, zoomed out a little to leave room for the arcs that
// rise past the edge of the globe
// https://www.amcharts.com/docs/v5/charts/map-chart/
var chart = root.container.children.push(am5map.MapChart.new(root, {
  // near-black space behind the satellite picture, shown only with it
  background: am5.Rectangle.new(root, {
    fill: am5.color(0x101318),
    fillOpacity: 0 // clear until the satellite view turns it on
  }),
  // go to the home view once the map is fitted
  autoHome: true,
  projection: am5map.geoOrthographic(), // a globe: the Earth as seen from space
  panX: "rotateX",                      // drag sideways to spin the globe...
  panY: "rotateY",                      // ...or up and down to tilt it
  // start facing longitude 20, latitude 20, over North Africa
  rotationX: -20,
  rotationY: -20,
  minZoomLevel: 0.5,                    // zoom out to half the fitted size at most
  zoomLevel: 0.85,                      // start a little zoomed out...
  homeZoomLevel: 0.85                   // ...and come back to that on Home
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

// Two routes around the world, each in its own theme color
var northColor = colors.getIndex(10);
var southColor = colors.getIndex(4);

// Create point series for the cities
// https://www.amcharts.com/docs/v5/charts/map-chart/map-point-series/
var pointSeries = chart.series.push(am5map.MapPointSeries.new(root, {
  latitudeField: "latitude",
  longitudeField: "longitude"
}));

pointSeries.bullets.push(function() {
  return am5.Bullet.new(root, {
    sprite: am5.Circle.new(root, {
      radius: 5,              // 5px radius
      stroke: root.interfaceColors.get("background"), // an outline in the background color...
      strokeWidth: 2,         // ...2px wide
      tooltipText: "{title}", // the city's name on hover
      // each city takes the color of its route
      templateField: "settings"
    })
  });
});

pointSeries.data.setAll([
  // the northern route
  { id: "london", title: "London", latitude: 51.5072, longitude: -0.1276, settings: { fill: northColor } },
  { id: "new-york", title: "New York", latitude: 40.7128, longitude: -74.006, settings: { fill: northColor } },
  { id: "san-francisco", title: "San Francisco", latitude: 37.7749, longitude: -122.4194, settings: { fill: northColor } },
  { id: "tokyo", title: "Tokyo", latitude: 35.6762, longitude: 139.6503, settings: { fill: northColor } },
  { id: "delhi", title: "Delhi", latitude: 28.6139, longitude: 77.209, settings: { fill: northColor } },
  { id: "dubai", title: "Dubai", latitude: 25.2048, longitude: 55.2708, settings: { fill: northColor } },
  // the southern route
  { id: "sao-paulo", title: "Sao Paulo", latitude: -23.5505, longitude: -46.6333, settings: { fill: southColor } },
  { id: "johannesburg", title: "Johannesburg", latitude: -26.2041, longitude: 28.0473, settings: { fill: southColor } },
  { id: "singapore", title: "Singapore", latitude: 1.3521, longitude: 103.8198, settings: { fill: southColor } },
  { id: "sydney", title: "Sydney", latitude: -33.8688, longitude: 151.2093, settings: { fill: southColor } },
  { id: "santiago", title: "Santiago", latitude: -33.4489, longitude: -70.6693, settings: { fill: southColor } }
]);

// Create line series for the routes, linked to the cities by their ids.
// altitude raises the middle of each line above the surface, in meters,
// so the routes arc like a trajectory
// https://www.amcharts.com/docs/v5/charts/map-chart/map-line-series/
var lineSeries = chart.series.push(am5map.MapLineSeries.new(root, {
  pointSeries: pointSeries
}));

lineSeries.mapLines.template.setAll({
  altitude: 1000000,
  strokeWidth: 2,          // 2px wide...
  strokeDasharray: [2, 2], // ...dotted: 2px dashes, 2px gaps
  // each route has its own color
  templateField: "settings"
});

lineSeries.data.setAll([
  // the northern route: west from London across the Atlantic, America, the Pacific and Asia, and back
  { pointIds: ["london", "new-york", "san-francisco", "tokyo", "delhi", "dubai", "london"], settings: { stroke: northColor } },
  // the southern route: from Sao Paulo across the Atlantic, the Indian Ocean and the Pacific, and back
  { pointIds: ["sao-paulo", "johannesburg", "singapore", "sydney", "santiago", "sao-paulo"], settings: { stroke: southColor } }
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
