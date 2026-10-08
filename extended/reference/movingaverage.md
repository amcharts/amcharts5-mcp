---
title: "MovingAverage"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/movingaverage/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Moving Average indicator: a line over the main series, averaging `field` over the last `period` data items.

Docs: https://www.amcharts.com/docs/v5/charts/stock/indicators/

## Import

```js
import * as am5stock from "@amcharts/amcharts5/stock";

am5stock.MovingAverage.new(root, { /* settings */ });
```

## Inheritance

Extends: Indicator → Container → Sprite → Entity → Settings
Extended by: BollingerBands, MovingAverageEnvelope

## Settings and related interfaces

- Settings: `IMovingAverageSettings` — get_api_reference shows it after this page
- Private settings: `IMovingAveragePrivate`
- Events: `IMovingAverageEvents`

## Properties

Public properties (not settings):

- **series** (`LineSeries`) — The indicator's series.
