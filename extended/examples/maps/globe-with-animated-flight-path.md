---
title: "Globe with animated flight path (positionOnLine + globe rotation)"
source: "amcharts5-mcp: written for the skill, checked in a browser"
category: "maps"
---

Demonstrates: orthographic projection, single-segment lines for per-segment animation control, `positionOnLine` animation, globe auto-rotation to follow the plane, bullet scale animation, and city expand/shrink effects.

## JavaScript

```javascript
var root = am5.Root.new("chartdiv");
root.setThemes([am5themes_Animated.new(root), am5themes_ResponsiveMax.new(root)]);
var orange = am5.color(0xff6b35);
var cityColor = am5.color(0xcc4a1a);

var cities = [
  { name: "London", latitude: 51.5074, longitude: -0.1278 },
  { name: "Dubai", latitude: 25.2048, longitude: 55.2708 },
  { name: "Singapore", latitude: 1.3521, longitude: 103.8198 },
  { name: "Sydney", latitude: -33.8688, longitude: 151.2093 },
  { name: "Tokyo", latitude: 35.6762, longitude: 139.6503 },
  { name: "Honolulu", latitude: 21.3069, longitude: -157.8583 },
  { name: "Los Angeles", latitude: 34.0522, longitude: -118.2437 },
  { name: "São Paulo", latitude: -23.5505, longitude: -46.6333 },
  { name: "New York", latitude: 40.7128, longitude: -74.006 },
  { name: "London", latitude: 51.5074, longitude: -0.1278 }
];

// Globe centered on first city (note: NEGATIVE lat/lon for rotation)
var chart = root.container.children.push(am5map.MapChart.new(root, {
  panX: "rotateX",
  panY: "rotateY",
  projection: am5map.geoOrthographic(),
  rotationX: -cities[0].longitude,
  rotationY: -cities[0].latitude
}));

// Ocean background
var bgSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {}));
bgSeries.mapPolygons.template.setAll({
  fill: am5.color(0x1a1a2e), fillOpacity: 1, strokeOpacity: 0
});
bgSeries.data.push({ geometry: am5map.getGeoRectangle(90, 180, -90, -180) });

// Graticule
var graticuleSeries = chart.series.push(am5map.GraticuleSeries.new(root, {}));
graticuleSeries.mapLines.template.setAll({
  stroke: am5.color(0x4a4a65), strokeOpacity: 0.5, strokeWidth: 0.8
});

// Continents
var polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
  geoJSON: am5geodata_continentsLow
}));
polygonSeries.mapPolygons.template.setAll({
  fill: am5.color(0x2a2a45), stroke: am5.color(0x3a3a55),
  strokeWidth: 0.5, strokeOpacity: 0.6
});

// Dashed route lines — one per segment for animation control
var lineSeries = chart.series.push(am5map.MapLineSeries.new(root, {}));
lineSeries.mapLines.template.setAll({
  stroke: orange, strokeOpacity: 0.35, strokeWidth: 1.5, strokeDasharray: [3, 3]
});

// City points with pulse + label
var pointSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));
pointSeries.bullets.push(function(root, series, dataItem) {
  var container = am5.Container.new(root, {});
  container.children.push(am5.Circle.new(root, {
    radius: 3.5, fill: cityColor, fillOpacity: 0.9,
    stroke: orange, strokeWidth: 4, strokeOpacity: 0
  }));
  container.children.push(am5.Label.new(root, {
    text: "{name}", fill: am5.color(0xffffff), fontSize: 11,
    fontWeight: "600", centerX: am5.p50, centerY: am5.p100,
    dy: -8, opacity: 0, populateText: true
  }));
  return am5.Bullet.new(root, { sprite: container });
});

var pointsToConnect = [];
for (var i = 0; i < cities.length; i++) {
  if (i === cities.length - 1) {
    pointsToConnect.push(pointsToConnect[0]); // loop back
  } else {
    pointsToConnect.push(pointSeries.pushDataItem({
      latitude: cities[i].latitude, longitude: cities[i].longitude,
      name: cities[i].name
    }));
  }
}

// Single-segment lines (one per city pair) for per-segment control
var segmentLines = [];
var numSegments = cities.length - 1;
for (var i = 0; i < numSegments; i++) {
  segmentLines.push(lineSeries.pushDataItem({
    pointsToConnect: [pointsToConnect[i], pointsToConnect[i + 1]]
  }));
}

// Plane series — one per segment, all hidden initially
var planeSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));
planeSeries.bullets.push(function(root, series, dataItem) {
  return am5.Bullet.new(root, {
    sprite: am5.Graphics.new(root, {
      svgPath: "m2,106h28l24,30h72l-44,-133h35l80,132h98c21,0 21,34 0,34l-98,0 -80,134h-35l43,-133h-71l-24,30h-28l15,-47",
      scale: 0.04, centerY: am5.p50, centerX: am5.p50,
      fill: orange, forceHidden: true
    })
  });
});

var planes = [];
for (var i = 0; i < numSegments; i++) {
  planes.push(planeSeries.pushDataItem({
    lineDataItem: segmentLines[i], positionOnLine: 0, autoRotate: true
  }));
}

var baseScale = 0.04, peakScale = 0.065;

// Haversine distance for proportional timing
function haversine(lat1, lon1, lat2, lon2) {
  var R = 6371, dLat = (lat2 - lat1) * Math.PI / 180,
      dLon = (lon2 - lon1) * Math.PI / 180;
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

var msPerKm = 0.4;
var segDurations = [];
for (var i = 0; i < numSegments; i++) {
  var d = haversine(cities[i].latitude, cities[i].longitude,
                    cities[i + 1].latitude, cities[i + 1].longitude);
  segDurations.push(Math.max(800, Math.round(d * msPerKm)));
}

var activeCityIdx = -1;

function expandCity(idx) {
  var di = pointsToConnect[idx];
  if (!di || !di.bullets || !di.bullets[0]) return;
  var container = di.bullets[0].get("sprite");
  var dot = container.children.getIndex(0);
  var label = container.children.getIndex(1);
  activeCityIdx = idx;
  dot.animate({ key: "radius", to: 14, duration: 400, easing: am5.ease.out(am5.ease.cubic) });
  dot.animate({ key: "fillOpacity", to: 0, duration: 400, easing: am5.ease.out(am5.ease.cubic) });
  dot.animate({ key: "strokeOpacity", to: 1, duration: 400, easing: am5.ease.out(am5.ease.cubic) });
  label.setAll({ opacity: 0, dy: 0 });
  label.animate({ key: "opacity", to: 1, duration: 300, easing: am5.ease.out(am5.ease.cubic) });
  label.animate({ key: "dy", to: -10, duration: 300, easing: am5.ease.out(am5.ease.cubic) });
}

function shrinkCity(idx) {
  var di = pointsToConnect[idx];
  if (!di || !di.bullets || !di.bullets[0]) return;
  var container = di.bullets[0].get("sprite");
  var dot = container.children.getIndex(0);
  var label = container.children.getIndex(1);
  dot.animate({ key: "radius", to: 3.5, duration: 500, easing: am5.ease.cubic });
  dot.animate({ key: "fillOpacity", to: 0.9, duration: 500, easing: am5.ease.cubic });
  dot.animate({ key: "strokeOpacity", to: 0, duration: 500, easing: am5.ease.cubic });
  label.animate({ key: "opacity", to: 0, duration: 400, easing: am5.ease.cubic });
  activeCityIdx = -1;
}

var lastRotation = null;
var activeFlightDisposer = null;

function startFlight(plane, sprite, idx) {
  if (activeCityIdx >= 0) shrinkCity(activeCityIdx);
  var nextIdx = (idx + 1) % numSegments;
  var expanded = false;

  if (activeFlightDisposer) { activeFlightDisposer.dispose(); activeFlightDisposer = null; }

  // Track position: rotate globe + scale bullet + expand destination city early
  activeFlightDisposer = plane.on("positionOnLine", function (pos) {
    chart.set("rotationX", -plane.get("longitude"));
    chart.set("rotationY", -plane.get("latitude"));
    var s = baseScale + (peakScale - baseScale) * Math.sin(pos * Math.PI);
    if (plane.bullets && plane.bullets[0]) {
      plane.bullets[0].get("sprite").set("scale", s);
    }
    if (!expanded && pos >= 0.85) { expanded = true; expandCity(nextIdx); }
  });

  var anim = plane.animate({
    key: "positionOnLine", to: 1, duration: segDurations[idx],
    easing: am5.ease.inOut(am5.ease.cubic)
  });
  anim.events.on("stopped", function () {
    lastRotation = sprite.get("rotation", 0);
    sprite.set("forceHidden", true);
    flySegment(nextIdx);
  });
}

function flySegment(idx) {
  var plane = planes[idx];
  var sprite = plane.bullets[0].get("sprite");
  plane.set("positionOnLine", 0);
  sprite.set("forceHidden", false);

  if (lastRotation === null) {
    sprite.set("opacity", 0);
    sprite.animate({ key: "opacity", to: 1, duration: 400, easing: am5.ease.out(am5.ease.cubic) });
  }

  if (lastRotation !== null) {
    var targetRotation = sprite.get("rotation", 0);
    plane.set("autoRotate", false);
    sprite.set("rotation", lastRotation);
    var diff = targetRotation - lastRotation;
    while (diff > 180) diff -= 360;
    while (diff < -180) diff += 360;
    var rotAnim = sprite.animate({
      key: "rotation", to: lastRotation + diff, duration: 500,
      easing: am5.ease.out(am5.ease.cubic)
    });
    rotAnim.events.on("stopped", function () {
      plane.set("autoRotate", true);
      startFlight(plane, sprite, idx);
    });
  } else {
    startFlight(plane, sprite, idx);
  }
}

chart.appear(1000, 100);
expandCity(0);
setTimeout(function () { flySegment(0); }, 1500);
```

## HTML

```html
<div id="chartdiv"></div>
```

## CSS

```css
#chartdiv { width: 100%; height: 600px; background: #0a0a1a; }
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/map.js
- https://cdn.amcharts.com/lib/5/geodata/continentsLow.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/ResponsiveMax.js
