---
title: "MovingAverageEnvelope"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/movingaverageenvelope/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Moving Average Envelope indicator: a moving average of `field` over `period`, with bands `shift` above and below it. Drawn over the main series.

Docs: https://www.amcharts.com/docs/v5/charts/stock/indicators/

## Import

```js
import * as am5stock from "@amcharts/amcharts5/stock";

am5stock.MovingAverageEnvelope.new(root, { /* settings */ });
```

## Inheritance

Extends: MovingAverage → Indicator → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IMovingAverageEnvelopeSettings` — get_api_reference shows it after this page
- Private settings: `IMovingAverageEnvelopePrivate`
- Events: `IMovingAverageEnvelopeEvents`

## Properties

Public properties (not settings):

- **lowerBandSeries** (`LineSeries`) — Series of the lower band.
- **upperBandSeries** (`LineSeries`) — Series of the upper band.
