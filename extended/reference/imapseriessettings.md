---
title: "IMapSeriesSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/imapseriessettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: ISeriesSettings
All ancestors: ISeriesSettings, IComponentSettings, IContainerSettings, ISpriteSettings, IEntitySettings
Settings of: `am5map.MapSeries` (see its page for the class)
TypeScript: `am5map.IMapSeriesSettings` (`import type { IMapSeriesSettings } from "@amcharts/amcharts5/map"`)

## Settings

- **affectsBounds** (`boolean`) — default `true` — Counts the series' geometries when the chart fits the map to its area. Turn it off for a background series, so the map fits the rest. Point, line and sankey series have it off by default. _Since 5.2.36._
- **geoJSON** (`GeoJSON<Geometry, { [name: string]: any; }>`) — Map data in GeoJSON format.
- **include** (`string[]`) — Ids of the geodata objects to show; the others are hidden.
- **exclude** (`string[]`) — Ids of the geodata objects to hide.
- **valueField** (`string`) — Field in `data` that holds each map object's numeric value, for use in tooltips, heat rules and such.
- **geometryField** (`string`) — default `"geometry"` _(class default)_ — _(internal)_
- **geometryTypeField** (`string`) — default `"geometryType"` _(class default)_ — _(internal)_
- **geodataNames** (`{ [index: string]: string; }`) — Names, keyed by id, to replace the names in the geodata with, such as translated country names. Read when the series parses `geoJSON`.

  ```ts
  import am5geodata_lang_ES from "@amcharts/amcharts5-geodata/lang/ES";
  // ...
  const polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
    geoJSON: am5geodata_worldLow,
    geodataNames: am5geodata_lang_ES
  }));
  ```

  ```js
  var polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
    geoJSON: am5geodata_worldLow,
    geodataNames: am5geodata_lang_ES
  }));
  ```

  _Since 5.1.13._ Docs: https://www.amcharts.com/docs/v5/charts/map-chart/map-translations/

## Inherited settings with a different default on MapSeries

- **idField** (`string`) — default `"id"` _(class default)_ — _from ISeriesSettings_ — A key to look up in data for an id of the data item.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("ISeriesSettings")`) for types, defaults and descriptions.

- _ISeriesSettings_: calculateAggregates, customValueField, excludeFromAggregate, fill, fillGradient, fillPattern, heatRules, legendDataItem, legendLabelText, legendValueText, linkTarget, name, sequencedDelay, sequencedInterpolation, stroke, strokeGradient, urlField
- _IComponentSettings_: interpolationDuration, interpolationEasing
- _IContainerSettings_: background, html, interactiveChildren, layout, mask, maskContent, paddingBottom, paddingLeft, paddingRight, paddingTop, reverseChildren, setStateOnChildren, verticalScrollbar
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, height, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, position, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, width, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
