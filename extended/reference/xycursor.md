---
title: "XYCursor"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/xycursor/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Crosshair lines over an `XYChart` that follow the pointer and show the axis and series tooltips. Dragging can zoom or select (`behavior`).

Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/

## Import

```js
import * as am5xy from "@amcharts/amcharts5/xy";

am5xy.XYCursor.new(root, { /* settings */ });
```

## Inheritance

Extends: Container → Sprite → Entity → Settings
Extended by: CurveCursor, RadarCursor

## Settings and related interfaces

- Settings: `IXYCursorSettings` — get_api_reference shows it after this page
- Private settings: `IXYCursorPrivate`
- Events: `IXYCursorEvents`

## Properties

Public properties (not settings):

- **chart** (`XYChart`) — The chart the cursor belongs to.
- **lineX** (`Grid`) — The crosshair's vertical line, which follows the pointer along X.
- **lineY** (`Grid`) — The crosshair's horizontal line, which follows the pointer along Y.
- **selection** (`Graphics`) — The shaded area drawn while dragging. With a select `behavior`, it stays after the release.
