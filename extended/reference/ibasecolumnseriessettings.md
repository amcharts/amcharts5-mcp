---
title: "IBaseColumnSeriesSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ibasecolumnseriessettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IXYSeriesSettings
All ancestors: IXYSeriesSettings, ISeriesSettings, IComponentSettings, IContainerSettings, ISpriteSettings, IEntitySettings
Settings of: `am5xy.BaseColumnSeries` (see its page for the class)
TypeScript: `am5xy.IBaseColumnSeriesSettings` (`import type { IBaseColumnSeriesSettings } from "@amcharts/amcharts5/xy"`)

## Settings

- **clustered** (`boolean`) — default `true` — Places the columns side by side with those of the other clustered column series on the same base axis, sharing each cell. With `false`, the columns take the whole cell and can overlap the others. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/series/column-series/#Clustering
- **adjustBulletPosition** (`boolean`) — default `true` _(theme)_ — Places bullets on the visible part of a column that runs past the plot area, instead of on the whole column.
- **colorByDataItem** (`boolean`) — default `false` — Gives each column its own color from `colors`, instead of one color for the whole series. _Since 5.20.4._
- **colors** (`ColorSet`) — Colors for the columns when `colorByDataItem` is set. If not set, the series makes its own `ColorSet`, separate from the chart's. _Since 5.20.4._
- **useLastColorForLegendMarker** (`boolean`) — Colors the legend marker like the last visible column, instead of with the series' `fill` and `stroke`. _Since 5.1.13._

## Inherited settings with a different default on BaseColumnSeries

- **legendLabelText** (`string`) — default `"{name}"` _(theme)_ — _from ISeriesSettings_ — Text template for the item's label in a `Legend`.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IXYSeriesSettings")`) for types, defaults and descriptions.

- _IXYSeriesSettings_: baseAxis, categoryXField, categoryYField, exactLocationX, exactLocationY, excludeFromTotal, groupDataCallback, groupDataDisabled, groupDataWithOriginals, highLocationX, highLocationY, highValueXField, highValueXGrouped, highValueXShow, highValueYField, highValueYGrouped, highValueYShow, ignoreMinMax, legendRangeLabelText, legendRangeValueText, locationX, locationY, lowLocationX, lowLocationY, lowValueXField, lowValueXGrouped, lowValueXShow, lowValueYField, lowValueYGrouped, lowValueYShow, maskBullets, minBulletDistance, openCategoryXField, openCategoryYField, openLocationX, openLocationY, openValueXField, openValueXGrouped, openValueXShow, openValueYField, openValueYGrouped, openValueYShow, seriesTooltipTarget, snapTooltip, stacked, stackToNegative, tooltipDataItem, tooltipPositionX, tooltipPositionY, useSelectionExtremes, valueXField, valueXGrouped, valueXShow, valueYField, valueYGrouped, valueYShow, vcx, vcy, xAxis, yAxis
- _ISeriesSettings_: calculateAggregates, customValueField, excludeFromAggregate, fill, fillGradient, fillPattern, heatRules, idField, legendDataItem, legendValueText, linkTarget, name, sequencedDelay, sequencedInterpolation, stroke, strokeGradient, urlField, valueField
- _IComponentSettings_: interpolationDuration, interpolationEasing
- _IContainerSettings_: background, html, interactiveChildren, layout, mask, maskContent, paddingBottom, paddingLeft, paddingRight, paddingTop, reverseChildren, setStateOnChildren, verticalScrollbar
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, height, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, position, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, width, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
