---
title: "IRelativeStrengthIndexSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/irelativestrengthindexsettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IOverboughtOversoldSettings
All ancestors: IOverboughtOversoldSettings, IChartIndicatorSettings, IIndicatorSettings, IContainerSettings, ISpriteSettings, IEntitySettings
Settings of: `am5stock.RelativeStrengthIndex` (see its page for the class)
TypeScript: `am5stock.IRelativeStrengthIndexSettings` (`import type { IRelativeStrengthIndexSettings } from "@amcharts/amcharts5/stock"`)

## Settings

- **smaPeriod** (`number`) — default `3` _(theme)_ — Period of the simple moving average of the RSI, drawn as a second line.
- **smaColor** (`Color`) — default `am5.color(0xff903f)` _(theme)_ — Color of the moving average line.

## Inherited settings with a different default on RelativeStrengthIndex

- **field** (`"open" | "high" | "low" | "close" | "hl/2" | "hlc/3" | "hlcc/4" | "ohlc/4"`) — default `"close"` _(theme)_ — _from IIndicatorSettings_ — Price to calculate from: `"open"`, `"close"`, `"low"`, `"high"`, or an average such as `"hl/2"` (high and low) or `"ohlc/4"` (all four).
- **name** (`string`) — default `root.language.translateAny("Relative Strength Index")` _(theme)_ — _from IIndicatorSettings_ — Name of the indicator, such as "Moving Average".
- **overBought** (`number`) — default `80` _(theme)_ — _from IOverboughtOversoldSettings_ — Level above which the value counts as overbought. It is drawn as a line with a grip that can be dragged to change it.
- **overBoughtColor** (`Color`) — default `am5.color(0x67b7dc)` _(theme)_ — _from IOverboughtOversoldSettings_ — Color of the overbought line, its label and the part of the series above it.
- **overSold** (`number`) — default `20` _(theme)_ — _from IOverboughtOversoldSettings_ — Level below which the value counts as oversold. It is drawn as a line with a grip that can be dragged to change it.
- **overSoldColor** (`Color`) — default `am5.color(0xe40000)` _(theme)_ — _from IOverboughtOversoldSettings_ — Color of the oversold line, its label and the part of the series below it.
- **period** (`number`) — default `14` _(theme)_ — _from IIndicatorSettings_ — Number of data items each value is calculated over.
- **position** (`"absolute" | "relative"`) — default `"absolute"` _(theme)_ — _from ISpriteSettings_ — Positioning of the element. `"absolute"` leaves the element out of its parent's layout and size: it is placed by its `x` and `y` only.
- **seriesColor** (`Color`) — default `am5.color(0xab82da)` _(theme)_ — _from IIndicatorSettings_ — Color of the indicator's series.
- **shortName** (`string`) — default `root.language.translateAny("RSI")` _(theme)_ — _from IIndicatorSettings_ — Short name of the indicator, such as "MA", shown in the legend.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IIndicatorSettings")`) for types, defaults and descriptions.

- _IIndicatorSettings_: autoOpenSettings, legend, stockChart, stockSeries, volumeSeries
- _IContainerSettings_: background, html, interactiveChildren, layout, mask, maskContent, paddingBottom, paddingLeft, paddingRight, paddingTop, reverseChildren, setStateOnChildren, verticalScrollbar
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, height, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, width, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
