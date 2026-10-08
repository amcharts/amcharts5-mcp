---
title: "Trix"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/trix/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Trix indicator: the percentage change of a triple exponential moving average of `field` over `period`, with a signal line. Drawn in a panel of its own.

Docs: https://www.amcharts.com/docs/v5/charts/stock/indicators/

## Import

```js
import * as am5stock from "@amcharts/amcharts5/stock";

am5stock.Trix.new(root, { /* settings */ });
```

## Inheritance

Extends: ChartIndicator → Indicator → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `ITrixSettings` — get_api_reference shows it after this page
- Private settings: `ITrixPrivate`
- Events: `ITrixEvents`

## Properties

Public properties (not settings):

- **series** (`LineSeries`) — Series of the Trix line.
- **signalSeries** (`LineSeries`) — Series of the signal line.
