---
title: "LineArrowSeries"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/linearrowseries/"
scraped: "2026-03-15"
---

Used for Line Arrow drawing tool in StockChart.
@since 5.10.5


Data item
LineArrowSeries uses data items of type ILineArrowSeriesDataItem.

## Import

```javascript
// Import LineArrowSeries
import * as am5stock from "@amcharts/amcharts5/stock"
```

## Inheritance

Extends: SimpleLineSeries

> **Note:** This class also inherits all settings, properties, methods, and events from SimpleLineSeries (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **showExtension** (`undefined | false | true`) — Default true Show a dotted line extending from both ends of the drawn line.

## Properties

- **arrows** (`ListTemplate`) — Default this.addDisposer(new ListTemplate( Template.new({ }), () => Triangle._new(this._root, { themeTags: ["arrow"] }, [this.arrows.template]) ))
