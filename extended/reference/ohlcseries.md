---
title: "OHLCSeries"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/ohlcseries/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

A series that shows open, high, low and close values as OHLC bars (`OHLC`).

Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/series/candlestick-series/

## Import

```js
import * as am5xy from "@amcharts/amcharts5/xy";

am5xy.OHLCSeries.new(root, { /* settings */ });
```

## Inheritance

Extends: CandlestickSeries → ColumnSeries → BaseColumnSeries → XYSeries → Series → Component → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IOHLCSeriesSettings` — get_api_reference shows it after this page
- Private settings: `IOHLCSeriesPrivate`
- Data item fields: `IOHLCSeriesDataItem`

## Properties

Public properties (not settings):

- **columns** (`ListTemplate<OHLC>`) — default `new ListTemplate<OHLC>` — OHLC bars of the series. Configure them all through `columns.template`.
