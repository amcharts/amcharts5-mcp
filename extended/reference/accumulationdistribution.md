---
title: "AccumulationDistribution"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/accumulationdistribution/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Accumulation/Distribution indicator: a running total of where each close is within its high-low range, weighted by volume. Drawn in a panel of its own.

Docs: https://www.amcharts.com/docs/v5/charts/stock/indicators/

## Import

```js
import * as am5stock from "@amcharts/amcharts5/stock";

am5stock.AccumulationDistribution.new(root, { /* settings */ });
```

## Inheritance

Extends: ChartIndicator → Indicator → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IAccumulationDistributionSettings` — get_api_reference shows it after this page
- Private settings: `IAccumulationDistributionPrivate`
- Events: `IAccumulationDistributionEvents`

## Properties

Public properties (not settings):

- **series** (`LineSeries`) — The indicator's series.
