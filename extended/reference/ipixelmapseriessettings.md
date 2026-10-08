---
title: "IPixelMapSeriesSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ipixelmapseriessettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IMapPolygonSeriesSettings
All ancestors: IMapPolygonSeriesSettings, IMapSeriesSettings, ISeriesSettings, IComponentSettings, IContainerSettings, ISpriteSettings, IEntitySettings
Settings of: `am5map.PixelMapSeries` (see its page for the class)
TypeScript: `am5map.IPixelMapSeriesSettings` (`import type { IPixelMapSeriesSettings } from "@amcharts/amcharts5/map"`)

## Settings

- **step** (`number`) — default `2` — Distance between the centers of neighbouring pixels, in degrees. With `uniform`, in degrees as measured at the center of the map. Small maps can take a fine step, e.g. `0.01` for a small country. A step that would make more than 500,000 pixels is coarsened to stay under that, with a warning in the console. _Since 5.21.0._
- **pixelSize** (`number`) — default `0.8` — Size of a pixel relative to `step`. At `1` neighbouring pixels touch. _Since 5.21.0._
- **pixelType** (`"square" | "circle" | "diamond" | "hexagon"`) — default `"square"` — Shape of a pixel. At a `pixelSize` of `1` pixels fit edge to edge; `stagger` sets how rows line up. _Since 5.21.0._
- **stagger** (`boolean`) — Shifts every other row by half a pixel, like bricks in a wall. Squares line up in columns unless this is `true`; circles are staggered unless this is `false`. Hexagons and diamonds are always staggered, as that is the only way they fit together. Not set by default, so each shape packs its own way. _Since 5.21.0._
- **equalArea** (`boolean`) — default `true` — Spreads pixels evenly over the globe, with fewer per row towards the poles. The count changes in bands of rows: within a band pixels line up exactly, and the pattern shifts where one band meets the next. Set to `false` for the same number of pixels in every row, which lines up across the whole map; on a globe pixels then crowd towards the poles. _Since 5.21.0._
- **equalWidth** (`boolean`) — default `false` — Draws every pixel as wide as a pixel on the equator, with straight sides, whatever its latitude. Pixels no longer narrow towards the poles, so they overlap there (most with `equalArea: false`). Does not apply with `uniform`. _Since 5.21.0._
- **uniform** (`boolean`) — default `false` — Lays pixels out on a grid that is even on screen, all the same size and upright, like a pixel image of the map. The grid scales with zoom; rotating the map samples it again, so the grid stays level. `equalArea` does not apply. _Since 5.21.0._
- **columnHeight** (`number`) — default `0` — Raises pixels into 3D columns. The tallest column is this share of the globe's radius; on flat maps columns rise up the screen by the same measure. `0` keeps pixels flat. Does not apply with `uniform`. A column just behind a globe's edge shows where it rises past the edge. _Since 5.21.0._
- **pixelHeightFunction** (`(dataItem: DataItem<IPixelMapSeriesDataItem>, longitude: number, latitude: number) => number`) — A function that returns the height of each pixel's column, from `0` to `1` of `columnHeight`. Without it, columns take their polygon's `pixelHeight` setting, which heat rules can set:

  ```ts
  series.set("heatRules", [{
    target: series.mapPolygons.template,
    dataField: "value",
    min: 0.1,
    max: 1,
    key: "pixelHeight"
  }]);
  ```

  Polygons without that setting follow their value, from the series' lowest to its highest (set `calculateAggregates: true`); those with no value stay flat. Without any values every column is full height.

  NOTE: a function is not saved when the chart is serialized to JSON. Heights set with heat rules are.

  _Since 5.21.0._

## Inherited settings with a different default on PixelMapSeries

- **idField** (`string`) — default `"id"` _(class default)_ — _from ISeriesSettings_ — A key to look up in data for an id of the data item.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IMapPolygonSeriesSettings")`) for types, defaults and descriptions.

- _IMapPolygonSeriesSettings_: clickZoom, reverseGeodata
- _IMapSeriesSettings_: affectsBounds, exclude, geodataNames, geoJSON, geometryField, geometryTypeField, include, valueField
- _ISeriesSettings_: calculateAggregates, customValueField, excludeFromAggregate, fill, fillGradient, fillPattern, heatRules, legendDataItem, legendLabelText, legendValueText, linkTarget, name, sequencedDelay, sequencedInterpolation, stroke, strokeGradient, urlField
- _IComponentSettings_: interpolationDuration, interpolationEasing
- _IContainerSettings_: background, html, interactiveChildren, layout, mask, maskContent, paddingBottom, paddingLeft, paddingRight, paddingTop, reverseChildren, setStateOnChildren, verticalScrollbar
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, height, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, position, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, width, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
