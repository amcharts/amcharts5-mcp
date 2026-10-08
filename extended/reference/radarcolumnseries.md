---
title: "RadarColumnSeries"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/radarcolumnseries/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

A column series for a `RadarChart`, with each column drawn as a ring segment (`Slice`).

## Import

```js
import * as am5radar from "@amcharts/amcharts5/radar";

am5radar.RadarColumnSeries.new(root, { /* settings */ });
```

## Inheritance

Extends: BaseColumnSeries → XYSeries → Series → Component → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IRadarColumnSeriesSettings` — get_api_reference shows it after this page
- Private settings: `IRadarColumnSeriesPrivate`
- Data item fields: `IRadarColumnSeriesDataItem`

## Properties

Public properties (not settings):

- **chart** (`RadarChart`) — The chart the series belongs to.
- **columns** (`ListTemplate<Slice>`) — default `new ListTemplate<Slice>` — Columns of the series. Configure them all through `columns.template`.
