---
title: "StockChart"
type: "class"
source: "https://docs.amcharts.com/v5/reference/stockchart/"
generatedFrom: "@amcharts/amcharts5@5.24.0"
---

The stock chart: `StockPanel` charts stacked over one date range, with indicators, drawings and series comparison.

Docs: https://docs.amcharts.com/v5/charts/stock/

## Import

```js
import * as am5stock from "@amcharts/amcharts5/stock";

am5stock.StockChart.new(root, { /* settings */ });
```

## Inheritance

Extends: Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IStockChartSettings` — get_api_reference shows it after this page
- Private settings: `IStockChartPrivate`
- Events: `IStockChartEvents`

## Properties

Public properties (not settings):

- **controls** (`StockControl[]`) — All `StockControl` elements created for this chart. _Since 5.7.0._
- **indicators** (`ListAutoDispose<Indicator>`) — The chart's indicators. Docs: https://docs.amcharts.com/v5/charts/stock/indicators/
- **panels** (`ListAutoDispose<StockPanel>`) — The chart's panels, from top to bottom. Docs: https://docs.amcharts.com/v5/charts/stock/#panels
- **panelsContainer** (`Container`) — The container the panels are placed in.
- **spriteResizer** (`SpriteResizer`) — The `SpriteResizer` that resizes and rotates icon and label drawings. _Since 5.7.0._
- **toolsContainer** (`Container`) — A container above the panels for extra tools, such as a `Scrollbar`.

## Methods

- `addComparingSeries(series: XYSeries): XYSeries` — Adds a series to compare with `stockSeries`: to its panel, and to its legend with a close button. With `autoSetPercentScale`, also turns on percent scale mode. Parameters: `series`: Compared series. Returns: The same series
- `cancelDrawing(): void` — Cancels the drawing in progress, deleting it. _Since 5.9.0._
- `deleteDrawing(id: string): void` — Deletes a drawing by its ID. Parameters: `id`: Drawing ID. _Since 5.9.0._
- `deleteSelectedDrawings(): void` — Deletes all selected drawings. _Since 5.9.0._
- `drawingsInteractive(value: boolean, except?: DrawingSeries): void` — Makes drawings react to the pointer, or not. Parameters: `value`: Drawings interactive?; `except`: Drawing series to leave as it is. _Since 5.4.9._
- `getControl(type: string): StockControl | undefined` — Returns the first `StockControl` of a class, such as `"DrawingControl"`. Parameters: `type`: Class name of the control. Returns: Control _Since 5.7.0._
- `getSeriesDefault(series: XYSeries, setting: keyof IXYSeriesSettings): any` — Returns a series setting as it was before percent scale mode changed it. Parameters: `series`: Series; `setting`: Setting key. Returns: Value
- `getVolumeColor(dataItem: DataItem<IXYSeriesDataItem>, negativeColor?: Color, positiveColor?: Color): Color | undefined` — Returns the color for a volume column: `positiveColor` if the `stockSeries` close at that data item is at or above the previous close, `negativeColor` if it is below. Parameters: `dataItem`: Data item of the volume column; `negativeColor`: Color for a lower close; `volumeNegativeColor` if not set; `positiveColor`: Color for a higher or equal close; `volumePositiveColor` if not set. Returns: Color
- `markDirtyDrawings(): void` — Dispatches `drawingsupdated` on the next update.
- `markDirtyIndicators(): void` — Dispatches `indicatorsupdated` on the next update.
- `removeComparingSeries(series: XYSeries): void` — Removes a compared series. With `autoSetPercentScale`, turns percent scale mode off when no compared series are left. Parameters: `series`: Compared series.
- `selectDrawing(id: string, keepSelection?: boolean): void` — Selects a drawing by its ID. Works only while drawing selection is on (`drawingSelectionEnabled`). Parameters: `id`: Drawing ID; `keepSelection`: Keep the drawings already selected. _Since 5.9.0._
- `setPercentScale(percentScale?: boolean): void` — Turns percent scale mode on or off. In it, `percentScaleSeriesSettings` apply to the series on the main series' Y axis, and `percentScaleValueAxisSettings` to that axis. Also turns that axis' `logarithmic` off. Parameters: `percentScale`: Percent scale on; if not set, on when there are compared series.
- `toggleDrawing(enabled?: boolean): void` — Updates the drawings for drawing mode turning on or off: icon and label drawings react to the pointer only while it is on, and with `hideDrawingGrips`, grips show only while it is on. Parameters: `enabled`: Drawing mode on. _Since 5.10.6._
- `unselectDrawing(id: string): void` — Unselects a drawing by its ID. Parameters: `id`: Drawing ID. _Since 5.9.0._
- `unselectDrawings(): number` — Unselects all selected drawings. Returns: Number of drawings unselected _Since 5.9.0._

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Container")`) for signatures and descriptions.

- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
