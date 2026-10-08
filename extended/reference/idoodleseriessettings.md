---
title: "IDoodleSeriesSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/idoodleseriessettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IDrawingSeriesSettings
All ancestors: IDrawingSeriesSettings, ILineSeriesSettings, IXYSeriesSettings, ISeriesSettings, IComponentSettings, IContainerSettings, ISpriteSettings, IEntitySettings
Settings of: `am5stock.DoodleSeries` (see its page for the class)
TypeScript: `am5stock.IDoodleSeriesSettings` (`import type { IDoodleSeriesSettings } from "@amcharts/amcharts5/stock"`)

## Settings

_(none declared here — all inherited)_

## Inherited settings with a different default on DoodleSeries

- **excludeFromAggregate** (`string[]`) — default `["valueX"]` _(theme)_ — _from ISeriesSettings_ — Fields to leave out of `calculateAggregates`, to save work where their aggregates are not needed. _Since 5.14.4._
- **legendLabelText** (`string`) — default `"{name}"` _(theme)_ — _from ISeriesSettings_ — Text template for the item's label in a `Legend`.
- **stackToNegative** (`boolean`) — default `false` _(theme)_ — _from IXYSeriesSettings_ — When stacking, puts negative values on the negative values below and positive on positive, so the stack grows away from zero both ways. With `false`, each value goes on the one right below it, whatever its sign. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Negative_value_stacking

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IDrawingSeriesSettings")`) for types, defaults and descriptions.

- _IDrawingSeriesSettings_: field, fillColor, fillOpacity, selectorPadding, series, snapToData, strokeColor, strokeDasharray, strokeOpacity, strokeWidth, xAxis, yAxis
- _ILineSeriesSettings_: autoGapCount, connect, curveFactory, minDistance
- _IXYSeriesSettings_: baseAxis, categoryXField, categoryYField, exactLocationX, exactLocationY, excludeFromTotal, groupDataCallback, groupDataDisabled, groupDataWithOriginals, highLocationX, highLocationY, highValueXField, highValueXGrouped, highValueXShow, highValueYField, highValueYGrouped, highValueYShow, ignoreMinMax, legendRangeLabelText, legendRangeValueText, locationX, locationY, lowLocationX, lowLocationY, lowValueXField, lowValueXGrouped, lowValueXShow, lowValueYField, lowValueYGrouped, lowValueYShow, maskBullets, minBulletDistance, openCategoryXField, openCategoryYField, openLocationX, openLocationY, openValueXField, openValueXGrouped, openValueXShow, openValueYField, openValueYGrouped, openValueYShow, seriesTooltipTarget, snapTooltip, stacked, tooltipDataItem, tooltipPositionX, tooltipPositionY, useSelectionExtremes, valueXField, valueXGrouped, valueXShow, valueYField, valueYGrouped, valueYShow, vcx, vcy
- _ISeriesSettings_: calculateAggregates, customValueField, fill, fillGradient, fillPattern, heatRules, idField, legendDataItem, legendValueText, linkTarget, name, sequencedDelay, sequencedInterpolation, stroke, strokeGradient, urlField, valueField
- _IComponentSettings_: interpolationDuration, interpolationEasing
- _IContainerSettings_: background, html, interactiveChildren, layout, mask, maskContent, paddingBottom, paddingLeft, paddingRight, paddingTop, reverseChildren, setStateOnChildren, verticalScrollbar
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, height, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, position, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, width, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
