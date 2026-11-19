# map (part 3)

## Zoom controls

```js
chart.set("zoomControl", am5map.ZoomControl.new(root, {}));
// its home button is hidden by default: zoomControl.homeButton.set("visible", true)

// Programmatic zoom
chart.zoomToGeoPoint({ latitude: 48.86, longitude: 2.35 }, 5, true);  // zoom level 5; true centers the point

// Zoom to a polygon (prefer clickZoom, below)
polygonSeries.mapPolygons.template.events.on("click", function(ev) {
  polygonSeries.zoomToDataItem(ev.target.dataItem);
});

// Home button
chart.chartContainer.children.push(am5.Button.new(root, {
  label: am5.Label.new(root, { text: "Home" })
})).events.on("click", function() {
  chart.goHome();
});

// Fit to a lat/long box (left/right = longitude, top/bottom = latitude)
chart.zoomToGeoBounds({ left: -10, right: 40, top: 70, bottom: 35 }, 800);
```

**Pointer zoom behaviors:** a double click/tap zooms in and shift + double click zooms out **by default** (`doubleClickZoom: true`; set `false` to turn it off). `boxZoom` lets the user drag a rectangle to zoom into — its value is the key that must be held: `"shift"`, `"ctrl"`, `"alt"`, or `"drag"` for no key (then set `panX`/`panY: "none"`, since a plain drag otherwise pans); default `"none"`. The rectangle being drawn is `chart.boxZoomSelection` (a `Rectangle`, style its `fill`/`stroke`).

```js
am5map.MapChart.new(root, {
  boxZoom: "shift",          // hold shift and drag to zoom into the box
  doubleClickZoom: false     // opt out of the default double-click zoom
});
chart.boxZoomSelection.setAll({ fill: am5.color(0x1e88e5), fillOpacity: 0.15 });
```

**Zoom to a clicked polygon — `clickZoom`.** One setting does what a click handler with `zoomToDataItem` and a background click would: a click zooms to the polygon (on a map panned by rotating — `panX: "rotateX"`/`panY: "rotateY"` — the globe also turns to it); clicking it again or the map background goes back home. The polygon zoomed to is `active`, so an `"active"` state marks it. Default `false`; works from JSON.

```js
var polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
  geoJSON: am5geodata_worldLow,
  clickZoom: true
}));
polygonSeries.mapPolygons.template.setAll({ tooltipText: "{name}", interactive: true });
polygonSeries.mapPolygons.template.states.create("active", {
  fill: root.interfaceColors.get("primaryButtonActive")
});
```

`clickZoom` sets `active` itself, so `toggleKey: "active"` is not needed (with it, the two still agree).

**Start at the home position — `autoHome`.** Goes to the home position (`homeGeoPoint`, `homeZoomLevel`, `homeRotationX`/`homeRotationY`) once the map is loaded, as `goHome()` does — animated when `animationDuration` is set (the Animated theme sets it), at once otherwise. No `goHome()` call in a `datavalidated` handler needed, so a map loaded from JSON can start zoomed in. Default `false`.

```js
var chart = root.container.children.push(am5map.MapChart.new(root, {
  projection: am5map.geoMercator(),
  homeGeoPoint: { longitude: 14, latitude: 51 },   // central Europe…
  homeZoomLevel: 3.5,                              // …zoomed in 3.5 times
  autoHome: true
}));
```

With `autoHome` and no `homeZoomLevel`, home zoom is `1`, so a starting `zoomLevel` is overridden: set `homeZoomLevel` to the same value. Without `autoHome`, a `zoomLevel` given to `MapChart.new()` is the starting zoom.

**Detailed geodata: make the first fit instant.** Every frame of an animated zoom re-projects the whole map. A 1 s `zoomToGeoPoint()` on worldUltra cost 1.4 s of main-thread work against 0.2 s instant, and ran at about 3 fps with the CPU slowed 4×. Use `chart.goHome(0)` (safe before the map loads) or a duration of `0`, not `autoHome`, which animates under the Animated theme (`animationDuration` 1000).

**Home on a globe.** On a map that pans by rotating (`panX: "rotateX"`, `panY: "rotateY"`), `goHome()` and the home button restore the rotation only from `homeRotationX` / `homeRotationY` (−longitude / −latitude). `homeGeoPoint` alone leaves the rotation as it is and shifts the globe sideways.

```js
var globe = root.container.children.push(am5map.MapChart.new(root, {
  projection: am5map.geoOrthographic(),
  panX: "rotateX",
  panY: "rotateY",
  homeRotationX: -10,   // home = centered on 10°E…
  homeRotationY: -50    // …50°N
}));
```

**`zoomStep`** (default `2`) is a multiplier, not an increment: `zoomIn()` and the + button multiply `zoomLevel` by it, `zoomOut()` divides, and the mouse wheel and double clicks use it too, one step per wheel event whatever its size. So keep it above `1` (`1` does nothing, below `1` reverses); `zoomStep: 1.1`–`1.2` gives fine control, e.g. on trackpads, which fire many small wheel events. `wheelSensitivity` does not affect wheel zoom, only wheel rotation.

## Globe (orthographic projection)

```js
var chart = root.container.children.push(am5map.MapChart.new(root, {
  projection: am5map.geoOrthographic(),
  panX: "rotateX",     // drag to rotate horizontally
  panY: "rotateY",     // drag to rotate vertically
  rotationX: -70,      // initial longitude center
  rotationY: -30       // initial latitude center
}));

// Rotate to a specific point (center it on the globe)
// IMPORTANT: use NEGATIVE longitude and NEGATIVE latitude
var paris = { latitude: 48.8566, longitude: 2.3522 };
chart.animate({ key: "rotationX", to: -paris.longitude, duration: 1500, easing: am5.ease.out(am5.ease.cubic) });
chart.animate({ key: "rotationY", to: -paris.latitude, duration: 1500, easing: am5.ease.out(am5.ease.cubic) });
```

**IMPORTANT — Globe rotation direction:** To center the globe on a geographic point, set `rotationX` to **negative longitude** and `rotationY` to **negative latitude**. This is because rotation moves the globe under the camera: rotating X by -2.35 brings longitude 2.35 to the center. A common mistake is using positive coordinates, which rotates the globe in the wrong direction.

Setting `rotationX`/`rotationY`/`rotationZ` on every frame (e.g. a camera that follows a moving point) performs fine.

## GraticuleSeries (grid lines / ocean background)

```js
// Background (ocean)
var backgroundSeries = chart.series.unshift(am5map.MapPolygonSeries.new(root, {}));
backgroundSeries.mapPolygons.template.setAll({
  fill: am5.color(0xddeeff),
  stroke: am5.color(0xddeeff)
});
backgroundSeries.data.push({
  geometry: am5map.getGeoRectangle(90, 180, -90, -180) // full globe background
});

// Grid lines (graticule)
chart.series.push(am5map.GraticuleSeries.new(root, {}));
```

## Drill-down map (country > states)

```js
// World-level polygons
var worldSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
  geoJSON: am5geodata_worldLow
}));

// Country-level polygons (initially hidden)
var countrySeries = chart.series.push(am5map.MapPolygonSeries.new(root, {}));

// Click a country to drill down
worldSeries.mapPolygons.template.events.on("click", function(ev) {
  var country = ev.target.dataItem.dataContext.id; // ISO alpha-2 code, e.g., "US"
  // Load country geodata dynamically
  import("@amcharts/amcharts5-geodata/usaLow").then(function(geodata) {
    countrySeries.set("geoJSON", geodata.default);
    worldSeries.zoomToDataItem(ev.target.dataItem);
  });
});

// Back button
chart.chartContainer.children.push(am5.Button.new(root, {
  label: am5.Label.new(root, { text: "Back" })
})).events.on("click", function() {
  countrySeries.set("geoJSON", undefined);
  chart.goHome();
});
```

## Additional MapChart settings

```js
am5map.MapChart.new(root, {
  maxZoomLevel: 32,         // max zoom
  minZoomLevel: 1,          // min zoom
  maxPanOut: 0.4,           // how far user can pan beyond map (0-1)
  rotationX: 0,             // center longitude
  rotationY: 0,             // center latitude
  rotationZ: 0,             // tilt
  wheelY: "zoom",           // "zoom", "rotateX", "rotateY", "none"
  zoomStep: 2,              // zoom multiplier per step: buttons, wheel, double click (see "Zoom controls")
  wheelSensitivity: 1,      // how far the wheel rotates the map ("rotateX"/"rotateY" only), not zoom speed
  doubleClickZoom: true,    // double click zooms in, shift+double click out — default true
  boxZoom: "none",          // "none" | "drag" | "shift" | "ctrl" | "alt" — key held to drag a zoom box
  autoHome: false,          // true = go to homeGeoPoint/homeZoomLevel once loaded
})
```

`maxPanOut: 0` with `panX: "translateX"` stops all dragging at zoom level 1, on both axes. On a world map, pair it with `panX: "rotateX"`, which `maxPanOut` does not limit.

**Polygon IDs** use ISO 3166-1 alpha-2 codes (e.g., `"US"`, `"CN"`, `"DE"`, `"FR"`).

**Accessibility:** focusable map polygons can be focused, objects left out with `include`/`exclude` get no focus element, objects panned or zoomed out of view are not TAB stops until at least partly back in view, and the zoom level is announced to screen readers once zooming settles.

## Events on map elements

```js
// Polygon click
polygonSeries.mapPolygons.template.events.on("click", function(ev) {
  var id = ev.target.dataItem.dataContext.id;    // "US", "CN", etc.
  var name = ev.target.dataItem.dataContext.name; // "United States"
  console.log("Clicked:", name, id);
});

// Point/marker click
pointSeries.bullets.push(function(root, series, dataItem) {
  var circle = am5.Circle.new(root, { radius: 5, fill: am5.color(0xff0000) });
  circle.events.on("click", function() {
    console.log("Marker:", dataItem.dataContext);
  });
  return am5.Bullet.new(root, { sprite: circle });
});

// Map zoom — use settings watch, NOT events (there is no "zoomlevelchanged" event)
chart.on("zoomLevel", function(zoomLevel) {
  console.log("Zoom:", zoomLevel);
});

// Links without a click handler: urlField on MapPolygonSeries, MapLineSeries or MapPointSeries (bullets)
var linkedSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
  geoJSON: am5geodata_worldLow, urlField: "url", linkTarget: "_blank"   // linkTarget default "_self"
}));
linkedSeries.data.setAll([{ id: "US", url: "https://en.wikipedia.org/wiki/United_States" }]);
```

`urlField` has no default (links are off until set); the pointer cursor is set automatically unless you set `cursorOverStyle`; `javascript:`/`data:`/`vbscript:` URLs are never opened; override `series.openUrl(dataItem)` to intercept. `MapSankeySeries` nodes are not linked — keep a `click` handler there.

**Which pixels:** `chart.convert(geoPoint)` and `chart.invert(point)` work in the map's area, inside the chart's padding (`chart.seriesContainer`'s space). A pointer event's `ev.point` is relative to the root. So the place clicked is `chart.invert(chart.seriesContainer.toLocal(ev.point))`, and a geo point's page position is `chart.seriesContainer.toGlobal(chart.convert(geoPoint))` plus the chart div's `getBoundingClientRect()`. `chart.invert(ev.point)` on its own is right only for a chart at the root's top-left with no padding. Docs: https://docs.amcharts.com/v5/charts/map-chart/map-api/#converting-between-screen-and-geographical-coordinates.

## Disposal

In a React, Vue, Angular, Svelte or React Native app, use amCharts' framework package, which disposes the root with the component (SKILL.md, "Frameworks"). Otherwise dispose the root when the component goes away:

```js
root.dispose();
```


---

# amCharts 5 Map Charts — Working Examples

## Example 1: World choropleth map

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>World Choropleth Map</title>
  <script src="https://cdn.amcharts.com/lib/5/index.js"></script>
  <script src="https://cdn.amcharts.com/lib/5/map.js"></script>
  <script src="https://cdn.amcharts.com/lib/5/geodata/worldLow.js"></script>
  <script src="https://cdn.amcharts.com/lib/5/themes/Animated.js"></script>
  <script src="https://cdn.amcharts.com/lib/5/themes/ResponsiveMax.js"></script>
  <style>#chartdiv { width: 100%; height: 500px; }</style>
</head>
<body>
  <div id="chartdiv"></div>
  <script>
    var root = am5.Root.new("chartdiv");
    root.setThemes([am5themes_Animated.new(root), am5themes_ResponsiveMax.new(root)]);

    var chart = root.container.children.push(am5map.MapChart.new(root, {
      panX: "rotateX",
      panY: "translateY",
      projection: am5map.geoNaturalEarth1()
    }));

    var polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
      geoJSON: am5geodata_worldLow,
      valueField: "value",
      calculateAggregates: true
    }));

    polygonSeries.mapPolygons.template.setAll({
      tooltipText: "{name}: {value}",
      interactive: true
    });

    polygonSeries.mapPolygons.template.states.create("hover", {
      fill: am5.color(0x677935)
    });

    // Heat rules for choropleth coloring
    polygonSeries.set("heatRules", [{
      target: polygonSeries.mapPolygons.template,
      dataField: "value",
      min: am5.color(0xcee8c0),
      max: am5.color(0x1d6e04),
      key: "fill"
    }]);

    // Sample data — population in millions
    polygonSeries.data.setAll([
      { id: "US", value: 331 }, { id: "CN", value: 1411 },
      { id: "IN", value: 1380 }, { id: "BR", value: 213 },
      { id: "RU", value: 146 }, { id: "JP", value: 126 },
      { id: "DE", value: 83 }, { id: "GB", value: 67 },
      { id: "FR", value: 67 }, { id: "AU", value: 26 }
    ]);

    // Heat legend
    var heatLegend = chart.children.push(am5.HeatLegend.new(root, {
      orientation: "horizontal",
      startColor: am5.color(0xcee8c0),
      endColor: am5.color(0x1d6e04),
      startText: "Low",
      endText: "High",
      stepCount: 5
    }));

    chart.set("zoomControl", am5map.ZoomControl.new(root, {}));
    chart.appear(1000, 100);
  </script>
</body>
</html>
```

## Example 2: Map with point markers (bubble map)

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Bubble Map</title>
  <script src="https://cdn.amcharts.com/lib/5/index.js"></script>
  <script src="https://cdn.amcharts.com/lib/5/map.js"></script>
  <script src="https://cdn.amcharts.com/lib/5/geodata/worldLow.js"></script>
  <script src="https://cdn.amcharts.com/lib/5/themes/Animated.js"></script>
  <script src="https://cdn.amcharts.com/lib/5/themes/ResponsiveMax.js"></script>
  <style>#chartdiv { width: 100%; height: 500px; }</style>
</head>
<body>
  <div id="chartdiv"></div>
  <script>
    var root = am5.Root.new("chartdiv");
    root.setThemes([am5themes_Animated.new(root), am5themes_ResponsiveMax.new(root)]);

    var chart = root.container.children.push(am5map.MapChart.new(root, {
      panX: "translateX",
      panY: "translateY",
      projection: am5map.geoMercator()
    }));

    // Background polygons — excluding Antarctica here because Mercator makes it disproportionately large
    var polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
      geoJSON: am5geodata_worldLow,
      exclude: ["AQ"]
    }));
    polygonSeries.mapPolygons.template.setAll({
      fill: am5.color(0xdddddd),
      strokeWidth: 0.5,
      stroke: am5.color(0xffffff)
    });

    // Point series with scaled bubbles
    var pointSeries = chart.series.push(am5map.MapPointSeries.new(root, {
      latitudeField: "latitude",
      longitudeField: "longitude"
    }));

    var cities = [
      { name: "New York", latitude: 40.71, longitude: -74.01, population: 8.3 },
      { name: "London", latitude: 51.51, longitude: -0.13, population: 9.0 },
      { name: "Tokyo", latitude: 35.68, longitude: 139.69, population: 13.5 },
      { name: "Paris", latitude: 48.86, longitude: 2.35, population: 2.2 },
      { name: "Sydney", latitude: -33.87, longitude: 151.21, population: 5.3 }
    ];

    // Scale bubble size by population
    pointSeries.bullets.push(function(root, series, dataItem) {
      var value = dataItem.dataContext.population;
      return am5.Bullet.new(root, {
        sprite: am5.Circle.new(root, {
          radius: Math.sqrt(value) * 4,
          fill: am5.color(0xff5733),
          fillOpacity: 0.5,
          strokeWidth: 1,
          stroke: am5.color(0xffffff),
          tooltipText: "{name}\nPopulation: {population}M"
        })
      });
    });

    pointSeries.data.setAll(cities);

    chart.set("zoomControl", am5map.ZoomControl.new(root, {}));
    chart.appear(1000, 100);
  </script>
</body>
</html>
```

## Example 3: US map with connection lines

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>US Flight Routes</title>
  <script src="https://cdn.amcharts.com/lib/5/index.js"></script>
  <script src="https://cdn.amcharts.com/lib/5/map.js"></script>
  <script src="https://cdn.amcharts.com/lib/5/geodata/usaLow.js"></script>
  <script src="https://cdn.amcharts.com/lib/5/themes/Animated.js"></script>
  <script src="https://cdn.amcharts.com/lib/5/themes/ResponsiveMax.js"></script>
  <style>#chartdiv { width: 100%; height: 500px; }</style>
</head>
<body>
  <div id="chartdiv"></div>
  <script>
    var root = am5.Root.new("chartdiv");
    root.setThemes([am5themes_Animated.new(root), am5themes_ResponsiveMax.new(root)]);

    var chart = root.container.children.push(am5map.MapChart.new(root, {
      panX: "translateX",
      panY: "translateY",
      projection: am5map.geoAlbersUsa()
    }));

    // State polygons
    var polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
      geoJSON: am5geodata_usaLow
    }));
    polygonSeries.mapPolygons.template.setAll({
      fill: am5.color(0xdadada),
      stroke: am5.color(0xffffff),
      strokeWidth: 1,
      tooltipText: "{name}"
    });

    // Point series for airports
    var pointSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));
    pointSeries.bullets.push(function(root, series, dataItem) {
      return am5.Bullet.new(root, {
        sprite: am5.Circle.new(root, {
          radius: 4,
          fill: am5.color(0x3355ff),
          stroke: am5.color(0xffffff),
          strokeWidth: 1,
          tooltipText: "{name}"
        })
      });
    });

    var jfk = pointSeries.pushDataItem({ latitude: 40.64, longitude: -73.78, name: "JFK" });
    var lax = pointSeries.pushDataItem({ latitude: 33.94, longitude: -118.41, name: "LAX" });
    var ord = pointSeries.pushDataItem({ latitude: 41.97, longitude: -87.91, name: "ORD" });
    var atl = pointSeries.pushDataItem({ latitude: 33.64, longitude: -84.43, name: "ATL" });

    // Line series for routes
    var lineSeries = chart.series.push(am5map.MapLineSeries.new(root, {}));
    lineSeries.mapLines.template.setAll({
      stroke: am5.color(0x3355ff),
      strokeOpacity: 0.6,
      strokeWidth: 2
    });

    lineSeries.pushDataItem({ pointsToConnect: [jfk, lax] });
    lineSeries.pushDataItem({ pointsToConnect: [jfk, ord] });
    lineSeries.pushDataItem({ pointsToConnect: [ord, atl] });
    lineSeries.pushDataItem({ pointsToConnect: [atl, lax] });

    chart.appear(1000, 100);
  </script>
</body>
</html>
```

## More examples

Longer complete examples are in the amCharts MCP server's examples (https://mcp.amcharts.com/mcp; the same files are in the amcharts/amcharts5-mcp repository, under `extended/examples/`):
- Globe with animated flight path (positionOnLine + globe rotation): `get_example(path: "examples/maps/globe-with-animated-flight-path")`
- Map Sankey — Global Coffee Supply Chain (sourceId/targetId): `get_example(path: "examples/maps/map-sankey-coffee-supply-chain")`
- Map Sankey — Oil Export Flows with Waypoints (explicit coordinates): `get_example(path: "examples/maps/map-sankey-oil-export-flows")`
