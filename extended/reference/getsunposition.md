---
title: "getSunPosition"
type: "function"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Returns the point where the sun is directly overhead at a given time, such as for the `sunPosition` of a `MapRasterSeries`. Accurate to a fraction of a degree.

_Since 5.21.0._

## Import

```js
import * as am5map from "@amcharts/amcharts5/map";

am5map.getSunPosition(…);
```

## Signature

```ts
am5map.getSunPosition(date?: Date): IGeoPoint
```

## Parameters

- **date** (`Date`, optional) — Time (default: now)

## Returns

`IGeoPoint` — The point
