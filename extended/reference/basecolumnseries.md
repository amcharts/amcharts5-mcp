---
title: "BaseColumnSeries"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/basecolumnseries/"
scraped: "2026-03-15"
---

Base class for all "column-based" series
Data item
BaseColumnSeries uses data items of type IBaseColumnSeriesDataItem.

## Import

```javascript
// Import BaseColumnSeries
import * as am5xy from "@amcharts/amcharts5/xy"
```

## Inheritance

Extends: XYSeries
Extended by: ColumnSeries, RadarColumnSeries, CurveColumnSeries

> **Note:** This class also inherits all settings, properties, methods, and events from XYSeries (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **adjustBulletPosition** (`undefined | false | true`) — Default true Whether positions of bullets should be calculated based on portion of column currently visual (true) or the whole length/height of the column (false).
- **clustered** (`undefined | false | true`) — Default true Indicates if series must divvy up available space with other column series (true; default) or take up the whole available space (false). Click here for more info
- **useLastColorForLegendMarker** (`undefined | false | true`) — If set to true will use color of the last visible column for legend marker. Otherwise, series fill/stroke will be used. @since 5.1.13

## Properties

- **columns** (`ListTemplate`) — ListTemplate of columns in series.
