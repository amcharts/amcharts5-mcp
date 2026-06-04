---
title: "Map Sankey Series"
source: "https://www.amcharts.com/docs/v5/charts/map-chart/map-sankey-series/"
category: "maps"
added: "2026-06-04"
---

`MapSankeySeries` (added in amCharts 5.17.0) draws variable-width curved bands between geographic points on a `MapChart` — a Sankey diagram projected onto a map, where band thickness encodes a numeric `value`. It extends `MapPolygonSeries` and generates real GeoJSON geometry, so bands follow the projection during pan, zoom, and globe rotation.

Key implementation details
A `MapSankeySeries` needs a reference `polygonSeries` (a `MapPolygonSeries` with geodata) to resolve country IDs to geographic centroids. Provide flow data as `{ sourceId, targetId, value }` using ISO 3166-1 alpha-2 country codes, or as explicit `{ sourceLongitude, sourceLatitude, targetLongitude, targetLatitude, value }` coordinates. When using `sourceId`/`targetId`, the series automatically waits for `polygonSeries` to finish parsing its geoJSON before resolving centroids — no `datavalidated` wrapper around `data.setAll()` is needed.

Key settings (on `MapSankeySeries`):
- `polygonSeries` — the `MapPolygonSeries` used to look up centroids (required for `sourceId`/`targetId` data).
- `maxWidth` (default `5`) — maximum band width, in geographic degrees.
- `controlPointDistance` (default `0.5`) — bezier curvature of the bands.
- `nodeType` (default `"circle"`) — node shape: `"circle"` or `"bar"`.
- `nodePadding` — extra padding around node shapes, in degrees.

**WARNING:** never call `polygonSeries.data.setAll()` with your own objects — that replaces the geoJSON-derived data items and breaks `MapSankeySeries` centroid resolution. To set per-country properties (e.g. colors), iterate the existing data items inside the polygon series' `datavalidated` event instead.

## JavaScript

```javascript
// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([am5themes_Animated.new(root)]);

// Create the map chart
// https://www.amcharts.com/docs/v5/charts/map-chart/
var chart = root.container.children.push(am5map.MapChart.new(root, {
  panX: "rotateX",
  panY: "translateY",
  projection: am5map.geoNaturalEarth1()
}));

// Country polygons — also used by the Sankey series to resolve centroids
// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
var polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
  geoJSON: am5geodata_worldLow
}));
polygonSeries.mapPolygons.template.setAll({
  fill: am5.color(0xdddddd),
  stroke: am5.color(0xffffff),
  strokeWidth: 0.5
});

// Highlight the countries involved (set fills on existing geoJSON data items —
// do NOT call polygonSeries.data.setAll() with custom objects)
var endpoints = ["BR", "VN", "CO", "DE", "US", "FR", "JP", "CA"];
polygonSeries.events.on("datavalidated", function () {
  am5.array.each(polygonSeries.dataItems, function (di) {
    if (endpoints.indexOf(di.get("id")) !== -1) {
      di.get("mapPolygon").set("fill", am5.color(0xb0c4a0));
    }
  });
});

// Map Sankey series
// https://www.amcharts.com/docs/v5/charts/map-chart/map-sankey-series/
var sankeySeries = chart.series.push(am5map.MapSankeySeries.new(root, {
  polygonSeries: polygonSeries,
  maxWidth: 3,
  controlPointDistance: 0.4,
  nodePadding: 0.3
}));

// Band (link) appearance
sankeySeries.mapPolygons.template.setAll({
  fill: am5.color(0x6b4f3a),
  fillOpacity: 0.6,
  strokeOpacity: 0,
  tooltipText: "{sourceNode.name} → {targetNode.name}: {value}"
});

// Node appearance
sankeySeries.nodes.mapPolygons.template.setAll({
  fill: am5.color(0x3c2415),
  stroke: am5.color(0xffffff),
  strokeWidth: 1,
  tooltipText: "{name}: {sum}"
});

// Flow data — { sourceId, targetId, value } using ISO 3166-1 alpha-2 codes.
// Set directly: the series auto-resolves IDs once polygonSeries loads its geoJSON.
sankeySeries.data.setAll([
  // Producers → hubs
  { sourceId: "BR", targetId: "US", value: 450 },
  { sourceId: "BR", targetId: "DE", value: 350 },
  { sourceId: "VN", targetId: "DE", value: 200 },
  { sourceId: "CO", targetId: "US", value: 250 },
  // Hubs → consumer markets
  { sourceId: "DE", targetId: "FR", value: 150 },
  { sourceId: "US", targetId: "CA", value: 120 },
  { sourceId: "US", targetId: "JP", value: 80 }
]);

// Auto-created nodes only know their id — give them readable names
var countryNames = {
  BR: "Brazil", VN: "Vietnam", CO: "Colombia", DE: "Germany",
  US: "United States", FR: "France", JP: "Japan", CA: "Canada"
};
sankeySeries.events.on("datavalidated", function () {
  am5.array.each(sankeySeries.nodes.dataItems, function (di) {
    var id = di.get("id");
    if (id && countryNames[id]) {
      di.set("name", countryNames[id]);
    }
  });
});

// ALTERNATIVE — explicit coordinates instead of country IDs (no polygonSeries
// lookup needed for these endpoints). Optional `waypoints` route the band
// through intermediate points (keys MUST be "longitude"/"latitude"):
// sankeySeries.data.setAll([
//   {
//     sourceLongitude: -47.9, sourceLatitude: -15.8,   // Brasília
//     targetLongitude: 13.4,  targetLatitude: 52.5,    // Berlin
//     value: 350,
//     waypoints: [{ longitude: -25.0, latitude: 20.0 }]
//   }
// ]);

chart.appear(1000, 100);
```
