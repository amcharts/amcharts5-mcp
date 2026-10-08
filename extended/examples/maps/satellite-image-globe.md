---
title: "Satellite Image Globe"
source: "https://www.amcharts.com/demos/satellite-image-globe/"
category: "maps"
scraped: "2026-10-08"
---

A 3D globe covered with a satellite image of the whole Earth, turning slowly on its own. The image is redrawn to fit the globe at every turn and zoom, with the country borders on top.

Satellite images on a map: A raster series takes one picture of the whole world, in the flat form satellite images come in, and redraws it for the map's projection whenever the globe turns or zooms. Where the browser has WebGL2, the graphics card does the redrawing. Borders, points and lines go on top as on any map, so the picture becomes a backdrop for your own data.

Good for:
- Landing pages and stories that open on the Earth
- A real-world backdrop for routes and places
- Weather, climate and travel themes

Think twice when:
- Comparing countries by value: color them on a plain map
- Slow connections: the image adds about 300 KB
- Data in pale colors: the busy image drowns it, dim the image or use strong colors

Prompt: Create a slowly turning globe covered with NASA’s satellite picture of the Earth, with the country borders drawn over it as thin lines and the country’s name in a tooltip. Give the globe a soft glow, and let it be dragged in any direction and zoomed. Use the amCharts 5 library with its Responsive theme.

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

// Create the map chart: a globe that turns once every two minutes
// https://www.amcharts.com/docs/v5/charts/map-chart/
var chart = root.container.children.push(am5map.MapChart.new(root, {
  projection: am5map.geoOrthographic(), // a globe, seen from space
  panX: "rotateX",                      // a sideways drag spins the globe
  panY: "rotateY",                      // an up or down drag tilts it
  // start far away and zoom in to the home zoom, 90% (room for the glow), once the globe is fitted; zooming out stops
  // at half size
  zoomLevel: 0.1,
  homeZoomLevel: 0.9,
  autoHome: true,
  minZoomLevel: 0.5,
  animations: [ // animations the chart plays by itself
    // a full turn every 2 minutes at a steady speed; loops: 0 repeats it forever
    { key: "rotationX", from: 0, to: 360, duration: 120000, loops: 0 }
  ]
}));

// Create series for a soft blue glow around the globe, like the atmosphere
// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/#Background_polygon
var glowSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {}));

glowSeries.mapPolygons.template.setAll({
  fill: am5.color(0x0b1a33),        // dark blue, behind the picture
  fillOpacity: 1,                   // solid
  strokeOpacity: 0,                 // no outline
  shadowColor: am5.color(0x6fa8ff), // a light blue shadow around the edge is the glow...
  shadowBlur: 40,                   // ...blurred 40px out...
  shadowOpacity: 0.7                // ...and fairly strong
});

// one polygon that covers the whole Earth, so its shadow rings the globe
glowSeries.data.push({
  geometry: am5map.getGeoRectangle(90, 180, -90, -180)
});

// Add the satellite image: a picture of the whole world, redrawn to fit the
// globe as it turns. It is read from the amCharts CDN
var rasterSeries = chart.series.push(am5map.MapRasterSeries.new(root, {
  src: "https://cdn.amcharts.com/lib/5/geodata/images/earthDay2048.jpg"
}));

// Add country borders over the image, with the country's name on hover
// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
var polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
  geoJSON: am5geodata_worldLow // country shapes from the low-detail world map
}));

polygonSeries.mapPolygons.template.setAll({
  fillOpacity: 0,              // no fill: the picture shows through
  stroke: am5.color(0xffffff), // white borders...
  strokeWidth: 0.5,            // ...thin...
  strokeOpacity: 0.6,          // ...and a little see-through
  tooltipText: "{name}"
});

// Add image credit, at the top right, clear of the zoom buttons
chart.children.push(am5.Label.new(root, {
  text: "Imagery: NASA Earth Observatory",
  fontSize: 12,              // small print
  fill: am5.color(0xffffff), // white, over the picture
  fillOpacity: 0.6,          // a little see-through
  x: am5.p100,               // at the chart's right edge...
  centerX: am5.p100,         // ...lined up by the label's own right side
  dx: -10,                   // 10px in from the edge
  y: 10                      // 10px from the top
}));

// Add zoom control
// https://www.amcharts.com/docs/v5/charts/map-chart/map-pan-zoom/#Zoom_control
var zoomControl = chart.set("zoomControl", am5map.ZoomControl.new(root, {}));

// the home button is hidden by default
zoomControl.homeButton.set("visible", true);

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
