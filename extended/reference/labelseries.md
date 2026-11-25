---
title: "LabelSeries"
type: "class"
source: "https://docs.amcharts.com/v5/reference/labelseries/"
generatedFrom: "@amcharts/amcharts5@5.24.0"
---

Draws text labels typed in on the chart, for the Label tool of a `StockChart`.

## Import

```js
import * as am5stock from "@amcharts/amcharts5/stock";

am5stock.LabelSeries.new(root, { /* settings */ });
```

## Inheritance

Extends: PolylineSeries → DrawingSeries → LineSeries → XYSeries → Series → Component → Container → Sprite → Entity → Settings
Extended by: CalloutSeries

## Settings and related interfaces

- Settings: `ILabelSeriesSettings` — get_api_reference shows it after this page
- Private settings: `ILabelSeriesPrivate`
- Data item fields: `ILabelSeriesDataItem`

## Properties

Public properties (not settings):

- **spriteResizer** (`SpriteResizer`) — The chart's `SpriteResizer`, which resizes and rotates labels.

## Methods

- `toggleDrawing(enabled?: boolean): void` — Updates the drawings for drawing mode turning on or off. Here, with the `StockChart` `hideDrawingGrips` on, it shows the grips only while drawing mode is on.

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("PolylineSeries")`) for signatures and descriptions.

- _PolylineSeries_: cancelDrawing, clearDrawings, disableDrawing
- _DrawingSeries_: deleteDrawing, deleteSelected, disableErasing, disposeIndex, enableDrawing, enableDrawingSelection, enableErasing, endIndex, getContext, getIndex, indexToDrawingId, markDirtyDrawings, selectDrawing, setInteractive, startIndex, unselectAllDrawings, unselectDrawing, unselectDrawings
- _XYSeries_: createAxisRange, hide, hideDataItem, hideTooltip, resetExtremes, show, showDataItem, showDataItemTooltip
- _Series_: addBullet, getSummary, openUrl
- _Component_: getDataItemById, makeDataItem, markDirtyValues, pushDataItem, updateData
- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
