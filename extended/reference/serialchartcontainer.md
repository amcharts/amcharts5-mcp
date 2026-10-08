---
title: "SerialChartContainer"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/serialchartcontainer/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

A chart for series of any kind, such as a force-directed tree, that can be zoomed and panned: its series sit in a `ZoomableContainer`.

_Since 5.20.2._

## Import

```js
import * as am5 from "@amcharts/amcharts5";

am5.SerialChartContainer.new(root, { /* settings */ });
```

## Inheritance

Extends: SerialChart → Chart → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `ISerialChartContainerSettings` — get_api_reference shows it after this page
- Private settings: `ISerialChartContainerPrivate`
- Events: `ISerialChartContainerEvents`

## Properties

Public properties (not settings):

- **zoomableContainer** (`ZoomableContainer`) — The `ZoomableContainer` that holds the series and their bullets, so they can be zoomed and panned. _Note:_ Theme tag `serialchartcontainer`: the default theme sets `wheelable: false`, `pinchZoom: false` and `maskContent: true` on it.
