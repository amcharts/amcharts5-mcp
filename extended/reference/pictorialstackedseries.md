---
title: "PictorialStackedSeries"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/pictorialstackedseries/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

A series for a `SlicedChart` that fills a shape (`svgPath`) with stacked slices, each as tall as its share of the total. It sets `valueIs` to `"height"` and `topWidth` and `bottomWidth` to `100%`.

Docs: https://www.amcharts.com/docs/v5/charts/percent-charts/sliced-chart/pictorial-stacked-series/

## Import

```js
import * as am5percent from "@amcharts/amcharts5/percent";

am5percent.PictorialStackedSeries.new(root, { /* settings */ });
```

## Inheritance

Extends: PyramidSeries → FunnelSeries → PercentSeries → Series → Component → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IPictorialStackedSeriesSettings` — get_api_reference shows it after this page
- Private settings: `IPictorialStackedSeriesPrivate`
- Data item fields: `IPictorialStackedSeriesDataItem`

## Properties

Public properties (not settings):

- **seriesGraphics** (`Graphics`) — The `svgPath` shape drawn behind the slices, as a faint background.
- **seriesMask** (`Graphics`) — The shape that masks the slices, drawn from `svgPath`. To change it, set `svgPath` on the series.
