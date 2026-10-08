---
title: "DrawingSeries"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/drawingseries/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Base class for the series that hold the drawings of a `StockChart`.

## Import

```js
import * as am5stock from "@amcharts/amcharts5/stock";

am5stock.DrawingSeries.new(root, { /* settings */ });
```

## Inheritance

Extends: LineSeries → XYSeries → Series → Component → Container → Sprite → Entity → Settings
Extended by: DoodleSeries, EllipseSeries, PolylineSeries, SimpleLineSeries

## Settings and related interfaces

- Settings: `IDrawingSeriesSettings` — get_api_reference shows it after this page
- Private settings: `IDrawingSeriesPrivate`
- Data item fields: `IDrawingSeriesDataItem`

## Properties

Public properties (not settings):

- **circles** (`ListTemplate<Circle>`) — Inner circles of the grips.
- **grips** (`ListTemplate<Container>`) — Grips on the drawings' points, which can be dragged to reshape them.
- **outerCircles** (`ListTemplate<Circle>`) — Outer circles of the grips.
- **selectors** (`ListTemplate<Rectangle>`) — Rectangles drawn around the selected drawings.
