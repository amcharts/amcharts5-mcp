---
title: "getGeoCircle"
type: "function"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Returns a circle on the globe as GeoJSON geometry, for the `geometry` of a `MapPolygon`.

## Import

```js
import * as am5map from "@amcharts/amcharts5/map";

am5map.getGeoCircle(…);
```

## Signature

```ts
am5map.getGeoCircle(geoPoint: IGeoPoint, radius: number): GeoJSON.Polygon
```

## Parameters

- **geoPoint** (`IGeoPoint`) — Center
- **radius** (`number`) — Radius in degrees of arc along the surface

## Returns

`Polygon` — Polygon geometry
