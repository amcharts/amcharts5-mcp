---
title: "RelativeStrengthIndex"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/relativestrengthindex/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Relative Strength Index indicator: momentum from `0` to `100`, comparing average gains with average losses over `period`. Drawn in a panel of its own.

Docs: https://www.amcharts.com/docs/v5/charts/stock/indicators/

## Import

```js
import * as am5stock from "@amcharts/amcharts5/stock";

am5stock.RelativeStrengthIndex.new(root, { /* settings */ });
```

## Inheritance

Extends: OverboughtOversold → ChartIndicator → Indicator → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IRelativeStrengthIndexSettings` — get_api_reference shows it after this page
- Private settings: `IRelativeStrengthIndexPrivate`
- Events: `IRelativeStrengthIndexEvents`

## Properties

Public properties (not settings):

- **smaSeries** (`LineSeries`) — Series of the RSI's moving average (`smaPeriod`).
