---
title: "RadarChart"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/radarchart/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

An XY chart drawn in a circle: one axis runs around it (`AxisRendererCircular`), the other out from the center (`AxisRendererRadial`). Also used for gauges.

Docs: https://www.amcharts.com/docs/v5/charts/radar-chart/

## Import

```js
import * as am5radar from "@amcharts/amcharts5/radar";

am5radar.RadarChart.new(root, { /* settings */ });
```

## Inheritance

Extends: XYChart → SerialChart → Chart → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IRadarChartSettings` — get_api_reference shows it after this page
- Private settings: `IRadarChartPrivate`

## Properties

Public properties (not settings):

- **radarContainer** (`Container`) — default `Container.new()` — Container at the chart's center that holds its axes, grid, series and cursor.
