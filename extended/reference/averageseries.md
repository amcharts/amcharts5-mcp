---
title: "AverageSeries"
type: "class"
source: "https://docs.amcharts.com/v5/reference/averageseries/"
generatedFrom: "@amcharts/amcharts5@5.22.0"
---

A `SimpleLineSeries` subclass.

## Import

```js
import * as am5stock from "@amcharts/amcharts5/stock";

am5stock.AverageSeries.new(root, { /* settings */ });
```

## Inheritance

Extends: SimpleLineSeries → DrawingSeries → LineSeries → XYSeries → Series → Component → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IAverageSeriesSettings` — get_api_reference shows it after this page
- Private settings: `IAverageSeriesPrivate`
- Data item fields: `IAverageSeriesDataItem`

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("SimpleLineSeries")`) for signatures and descriptions.

- _SimpleLineSeries_: addLine, addPoints, enableDrawingSelection, setInteractive
- _DrawingSeries_: cancelDrawing, clearDrawings, deleteDrawing, deleteSelected, disableDrawing, disableErasing, disposeIndex, enableDrawing, enableErasing, endIndex, getContext, getIndex, indexToDrawingId, markDirtyDrawings, selectDrawing, startIndex, toggleDrawing, unselectAllDrawings, unselectDrawing, unselectDrawings
- _XYSeries_: createAxisRange, hide, hideDataItem, hideTooltip, resetExtremes, show, showDataItem, showDataItemTooltip
- _Series_: addBullet, openUrl
- _Component_: getDataItemById, makeDataItem, markDirtyValues, pushDataItem, updateData
- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
