---
title: "MovingAverageDeviation"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/movingaveragedeviation/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Moving Average Deviation indicator: columns showing how far `field` is from its moving average over `period`. Drawn in a panel of its own.

Docs: https://www.amcharts.com/docs/v5/charts/stock/indicators/

## Import

```js
import * as am5stock from "@amcharts/amcharts5/stock";

am5stock.MovingAverageDeviation.new(root, { /* settings */ });
```

## Inheritance

Extends: ChartIndicator → Indicator → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IMovingAverageDeviationSettings` — get_api_reference shows it after this page
- Private settings: `IMovingAverageDeviationPrivate`
- Events: `IMovingAverageDeviationEvents`

## Properties

Public properties (not settings):

- **series** (`ColumnSeries`) — The indicator's series.
