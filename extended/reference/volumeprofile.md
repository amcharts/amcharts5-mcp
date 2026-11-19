---
title: "VolumeProfile"
type: "class"
source: "https://docs.amcharts.com/v5/reference/volumeprofile/"
generatedFrom: "@amcharts/amcharts5@5.23.0"
---

Volume Profile indicator: horizontal rows over the main series showing how much volume traded at each price in the visible range, split into up and down volume.

_Since 5.7.0._ Docs: https://docs.amcharts.com/v5/charts/stock/indicators/

## Import

```js
import * as am5stock from "@amcharts/amcharts5/stock";

am5stock.VolumeProfile.new(root, { /* settings */ });
```

## Inheritance

Extends: Indicator → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IVolumeProfileSettings` — get_api_reference shows it after this page
- Private settings: `IVolumeProfilePrivate`
- Events: `IVolumeProfileEvents`

## Properties

Public properties (not settings):

- **series** (`ColumnSeries`) — Series of the down volume columns.
- **upSeries** (`ColumnSeries`) — Series of the up volume columns, drawn after the down volume.
- **xAxis** (`ValueAxis<AxisRendererX>`) — Horizontal axis the rows' volume is measured on.

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Indicator")`) for signatures and descriptions.

- _Indicator_: hide, markDataDirty, setCustomData, show
- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
