---
title: "HeikinAshi"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/heikinashi/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Heikin Ashi indicator: candlesticks of averaged prices, which smooth out noise and show the trend more clearly. Drawn in a panel of its own.

Docs: https://www.amcharts.com/docs/v5/charts/stock/indicators/

## Import

```js
import * as am5stock from "@amcharts/amcharts5/stock";

am5stock.HeikinAshi.new(root, { /* settings */ });
```

## Inheritance

Extends: ChartIndicator → Indicator → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IHeikinAshiSettings` — get_api_reference shows it after this page
- Private settings: `IHeikinAshiPrivate`
- Events: `IHeikinAshiEvents`

## Properties

Public properties (not settings):

- **series** (`CandlestickSeries`) — The indicator's series.
