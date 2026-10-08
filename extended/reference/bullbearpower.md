---
title: "BullBearPower"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/bullbearpower/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Bull Bear Power indicator: bull power (high minus the `period` exponential moving average of the close) plus bear power (low minus that average). Drawn in a panel of its own.

Docs: https://www.amcharts.com/docs/v5/charts/stock/indicators/

## Import

```js
import * as am5stock from "@amcharts/amcharts5/stock";

am5stock.BullBearPower.new(root, { /* settings */ });
```

## Inheritance

Extends: ChartIndicator → Indicator → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IBullBearPowerSettings` — get_api_reference shows it after this page
- Private settings: `IBullBearPowerPrivate`
- Events: `IBullBearPowerEvents`

## Properties

Public properties (not settings):

- **series** (`LineSeries`) — The indicator's series.
