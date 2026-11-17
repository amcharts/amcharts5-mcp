---
title: "CurveCursor"
type: "class"
source: "https://docs.amcharts.com/v5/reference/curvecursor/"
generatedFrom: "@amcharts/amcharts5@5.22.0"
---

Cursor for a `CurveChart`, `SerpentineChart` or `SpiralChart`: one line across the curve and one along it.

_Since 5.12.0._ Docs: https://docs.amcharts.com/v5/charts/timeline/

## Import

```js
import * as am5timeline from "@amcharts/amcharts5/timeline";

am5timeline.CurveCursor.new(root, { /* settings */ });
```

## Inheritance

Extends: XYCursor → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `ICurveCursorSettings` — get_api_reference shows it after this page
- Private settings: `ICurveCursorPrivate`
- Events: `ICurveCursorEvents`

## Properties

Public properties (not settings):

- **chart** (`CurveChart`) — The chart the cursor belongs to.

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("XYCursor")`) for signatures and descriptions.

- _XYCursor_: handleMove, updateCursor
- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
