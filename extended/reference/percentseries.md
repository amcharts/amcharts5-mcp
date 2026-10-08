---
title: "PercentSeries"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/percentseries/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Base class for the series of percent charts: `PieSeries`, `FunnelSeries`, `PyramidSeries` and `PictorialStackedSeries`.

## Import

```js
import * as am5percent from "@amcharts/amcharts5/percent";
```

## Inheritance

Extends: Series → Component → Container → Sprite → Entity → Settings
Extended by: FunnelSeries, PieSeries

## Settings and related interfaces

- Settings: `IPercentSeriesSettings` — get_api_reference shows it after this page
- Private settings: `IPercentSeriesPrivate`
- Data item fields: `IPercentSeriesDataItem`

## Properties

Public properties (not settings):

- **chart** (`PercentChart`) — The chart the series belongs to.
- **labels** (`ListTemplate<this["_labelType"]>`) — List of slice labels; configure them all through `labels.template`.
- **labelsContainer** (`Container`)
- **slices** (`ListTemplate<this["_sliceType"]>`) — List of slice elements; configure them all through `slices.template`.
- **slicesContainer** (`Container`)
- **ticks** (`ListTemplate<this["_tickType"]>`) — List of the ticks that join labels to their slices; configure them all through `ticks.template`.
- **ticksContainer** (`Container`)
