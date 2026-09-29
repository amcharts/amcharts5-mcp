---
title: "Rotating Globe"
source: "https://www.amcharts.com/demos/rotating-globe/"
category: "maps"
scraped: "2026-09-29"
---

Take this 3D globe for a spin! It turns on its own, but you can grab it at any time and explore the world your way.
Drag to spin the globe in any direction
Scroll, double-click or use the + and − buttons to zoom (Shift + double-click zooms out)
Hold Shift and drag to zoom into an area
Hover over a country to see its name, click it to highlight it
The home button resets the view and stops the rotation
Make it your own
Want your own version of this globe? Edit this chart in the amCharts Editor. Change the colors, highlight countries, add pins and labels, or map your own data, then export it or share it with a link. No coding needed.
More to explore on DataViz Dojo
Spot the CountryHow fast can you find it? A world map geography quiz with several difficulty levels.
Day & Night World MapSee where the sun is shining right now, with live sun and moon positions and a globe view.
PAC-WORLDThe classic arcade game on a real world map, in four levels from the Pacific to the Pole.
For developers
This globe is an amCharts 5 MapChart with the orthographic projection (projection: am5map.geoOrthographic()), which draws any map as a globe. Setting panX: "rotateX" and panY: "rotateY" makes dragging rotate it, and a looping animation of rotationX keeps it spinning. The dark, grainy background is a GrainPattern fill. The full JavaScript, TypeScript and JSON source is below.
Related demos
Rotating Globe with Circles
Rotate Globe to a Selected Country
Map chart - Projections

## JavaScript

```javascript
// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");


// Dark buttons to match the dark globe
var myTheme = am5.Theme.new(root);

myTheme.rule("InterfaceColors").setAll({
  primaryButton: am5.color(0x3a3a3a),
  primaryButtonHover: am5.color(0x555555),
  primaryButtonDown: am5.color(0x2a2a2a),
  primaryButtonActive: am5.color(0xe59e24)
});

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root), myTheme
]);


// Create the map chart
// https://www.amcharts.com/docs/v5/charts/map-chart/
var chart = root.container.children.push(am5map.MapChart.new(root, {
  panX: "rotateX",
  panY: "rotateY",
  projection: am5map.geoOrthographic(),
  boxZoom: "shift",
  minZoomLevel: 0.5,
  zoomLevel: 0.95,
  homeZoomLevel: 0.95,
  animationDuration: 800,
  // Dark background with a subtle film-grain texture
  background: am5.Rectangle.new(root, {
    fill: am5.color(0x1a1a1a),
    fillOpacity: 1,
    fillPattern: am5.GrainPattern.new(root, {
      colors: [am5.color(0xe4e4e4)],
      size: 1,
      density: 0.6,
      maxOpacity: 0.07
    })
  })
}));


// Create main polygon series for countries
// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
var polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
  geoJSON: am5geodata_worldLow
}));

polygonSeries.mapPolygons.template.setAll({
  tooltipText: "{name}",
  toggleKey: "active",
  interactive: true,
  fill: am5.color(0x4a4a4a),
  stroke: am5.color(0x1a1a1a),
  strokeWidth: 0.5
});

polygonSeries.mapPolygons.template.states.create("hover", {
  fill: am5.color(0x6a6a6a)
});

// Clicked countries stay highlighted
polygonSeries.mapPolygons.template.states.create("active", {
  fill: am5.color(0xe59e24)
});


// Create series for background fill
// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/#Background_polygon
var backgroundSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {}));
backgroundSeries.mapPolygons.template.setAll({
  fill: am5.color(0xe6e6e6),
  fillOpacity: 0.05,
  strokeOpacity: 0
});
backgroundSeries.data.push({
  geometry: am5map.getGeoRectangle(90, 180, -90, -180)
});


// Create graticule series
// https://www.amcharts.com/docs/v5/charts/map-chart/graticule-series/
var graticuleSeries = chart.series.push(am5map.GraticuleSeries.new(root, {}));
graticuleSeries.mapLines.template.setAll({ strokeOpacity: 0.06, stroke: am5.color(0xe6e6e6) });


// Rotate animation
var spin = chart.animate({
  key: "rotationX",
  from: 0,
  to: 360,
  duration: 30000,
  loops: Infinity
});



// Zoom control
// https://www.amcharts.com/docs/v5/charts/map-chart/map-pan-zoom/#Zoom_control
var zoomControl = chart.set("zoomControl", am5map.ZoomControl.new(root, {}));

// the home button is hidden by default
zoomControl.homeButton.set("visible", true);

zoomControl.homeButton.events.on("click", function () {
  spin.stop();
});


// Make stuff animate on load
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
  max-width: 100%;
}

.single-demo .demo-background{background:#1a1a1a;}
.single-demo .demo-body.extended{background:#1a1a1a;padding:0;border-radius:0;border-top:none;}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/map.js
- https://cdn.amcharts.com/lib/5/geodata/worldLow.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
