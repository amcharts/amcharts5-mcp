---
title: "LineArrowSeries"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/linearrowseries/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Draws a straight line with an arrowhead at its end, for the Line Arrow tool of a `StockChart`.

_Since 5.10.5._

## Import

```js
import * as am5stock from "@amcharts/amcharts5/stock";

am5stock.LineArrowSeries.new(root, { /* settings */ });
```

## Inheritance

Extends: SimpleLineSeries → DrawingSeries → LineSeries → XYSeries → Series → Component → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `ILineArrowSeriesSettings` — get_api_reference shows it after this page
- Private settings: `ILineArrowSeriesPrivate`
- Data item fields: `ILineArrowSeriesDataItem`

## Properties

Public properties (not settings):

- **arrows** (`ListTemplate<Triangle>`) — Arrowheads at the ends of the lines.
