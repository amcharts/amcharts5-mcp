---
title: "IClusteredPointSeriesSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iclusteredpointseriessettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IMapPointSeriesSettings
All ancestors: IMapPointSeriesSettings, IMapSeriesSettings, ISeriesSettings, IComponentSettings, IContainerSettings, ISpriteSettings, IEntitySettings
Settings of: `am5map.ClusteredPointSeries` (see its page for the class)
TypeScript: `am5map.IClusteredPointSeriesSettings` (`import type { IClusteredPointSeriesSettings } from "@amcharts/amcharts5/map"`)

## Settings

- **groupIdField** (`string`) — default `"groupId"` _(class default)_ — Field in `data` that holds the id of the point's group. Points cluster only with points of the same group, such as the same continent. Docs: https://www.amcharts.com/docs/v5/charts/map-chart/clustered-point-series/#Group_segregation
- **minDistance** (`number`) — default `20` _(theme)_ — Points closer than this many pixels to each other are clustered. Docs: https://www.amcharts.com/docs/v5/charts/map-chart/clustered-point-series/#Minimal_distance
- **clusteredBullet** (`(root: Root, series: ClusteredPointSeries, dataItem: DataItem<IClusteredDataItem>) => Bullet | undefined`) — A function that returns the `Bullet` to show a cluster with. Without it, points aren't clustered. Docs: https://www.amcharts.com/docs/v5/charts/map-chart/clustered-point-series/#Group_bullet
- **scatterDistance** (`number`) — default `3` _(theme)_ — Once clustering stops (see `stopClusterZoom`), points closer than this many pixels to each other are scattered so that all of them show. _Since 5.5.7._ Docs: https://www.amcharts.com/docs/v5/charts/map-chart/clustered-point-series/#Scatter_settings
- **scatterRadius** (`number`) — default `8` _(theme)_ — Radius in pixels each bullet is taken to have when scattering them. _Since 5.5.7._ Docs: https://www.amcharts.com/docs/v5/charts/map-chart/clustered-point-series/#Scatter_settings
- **stopClusterZoom** (`number`) — default `0.95` _(theme)_ — Clustering stops, and scattering starts, once the map is zoomed to `maxZoomLevel` times this. _Since 5.5.7._ Docs: https://www.amcharts.com/docs/v5/charts/map-chart/clustered-point-series/#Scatter_settings
- **clusterDelay** (`number`) — default `0` — Waits this many milliseconds after the zoom level changes before clustering again. Helps with many data items. _Since 5.9.11._

## Inherited settings with a different default on ClusteredPointSeries

- **affectsBounds** (`boolean`) — default `false` _(theme)_ — _from IMapSeriesSettings_ — Counts the series' geometries when the chart fits the map to its area. Turn it off for a background series, so the map fits the rest. Point, line and sankey series have it off by default. _Since 5.2.36._
- **idField** (`string`) — default `"id"` _(class default)_ — _from ISeriesSettings_ — A key to look up in data for an id of the data item.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IMapPointSeriesSettings")`) for types, defaults and descriptions.

- _IMapPointSeriesSettings_: altitudeField, autoRotateAngleField, autoRotateField, autoScale, clipBack, clipFront, fixedField, latitudeField, lineIdField, longitudeField, polygonIdField, positionOnLineField, surfaceBullets
- _IMapSeriesSettings_: exclude, geodataNames, geoJSON, geometryField, geometryTypeField, include, valueField
- _ISeriesSettings_: calculateAggregates, customValueField, excludeFromAggregate, fill, fillGradient, fillPattern, heatRules, legendDataItem, legendLabelText, legendValueText, linkTarget, name, sequencedDelay, sequencedInterpolation, stroke, strokeGradient, urlField
- _IComponentSettings_: interpolationDuration, interpolationEasing
- _IContainerSettings_: background, html, interactiveChildren, layout, mask, maskContent, paddingBottom, paddingLeft, paddingRight, paddingTop, reverseChildren, setStateOnChildren, verticalScrollbar
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, height, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, position, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, width, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
