---
title: "ICategoryAxisSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/icategoryaxissettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IAxisSettings
All ancestors: IAxisSettings, IComponentSettings, IContainerSettings, ISpriteSettings, IEntitySettings
Settings of: `am5xy.CategoryAxis` (see its page for the class)
TypeScript: `am5xy.ICategoryAxisSettings` (`import type { ICategoryAxisSettings } from "@amcharts/amcharts5/xy"`)

## Settings

- **fillRule** (`(dataItem: DataItem<ICategoryAxisDataItem>, index?: number) => void`) — default `(function)` _(theme)_ — Function that decides which axis fills show; it is called for each category with its index. The default fills every other category. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/axes/#Axis_fills
- **categoryField** (`string`) — Field in the data that holds the category names.
- **idField** (`string`) — Field in the data that holds a unique id for each category.
- **cellSizeField** (`string`) — Field in the data that holds each category's relative size: a category of `2` takes twice the room of one of `1`. Categories without it get `1`.
- **startLocation** (`number`) — default `0` _(theme)_ — Where within the first category the axis starts, from `0` (its start) to `1` (its end): `0.5` cuts off the first half of the first category.
- **endLocation** (`number`) — default `1` _(theme)_ — Where within the last category the axis ends, from `0` (its start) to `1` (its end): `0.5` cuts off the second half of the last category.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IAxisSettings")`) for types, defaults and descriptions.

- _IAxisSettings_: baseValue, bullet, end, fixAxisSize, maxDeviation, maxZoomCount, maxZoomFactor, minorAxisFillsEnabled, minZoomCount, panX, panY, renderer, snapTooltip, start, tooltip, tooltipLocation, zoomable, zoomOut, zoomX, zoomY
- _IComponentSettings_: interpolationDuration, interpolationEasing
- _IContainerSettings_: background, html, interactiveChildren, layout, mask, maskContent, paddingBottom, paddingLeft, paddingRight, paddingTop, reverseChildren, setStateOnChildren, verticalScrollbar
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, height, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, position, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, width, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
