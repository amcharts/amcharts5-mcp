---
title: "MapPolygon"
type: "class"
source: "https://docs.amcharts.com/v5/reference/mappolygon/"
generatedFrom: "@amcharts/amcharts5@5.22.0"
---

A polygon in a `MapPolygonSeries`.

## Import

```js
import * as am5map from "@amcharts/amcharts5/map";

am5map.MapPolygon.new(root, { /* settings */ });
```

## Inheritance

Extends: Graphics → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IMapPolygonSettings` — get_api_reference shows it after this page
- Private settings: `IMapPolygonPrivate`

## Properties

Public properties (not settings):

- **series** (`MapPolygonSeries`) — The series the polygon belongs to.

## Methods

- `geoCentroid(): IGeoPoint` — Returns the polygon's geographic centroid. For an odd shape it can lie outside the polygon; `visualCentroid()` can't. Returns: Center
- `visualCentroid(): IGeoPoint` — Returns the point inside the polygon farthest from its edges, in its largest part: where a label fits best. Tooltips point there. Returns: Center

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Sprite")`) for signatures and descriptions.

- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
