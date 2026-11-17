---
title: "IconSeries"
type: "class"
source: "https://docs.amcharts.com/v5/reference/iconseries/"
generatedFrom: "@amcharts/amcharts5@5.22.0"
---

Draws icons, for the Arrows & Icons tool of a `StockChart`.

## Import

```js
import * as am5stock from "@amcharts/amcharts5/stock";

am5stock.IconSeries.new(root, { /* settings */ });
```

## Inheritance

Extends: PolylineSeries → DrawingSeries → LineSeries → XYSeries → Series → Component → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IIconSeriesSettings` — get_api_reference shows it after this page
- Private settings: `IIconSeriesPrivate`
- Data item fields: `IIconSeriesDataItem`

## Properties

Public properties (not settings):

- **spriteResizer** (`SpriteResizer`) — The chart's `SpriteResizer`, which resizes and rotates icons.

## Methods

- `setInteractive(value: boolean): void` — Makes the drawings react to the pointer, or not.
- `toggleDrawing(enabled: boolean): void` — Updates the drawings for drawing mode turning on or off. Here, with the `StockChart` `hideDrawingGrips` on, it shows the grips only while drawing mode is on.

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("PolylineSeries")`) for signatures and descriptions.

- _PolylineSeries_: cancelDrawing, clearDrawings, disableDrawing
- _DrawingSeries_: deleteDrawing, deleteSelected, disableErasing, disposeIndex, enableDrawing, enableDrawingSelection, enableErasing, endIndex, getContext, getIndex, indexToDrawingId, markDirtyDrawings, selectDrawing, startIndex, unselectAllDrawings, unselectDrawing, unselectDrawings
- _XYSeries_: createAxisRange, hide, hideDataItem, hideTooltip, resetExtremes, show, showDataItem, showDataItemTooltip
- _Series_: addBullet, openUrl
- _Component_: getDataItemById, makeDataItem, markDirtyValues, pushDataItem, updateData
- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
