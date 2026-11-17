---
title: "DrawingSeries"
type: "class"
source: "https://docs.amcharts.com/v5/reference/drawingseries/"
generatedFrom: "@amcharts/amcharts5@5.22.0"
---

Base class for the series that hold the drawings of a `StockChart`.

## Import

```js
import * as am5stock from "@amcharts/amcharts5/stock";

am5stock.DrawingSeries.new(root, { /* settings */ });
```

## Inheritance

Extends: LineSeries → XYSeries → Series → Component → Container → Sprite → Entity → Settings
Extended by: DoodleSeries, EllipseSeries, PolylineSeries, SimpleLineSeries

## Settings and related interfaces

- Settings: `IDrawingSeriesSettings` — get_api_reference shows it after this page
- Private settings: `IDrawingSeriesPrivate`
- Data item fields: `IDrawingSeriesDataItem`

## Properties

Public properties (not settings):

- **circles** (`ListTemplate<Circle>`) — Inner circles of the grips.
- **grips** (`ListTemplate<Container>`) — Grips on the drawings' points, which can be dragged to reshape them.
- **outerCircles** (`ListTemplate<Circle>`) — Outer circles of the grips.
- **selectors** (`ListTemplate<Rectangle>`) — Rectangles drawn around the selected drawings.

## Methods

- `cancelDrawing(): void` — Cancels the drawing in progress, deleting it. _Since 5.9.0._
- `clearDrawings(): void` — Deletes all drawings of the series.
- `deleteDrawing(id: string): void` — Deletes a drawing of this series by its ID. Parameters: `id`: Drawing ID. _Since 5.9.0._
- `deleteSelected(): void` — Deletes the selected drawings of this series. _Since 5.9.0._
- `disableDrawing(): void` — Turns drawing off.
- `disableErasing(): void` — Turns erasing off.
- `disposeIndex(index: number): void` — Deletes the drawing at an index. Parameters: `index`: Index of the drawing. _Since 5.7.7._
- `enableDrawing(): void` — Turns drawing on: the pointer on the plot area draws new drawings.
- `enableDrawingSelection(value: boolean): void`
- `enableErasing(): void` — Turns erasing on: a click on a drawing deletes it.
- `endIndex(): number` — Returns the index after the last data item in the visible range.
- `getContext(id: string): any` — Returns the data context of a drawing, found by its ID. Parameters: `id`: Drawing ID. Returns: Data context
- `getIndex(id: string): number | null` — Returns the index of the drawing with an ID, or `null` if there is none. Parameters: `id`: Drawing ID. Returns: Index _Since 5.8.4._
- `indexToDrawingId(index: number): string | undefined` — Returns the ID of the drawing at an index. Parameters: `index`: Index of the drawing. Returns: Drawing ID
- `markDirtyDrawings(): void` — Makes the `StockChart` dispatch `drawingsupdated`.
- `selectDrawing(id: string, keepSelection?: boolean): void` — Selects a drawing of this series by its ID. Works only while drawing selection is on (`drawingSelectionEnabled` of the `StockChart`). Parameters: `id`: Drawing ID; `keepSelection`: Keep the drawings already selected. _Since 5.9.0._
- `setInteractive(value: boolean): void` — Makes the drawings react to the pointer, or not. Parameters: `value`: Interactive.
- `startIndex(): number` — Returns the index of the first data item in the visible range.
- `toggleDrawing(enabled?: boolean): void` — Updates the drawings for drawing mode turning on or off. Here, with the `StockChart` `hideDrawingGrips` on, it shows the grips only while drawing mode is on. Parameters: `enabled`: Drawing mode on.
- `unselectAllDrawings(): number` — Unselects all selected drawings of the whole `StockChart`, not only of this series. Returns: Number of drawings unselected _Since 5.9.0._
- `unselectDrawing(id: string): void` — Unselects a drawing of this series by its ID. Parameters: `id`: Drawing ID. _Since 5.9.0._
- `unselectDrawings(): number` — Unselects the selected drawings of this series. Returns: Number of drawings unselected _Since 5.9.0._

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("XYSeries")`) for signatures and descriptions.

- _XYSeries_: createAxisRange, hide, hideDataItem, hideTooltip, resetExtremes, show, showDataItem, showDataItemTooltip
- _Series_: addBullet, openUrl
- _Component_: getDataItemById, makeDataItem, markDirtyValues, pushDataItem, updateData
- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
