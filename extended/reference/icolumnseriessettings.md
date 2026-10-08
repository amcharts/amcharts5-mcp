---
title: "IColumnSeriesSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/icolumnseriessettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IBaseColumnSeriesSettings
All ancestors: IBaseColumnSeriesSettings, IXYSeriesSettings, ISeriesSettings, IComponentSettings, IContainerSettings, ISpriteSettings, IEntitySettings
Settings of: `am5xy.ColumnSeries` (see its page for the class)
TypeScript: `am5xy.IColumnSeriesSettings` (`import type { IColumnSeriesSettings } from "@amcharts/amcharts5/xy"`)

## Settings

- **turboMode** (`boolean`) — Draws all columns as a single shape instead of one element each, which renders charts with many columns much faster. Experimental: the columns then don't react to the pointer, and some of their settings, such as rounded corners, have no effect. _Since 5.14.0._ Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/series/column-series/#Turbo_mode

## Inherited settings with a different default on ColumnSeries

- **legendLabelText** (`string`) — default `"{name}"` _(theme)_ — _from ISeriesSettings_ — Text template for the item's label in a `Legend`.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IBaseColumnSeriesSettings")`) for types, defaults and descriptions.

- _IBaseColumnSeriesSettings_: adjustBulletPosition, clustered, colorByDataItem, colors, useLastColorForLegendMarker
- _IXYSeriesSettings_: baseAxis, categoryXField, categoryYField, exactLocationX, exactLocationY, excludeFromTotal, groupDataCallback, groupDataDisabled, groupDataWithOriginals, highLocationX, highLocationY, highValueXField, highValueXGrouped, highValueXShow, highValueYField, highValueYGrouped, highValueYShow, ignoreMinMax, legendRangeLabelText, legendRangeValueText, locationX, locationY, lowLocationX, lowLocationY, lowValueXField, lowValueXGrouped, lowValueXShow, lowValueYField, lowValueYGrouped, lowValueYShow, maskBullets, minBulletDistance, openCategoryXField, openCategoryYField, openLocationX, openLocationY, openValueXField, openValueXGrouped, openValueXShow, openValueYField, openValueYGrouped, openValueYShow, seriesTooltipTarget, snapTooltip, stacked, stackToNegative, tooltipDataItem, tooltipPositionX, tooltipPositionY, useSelectionExtremes, valueXField, valueXGrouped, valueXShow, valueYField, valueYGrouped, valueYShow, vcx, vcy, xAxis, yAxis
- _ISeriesSettings_: calculateAggregates, customValueField, excludeFromAggregate, fill, fillGradient, fillPattern, heatRules, idField, legendDataItem, legendValueText, linkTarget, name, sequencedDelay, sequencedInterpolation, stroke, strokeGradient, urlField, valueField
- _IComponentSettings_: interpolationDuration, interpolationEasing
- _IContainerSettings_: background, html, interactiveChildren, layout, mask, maskContent, paddingBottom, paddingLeft, paddingRight, paddingTop, reverseChildren, setStateOnChildren, verticalScrollbar
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, height, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, position, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, width, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
