---
title: "CategoryAxis"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/categoryaxis/"
scraped: "2026-03-15"
---

Creates a category axis.

## Import

```javascript
// Import CategoryAxis
import * as am5xy from "@amcharts/amcharts5/xy"
```

## Inheritance

Extends: Axis
Extended by: GanttCategoryAxis, CategoryDateAxis

> **Note:** This class also inherits all settings, properties, methods, and events from Axis (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **categoryField** (`string`) — A field in data which holds categories.
- **cellSizeField** (`undefined | string`) — A key to look up in data for a relative size value of the data item.
- **endLocation** (`undefined | number`) — Default 1 Relative location of where axis cell ends: 0 - beginning, 1 - end.
- **fillRule** (`undefined | ( dataItem: DataItem, index: undefined | number) => void`) — A function that can be used to specify how to configure axis fills. Click here for more info
- **idField** (`undefined | string`) — A key to look up in data for an id of the data item.
- **startLocation** (`undefined | number`) — Default 0 Relative location of where axis cell starts: 0 - beginning, 1 - end.
