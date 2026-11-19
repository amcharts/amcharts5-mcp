---
title: "LineArrowSeries"
type: "class"
source: "https://docs.amcharts.com/v5/reference/linearrowseries/"
generatedFrom: "@amcharts/amcharts5@5.23.0"
---

Draws a straight line with an arrowhead at its end, for the Line Arrow tool of a `StockChart`.

_Since 5.10.5._

## Import

```js
import * as am5stock from "@amcharts/amcharts5/stock";

am5stock.LineArrowSeries.new(root, { /* settings */ });
```

## Inheritance

Extends: SimpleLineSeries → DrawingSeries → LineSeries → XYSeries → Series → Component → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `ILineArrowSeriesSettings` — get_api_reference shows it after this page
- Private settings: `ILineArrowSeriesPrivate`
- Data item fields: `ILineArrowSeriesDataItem`

## Properties

Public properties (not settings):

- **arrows** (`ListTemplate<Triangle>`) — Arrowheads at the ends of the lines.

## Methods

- `clearDrawings(): void` — Deletes all drawings of the series.

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("SimpleLineSeries")`) for signatures and descriptions.

- _SimpleLineSeries_: addLine, addPoints, enableDrawingSelection, setInteractive
- _DrawingSeries_: cancelDrawing, deleteDrawing, deleteSelected, disableDrawing, disableErasing, disposeIndex, enableDrawing, enableErasing, endIndex, getContext, getIndex, indexToDrawingId, markDirtyDrawings, selectDrawing, startIndex, toggleDrawing, unselectAllDrawings, unselectDrawing, unselectDrawings
- _XYSeries_: createAxisRange, hide, hideDataItem, hideTooltip, resetExtremes, show, showDataItem, showDataItemTooltip
- _Series_: addBullet, openUrl
- _Component_: getDataItemById, makeDataItem, markDirtyValues, pushDataItem, updateData
- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
