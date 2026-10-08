---
title: "MedianPrice"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/medianprice/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Median Price indicator: `field`, by default the median price (`"hl/2"`), averaged over `period`. Drawn in a panel of its own.

Docs: https://www.amcharts.com/docs/v5/charts/stock/indicators/

## Import

```js
import * as am5stock from "@amcharts/amcharts5/stock";

am5stock.MedianPrice.new(root, { /* settings */ });
```

## Inheritance

Extends: ChartIndicator → Indicator → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IMedianPriceSettings` — get_api_reference shows it after this page
- Private settings: `IMedianPricePrivate`
- Events: `IMedianPriceEvents`

## Properties

Public properties (not settings):

- **series** (`LineSeries`) — The indicator's series.
