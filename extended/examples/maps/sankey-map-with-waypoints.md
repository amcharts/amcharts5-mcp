---
title: "Sankey Map with Waypoints"
source: "https://www.amcharts.com/demos/sankey-map-with-waypoints/"
category: "maps"
scraped: "2026-10-08"
---

Oil exports from six terminals in the Gulf states to ports in Asia and Europe, drawn as Sankey bands on a globe: the wider the band, the more oil. The bands follow sea lanes through waypoints, with drops of oil traveling along them.

Sankey flows on a map: A map Sankey series draws each flow as a band as wide as its value, and stacks the bands that leave or reach the same place, so the busiest routes stand out. Waypoints bend a band through set points, here to keep the tankers at sea through Hormuz, Malacca and Suez. The volumes are approximate, in thousands of barrels a day.

Good for:
- Trade, shipping and migration flows
- A few sources supplying many destinations
- Routes that must follow roads, rivers or sea lanes

Think twice when:
- Dozens of crossing flows: a Sankey diagram off the map is clearer
- Exact volumes: a table or bar chart compares them
- Flows with no set route: plain curved lines are simpler

Prompt: Create a dark-styled globe of crude oil exports through the Strait of Hormuz, drawn as a map Sankey of flows from Gulf terminals to ports in Asia and Europe. Waypoints keep the routes at sea, and small oil drops travel along each band. Use the amCharts 5 library with its Responsive theme.

## JavaScript

```javascript
var root = am5.Root.new("chartdiv");

var oilTheme = am5.Theme.new(root); // a custom theme: the oil colors for buttons and text
oilTheme.rule("InterfaceColors").setAll({
  primaryButton: am5.color(0x1e2824),       // buttons, such as the zoom control...
  primaryButtonHover: am5.color(0x3a5040),  // ...under the pointer...
  primaryButtonDown: am5.color(0x0a0e12),   // ...while pressed...
  primaryButtonActive: am5.color(0xc8890a), // ...and when switched on
  primaryButtonText: am5.color(0xf5d090),   // button icons and labels
  secondaryButton: am5.color(0x1e2824),
  secondaryButtonHover: am5.color(0x3a5040),
  secondaryButtonDown: am5.color(0x141a1a),
  secondaryButtonText: am5.color(0xf5d090),
  background: am5.color(0x0a0e12),
  text: am5.color(0xf5d090)                 // default text color
});
root.setThemes([am5themes_Animated.new(root), oilTheme, am5themes_Responsive.new(root)]);

// Crude & Tar palette
var deepCrude = am5.color(0x141a1a);      // ocean — very dark teal-black
var slick = am5.color(0x1e2824);          // land dark — oil slick green-black
var pipeline = am5.color(0x3a5040);       // accents — industrial dark green
var amber = am5.color(0xc8890a);          // primary — dark amber / crude oil
var sulfur = am5.color(0xa89050);         // secondary — sulfurous yellow-brown
var flare = am5.color(0xf5d090);          // text/highlights — gas flare warm

// ---- Chart (start zoomed out at home) ----
var chart = root.container.children.push(am5map.MapChart.new(root, {
  panX: "rotateX",   // a sideways drag spins the globe
  panY: "rotateY",   // an up or down drag tilts it
  projection: am5map.geoOrthographic(), // a globe, seen from space
  homeGeoPoint: { longitude: 0, latitude: 0 }, // home view: centered on longitude 0, latitude 0...
  homeRotationX: 0,  // ...not spun...
  homeRotationY: 0,  // ...not tilted...
  homeZoomLevel: 1,  // ...and at the fitted size
  minZoomLevel: 0.8, // zoom out to 80% of the fitted size at most
  zoomLevel: 1,      // start at the fitted size
  background: am5.Rectangle.new(root, {
    fill: am5.color(0x0a0e12), // near-black space around the globe
    fillOpacity: 1,
    stroke:am5.color(0x0a0e12),
    strokeOpacity: 1
  })
}));

// ---- Ocean background ----
var bgSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {}));
bgSeries.mapPolygons.template.setAll({
  fill: deepCrude, // dark ocean
  fillOpacity: 1,  // solid; the flat map views turn it off
  strokeOpacity: 0 // no outline
});
// one polygon that covers the whole Earth: the ocean
bgSeries.data.push({ geometry: am5map.getGeoRectangle(90, 180, -90, -180) });

// ---- Graticule ----
var graticuleSeries = chart.series.push(am5map.GraticuleSeries.new(root, {}));
graticuleSeries.mapLines.template.setAll({
  stroke: pipeline,    // grid lines in dark green...
  strokeOpacity: 0.25, // ...faint...
  strokeWidth: 0.5     // ...and thin
});

// ---- Countries ----
var polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
  geoJSON: am5geodata_worldLow // country shapes from the low-detail world map
}));
polygonSeries.mapPolygons.template.setAll({
  fill: slick,       // dark land
  stroke: pipeline,  // dark green borders...
  strokeWidth: 0.5,  // ...thin...
  strokeOpacity: 0.6 // ...and a little see-through
});

// Highlight producer & importer countries
var producerIds = ["SA", "IQ", "AE", "KW", "IR", "QA"];
var importerIds = ["CN", "JP", "KR", "IN", "SG", "IT", "GR", "NL"];

// once the countries are drawn, color the producers and importers and give them a tooltip
polygonSeries.events.on("datavalidated", function () {
  am5.array.each(polygonSeries.dataItems, function (di) {
    var id = di.get("id");
    if (producerIds.includes(id)) {
      di.get("mapPolygon").setAll({ fill: am5.color(0x6b5a10), tooltipText: "{name}" });
    } else if (importerIds.includes(id)) {
      di.get("mapPolygon").setAll({ fill: am5.color(0x2a4030), tooltipText: "{name}" });
    }
  });
});

// ---- MapSankeySeries — Oil flows through Hormuz ----
// the main trick: bands as wide as their values, from terminal to port, routed through waypoints
var sankeySeries = chart.series.push(am5map.MapSankeySeries.new(root, {
  polygonSeries: polygonSeries,
  // the widest band, for the largest value, is 0.8 degrees across
  maxWidth: 0.8,
  controlPointDistance: 0.4, // a little shorter straight run at each end than the default 0.5
  resolution: 60,            // 60 points per curve segment, for smooth bends
  nodePadding: 0.1           // end nodes 0.1 degrees bigger than their bands, so no gap shows
}));

sankeySeries.mapPolygons.template.setAll({
  fill: amber,      // amber bands...
  fillOpacity: 0.4, // ...see-through, so overlapping routes show
  strokeOpacity: 0, // no outline
  tooltipText: "{source} > {target}\n{value}k bbl/day" // hover a band for its route and volume
});

// the nodes: the shapes at each terminal and port where the bands start and end
sankeySeries.nodes.mapPolygons.template.setAll({
  fill: amber,
  stroke: flare,        // a light outline...
  strokeWidth: 1.5,     // ...1.5px wide
  fillOpacity: 0.95,    // almost solid
  strokeOpacity: 1,
  tooltipText: "{name}" // hover a node for its name
});

// ---- Animated oil drop bullets ----
sankeySeries.bullets.push(function () {
  return am5.Bullet.new(root, {
    locationX: 0,     // start at the band's source end
    autoRotate: true, // turn the drop with the band's direction
    // turn the drop along the band so its pointed end trails behind
    autoRotateAngle: -90,
    sprite: am5.Graphics.new(root, {
      // Oil drop shape
      svgPath: "M0,-7 C2,-4 5,0 5,3 C5,6 3,8 0,8 C-3,8 -5,6 -5,3 C-5,0 -2,-4 0,-7 Z",
      fill: amber,                 // amber...
      stroke: am5.color(0x8b6914), // ...with a darker outline
      strokeWidth: 0.5,
      centerX: am5.p50,            // centered on its point...
      centerY: am5.p50,            // ...both ways
      scale: 0.45,                 // the shape drawn at 45% of its size
      visible: false               // hidden until its animation starts
    })
  });
});

// once the bands are drawn, send drops along each, timed by the band's length
sankeySeries.events.on("datavalidated", function () {
  // Find the longest path to scale durations proportionally
  var maxLength = 0;
  am5.array.each(sankeySeries.dataItems, function (dataItem) {
    var len = sankeySeries.getPathLength(dataItem);
    if (len > maxLength) maxLength = len;
  });

  var baseDuration = 8000; // longest path duration
  var minDuration = 2000; // even the shortest band takes at least 2 seconds

  am5.array.each(sankeySeries.dataItems, function (dataItem) {
    var pathLength = sankeySeries.getPathLength(dataItem) || maxLength;
    // longer bands take longer, so all the drops move at about the same speed
    var dur = maxLength > 0 ? Math.max(minDuration, (pathLength / maxLength) * baseDuration) : baseDuration;

    var bullets = dataItem.bullets;
    if (bullets) {
      am5.array.each(bullets, function (bullet) {
        // vary the speed by up to 20% and start at a random time, so the drops don't move in step
        var randomDur = dur * (0.8 + Math.random() * 0.4);
        var delay = Math.random() * randomDur;
        setTimeout(function () {
          var sprite = bullet.get("sprite");
          if (sprite) sprite.set("visible", true); // show the drop once it starts moving
          bullet.animate({
            key: "locationX",        // move the drop along the band...
            from: 0,                 // ...from the source...
            to: 1,                   // ...to the target...
            duration: randomDur,
            easing: am5.ease.linear, // ...at a steady speed...
            loops: Infinity          // ...over and over
          });
        }, delay);
      });
    }
  });
});

// ---- Oil Export Data — through Strait of Hormuz ----
// Coordinates: actual oil port / terminal locations
// Values in thousands of barrels per day (approximate)

// Gulf export terminals
var rasTanura = { lon: 50.17, lat: 26.64 };  // Saudi Arabia — Ras Tanura
var basra = { lon: 48.80, lat: 29.69 };  // Iraq — Basra Oil Terminal
var fujairah = { lon: 56.33, lat: 25.12 };  // UAE — Port of Fujairah
var minaAhmadi = { lon: 48.17, lat: 29.08 };  // Kuwait — Mina Al Ahmadi
var khargIsland = { lon: 50.32, lat: 29.23 };  // Iran — Kharg Island
var rasLaffan = { lon: 51.56, lat: 25.93 };  // Qatar — Ras Laffan

// Asian import terminals
var ningbo = { lon: 121.97, lat: 29.87 };  // China — Ningbo-Zhoushan
var qingdao = { lon: 120.38, lat: 36.07 };  // China — Qingdao
var yokohama = { lon: 139.64, lat: 35.44 };  // Japan — Yokohama
var chiba = { lon: 140.10, lat: 35.60 };  // Japan — Chiba
var ulsan = { lon: 129.38, lat: 35.50 };  // South Korea — Ulsan
var jamnagar = { lon: 69.66, lat: 22.42 };   // India — Jamnagar / Vadinar
var mumbai = { lon: 72.88, lat: 19.08 };   // India — Mumbai (JNPT)
var singapore = { lon: 103.84, lat: 1.26 };   // Singapore — Jurong Island

// European import terminals
var trieste = { lon: 13.78, lat: 45.65 };   // Italy — Trieste (SIOT)
var piraeus = { lon: 23.63, lat: 37.94 };   // Greece — Piraeus / Agioi Theodoroi
var rotterdam = { lon: 4.12, lat: 51.95 };    // Netherlands — Rotterdam

// builds one data item: a flow from a terminal to a port, with optional waypoints
function flow(src, srcName, tgt, tgtName, value, wp) {
  var result = {
    sourceLongitude: src.lon, sourceLatitude: src.lat,
    targetLongitude: tgt.lon, targetLatitude: tgt.lat,
    source: srcName, target: tgtName, value: value
  };
  if (wp) result.waypoints = wp; // the band passes through these points in order
  return result;
}

// Maritime waypoints — keep ships on water
var wpHormuz = { longitude: 58, latitude: 24 };   // Strait of Hormuz exit
var wpArabianSea = { longitude: 64, latitude: 18 };   // Mid Arabian Sea
var wpSouthIndia = { longitude: 78, latitude: 6 };    // South of Sri Lanka
var wpMalacca = { longitude: 101, latitude: 3 };    // Malacca Strait
var wpAden = { longitude: 47, latitude: 12 };   // Gulf of Aden
var wpSuez = { longitude: 34, latitude: 29 };   // Suez Canal

// Route templates — fan out East Asia routes so they don't merge
var viaJapan = [{ longitude: 58, latitude: 26 }, { longitude: 80, latitude: 9 }, { longitude: 104, latitude: 7 }];
var viaKorea = [wpHormuz, wpSouthIndia, wpMalacca];
var viaChina = [{ longitude: 58, latitude: 22 }, { longitude: 76, latitude: 3 }, { longitude: 99, latitude: 1 }];
var viaChinaNorth = [{ longitude: 58, latitude: 22 }, { longitude: 76, latitude: 3 }, { longitude: 99, latitude: 1 }, { longitude: 124, latitude: 32 }];
var viaIndiaNear = [wpHormuz];                               // > Jamnagar (close)
var viaIndiaFar = [wpHormuz, wpArabianSea];                 // > Mumbai
var viaSingapore = [wpHormuz, wpSouthIndia];                  // > Singapore
var viaSuez = [wpHormuz, wpAden, wpSuez];               // > Mediterranean / Europe
var wpSouthGreece = { longitude: 22, latitude: 35 };       // South of Peloponnese
var wpOtranto = { longitude: 18.5, latitude: 40 };     // Strait of Otranto (Adriatic entry)
var viaSuezItaly = [wpHormuz, wpAden, wpSuez, wpSouthGreece, wpOtranto]; // > Italy via south of Greece
var wpSicily = { longitude: 13, latitude: 37 };        // Near Sicily
var wpPortugal = { longitude: -10, latitude: 39 };       // Off Portugal coast
var viaAtlantic = [wpHormuz, wpAden, wpSuez, wpSicily, wpPortugal]; // > Atlantic Europe

// each flow: from, its name, to, its name, thousands of barrels a day, waypoints
sankeySeries.data.setAll([
  // === Ras Tanura (Saudi Arabia) ===
  flow(rasTanura, "Ras Tanura", ningbo, "Ningbo", 1100, viaChina),
  flow(rasTanura, "Ras Tanura", qingdao, "Qingdao", 600, viaChinaNorth),
  flow(rasTanura, "Ras Tanura", yokohama, "Yokohama", 700, viaJapan),
  flow(rasTanura, "Ras Tanura", chiba, "Chiba", 300, viaJapan),
  flow(rasTanura, "Ras Tanura", ulsan, "Ulsan", 800, viaKorea),
  flow(rasTanura, "Ras Tanura", jamnagar, "Jamnagar", 500, viaIndiaNear),
  flow(rasTanura, "Ras Tanura", mumbai, "Mumbai", 300, viaIndiaFar),
  flow(rasTanura, "Ras Tanura", rotterdam, "Rotterdam", 350, viaAtlantic),

  // === Basra Oil Terminal (Iraq) ===
  flow(basra, "Basra", ningbo, "Ningbo", 700, viaChina),
  flow(basra, "Basra", qingdao, "Qingdao", 400, viaChinaNorth),
  flow(basra, "Basra", jamnagar, "Jamnagar", 600, viaIndiaNear),
  flow(basra, "Basra", mumbai, "Mumbai", 400, viaIndiaFar),
  flow(basra, "Basra", ulsan, "Ulsan", 400, viaKorea),
  flow(basra, "Basra", trieste, "Trieste", 350, viaSuezItaly),
  flow(basra, "Basra", piraeus, "Piraeus", 250, viaSuez),

  // === Fujairah (UAE) — already outside Hormuz ===
  flow(fujairah, "Fujairah", yokohama, "Yokohama", 400, viaJapan.slice(1)),
  flow(fujairah, "Fujairah", chiba, "Chiba", 200, viaJapan.slice(1)),
  flow(fujairah, "Fujairah", jamnagar, "Jamnagar", 300),
  flow(fujairah, "Fujairah", mumbai, "Mumbai", 200, [wpArabianSea]),
  flow(fujairah, "Fujairah", ningbo, "Ningbo", 250, viaChina.slice(1)),
  flow(fujairah, "Fujairah", ulsan, "Ulsan", 350, viaKorea.slice(1)),
  flow(fujairah, "Fujairah", singapore, "Singapore", 250, [wpSouthIndia]),

  // === Mina Al Ahmadi (Kuwait) ===
  flow(minaAhmadi, "Mina Al Ahmadi", ulsan, "Ulsan", 400, viaKorea),
  flow(minaAhmadi, "Mina Al Ahmadi", yokohama, "Yokohama", 300, viaJapan),
  flow(minaAhmadi, "Mina Al Ahmadi", ningbo, "Ningbo", 300, viaChina),
  flow(minaAhmadi, "Mina Al Ahmadi", jamnagar, "Jamnagar", 200, viaIndiaNear),

  // === Kharg Island (Iran) ===
  flow(khargIsland, "Kharg Island", ningbo, "Ningbo", 400, viaChina),
  flow(khargIsland, "Kharg Island", qingdao, "Qingdao", 200, viaChinaNorth),
  flow(khargIsland, "Kharg Island", jamnagar, "Jamnagar", 200, viaIndiaNear),
  flow(khargIsland, "Kharg Island", piraeus, "Piraeus", 100, viaSuez),

  // === Ras Laffan (Qatar) ===
  flow(rasLaffan, "Ras Laffan", yokohama, "Yokohama", 300, viaJapan),
  flow(rasLaffan, "Ras Laffan", ulsan, "Ulsan", 200, viaKorea),
  flow(rasLaffan, "Ras Laffan", jamnagar, "Jamnagar", 150, viaIndiaNear),
  flow(rasLaffan, "Ras Laffan", singapore, "Singapore", 120, viaSingapore)
]);

// ---- Title + Subtitle (top center) ----
var titleCont = chart.children.push(am5.Container.new(root, {
  layout: root.verticalLayout, // the title above the subtitle
  x: am5.p50,           // in the middle of the chart...
  centerX: am5.p50,     // ...centered on its own middle
  y: 0,                 // at the top
  position: "absolute", // floats over the map instead of taking room in the chart's layout
  paddingTop: 16        // 16px below the top edge
}));

titleCont.children.push(am5.Label.new(root, {
  text: "Strait of Hormuz — Oil Export Flows",
  fontSize: 18,
  fontWeight: "600", // semi-bold
  fill: amber,
  x: am5.p50,
  centerX: am5.p50
}));

titleCont.children.push(am5.Label.new(root, {
  text: "Gulf Producers > Major Importers  (thousands of barrels/day)",
  fontSize: 11,
  fill: sulfur,
  x: am5.p50,
  centerX: am5.p50
}));

var easing = am5.ease.inOut(am5.ease.cubic); // a slow start and end for the moves below
var duration = 1500; // each move takes 1.5 seconds

// switches to the globe and turns it to face the Gulf, zoomed in
function zoomToGlobe() {
  chart.set("projection", am5map.geoOrthographic());
  chart.set("panX", "rotateX");
  chart.set("panY", "rotateY");
  chart.animate({ key: "rotationX", to: -74, duration, easing }); // bring longitude 74 east to the front...
  chart.animate({ key: "rotationY", to: -30, duration, easing }); // ...and latitude 30 north to the middle...
  chart.animate({ key: "zoomLevel", to: 1.6, duration, easing }); // ...and zoom in 1.6 times
  bgSeries.mapPolygons.template.set("fillOpacity", 1);            // the ocean shows on the globe
}

// switches to a flat map (Mercator or Equal Earth) and zooms in on the Gulf
function zoomToMap(name) {
  chart.set("projection", name === "mercator" ? am5map.geoMercator() : am5map.geoEqualEarth());
  chart.set("panX", "translateX"); // a drag moves the flat map...
  chart.set("panY", "translateY"); // ...in both directions
  chart.animate({ key: "rotationY", to: 0, duration, easing }); // a flat map has no tilt
  setTimeout(function () {
    // zoom in 3.5 times around the Gulf and the Arabian Sea
    chart.zoomToGeoPoint({ longitude: 67, latitude: 32 }, 3.5, true, duration);
  }, 100);
  bgSeries.mapPolygons.template.set("fillOpacity", 0); // no ocean rectangle on the flat map
}

var fadeDuration = 300;

// ---- Zoom controls with home button ----
var zoomControl = chart.set("zoomControl", am5map.ZoomControl.new(root, {}));
zoomControl.homeButton.set("visible", true); // the home button is hidden by default

chart.appear(1000, 100);

// Initial animation: rotate to globe position, then zoom in
setTimeout(function () {
  zoomToGlobe();
}, 1000);
```

## HTML

```html
<div id="chartdiv"></div>
```

## CSS

```css
#chartdiv {
  width: 100%;
  height: 600px;
  background-color: #0a0e12;
  font-size: 0.875rem;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/map.js
- https://cdn.amcharts.com/lib/5/geodata/worldLow.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
- https://cdn.amcharts.com/lib/5/themes/Dark.js
