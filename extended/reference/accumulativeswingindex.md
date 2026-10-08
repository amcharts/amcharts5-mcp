---
title: "AccumulativeSwingIndex"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/accumulativeswingindex/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Accumulative Swing Index indicator: a running total of Wilder's swing index, which compares each data item's open, high, low and close with the previous one's. Drawn in a panel of its own.

Docs: https://www.amcharts.com/docs/v5/charts/stock/indicators/

## Import

```js
import * as am5stock from "@amcharts/amcharts5/stock";

am5stock.AccumulativeSwingIndex.new(root, { /* settings */ });
```

## Inheritance

Extends: ChartIndicator → Indicator → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IAccumulativeSwingIndexSettings` — get_api_reference shows it after this page
- Private settings: `IAccumulativeSwingIndexPrivate`
- Events: `IAccumulativeSwingIndexEvents`

## Properties

Public properties (not settings):

- **series** (`LineSeries`) — The indicator's series.
