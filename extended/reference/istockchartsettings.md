---
title: "IStockChartSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/istockchartsettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IContainerSettings
All ancestors: IContainerSettings, ISpriteSettings, IEntitySettings
Settings of: `am5stock.StockChart` (see its page for the class)
TypeScript: `am5stock.IStockChartSettings` (`import type { IStockChartSettings } from "@amcharts/amcharts5/stock"`)

## Settings

- **stockSeries** (`XYSeries`) — The main price series. Indicators are calculated from it, compared series are added to its panel, and drawings snap to it. Docs: https://www.amcharts.com/docs/v5/charts/stock/#Setting_main_series
- **volumeSeries** (`XYSeries`) — The main volume series, used by volume-based indicators. Docs: https://www.amcharts.com/docs/v5/charts/stock/#Setting_main_series
- **comparingSeriesSettings** (`Partial<IXYSeriesSettings>`) — _(internal)_
- **percentScaleSeriesSettings** (`Partial<IXYSeriesSettings>`) — default `{ valueYShow: "valueYChangeSelectionPercent", openValueYShow: "openValueYChangeSelectionPercent", highValueYShow: "highValueYChangeSelectionPercent", lowValueYShow: "lowValueYChangeSelectionPercent" }` _(theme)_ — Settings applied to the series on the main series' Y axis while the chart is in percent scale mode. Docs: https://www.amcharts.com/docs/v5/charts/stock/percent-mode/#Configuring
- **percentScaleValueAxisSettings** (`Partial<IValueAxisSettings<AxisRenderer>>`) — default `{ numberFormat: "#.##'%'", interpolationDuration: 0, extraMax: 0.05, strictMinMaxSelection: true }` _(theme)_ — Settings applied to the main series' `ValueAxis` while the chart is in percent scale mode. Docs: https://www.amcharts.com/docs/v5/charts/stock/percent-mode/#Configuring
- **autoSetPercentScale** (`boolean`) — default `true` _(theme)_ — Turns percent scale mode on when a compared series is added, and off when the last one is removed. Docs: https://www.amcharts.com/docs/v5/charts/stock/percent-mode/
- **stockPositiveColor** (`Color`) — default `root.interfaceColors.get("positive")` _(code fallback)_ — Color of the `stockSeries` candles or columns that close at or above their open. Docs: https://www.amcharts.com/docs/v5/charts/stock/#Positive_negative_colors
- **stockNegativeColor** (`Color`) — default `root.interfaceColors.get("negative")` _(code fallback)_ — Color of the `stockSeries` candles or columns that close below their open. Docs: https://www.amcharts.com/docs/v5/charts/stock/#Positive_negative_colors
- **volumePositiveColor** (`Color`) — default `root.interfaceColors.get("positive", am5.Color.fromHex(0x00FF00))` _(code fallback)_ — Color that `getVolumeColor()` returns for a volume column whose `stockSeries` close is at or above the previous close. Docs: https://www.amcharts.com/docs/v5/charts/stock/#Positive_negative_colors
- **volumeNegativeColor** (`Color`) — default `root.interfaceColors.get("negative", am5.Color.fromHex(0xff0000))` _(code fallback)_ — Color that `getVolumeColor()` returns for a volume column whose `stockSeries` close is below the previous close. Docs: https://www.amcharts.com/docs/v5/charts/stock/#Positive_negative_colors
- **drawingSelectionEnabled** (`boolean`) — default `false` — Makes drawings selectable, so they can be moved, rotated or deleted. Turns `erasingEnabled` off. _Since 5.9.1._
- **erasingEnabled** (`boolean`) — default `false` — Deletes a drawing when it is clicked. Turns drawing selection off. _Since 5.9.2._
- **hideDrawingGrips** (`boolean`) — default `false` — Hides the drawings' grips while drawing mode is off. _Since 5.10.6._
- **autoHidePanelControls** (`boolean`) — default `false` _(theme)_ — Hides each panel's controls until the pointer is over that panel's plot area. _Since 5.13.0._

## Inherited settings with a different default on StockChart

- **height** (`number | Percent`) — default `am5.p100` _(theme)_ — _from ISpriteSettings_ — Height in pixels, or a `Percent` of the parent's inner height. In a vertical layout, a percent height is a share of the height the other children leave.
- **layout** (`Layout`) — default `root.verticalLayout` _(theme)_ — _from IContainerSettings_ — How children are arranged, e.g. `root.horizontalLayout`, `root.verticalLayout` or `root.gridLayout`. Without a layout, children are placed by their own `x` and `y`. Docs: https://www.amcharts.com/docs/v5/concepts/containers/#Layout
- **paddingBottom** (`number`) — default `15` _(theme)_ — _from IContainerSettings_ — Bottom padding in pixels.
- **paddingLeft** (`number`) — default `18` _(theme)_ — _from IContainerSettings_ — Left padding in pixels.
- **paddingRight** (`number`) — default `18` _(theme)_ — _from IContainerSettings_ — Right padding in pixels.
- **paddingTop** (`number`) — default `5` _(theme)_ — _from IContainerSettings_ — Top padding in pixels.
- **width** (`number | Percent`) — default `am5.p100` _(theme)_ — _from ISpriteSettings_ — Width in pixels, or a `Percent` of the parent's inner width. In a horizontal layout, a percent width is a share of the width the other children leave.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IContainerSettings")`) for types, defaults and descriptions.

- _IContainerSettings_: background, html, interactiveChildren, mask, maskContent, reverseChildren, setStateOnChildren, verticalScrollbar
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, position, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
