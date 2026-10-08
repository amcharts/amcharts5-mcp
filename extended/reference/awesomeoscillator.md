---
title: "AwesomeOscillator"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/awesomeoscillator/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Awesome Oscillator indicator: columns of the 5-period minus the 34-period simple moving average of the median price (high plus low, halved). Drawn in a panel of its own.

Docs: https://www.amcharts.com/docs/v5/charts/stock/indicators/

## Import

```js
import * as am5stock from "@amcharts/amcharts5/stock";

am5stock.AwesomeOscillator.new(root, { /* settings */ });
```

## Inheritance

Extends: ChartIndicator → Indicator → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IAwesomeOscillatorSettings` — get_api_reference shows it after this page
- Private settings: `IAwesomeOscillatorPrivate`
- Events: `IAwesomeOscillatorEvents`

## Properties

Public properties (not settings):

- **series** (`ColumnSeries`) — The indicator's series.
