---
title: "FunnelSeries"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/funnelseries/"
scraped: "2026-03-15"
---

Creates a funnel series for use in a SlicedChart.

## Import

```javascript
// Import FunnelSeries
import * as am5percent from "@amcharts/amcharts5/percent"
```

## Inheritance

Extends: PercentSeries
Extended by: PyramidSeries

> **Note:** This class also inherits all settings, properties, methods, and events from PercentSeries (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **alignLabels** (`undefined | false | true`) — Default false Should labels be aligned into columns/rows?
- **bottomRatio** (`undefined | number`) — Default 1 Width of the bottom edge of the slice relative to the top edge of the next slice. 1 - means the full width of the slice, resulting in a rectangle. 0 - means using width of the next slice, resulting in a trapezoid. Click here for more info
- **endLocation** (`undefined | number`) — Default 0 Relative location within area available to series where it should start. 0 - beginning, 1 - end, or any intermediate value. Click here for more info
- **ignoreZeroValues** (`undefined | false | true`) — If set to true, series will not create slices for data items with zero value.
- **orientation** (`"horizontal" | "vertical"`) — Default "vertical" Orientation of the series. Click here for more info
- **startLocation** (`undefined | number`) — Default 0 Relative location within area available to series where it should start. 0 - beginning, 1 - end, or any intermediate value. Click here for more info

## Properties

- **chart** (`SlicedChart | undefined`) — A chart series is attached to.
- **links** (`ListTemplate`) — Default this.addDisposer(this._makeLinks()) A ListTemplate of all slice links in series. links.template can also be used to configure slice links. Click here for more info
