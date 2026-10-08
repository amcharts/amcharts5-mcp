---
title: "IMapSankeySeriesSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/imapsankeyseriessettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IMapPolygonSeriesSettings
All ancestors: IMapPolygonSeriesSettings, IMapSeriesSettings, ISeriesSettings, IComponentSettings, IContainerSettings, ISpriteSettings, IEntitySettings
Settings of: `am5map.MapSankeySeries` (see its page for the class)
TypeScript: `am5map.IMapSankeySeriesSettings` (`import type { IMapSankeySeriesSettings } from "@amcharts/amcharts5/map"`)

## Settings

- **polygonSeries** (`MapPolygonSeries`) — The polygon series that `sourceId` and `targetId` refer to.
- **controlPointDistance** (`number`) — default `0.5` — How far a band's curve control points sit from its ends, as a share of the distance between them, from `0` to `0.5`. Larger values keep the band level for longer before its S-bend. Used where `controlPointDistanceSource` or `controlPointDistanceTarget` isn't set.
- **controlPointDistanceSource** (`number`) — `controlPointDistance` at the source end: larger values keep the band level for longer as it leaves.
- **controlPointDistanceTarget** (`number`) — `controlPointDistance` at the target end: larger values keep the band level for longer as it arrives.
- **orientation** (`"horizontal" | "vertical"`) — default `"horizontal"` — Which way bands leave and arrive at their nodes: • `"horizontal"` - east or west, with bands stacked north to south at each node. • `"vertical"` - north or south, with bands stacked west to east at each node.
- **maxWidth** (`number`) — default `5` — Width of the band with the largest value, in degrees. Other bands are as wide as their share of that value.
- **resolution** (`number`) — default `50` — Points worked out along each curve of a band. More is smoother.
- **nodePadding** (`number`) — default `0.3` — How far, in degrees, a node reaches past the bands it holds: added to a circle's radius, or to each end of a bar. Hides thin gaps between the bands and the node.
- **autoSort** (`boolean`) — default `true` — Stacks the bands at each node by the latitude of their other end, so bands heading north sit above those heading south and don't cross.
- **antimeridian** (`"short" | "long"`) — default `"short"` — How links without `waypoints` treat the 180th meridian: • `"short"` - take the shorter way, across it if need be (from China to the US, east over the Pacific). • `"long"` - never cross it, going the long way round.
- **nodeType** (`"circle" | "bar"`) — default `"circle"` — Shape of the nodes, styled via `nodes.mapPolygons.template`: • `"circle"` - a circle around all bands at the node. • `"bar"` - a bar across the bands, as in a classic Sankey diagram.
- **nodeWidth** (`number`) — default `1` — Thickness of a bar node, in degrees, along the way the bands run. Only with `nodeType: "bar"`.
- **linkColorMode** (`"solid" | "source" | "target"`) — default `"solid"` — How bands are colored: • `"solid"` - all with the `mapPolygons.template` fill. • `"source"` - each with its source node's fill. • `"target"` - each with its target node's fill.
- **sourceIdField** (`string`) — default `"sourceId"` _(class default)_ — A field in data that holds `sourceId`.
- **targetIdField** (`string`) — default `"targetId"` _(class default)_ — A field in data that holds `targetId`.
- **sourceLongitudeField** (`string`) — default `"sourceLongitude"` _(class default)_ — A field in data that holds the source longitude.
- **sourceLatitudeField** (`string`) — default `"sourceLatitude"` _(class default)_ — A field in data that holds the source latitude.
- **targetLongitudeField** (`string`) — default `"targetLongitude"` _(class default)_ — A field in data that holds the target longitude.
- **targetLatitudeField** (`string`) — default `"targetLatitude"` _(class default)_ — A field in data that holds the target latitude.
- **waypointsField** (`string`) — default `"waypoints"` _(class default)_ — A field in data that holds the waypoints array.

## Inherited settings with a different default on MapSankeySeries

- **affectsBounds** (`boolean`) — default `false` _(theme)_ — _from IMapSeriesSettings_ — Counts the series' geometries when the chart fits the map to its area. Turn it off for a background series, so the map fits the rest. Point, line and sankey series have it off by default. _Since 5.2.36._
- **idField** (`string`) — default `"id"` _(class default)_ — _from ISeriesSettings_ — A key to look up in data for an id of the data item.
- **valueField** (`string`) — default `"value"` _(class default)_ — _from IMapSeriesSettings_ — Field in `data` that holds each map object's numeric value, for use in tooltips, heat rules and such.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IMapPolygonSeriesSettings")`) for types, defaults and descriptions.

- _IMapPolygonSeriesSettings_: clickZoom, reverseGeodata
- _IMapSeriesSettings_: exclude, geodataNames, geoJSON, geometryField, geometryTypeField, include
- _ISeriesSettings_: calculateAggregates, customValueField, excludeFromAggregate, fill, fillGradient, fillPattern, heatRules, legendDataItem, legendLabelText, legendValueText, linkTarget, name, sequencedDelay, sequencedInterpolation, stroke, strokeGradient, urlField
- _IComponentSettings_: interpolationDuration, interpolationEasing
- _IContainerSettings_: background, html, interactiveChildren, layout, mask, maskContent, paddingBottom, paddingLeft, paddingRight, paddingTop, reverseChildren, setStateOnChildren, verticalScrollbar
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, height, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, minHeight, minWidth, numberFormatter, opacity, position, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, width, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
