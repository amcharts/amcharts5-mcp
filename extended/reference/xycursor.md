---
title: "XYCursor"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/xycursor/"
scraped: "2026-03-15"
---

Creates a chart cursor for an XYChart.

## Import

```javascript
// Import XYCursor
import * as am5xy from "@amcharts/amcharts5/xy"
```

## Inheritance

Extends: Container
Extended by: RadarCursor, CurveCursor

> **Note:** This class also inherits all settings, properties, methods, and events from Container (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **alwaysShow** (`undefined | false | true`) — Default false If set to true, cursor will not be hidden when mouse cursor moves out of the plot area.
- **behavior** (`"zoomX" | "zoomY" | "zoomXY" | "selectX" | "selectY" | "selectXY" | "none"`) — Default "none" What should cursor do when dragged across plot area. Click here for more info
- **moveThreshold** (`undefined | number`) — Default 1 Minimum distance in pixels between down and up points. If a distance is less than the value of moveThreshold, the zoom or selection won't happen. @since 5.2.20
- **positionX** (`undefined | number`) — Cursor's horizontal position relative to plot area. If this setting is set, cursor will not react to mouse/touch and will just sit at specified position until positionX is reset to undefined. 0 - left, 1 - right.
- **positionY** (`undefined | number`) — Cursor's vertical position relative to plot area. If this setting is set, cursor will not react to mouse/touch and will just sit at specified position until positionY is reset to undefined. 0 - left, 1 - right.
- **snapToSeries** (`Array`) — A list of series to snap cursor to. If set, the cursor will always snap to the closest data item of listed series.
- **snapToSeriesBy** (`"xy" | "x" | "y" | "x!" | "y!"`) — Default "xy" Defines in which direction to look when searching for the nearest data item to snap to. Possible values: "xy" (default), "x", "y", "x!", "y!". Click here for more info @since 5.0.6
- **syncWith** (`Array`) — An array of other XYCursor objects to sync this cursor with. If set will automatically move synced cursors to the same position within their respective axes as the this cursor assumin same XY coordinates of the pointer. NOTE: Syncing is performed using actual X/Y coordinates of the point of mouse cursor's position or touch. It means that they will not sync by axis positions, but rather by screen coordinates. For example vertical lines will not sync across horizontally laid out charts, and vice versa. Click here for more info @since 5.1.4
- **xAxis** (`Axis`) — Cursor's X axis. If set, cursor will snap to that axis' cells.

## Properties

- **chart** (`XYChart | undefined`) — A chart cursor is attached to.
- **lineX** (`Grid`) — Default Grid.new() A Grid elment that used for horizontal line of the cursor crosshair.
- **lineY** (`Grid`) — Default Grid.new() A Grid elment that used for horizontal line of the cursor crosshair.
- **selection** (`Graphics`) — Default Graphics.new() An element that represents current selection.
