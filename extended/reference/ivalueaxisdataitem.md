---
title: "IValueAxisDataItem"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ivalueaxisdataitem/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IAxisDataItem
All ancestors: IAxisDataItem, IComponentDataItem
TypeScript: `am5xy.IValueAxisDataItem` (`import type { IValueAxisDataItem } from "@amcharts/amcharts5/xy"`)

## Data item fields

- **value** (`number`) — Value of the data item.
- **endValue** (`number`) — End value for axis items that span a range of values, like axis ranges.
- **labelEndValue** (`number`) — _(internal)_
- **affectsMinMax** (`boolean`) — Widens the axis scale to include this axis range's `value` and `endValue`. _Since 5.1.4._

## Other inherited data item fields

Names only — see the declaring interface's page (e.g. `get_api_reference("IAxisDataItem")`) for types, defaults and descriptions.

- _IAxisDataItem_: above, axisFill, bullet, grid, isRange, label, tick
- _IComponentDataItem_: visible
