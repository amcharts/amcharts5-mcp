---
title: "BollingerBands"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/bollingerbands/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Bollinger Bands indicator: a moving average of `field` over `period`, with bands `standardDeviations` standard deviations above and below it. Drawn over the main series.

Docs: https://www.amcharts.com/docs/v5/charts/stock/indicators/

## Import

```js
import * as am5stock from "@amcharts/amcharts5/stock";

am5stock.BollingerBands.new(root, { /* settings */ });
```

## Inheritance

Extends: MovingAverage → Indicator → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IBollingerBandsSettings` — get_api_reference shows it after this page
- Private settings: `IBollingerBandsPrivate`
- Events: `IBollingerBandsEvents`

## Properties

Public properties (not settings):

- **lowerBandSeries** (`LineSeries`) — Series of the lower band.
- **upperBandSeries** (`LineSeries`) — Series of the upper band.
