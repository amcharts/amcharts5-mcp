---
title: "SimpleLineSeries"
type: "class"
source: "https://docs.amcharts.com/v5/reference/simplelineseries/"
generatedFrom: "@amcharts/amcharts5@5.23.0"
---

Draws a straight line between two points.

## Import

```js
import * as am5stock from "@amcharts/amcharts5/stock";

am5stock.SimpleLineSeries.new(root, { /* settings */ });
```

## Inheritance

Extends: DrawingSeries → LineSeries → XYSeries → Series → Component → Container → Sprite → Entity → Settings
Extended by: AverageSeries, FibonacciSeries, HorizontalLineSeries, HorizontalRaySeries, LineArrowSeries, ParallelChannelSeries, QuadrantLineSeries, RectangleSeries, RegressionSeries, TrendLineSeries, VerticalLineSeries

## Settings and related interfaces

- Settings: `ISimpleLineSeriesSettings` — get_api_reference shows it after this page
- Private settings: `ISimpleLineSeriesPrivate`
- Data item fields: `ISimpleLineSeriesDataItem`

## Properties

Public properties (not settings):

- **hitLines** (`ListTemplate<Line>`) — Invisible wide lines along the drawings that catch the pointer.
- **lines** (`ListTemplate<Line>`) — Dotted extensions of the lines beyond their ends (`showExtension`).

## Methods

- `addLine(point: IPoint): void` — Adds a line drawing through a point, without the pointer. For the series of the `"Horizontal Line"`, `"Horizontal Ray"` and `"Vertical Line"` tools. Parameters: `point`: Point relative to the root. _Since 5.10.2._
- `addPoints(point: IPoint, index: number): void`
- `enableDrawingSelection(value: boolean): void`
- `setInteractive(value: boolean): void` — Makes the drawings react to the pointer, or not.

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("DrawingSeries")`) for signatures and descriptions.

- _DrawingSeries_: cancelDrawing, clearDrawings, deleteDrawing, deleteSelected, disableDrawing, disableErasing, disposeIndex, enableDrawing, enableErasing, endIndex, getContext, getIndex, indexToDrawingId, markDirtyDrawings, selectDrawing, startIndex, toggleDrawing, unselectAllDrawings, unselectDrawing, unselectDrawings
- _XYSeries_: createAxisRange, hide, hideDataItem, hideTooltip, resetExtremes, show, showDataItem, showDataItemTooltip
- _Series_: addBullet, openUrl
- _Component_: getDataItemById, makeDataItem, markDirtyValues, pushDataItem, updateData
- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
