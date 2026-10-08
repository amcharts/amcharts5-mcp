---
title: "SimpleLineSeries"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/simplelineseries/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Draws a straight line between two points.

## Import

```js
import * as am5stock from "@amcharts/amcharts5/stock";

am5stock.SimpleLineSeries.new(root, { /* settings */ });
```

## Inheritance

Extends: DrawingSeries → LineSeries → XYSeries → Series → Component → Container → Sprite → Entity → Settings
Extended by: AverageSeries, FibonacciSeries, HorizontalLineSeries, HorizontalRaySeries, LineArrowSeries, ParallelChannelSeries, QuadrantLineSeries, RectangleSeries, RegressionSeries, TrendLineSeries, VerticalLineSeries

## Settings and related interfaces

- Settings: `ISimpleLineSeriesSettings` — get_api_reference shows it after this page
- Private settings: `ISimpleLineSeriesPrivate`
- Data item fields: `ISimpleLineSeriesDataItem`

## Properties

Public properties (not settings):

- **hitLines** (`ListTemplate<Line>`) — Invisible wide lines along the drawings that catch the pointer.
- **lines** (`ListTemplate<Line>`) — Dotted extensions of the lines beyond their ends (`showExtension`).
