---
title: "CurveColumnSeries"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/curvecolumnseries/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

A column series for a `CurveChart`, `SerpentineChart` or `SpiralChart`. Its columns bend along the curve.

_Since 5.12.0._ Docs: https://www.amcharts.com/docs/v5/charts/timeline/

## Import

```js
import * as am5timeline from "@amcharts/amcharts5/timeline";

am5timeline.CurveColumnSeries.new(root, { /* settings */ });
```

## Inheritance

Extends: BaseColumnSeries → XYSeries → Series → Component → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `ICurveColumnSeriesSettings` — get_api_reference shows it after this page
- Private settings: `ICurveColumnSeriesPrivate`
- Data item fields: `ICurveColumnSeriesDataItem`

## Properties

Public properties (not settings):

- **chart** (`CurveChart`) — The chart the series belongs to.
- **columns** (`ListTemplate<Polygon>`) — The columns, drawn as polygons that follow the curve. Configure them through `columns.template`.
