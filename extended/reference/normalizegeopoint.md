---
title: "normalizeGeoPoint"
type: "function"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Brings a point's longitude within `-180` to `180` and its latitude within `-90` to `90`: a latitude past a pole comes back down on the other side. Changes `geoPoint` itself and returns it.

## Import

```js
import * as am5map from "@amcharts/amcharts5/map";

am5map.normalizeGeoPoint(…);
```

## Signature

```ts
am5map.normalizeGeoPoint(geoPoint: IGeoPoint): IGeoPoint
```

## Parameters

- **geoPoint** (`IGeoPoint`) — Input coordinates

## Returns

`IGeoPoint` — Updated coordinates
