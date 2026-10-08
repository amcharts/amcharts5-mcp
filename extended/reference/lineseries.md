---
title: "LineSeries"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/lineseries/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

A series drawn as a line, with an optional fill below it for an area chart.

Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/series/line-series/

## Import

```js
import * as am5xy from "@amcharts/amcharts5/xy";

am5xy.LineSeries.new(root, { /* settings */ });
```

## Inheritance

Extends: XYSeries → Series → Component → Container → Sprite → Entity → Settings
Extended by: CurveLineSeries, DrawingSeries, RadarLineSeries, SmoothedXLineSeries, SmoothedXYLineSeries, SmoothedYLineSeries, StepLineSeries

## Settings and related interfaces

- Settings: `ILineSeriesSettings` — get_api_reference shows it after this page
- Private settings: `ILineSeriesPrivate`
- Data item fields: `ILineSeriesDataItem`

## Properties

Public properties (not settings):

- **fills** (`ListTemplate<Graphics>`) — default `new ListTemplate<Graphics>` — Fills below the line segments. They are hidden by default: set `visible` and `fillOpacity` on `fills.template` to show them.
- **strokes** (`ListTemplate<Graphics>`) — default `new ListTemplate<Graphics>` — Line segments of the series. Configure them all, existing ones included, through `strokes.template`.
