---
title: "XYCursor"
type: "class"
source: "https://docs.amcharts.com/v5/reference/xycursor/"
generatedFrom: "@amcharts/amcharts5@5.24.0"
---

Crosshair lines over an `XYChart` that follow the pointer and show the axis and series tooltips. Dragging can zoom or select (`behavior`).

Docs: https://docs.amcharts.com/v5/charts/xy-chart/cursor/

## Import

```js
import * as am5xy from "@amcharts/amcharts5/xy";

am5xy.XYCursor.new(root, { /* settings */ });
```

## Inheritance

Extends: Container → Sprite → Entity → Settings
Extended by: CurveCursor, RadarCursor

## Settings and related interfaces

- Settings: `IXYCursorSettings` — get_api_reference shows it after this page
- Private settings: `IXYCursorPrivate`
- Events: `IXYCursorEvents`

## Properties

Public properties (not settings):

- **chart** (`XYChart`) — The chart the cursor belongs to.
- **lineX** (`Grid`) — The crosshair's vertical line, which follows the pointer along X.
- **lineY** (`Grid`) — The crosshair's horizontal line, which follows the pointer along Y.
- **selection** (`Graphics`) — The shaded area drawn while dragging. With a select `behavior`, it stays after the release.

## Methods

- `handleMove(point?: IPoint, skipEvent?: boolean, originalEvent?: IPointerEvent): void` — Moves the cursor to a point, as if the pointer were there. Parameters: `point`: Point relative to the root; the last point if not given; `skipEvent`: Do not dispatch `"cursormoved"`; `originalEvent`: The pointer event behind the move, passed on with `"cursormoved"`.
- `updateCursor(): void` — Places the cursor again at its last point, after the chart under it has changed. A cursor with `alwaysShow` goes to `positionX` and `positionY` if they are set.

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Container")`) for signatures and descriptions.

- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
