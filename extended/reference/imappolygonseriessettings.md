---
title: "IMapPolygonSeriesSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/imappolygonseriessettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IMapSeriesSettings
All ancestors: IMapSeriesSettings, ISeriesSettings, IComponentSettings, IContainerSettings, ISpriteSettings, IEntitySettings
Settings of: `am5map.MapPolygonSeries` (see its page for the class)
TypeScript: `am5map.IMapPolygonSeriesSettings` (`import type { IMapPolygonSeriesSettings } from "@amcharts/amcharts5/map"`)

## Settings

- **reverseGeodata** (`boolean`) — default `false` — Reverses the order of the points in each polygon ring (their winding order). Some GeoJSON tools wind polygons the other way, so try this if a custom map looks garbled. _Since 5.2.42._
- **clickZoom** (`boolean`) — default `false` — Zooms the map to a polygon when it is clicked, and back to the home position when it is clicked again or the map's background is clicked. On a map panned by rotating (`panX: "rotateX"` or `panY: "rotateY"`), the polygon also turns to the middle. The polygon zoomed to is `active`, so an `"active"` state can mark it. _Since 5.21.0._

## Inherited settings with a different default on MapPolygonSeries

- **idField** (`string`) — default `"id"` _(class default)_ — _from ISeriesSettings_ — A key to look up in data for an id of the data item.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IMapSeriesSettings")`) for types, defaults and descriptions.

- _IMapSeriesSettings_: affectsBounds, exclude, geodataNames, geoJSON, geometryField, geometryTypeField, include, valueField
- _ISeriesSettings_: calculateAggregates, customValueField, excludeFromAggregate, fill, fillGradient, fillPattern, heatRules, legendDataItem, legendLabelText, legendValueText, linkTarget, name, sequencedDelay, sequencedInterpolation, stroke, strokeGradient, urlField
- _IComponentSettings_: interpolationDuration, interpolationEasing
- _IContainerSettings_: background, html, interactiveChildren, layout, mask, maskContent, paddingBottom, paddingLeft, paddingRight, paddingTop, reverseChildren, setStateOnChildren, verticalScrollbar
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, height, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, position, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, width, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
