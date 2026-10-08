---
title: "StockPanel"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/stockpanel/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

A panel of a `StockChart`: an `XYChart` stacked with the other panels.

Docs: https://www.amcharts.com/docs/v5/charts/stock/panels/

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
