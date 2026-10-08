---
title: "MACross"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/macross/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Moving Average Cross indicator: a slow (`period`) and a fast (`fastPeriod`) simple moving average of `field`, drawn over the main series.

Docs: https://www.amcharts.com/docs/v5/charts/stock/indicators/

## Import

```js
import * as am5stock from "@amcharts/amcharts5/stock";

am5stock.MACross.new(root, { /* settings */ });
```

## Inheritance

Extends: Indicator → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IMACrossSettings` — get_api_reference shows it after this page
- Private settings: `IMACrossPrivate`
- Events: `IMACrossEvents`

## Properties

Public properties (not settings):

- **fastSeries** (`LineSeries`) — Series of the fast moving average.
- **series** (`LineSeries`) — Series of the slow moving average.
