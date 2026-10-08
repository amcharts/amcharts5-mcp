---
title: "ICategoryAxisDataItem"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/icategoryaxisdataitem/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IAxisDataItem
All ancestors: IAxisDataItem, IComponentDataItem
TypeScript: `am5xy.ICategoryAxisDataItem` (`import type { ICategoryAxisDataItem } from "@amcharts/amcharts5/xy"`)

## Data item fields

- **category** (`string`) — The category name.
- **endCategory** (`string`) — End category, for axis ranges that span several categories.
- **index** (`number`) — Index of the data item.
- **categoryLocation** (`number`) — default `0` — Where within `category` the item starts, from `0` (start) to `1` (end).
- **endCategoryLocation** (`number`) — default `1` — Where within `endCategory` (or `category`) the item ends, from `0` (start) to `1` (end).
- **deltaPosition** (`number`) — Shifts the category from its place, as a share of the whole axis length (`1` is the full axis). Used to animate sorting without reordering the data.
- **cellSize** (`number`) — Relative size of the category's cell. Used only when the axis has `cellSizeField` set.
- **finalCellSize** (`number`) — _(internal)_
- **id** (`string`) — A unique id of the data item.

## Other inherited data item fields

Names only — see the declaring interface's page (e.g. `get_api_reference("IAxisDataItem")`) for types, defaults and descriptions.

- _IAxisDataItem_: above, axisFill, bullet, grid, isRange, label, tick
- _IComponentDataItem_: visible
