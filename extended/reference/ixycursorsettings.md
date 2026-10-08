---
title: "IXYCursorSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ixycursorsettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IContainerSettings
All ancestors: IContainerSettings, ISpriteSettings, IEntitySettings
Settings of: `am5xy.XYCursor` (see its page for the class)
TypeScript: `am5xy.IXYCursorSettings` (`import type { IXYCursorSettings } from "@amcharts/amcharts5/xy"`)

## Settings

- **xAxis** (`Axis<AxisRenderer>`) — X axis for the vertical line to snap to. When that axis has a `tooltip`, the line follows it from cell to cell, such as from category to category.
- **yAxis** (`Axis<AxisRenderer>`) — Y axis for the horizontal line to snap to. When that axis has a `tooltip`, the line follows it from cell to cell.
- **behavior** (`"none" | "zoomX" | "zoomY" | "zoomXY" | "selectX" | "selectY" | "selectXY"`) — default `"none"` _(theme)_ — What dragging across the plot area does: zoom or select along X, Y or both. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/#Behavior
- **positionX** (`number`) — Pins the cursor at this horizontal position in the plot area: `0` is the left edge, `1` the right. While set, the cursor ignores the pointer.
- **positionY** (`number`) — Pins the cursor at this vertical position in the plot area: `0` is the top edge, `1` the bottom. While set, the cursor ignores the pointer.
- **alwaysShow** (`boolean`) — default `false` — Keeps the cursor visible when the pointer leaves the plot area.
- **snapToSeries** (`XYSeries[]`) — Series to snap to: the cursor jumps to the nearest data item among them.
- **snapToSeriesBy** (`"xy" | "x" | "y" | "x!" | "y!"`) — default `"xy"` _(theme)_ — How `snapToSeries` measures "nearest": `"xy"` by straight distance, `"x"` or `"y"` along one direction only. `"x!"` and `"y!"` do the same, but only among the items under the pointer, one per series. _Since 5.0.6._ Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/#snapping-to-series
- **syncWith** (`XYCursor[]`) — Cursors of other charts that move along with this one. They sync by position on the page, not by axis value, so vertical lines follow each other only between charts stacked one above another, and horizontal lines only between charts side by side. _Since 5.1.4._ Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/#syncing-cursors
- **moveThreshold** (`number`) — default `1` _(theme)_ — How far in pixels the pointer must move between press and release for a drag to zoom or select. A shorter move counts as a click. _Since 5.2.20._
- **clickTolerance** (`number`) — default `0` — How far in pixels outside the plot area a press may start and still begin a zoom or selection, which then starts at the plot area's edge. Makes it easier to select from the very edge. _Since 5.20.0._

## Inherited settings with a different default on XYCursor

- **exportable** (`boolean`) — default `false` _(theme)_ — _from ISpriteSettings_ — If `false`, the element is left out of exported images of the chart.
- **layer** (`number`) — default `30` _(theme)_ — _from ISpriteSettings_ — Layer to draw the element on: elements on higher layers show in front of those on lower ones. If not set, the element is on its parent's layer.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IContainerSettings")`) for types, defaults and descriptions.

- _IContainerSettings_: background, html, interactiveChildren, layout, mask, maskContent, paddingBottom, paddingLeft, paddingRight, paddingTop, reverseChildren, setStateOnChildren, verticalScrollbar
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, filter, focusable, focusableGroup, forceHidden, forceInactive, height, hoverOnFocus, hue, interactive, invert, isMeasured, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, position, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, width, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
