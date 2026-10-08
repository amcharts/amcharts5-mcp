---
title: "IAxisDataItem"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iaxisdataitem/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IComponentDataItem
TypeScript: `am5xy.IAxisDataItem` (`import type { IAxisDataItem } from "@amcharts/amcharts5/xy"`)

## Data item fields

- **label** (`AxisLabel`) — Axis label element.
- **tick** (`AxisTick`) — Tick element.
- **grid** (`Grid`) — Grid line element.
- **axisFill** (`Graphics`) — Axis fill element.
- **bullet** (`AxisBullet`) — Bullet element.
- **isRange** (`boolean`) — `true` if this data item is an axis range.
- **above** (`boolean`) — default `false` — Draws the grid and fill of this axis range above the series. Set it before the range is created; changing it later has no effect. To draw all grid above the series, use `chart.gridContainer.toFront()`. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/axes/axis-ranges/#Grid_fill_above_series

## Other inherited data item fields

Names only — see the declaring interface's page (e.g. `get_api_reference("IComponentDataItem")`) for types, defaults and descriptions.

- _IComponentDataItem_: visible
