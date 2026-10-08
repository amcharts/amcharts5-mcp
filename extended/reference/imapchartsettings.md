---
title: "IMapChartSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/imapchartsettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: ISerialChartSettings
All ancestors: ISerialChartSettings, IChartSettings, IContainerSettings, ISpriteSettings, IEntitySettings
Settings of: `am5map.MapChart` (see its page for the class)
TypeScript: `am5map.IMapChartSettings` (`import type { IMapChartSettings } from "@amcharts/amcharts5/map"`)

## Settings

- **projection** (`GeoProjection`) — default `am5map.geoMercator()` _(theme)_ — The projection the map is drawn with, such as `am5map.geoMercator()`. Docs: https://www.amcharts.com/docs/v5/charts/map-chart/#Projections
- **projectionName** (`string`) — The projection by name, such as `"geoOrthographic"`: the chart sets `projection` to it. Useful in JSON configs, which can't hold a function. The names `"geoMercator"`, `"geoOrthographic"`, `"geoEquirectangular"`, `"geoAlbersUsa"`, `"geoEqualEarth"` and `"geoNaturalEarth1"` work out of the box. Register any other projection once, before creating the chart:

  ```ts
  import { geoConicConformal } from "d3-geo";
  am5map.registerProjection("geoConicConformal", geoConicConformal);
  ```

  ```js
  am5map.registerProjection("geoConicConformal", d3.geoConicConformal);
  ```

  _Since 5.19.0._

- **zoomLevel** (`number`) — default `1` _(theme)_ — The map's zoom level: `1` shows the whole map fitted to the chart, `2` shows it twice as large.
- **translateX** (`number`) — default `0` _(code fallback)_ — Horizontal position of the projection's center, in pixels from the left of the map's area. Changes as the map is panned.
- **translateY** (`number`) — default `0` _(code fallback)_ — Vertical position of the projection's center, in pixels from the top of the map's area. Changes as the map is panned.
- **rotationY** (`number`) — default `0` _(theme)_ — Tilts the map north or south, in degrees: the latitude `-rotationY` comes to the middle, so `-30` centers latitude 30. Needs a projection that can rotate. Docs: https://www.amcharts.com/docs/v5/charts/map-chart/#Centering_the_map
- **rotationX** (`number`) — default `0` _(theme)_ — Turns the map around the poles, in degrees: the longitude `-rotationX` comes to the middle, so `-74` centers longitude 74. Needs a projection that can rotate. Docs: https://www.amcharts.com/docs/v5/charts/map-chart/#Centering_the_map
- **rotationZ** (`number`) — default `0` _(theme)_ — Spins the map around its middle, in degrees. Needs a projection that can rotate. Docs: https://www.amcharts.com/docs/v5/charts/map-chart/#Centering_the_map
- **maxZoomLevel** (`number`) — default `32` _(theme)_ — The highest zoom level the map can zoom in to.
- **minZoomLevel** (`number`) — default `1` _(theme)_ — The lowest zoom level the map can zoom out to.
- **zoomStep** (`number`) — default `2` _(theme)_ — How many times one zoom step zooms in or out: the zoom level is multiplied or divided by it. Used by `ZoomControl`, the wheel, double clicks, `zoomIn()` and `zoomOut()`.
- **panX** (`"none" | "rotateX" | "translateX"`) — default `"translateX"` _(theme)_ — What dragging the map horizontally does: `"translateX"` moves it, `"rotateX"` turns it around the poles (as on a globe), `"none"` nothing. Docs: https://www.amcharts.com/docs/v5/charts/map-chart/map-pan-zoom/#Panning
- **panY** (`"none" | "rotateY" | "translateY"`) — default `"translateY"` _(theme)_ — What dragging the map vertically does: `"translateY"` moves it, `"rotateY"` tilts it north or south (as on a globe), `"none"` nothing. Docs: https://www.amcharts.com/docs/v5/charts/map-chart/map-pan-zoom/#Panning
- **pinchZoom** (`boolean`) — default `true` _(theme)_ — Lets users zoom the map with a two-finger pinch on touch devices. Docs: https://www.amcharts.com/docs/v5/charts/map-chart/map-pan-zoom/#Pinch_zoom
- **wheelX** (`"none" | "zoom" | "rotateX" | "rotateY"`) — default `"none"` _(theme)_ — What scrolling horizontally (with a tilting wheel or a touchpad) does to the map. Docs: https://www.amcharts.com/docs/v5/charts/map-chart/map-pan-zoom/#Mouse_wheel_behavior
- **wheelY** (`"none" | "zoom" | "rotateX" | "rotateY"`) — default `"zoom"` _(theme)_ — What turning the mouse wheel does to the map. Docs: https://www.amcharts.com/docs/v5/charts/map-chart/map-pan-zoom/#Mouse_wheel_behavior
- **wheelSensitivity** (`number`) — default `1` _(theme)_ — Multiplies how far the wheel rotates the map. Applies only to the `"rotateX"` and `"rotateY"` wheel actions.
- **wheelDuration** (`number`) — default `0` _(theme)_ — Duration of the rotation a wheel turn makes, in milliseconds. Applies only to the `"rotateX"` and `"rotateY"` wheel actions.
- **wheelEasing** (`(t: Time) => Time`) — default `am5.ease.out(am5.ease.cubic)` _(theme)_ — Easing of the rotation a wheel turn makes. Applies only to the `"rotateX"` and `"rotateY"` wheel actions. Docs: https://www.amcharts.com/docs/v5/concepts/animations/#Easing_functions
- **animationDuration** (`number`) — default `0` _(code fallback)_ — Duration of zoom and rotation animations, in milliseconds: zooming with the wheel, buttons or a double click, and the zoom and rotate methods.
- **animationEasing** (`(t: Time) => Time`) — default `am5.ease.out(am5.ease.cubic)` _(theme)_ — Easing of zoom and rotation animations. Docs: https://www.amcharts.com/docs/v5/concepts/animations/#Easing_functions
- **zoomControl** (`ZoomControl`) — Zoom buttons to show on the map. Docs: https://www.amcharts.com/docs/v5/charts/map-chart/#Zoom_control
- **homeZoomLevel** (`number`) — default `1` — Zoom level of the home position, which `goHome()` and `autoHome` go to. Docs: https://www.amcharts.com/docs/v5/charts/map-chart/map-pan-zoom/#Initial_position_and_zoom
- **homeRotationX** (`number`) — `rotationX` of the home position, which `goHome()` and `autoHome` go to. Docs: https://www.amcharts.com/docs/v5/charts/map-chart/map-pan-zoom/#Initial_position_and_zoom
- **homeRotationY** (`number`) — `rotationY` of the home position, which `goHome()` and `autoHome` go to. Docs: https://www.amcharts.com/docs/v5/charts/map-chart/map-pan-zoom/#Initial_position_and_zoom
- **homeGeoPoint** (`IGeoPoint`) — The point `goHome()` and `autoHome` center the map on. If not set, the middle of the map is used. Docs: https://www.amcharts.com/docs/v5/charts/map-chart/map-pan-zoom/#Initial_position_and_zoom
- **autoHome** (`boolean`) — default `false` — Goes to the home position once the map is loaded, as `goHome()` does: animated when `animationDuration` is set (as by the Animated theme), at once otherwise. _Since 5.21.0._
- **maxPanOut** (`number`) — default `0.4` _(theme)_ — How far the map can be dragged away from the middle, as a share of its size: `0.4` lets its center move 40% of the map's width or height. A map zoomed larger than the chart can always be dragged to its edges. Docs: https://www.amcharts.com/docs/v5/charts/map-chart/map-pan-zoom/#Panning_outside_viewport
- **centerMapOnZoomOut** (`boolean`) — default `true` _(theme)_ — Centers the map on its home point (`homeGeoPoint`, or the middle of the map) whenever it zooms to `homeZoomLevel`, such as when fully zoomed out. Otherwise zooming out keeps the point under the pointer, or the middle of the view, in place. _Since 5.2.1._
- **doubleClickZoom** (`boolean`) — default `true` _(theme)_ — Zooms the map in by `zoomStep` on a double click or double tap, and out on Shift + double click. On a map panned by rotating (`panX: "rotateX"` or `panY: "rotateY"`), the clicked location turns to the middle. Otherwise it stays under the pointer. _Since 5.20.2._
- **boxZoom** (`"none" | "drag" | "shift" | "ctrl" | "alt"`) — default `"none"` _(theme)_ — Zooms the map to a box drawn with the pointer, while this key is held: `"drag"` needs no key. A plain drag pans the map, so use `"drag"` with `panX` and `panY` set to `"none"`. The box is drawn with `boxZoomSelection`. _Since 5.20.2._

## Inherited settings with a different default on MapChart

- **height** (`number | Percent`) — default `am5.p100` _(theme)_ — _from ISpriteSettings_ — Height in pixels, or a `Percent` of the parent's inner height. In a vertical layout, a percent height is a share of the height the other children leave.
- **interactiveChildren** (`boolean`) — default `false` _(theme)_ — _from IContainerSettings_ — Makes every descendant, not just direct children, interactive when the container itself is interactive.
- **width** (`number | Percent`) — default `am5.p100` _(theme)_ — _from ISpriteSettings_ — Width in pixels, or a `Percent` of the parent's inner width. In a horizontal layout, a percent width is a share of the width the other children leave.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("ISerialChartSettings")`) for types, defaults and descriptions.

- _ISerialChartSettings_: colors, patterns
- _IContainerSettings_: background, html, layout, mask, maskContent, paddingBottom, paddingLeft, paddingRight, paddingTop, reverseChildren, setStateOnChildren, verticalScrollbar
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, position, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
