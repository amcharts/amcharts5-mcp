---
title: "SerialChart"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/serialchart/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

A base class for all series-based charts.

## Import

```js
import * as am5 from "@amcharts/amcharts5";
```

## Inheritance

Extends: Chart → Container → Sprite → Entity → Settings
Extended by: MapChart, PercentChart, SerialChartContainer, XYChart

## Settings and related interfaces

- Settings: `ISerialChartSettings` — get_api_reference shows it after this page
- Private settings: `ISerialChartPrivate`
- Events: `ISerialChartEvents`

## Properties

Public properties (not settings):

- **series** (`ListAutoDispose<this["_seriesType"]>`) — The chart's series: push a series here to add it to the chart. A series removed from the list is disposed.
- **seriesContainer** (`Container`) — default `Container.new()` — The `Container` the chart's series are drawn in.
