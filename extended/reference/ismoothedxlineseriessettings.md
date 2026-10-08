---
title: "ISmoothedXLineSeriesSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ismoothedxlineseriessettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: ILineSeriesSettings
All ancestors: ILineSeriesSettings, IXYSeriesSettings, ISeriesSettings, IComponentSettings, IContainerSettings, ISpriteSettings, IEntitySettings
Settings of: `am5xy.SmoothedXLineSeries` (see its page for the class)
TypeScript: `am5xy.ISmoothedXLineSeriesSettings` (`import type { ISmoothedXLineSeriesSettings } from "@amcharts/amcharts5/xy"`)

## Settings

- **tension** (`number`) — default `0.5` _(theme)_ — How tight the curve is, from `0` to `1`: `1` draws straight lines, a smaller value a rounder curve.

## Inherited settings with a different default on SmoothedXLineSeries

- **curveFactory** (`CurveFactory`) — default computed at runtime _(class default)_ — _from ILineSeriesSettings_ — _(internal)_
- **legendLabelText** (`string`) — default `"{name}"` _(theme)_ — _from ISeriesSettings_ — Text template for the item's label in a `Legend`.
- **stackToNegative** (`boolean`) — default `false` _(theme)_ — _from IXYSeriesSettings_ — When stacking, puts negative values on the negative values below and positive on positive, so the stack grows away from zero both ways. With `false`, each value goes on the one right below it, whatever its sign. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Negative_value_stacking

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("ILineSeriesSettings")`) for types, defaults and descriptions.

- _ILineSeriesSettings_: autoGapCount, connect, minDistance
- _IXYSeriesSettings_: baseAxis, categoryXField, categoryYField, exactLocationX, exactLocationY, excludeFromTotal, groupDataCallback, groupDataDisabled, groupDataWithOriginals, highLocationX, highLocationY, highValueXField, highValueXGrouped, highValueXShow, highValueYField, highValueYGrouped, highValueYShow, ignoreMinMax, legendRangeLabelText, legendRangeValueText, locationX, locationY, lowLocationX, lowLocationY, lowValueXField, lowValueXGrouped, lowValueXShow, lowValueYField, lowValueYGrouped, lowValueYShow, maskBullets, minBulletDistance, openCategoryXField, openCategoryYField, openLocationX, openLocationY, openValueXField, openValueXGrouped, openValueXShow, openValueYField, openValueYGrouped, openValueYShow, seriesTooltipTarget, snapTooltip, stacked, tooltipDataItem, tooltipPositionX, tooltipPositionY, useSelectionExtremes, valueXField, valueXGrouped, valueXShow, valueYField, valueYGrouped, valueYShow, vcx, vcy, xAxis, yAxis
- _ISeriesSettings_: calculateAggregates, customValueField, excludeFromAggregate, fill, fillGradient, fillPattern, heatRules, idField, legendDataItem, legendValueText, linkTarget, name, sequencedDelay, sequencedInterpolation, stroke, strokeGradient, urlField, valueField
- _IComponentSettings_: interpolationDuration, interpolationEasing
- _IContainerSettings_: background, html, interactiveChildren, layout, mask, maskContent, paddingBottom, paddingLeft, paddingRight, paddingTop, reverseChildren, setStateOnChildren, verticalScrollbar
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, height, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, position, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, width, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
