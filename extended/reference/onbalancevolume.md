---
title: "OnBalanceVolume"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/onbalancevolume/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

On Balance Volume indicator: a running total of volume, added on data items that close higher than the previous one and subtracted on those that close lower. Drawn in a panel of its own.

Docs: https://www.amcharts.com/docs/v5/charts/stock/indicators/

## Import

```js
import * as am5stock from "@amcharts/amcharts5/stock";

am5stock.OnBalanceVolume.new(root, { /* settings */ });
```

## Inheritance

Extends: ChartIndicator → Indicator → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IOnBalanceVolumeSettings` — get_api_reference shows it after this page
- Private settings: `IOnBalanceVolumePrivate`
- Events: `IOnBalanceVolumeEvents`

## Properties

Public properties (not settings):

- **series** (`LineSeries`) — The indicator's series.
