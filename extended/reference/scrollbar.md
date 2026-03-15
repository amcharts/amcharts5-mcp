---
title: "Scrollbar"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/scrollbar/"
scraped: "2026-03-15"
---

A control that allows zooming chart's axes, or other uses requiring range selection.

## Import

```javascript
// Import Scrollbar
import * as am5 from "@amcharts/amcharts5"
```

## Inheritance

Extends: Container
Extended by: Slider, XYChartScrollbar

> **Note:** This class also inherits all settings, properties, methods, and events from Container (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **animationDuration** (`undefined | number`) — Number of milliseconds to play scroll animations for.
- **animationEasing** (`undefined | ( t: Time) => Time`) — Easing function to use for animations. Click here for more info
- **end** (`undefined | number`) — Relative end of the selected range, with 0 meaning beginning, and 1 the end.
- **orientation** (`"horizontal" | "vertical"`) — Orientation of the scrollbar.
- **start** (`undefined | number`) — Relative start of the selected range, with 0 meaning beginning, and 1 the end.

## Properties

- **endGrip** (`Button`) — Default this._makeButton() End grip button.
- **startGrip** (`Button`) — Default this._makeButton() Start grip button.
- **thumb** (`RoundedRectangle`) — Default this._makeThumb() A thumb elment - a draggable square between the grips, used for panning the selection.
