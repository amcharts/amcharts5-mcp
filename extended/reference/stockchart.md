---
title: "StockChart"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/stockchart/"
scraped: "2026-03-15"
---

A main class for the Stock Chart.

## Import

```javascript
// Import StockChart
import * as am5stock from "@amcharts/amcharts5/stock"
```

## Inheritance

Extends: Container

> **Note:** This class also inherits all settings, properties, methods, and events from Container (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **autoHidePanelControls** (`undefined | false | true`) — Default false If set to true, panel controls will automatically hide when mouse is not over the chart. @since 5.13.0
- **autoSetPercentScale** (`undefined | false | true`) — Default true If set to true, the chart will go into "percent scale" when compared series are added to chart, and will exit it when all of the comparisons are removed. Click here for more info
- **drawingSelectionEnabled** (`undefined | false | true`) — Default false If set to true, all drawings will be selectable. Selectable drawings can be moved, rotated, or deleted. @since 5.9.1
- **erasingEnabled** (`undefined | false | true`) — Default false If set to true, clicking on drawings will delete them. @since 5.9.2
- **hideDrawingGrips** (`undefined | false | true`) — Default false If set to true drawing grips will be hidden when StockChart is not in drawing mode. @since 5.10.6
- **percentScaleSeriesSettings** (`Partial`) — Settings to be applied to the the main value series, when chart is switched to "percent scale". Click here for more info
- **percentScaleValueAxisSettings** (`Partial`) — Settings to be applied to the ValueAxis of the main value series, when chart is switched to "percent scale". Click here for more info
- **stockNegativeColor** (`Color | null`) — This color will be applied to columns/candles on the main value series (series set as stockSeries) where the open value is higher than the close value. Click here for more info
- **stockPositiveColor** (`Color | null`) — This color will be applied to columns/candles on the main value series (series set as stockSeries) where the open value is lower or equal to the close value. Click here for more info
- **stockSeries** (`XYSeries`) — Main value series. This series is used to target by settings, as well as calculating indicators, and annotations. Click here
- **volumeNegativeColor** (`Color | null`) — This color will be applied to columns/candles on the main volume series (series set as stockSeries) where the open value is higher than the close value. Click here for more info
- **volumePositiveColor** (`Color | null`) — This color will be applied to columns/candles on the main volume series (series set as stockSeries) where the open value is lower or equal to the close value. Click here for more info
- **volumeSeries** (`XYSeries`) — Main volume series. Click here

## Properties

- **controls** (`StockControl[]`) — Default [] An array of all Stock Controls that are created for this chart. @since 5.7.0
- **indicators** (`ListAutoDispose`) — Default new ListAutoDispose() A list of indicators on chart. Click here for more info
- **panels** (`ListAutoDispose`) — Default new ListAutoDispose() A list of stock panels. Click here for more info
- **panelsContainer** (`Container`) — Default Container.new() A Container where all the stock panels are placed into.
- **spriteResizer** (`SpriteResizer`) — Default this.children.push(SpriteResizer.new(this._root, { })) An instance of SpriteResizer used for various drawing tools. @since 5.7.0
- **toolsContainer** (`Container`) — Default Container.new() A Container, resiting on top of the charts, suitable for additional tools, like Scrollbar.
