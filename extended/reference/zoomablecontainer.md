---
title: "ZoomableContainer"
type: "class"
source: "https://docs.amcharts.com/v5/reference/zoomablecontainer/"
generatedFrom: "@amcharts/amcharts5@5.24.0"
---

A `Container` whose `contents` can be zoomed with the wheel, a pinch or `ZoomTools`, and panned by dragging.

_Since 5.8.0._ Docs: https://docs.amcharts.com/v5/concepts/common-elements/containers/#zoomable-container

## Import

```js
import * as am5 from "@amcharts/amcharts5";

am5.ZoomableContainer.new(root, { /* settings */ });
```

## Inheritance

Extends: Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IZoomableContainerSettings` — get_api_reference shows it after this page
- Private settings: `IZoomableContainerPrivate`
- Events: `IZoomableContainerEvents`

## Properties

Public properties (not settings):

- **contents** (`Container`) — The container that zooms and pans. Add elements to `contents.children`, not to the ZoomableContainer's own `children`. Docs: https://docs.amcharts.com/v5/concepts/common-elements/containers/#zoomable-container

## Methods

- `goHome(): void` — Takes the contents back to their home view: scale `1`, not panned.
- `zoomIn(): Animation<this["_settings"]["scale"]> | undefined` — Zooms in by `zoomStep`, around the container's center. Returns: Zoom animation
- `zoomOut(): Animation<this["_settings"]["scale"]> | undefined` — Zooms out by `zoomStep`, around the container's center. Returns: Zoom animation
- `zoomToPoint(point: IPoint, level: number): Animation<this["_settings"]["scale"]> | undefined` — Zooms to a level, keeping the contents under `point` in place. The level is kept between `minZoomLevel` and `maxZoomLevel`. Parameters: `point`: Point in the container's coordinates; `level`: Zoom level. Returns: Zoom animation

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Container")`) for signatures and descriptions.

- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
