---
title: "IGraticuleSeriesSettings"
type: "interface"
source: "https://docs.amcharts.com/v5/reference/igraticuleseriessettings/"
generatedFrom: "@amcharts/amcharts5@5.24.0"
---

## Inheritance

Extends: IMapLineSeriesSettings
All ancestors: IMapLineSeriesSettings, IMapSeriesSettings, ISeriesSettings, IComponentSettings, IContainerSettings, ISpriteSettings, IEntitySettings
Settings of: `am5map.GraticuleSeries` (see its page for the class)
TypeScript: `am5map.IGraticuleSeriesSettings` (`import type { IGraticuleSeriesSettings } from "@amcharts/amcharts5/map"`)

## Settings

- **clipExtent** (`boolean`) — Limits the grid to the geographic bounds of the map's geometries, instead of the whole globe.
- **step** (`number`) — default `10` _(theme)_ — Degrees between grid lines, of both latitude and longitude.

## Inherited settings with a different default on GraticuleSeries

- **affectsBounds** (`boolean`) — default `false` _(theme)_ — _from IMapSeriesSettings_ — Counts the series' geometries when the chart fits the map to its area. Turn it off for a background series, so the map fits the rest. Point, line and sankey series have it off by default. When it is on, adding or removing data fits the map again, so keep it off for data that changes often. _Since 5.2.36._
- **idField** (`string`) — default `"id"` _(class default)_ — _from ISeriesSettings_ — A key to look up in data for an id of the data item.
- **role** (`Role`) — default `"img"` _(theme)_ — _from ISpriteSettings_ — Element's role. Docs: https://docs.amcharts.com/v5/concepts/accessibility/#roles

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IMapLineSeriesSettings")`) for types, defaults and descriptions.

- _IMapLineSeriesSettings_: clipBack, lineType, lineTypeField, pointIdsField, pointSeries
- _IMapSeriesSettings_: exclude, geodataNames, geoJSON, geometryField, geometryTypeField, include, valueField
- _ISeriesSettings_: ariaDataTable, ariaSummary, autoLabels, calculateAggregates, customValueField, excludeFromAggregate, fill, fillGradient, fillPattern, heatRules, legendDataItem, legendLabelText, legendValueText, linkTarget, name, sequencedDelay, sequencedInterpolation, stroke, strokeGradient, urlField
- _IComponentSettings_: interpolationDuration, interpolationEasing
- _IContainerSettings_: background, direction, html, interactiveChildren, layout, mask, maskContent, paddingBottom, paddingLeft, paddingRight, paddingTop, reverseChildren, setStateOnChildren, verticalScrollbar
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaDescription, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, height, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, position, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, width, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
