---
title: "StockChart"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/stockchart/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

The stock chart: `StockPanel` charts stacked over one date range, with indicators, drawings and series comparison.

Docs: https://www.amcharts.com/docs/v5/charts/stock/

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
- **indicators** (`ListAutoDispose<Indicator>`) — The chart's indicators. Docs: https://www.amcharts.com/docs/v5/charts/stock/indicators/
- **panels** (`ListAutoDispose<StockPanel>`) — The chart's panels, from top to bottom. Docs: https://www.amcharts.com/docs/v5/charts/stock/#Panels
- **panelsContainer** (`Container`) — The container the panels are placed in.
- **spriteResizer** (`SpriteResizer`) — The `SpriteResizer` that resizes and rotates icon and label drawings. _Since 5.7.0._
- **toolsContainer** (`Container`) — A container above the panels for extra tools, such as a `Scrollbar`.
