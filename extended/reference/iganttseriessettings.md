---
title: "IGanttSeriesSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iganttseriessettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IColumnSeriesSettings
All ancestors: IColumnSeriesSettings, IBaseColumnSeriesSettings, IXYSeriesSettings, ISeriesSettings, IComponentSettings, IContainerSettings, ISpriteSettings, IEntitySettings
Settings of: `am5gantt.GanttSeries` (see its page for the class)
TypeScript: `am5gantt.IGanttSeriesSettings` (`import type { IGanttSeriesSettings } from "@amcharts/amcharts5/gantt"`)

## Settings

- **progressField** (`string`) — default `"progress"` — Field in data that holds the task's progress, `0` to `1`. Docs: https://www.amcharts.com/docs/v5/charts/gantt/#Series_data
- **durationField** (`string`) — default `"duration"` — Field in data that holds the task's duration, in the Gantt's `durationUnit` units. Docs: https://www.amcharts.com/docs/v5/charts/gantt/#Series_data
- **linkToField** (`string`) — default `"linkTo"` — Field in data that holds an array of IDs of the tasks this task links to. Docs: https://www.amcharts.com/docs/v5/charts/gantt/#Series_data
- **linkHorizontalOffset** (`number`) — default `25` _(theme)_ — How far in pixels a link runs straight out of a bar's end, and into the next bar's start, before it turns.
- **snapCount** (`number`) — default `1` _(theme)_ — How many `durationUnit` units a dragged or resized bar snaps to, e.g. `2` snaps to every second unit.
- **yAxis** (`GanttCategoryAxis<GanttCategoryAxisRenderer>`) — The Gantt's task list axis.
- **xAxis** (`GanttDateAxis<GanttDateAxisRenderer>`) — The Gantt's upper date axis.

## Inherited settings with a different default on GanttSeries

- **exactLocationX** (`boolean`) — default `true` _(theme)_ — _from IXYSeriesSettings_ — Places data points at their exact date on a `DateAxis` X axis, ignoring `locationX`. When that axis is the base axis, a column then spans exactly from its open date to its date, so it needs an `openValueXField` to have any width. _Since 5.13.0._
- **legendLabelText** (`string`) — default `"{name}"` _(theme)_ — _from ISeriesSettings_ — Text template for the item's label in a `Legend`.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IColumnSeriesSettings")`) for types, defaults and descriptions.

- _IColumnSeriesSettings_: turboMode
- _IBaseColumnSeriesSettings_: adjustBulletPosition, clustered, colorByDataItem, colors, useLastColorForLegendMarker
- _IXYSeriesSettings_: baseAxis, categoryXField, categoryYField, exactLocationY, excludeFromTotal, groupDataCallback, groupDataDisabled, groupDataWithOriginals, highLocationX, highLocationY, highValueXField, highValueXGrouped, highValueXShow, highValueYField, highValueYGrouped, highValueYShow, ignoreMinMax, legendRangeLabelText, legendRangeValueText, locationX, locationY, lowLocationX, lowLocationY, lowValueXField, lowValueXGrouped, lowValueXShow, lowValueYField, lowValueYGrouped, lowValueYShow, maskBullets, minBulletDistance, openCategoryXField, openCategoryYField, openLocationX, openLocationY, openValueXField, openValueXGrouped, openValueXShow, openValueYField, openValueYGrouped, openValueYShow, seriesTooltipTarget, snapTooltip, stacked, stackToNegative, tooltipDataItem, tooltipPositionX, tooltipPositionY, useSelectionExtremes, valueXField, valueXGrouped, valueXShow, valueYField, valueYGrouped, valueYShow, vcx, vcy
- _ISeriesSettings_: calculateAggregates, customValueField, excludeFromAggregate, fill, fillGradient, fillPattern, heatRules, idField, legendDataItem, legendValueText, linkTarget, name, sequencedDelay, sequencedInterpolation, stroke, strokeGradient, urlField, valueField
- _IComponentSettings_: interpolationDuration, interpolationEasing
- _IContainerSettings_: background, html, interactiveChildren, layout, mask, maskContent, paddingBottom, paddingLeft, paddingRight, paddingTop, reverseChildren, setStateOnChildren, verticalScrollbar
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, height, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, position, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, width, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
