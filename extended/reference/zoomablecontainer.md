---
title: "ZoomableContainer"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/zoomablecontainer/"
scraped: "2026-03-15"
---

A version of Container which adds zooming capabilities.

## Import

```javascript
// Import ZoomableContainer
import * as am5 from "@amcharts/amcharts5"
```

## Inheritance

Extends: Container

> **Note:** This class also inherits all settings, properties, methods, and events from Container (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **animationDuration** (`undefined | number`) — Default 600 Animation duration (ms) for zoom animations.
- **animationEasing** (`undefined | ( t: Time) => Time`) — Default am5.ease.out(am5.ease.cubic) Easing function to use for zoom animations.
- **maxPanOut** (`undefined | number`) — Default 0.4 How much of a content can go outside the viewport.
- **maxZoomLevel** (`undefined | number`) — Default 32 Maximum zoom-in level.
- **minZoomLevel** (`undefined | number`) — Default 1 Maximum zoom-out level.
- **pinchZoom** (`undefined | false | true`) — Default true Pinch-zooming is enabled on touch devices.

## Properties

- **contents** (`Container`) — Default this.children.push(Container.new(this._root, { width: p100, height: p100, x: 0, y: 0, draggable: true, background: Rectangle.new(this._root, { fill: color(0xffffff), fillOpacity: 0 }) })) All elements must be added to contents.children instead of children of ZoomableContainer. Click here for more info
