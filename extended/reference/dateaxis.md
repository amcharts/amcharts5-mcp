---
title: "DateAxis"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/dateaxis/"
scraped: "2026-03-15"
---

Creates a date axis.

## Import

```javascript
// Import DateAxis
import * as am5xy from "@amcharts/amcharts5/xy"
```

## Inheritance

Extends: ValueAxis
Extended by: GanttDateAxis, GaplessDateAxis

> **Note:** This class also inherits all settings, properties, methods, and events from ValueAxis (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **baseInterval** (`ITimeInterval`) — Indicates granularity of data. Click here for more info
- **dateFormats** (`undefined | object`) — Date formats used for intermediate labels. Click here for more info
- **endLocation** (`undefined | number`) — Default 1 Relative location of where axis cell ends: 0 - beginning, 1 - end. IMPORTANT: endLocation is not supported by GaplessDateAxis.
- **gridIntervals** (`Array`) — A list of intervals the axis is allowed to show grid/labels on. Click here for more info
- **groupCount** (`undefined | number`) — Default 500 Maximum number of data items in the view before data grouping kicks in. Click here for more info
- **groupData** (`undefined | false | true`) — Default false Should axis group data items togeter dynamically? Click here for more info
- **groupInterval** (`ITimeInterval`) — Force data item grouping to specific interval. This interval must be within groupIntervals array for this to work. Click here for more info
- **groupIntervals** (`Array`) — A list of intervals the axis is allowed to group data items into. Click here for more info
- **markUnitChange** (`undefined | false | true`) — Default true Display "period change" labels using different format. If set to true, will use periodChangeDateFormats instead of dateFormats for such labels, e.g. for month start.
- **minorDateFormats** (`undefined | object`) — Date formats used for minor grid labels. Click here for more info @since 5.6.0
- **periodChangeDateFormats** (`undefined | object`) — Date formats used for "period change" labels. Click here for more info
- **skipFirstMinor** (`undefined | false | true`) — Default true If set to true, the axis will skip the first minor grid line and label. @since 5.14.0
- **startLocation** (`undefined | number`) — Default 0 Relative location of where axis cell starts: 0 - beginning, 1 - end. IMPORTANT: startLocation is not supported by GaplessDateAxis.
- **tooltipDateFormat** (`string | DateTimeFormatOptions`) — A date format to use for axis tooltip. Click here for more info
- **tooltipDateFormats** (`undefined | object`) — Time unit-specific formats to use for axis tooltip. Click here for more info @since 5.1.4
- **tooltipIntervalOffset** (`undefined | number`) — A value which indicates relative position within axis cell to get timestamp for the tooltip from. Values are from -1 to 1. If not set, it will use tooltipLocation value, if tooltipLocation` is not set, it will use -0.5. Click here for more info @since 5.1.4
- **weekLabelLocation** (`undefined | number`) — Default 0 A relative location of weekly labels. @since 5.14.0
