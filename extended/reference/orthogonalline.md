---
title: "OrthogonalLine"
type: "class"
source: "https://docs.amcharts.com/v5/reference/orthogonalline/"
generatedFrom: "@amcharts/amcharts5@5.24.0"
---

Draws a line of horizontal and vertical segments through `points`, with rounded corners.

_Since 5.14.0._

## Import

```js
import * as am5 from "@amcharts/amcharts5";

am5.OrthogonalLine.new(root, { /* settings */ });
```

## Inheritance

Extends: Graphics → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IOrthogonalLineSettings` — get_api_reference shows it after this page
- Private settings: `IOrthogonalLinePrivate`

## Static methods

- `OrthogonalLine.makeOrthogonal(points: Array<IPoint>): Array<IPoint>` — Returns the points with a corner added between any two that differ in both x and y, so that the path goes horizontally first, then vertically. Parameters: `points`: Points. Returns: Points with only horizontal and vertical segments

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Sprite")`) for signatures and descriptions.

- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
