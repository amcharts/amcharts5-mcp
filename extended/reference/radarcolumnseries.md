---
title: "RadarColumnSeries"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/radarcolumnseries/"
scraped: "2026-03-15"
---

A column series for use in a RadarChart.
Data item
RadarColumnSeries uses data items of type IRadarColumnSeriesDataItem.

## Import

```javascript
// Import RadarColumnSeries
import * as am5radar from "@amcharts/amcharts5/radar"
```

## Inheritance

Extends: BaseColumnSeries

> **Note:** This class also inherits all settings, properties, methods, and events from BaseColumnSeries (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **chart** (`RadarChart | undefined`) — A chart series belongs to.
- **columns** (`ListTemplate`) — Default new ListTemplate<Slice> A TemplateList of all columns in series. columns.template can be used to set default settings for all columns, or to change on existing ones.
