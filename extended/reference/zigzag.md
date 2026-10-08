---
title: "ZigZag"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/zigzag/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

ZigZag indicator: straight lines between the price's turning points, ignoring moves smaller than `deviation`. Drawn over the main series.

Docs: https://www.amcharts.com/docs/v5/charts/stock/indicators/

## Import

```js
import * as am5stock from "@amcharts/amcharts5/stock";

am5stock.ZigZag.new(root, { /* settings */ });
```

## Inheritance

Extends: Indicator → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IZigZagSettings` — get_api_reference shows it after this page
- Private settings: `IZigZagPrivate`
- Events: `IZigZagEvents`

## Properties

Public properties (not settings):

- **series** (`LineSeries`) — The indicator's series.
