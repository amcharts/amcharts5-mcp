---
title: "Map Sankey series"
source: "https://docs.amcharts.com/v5/charts/map-chart/map-sankey-series/"
scraped: "2026-11-16"
---

Map Sankey series is used to plot Sankey-style flow bands on a map chart. It draws variable-width curved bands between geographic points (countries, cities, etc.), where the thickness of each band represents a numeric value. It supports multi-level flows, animated bullets, endpoint node shapes, and works with all map projections.

It extends `MapPolygonSeries` and generates actual GeoJSON polygon geometries for each flow, so they properly follow the map projection during panning, zooming, and rotation.

## Adding series

Map Sankey series requires a reference `MapPolygonSeries` to resolve country IDs to geographic centroids. Create both series and pass the polygon series via the `polygonSeries` setting:

JavaScript:

```js
// Create polygon series for countries
var polygonSeries = chart.series.push(
  am5map.MapPolygonSeries.new(root, {
    geoJSON: am5geodata_worldLow
  })
);

// Create Sankey flow series
var sankeySeries = chart.series.push(
  am5map.MapSankeySeries.new(root, {
    polygonSeries: polygonSeries
  })
);
```

TypeScript:

```ts
// Create polygon series for countries
let polygonSeries = chart.series.push(
  am5map.MapPolygonSeries.new(root, {
    geoJSON: am5geodata_worldLow
  })
);

// Create Sankey flow series
let sankeySeries = chart.series.push(
  am5map.MapSankeySeries.new(root, {
    polygonSeries: polygonSeries
  })
);
```

**Important:** The polygon series provides the geoJSON-derived data that `MapSankeySeries` depends on for resolving `sourceId`/`targetId` to geographic centroids. Do not call `polygonSeries.data.setAll()` with your own objects — this replaces the geoJSON-derived data items and breaks centroid resolution. To customize polygon appearance (e.g. highlight specific countries), use an adapter on `polygonSeries.mapPolygons.template` or iterate over existing data items in a `datavalidated` event.

## Data

Each data item represents one flow between two geographic points. At minimum, it needs `sourceId`, `targetId`, and `value`:

JavaScript:

```js
sankeySeries.data.setAll([
  { sourceId: "BR", targetId: "DE", value: 350 },
  { sourceId: "BR", targetId: "US", value: 450 },
  { sourceId: "DE", targetId: "FR", value: 150 },
  { sourceId: "DE", targetId: "PL", value: 100 }
]);
```

TypeScript:

```ts
sankeySeries.data.setAll([
  { sourceId: "BR", targetId: "DE", value: 350 },
  { sourceId: "BR", targetId: "US", value: 450 },
  { sourceId: "DE", targetId: "FR", value: 150 },
  { sourceId: "DE", targetId: "PL", value: 100 }
]);
```

Country IDs use ISO 3166-1 alpha-2 codes (e.g. `"US"`, `"CN"`, `"DE"`), matching the IDs in the geodata.

You can call `sankeySeries.data.setAll()` at any time. When using `sourceId`/`targetId`, `MapSankeySeries` automatically waits for the referenced `polygonSeries` to finish parsing its geoJSON before resolving country IDs to geographic centroids, so no manual event handling is required.

### Using explicit coordinates

Instead of polygon IDs, you can specify exact latitude/longitude for either endpoint:

JavaScript:

```js
sankeySeries.data.setAll([
  {
    sourceLongitude: 2.35, sourceLatitude: 48.86,  // Paris
    targetLongitude: -74.01, targetLatitude: 40.71,    // New York
    value: 100
  }
]);
```

TypeScript:

```ts
sankeySeries.data.setAll([
  {
    sourceLongitude: 2.35, sourceLatitude: 48.86,  // Paris
    targetLongitude: -74.01, targetLatitude: 40.71,    // New York
    value: 100
  }
]);
```

You can also mix: use `sourceId` for one end and explicit coordinates for the other.

### Waypoints

To route a flow through intermediate geographic points (e.g., around land masses or through shipping lanes), use the `waypoints` array:

JavaScript:

```js
sankeySeries.data.setAll([
  {
    sourceId: "GB",
    targetId: "JP",
    value: 40,
    waypoints: [
      { longitude: 30, latitude: 65 },
      { longitude: 90, latitude: 55 }
    ]
  }
]);
```

TypeScript:

```ts
sankeySeries.data.setAll([
  {
    sourceId: "GB",
    targetId: "JP",
    value: 40,
    waypoints: [
      { longitude: 30, latitude: 65 },
      { longitude: 90, latitude: 55 }
    ]
  }
]);
```

The flow will pass smoothly through each waypoint using cubic bezier curves with Catmull-Rom style tangent averaging.

## Configuring bands

### Appearance

Flow bands are `MapPolygon` elements, configured via `mapPolygons.template`:

JavaScript:

```js
sankeySeries.mapPolygons.template.setAll({
  fill: am5.color(0xff6b35),
  fillOpacity: 0.6,
  strokeOpacity: 0,
  tooltipText: "{sourceId} > {targetId}: {value}"
});
```

TypeScript:

```ts
sankeySeries.mapPolygons.template.setAll({
  fill: am5.color(0xff6b35),
  fillOpacity: 0.6,
  strokeOpacity: 0,
  tooltipText: "{sourceId} > {targetId}: {value}"
});
```

### Band width

The `maxWidth` setting controls the maximum band width in geographic degrees. The thickest band (highest value) will be this wide; others are proportional.

JavaScript:

```js
var sankeySeries = chart.series.push(
  am5map.MapSankeySeries.new(root, {
    polygonSeries: polygonSeries,
    maxWidth: 3
  })
);
```

TypeScript:

```ts
let sankeySeries = chart.series.push(
  am5map.MapSankeySeries.new(root, {
    polygonSeries: polygonSeries,
    maxWidth: 3
  })
);
```

### Curve shape

The `controlPointDistance` setting (0 to 0.5) controls how pronounced the S-curve is. Higher values create longer straight sections before the curve transitions. Default is `0.5`.

JavaScript:

```js
var sankeySeries = chart.series.push(
  am5map.MapSankeySeries.new(root, {
    polygonSeries: polygonSeries,
    controlPointDistance: 0.3    // less S-curve
  })
);
```

TypeScript:

```ts
let sankeySeries = chart.series.push(
  am5map.MapSankeySeries.new(root, {
    polygonSeries: polygonSeries,
    controlPointDistance: 0.3    // less S-curve
  })
);
```

You can also set separate values for the source and target ends:

JavaScript:

```js
var sankeySeries = chart.series.push(
  am5map.MapSankeySeries.new(root, {
    polygonSeries: polygonSeries,
    controlPointDistanceSource: 0.5,  // long straight departure
    controlPointDistanceTarget: 0.2     // shorter approach
  })
);
```

TypeScript:

```ts
let sankeySeries = chart.series.push(
  am5map.MapSankeySeries.new(root, {
    polygonSeries: polygonSeries,
    controlPointDistanceSource: 0.5,  // long straight departure
    controlPointDistanceTarget: 0.2     // shorter approach
  })
);
```

These can also be overridden per individual link in the data:

JavaScript:

```js
sankeySeries.data.setAll([
  { sourceId: "CN", targetId: "US", value: 300, controlPointDistance: 0.2 },
  { sourceId: "CN", targetId: "DE", value: 200, controlPointDistanceSource: 0.4 }
]);
```

TypeScript:

```ts
sankeySeries.data.setAll([
  { sourceId: "CN", targetId: "US", value: 300, controlPointDistance: 0.2 },
  { sourceId: "CN", targetId: "DE", value: 200, controlPointDistanceSource: 0.4 }
]);
```

### Orientation

By default, bands use horizontal S-curves (departing and arriving east/west). The `orientation` setting can change this:

| Value          | Description                                                                 |
| -------------- | --------------------------------------------------------------------------- |
| `"horizontal"` | Bands depart and arrive horizontally (default). Bands stack vertically.     |
| `"vertical"`   | Bands depart and arrive vertically (north/south). Bands stack horizontally. |

### Sorting

When multiple bands share an endpoint, they are stacked vertically. The `autoSort` setting (default `true`) sorts them by the latitude of their target, so bands heading north appear on top and bands heading south appear on the bottom. This prevents overlapping.

JavaScript:

```js
var sankeySeries = chart.series.push(
  am5map.MapSankeySeries.new(root, {
    polygonSeries: polygonSeries,
    autoSort: true   // default
  })
);
```

TypeScript:

```ts
let sankeySeries = chart.series.push(
  am5map.MapSankeySeries.new(root, {
    polygonSeries: polygonSeries,
    autoSort: true   // default
  })
);
```

### Antimeridian handling

By default, bands take the shortest path, crossing the ±180° longitude line if needed (e.g., China to US goes east across the Pacific). Set `antimeridian` to `"long"` to force bands to always go the long way around:

JavaScript:

```js
var sankeySeries = chart.series.push(
  am5map.MapSankeySeries.new(root, {
    polygonSeries: polygonSeries,
    antimeridian: "long"   // never cross ±180°
  })
);
```

TypeScript:

```ts
let sankeySeries = chart.series.push(
  am5map.MapSankeySeries.new(root, {
    polygonSeries: polygonSeries,
    antimeridian: "long"   // never cross ±180°
  })
);
```

This only applies to links without explicit waypoints.

## Multi-level flows

MapSankeySeries supports multi-level Sankey flows, where the same country can be both a target and a source (an intermediate node). At intermediate nodes, incoming and outgoing bands share a unified stacking range so they align properly:

JavaScript:

```js
sankeySeries.data.setAll([
  // Level 1: Producers > Hubs
  { sourceId: "BR", targetId: "DE", value: 350 },
  { sourceId: "VN", targetId: "DE", value: 200 },

  // Level 2: Hubs > Consumers
  { sourceId: "DE", targetId: "FR", value: 150 },
  { sourceId: "DE", targetId: "PL", value: 100 }
]);
```

TypeScript:

```ts
sankeySeries.data.setAll([
  // Level 1: Producers > Hubs
  { sourceId: "BR", targetId: "DE", value: 350 },
  { sourceId: "VN", targetId: "DE", value: 200 },

  // Level 2: Hubs > Consumers
  { sourceId: "DE", targetId: "FR", value: 150 },
  { sourceId: "DE", targetId: "PL", value: 100 }
]);
```

Loops are also supported - a flow can go from a downstream node back to an upstream node.

## Endpoint nodes

Each unique endpoint (from or to) gets a node shape drawn on top of the bands. Nodes are configured via `nodes.mapPolygons.template`:

JavaScript:

```js
sankeySeries.nodes.mapPolygons.template.setAll({
  fill: am5.color(0x8b5e3c),
  fillOpacity: 0.9,
  stroke: am5.color(0xffffff),
  strokeWidth: 1.5
});
```

TypeScript:

```ts
sankeySeries.nodes.mapPolygons.template.setAll({
  fill: am5.color(0x8b5e3c),
  fillOpacity: 0.9,
  stroke: am5.color(0xffffff),
  strokeWidth: 1.5
});
```

### Node type

The `nodeType` setting controls the shape:

| Value      | Description                                                                                                     |
| ---------- | --------------------------------------------------------------------------------------------------------------- |
| `"circle"` | A circle covering all flows at the endpoint (default)                                                           |
| `"bar"`    | A rectangular bar like in a traditional Sankey diagram. Bar orientation is perpendicular to the flow direction. |

JavaScript:

```js
var sankeySeries = chart.series.push(
  am5map.MapSankeySeries.new(root, {
    polygonSeries: polygonSeries,
    nodeType: "bar",
    nodeWidth: 1.5   // bar width in degrees
  })
);
```

TypeScript:

```ts
let sankeySeries = chart.series.push(
  am5map.MapSankeySeries.new(root, {
    polygonSeries: polygonSeries,
    nodeType: "bar",
    nodeWidth: 1.5   // bar width in degrees
  })
);
```

### Node padding

The `nodePadding` setting adds extra degrees to node size, helping avoid subpixel gaps between bands and the node shape:

JavaScript:

```js
var sankeySeries = chart.series.push(
  am5map.MapSankeySeries.new(root, {
    polygonSeries: polygonSeries,
    nodePadding: 0.3   // default
  })
);
```

TypeScript:

```ts
let sankeySeries = chart.series.push(
  am5map.MapSankeySeries.new(root, {
    polygonSeries: polygonSeries,
    nodePadding: 0.3   // default
  })
);
```

## Bullets

You can add animated bullets that travel along the flow paths, similar to regular Sankey charts. Bullets are positioned using `locationX` (0 = source, 1 = target):

JavaScript:

```js
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
```

TypeScript:

```ts
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
```

### Animating bullets

To animate bullets along the flow paths, animate the `locationX` property on each bullet. Use a `sankeySeries.events.on("datavalidated", ...)` handler to ensure bullets exist before animating them:

JavaScript:

```js
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
```

TypeScript:

```ts
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
```

Bullets are automatically hidden when they are on the back side of the globe (orthographic projection), using the same visibility check as `MapPointSeries`.

### Custom bullet shapes

You can use any sprite as a bullet, including SVG paths:

JavaScript:

```js
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
```

TypeScript:

```ts
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
```

## Settings summary

| Setting                      | Type             | Default             | Description                                                      |
| ---------------------------- | ---------------- | ------------------- | ---------------------------------------------------------------- |
| `polygonSeries`              | MapPolygonSeries | —                   | Reference series for resolving country IDs to centroids          |
| `maxWidth`                   | number           | `5`                 | Maximum band width in geographic degrees                         |
| `controlPointDistance`       | number           | `0.5`               | Bezier control point distance (0–0.5)                            |
| `controlPointDistanceSource` | number           | —                   | Control point distance at source end                             |
| `controlPointDistanceTarget` | number           | —                   | Control point distance at target end                             |
| `orientation`                | string           | `"horizontal"`      | `"horizontal"` or `"vertical"`                                   |
| `resolution`                 | number           | `50`                | Sample points per bezier segment                                 |
| `autoSort`                   | boolean          | `true`              | Sort bands by target latitude to prevent overlap                 |
| `nodeType`                   | string           | `"circle"`          | `"circle"` or `"bar"`                                            |
| `nodeWidth`                  | number           | `1`                 | Bar width in degrees (only for `"bar"` nodeType)                 |
| `nodePadding`                | number           | `0.3`               | Extra padding on node shapes in degrees                          |
| `antimeridian`               | string           | `"short"`           | `"short"` for shortest path crossing ±180°, `"long"` to avoid it |
| `sourceIdField`              | string           | `"sourceId"`        | Data field name for source polygon ID                            |
| `targetIdField`              | string           | `"targetId"`        | Data field name for target polygon ID                            |
| `sourceLongitudeField`       | string           | `"sourceLongitude"` | Data field name for source longitude                             |
| `sourceLatitudeField`        | string           | `"sourceLatitude"`  | Data field name for source latitude                              |
| `targetLongitudeField`       | string           | `"targetLongitude"` | Data field name for target longitude                             |
| `targetLatitudeField`        | string           | `"targetLatitude"`  | Data field name for target latitude                              |
| `waypointsField`             | string           | `"waypoints"`       | Data field name for waypoints array                              |

## Data item properties

| Property                     | Type   | Description                                    |
| ---------------------------- | ------ | ---------------------------------------------- |
| `sourceId`                   | string | Source polygon ID (ISO alpha-2 code)           |
| `targetId`                   | string | Target polygon ID                              |
| `sourceLongitude`            | number | Source longitude (if not using sourceId)       |
| `sourceLatitude`             | number | Source latitude (if not using sourceId)        |
| `targetLongitude`            | number | Target longitude (if not using targetId)       |
| `targetLatitude`             | number | Target latitude (if not using targetId)        |
| `value`                      | number | Numeric value controlling band thickness       |
| `waypoints`                  | array  | Array of `{ longitude, latitude }` for routing |
| `controlPointDistance`       | number | Per-link bezier control point distance         |
| `controlPointDistanceSource` | number | Per-link source end distance                   |
| `controlPointDistanceTarget` | number | Per-link target end distance                   |

## Full example

The following example shows a complete multi-level coffee supply chain visualization with animated bullets, a globe/map toggle, and coffee-themed styling:

Example: [Map Sankey Chart: Global Coffee Supply Chain](https://docs.amcharts.com/embeds/v5/map-sankey-chart-global-coffee-supply-chain/)

Scripts: https://cdn.amcharts.com/lib/5/index.js, https://cdn.amcharts.com/lib/5/map.js, https://cdn.amcharts.com/lib/5/geodata/worldLow.js, https://cdn.amcharts.com/lib/5/themes/Animated.js

HTML:

```html
<div id="chartdiv"></div>
```

CSS:

```css
#chartdiv {
  max-width: 100%;
  height: 95vh;
}
```

JavaScript:

```js
// Create root element
// https://docs.amcharts.com/v5/getting-started/#root-element
var root = am5.Root.new("chartdiv");

// Set themes
// https://docs.amcharts.com/v5/concepts/themes/
var coffeeTheme = am5.Theme.new(root);
coffeeTheme.rule("InterfaceColors").setAll({
  primaryButton: am5.color(0x8b5e3c),
  primaryButtonHover: am5.color(0x5c3a1e),
  primaryButtonDown: am5.color(0x3c1e0e),
  primaryButtonActive: am5.color(0xc4956a),
  primaryButtonText: am5.color(0xf5ece0),
  secondaryButton: am5.color(0xe8d5b7),
  secondaryButtonHover: am5.color(0xd4c4a8),
  secondaryButtonDown: am5.color(0xc4956a),
  secondaryButtonText: am5.color(0x3c1e0e),
  background: am5.color(0xe8d5b7),
  text: am5.color(0x3c1e0e)
});

root.setThemes([am5themes_Animated.new(root), coffeeTheme]);

// Grainy paper background
root.container.set(
  "background",
  am5.Rectangle.new(root, {
    fill: am5.color(0xf0e6d6),
    fillPattern: am5.GrainPattern.new(root, {
      density: 0.4,
      maxOpacity: 0.07,
      colors: [am5.color(0x000000)]
    })
  })
);

// Coffee palette
var espresso = am5.color(0x3c1e0e);
var darkRoast = am5.color(0x5c3a1e);
var mediumRoast = am5.color(0x8b5e3c);
var lightRoast = am5.color(0xc4956a);
var crema = am5.color(0xe8d5b7);
var cream = am5.color(0xf5ece0);

// Create the map chart
// https://docs.amcharts.com/v5/charts/map-chart/
var chart = root.container.children.push(
  am5map.MapChart.new(root, {
    panX: "rotateX",
    panY: "rotateY",
    projection: am5map.geoOrthographic(),
    rotationX: -15,
    rotationY: -20,
    minZoomLevel: 0.5,
    zoomLevel: 0.9
  })
);

// Create series for background fill
// https://docs.amcharts.com/v5/charts/map-chart/map-polygon-series/#background-polygon
var bgSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {}));
bgSeries.mapPolygons.template.setAll({
  fill: am5.color(0xede4d4),
  fillOpacity: 1,
  strokeOpacity: 0
});

bgSeries.data.push({ geometry: am5map.getGeoRectangle(90, 180, -90, -180) });

// Create graticule series
// https://docs.amcharts.com/v5/charts/map-chart/graticule-series/
var graticuleSeries = chart.series.push(am5map.GraticuleSeries.new(root, {}));
graticuleSeries.mapLines.template.setAll({
  stroke: mediumRoast,
  strokeOpacity: 0.15,
  strokeWidth: 0.5
});

// Create main polygon series for countries
// https://docs.amcharts.com/v5/charts/map-chart/map-polygon-series/
var polygonSeries = chart.series.push(
  am5map.MapPolygonSeries.new(root, {
    geoJSON: am5geodata_worldLow
  })
);

polygonSeries.mapPolygons.template.setAll({
  fill: cream,
  stroke: lightRoast,
  strokeWidth: 0.5,
  strokeOpacity: 0.5
});

// Highlight producer, hub, and consumer countries
var producerIds = ["BR", "VN", "CO", "ET", "ID", "HN"];
var hubIds = ["DE", "BE", "IT", "US"];
var consumerIds = ["FR", "PL", "SE", "RU", "GB", "NL", "GR", "AT", "CA", "JP"];

polygonSeries.events.on("datavalidated", function () {
  am5.array.each(polygonSeries.dataItems, function (di) {
    var id = di.get("id");
    if (id && producerIds.includes(id)) {
      di.get("mapPolygon").setAll({ fill: am5.color(0x8fae7e) });
    } else if (id && hubIds.includes(id)) {
      di.get("mapPolygon").setAll({ fill: am5.color(0xc4a878) });
    } else if (id && consumerIds.includes(id)) {
      di.get("mapPolygon").setAll({ fill: am5.color(0xddc8a0) });
    }
  });
});

// Create Map Sankey series
// https://docs.amcharts.com/v5/charts/map-chart/map-sankey-series/
var sankeySeries = chart.series.push(
  am5map.MapSankeySeries.new(root, {
    polygonSeries: polygonSeries,
    maxWidth: 2,
    controlPointDistance: 0.4,
    resolution: 60,
    nodePadding: 0.3
  })
);

sankeySeries.mapPolygons.template.setAll({
  fill: mediumRoast,
  fillOpacity: 0.65,
  strokeOpacity: 0,
  tooltipText: "{sourceNode.name} > {targetNode.name}\n{value}k tonnes"
});

sankeySeries.nodes.mapPolygons.template.setAll({
  fill: espresso,
  stroke: crema,
  strokeWidth: 1.5,
  fillOpacity: 0.95,
  strokeOpacity: 1,
  tooltipText: "{name}\n{sum}k tonnes"
});

// Add animated coffee bean bullets
sankeySeries.bullets.push(function () {
  return am5.Bullet.new(root, {
    locationX: 0,
    autoRotate: true,
    sprite: am5.Graphics.new(root, {
      svgPath:
        "M-4,-2.5 C-4,-5 -1.5,-6.5 1,-6.5 C3.5,-6.5 5,-4.5 5,-2 C5,1 3,3.5 0.5,5 C-0.5,5.7 -1.5,5.7 -2.5,5 C-5,3.5 -6,1 -4,-2.5 Z M-1,-5 C-1,-1 -1,2 -0.5,4.5",
      fill: espresso,
      stroke: darkRoast,
      strokeWidth: 0.5,
      centerX: am5.p50,
      centerY: am5.p50,
      scale: 0.35,
      visible: false
    })
  });
});

// Producers > Processing Hubs > Consumer Markets
sankeySeries.data.setAll([
  // Producers > Hubs
  { sourceId: "BR", targetId: "DE", value: 350 },
  { sourceId: "BR", targetId: "US", value: 450 },
  { sourceId: "BR", targetId: "IT", value: 200 },
  { sourceId: "VN", targetId: "DE", value: 200 },
  { sourceId: "VN", targetId: "BE", value: 150 },
  { sourceId: "CO", targetId: "US", value: 250 },
  { sourceId: "CO", targetId: "DE", value: 80 },
  { sourceId: "ET", targetId: "DE", value: 60 },
  { sourceId: "ET", targetId: "BE", value: 40 },
  { sourceId: "ID", targetId: "US", value: 80 },
  { sourceId: "HN", targetId: "DE", value: 60 },
  { sourceId: "HN", targetId: "BE", value: 40 },

  // Hubs > Consumer Markets
  { sourceId: "DE", targetId: "FR", value: 150 },
  { sourceId: "DE", targetId: "PL", value: 100 },
  { sourceId: "DE", targetId: "SE", value: 80 },
  { sourceId: "DE", targetId: "RU", value: 120 },
  { sourceId: "BE", targetId: "GB", value: 100 },
  { sourceId: "BE", targetId: "NL", value: 80 },
  { sourceId: "IT", targetId: "GR", value: 50 },
  { sourceId: "IT", targetId: "AT", value: 40 },
  { sourceId: "US", targetId: "CA", value: 120 },
  { sourceId: "US", targetId: "JP", value: 80 }
]);

// Set country names on auto-created nodes and animate bullets
var countryNames = {
  BR: "Brazil",
  VN: "Vietnam",
  CO: "Colombia",
  ET: "Ethiopia",
  ID: "Indonesia",
  HN: "Honduras",
  DE: "Germany",
  BE: "Belgium",
  IT: "Italy",
  US: "United States",
  FR: "France",
  PL: "Poland",
  SE: "Sweden",
  RU: "Russia",
  GB: "United Kingdom",
  NL: "Netherlands",
  GR: "Greece",
  AT: "Austria",
  CA: "Canada",
  JP: "Japan"
};

sankeySeries.events.on("datavalidated", function () {
  am5.array.each(sankeySeries.nodes.dataItems, function (di) {
    var id = di.get("id");
    if (id && countryNames[id]) {
      di.set("name", countryNames[id]);
    }
  });

  am5.array.each(sankeySeries.dataItems, function (dataItem) {
    var bullets = dataItem.bullets;
    if (bullets) {
      am5.array.each(bullets, function (bullet) {
        var randomDur = 3000 + Math.random() * 3000;
        var delay = Math.random() * randomDur;
        setTimeout(function () {
          var sprite = bullet.get("sprite");
          if (sprite) sprite.set("visible", true);
          bullet.animate({
            key: "locationX",
            from: 0,
            to: 1,
            duration: randomDur,
            easing: am5.ease.linear,
            loops: Infinity
          });
        }, delay);
      });
    }
  });
});

// Add title and subtitle
var titleCont = chart.children.push(
  am5.Container.new(root, {
    layout: root.verticalLayout,
    x: am5.p50,
    centerX: am5.p50,
    y: am5.p100,
    centerY: am5.p100,
    position: "absolute",
    paddingBottom: 16
  })
);

titleCont.children.push(
  am5.Label.new(root, {
    text: "Global Coffee Supply Chain",
    fontSize: 18,
    fontWeight: "600",
    fill: espresso,
    x: am5.p50,
    centerX: am5.p50
  })
);

titleCont.children.push(
  am5.Label.new(root, {
    text: "(Thousands of tonnes)",
    fontSize: 11,
    fill: mediumRoast,
    x: am5.p50,
    centerX: am5.p50
  })
);

// Add Globe / Map projection toggle
var switchCont = chart.children.push(
  am5.Container.new(root, {
    layout: root.horizontalLayout,
    x: 20,
    y: 40
  })
);

switchCont.children.push(
  am5.Label.new(root, {
    centerY: am5.p50,
    text: "Globe",
    fill: espresso,
    fontSize: 13
  })
);

var switchButton = switchCont.children.push(
  am5.Button.new(root, {
    themeTags: ["switch"],
    centerY: am5.p50,
    icon: am5.Circle.new(root, {
      themeTags: ["icon"]
    })
  })
);

var easing = am5.ease.inOut(am5.ease.cubic);
var duration = 1500;
var fadeDuration = 300;

function zoomToGlobe() {
  chart.set("projection", am5map.geoOrthographic());
  chart.set("panX", "rotateX");
  chart.set("panY", "rotateY");
  chart.animate({ key: "rotationX", to: -15, duration: duration, easing: easing });
  chart.animate({ key: "rotationY", to: -20, duration: duration, easing: easing });
  bgSeries.mapPolygons.template.set("fillOpacity", 1);
  chart.set("minZoomLevel", 0.9);
  chart.animate({ key: "zoomLevel", to: 0.9, duration: duration, easing: easing });
}

function zoomToMap() {
  chart.set("projection", am5map.geoMercator());
  chart.set("panX", "translateX");
  chart.set("panY", "translateY");
  chart.animate({ key: "rotationX", to: 0, duration: duration, easing: easing });
  chart.animate({ key: "rotationY", to: 0, duration: duration, easing: easing });
  bgSeries.mapPolygons.template.set("fillOpacity", 0);
  chart.set("minZoomLevel", 1);
  chart.animate({ key: "zoomLevel", to: 1.7, duration: duration, easing: easing });
}

switchButton.on("active", function () {
  chart.goHome(duration);
  // Fade out before projection switch
  setTimeout(function () {
    chart.seriesContainer.animate({ key: "opacity", to: 0, duration: fadeDuration });
  }, duration - fadeDuration);
  setTimeout(function () {
    if (switchButton.get("active")) {
      zoomToMap();
    } else {
      zoomToGlobe();
    }
    // Fade in after projection switch
    chart.seriesContainer.animate({ key: "opacity", to: 1, duration: fadeDuration });
  }, duration);
});

switchCont.children.push(
  am5.Label.new(root, {
    centerY: am5.p50,
    text: "Map",
    fill: espresso,
    fontSize: 13
  })
);

// Add zoom controls
// https://docs.amcharts.com/v5/charts/map-chart/map-pan-zoom/
var zoomControl = chart.set("zoomControl", am5map.ZoomControl.new(root, {}));
zoomControl.homeButton.set("visible", true);

// Auto-rotate globe until user interaction
var rotationAnimation = chart.animate({
  key: "rotationX",
  from: -15,
  to: -15 + 360,
  duration: 120000,
  loops: Infinity,
  easing: am5.ease.linear
});

chart.chartContainer.events.on("pointerdown", function () {
  if (rotationAnimation) {
    rotationAnimation.stop();
    rotationAnimation = null;
  }
});

// Make stuff animate on load
// https://docs.amcharts.com/v5/concepts/animations/#initial-animation
chart.appear(1000, 100);
```
