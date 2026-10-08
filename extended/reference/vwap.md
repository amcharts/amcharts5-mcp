---
title: "VWAP"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/vwap/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Volume-Weighted Average Price indicator: `field` averaged over the last `period` data items, weighted by volume. Drawn over the main series; needs a `volumeSeries`.

Docs: https://www.amcharts.com/docs/v5/charts/stock/indicators/

## Import

```js
import * as am5stock from "@amcharts/amcharts5/stock";

am5stock.VWAP.new(root, { /* settings */ });
```

## Inheritance

Extends: Indicator → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IVWAPSettings` — get_api_reference shows it after this page
- Private settings: `IVWAPPrivate`
- Events: `IVWAPEvents`

## Properties

Public properties (not settings):

- **series** (`LineSeries`) — The indicator's series.
