---
title: "CategoryDateAxis"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/categorydateaxis/"
scraped: "2026-03-15"
---

Category-based date axis.

## Import

```javascript
// Import CategoryDateAxis
import * as am5xy from "@amcharts/amcharts5/xy"
```

## Inheritance

Extends: CategoryAxis

> **Note:** This class also inherits all settings, properties, methods, and events from CategoryAxis (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **baseInterval** (`ITimeInterval`) — Indicates granularity of data. Click here for more info
- **dateFormats** (`undefined | object`) — Date formats used for intermediate labels. Click here for more info
- **gridIntervals** (`Array`) — A list of intervals the axis is allowed to show grid/labels on. Click here for more info
- **markUnitChange** (`undefined | false | true`) — Default true Display "period change" labels using different format. If set to true, will use periodChangeDateFormats instead of dateFormats for such labels, e.g. for month start.
- **periodChangeDateFormats** (`undefined | object`) — Date formats used for "period change" labels. Click here for more info
- **tooltipDateFormat** (`undefined | string`) — A date format to use for axis tooltip. Click here for more info
