---
title: "SimpleLineSeries"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/simplelineseries/"
scraped: "2026-03-15"
---

Data item
SimpleLineSeries uses data items of type ISimpleLineSeriesDataItem.

## Import

```javascript
// Import SimpleLineSeries
import * as am5stock from "@amcharts/amcharts5/stock"
```

## Inheritance

Extends: DrawingSeries
Extended by: AverageSeries, FibonacciSeries, HorizontalLineSeries, HorizontalRaySeries, LineArrowSeries, RectangleSeries, ParallelChannelSeries, QuadrantLineSeries, RegressionSeries, TrendLineSeries, VerticalLineSeries

> **Note:** This class also inherits all settings, properties, methods, and events from DrawingSeries (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **showExtension** (`undefined | false | true`) — Default true Show a dotted line extending from both ends of the drawn line.

## Properties

- **hitLines** (`ListTemplate`) — Default this.addDisposer(new ListTemplate( Template.new({ }), () => Line._new(this._root, { }, [this.hitLines.template]) ))
- **lines** (`ListTemplate`) — Default this.addDisposer(new ListTemplate( Template.new({ }), () => Line._new(this._root, { }, [this.lines.template]) ))
