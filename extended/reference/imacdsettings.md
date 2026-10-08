---
title: "IMACDSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/imacdsettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IChartIndicatorSettings
All ancestors: IChartIndicatorSettings, IIndicatorSettings, IContainerSettings, ISpriteSettings, IEntitySettings
Settings of: `am5stock.MACD` (see its page for the class)
TypeScript: `am5stock.IMACDSettings` (`import type { IMACDSettings } from "@amcharts/amcharts5/stock"`)

## Settings

- **increasingColor** (`Color`) — default `root.interfaceColors.get("positive")` _(theme)_ — Color of difference columns higher than the previous one.
- **decreasingColor** (`Color`) — default `root.interfaceColors.get("negative")` _(theme)_ — Color of difference columns lower than the previous one.
- **signalColor** (`Color`) — default `am5.color(0xff903f)` _(theme)_ — Color of the signal line.
- **fastPeriod** (`number`) — default `12` _(theme)_ — Period of the fast exponential moving average.
- **slowPeriod** (`number`) — default `26` _(theme)_ — Period of the slow exponential moving average.
- **signalPeriod** (`number`) — default `9` _(theme)_ — Period of the signal line, an exponential moving average of the MACD line.

## Inherited settings with a different default on MACD

- **field** (`"open" | "high" | "low" | "close" | "hl/2" | "hlc/3" | "hlcc/4" | "ohlc/4"`) — default `"close"` _(theme)_ — _from IIndicatorSettings_ — Price to calculate from: `"open"`, `"close"`, `"low"`, `"high"`, or an average such as `"hl/2"` (high and low) or `"ohlc/4"` (all four).
- **name** (`string`) — default `root.language.translateAny("MACD")` _(theme)_ — _from IIndicatorSettings_ — Name of the indicator, such as "Moving Average".
- **position** (`"absolute" | "relative"`) — default `"absolute"` _(theme)_ — _from ISpriteSettings_ — Positioning of the element. `"absolute"` leaves the element out of its parent's layout and size: it is placed by its `x` and `y` only.
- **seriesColor** (`Color`) — default `am5.color(0xab82da)` _(theme)_ — _from IIndicatorSettings_ — Color of the indicator's series.
- **shortName** (`string`) — default `root.language.translateAny("MACD")` _(theme)_ — _from IIndicatorSettings_ — Short name of the indicator, such as "MA", shown in the legend.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IIndicatorSettings")`) for types, defaults and descriptions.

- _IIndicatorSettings_: autoOpenSettings, legend, period, stockChart, stockSeries, volumeSeries
- _IContainerSettings_: background, html, interactiveChildren, layout, mask, maskContent, paddingBottom, paddingLeft, paddingRight, paddingTop, reverseChildren, setStateOnChildren, verticalScrollbar
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, height, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, width, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
