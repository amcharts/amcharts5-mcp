---
title: "BaseColumnSeries"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/basecolumnseries/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Base class for column-based series: `ColumnSeries`, `CandlestickSeries`, `OHLCSeries` and `RadarColumnSeries`.

## Import

```js
import * as am5xy from "@amcharts/amcharts5/xy";
```

## Inheritance

Extends: XYSeries → Series → Component → Container → Sprite → Entity → Settings
Extended by: ColumnSeries, CurveColumnSeries, RadarColumnSeries

## Settings and related interfaces

- Settings: `IBaseColumnSeriesSettings` — get_api_reference shows it after this page
- Private settings: `IBaseColumnSeriesPrivate`
- Data item fields: `IBaseColumnSeriesDataItem`

## Properties

Public properties (not settings):

- **columns** (`ListTemplate<Graphics>`) — Columns of the series. Configure them all through `columns.template`.
