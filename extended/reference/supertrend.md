---
title: "SuperTrend"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/supertrend/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Super Trend indicator: a line `multiplier` average true ranges (over `period`) from the price, below it in an uptrend and above it in a downtrend. Drawn over the main series.

Docs: https://www.amcharts.com/docs/v5/charts/stock/indicators/

## Import

```js
import * as am5stock from "@amcharts/amcharts5/stock";

am5stock.SuperTrend.new(root, { /* settings */ });
```

## Inheritance

Extends: Indicator → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `ISuperTrendSettings` — get_api_reference shows it after this page
- Private settings: `ISuperTrendPrivate`
- Events: `ISuperTrendEvents`

## Properties

Public properties (not settings):

- **lowerBandSeries** (`LineSeries`) — Series of the line below the price (uptrend).
- **series** (`LineSeries`) — The indicator's series, which holds its legend entry. The lines are `upperBandSeries` and `lowerBandSeries`.
- **upperBandSeries** (`LineSeries`) — Series of the line above the price (downtrend).
