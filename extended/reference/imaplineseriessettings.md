---
title: "IMapLineSeriesSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/imaplineseriessettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IMapSeriesSettings
All ancestors: IMapSeriesSettings, ISeriesSettings, IComponentSettings, IContainerSettings, ISpriteSettings, IEntitySettings
Settings of: `am5map.MapLineSeries` (see its page for the class)
TypeScript: `am5map.IMapLineSeriesSettings` (`import type { IMapLineSeriesSettings } from "@amcharts/amcharts5/map"`)

## Settings

- **clipBack** (`boolean`) — Hides the parts of lines on the far side of a globe, unless set to `false`. Only projections with a hidden side, such as `geoOrthographic`, are affected.
- **lineType** (`"curved" | "straight"`) — default `"curved"` — How lines run between their points: • `"curved"` - along the shortest path on the globe, which the projection may bend. • `"straight"` - in straight lines on screen, never across the 180th meridian. _Since 5.2.24._
- **lineTypeField** (`string`) — default `"lineType"` _(class default)_ — _(internal)_
- **pointSeries** (`MapPointSeries`) — The point series that data items' `pointIds` refer to. _Since 5.20.3._
- **pointIdsField** (`string`) — default `"pointIds"` _(class default)_ — Field in `data` that holds each line's `pointIds`. _Since 5.20.3._

## Inherited settings with a different default on MapLineSeries

- **affectsBounds** (`boolean`) — default `false` _(theme)_ — _from IMapSeriesSettings_ — Counts the series' geometries when the chart fits the map to its area. Turn it off for a background series, so the map fits the rest. Point, line and sankey series have it off by default. _Since 5.2.36._
- **idField** (`string`) — default `"id"` _(class default)_ — _from ISeriesSettings_ — A key to look up in data for an id of the data item.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IMapSeriesSettings")`) for types, defaults and descriptions.

- _IMapSeriesSettings_: exclude, geodataNames, geoJSON, geometryField, geometryTypeField, include, valueField
- _ISeriesSettings_: calculateAggregates, customValueField, excludeFromAggregate, fill, fillGradient, fillPattern, heatRules, legendDataItem, legendLabelText, legendValueText, linkTarget, name, sequencedDelay, sequencedInterpolation, stroke, strokeGradient, urlField
- _IComponentSettings_: interpolationDuration, interpolationEasing
- _IContainerSettings_: background, html, interactiveChildren, layout, mask, maskContent, paddingBottom, paddingLeft, paddingRight, paddingTop, reverseChildren, setStateOnChildren, verticalScrollbar
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, height, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, position, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, width, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
