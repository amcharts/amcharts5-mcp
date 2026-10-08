---
title: "StandardDeviation"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/standarddeviation/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Standard Deviation indicator: how widely `field` varies around its average over `period`. Drawn in a panel of its own.

Docs: https://www.amcharts.com/docs/v5/charts/stock/indicators/

## Import

```js
import * as am5stock from "@amcharts/amcharts5/stock";

am5stock.StandardDeviation.new(root, { /* settings */ });
```

## Inheritance

Extends: ChartIndicator → Indicator → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IStandardDeviationSettings` — get_api_reference shows it after this page
- Private settings: `IStandardDeviationPrivate`
- Events: `IStandardDeviationEvents`

## Properties

Public properties (not settings):

- **series** (`LineSeries`) — The indicator's series.
