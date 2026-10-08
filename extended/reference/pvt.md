---
title: "PVT"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/pvt/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Price Volume Trend indicator: a running total of each close's percentage change from the previous one, times volume. Drawn in a panel of its own.

Docs: https://www.amcharts.com/docs/v5/charts/stock/indicators/

## Import

```js
import * as am5stock from "@amcharts/amcharts5/stock";

am5stock.PVT.new(root, { /* settings */ });
```

## Inheritance

Extends: ChartIndicator → Indicator → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IPVTSettings` — get_api_reference shows it after this page
- Private settings: `IPVTPrivate`
- Events: `IPVTEvents`

## Properties

Public properties (not settings):

- **series** (`LineSeries`) — The indicator's series.
