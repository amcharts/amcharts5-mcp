---
title: "FunnelSeries"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/funnelseries/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

A funnel series for a `SlicedChart`: slices of equal height, each as wide as its value relative to the largest one.

Docs: https://www.amcharts.com/docs/v5/charts/percent-charts/sliced-chart/funnel-series/

## Import

```js
import * as am5percent from "@amcharts/amcharts5/percent";

am5percent.FunnelSeries.new(root, { /* settings */ });
```

## Inheritance

Extends: PercentSeries → Series → Component → Container → Sprite → Entity → Settings
Extended by: PyramidSeries

## Settings and related interfaces

- Settings: `IFunnelSeriesSettings` — get_api_reference shows it after this page
- Private settings: `IFunnelSeriesPrivate`
- Data item fields: `IFunnelSeriesDataItem`

## Properties

Public properties (not settings):

- **chart** (`SlicedChart`) — The chart the series belongs to.
- **links** (`ListTemplate<this["_sliceType"]>`) — A `ListTemplate` of all slice links in series. `links.template` can also be used to configure slice links. Docs: https://www.amcharts.com/docs/v5/charts/percent-charts/sliced-chart/funnel-series/#Slice_links
