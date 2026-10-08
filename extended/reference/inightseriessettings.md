---
title: "INightSeriesSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/inightseriessettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IMapPolygonSeriesSettings, ISunSettings
All ancestors: IMapPolygonSeriesSettings, ISunSettings, IMapSeriesSettings, ISeriesSettings, IComponentSettings, IContainerSettings, ISpriteSettings, IEntitySettings
Settings of: `am5map.NightSeries` (see its page for the class)
TypeScript: `am5map.INightSeriesSettings` (`import type { INightSeriesSettings } from "@amcharts/amcharts5/map"`)

## Settings

- **twilightSteps** (`number`) — default `4` — How many shades the twilight is drawn in, from day to full night.
- **sun** (`Sprite`) — The sprite shown where the sun is directly overhead. The series makes a circle: configure it via `get("sun")`, or set any sprite instead.
- **sunAltitude** (`number`) — default `0` — Raises the sun above the map, in metres, as `altitude` raises a `MapLine`. On a globe it stays in view a little past the edge after the point below it has gone round the back. It is for looks, not the real distance: `1000000` to `5000000` suits a globe (the Earth's radius is about 6,371,000). _Since 5.21.0._

## Inherited settings with a different default on NightSeries

- **affectsBounds** (`boolean`) — default `false` _(theme)_ — _from IMapSeriesSettings_ — Counts the series' geometries when the chart fits the map to its area. Turn it off for a background series, so the map fits the rest. Point, line and sankey series have it off by default. _Since 5.2.36._
- **idField** (`string`) — default `"id"` _(class default)_ — _from ISeriesSettings_ — A key to look up in data for an id of the data item.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IMapPolygonSeriesSettings")`) for types, defaults and descriptions.

- _IMapPolygonSeriesSettings_: clickZoom, reverseGeodata
- _ISunSettings_: sunDate, sunPosition, twilight
- _IMapSeriesSettings_: exclude, geodataNames, geoJSON, geometryField, geometryTypeField, include, valueField
- _ISeriesSettings_: calculateAggregates, customValueField, excludeFromAggregate, fill, fillGradient, fillPattern, heatRules, legendDataItem, legendLabelText, legendValueText, linkTarget, name, sequencedDelay, sequencedInterpolation, stroke, strokeGradient, urlField
- _IComponentSettings_: interpolationDuration, interpolationEasing
- _IContainerSettings_: background, html, interactiveChildren, layout, mask, maskContent, paddingBottom, paddingLeft, paddingRight, paddingTop, reverseChildren, setStateOnChildren, verticalScrollbar
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, height, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, position, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, width, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
