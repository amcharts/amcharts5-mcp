---
title: "IMovingAverageDeviationSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/imovingaveragedeviationsettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IChartIndicatorSettings
All ancestors: IChartIndicatorSettings, IIndicatorSettings, IContainerSettings, ISpriteSettings, IEntitySettings
Settings of: `am5stock.MovingAverageDeviation` (see its page for the class)
TypeScript: `am5stock.IMovingAverageDeviationSettings` (`import type { IMovingAverageDeviationSettings } from "@amcharts/amcharts5/stock"`)

## Settings

- **increasingColor** (`Color`) — default `root.interfaceColors.get("positive")` _(theme)_ — Color of columns higher than the previous one.
- **decreasingColor** (`Color`) — default `root.interfaceColors.get("negative")` _(theme)_ — Color of columns lower than the previous one.
- **maType** (`"simple" | "weighted" | "exponential" | "dema" | "tema"`) — default `"simple"` _(theme)_ — Kind of moving average: `"simple"`, `"weighted"`, `"exponential"`, `"dema"` (double exponential) or `"tema"` (triple exponential).
- **type** (`"simple" | "weighted" | "exponential" | "dema" | "tema"`) — _(internal)_ Type of the moving average. Left for backward compatibility. Please use `maType` instead. _Note:_ Deprecated since 5.18.0: use `maType`.
- **unit** (`"points" | "percent"`) — default `"points"` — Unit of the deviation: `"points"` (price units) or `"percent"` of the moving average.

## Inherited settings with a different default on MovingAverageDeviation

- **field** (`"open" | "high" | "low" | "close" | "hl/2" | "hlc/3" | "hlcc/4" | "ohlc/4"`) — default `"close"` _(theme)_ — _from IIndicatorSettings_ — Price to calculate from: `"open"`, `"close"`, `"low"`, `"high"`, or an average such as `"hl/2"` (high and low) or `"ohlc/4"` (all four).
- **name** (`string`) — default `root.language.translateAny("Moving Average Deviation")` _(theme)_ — _from IIndicatorSettings_ — Name of the indicator, such as "Moving Average".
- **period** (`number`) — default `20` _(theme)_ — _from IIndicatorSettings_ — Number of data items each value is calculated over.
- **position** (`"absolute" | "relative"`) — default `"absolute"` _(theme)_ — _from ISpriteSettings_ — Positioning of the element. `"absolute"` leaves the element out of its parent's layout and size: it is placed by its `x` and `y` only.
- **shortName** (`string`) — default `root.language.translateAny("MA Dev")` _(theme)_ — _from IIndicatorSettings_ — Short name of the indicator, such as "MA", shown in the legend.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IIndicatorSettings")`) for types, defaults and descriptions.

- _IIndicatorSettings_: autoOpenSettings, legend, seriesColor, stockChart, stockSeries, volumeSeries
- _IContainerSettings_: background, html, interactiveChildren, layout, mask, maskContent, paddingBottom, paddingLeft, paddingRight, paddingTop, reverseChildren, setStateOnChildren, verticalScrollbar
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, height, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, width, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
