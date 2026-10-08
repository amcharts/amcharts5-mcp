---
title: "FibonacciSeries"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/fibonacciseries/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Draws Fibonacci retracement levels between two points.

## Import

```js
import * as am5stock from "@amcharts/amcharts5/stock";

am5stock.FibonacciSeries.new(root, { /* settings */ });
```

## Inheritance

Extends: SimpleLineSeries → DrawingSeries → LineSeries → XYSeries → Series → Component → Container → Sprite → Entity → Settings
Extended by: FibonacciTimezoneSeries

## Settings and related interfaces

- Settings: `IFibonacciSeriesSettings` — get_api_reference shows it after this page
- Private settings: `IFibonacciSeriesPrivate`
- Data item fields: `IFibonacciSeriesDataItem`

## Properties

Public properties (not settings):

- **labels** (`ListTemplate<Label>`) — Labels of the levels. Settings on `labels.template` apply to all of them.
