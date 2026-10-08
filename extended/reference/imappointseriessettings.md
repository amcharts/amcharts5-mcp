---
title: "IMapPointSeriesSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/imappointseriessettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IMapSeriesSettings
All ancestors: IMapSeriesSettings, ISeriesSettings, IComponentSettings, IContainerSettings, ISpriteSettings, IEntitySettings
Settings of: `am5map.MapPointSeries` (see its page for the class)
TypeScript: `am5map.IMapPointSeriesSettings` (`import type { IMapPointSeriesSettings } from "@amcharts/amcharts5/map"`)

## Settings

- **polygonIdField** (`string`) — Field in `data` that holds the id of a polygon to place the point at, in its visual center. Not set by default.
- **clipFront** (`boolean`) — default `false` _(theme)_ — Hides the points on the side of the map facing the viewer. With `clipBack: false`, only the points behind a globe show.
- **clipBack** (`boolean`) — default `true` _(theme)_ — Hides the points on the far side of a globe. Only projections with a hidden side, such as `geoOrthographic`, are affected.
- **surfaceBullets** (`boolean`) — default `false` — Lays bullets onto the map's surface: each bullet turns, squashes and stretches with the projection where it is, as if painted on the map. On a globe they flatten towards the edge; on Mercator they grow towards the poles. _Since 5.21.0._
- **latitudeField** (`string`) — default `"latitude"` _(class default)_ — Field in `data` that holds the point's latitude.
- **longitudeField** (`string`) — default `"longitude"` _(class default)_ — Field in `data` that holds the point's longitude.
- **fixedField** (`string`) — Field in `data` that holds whether the point is `fixed`. Not set by default.
- **lineIdField** (`string`) — default `"lineId"` _(class default)_ — Field in `data` that holds the id of the line the point sits on. _Since 5.20.6._ _Note:_ The line is looked up by its data `id` in the chart's MapLineSeries. With this and `positionOnLineField`, points on lines can come from data rows instead of `pushDataItem({ lineDataItem, positionOnLine })`, so a serialized config keeps them.
- **altitudeField** (`string`) — Field in `data` that holds the point's height above the ground, in metres. Not set by default, so a data column that happens to be called "altitude" (perhaps in feet, or above sea level) isn't read as heights. _Since 5.21.0._
- **positionOnLineField** (`string`) — default `"positionOnLine"` _(class default)_ — Field in `data` that holds where on its line the point sits, from `0` (start) to `1` (end). _Since 5.20.6._
- **autoRotateField** (`string`) — default `"autoRotate"` _(class default)_ — Field in `data` that holds whether the point turns to face the way its line runs. _Since 5.20.6._ _Note:_ A value from data wins over the bullet's `autoRotate`.
- **autoRotateAngleField** (`string`) — default `"autoRotateAngle"` _(class default)_ — Field in `data` that holds degrees added to the angle `autoRotate` works out. _Since 5.20.6._ _Note:_ A value from data wins over the bullet's `autoRotateAngle`.
- **autoScale** (`boolean`) — default `false` _(theme)_ — Scales bullets with the map's zoom level, so they grow as the map zooms in. _Since 5.2.8._

## Inherited settings with a different default on MapPointSeries

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
