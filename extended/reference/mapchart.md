---
title: "MapChart"
type: "class"
source: "https://docs.amcharts.com/v5/reference/mapchart/"
generatedFrom: "@amcharts/amcharts5@5.22.0"
---

A map: geographic data drawn in a projection, which can be zoomed, panned and rotated. Its series draw polygons, lines and points.

## Import

```js
import * as am5map from "@amcharts/amcharts5/map";

am5map.MapChart.new(root, { /* settings */ });
```

## Inheritance

Extends: SerialChart → Chart → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IMapChartSettings` — get_api_reference shows it after this page
- Private settings: `IMapChartPrivate`
- Events: `IMapChartEvents`

## Properties

Public properties (not settings):

- **boxZoomSelection** (`Rectangle`) — The box drawn while zooming with `boxZoom`. _Since 5.20.2._ _Note:_ Style its `fill` / `stroke`; the chart sizes and shows it.

## Methods

- `animateProjection(target: GeoProjection, targetRaw: GeoRawProjection, duration?: number, easing?: (t: Time) => Time, sourceRaw?: GeoRawProjection): void` — Morphs the map from the current projection into `target`. d3-geo projections don't expose their raw functions, so pass `targetRaw` along, and on the first call `sourceRaw` for the current projection; later calls reuse the previous target's. Without a source raw function, or with a zero duration, the projection switches at once. Parameters: `target`: Target projection (e.g. `geoOrthographic()`); `targetRaw`: Raw projection function (e.g. `geoOrthographicRaw`); `duration`: Duration in milliseconds (default: `animationDuration`); `easing`: Easing function (default: `animationEasing`); `sourceRaw`: Raw function of the current projection (needed on first call). _Since 5.16.0._
- `convert(point: IGeoPoint, rotationX?: number, rotationY?: number): IPoint` — Converts geographic coordinates to a point on the map. Given one rotation only, it takes the other as `0`; `rotationZ` stays as it is. It reads the map as drawn: a zoom, pan or rotation set since counts from the next frame. Parameters: `point`: Geographic coordinates; `rotationX`: `rotationX` to convert at instead of the current rotation; `rotationY`: `rotationY` to convert at instead of the current rotation. Returns: Point in pixels, relative to the map's area (the chart inside its padding)
- `geoBounds(): { left: number; right: number; top: number; bottom: number; }` — Returns the geographic bounds of the map's geometries, in degrees: longitudes `left` and `right`, latitudes `top` and `bottom`.
- `geoCentroid(): IGeoPoint` — Returns the geographic center of the map's geometries.
- `geoPoint(): IGeoPoint` — Returns the geographic point in the middle of the view. To come back to the view later: `chart.zoomToGeoPoint(geoPoint, zoomLevel, true)`. _Since 5.2.19._
- `getArea(dataItem: DataItem<IMapPolygonSeriesDataItem>): number` — Returns the area a polygon takes on screen at the current zoom. Parameters: `dataItem`: Data item of a `MapPolygonSeries`. Returns: Area in square pixels
- `goHome(duration?: number): void` — Zooms and moves the map to its home position: `homeZoomLevel`, `homeGeoPoint`, and `homeRotationX` and `homeRotationY` if set. Called before the map is loaded, it goes there once it is. Parameters: `duration`: Animation duration in milliseconds; `animationDuration` if not set. Docs: https://docs.amcharts.com/v5/charts/map-chart/map-pan-zoom/#resetting-positionlevel
- `homeGeoPoint(): IGeoPoint` — Returns the point `goHome()` centers on: `homeGeoPoint` if set, otherwise the middle of the map fitted to the chart at the home rotation, whatever the current view.
- `invert(point: IPoint): IGeoPoint` — Converts a point on the map to geographic coordinates. A point with no location, such as one off a globe, gives longitude and latitude `0`. It reads the map as drawn: a zoom, pan or rotation set since counts from the next frame. Parameters: `point`: Point in pixels, relative to the map's area (the chart inside its padding). Returns: Geographic coordinates
- `rotate(rotationX?: number, rotationY?: number, duration?: number): void` — Rotates the map to the given angles, in degrees. Does nothing on a projection that can't rotate. Parameters: `rotationX`: `rotationX` to end at; unchanged if not set; `rotationY`: `rotationY` to end at; unchanged if not set; `duration`: Animation duration in milliseconds; `animationDuration` if not set.
- `zoomIn(): Animation<this["_settings"]["zoomLevel"]> | undefined` — Zooms the map in by `zoomStep`, at the middle of the view. Returns: Zoom level animation
- `zoomOut(): Animation<this["_settings"]["zoomLevel"]> | undefined` — Zooms the map out by `zoomStep`, at the middle of the view. Returns: Zoom level animation
- `zoomToGeoBounds(geoBounds: { left: number; right: number; top: number; bottom: number; }, duration?: number, rotationX?: number, rotationY?: number): Animation<this["_settings"]["zoomLevel"]> | undefined` — Zooms the map to fit geographic bounds as they are drawn, with a 10% margin. Bounds across the date line have `right` less than `left`, such as 170 to -170 (or 170 to 190, or -190 to -170). A flat map shows them at both of its edges unless it is turned: pass `rotationX`, -180 here. Parameters: `geoBounds`: Longitudes `left` and `right`, latitudes `top` and `bottom`, in degrees; `duration`: Animation duration in milliseconds; `animationDuration` if not set; `rotationX`: `rotationX` to end at; `rotationY`: `rotationY` to end at. Returns: Zoom level animation
- `zoomToGeoPoint(geoPoint: IGeoPoint, level: number, center?: boolean, duration?: number, rotationX?: number, rotationY?: number): Animation<this["_settings"]["zoomLevel"]> | undefined` — Zooms the map in or out at a geographic point. Parameters: `geoPoint`: Geographic point; `level`: Zoom level, kept within `minZoomLevel` and `maxZoomLevel`; `center`: Move the point to the middle; otherwise it stays where it is; `duration`: Animation duration in milliseconds; `animationDuration` if not set; `rotationX`: `rotationX` to end at; `rotationY`: `rotationY` to end at. Returns: Zoom level animation; none if called before the map is drawn, as it zooms once it is
- `zoomToPoint(point: IPoint, level: number, center?: boolean, duration?: number): Animation<this["_settings"]["zoomLevel"]> | undefined` — Zooms the map in or out at a point on it. With `centerMapOnZoomOut`, a zoom to `homeZoomLevel` centers on the home point instead. Parameters: `point`: Point in pixels, relative to the map's area (the chart inside its padding); `level`: Zoom level, kept within `minZoomLevel` and `maxZoomLevel`; `center`: Move the point to the middle; otherwise it stays where it is; `duration`: Animation duration in milliseconds; `animationDuration` if not set. Returns: Zoom level animation

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Container")`) for signatures and descriptions.

- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
