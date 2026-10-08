---
title: "ColumnSeries"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/columnseries/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

A series that shows values as columns or bars.

## Import

```js
import * as am5xy from "@amcharts/amcharts5/xy";

am5xy.ColumnSeries.new(root, { /* settings */ });
```

## Inheritance

Extends: BaseColumnSeries → XYSeries → Series → Component → Container → Sprite → Entity → Settings
Extended by: CandlestickSeries, GanttSeries

## Settings and related interfaces

- Settings: `IColumnSeriesSettings` — get_api_reference shows it after this page
- Private settings: `IColumnSeriesPrivate`
- Data item fields: `IColumnSeriesDataItem`

## Properties

Public properties (not settings):

- **allColumns** (`Graphics`)
- **allColumnsData** (`{ width: number; height: number; x: number; y: number; lowX0?: number; lowY0?: number; lowX1?: number; lowY1?: number; highX0?: number; highY0?: number; highX1?: number; highY1?: number; stroke?: Color; fill?: Color; strokeWidth: number; strokeOpacity: number; fillOpacity: number; }[]`)
- **columns** (`ListTemplate<RoundedRectangle>`) — Columns of the series. Configure them all, existing ones included, through `columns.template`.
