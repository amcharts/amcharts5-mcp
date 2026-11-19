---
title: "RadarCursor"
type: "class"
source: "https://docs.amcharts.com/v5/reference/radarcursor/"
generatedFrom: "@amcharts/amcharts5@5.23.0"
---

Cursor for a `RadarChart`: a line out from the center and an arc around it that follow the pointer and show the axis and series tooltips.

Docs: https://docs.amcharts.com/v5/charts/radar-chart/#cursor

## Import

```js
import * as am5radar from "@amcharts/amcharts5/radar";

am5radar.RadarCursor.new(root, { /* settings */ });
```

## Inheritance

Extends: XYCursor → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IRadarCursorSettings` — get_api_reference shows it after this page
- Private settings: `IRadarCursorPrivate`
- Events: `IRadarCursorEvents`

## Properties

Public properties (not settings):

- **chart** (`RadarChart`) — The chart the cursor belongs to.

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("XYCursor")`) for signatures and descriptions.

- _XYCursor_: handleMove, updateCursor
- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
