---
title: "AccelerationBands"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/accelerationbands/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Acceleration Bands indicator: bands above the high and below the low that widen as the high-low range grows, and their middle line, each averaged over `period`. Drawn over the main series.

Docs: https://www.amcharts.com/docs/v5/charts/stock/indicators/

## Import

```js
import * as am5stock from "@amcharts/amcharts5/stock";

am5stock.AccelerationBands.new(root, { /* settings */ });
```

## Inheritance

Extends: Indicator → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IAccelerationBandsSettings` — get_api_reference shows it after this page
- Private settings: `IAccelerationBandsPrivate`
- Events: `IAccelerationBandsEvents`

## Properties

Public properties (not settings):

- **lowerBandSeries** (`LineSeries`) — Series of the lower band.
- **upperBandSeries** (`LineSeries`) — Series of the upper band.
