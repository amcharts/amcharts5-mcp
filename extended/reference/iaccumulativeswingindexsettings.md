---
title: "IAccumulativeSwingIndexSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iaccumulativeswingindexsettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IChartIndicatorSettings
All ancestors: IChartIndicatorSettings, IIndicatorSettings, IContainerSettings, ISpriteSettings, IEntitySettings
Settings of: `am5stock.AccumulativeSwingIndex` (see its page for the class)
TypeScript: `am5stock.IAccumulativeSwingIndexSettings` (`import type { IAccumulativeSwingIndexSettings } from "@amcharts/amcharts5/stock"`)

## Settings

- **limitMoveValue** (`number`) — default `1000` _(theme)_ — Limit move: the largest price change allowed in one data item (`T` in Wilder's formula). The swing index is divided by it.
- **positiveColor** (`Color`) — default `root.interfaceColors.get("positive")` _(theme)_ — Color of the line above zero.
- **negativeColor** (`Color`) — default `root.interfaceColors.get("negative")` _(theme)_ — Color of the line below zero.

## Inherited settings with a different default on AccumulativeSwingIndex

- **name** (`string`) — default `root.language.translateAny("Accumulative Swing Index")` _(theme)_ — _from IIndicatorSettings_ — Name of the indicator, such as "Moving Average".
- **position** (`"absolute" | "relative"`) — default `"absolute"` _(theme)_ — _from ISpriteSettings_ — Positioning of the element. `"absolute"` leaves the element out of its parent's layout and size: it is placed by its `x` and `y` only.
- **shortName** (`string`) — default `root.language.translateAny("ACC Swing")` _(theme)_ — _from IIndicatorSettings_ — Short name of the indicator, such as "MA", shown in the legend.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IIndicatorSettings")`) for types, defaults and descriptions.

- _IIndicatorSettings_: autoOpenSettings, field, legend, period, seriesColor, stockChart, stockSeries, volumeSeries
- _IContainerSettings_: background, html, interactiveChildren, layout, mask, maskContent, paddingBottom, paddingLeft, paddingRight, paddingTop, reverseChildren, setStateOnChildren, verticalScrollbar
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, height, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, width, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
