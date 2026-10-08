---
title: "CandlestickSeries"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/candlestickseries/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

A series that shows open, high, low and close values as candles (`Candlestick`). A candle that closes below its open takes the `negative` interface color, the others the `positive` one.

Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/series/candlestick-series/

## Import

```js
import * as am5xy from "@amcharts/amcharts5/xy";

am5xy.CandlestickSeries.new(root, { /* settings */ });
```

## Inheritance

Extends: ColumnSeries → BaseColumnSeries → XYSeries → Series → Component → Container → Sprite → Entity → Settings
Extended by: OHLCSeries

## Settings and related interfaces

- Settings: `ICandlestickSeriesSettings` — get_api_reference shows it after this page
- Private settings: `ICandlestickSeriesPrivate`
- Data item fields: `ICandlestickSeriesDataItem`

## Properties

Public properties (not settings):

- **columns** (`ListTemplate<Candlestick>`) — default `new ListTemplate<Candlestick>` — Candles of the series. Configure them all through `columns.template`.
