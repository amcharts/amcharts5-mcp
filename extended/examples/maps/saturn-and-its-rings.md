---
title: "Saturn and Its Rings"
source: "https://www.amcharts.com/demos/saturn-and-its-rings/"
category: "maps"
scraped: "2026-10-25"
---

Saturn drawn with a map chart: the planet is a globe of colored bands spinning under its storms, the rings are map lines raised above it at their real distances, as strong as the rings are dense, and the six largest moons go round at their real relative speeds.

More than maps of the Earth: A map chart draws anything you can place by latitude and longitude, and since 5.21.0 by height too: lines and points can float above the globe, and the globe hides what passes behind it. Here that makes a planet with its rings and moons, with no 3D library: bands are polygons, the rings are circles of map lines at their real distances, and the moons are map points.

Good for:
- Space and science pages
- Anything round a sphere: orbits, satellites, flight paths
- An eye-catching opener

Think twice when:
- Exact distances: the moons' distances are squeezed to fit
- Plain data on a planet: a flat map is easier to read

Prompt: Create Saturn as a map chart in globe projection as a time-lapse, a Saturn day in 30 seconds: the planet as cream latitude bands with darker belts (map polygons) and a few storms as markers lying flat on its surface that go round once a day, the C, B and A rings and the Cassini Division as circles of map lines round the equator raised to their real distances from the center, each as opaque as the ring is dense, and the six largest moons as map points raised onto faint dashed orbits, each going round in its real period at the same scale, their distances beyond the rings squeezed logarithmically so Titan fits. View it from 18.5 degrees above the ring plane with the planet leaning 20 degrees, on a dark background. Tooltips: the planet's size, each ring's name and span, each moon's name and real distance. Use the amCharts 5 library with its Responsive theme.

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

// Saturn as a map: the planet is a globe of colored latitude bands, the rings are map lines raised above it and the
// moons are map points raised the same way, so the planet hides whatever passes behind it. Heights are in meters of
// the map's globe, which is the Earth's size: a ring 1.5 planet radii from the center is half a globe radius up
var GLOBE = 6371008.8;    // the map globe's radius, meters
var SATURN = 60268;       // Saturn's radius at the equator, km
function height(km) { return (km / SATURN - 1) * GLOBE; } // a distance from Saturn's center, as a height


// Create the map chart: the camera 18.5° above the ring plane, and the planet leaning, as Saturn is seen from its
// own orbit mid-season. The camera stays put: the planet spins under it and the moons go round (below)
// https://docs.amcharts.com/v5/charts/map-chart/
var chart = root.container.children.push(am5map.MapChart.new(root, {
  projection: am5map.geoOrthographic(), // a globe
  panX: "rotateX",  // a sideways drag turns the planet
  panY: "rotateY",  // an up or down drag tilts it
  rotationY: -18.5, // the rings open 18.5° toward the camera
  rotationZ: -20,   // and lean on the screen
  homeZoomLevel: 0.42, // zoomed out far enough for the moons around the planet...
  minZoomLevel: 0.42,  // zooming out stops there: any further and the moons are specks
  zoomLevel: 0.42,
  autoHome: true        // ...from the start
}));

// A time-lapse: a Saturn day (10.7 hours) in 30 seconds, and the moons as fast as they really are, at that scale
var DAY = 30000;          // milliseconds
var HOUR = DAY / 10.66;   // milliseconds for an hour


// ── The planet ──

// Create polygon series for the planet: a cream globe with darker and lighter bands across it
// https://docs.amcharts.com/v5/charts/map-chart/map-polygon-series/
var planetSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {}));
planetSeries.mapPolygons.template.setAll({
  strokeOpacity: 0,           // no outlines: the bands blend into each other
  tooltipText: "{name}",
  templateField: "polygonSettings" // each band's color comes from its data
});

// The color of a band, from the pale cream of the equator to the tan of the belts
function tone(t) {
  return am5.Color.interpolate(t, am5.color(0xf3e6c4), am5.color(0xb48a55));
}

var planet = [
  // the whole globe, cream, with the planet's numbers on hover
  { geometry: am5map.getGeoRectangle(90, 180, -90, -180), name: "Saturn\n120,536 km across at the equator", polygonSettings: { fill: tone(0.15) } }
];
// the belts and zones: from latitude, to latitude, how dark (0 the palest, 1 the darkest)
[
  [8, 22, 0.75], [-8, -24, 0.8], [26, 32, 0.4], [-28, -33, 0.45], [36, 42, 0.55], [-38, -44, 0.5],
  [46, 52, 0.45], [-48, -55, 0.4], [58, 90, 0.6], [-60, -90, 0.6]
].forEach(function(band) {
  planet.push({
    geometry: am5map.getGeoRectangle(Math.max(band[0], band[1]), 180, Math.min(band[0], band[1]), -180),
    name: "Saturn\n120,536 km across at the equator",
    polygonSettings: { fill: tone(band[2]) }
  });
});
planetSeries.data.setAll(planet);

// Create point series for storms: markers that lie flat on the planet's surface (surfaceBullets), so they turn with
// it and flatten toward its edge. Each goes round once a Saturn day: the bands look the same all the way round, so
// the storms are what shows the planet spinning
// https://docs.amcharts.com/v5/charts/map-chart/map-point-series/#surface-bullets
var stormSeries = chart.series.push(am5map.MapPointSeries.new(root, {
  latitudeField: "latitude",
  longitudeField: "longitude",
  surfaceBullets: true
}));
stormSeries.bullets.push(function() {
  return am5.Bullet.new(root, {
    sprite: am5.Circle.new(root, {
      // no radius here: a setting made here would win over the size each storm's data gives
      interactive: false, // the planet underneath has the tooltip
      templateField: "stormSettings" // each storm's size, color and motion come from its data
    })
  });
});
// longitude, latitude, size (pixels), how dark
stormSeries.data.setAll([[150, 40, 9, 0.05], [-60, -17, 6, 0.95], [40, 34, 4, 0.1], [100, 34, 4, 0.1], [-120, 15, 4, 0.2]].map(function(storm) {
  return {
    longitude: storm[0],
    latitude: storm[1],
    stormSettings: {
      radius: storm[2],
      fill: tone(storm[3]),
      // the storm's longitude goes once round the planet a day, for ever (loops: 0); eastward, as Saturn spins
      animations: [{ target: "dataItem", key: "longitude", from: storm[0], to: storm[0] + 360, duration: DAY, loops: 0 }]
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


// ── The rings ──

// Create line series for the rings: circles round the equator at the rings' real distances, raised above the
// planet. Each line is as strong as the rings are dense there, so the gaps show
// https://docs.amcharts.com/v5/charts/map-chart/map-line-series/
var ringSeries = chart.series.push(am5map.MapLineSeries.new(root, {}));
ringSeries.mapLines.template.setAll({
  stroke: am5.color(0xe9dcc0), // a pale beige
  strokeWidth: 3,
  altitude: 0, // each point of a line carries its own height (the third number of its coordinates)
  tooltipText: "[bold]{ring}[/]\n{span}",
  templateField: "lineSettings" // each line's strength comes from its data
});

// A circle round the equator at a distance from Saturn's center (km): longitude, latitude and height
function circle(km) {
  var coordinates = [];
  for (var longitude = -180; longitude <= 180; longitude += 5) {
    coordinates.push([longitude, 0, height(km)]);
  }
  return { type: "LineString", coordinates: coordinates };
}

// The main rings: inner and outer edge (km from Saturn's center) and how dense they are, 0 to 1 (approximate)
var RINGS = [
  { name: "C ring", from: 74658, to: 91975, density: 0.12 },
  { name: "B ring", from: 91975, to: 117507, density: 0.85 },
  { name: "Cassini Division", from: 117507, to: 122053, density: 0.05 },
  { name: "A ring", from: 122053, to: 136774, density: 0.5 }
];
var rings = [];
RINGS.forEach(function(ring) {
  var lines = Math.max(2, Math.round((ring.to - ring.from) / 1800)); // a line every 1,800 km or so
  for (var i = 0; i < lines; i++) {
    rings.push({
      geometry: circle(ring.from + (ring.to - ring.from) * (i + 0.5) / lines),
      ring: ring.name,
      span: Math.round(ring.from / 1000) + ",000 to " + Math.round(ring.to / 1000) + ",000 km from Saturn's center",
      lineSettings: { strokeOpacity: 0.15 + 0.75 * ring.density }
    });
  }
});
ringSeries.data.setAll(rings);


// ── The moons ──

// The six largest moons, with their real distances from Saturn's center (km), orbital periods (hours) and radii (km). On the map they are closer in: the
// distances beyond the rings are squeezed (logarithmic), so Titan, 20 Saturn radii out, still fits on screen
var MOONS = [
  { name: "Mimas", distance: 185539, period: 22.6, radius: 198, longitude: 150 },
  { name: "Enceladus", distance: 237948, period: 32.9, radius: 252, longitude: -60 },
  { name: "Tethys", distance: 294619, period: 45.3, radius: 531, longitude: -125 },
  { name: "Dione", distance: 377396, period: 65.7, radius: 561, longitude: 50 },
  { name: "Rhea", distance: 527108, period: 108.4, radius: 764, longitude: 120 },
  { name: "Titan", distance: 1221870, period: 382.7, radius: 2575, longitude: -28 }
];
function shown(km) {
  var r = km / SATURN; // in Saturn radii
  return r <= 2.45 ? r : 2.45 + 0.5 * Math.log(r / 2.45);
}

// Create line series for the moons' orbits: faint circles at the moons' heights
var orbitSeries = chart.series.push(am5map.MapLineSeries.new(root, {}));
orbitSeries.mapLines.template.setAll({
  stroke: am5.color(0xffffff),
  strokeOpacity: 0.15,
  strokeDasharray: [2, 3],
  altitude: 0,
  interactive: false // the orbits take no pointer: the moons have the tooltips
});
orbitSeries.data.setAll(MOONS.map(function(moon) {
  return { geometry: circle(shown(moon.distance) * SATURN) };
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
    // no radius here: a setting made here would win over the size each moon's data gives
    fill: am5.color(0xf4f0e8),
    tooltipText: "[bold]{name}[/]\n{across} km across\n{km} km from Saturn's center",
    tooltipY: 0, // the tooltip points at the top of the moon, not its middle
    templateField: "circleSettings" // each moon's size comes from its data
  });
  // pointed at, the moon grows a little
  // https://docs.amcharts.com/v5/concepts/settings/states/
  circle.states.create("hover", { scale: 1.5 });
  return am5.Bullet.new(root, { sprite: circle });
});
moonSeries.data.setAll(MOONS.map(function(moon, i) {
  return {
    name: moon.name,
    km: moon.distance.toLocaleString("en-US"),
    across: (moon.radius * 2).toLocaleString("en-US"),
    longitude: moon.longitude,
    latitude: 0,
    altitude: height(shown(moon.distance) * SATURN),
    circleSettings: {
      radius: Math.max(2, 8 * Math.sqrt(moon.radius / 2575)), // by the square root of the moon's size: Titan 8px, Mimas 2px
      // once round its orbit in its own period (hours, at the time-lapse's scale), for ever
      animations: [{ target: "dataItem", key: "longitude", from: moon.longitude, to: moon.longitude + 360, duration: Math.round(moon.period * HOUR), loops: 0 }]
    }
  };
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
