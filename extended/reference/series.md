---
title: "Series"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/series/"
scraped: "2026-03-15"
---

A base class for all series.
Data item
Series uses data items of type ISeriesDataItem.

## Import

```javascript
// Import Series
import * as am5 from "@amcharts/amcharts5"
```

## Inheritance

Extends: Component
Extended by: Flow, FlowNodes, PercentSeries, Legend, XYSeries, Hierarchy, MapSeries, Venn, WordCloud

> **Note:** This class also inherits all settings, properties, methods, and events from Component (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **calculateAggregates** (`undefined | false | true`) — If set to true, series will calculate aggregate values, e.g. change percent, high, low, etc. Do not enable unless you are using such aggregate values in tooltips, display data fields, heat rules, or similar.
- **customValueField** (`undefined | string`) — A key to look up in data for a numeric customValue of the data item. Usually used for storing additional numeric information and heat rules.
- **excludeFromAggregate** (`Array`) — A list of field names to exclude from automatic aggregation when calculateAggregates is enabled. Use it to optimize performance by disabling automatic aggregation for data fields where aggregate values are not needed. @since 5.14.4
- **fill** (`Color`) — Series fill color. Click here for more info
- **fillPattern** (`Pattern`) — Series fill pattern. Click here for more info @since 5.10.0
- **heatRules** (`IHeatRule[]`) — A list of heat rules to apply on series elements. Click here for more info
- **idField** (`undefined | string`) — A key to look up in data for an id of the data item.
- **legendDataItem** (`DataItem`) — A data item representing series in a Legend. @readonly
- **legendLabelText** (`undefined | string`) — A text template to be used for label in legend.
- **legendValueText** (`undefined | string`) — A text template to be used for value label in legend.
- **name** (`undefined | string`) — Name of the series.
- **sequencedDelay** (`undefined | number`) — A delay in milliseconds to wait before starting animation of next data item. Click here for more info
- **sequencedInterpolation** (`undefined | false | true`) — If set to true the series initial animation will be played item by item rather than all at once. Click here for more info
- **stroke** (`Color`) — Series stroke color. Click here for more info
- **valueField** (`undefined | string`) — A key to look up in data for a numeric value of the data item. Some series use it to display its elements. It can also be used in heat rules.

## Properties

- **bullets** (`List`) — Default new List() List of bullets to use for the series. Click here for more info
- **bulletsContainer** (`Container`) — Default Container.new() A Container series' bullets are stored in.
- **chart** (`Chart | undefined`) — A chart series belongs to.
