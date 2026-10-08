---
title: "ChaikinMoneyFlow"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/chaikinmoneyflow/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Chaikin Money Flow indicator: volume-weighted money flow over `period`, from `-1` to `1`. Drawn in a panel of its own.

Docs: https://www.amcharts.com/docs/v5/charts/stock/indicators/

## Import

```js
import * as am5stock from "@amcharts/amcharts5/stock";

am5stock.ChaikinMoneyFlow.new(root, { /* settings */ });
```

## Inheritance

Extends: ChartIndicator → Indicator → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IChaikinMoneyFlowSettings` — get_api_reference shows it after this page
- Private settings: `IChaikinMoneyFlowPrivate`
- Events: `IChaikinMoneyFlowEvents`

## Properties

Public properties (not settings):

- **series** (`LineSeries`) — The indicator's series.
