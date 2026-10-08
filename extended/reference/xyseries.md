---
title: "XYSeries"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/xyseries/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Base class for all XY chart series.

Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/series/

## Import

```js
import * as am5xy from "@amcharts/amcharts5/xy";
```

## Inheritance

Extends: Series → Component → Container → Sprite → Entity → Settings
Extended by: BaseColumnSeries, LineSeries

## Settings and related interfaces

- Settings: `IXYSeriesSettings` — get_api_reference shows it after this page
- Private settings: `IXYSeriesPrivate`
- Events: `IXYSeriesEvents`
- Data item fields: `IXYSeriesDataItem`

## Properties

Public properties (not settings):

- **axisRanges** (`List<this["_axisRangeType"]>`) — Axis ranges of the series, added with `createAxisRange()`. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/axes/axis-ranges/
- **chart** (`XYChart`) — The chart the series belongs to.
- **mainContainer** (`Container`) — default `Container.new()` — Container that holds the series' elements, such as its lines or columns.
- **mainDataItems** (`DataItem<this["_dataItemSettings"]>[]`) — The series' original data items, before any grouping by a `DateAxis`.
