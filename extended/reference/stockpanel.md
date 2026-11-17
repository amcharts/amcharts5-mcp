---
title: "StockPanel"
type: "class"
source: "https://docs.amcharts.com/v5/reference/stockpanel/"
generatedFrom: "@amcharts/amcharts5@5.22.0"
---

A panel of a `StockChart`: an `XYChart` stacked with the other panels.

Docs: https://docs.amcharts.com/v5/charts/stock/panels/

## Import

```js
import * as am5stock from "@amcharts/amcharts5/stock";

am5stock.StockPanel.new(root, { /* settings */ });
```

## Inheritance

Extends: XYChart → SerialChart → Chart → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IStockPanelSettings` — get_api_reference shows it after this page
- Private settings: `IStockPanelPrivate`
- Events: `IStockPanelEvents`

## Properties

Public properties (not settings):

- **drawings** (`ListAutoDispose<XYSeries>`) — Drawing series of the panel. Series added here are added to its `series` too.
- **panelControls** (`PanelControls`) — The panel's buttons for moving, expanding and closing it.
- **panelResizer** (`Rectangle`) — Grip for dragging the border with the panel above, to resize both. _Since 5.4.7._

## Methods

- `close(): void` — Closes the panel, removing it from the chart.
- `expand(): void` — Expands the panel to fill the chart, hiding the other panels. If any panels are hidden, shows them again instead.
- `moveDown(): void` — Moves the panel one place down.
- `moveUp(): void` — Moves the panel one place up.

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("XYChart")`) for signatures and descriptions.

- _XYChart_: handleWheel, inPlot, zoomOut
- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
