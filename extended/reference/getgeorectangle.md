---
title: "getGeoRectangle"
type: "function"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Returns the area between two latitudes and two longitudes as GeoJSON geometry, for the `geometry` of a `MapPolygon`. Its edges follow the parallels and meridians.

## Import

```js
import * as am5map from "@amcharts/amcharts5/map";

am5map.getGeoRectangle(…);
```

## Signature

```ts
am5map.getGeoRectangle(north: number, east: number, south: number, west: number): GeoJSON.MultiPolygon
```

## Parameters

- **north** (`number`) — North latitude
- **east** (`number`) — East longitude
- **south** (`number`) — South latitude
- **west** (`number`) — West longitude

## Returns

`MultiPolygon` — Polygon geometry
