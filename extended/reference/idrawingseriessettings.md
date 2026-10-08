---
title: "IDrawingSeriesSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/idrawingseriessettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: ILineSeriesSettings
All ancestors: ILineSeriesSettings, IXYSeriesSettings, ISeriesSettings, IComponentSettings, IContainerSettings, ISpriteSettings, IEntitySettings
Settings of: `am5stock.DrawingSeries` (see its page for the class)
TypeScript: `am5stock.IDrawingSeriesSettings` (`import type { IDrawingSeriesSettings } from "@amcharts/amcharts5/stock"`)

## Settings

- **xAxis** (`DateAxis<AxisRenderer>`) — The date axis the drawings' points are placed on.
- **yAxis** (`ValueAxis<AxisRenderer>`) — The value axis the drawings' points are placed on.
- **strokeColor** (`Color`) — Line color of new drawings and, when changed, of the selected ones.
- **fillColor** (`Color`) — Fill color of new drawings and, when changed, of the selected ones.
- **strokeOpacity** (`number`) — Line opacity (`0` to `1`) of new drawings and, when changed, of the selected ones.
- **fillOpacity** (`number`) — Fill opacity (`0` to `1`) of new drawings and, when changed, of the selected ones.
- **strokeWidth** (`number`) — Line width in pixels of new drawings and, when changed, of the selected ones.
- **strokeDasharray** (`number[]`) — Dash pattern of the lines, such as `[4, 2]`, for new drawings and, when changed, for the selected ones.
- **series** (`XYSeries`) — The series the drawings snap to with `snapToData`, usually the main series. The drawing series also finds its `StockChart` through it.
- **snapToData** (`boolean`) — _(internal)_ Indicates if drawings should snap to x and y values.
- **field** (`"open" | "high" | "low" | "value"`) — default `"value"` _(theme)_ — Value of `series` that snapping, averages and regressions use: `"value"` (the close), `"open"`, `"low"` or `"high"`.
- **selectorPadding** (`number`) — default `10` _(theme)_ — Space in pixels between a selected drawing and its selection rectangle.

## Inherited settings with a different default on DrawingSeries

- **excludeFromAggregate** (`string[]`) — default `["valueX"]` _(theme)_ — _from ISeriesSettings_ — Fields to leave out of `calculateAggregates`, to save work where their aggregates are not needed. _Since 5.14.4._
- **legendLabelText** (`string`) — default `"{name}"` _(theme)_ — _from ISeriesSettings_ — Text template for the item's label in a `Legend`.
- **stackToNegative** (`boolean`) — default `false` _(theme)_ — _from IXYSeriesSettings_ — When stacking, puts negative values on the negative values below and positive on positive, so the stack grows away from zero both ways. With `false`, each value goes on the one right below it, whatever its sign. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Negative_value_stacking

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("ILineSeriesSettings")`) for types, defaults and descriptions.

- _ILineSeriesSettings_: autoGapCount, connect, curveFactory, minDistance
- _IXYSeriesSettings_: baseAxis, categoryXField, categoryYField, exactLocationX, exactLocationY, excludeFromTotal, groupDataCallback, groupDataDisabled, groupDataWithOriginals, highLocationX, highLocationY, highValueXField, highValueXGrouped, highValueXShow, highValueYField, highValueYGrouped, highValueYShow, ignoreMinMax, legendRangeLabelText, legendRangeValueText, locationX, locationY, lowLocationX, lowLocationY, lowValueXField, lowValueXGrouped, lowValueXShow, lowValueYField, lowValueYGrouped, lowValueYShow, maskBullets, minBulletDistance, openCategoryXField, openCategoryYField, openLocationX, openLocationY, openValueXField, openValueXGrouped, openValueXShow, openValueYField, openValueYGrouped, openValueYShow, seriesTooltipTarget, snapTooltip, stacked, tooltipDataItem, tooltipPositionX, tooltipPositionY, useSelectionExtremes, valueXField, valueXGrouped, valueXShow, valueYField, valueYGrouped, valueYShow, vcx, vcy
- _ISeriesSettings_: calculateAggregates, customValueField, fill, fillGradient, fillPattern, heatRules, idField, legendDataItem, legendValueText, linkTarget, name, sequencedDelay, sequencedInterpolation, stroke, strokeGradient, urlField, valueField
- _IComponentSettings_: interpolationDuration, interpolationEasing
- _IContainerSettings_: background, html, interactiveChildren, layout, mask, maskContent, paddingBottom, paddingLeft, paddingRight, paddingTop, reverseChildren, setStateOnChildren, verticalScrollbar
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, height, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, position, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, width, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
