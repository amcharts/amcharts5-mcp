---
title: "MACD"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/macd/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

MACD (Moving Average Convergence Divergence) indicator: the fast minus the slow exponential moving average of `field`, with a signal line and columns of the difference between the two. Drawn in a panel of its own.

Docs: https://www.amcharts.com/docs/v5/charts/stock/indicators/

## Import

```js
import * as am5stock from "@amcharts/amcharts5/stock";

am5stock.MACD.new(root, { /* settings */ });
```

## Inheritance

Extends: ChartIndicator → Indicator → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IMACDSettings` — get_api_reference shows it after this page
- Private settings: `IMACDPrivate`
- Events: `IMACDEvents`

## Properties

Public properties (not settings):

- **differenceSeries** (`ColumnSeries`) — Columns of the difference between the MACD and signal lines.
- **series** (`LineSeries`) — Series of the MACD line.
- **signalSeries** (`LineSeries`) — Series of the signal line.
