---
title: "MapChart"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/mapchart/"
scraped: "2026-03-15"
---

Sources
MapChart can be used (imported) via one of the following packages.
// Import MapChart
import * as am5map from "@amcharts/amcharts5/map";

// Create MapChart
am5map.MapChart.new(root, {
  // ... config if applicable
});

<!-- Load MapChart -->
<script src="map.js"></script>

<script>
// Create MapChart
am5map.MapChart.new(root, {
  // ... config if applicable
});
</script>

## Import

```javascript
// Import MapChart
import * as am5map from "@amcharts/amcharts5/map"
```

## Inheritance

Extends: SerialChart

> **Note:** This class also inherits all settings, properties, methods, and events from SerialChart (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **animationDuration** (`undefined | number`) — Duration of zoom/pan animations, in milliseconds.
- **animationEasing** (`undefined | ( t: Time) => Time`) — Default am5.ease.out($ease.cubic) An easing function to use for zoom/pan animations. Click here for more info
- **centerMapOnZoomOut** (`undefined | false | true`) — Default true Setting true means that the map will automatically center itself (or go to homeGeoPoint if set) when fully zoomed out. false would mean that zoom out will be centered around the mouse cursor (when zooming using wheel), or current map position. @since 5.2.1
- **homeGeoPoint** (`IGeoPoint`) — Initial coordinates to center map on load or goHome() call. Click here for more info
- **homeRotationX** (`undefined | number`) — Initial/home rotationX. Click here for more info
- **homeRotationY** (`undefined | number`) — Initial/home rotationY. Click here for more info
- **homeZoomLevel** (`undefined | number`) — Initial/home zoom level. Click here for more info
- **maxPanOut** (`undefined | number`) — Default 0.4 How much of a map can go outside the viewport. Click here for more info
- **maxZoomLevel** (`undefined | number`) — Highest zoom level map is allowed to zoom in to. @deault 32
- **minZoomLevel** (`undefined | number`) — Lowest zoom level map is allowed to zoom in to. @deault 1
- **panX** (`"none" | "rotateX" | "translateX"`) — Default "translateX" Defines what happens when map is being dragged horizontally. Click here for more info
- **panY** (`"none" | "rotateY" | "translateY"`) — Default "translateY" Defines what happens when map is being dragged vertically. Click here for more info
- **pinchZoom** (`undefined | false | true`) — Default true Enables pinch-zooming of the map on multi-touch devices. Click here for more info
- **projection** (`GeoProjection`) — A projection to use when plotting the map. Click here for more info
- **rotationX** (`undefined | number`) — Horizontal centering of the map. Click here for more info
- **rotationY** (`undefined | number`) — Vertical centering of the map. Click here for more info
- **rotationZ** (`undefined | number`) — Depth centering of the map. Click here for more info
- **translateX** (`undefined | number`) — current x position of a map
- **translateY** (`undefined | number`) — current y position of a map
- **wheelDuration** (`undefined | number`) — Duration of mouse-wheel action animation, in milliseconds. NOTE: this setting is ignored when wheelX or wheelY is set to "zoom".
- **wheelEasing** (`undefined | ( t: Time) => Time`) — Default am5.ease.out($ease.cubic) An easing function to use for mouse wheel action animations. NOTE: this setting is ignored when wheelX or wheelY is set to "zoom". Click here for more info
- **wheelSensitivity** (`undefined | number`) — Default 1 Sensitivity of a mouse wheel. NOTE: this setting is ignored when wheelX or wheelY is set to "zoom".
- **wheelX** (`"none" | "zoom" | "rotateX" | "rotateY"`) — Default "none" Defines what happens when horizontal mouse wheel (only some mouses do have such a wheel) Click here for more info
- **wheelY** (`"none" | "zoom" | "rotateX" | "rotateY"`) — Default "zoom" Defines what happens when mouse wheel is turned. Click here for more info
- **zoomControl** (`ZoomControl`) — A ZoomControl instance. Click here for more info
- **zoomLevel** (`undefined | number`) — Current zoom level.
