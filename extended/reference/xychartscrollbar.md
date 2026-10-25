---
title: "XYChartScrollbar"
type: "class"
source: "https://docs.amcharts.com/v5/reference/xychartscrollbar/"
generatedFrom: "@amcharts/amcharts5@5.21.4"
---

A scrollbar with a small preview chart in it. Add axes and series to its `chart` to draw the preview.

Docs: https://docs.amcharts.com/v5/charts/xy-chart/scrollbars/#scrollbar-with-chart-preview

## Import

```js
import * as am5xy from "@amcharts/amcharts5/xy";

am5xy.XYChartScrollbar.new(root, { /* settings */ });
```

## Inheritance

Extends: Scrollbar → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IXYChartScrollbarSettings` — get_api_reference shows it after this page
- Private settings: `IXYChartScrollbarPrivate`

## Properties

Public properties (not settings):

- **chart** (`XYChart`) — The preview chart inside the scrollbar. It does not react to the pointer.
- **overlay** (`Graphics`) — Shading drawn over the parts of the preview outside the selected range.
