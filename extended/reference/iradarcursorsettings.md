---
title: "IRadarCursorSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iradarcursorsettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IXYCursorSettings
All ancestors: IXYCursorSettings, IContainerSettings, ISpriteSettings, IEntitySettings
Settings of: `am5radar.RadarCursor` (see its page for the class)
TypeScript: `am5radar.IRadarCursorSettings` (`import type { IRadarCursorSettings } from "@amcharts/amcharts5/radar"`)

## Settings

- **innerRadius** (`number | Percent`) — Inner radius of the area the cursor works in, in pixels or as a percent of the chart's radius. A negative value is measured in from the chart's radius. If not set, the chart's `innerRadius` is used.
- **radius** (`number | Percent`) — Outer radius of the area the cursor works in, in pixels or as a percent of the chart's radius.
- **startAngle** (`number`) — Angle in degrees where the area the cursor works in starts. If not set, the chart's `startAngle` is used.
- **endAngle** (`number`) — Angle in degrees where the area the cursor works in ends. If not set, the chart's `endAngle` is used.

## Inherited settings with a different default on RadarCursor

- **exportable** (`boolean`) — default `false` _(theme)_ — _from ISpriteSettings_ — If `false`, the element is left out of exported images of the chart.
- **layer** (`number`) — default `30` _(theme)_ — _from ISpriteSettings_ — Layer to draw the element on: elements on higher layers show in front of those on lower ones. If not set, the element is on its parent's layer.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IXYCursorSettings")`) for types, defaults and descriptions.

- _IXYCursorSettings_: alwaysShow, behavior, clickTolerance, moveThreshold, positionX, positionY, snapToSeries, snapToSeriesBy, syncWith, xAxis, yAxis
- _IContainerSettings_: background, html, interactiveChildren, layout, mask, maskContent, paddingBottom, paddingLeft, paddingRight, paddingTop, reverseChildren, setStateOnChildren, verticalScrollbar
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, filter, focusable, focusableGroup, forceHidden, forceInactive, height, hoverOnFocus, hue, interactive, invert, isMeasured, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, position, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, width, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
