---
title: "getGeoBounds"
type: "function"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Returns the geographic bounds of a geometry, in degrees: longitudes `left` and `right`, latitudes `top` and `bottom`. Bounds across the 180th meridian take all longitudes, `-180` to `180`.

## Import

```js
import * as am5map from "@amcharts/amcharts5/map";

am5map.getGeoBounds(…);
```

## Signature

```ts
am5map.getGeoBounds(geometry: GeoJSON.GeometryObject): { left: number; right: number; top: number; bottom: number; }
```

## Parameters

- **geometry** (`Geometry`)

## Returns

`{ left: number; right: number; top: number; bottom: number; }`
