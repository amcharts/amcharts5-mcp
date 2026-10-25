---
title: "Rotating Moon"
source: "https://www.amcharts.com/demos/rotating-moon/"
category: "maps"
scraped: "2026-10-25"
---

The Moon as a slowly turning globe, covered with NASA's map of its surface, and the six places where Apollo astronauts landed, all on the side that faces the Earth.

Maps of other worlds: A map chart doesn't have to show the Earth. Give a raster series any whole-body picture in the usual equirectangular layout, and the globe wears it, turning and zooming like any map; points, lines and a grid go on top by latitude and longitude, as on the Earth. The amCharts CDN has such pictures of the Moon, Mars, Venus, Jupiter, Io and Ganymede.

Good for:
- Space missions, landings and probes
- Science and education pages
- An eye-catching opener for a story

Think twice when:
- Comparing places on the far side: one side shows at a time
- Exact positions: a flat map is easier to read

Prompt: Create a 3D globe of the Moon that turns slowly on its own, a full turn every two minutes, covered with the amCharts CDN's picture of the Moon's surface (https://cdn.amcharts.com/lib/5/geodata/images/moon2048.jpg) and a faint latitude and longitude grid. Mark the six Apollo landing sites with orange circles holding the mission number, laid flat on the surface, with the mission, the place and the landing date on hover. Credit the picture to NASA's Scientific Visualization Studio. Use the amCharts 5 library with its Responsive theme.

## JavaScript

```javascript
// Create root element
// https://docs.amcharts.com/v5/getting-started/#root-element
var root = am5.Root.new("chartdiv");

// Set themes
// https://docs.amcharts.com/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root),
  am5themes_Responsive.new(root)
]);

// The buttons (the zoom control) in a dark slate that suits the night sky, instead of the default blue
root.interfaceColors.setAll({
  primaryButton: am5.color(0x2a3042),
  primaryButtonHover: am5.color(0x3a4259),
  primaryButtonDown: am5.color(0x485170),
  primaryButtonActive: am5.color(0x485170),
  primaryButtonStroke: am5.color(0x4a5370),
  primaryButtonText: am5.color(0xe6e8f0),
  primaryButtonDisabled: am5.color(0x1c2030),     // the minus button, zoomed out as far as it goes
  primaryButtonTextDisabled: am5.color(0x5c6278)
});

// Create the map chart: the Moon as a globe that turns once every two minutes
// https://docs.amcharts.com/v5/charts/map-chart/
var chart = root.container.children.push(am5map.MapChart.new(root, {
  projection: am5map.geoOrthographic(), // a globe, seen from space
  panX: "rotateX",                      // a sideways drag spins the Moon
  panY: "rotateY",                      // an up or down drag tilts it
  minZoomLevel: 0.5                     // zooming out stops at half size
}));

// Turn the Moon: a full turn every 2 minutes at a steady speed, for ever, starting with the near side, where the
// landings were. The animation is kept, so pointing at a site can pause it (below)
// https://docs.amcharts.com/v5/concepts/animations/
var spin = chart.animate({ key: "rotationX", from: 0, to: 360, duration: 120000, loops: Infinity });

// Add the picture of the Moon's surface, a map of the whole Moon redrawn to fit the globe as it turns. It is read
// from the amCharts CDN
var rasterSeries = chart.series.push(am5map.MapRasterSeries.new(root, {
  src: "https://cdn.amcharts.com/lib/5/geodata/images/moon2048.jpg"
}));

// Add a faint grid of latitudes and longitudes, every 15 degrees
// https://docs.amcharts.com/v5/charts/map-chart/graticule-series/
var graticuleSeries = chart.series.push(am5map.GraticuleSeries.new(root, {
  step: 15
}));

graticuleSeries.mapLines.template.setAll({
  stroke: am5.color(0xffffff), // white over the grey surface...
  strokeOpacity: 0.08          // ...very faint
});

// Create point series for the landing sites. surfaceBullets lays the markers onto the surface, so they turn with the
// Moon and flatten towards its edge
// https://docs.amcharts.com/v5/charts/map-chart/map-point-series/
var pointSeries = chart.series.push(am5map.MapPointSeries.new(root, {
  latitudeField: "latitude",
  longitudeField: "longitude",
  surfaceBullets: true
}));

// Each site: a circle with the mission's number in it, and the mission, the place and the date on hover
pointSeries.bullets.push(function() {
  var container = am5.Container.new(root, {});

  // the circle has the tooltip: a tooltip takes its color from what it belongs to, and a container has none
  var circle = container.children.push(am5.Circle.new(root, {
    radius: 10,
    fill: am5.color(0xff6b35),   // orange, clear against the grey surface
    stroke: am5.color(0xffffff), // with a white ring
    strokeWidth: 2,
    tooltipText: "[bold]{mission}[/]\n{site}\n{date}",
    tooltipY: 0,                 // the tooltip points at the top of the circle, not its middle
    cursorOverStyle: "pointer"   // a hand over the marker: there is more to see
  }));

  // pointed at, the circle grows a little, and the Moon stops turning so it stays under the pointer
  // https://docs.amcharts.com/v5/concepts/settings/states/
  circle.states.create("hover", { scale: 1.3 });
  circle.events.on("pointerover", function() { spin.pause(); });
  circle.events.on("pointerout", function() { spin.play(); });

  container.children.push(am5.Label.new(root, {
    text: "{number}",
    populateText: true,   // fills in the number from the site's data
    centerX: am5.p50,     // centered on the circle
    centerY: am5.p50,
    fontSize: 10,
    fontWeight: "700",
    fill: am5.color(0xffffff)
  }));

  return am5.Bullet.new(root, {
    sprite: container
  });
});

// The six crewed landings, where the lunar modules touched down (NASA)
pointSeries.data.setAll([
  { mission: "Apollo 11", number: "11", site: "Sea of Tranquility", date: "July 20, 1969", latitude: 0.674, longitude: 23.473 },
  { mission: "Apollo 12", number: "12", site: "Ocean of Storms", date: "November 19, 1969", latitude: -3.012, longitude: -23.422 },
  { mission: "Apollo 14", number: "14", site: "Fra Mauro highlands", date: "February 5, 1971", latitude: -3.645, longitude: -17.471 },
  { mission: "Apollo 15", number: "15", site: "Hadley–Apennine", date: "July 30, 1971", latitude: 26.132, longitude: 3.634 },
  { mission: "Apollo 16", number: "16", site: "Descartes Highlands", date: "April 21, 1972", latitude: -8.973, longitude: 15.5 },
  { mission: "Apollo 17", number: "17", site: "Taurus–Littrow valley", date: "December 11, 1972", latitude: 20.191, longitude: 30.772 }
]);

// Add zoom control: plus, minus and home buttons, at the bottom left
// https://docs.amcharts.com/v5/charts/map-chart/map-pan-zoom/#zoom-control
var zoomControl = chart.set("zoomControl", am5map.ZoomControl.new(root, {
  x: 0,       // at the chart's left edge...
  centerX: 0,
  dx: 10      // ...10px in
}));
zoomControl.homeButton.set("visible", true); // the home button is hidden by default

// Add image credit, at the top right: the picture is NASA's "CGI Moon Kit" map, from the Lunar Reconnaissance Orbiter
var credit = chart.children.push(am5.Label.new(root, {
  text: "Imagery: NASA's Scientific Visualization Studio",
  fontSize: 12,              // small print
  fill: am5.color(0xffffff), // white, over the dark background
  fillOpacity: 0.6,          // a little see-through
  x: am5.p100,               // at the chart's right edge...
  centerX: am5.p100,         // ...lined up by the label's own right side
  dx: -10,                   // 10px in from the edge
  y: 10                      // 10px from the top
}));

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
  height: 500px;
  font-size: 0.875rem;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/map.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
