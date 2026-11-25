---
title: "MapLine"
type: "class"
source: "https://docs.amcharts.com/v5/reference/mapline/"
generatedFrom: "@amcharts/amcharts5@5.24.0"
---

A line in a `MapLineSeries`.

## Import

```js
import * as am5map from "@amcharts/amcharts5/map";

am5map.MapLine.new(root, { /* settings */ });
```

## Inheritance

Extends: Graphics → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IMapLineSettings` — get_api_reference shows it after this page
- Private settings: `IMapLinePrivate`
- Events: `IMapLineEvents`

## Methods

- `positionToAltitude(position: number): number` — Returns the line's altitude at a position along it. A line without `altitude` gives `0`. Parameters: `position`: Position from `0` (start) to `1` (end). Returns: Altitude in metres _Since 5.21.0._
- `positionToGeoPoint(position: number): IGeoPoint` — Returns the geographic point at a position along the line. Parameters: `position`: Position from `0` (start) to `1` (end). Returns: Geographic point

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Sprite")`) for signatures and descriptions.

- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
