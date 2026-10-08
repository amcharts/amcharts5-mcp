---
title: "Scrollbar"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/scrollbar/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

A control for selecting a range, such as the zoom of a chart's axes: the grips resize the range, the thumb between them moves it.

Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/

## Import

```js
import * as am5 from "@amcharts/amcharts5";

am5.Scrollbar.new(root, { /* settings */ });
```

## Inheritance

Extends: Container → Sprite → Entity → Settings
Extended by: Slider, XYChartScrollbar

## Settings and related interfaces

- Settings: `IScrollbarSettings` — get_api_reference shows it after this page
- Private settings: `IScrollbarPrivate`
- Events: `IScrollbarEvents`

## Properties

Public properties (not settings):

- **endGrip** (`Button`) — The grip that drags the end of the range.
- **startGrip** (`Button`) — The grip that drags the start of the range.
- **thumb** (`RoundedRectangle`) — The draggable bar between the grips, which moves the selected range. Double-clicking it selects the full range.
