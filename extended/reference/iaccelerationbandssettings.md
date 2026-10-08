---
title: "IAccelerationBandsSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iaccelerationbandssettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IIndicatorSettings
All ancestors: IIndicatorSettings, IContainerSettings, ISpriteSettings, IEntitySettings
Settings of: `am5stock.AccelerationBands` (see its page for the class)
TypeScript: `am5stock.IAccelerationBandsSettings` (`import type { IAccelerationBandsSettings } from "@amcharts/amcharts5/stock"`)

## Settings

- **upperColor** (`Color`) — default `am5.color(0xe64c9b)` _(theme)_ — Color of the upper band.
- **lowerColor** (`Color`) — default `am5.color(0xe64c9b)` _(theme)_ — Color of the lower band.
- **factor** (`number`) — default `0.001` _(theme)_ — Width of the bands, in thousandths: the default `0.001` gives the standard Acceleration Bands, `high * (1 + 4 * (high - low) / (high + low))`, and `0.002` puts them twice as far out. The settings modal shows the value times 1000, so `0.001` reads `1`.

## Inherited settings with a different default on AccelerationBands

- **name** (`string`) — default `root.language.translateAny("Acceleration Bands")` _(theme)_ — _from IIndicatorSettings_ — Name of the indicator, such as "Moving Average".
- **period** (`number`) — default `20` _(theme)_ — _from IIndicatorSettings_ — Number of data items each value is calculated over.
- **position** (`"absolute" | "relative"`) — default `"absolute"` _(theme)_ — _from ISpriteSettings_ — Positioning of the element. `"absolute"` leaves the element out of its parent's layout and size: it is placed by its `x` and `y` only.
- **seriesColor** (`Color`) — default `am5.color(0xff903f)` _(theme)_ — _from IIndicatorSettings_ — Color of the indicator's series.
- **shortName** (`string`) — default `root.language.translateAny("Acceleration")` _(theme)_ — _from IIndicatorSettings_ — Short name of the indicator, such as "MA", shown in the legend.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IIndicatorSettings")`) for types, defaults and descriptions.

- _IIndicatorSettings_: autoOpenSettings, field, legend, stockChart, stockSeries, volumeSeries
- _IContainerSettings_: background, html, interactiveChildren, layout, mask, maskContent, paddingBottom, paddingLeft, paddingRight, paddingTop, reverseChildren, setStateOnChildren, verticalScrollbar
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, height, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, width, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
