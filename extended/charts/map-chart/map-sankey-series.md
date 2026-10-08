---
title: "Map Sankey series"
source: "https://www.amcharts.com/docs/v5/charts/map-chart/map-sankey-series/"
scraped: "2026-10-08"
---

Map Sankey series is used to plot Sankey-style flow bands on a map chart. It draws variable-width curved bands between geographic points (countries, cities, etc.), where the thickness of each band represents a numeric value. It supports multi-level flows, animated bullets, endpoint node shapes, and works with all map projections.

It extends `MapPolygonSeries` and generates actual GeoJSON polygon geometries for each flow, so they properly follow the map projection during panning, zooming, and rotation.

## Adding series

Map Sankey series requires a reference `MapPolygonSeries` to resolve country IDs to geographic centroids. Create both series and pass the polygon series via the `polygonSeries` setting:

// Create polygon series for countries
var polygonSeries = chart.series.push(
  am5map.MapPolygonSeries.new(root, {
    geoJSON: am5geodata\_worldLow
  })
);

// Create Sankey flow series
var sankeySeries = chart.series.push(
  am5map.MapSankeySeries.new(root, {
    polygonSeries: polygonSeries
  })
);

// Create polygon series for countries
let polygonSeries = chart.series.push(
  am5map.MapPolygonSeries.new(root, {
    geoJSON: am5geodata\_worldLow
  })
);

// Create Sankey flow series
let sankeySeries = chart.series.push(
  am5map.MapSankeySeries.new(root, {
    polygonSeries: polygonSeries
  })
);

**Important:** The polygon series provides the geoJSON-derived data that `MapSankeySeries` depends on for resolving `sourceId`/`targetId` to geographic centroids. Do not call `polygonSeries.data.setAll()` with your own objects — this replaces the geoJSON-derived data items and breaks centroid resolution. To customize polygon appearance (e.g. highlight specific countries), use an adapter on `polygonSeries.mapPolygons.template` or iterate over existing data items in a `datavalidated` event.

## Data

Each data item represents one flow between two geographic points. At minimum, it needs `sourceId`, `targetId`, and `value`:

sankeySeries.data.setAll(\[
  { sourceId: "BR", targetId: "DE", value: 350 },
  { sourceId: "BR", targetId: "US", value: 450 },
  { sourceId: "DE", targetId: "FR", value: 150 },
  { sourceId: "DE", targetId: "PL", value: 100 }
\]);

sankeySeries.data.setAll(\[
  { sourceId: "BR", targetId: "DE", value: 350 },
  { sourceId: "BR", targetId: "US", value: 450 },
  { sourceId: "DE", targetId: "FR", value: 150 },
  { sourceId: "DE", targetId: "PL", value: 100 }
\]);

Country IDs use ISO 3166-1 alpha-2 codes (e.g. `"US"`, `"CN"`, `"DE"`), matching the IDs in the geodata.

You can call `sankeySeries.data.setAll()` at any time. When using `sourceId`/`targetId`, `MapSankeySeries` automatically waits for the referenced `polygonSeries` to finish parsing its geoJSON before resolving country IDs to geographic centroids, so no manual event handling is required.

### Using explicit coordinates

Instead of polygon IDs, you can specify exact latitude/longitude for either endpoint:

sankeySeries.data.setAll(\[
  {
    sourceLongitude: 2.35, sourceLatitude: 48.86,  // Paris
    targetLongitude: -74.01, targetLatitude: 40.71,    // New York
    value: 100
  }
\]);

sankeySeries.data.setAll(\[
  {
    sourceLongitude: 2.35, sourceLatitude: 48.86,  // Paris
    targetLongitude: -74.01, targetLatitude: 40.71,    // New York
    value: 100
  }
\]);

You can also mix: use `sourceId` for one end and explicit coordinates for the other.

### Waypoints

To route a flow through intermediate geographic points (e.g., around land masses or through shipping lanes), use the `waypoints` array:

sankeySeries.data.setAll(\[
  {
    sourceId: "GB",
    targetId: "JP",
    value: 40,
    waypoints: \[
      { longitude: 30, latitude: 65 },
      { longitude: 90, latitude: 55 }
    \]
  }
\]);

sankeySeries.data.setAll(\[
  {
    sourceId: "GB",
    targetId: "JP",
    value: 40,
    waypoints: \[
      { longitude: 30, latitude: 65 },
      { longitude: 90, latitude: 55 }
    \]
  }
\]);

The flow will pass smoothly through each waypoint using cubic bezier curves with Catmull-Rom style tangent averaging.

## Configuring bands

### Appearance

Flow bands are `MapPolygon` elements, configured via `mapPolygons.template`:

sankeySeries.mapPolygons.template.setAll({
  fill: am5.color(0xff6b35),
  fillOpacity: 0.6,
  strokeOpacity: 0,
  tooltipText: "{sourceId} > {targetId}: {value}"
});

sankeySeries.mapPolygons.template.setAll({
  fill: am5.color(0xff6b35),
  fillOpacity: 0.6,
  strokeOpacity: 0,
  tooltipText: "{sourceId} > {targetId}: {value}"
});

### Band width

The `maxWidth` setting controls the maximum band width in geographic degrees. The thickest band (highest value) will be this wide; others are proportional.

var sankeySeries = chart.series.push(
  am5map.MapSankeySeries.new(root, {
    polygonSeries: polygonSeries,
    maxWidth: 3
  })
);

let sankeySeries = chart.series.push(
  am5map.MapSankeySeries.new(root, {
    polygonSeries: polygonSeries,
    maxWidth: 3
  })
);

### Curve shape

The `controlPointDistance` setting (0 to 0.5) controls how pronounced the S-curve is. Higher values create longer straight sections before the curve transitions. Default is `0.5`.

var sankeySeries = chart.series.push(
  am5map.MapSankeySeries.new(root, {
    polygonSeries: polygonSeries,
    controlPointDistance: 0.3    // less S-curve
  })
);

let sankeySeries = chart.series.push(
  am5map.MapSankeySeries.new(root, {
    polygonSeries: polygonSeries,
    controlPointDistance: 0.3    // less S-curve
  })
);

You can also set separate values for the source and target ends:

var sankeySeries = chart.series.push(
  am5map.MapSankeySeries.new(root, {
    polygonSeries: polygonSeries,
    controlPointDistanceSource: 0.5,  // long straight departure
    controlPointDistanceTarget: 0.2     // shorter approach
  })
);

let sankeySeries = chart.series.push(
  am5map.MapSankeySeries.new(root, {
    polygonSeries: polygonSeries,
    controlPointDistanceSource: 0.5,  // long straight departure
    controlPointDistanceTarget: 0.2     // shorter approach
  })
);

These can also be overridden per individual link in the data:

sankeySeries.data.setAll(\[
  { sourceId: "CN", targetId: "US", value: 300, controlPointDistance: 0.2 },
  { sourceId: "CN", targetId: "DE", value: 200, controlPointDistanceSource: 0.4 }
\]);

sankeySeries.data.setAll(\[
  { sourceId: "CN", targetId: "US", value: 300, controlPointDistance: 0.2 },
  { sourceId: "CN", targetId: "DE", value: 200, controlPointDistanceSource: 0.4 }
\]);

### Orientation

By default, bands use horizontal S-curves (departing and arriving east/west). The `orientation` setting can change this:

Value

Description

`"horizontal"`

Bands depart and arrive horizontally (default). Bands stack vertically.

`"vertical"`

Bands depart and arrive vertically (north/south). Bands stack horizontally.

### Sorting

When multiple bands share an endpoint, they are stacked vertically. The `autoSort` setting (default `true`) sorts them by the latitude of their target, so bands heading north appear on top and bands heading south appear on the bottom. This prevents overlapping.

var sankeySeries = chart.series.push(
  am5map.MapSankeySeries.new(root, {
    polygonSeries: polygonSeries,
    autoSort: true   // default
  })
);

let sankeySeries = chart.series.push(
  am5map.MapSankeySeries.new(root, {
    polygonSeries: polygonSeries,
    autoSort: true   // default
  })
);

### Antimeridian handling

By default, bands take the shortest path, crossing the ±180° longitude line if needed (e.g., China to US goes east across the Pacific). Set `antimeridian` to `"long"` to force bands to always go the long way around:

var sankeySeries = chart.series.push(
  am5map.MapSankeySeries.new(root, {
    polygonSeries: polygonSeries,
    antimeridian: "long"   // never cross ±180°
  })
);

let sankeySeries = chart.series.push(
  am5map.MapSankeySeries.new(root, {
    polygonSeries: polygonSeries,
    antimeridian: "long"   // never cross ±180°
  })
);

This only applies to links without explicit waypoints.

## Multi-level flows

MapSankeySeries supports multi-level Sankey flows, where the same country can be both a target and a source (an intermediate node). At intermediate nodes, incoming and outgoing bands share a unified stacking range so they align properly:

sankeySeries.data.setAll(\[
  // Level 1: Producers > Hubs
  { sourceId: "BR", targetId: "DE", value: 350 },
  { sourceId: "VN", targetId: "DE", value: 200 },

  // Level 2: Hubs > Consumers
  { sourceId: "DE", targetId: "FR", value: 150 },
  { sourceId: "DE", targetId: "PL", value: 100 }
\]);

sankeySeries.data.setAll(\[
  // Level 1: Producers > Hubs
  { sourceId: "BR", targetId: "DE", value: 350 },
  { sourceId: "VN", targetId: "DE", value: 200 },

  // Level 2: Hubs > Consumers
  { sourceId: "DE", targetId: "FR", value: 150 },
  { sourceId: "DE", targetId: "PL", value: 100 }
\]);

Loops are also supported - a flow can go from a downstream node back to an upstream node.

## Endpoint nodes

Each unique endpoint (from or to) gets a node shape drawn on top of the bands. Nodes are configured via `nodes.mapPolygons.template`:

sankeySeries.nodes.mapPolygons.template.setAll({
  fill: am5.color(0x8b5e3c),
  fillOpacity: 0.9,
  stroke: am5.color(0xffffff),
  strokeWidth: 1.5
});

sankeySeries.nodes.mapPolygons.template.setAll({
  fill: am5.color(0x8b5e3c),
  fillOpacity: 0.9,
  stroke: am5.color(0xffffff),
  strokeWidth: 1.5
});

### Node type

The `nodeType` setting controls the shape:

Value

Description

`"circle"`

A circle covering all flows at the endpoint (default)

`"bar"`

A rectangular bar like in a traditional Sankey diagram. Bar orientation is perpendicular to the flow direction.

var sankeySeries = chart.series.push(
  am5map.MapSankeySeries.new(root, {
    polygonSeries: polygonSeries,
    nodeType: "bar",
    nodeWidth: 1.5   // bar width in degrees
  })
);

let sankeySeries = chart.series.push(
  am5map.MapSankeySeries.new(root, {
    polygonSeries: polygonSeries,
    nodeType: "bar",
    nodeWidth: 1.5   // bar width in degrees
  })
);

### Node padding

The `nodePadding` setting adds extra degrees to node size, helping avoid subpixel gaps between bands and the node shape:

var sankeySeries = chart.series.push(
  am5map.MapSankeySeries.new(root, {
    polygonSeries: polygonSeries,
    nodePadding: 0.3   // default
  })
);

let sankeySeries = chart.series.push(
  am5map.MapSankeySeries.new(root, {
    polygonSeries: polygonSeries,
    nodePadding: 0.3   // default
  })
);

## Bullets

You can add animated bullets that travel along the flow paths, similar to regular Sankey charts. Bullets are positioned using `locationX` (0 = source, 1 = target):

sankeySeries.bullets.push(function() {
  return am5.Bullet.new(root, {
    locationX: 0,
    autoRotate: true,
    sprite: am5.Circle.new(root, {
      radius: 3,
      fill: am5.color(0xffffff)
    })
  });
});

sankeySeries.bullets.push(function() {
  return am5.Bullet.new(root, {
    locationX: 0,
    autoRotate: true,
    sprite: am5.Circle.new(root, {
      radius: 3,
      fill: am5.color(0xffffff)
    })
  });
});

### Animating bullets

To animate bullets along the flow paths, animate the `locationX` property on each bullet. Use a `sankeySeries.events.on("datavalidated", ...)` handler to ensure bullets exist before animating them:

sankeySeries.events.on("datavalidated", function() {
  am5.array.each(sankeySeries.dataItems, function(dataItem) {
    var bullets = dataItem.bullets;
    if (bullets) {
      am5.array.each(bullets, function(bullet) {
        bullet.animate({
          key: "locationX",
          from: 0,
          to: 1,
          duration: 3000,
          easing: am5.ease.linear,
          loops: Infinity
        });
      });
    }
  });
});

sankeySeries.events.on("datavalidated", function() {
  am5.array.each(sankeySeries.dataItems, function(dataItem) {
    let bullets = dataItem.bullets;
    if (bullets) {
      am5.array.each(bullets, function(bullet) {
        bullet.animate({
          key: "locationX",
          from: 0,
          to: 1,
          duration: 3000,
          easing: am5.ease.linear,
          loops: Infinity
        });
      });
    }
  });
});

Bullets are automatically hidden when they are on the back side of the globe (orthographic projection), using the same visibility check as `MapPointSeries`.

### Custom bullet shapes

You can use any sprite as a bullet, including SVG paths:

sankeySeries.bullets.push(function() {
  return am5.Bullet.new(root, {
    locationX: 0,
    autoRotate: true,
    sprite: am5.Graphics.new(root, {
      svgPath: "M-3,-2 C-3,-4 0,-5 2,-4 C4,-3 4,0 2,2 C0,4 -3,3 -3,-2 Z",
      fill: am5.color(0x3c1e0e),
      scale: 0.6,
      centerX: am5.p50,
      centerY: am5.p50
    })
  });
});

sankeySeries.bullets.push(function() {
  return am5.Bullet.new(root, {
    locationX: 0,
    autoRotate: true,
    sprite: am5.Graphics.new(root, {
      svgPath: "M-3,-2 C-3,-4 0,-5 2,-4 C4,-3 4,0 2,2 C0,4 -3,3 -3,-2 Z",
      fill: am5.color(0x3c1e0e),
      scale: 0.6,
      centerX: am5.p50,
      centerY: am5.p50
    })
  });
});

## Settings summary

Setting

Type

Default

Description

`polygonSeries`

MapPolygonSeries

—

Reference series for resolving country IDs to centroids

`maxWidth`

number

`5`

Maximum band width in geographic degrees

`controlPointDistance`

number

`0.5`

Bezier control point distance (0–0.5)

`controlPointDistanceSource`

number

—

Control point distance at source end

`controlPointDistanceTarget`

number

—

Control point distance at target end

`orientation`

string

`"horizontal"`

`"horizontal"` or `"vertical"`

`resolution`

number

`50`

Sample points per bezier segment

`autoSort`

boolean

`true`

Sort bands by target latitude to prevent overlap

`nodeType`

string

`"circle"`

`"circle"` or `"bar"`

`nodeWidth`

number

`1`

Bar width in degrees (only for `"bar"` nodeType)

`nodePadding`

number

`0.3`

Extra padding on node shapes in degrees

`antimeridian`

string

`"short"`

`"short"` for shortest path crossing ±180°, `"long"` to avoid it

`sourceIdField`

string

`"sourceId"`

Data field name for source polygon ID

`targetIdField`

string

`"targetId"`

Data field name for target polygon ID

`sourceLongitudeField`

string

`"sourceLongitude"`

Data field name for source longitude

`sourceLatitudeField`

string

`"sourceLatitude"`

Data field name for source latitude

`targetLongitudeField`

string

`"targetLongitude"`

Data field name for target longitude

`targetLatitudeField`

string

`"targetLatitude"`

Data field name for target latitude

`waypointsField`

string

`"waypoints"`

Data field name for waypoints array

## Data item properties

Property

Type

Description

`sourceId`

string

Source polygon ID (ISO alpha-2 code)

`targetId`

string

Target polygon ID

`sourceLongitude`

number

Source longitude (if not using sourceId)

`sourceLatitude`

number

Source latitude (if not using sourceId)

`targetLongitude`

number

Target longitude (if not using targetId)

`targetLatitude`

number

Target latitude (if not using targetId)

`value`

number

Numeric value controlling band thickness

`waypoints`

array

Array of `{ longitude, latitude }` for routing

`controlPointDistance`

number

Per-link bezier control point distance

`controlPointDistanceSource`

number

Per-link source end distance

`controlPointDistanceTarget`

number

Per-link target end distance

## Full example

The following example shows a complete multi-level coffee supply chain visualization with animated bullets, a globe/map toggle, and coffee-themed styling:


## Related class references

-   [MapSankeySeries](https://www.amcharts.com/docs/v5/reference/mapsankeyseries
    )
-   [MapSankeyNodes](https://www.amcharts.com/docs/v5/reference/mapsankeynodes)
