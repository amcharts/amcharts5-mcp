---
title: "ChaikinOscillator"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/chaikinoscillator/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Chaikin Oscillator indicator: the fast (`period`) minus the slow (`slowPeriod`) exponential moving average of the accumulation/distribution line. Drawn in a panel of its own.

Docs: https://www.amcharts.com/docs/v5/charts/stock/indicators/

## Import

```js
import * as am5stock from "@amcharts/amcharts5/stock";

am5stock.ChaikinOscillator.new(root, { /* settings */ });
```

## Inheritance

Extends: ChartIndicator → Indicator → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IChaikinOscillatorSettings` — get_api_reference shows it after this page
- Private settings: `IChaikinOscillatorPrivate`
- Events: `IChaikinOscillatorEvents`

## Properties

Public properties (not settings):

- **series** (`LineSeries`) — The indicator's series.
