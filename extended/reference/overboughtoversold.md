---
title: "OverboughtOversold"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/overboughtoversold/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Base class for indicators with overbought and oversold levels, drawn in a panel of their own.

Docs: https://www.amcharts.com/docs/v5/charts/stock/indicators/

## Import

```js
import * as am5stock from "@amcharts/amcharts5/stock";

am5stock.OverboughtOversold.new(root, { /* settings */ });
```

## Inheritance

Extends: ChartIndicator → Indicator → Container → Sprite → Entity → Settings
Extended by: CommodityChannelIndex, RelativeStrengthIndex, StochasticMomentumIndex, StochasticOscillator, WilliamsR

## Settings and related interfaces

- Settings: `IOverboughtOversoldSettings` — get_api_reference shows it after this page
- Private settings: `IOverboughtOversoldPrivate`
- Events: `IOverboughtOversoldEvents`

## Properties

Public properties (not settings):

- **middle** (`DataItem<IValueAxisDataItem>`) — Y axis data item of the middle line, halfway between the two levels.
- **overBought** (`DataItem<IValueAxisDataItem>`) — Y axis data item of the overbought line.
- **overBoughtRange** (`ILineSeriesAxisRange`) — Axis range that colors the part of the series above `overBought`.
- **overSold** (`DataItem<IValueAxisDataItem>`) — Y axis data item of the oversold line.
- **overSoldRange** (`ILineSeriesAxisRange`) — Axis range that colors the part of the series below `overSold`.
- **series** (`LineSeries`) — The indicator's series.
