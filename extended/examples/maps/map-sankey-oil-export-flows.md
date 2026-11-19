---
title: "Map Sankey — Oil Export Flows with Waypoints (explicit coordinates)"
source: "amcharts5-mcp: written for the skill, checked in a browser"
category: "maps"
---

Demonstrates: `MapSankeySeries` with explicit `sourceLongitude`/`sourceLatitude` coordinates, maritime waypoints for realistic shipping routes, oil drop SVG bullets with proportional animation speed, dark theme, country highlighting, and Globe/Map projection toggle. Based on the `map-sankey-waypoints` shared example.

**IMPORTANT — waypoints must use `longitude`/`latitude` keys** (not shorthand like `lon`/`lat`). Source/target location objects can use any keys because the `flow()` helper maps them to `sourceLongitude`/`sourceLatitude`, but waypoints are read directly by the series via `wp.longitude` and `wp.latitude`.

## JavaScript

```javascript
var root = am5.Root.new("chartdiv");

// Oil/dark theme
var oilTheme = am5.Theme.new(root);
oilTheme.rule("InterfaceColors").setAll({
  primaryButton: am5.color(0x1e2824),
  primaryButtonHover: am5.color(0x3a5040),
  primaryButtonDown: am5.color(0x0a0e12),
  primaryButtonActive: am5.color(0xc8890a),
  primaryButtonText: am5.color(0xf5d090),
  secondaryButton: am5.color(0x1e2824),
  secondaryButtonHover: am5.color(0x3a5040),
  secondaryButtonDown: am5.color(0x141a1a),
  secondaryButtonText: am5.color(0xf5d090),
  background: am5.color(0x0a0e12),
  text: am5.color(0xf5d090)
});
root.setThemes([am5themes_Animated.new(root), am5themes_ResponsiveMax.new(root), oilTheme]);

// Palette
var deepCrude = am5.color(0x141a1a);
var slick = am5.color(0x1e2824);
var pipeline = am5.color(0x3a5040);
var amber = am5.color(0xc8890a);
var sulfur = am5.color(0xa89050);
var flare = am5.color(0xf5d090);

var chart = root.container.children.push(am5map.MapChart.new(root, {
  panX: "rotateX",
  panY: "rotateY",
  projection: am5map.geoOrthographic(),
  homeGeoPoint: { longitude: 0, latitude: 0 },
  homeRotationX: 0,
  homeRotationY: 0,
  homeZoomLevel: 1,
  minZoomLevel: 0.8,
  zoomLevel: 1
}));

// Ocean
var bgSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {}));
bgSeries.mapPolygons.template.setAll({
  fill: deepCrude, fillOpacity: 1, strokeOpacity: 0
});
bgSeries.data.push({ geometry: am5map.getGeoRectangle(90, 180, -90, -180) });

// Graticule
var graticuleSeries = chart.series.push(am5map.GraticuleSeries.new(root, {}));
graticuleSeries.mapLines.template.setAll({
  stroke: pipeline, strokeOpacity: 0.25, strokeWidth: 0.5
});

// Countries
var polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
  geoJSON: am5geodata_worldLow
}));
polygonSeries.mapPolygons.template.setAll({
  fill: slick, stroke: pipeline, strokeWidth: 0.5, strokeOpacity: 0.6
});

// Highlight producer & importer countries
var producerIds = ["SA", "IQ", "AE", "KW", "IR", "QA"];
var importerIds = ["CN", "JP", "KR", "IN", "SG", "IT", "GR", "NL"];
polygonSeries.events.on("datavalidated", function() {
  am5.array.each(polygonSeries.dataItems, function(di) {
    var id = di.get("id");
    if (producerIds.indexOf(id) !== -1) {
      di.get("mapPolygon").setAll({ fill: am5.color(0x6b5a10), tooltipText: "{name}" });
    } else if (importerIds.indexOf(id) !== -1) {
      di.get("mapPolygon").setAll({ fill: am5.color(0x2a4030), tooltipText: "{name}" });
    }
  });
});

// MapSankeySeries
var sankeySeries = chart.series.push(am5map.MapSankeySeries.new(root, {
  polygonSeries: polygonSeries,
  maxWidth: 0.8,
  controlPointDistance: 0.4,
  resolution: 60,
  nodePadding: 0.1
}));

sankeySeries.mapPolygons.template.setAll({
  fill: amber, fillOpacity: 0.4, strokeOpacity: 0,
  tooltipText: "{source} > {target}\n{value}k bbl/day"
});

sankeySeries.nodes.mapPolygons.template.setAll({
  fill: amber, stroke: flare, strokeWidth: 1.5,
  fillOpacity: 0.95, strokeOpacity: 1, tooltipText: "{name}"
});

// Animated oil drop bullets
sankeySeries.bullets.push(function(root, series, dataItem) {
  return am5.Bullet.new(root, {
    locationX: 0,
    autoRotate: true,
    autoRotateAngle: -90,
    sprite: am5.Graphics.new(root, {
      svgPath: "M0,-7 C2,-4 5,0 5,3 C5,6 3,8 0,8 C-3,8 -5,6 -5,3 C-5,0 -2,-4 0,-7 Z",
      fill: amber, stroke: am5.color(0x8b6914), strokeWidth: 0.5,
      centerX: am5.p50, centerY: am5.p50, scale: 0.45, visible: false
    })
  });
});

sankeySeries.events.on("datavalidated", function() {
  // Scale animation duration proportionally to path length
  var maxLength = 0;
  am5.array.each(sankeySeries.dataItems, function(dataItem) {
    var len = sankeySeries.getPathLength(dataItem);
    if (len > maxLength) maxLength = len;
  });

  var baseDuration = 8000;
  var minDuration = 2000;

  am5.array.each(sankeySeries.dataItems, function(dataItem) {
    var pathLength = sankeySeries.getPathLength(dataItem) || maxLength;
    var dur = maxLength > 0
      ? Math.max(minDuration, (pathLength / maxLength) * baseDuration)
      : baseDuration;
    var bullets = dataItem.bullets;
    if (bullets) {
      am5.array.each(bullets, function(bullet) {
        var randomDur = dur * (0.8 + Math.random() * 0.4);
        var delay = Math.random() * randomDur;
        setTimeout(function() {
          var sprite = bullet.get("sprite");
          if (sprite) sprite.set("visible", true);
          bullet.animate({
            key: "locationX", from: 0, to: 1,
            duration: randomDur, easing: am5.ease.linear, loops: Infinity
          });
        }, delay);
      });
    }
  });
});

// Gulf export terminals (source/target objects can use any key names
// because the flow() helper maps them to sourceLongitude/sourceLatitude)
var rasTanura   = { lon: 50.17, lat: 26.64 };
var basra       = { lon: 48.80, lat: 29.69 };
var fujairah    = { lon: 56.33, lat: 25.12 };
var minaAhmadi  = { lon: 48.17, lat: 29.08 };
var khargIsland = { lon: 50.32, lat: 29.23 };
var rasLaffan   = { lon: 51.56, lat: 25.93 };

// Import terminals
var ningbo    = { lon: 121.97, lat: 29.87 };
var qingdao   = { lon: 120.38, lat: 36.07 };
var yokohama  = { lon: 139.64, lat: 35.44 };
var chiba     = { lon: 140.10, lat: 35.60 };
var ulsan     = { lon: 129.38, lat: 35.50 };
var jamnagar  = { lon: 69.66, lat: 22.42 };
var mumbai    = { lon: 72.88, lat: 19.08 };
var singapore = { lon: 103.84, lat: 1.26 };
var trieste   = { lon: 13.78, lat: 45.65 };
var piraeus   = { lon: 23.63, lat: 37.94 };
var rotterdam = { lon: 4.12, lat: 51.95 };

function flow(src, srcName, tgt, tgtName, value, wp) {
  var result = {
    sourceLongitude: src.lon, sourceLatitude: src.lat,
    targetLongitude: tgt.lon, targetLatitude: tgt.lat,
    source: srcName, target: tgtName, value: value
  };
  if (wp) result.waypoints = wp;
  return result;
}

// IMPORTANT: waypoints must use { longitude: ..., latitude: ... }
// (NOT shorthand like { lon, lat }) — the series reads wp.longitude / wp.latitude directly
var wpHormuz     = { longitude: 58,  latitude: 24 };
var wpArabianSea = { longitude: 64,  latitude: 18 };
var wpSouthIndia = { longitude: 78,  latitude: 6 };
var wpMalacca    = { longitude: 101, latitude: 3 };
var wpAden       = { longitude: 47,  latitude: 12 };
var wpSuez       = { longitude: 34,  latitude: 29 };

// Route templates
var viaJapan      = [{ longitude: 58, latitude: 26 }, { longitude: 80, latitude: 9 },  { longitude: 104, latitude: 7 }];
var viaKorea      = [{ longitude: 58, latitude: 24 }, { longitude: 78, latitude: 6 },  { longitude: 101, latitude: 3 }];
var viaChina      = [{ longitude: 58, latitude: 22 }, { longitude: 76, latitude: 3 },  { longitude: 99, latitude: 1 }];
var viaChinaNorth = [{ longitude: 58, latitude: 22 }, { longitude: 76, latitude: 3 },  { longitude: 99, latitude: 1 }, { longitude: 124, latitude: 32 }];
var viaIndiaNear  = [wpHormuz];
var viaIndiaFar   = [wpHormuz, wpArabianSea];
var viaSingapore  = [wpHormuz, wpSouthIndia];
var viaSuez       = [wpHormuz, wpAden, wpSuez];
var wpSouthGreece = { longitude: 22, latitude: 35 };
var wpOtranto     = { longitude: 18.5, latitude: 40 };
var viaSuezItaly  = [wpHormuz, wpAden, wpSuez, wpSouthGreece, wpOtranto];
var wpSicily      = { longitude: 13, latitude: 37 };
var wpPortugal    = { longitude: -10, latitude: 39 };
var viaAtlantic   = [wpHormuz, wpAden, wpSuez, wpSicily, wpPortugal];

sankeySeries.data.setAll([
  // Ras Tanura (Saudi Arabia)
  flow(rasTanura, "Ras Tanura", ningbo,    "Ningbo",    1100, viaChina),
  flow(rasTanura, "Ras Tanura", qingdao,   "Qingdao",    600, viaChinaNorth),
  flow(rasTanura, "Ras Tanura", yokohama,  "Yokohama",   700, viaJapan),
  flow(rasTanura, "Ras Tanura", chiba,     "Chiba",      300, viaJapan),
  flow(rasTanura, "Ras Tanura", ulsan,     "Ulsan",      800, viaKorea),
  flow(rasTanura, "Ras Tanura", jamnagar,  "Jamnagar",   500, viaIndiaNear),
  flow(rasTanura, "Ras Tanura", mumbai,    "Mumbai",     300, viaIndiaFar),
  flow(rasTanura, "Ras Tanura", rotterdam, "Rotterdam",  350, viaAtlantic),
  // Basra Oil Terminal (Iraq)
  flow(basra, "Basra", ningbo,   "Ningbo",    700, viaChina),
  flow(basra, "Basra", qingdao,  "Qingdao",   400, viaChinaNorth),
  flow(basra, "Basra", jamnagar, "Jamnagar",  600, viaIndiaNear),
  flow(basra, "Basra", mumbai,   "Mumbai",    400, viaIndiaFar),
  flow(basra, "Basra", ulsan,    "Ulsan",     400, viaKorea),
  flow(basra, "Basra", trieste,  "Trieste",   350, viaSuezItaly),
  flow(basra, "Basra", piraeus,  "Piraeus",   250, viaSuez),
  // Fujairah (UAE) — already outside Hormuz
  flow(fujairah, "Fujairah", yokohama,  "Yokohama",   400, viaJapan.slice(1)),
  flow(fujairah, "Fujairah", chiba,     "Chiba",      200, viaJapan.slice(1)),
  flow(fujairah, "Fujairah", jamnagar,  "Jamnagar",   300),
  flow(fujairah, "Fujairah", mumbai,    "Mumbai",     200, [wpArabianSea]),
  flow(fujairah, "Fujairah", ningbo,    "Ningbo",     250, viaChina.slice(1)),
  flow(fujairah, "Fujairah", ulsan,     "Ulsan",      350, viaKorea.slice(1)),
  flow(fujairah, "Fujairah", singapore, "Singapore",  250, [wpSouthIndia]),
  // Mina Al Ahmadi (Kuwait)
  flow(minaAhmadi, "Mina Al Ahmadi", ulsan,    "Ulsan",    400, viaKorea),
  flow(minaAhmadi, "Mina Al Ahmadi", yokohama, "Yokohama", 300, viaJapan),
  flow(minaAhmadi, "Mina Al Ahmadi", ningbo,   "Ningbo",   300, viaChina),
  flow(minaAhmadi, "Mina Al Ahmadi", jamnagar, "Jamnagar", 200, viaIndiaNear),
  // Kharg Island (Iran)
  flow(khargIsland, "Kharg Island", ningbo,   "Ningbo",   400, viaChina),
  flow(khargIsland, "Kharg Island", qingdao,  "Qingdao",  200, viaChinaNorth),
  flow(khargIsland, "Kharg Island", jamnagar, "Jamnagar", 200, viaIndiaNear),
  flow(khargIsland, "Kharg Island", piraeus,  "Piraeus",  100, viaSuez),
  // Ras Laffan (Qatar)
  flow(rasLaffan, "Ras Laffan", yokohama, "Yokohama",  300, viaJapan),
  flow(rasLaffan, "Ras Laffan", ulsan,    "Ulsan",     200, viaKorea),
  flow(rasLaffan, "Ras Laffan", jamnagar, "Jamnagar",  150, viaIndiaNear),
  flow(rasLaffan, "Ras Laffan", singapore,"Singapore",  120, viaSingapore)
]);

// Title
var titleCont = chart.children.push(am5.Container.new(root, {
  layout: root.verticalLayout,
  x: am5.p50, centerX: am5.p50, y: 0,
  position: "absolute", paddingTop: 16
}));
titleCont.children.push(am5.Label.new(root, {
  text: "Strait of Hormuz — Oil Export Flows",
  fontSize: 18, fontWeight: "600", fill: amber,
  x: am5.p50, centerX: am5.p50
}));
titleCont.children.push(am5.Label.new(root, {
  text: "Gulf Producers > Major Importers  (thousands of barrels/day)",
  fontSize: 11, fill: sulfur,
  x: am5.p50, centerX: am5.p50
}));

// Globe / Map toggle
var switchCont = chart.children.push(am5.Container.new(root, {
  layout: root.horizontalLayout, x: 20, y: 40
}));
switchCont.children.push(am5.Label.new(root, {
  centerY: am5.p50, text: "Globe", fill: flare, fontSize: 13
}));
var switchButton = switchCont.children.push(am5.Button.new(root, {
  themeTags: ["switch"], centerY: am5.p50,
  icon: am5.Circle.new(root, { themeTags: ["icon"] })
}));

var easing = am5.ease.inOut(am5.ease.cubic);
var duration = 1500;
var fadeDuration = 300;

function zoomToGlobe() {
  chart.set("projection", am5map.geoOrthographic());
  chart.set("panX", "rotateX");
  chart.set("panY", "rotateY");
  chart.animate({ key: "rotationX", to: -74, duration: duration, easing: easing });
  chart.animate({ key: "rotationY", to: -30, duration: duration, easing: easing });
  chart.animate({ key: "zoomLevel", to: 1.6, duration: duration, easing: easing });
  bgSeries.mapPolygons.template.set("fillOpacity", 1);
}

function zoomToMap() {
  chart.set("projection", am5map.geoMercator());
  chart.set("panX", "translateX");
  chart.set("panY", "translateY");
  chart.animate({ key: "rotationY", to: 0, duration: duration, easing: easing });
  setTimeout(function() {
    chart.zoomToGeoPoint({ longitude: 67, latitude: 32 }, 3.5, true, duration);
  }, 100);
  bgSeries.mapPolygons.template.set("fillOpacity", 0);
}

switchButton.on("active", function() {
  chart.goHome(duration);
  setTimeout(function() {
    chart.seriesContainer.animate({ key: "opacity", to: 0, duration: fadeDuration });
  }, duration - fadeDuration);
  setTimeout(function() {
    if (switchButton.get("active")) { zoomToMap(); } else { zoomToGlobe(); }
    chart.seriesContainer.animate({ key: "opacity", to: 1, duration: fadeDuration });
  }, duration);
});

switchCont.children.push(am5.Label.new(root, {
  centerY: am5.p50, text: "Map", fill: flare, fontSize: 13
}));

// Zoom controls
var zoomControl = chart.set("zoomControl", am5map.ZoomControl.new(root, {}));
zoomControl.homeButton.set("visible", true);

chart.appear(1000, 100);

// Initial animation: rotate to globe position
setTimeout(function() { zoomToGlobe(); }, 1000);
```

## HTML

```html
<div id="chartdiv"></div>
```

## CSS

```css
body { margin: 0; background: #0a0e12; } #chartdiv { width: 100%; height: 600px; }
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/map.js
- https://cdn.amcharts.com/lib/5/geodata/worldLow.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/ResponsiveMax.js
