---
title: "VolumeProfile"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/volumeprofile/"
scraped: "2026-03-15"
---

An implementation of a Volume Profile indicator for a StockChart.

## Import

```javascript
// Import VolumeProfile
import * as am5stock from "@amcharts/amcharts5/stock"
```

## Inheritance

Extends: Indicator

> **Note:** This class also inherits all settings, properties, methods, and events from Indicator (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **axisWidth** (`undefined | number`) — Default 40 Max width of columns in percent (%).
- **count** (`undefined | number`) — Default 24 Number of rows or number of ticks, depending on the countType.
- **countType** (`"rows" | "ticks"`) — Type of count.
- **downColor** (`Color`) — Volume down color.
- **upColor** (`Color`) — Volume up color.
- **valueArea** (`undefined | number`) — Default 70 Specifies what percentage of all volume for the trading session should be highlighted by Value Area.
- **valueAreaOpacity** (`undefined | number`) — Default .7 Opacity of columns which fall withing value area.
- **volumeSeries** (`XYSeries`) — Chart's main volume series.

## Properties

- **series** (`ColumnSeries`) — Indicator series.
- **upSeries** (`ColumnSeries`) — (no description)
