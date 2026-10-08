---
title: "Axis"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/axis/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

A base class for all axes.

Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/#Adding_axes

## Import

```js
import * as am5xy from "@amcharts/amcharts5/xy";
```

## Inheritance

Extends: Component → Container → Sprite → Entity → Settings
Extended by: CategoryAxis, ValueAxis

## Settings and related interfaces

- Settings: `IAxisSettings` — get_api_reference shows it after this page
- Private settings: `IAxisPrivate`
- Events: `IAxisEvents`
- Data item fields: `IAxisDataItem`

## Properties

Public properties (not settings):

- **axisHeader** (`Container`) — A container for extra content, such as a legend, a label or an icon. It sits above a Y axis, and to the left of an X axis. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/axes/axis-headers/
- **axisRanges** (`List<DataItem<this["_dataItemSettings"]>>`) — The axis's ranges: highlighted values or spans, each with its own grid, label and fill. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/axes/axis-ranges/
- **bulletsContainer** (`Container`) — Holds the axis's bullets.
- **chart** (`XYChart`) — The chart the axis belongs to.
- **ghostLabel** (`AxisLabel`) — An invisible label that keeps room for the axis's widest label, so the axis doesn't shrink while zooming (see `fixAxisSize`). Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/axes/value-axis/#Ghost_label
- **gridContainer** (`Container`) — Holds the axis's grid and fills, drawn below the series.
- **labelsContainer** (`Container`) — Holds the axis's labels and ticks.
- **minorDataItems** (`DataItem<this["_dataItemSettings"]>[]`) — Data items of the minor grid.
- **series** (`this["_seriesType"][]`) — A list of series using this axis.
- **topGridContainer** (`Container`) — Holds the grid and fills of axis ranges set to be drawn `above` the series.
