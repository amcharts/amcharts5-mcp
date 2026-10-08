---
title: "IIndicatorSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iindicatorsettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IContainerSettings
All ancestors: IContainerSettings, ISpriteSettings, IEntitySettings
Settings of: `am5stock.Indicator` (see its page for the class)
TypeScript: `am5stock.IIndicatorSettings` (`import type { IIndicatorSettings } from "@amcharts/amcharts5/stock"`)

## Settings

- **stockChart** (`StockChart`) — The `StockChart` the indicator belongs to.
- **stockSeries** (`XYSeries`) — The series whose data the indicator is calculated from.
- **volumeSeries** (`XYSeries`) — The volume series, for indicators that use volume.
- **legend** (`StockLegend`) — A `StockLegend` to add the indicator to.
- **period** (`number`) — Number of data items each value is calculated over.
- **field** (`"open" | "high" | "low" | "close" | "hl/2" | "hlc/3" | "hlcc/4" | "ohlc/4"`) — Price to calculate from: `"open"`, `"close"`, `"low"`, `"high"`, or an average such as `"hl/2"` (high and low) or `"ohlc/4"` (all four).
- **name** (`string`) — Name of the indicator, such as "Moving Average".
- **shortName** (`string`) — Short name of the indicator, such as "MA", shown in the legend.
- **seriesColor** (`Color`) — Color of the indicator's series.
- **autoOpenSettings** (`boolean`) — default `true` _(theme)_ — Opens the indicator's settings modal when the indicator is added from an `IndicatorControl`. _Since 5.10.6._

## Inherited settings with a different default on Indicator

- **position** (`"absolute" | "relative"`) — default `"absolute"` _(theme)_ — _from ISpriteSettings_ — Positioning of the element. `"absolute"` leaves the element out of its parent's layout and size: it is placed by its `x` and `y` only.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IContainerSettings")`) for types, defaults and descriptions.

- _IContainerSettings_: background, html, interactiveChildren, layout, mask, maskContent, paddingBottom, paddingLeft, paddingRight, paddingTop, reverseChildren, setStateOnChildren, verticalScrollbar
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, height, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, width, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
