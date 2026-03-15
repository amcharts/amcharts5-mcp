---
title: "PercentSeries"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/percentseries/"
scraped: "2026-03-15"
---

A base class for any percent chart series.
Data item
PercentSeries uses data items of type IPercentSeriesDataItem.

## Import

```javascript
// Import PercentSeries
import * as am5percent from "@amcharts/amcharts5/percent"
```

## Inheritance

Extends: Series
Extended by: FunnelSeries, PieSeries

> **Note:** This class also inherits all settings, properties, methods, and events from Series (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **alignLabels** (`undefined | false | true`) — Should slice labels be aligned in columns/rows?
- **categoryField** (`undefined | string`) — A field in data that holds category names.
- **colors** (`ColorSet`) — A ColorSet to use when asigning colors for slices.
- **fillField** (`undefined | string`) — A field that holds color for slice fill.
- **patterns** (`PatternSet`) — A PatternSet to use when asigning patterns for slices. Click here for more info @since 5.10.0

## Properties

- **chart** (`PercentChart | undefined`) — (no description)
- **labels** (`ListTemplate`) — Default this.addDisposer(this._makeLabels()) A ListTemplate of all slice labels in series. labels.template can also be used to configure slice labels.
- **labelsContainer** (`Container`) — Default this.children.push(Container.new(this._root, { position: "absolute", isMeasured: false }))
- **slices** (`ListTemplate`) — Default this.addDisposer(this._makeSlices()) A ListTemplate of all slices in series. slices.template can also be used to configure slices.
- **slicesContainer** (`Container`) — Default this.children.push(Container.new(this._root, { position: "absolute", isMeasured: false }))
- **ticks** (`ListTemplate`) — Default this.addDisposer(this._makeTicks()) A ListTemplate of all slice ticks in series. ticks.template can also be used to configure slice ticks.
- **ticksContainer** (`Container`) — Default this.children.push(Container.new(this._root, { position: "absolute", isMeasured: false }))
