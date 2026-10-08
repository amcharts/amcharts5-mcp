---
title: "AverageTrueRange"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/averagetruerange/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Average True Range indicator: volatility, as each data item's true range averaged over `period`. Drawn in a panel of its own.

Docs: https://www.amcharts.com/docs/v5/charts/stock/indicators/

## Import

```js
import * as am5stock from "@amcharts/amcharts5/stock";

am5stock.AverageTrueRange.new(root, { /* settings */ });
```

## Inheritance

Extends: ChartIndicator → Indicator → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IAverageTrueRangeSettings` — get_api_reference shows it after this page
- Private settings: `IAverageTrueRangePrivate`
- Events: `IAverageTrueRangeEvents`

## Properties

Public properties (not settings):

- **series** (`LineSeries`) — The indicator's series.
