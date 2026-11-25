---
title: "PolylineSeries"
type: "class"
source: "https://docs.amcharts.com/v5/reference/polylineseries/"
generatedFrom: "@amcharts/amcharts5@5.24.0"
---

Draws a line through any number of points (a polyline).

## Import

```js
import * as am5stock from "@amcharts/amcharts5/stock";

am5stock.PolylineSeries.new(root, { /* settings */ });
```

## Inheritance

Extends: DrawingSeries → LineSeries → XYSeries → Series → Component → Container → Sprite → Entity → Settings
Extended by: IconSeries, LabelSeries

## Settings and related interfaces

- Settings: `IPolylineSeriesSettings` — get_api_reference shows it after this page
- Private settings: `IPolylineSeriesPrivate`
- Data item fields: `IPolylineSeriesDataItem`

## Methods

- `cancelDrawing(): void` — Cancels the drawing in progress, deleting it. _Since 5.9.0._
- `clearDrawings(): void` — Deletes all drawings of the series.
- `disableDrawing(): void` — Turns drawing off.

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("DrawingSeries")`) for signatures and descriptions.

- _DrawingSeries_: deleteDrawing, deleteSelected, disableErasing, disposeIndex, enableDrawing, enableDrawingSelection, enableErasing, endIndex, getContext, getIndex, indexToDrawingId, markDirtyDrawings, selectDrawing, setInteractive, startIndex, toggleDrawing, unselectAllDrawings, unselectDrawing, unselectDrawings
- _XYSeries_: createAxisRange, hide, hideDataItem, hideTooltip, resetExtremes, show, showDataItem, showDataItemTooltip
- _Series_: addBullet, getSummary, openUrl
- _Component_: getDataItemById, makeDataItem, markDirtyValues, pushDataItem, updateData
- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
