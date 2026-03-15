---
title: "LineSeries"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/lineseries/"
scraped: "2026-03-15"
---

Used to plot line and/or area series.

## Import

```javascript
// Import LineSeries
import * as am5xy from "@amcharts/amcharts5/xy"
```

## Inheritance

Extends: XYSeries
Extended by: RadarLineSeries, DrawingSeries, SmoothedYLineSeries, SmoothedXLineSeries, SmoothedXYLineSeries, StepLineSeries, CurveLineSeries

> **Note:** This class also inherits all settings, properties, methods, and events from XYSeries (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **autoGapCount** (`undefined | number`) — Default 1.1 If there are more than autoGapCount base time intervals (e.g. days) with no data, the line will break and will display gap. Click here for more info
- **connect** (`undefined | false | true`) — Default true If set to true the line will connect over "gaps" - categories or time intervals with no data. Click here for more info
- **minDistance** (`undefined | number`) — Default 0 Allows simplifying the line with many points. If set, the series will skip points that are closer than X pixels to each other. With many data points, this allows having smoother, less cluttered lines. @since 5.2.7

## Properties

- **fills** (`ListTemplate`) — Default new ListTemplate<Graphics> A TemplateList of all segment fills in series. fills.template can be used to set default settings for all segment fills, or to change on existing ones.
- **strokes** (`ListTemplate`) — Default new ListTemplate<Graphics> A TemplateList of all line segments in series. strokes.template can be used to set default settings for all line segments, or to change on existing ones.
