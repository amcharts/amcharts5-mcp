---
title: "Jupiter and Its Moons"
source: "https://www.amcharts.com/demos/jupiter-and-its-moons/"
category: "maps"
scraped: "2026-10-25"
---

Jupiter as a globe wearing Cassini's map of its clouds, spinning a Jupiter day in 30 seconds, with its four largest moons going round at their real relative speeds: Io in under two days, Callisto in over sixteen.

More than maps of the Earth: A map chart wears any whole-planet picture in the usual equirectangular layout, and since 5.21.0 places points by height too: here the moons float above Jupiter on raised orbits and pass behind it. Turning the map turns the planet; each moon moves on the map at its own speed less the planet's, so on screen it goes round as fast as it really does. The picture is Cassini's map of December 2000: Jupiter's clouds move, so it shows them as they were then.

Good for:
- Space and science pages
- Anything that orbits: moons, satellites, stations
- An eye-catching opener

Think twice when:
- Exact distances: the moons' distances are squeezed to fit
- Today's weather on Jupiter: the picture is from 2000

Prompt: Create Jupiter as a map chart in globe projection wearing the amCharts CDN's picture of Jupiter (https://cdn.amcharts.com/lib/5/geodata/images/jupiter2048.jpg), as a time-lapse: the map turns once a Jupiter day in 30 seconds. Add Io, Europa, Ganymede and Callisto as map points raised onto barely visible solid orbits (dashes would spin with the turning map) round the equator, their distances squeezed with a logarithm so Callisto fits, each sized by the square root of its radius and colored like the moon, going round at its real relative speed (its longitude on the turning map moves at its speed less the planet's). View it from 12 degrees above the equator on a dark background; a drag up or down tilts it. Tooltips: each moon's diameter, real distance and period. Credit the picture to NASA/JPL/Space Science Institute. Use the amCharts 5 library with its Responsive theme.

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

// Jupiter as a map: the planet is a globe wearing a picture of its clouds, and its four largest moons are map points
// raised above it, so the planet hides them when they pass behind. Heights are in meters of the map's globe, which is
// the Earth's size: a moon twice Jupiter's radius from its center is one globe radius up
var GLOBE = 6371008.8;   // the map globe's radius, meters
var JUPITER = 71492;     // Jupiter's radius at the equator, km

// A time-lapse: a Jupiter day (9.9 hours) in 30 seconds, and the moons as fast as they really are, at that scale
var DAY_HOURS = 9.925;
var DAY = 30000;                // milliseconds
var HOUR = DAY / DAY_HOURS;     // milliseconds for an hour

// Create the map chart: Jupiter seen from a little above its equator. The map turns once a Jupiter day, so the
// clouds go round; a drag up or down tilts it (a sideways drag would stop the spin, so it does nothing)
// https://docs.amcharts.com/v5/charts/map-chart/
var chart = root.container.children.push(am5map.MapChart.new(root, {
  projection: am5map.geoOrthographic(), // a globe
  panX: "none",     // the planet turns by itself
  panY: "rotateY",  // an up or down drag tilts it
  rotationY: -12,   // the moons' orbits open a little toward the camera
  rotationZ: -3,    // Jupiter's axis leans 3° on its orbit
  homeZoomLevel: 0.45, // zoomed out far enough for the moons around the planet...
  minZoomLevel: 0.45,  // zooming out stops there: any further and the moons are specks
  zoomLevel: 0.45,
  autoHome: true,      // ...from the start
  animations: [
    // a full turn a Jupiter day, eastward as Jupiter spins; loops: 0 repeats it for ever
    { key: "rotationX", from: 0, to: 360, duration: DAY, loops: 0 }
  ]
}));

// Add the picture of Jupiter, a map of its whole cloud top redrawn to fit the globe as it turns: Cassini's map from
// its flyby in December 2000, read from the amCharts CDN. The clouds move, so it shows them as they were then
// https://docs.amcharts.com/v5/charts/map-chart/map-raster-series/
chart.series.push(am5map.MapRasterSeries.new(root, {
  src: "https://cdn.amcharts.com/lib/5/geodata/images/jupiter2048.jpg"
}));


// ── The moons ──

// The four Galilean moons: distance from Jupiter's center (km), orbital period (hours), radius (km), color, and
// where each starts. On the map they are closer in than in life (distances squeezed with a logarithm), so Callisto,
// 26 Jupiter radii out, still fits; the tooltips have the real numbers
var MOONS = [
  { name: "Io", distance: 421700, period: 42.46, radius: 1821.6, color: 0xe6cf6e, start: 40 },
  { name: "Europa", distance: 671034, period: 85.23, radius: 1560.8, color: 0xece4d4, start: 160 },
  { name: "Ganymede", distance: 1070412, period: 171.71, radius: 2634.1, color: 0xb6a68e, start: -70 },
  { name: "Callisto", distance: 1882709, period: 400.54, radius: 2410.3, color: 0x8d7f6b, start: -150 }
];
function shown(km) { return 1 + 0.65 * Math.log(km / JUPITER); } // in Jupiter radii, on the map
function height(km) { return (shown(km) - 1) * GLOBE; }           // as a height above the map's globe

// A circle round the equator at a moon's height: longitude, latitude and height
function orbit(km) {
  var coordinates = [];
  for (var longitude = -180; longitude <= 180; longitude += 5) {
    coordinates.push([longitude, 0, height(km)]);
  }
  return { type: "LineString", coordinates: coordinates };
}

// Create line series for the orbits: faint circles at the moons' heights. They are drawn on the map, which turns
// once a Jupiter day, so they are solid: dashes would spin round with the planet, far faster than the moons
// https://docs.amcharts.com/v5/charts/map-chart/map-line-series/
var orbitSeries = chart.series.push(am5map.MapLineSeries.new(root, {}));
orbitSeries.mapLines.template.setAll({
  stroke: am5.color(0xffffff),
  strokeOpacity: 0.06, // barely there: Jupiter has no rings, so its moons' paths stay a hint
  altitude: 0,       // each point of a line carries its own height (the third number of its coordinates)
  interactive: false // the orbits take no pointer: the moons have the tooltips
});
orbitSeries.data.setAll(MOONS.map(function(moon) {
  return { geometry: orbit(moon.distance) };
}));

// Create point series for the moons, raised to their orbits (altitudeField)
// https://docs.amcharts.com/v5/charts/map-chart/map-point-series/
var moonSeries = chart.series.push(am5map.MapPointSeries.new(root, {
  latitudeField: "latitude",
  longitudeField: "longitude",
  altitudeField: "altitude"
}));
moonSeries.bullets.push(function() {
  var circle = am5.Circle.new(root, {
    // no radius or fill here: a setting made here would win over the size and color each moon's data gives
    tooltipText: "[bold]{name}[/]\n{across} km across\n{km} km from Jupiter's center\nOnce round in {days} days",
    tooltipY: 0, // the tooltip points at the top of the moon, not its middle
    templateField: "circleSettings"
  });
  // pointed at, the moon grows a little
  // https://docs.amcharts.com/v5/concepts/settings/states/
  circle.states.create("hover", { scale: 1.4 });
  return am5.Bullet.new(root, { sprite: circle });
});
moonSeries.data.setAll(MOONS.map(function(moon) {
  // The map itself turns once a Jupiter day, and a moon's longitude is on the map: to go round at its own speed on
  // screen, it moves on the map at its speed less the planet's. Every moon is slower than the spin, so its longitude
  // runs backward, a full turn in this many hours
  var lap = 1 / (1 / DAY_HOURS - 1 / moon.period);
  return {
    name: moon.name,
    across: Math.round(moon.radius * 2).toLocaleString("en-US"),
    km: moon.distance.toLocaleString("en-US"),
    days: (moon.period / 24).toFixed(1),
    longitude: moon.start,
    latitude: 0,
    altitude: height(moon.distance),
    circleSettings: {
      radius: 8 * Math.sqrt(moon.radius / 2634.1), // by the square root of the moon's size: Ganymede 8px
      fill: am5.color(moon.color),
      animations: [{ target: "dataItem", key: "longitude", from: moon.start, to: moon.start - 360, duration: Math.round(lap * HOUR), loops: 0 }]
    }
  };
}));

// Add zoom control: plus, minus and home buttons, at the bottom left
// https://docs.amcharts.com/v5/charts/map-chart/map-pan-zoom/#zoom-control
var zoomControl = chart.set("zoomControl", am5map.ZoomControl.new(root, {
  x: 0,       // at the chart's left edge...
  centerX: 0,
  dx: 10      // ...10px in
}));
zoomControl.homeButton.set("visible", true); // the home button is hidden by default

// Add image credit, at the bottom right
chart.children.push(am5.Label.new(root, {
  text: "Imagery: NASA/JPL/Space Science Institute",
  fontSize: 11,              // small print
  fill: am5.color(0xffffff), // white, over the dark background
  fillOpacity: 0.6,          // a little see-through
  x: am5.p100,               // at the chart's right edge...
  centerX: am5.p100,         // ...lined up by the label's own right side
  y: am5.p100,               // and at the bottom
  centerY: am5.p100,
  dx: -10,                   // 10px in from the edges
  dy: -10
}));
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
