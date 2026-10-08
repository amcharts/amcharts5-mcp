---
title: "Momentum"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/momentum/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Momentum indicator: `field` minus its value `period` data items earlier. Drawn in a panel of its own.

_Since 5.4.8._ Docs: https://www.amcharts.com/docs/v5/charts/stock/indicators/

## Import

```js
import * as am5stock from "@amcharts/amcharts5/stock";

am5stock.Momentum.new(root, { /* settings */ });
```

## Inheritance

Extends: ChartIndicator → Indicator → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IMomentumSettings` — get_api_reference shows it after this page
- Private settings: `IMomentumPrivate`
- Events: `IMomentumEvents`

## Properties

Public properties (not settings):

- **series** (`LineSeries`) — The indicator's series.
