---
title: "IVolumeProfileSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ivolumeprofilesettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IIndicatorSettings
All ancestors: IIndicatorSettings, IContainerSettings, ISpriteSettings, IEntitySettings
Settings of: `am5stock.VolumeProfile` (see its page for the class)
TypeScript: `am5stock.IVolumeProfileSettings` (`import type { IVolumeProfileSettings } from "@amcharts/amcharts5/stock"`)

## Settings

- **upColor** (`Color`) — default `am5.Color.fromHex(0xE3B30C)` _(theme)_ — Color of the up volume part of each row.
- **downColor** (`Color`) — default `am5.Color.fromHex(0x2E78E3)` _(theme)_ — Color of the down volume part of each row.
- **countType** (`"rows" | "ticks"`) — default `"rows"` _(theme)_ — How the price range is split into rows: `"rows"` into `count` rows of equal height, `"ticks"` into rows `count` ticks tall.
- **count** (`number`) — default `24` _(theme)_ — Number of rows, or with `countType: "ticks"`, the height of a row in ticks of `0.01`.
- **axisWidth** (`number`) — default `40` _(theme)_ — Width of the profile's longest row, in percent of the plot area width.
- **valueArea** (`number`) — default `70` _(theme)_ — Percent of the visible range's volume to highlight as the value area: the rows around the row with the most volume.
- **valueAreaOpacity** (`number`) — default `0.7` _(theme)_ — Fill opacity of the rows in the value area.
- **volumeSeries** (`XYSeries`) — The volume series to build the profile from. Required.

## Inherited settings with a different default on VolumeProfile

- **name** (`string`) — default `root.language.translateAny("Volume Profile")` _(theme)_ — _from IIndicatorSettings_ — Name of the indicator, such as "Moving Average".
- **position** (`"absolute" | "relative"`) — default `"absolute"` _(theme)_ — _from ISpriteSettings_ — Positioning of the element. `"absolute"` leaves the element out of its parent's layout and size: it is placed by its `x` and `y` only.
- **shortName** (`string`) — default `root.language.translateAny("Volume Profile")` _(theme)_ — _from IIndicatorSettings_ — Short name of the indicator, such as "MA", shown in the legend.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IIndicatorSettings")`) for types, defaults and descriptions.

- _IIndicatorSettings_: autoOpenSettings, field, legend, period, seriesColor, stockChart, stockSeries
- _IContainerSettings_: background, html, interactiveChildren, layout, mask, maskContent, paddingBottom, paddingLeft, paddingRight, paddingTop, reverseChildren, setStateOnChildren, verticalScrollbar
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, height, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, width, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
