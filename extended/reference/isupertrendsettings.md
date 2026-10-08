---
title: "ISuperTrendSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/isupertrendsettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IIndicatorSettings
All ancestors: IIndicatorSettings, IContainerSettings, ISpriteSettings, IEntitySettings
Settings of: `am5stock.SuperTrend` (see its page for the class)
TypeScript: `am5stock.ISuperTrendSettings` (`import type { ISuperTrendSettings } from "@amcharts/amcharts5/stock"`)

## Settings

- **upperColor** (`Color`) — default `root.interfaceColors.get("negative")` _(theme)_ — Color of the line above the price, shown in a downtrend, and of its fill.
- **lowerColor** (`Color`) — default `root.interfaceColors.get("positive")` _(theme)_ — Color of the line below the price, shown in an uptrend, and of its fill.
- **multiplier** (`number`) — default `3` _(theme)_ — Distance of the line from the middle of the high-low range, in average true ranges.

## Inherited settings with a different default on SuperTrend

- **name** (`string`) — default `root.language.translateAny("Super Trend")` _(theme)_ — _from IIndicatorSettings_ — Name of the indicator, such as "Moving Average".
- **period** (`number`) — default `10` _(theme)_ — _from IIndicatorSettings_ — Number of data items each value is calculated over.
- **position** (`"absolute" | "relative"`) — default `"absolute"` _(theme)_ — _from ISpriteSettings_ — Positioning of the element. `"absolute"` leaves the element out of its parent's layout and size: it is placed by its `x` and `y` only.
- **shortName** (`string`) — default `root.language.translateAny("Super Trend")` _(theme)_ — _from IIndicatorSettings_ — Short name of the indicator, such as "MA", shown in the legend.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IIndicatorSettings")`) for types, defaults and descriptions.

- _IIndicatorSettings_: autoOpenSettings, field, legend, seriesColor, stockChart, stockSeries, volumeSeries
- _IContainerSettings_: background, html, interactiveChildren, layout, mask, maskContent, paddingBottom, paddingLeft, paddingRight, paddingTop, reverseChildren, setStateOnChildren, verticalScrollbar
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, height, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, width, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
