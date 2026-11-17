---
title: "DoodleSeries"
type: "class"
source: "https://docs.amcharts.com/v5/reference/doodleseries/"
generatedFrom: "@amcharts/amcharts5@5.22.0"
---

A `DrawingSeries` subclass.

## Import

```js
import * as am5stock from "@amcharts/amcharts5/stock";

am5stock.DoodleSeries.new(root, { /* settings */ });
```

## Inheritance

Extends: DrawingSeries → LineSeries → XYSeries → Series → Component → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IDoodleSeriesSettings` — get_api_reference shows it after this page
- Private settings: `IDoodleSeriesPrivate`
- Data item fields: `IDoodleSeriesDataItem`

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("DrawingSeries")`) for signatures and descriptions.

- _DrawingSeries_: cancelDrawing, clearDrawings, deleteDrawing, deleteSelected, disableDrawing, disableErasing, disposeIndex, enableDrawing, enableDrawingSelection, enableErasing, endIndex, getContext, getIndex, indexToDrawingId, markDirtyDrawings, selectDrawing, setInteractive, startIndex, toggleDrawing, unselectAllDrawings, unselectDrawing, unselectDrawings
- _XYSeries_: createAxisRange, hide, hideDataItem, hideTooltip, resetExtremes, show, showDataItem, showDataItemTooltip
- _Series_: addBullet, openUrl
- _Component_: getDataItemById, makeDataItem, markDirtyValues, pushDataItem, updateData
- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
