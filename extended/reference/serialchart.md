---
title: "SerialChart"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/serialchart/"
scraped: "2026-03-15"
---

A base class for all series-based charts.

## Import

```javascript
// Import SerialChart
import * as am5 from "@amcharts/amcharts5"
```

## Inheritance

Extends: Chart
Extended by: PercentChart, XYChart, MapChart

> **Note:** This class also inherits all settings, properties, methods, and events from Chart (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **colors** (`ColorSet`) — A ColorSet to use when asigning colors for series. Click here for more info
- **patterns** (`PatternSet`) — A PatternSet to use when asigning patterns for series. Click here for more info @since 5.10.0

## Properties

- **series** (`ListAutoDispose`) — Default new ListAutoDispose() A list of chart's series.
- **seriesContainer** (`Container`) — Default Container.new() A Container where chart will store all series.
