---
title: "ICurveCursorSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/icurvecursorsettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IXYCursorSettings
All ancestors: IXYCursorSettings, IContainerSettings, ISpriteSettings, IEntitySettings
Settings of: `am5timeline.CurveCursor` (see its page for the class)
TypeScript: `am5timeline.ICurveCursorSettings` (`import type { ICurveCursorSettings } from "@amcharts/amcharts5/timeline"`)

## Settings

- **xAxis** (`Axis<AxisRendererCurveX>`) — X axis the cursor works along. Unlike on an `XYChart`, it is required.
- **yAxis** (`Axis<AxisRendererCurveY>`) — Y axis the cursor works along. Unlike on an `XYChart`, it is required.

## Inherited settings with a different default on CurveCursor

- **exportable** (`boolean`) — default `false` _(theme)_ — _from ISpriteSettings_ — If `false`, the element is left out of exported images of the chart.
- **layer** (`number`) — default `30` _(theme)_ — _from ISpriteSettings_ — Layer to draw the element on: elements on higher layers show in front of those on lower ones. If not set, the element is on its parent's layer.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IXYCursorSettings")`) for types, defaults and descriptions.

- _IXYCursorSettings_: alwaysShow, behavior, clickTolerance, moveThreshold, positionX, positionY, snapToSeries, snapToSeriesBy, syncWith
- _IContainerSettings_: background, html, interactiveChildren, layout, mask, maskContent, paddingBottom, paddingLeft, paddingRight, paddingTop, reverseChildren, setStateOnChildren, verticalScrollbar
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, filter, focusable, focusableGroup, forceHidden, forceInactive, height, hoverOnFocus, hue, interactive, invert, isMeasured, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, position, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, width, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
