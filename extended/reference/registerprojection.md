---
title: "registerProjection"
type: "function"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Registers a projection factory under `name`, for `MapChart`'s `projectionName`.

Returns the factory tagged with the name: a chart given `projection: cc()`, where `const cc = registerProjection("geoConicConformal", geoConicConformal)`, serializes with its `projectionName`, as the bundled projections do.

## Import

```js
import * as am5map from "@amcharts/amcharts5/map";

am5map.registerProjection(…);
```

## Signature

```ts
am5map.registerProjection(name: string, factory: () => GeoProjection): () => GeoProjection
```

## Parameters

- **name** (`string`)
- **factory** (`() => GeoProjection`)

## Returns

`() => GeoProjection`
