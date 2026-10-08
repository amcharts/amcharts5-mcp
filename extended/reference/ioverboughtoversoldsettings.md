---
title: "IOverboughtOversoldSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ioverboughtoversoldsettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IChartIndicatorSettings
All ancestors: IChartIndicatorSettings, IIndicatorSettings, IContainerSettings, ISpriteSettings, IEntitySettings
Settings of: `am5stock.OverboughtOversold` (see its page for the class)
TypeScript: `am5stock.IOverboughtOversoldSettings` (`import type { IOverboughtOversoldSettings } from "@amcharts/amcharts5/stock"`)

## Settings

- **overBought** (`number`) — default `0` _(code fallback)_ — Level above which the value counts as overbought. It is drawn as a line with a grip that can be dragged to change it.
- **overSold** (`number`) — default `0` _(code fallback)_ — Level below which the value counts as oversold. It is drawn as a line with a grip that can be dragged to change it.
- **overBoughtColor** (`Color`) — Color of the overbought line, its label and the part of the series above it.
- **overSoldColor** (`Color`) — Color of the oversold line, its label and the part of the series below it.

## Inherited settings with a different default on OverboughtOversold

- **position** (`"absolute" | "relative"`) — default `"absolute"` _(theme)_ — _from ISpriteSettings_ — Positioning of the element. `"absolute"` leaves the element out of its parent's layout and size: it is placed by its `x` and `y` only.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IIndicatorSettings")`) for types, defaults and descriptions.

- _IIndicatorSettings_: autoOpenSettings, field, legend, name, period, seriesColor, shortName, stockChart, stockSeries, volumeSeries
- _IContainerSettings_: background, html, interactiveChildren, layout, mask, maskContent, paddingBottom, paddingLeft, paddingRight, paddingTop, reverseChildren, setStateOnChildren, verticalScrollbar
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, height, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, width, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
