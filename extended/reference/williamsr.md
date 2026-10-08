---
title: "WilliamsR"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/williamsr/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Williams %R indicator: where the close is within the high-low range of the last `period` data items, from `0` (at the high) to `-100` (at the low). Drawn in a panel of its own.

Docs: https://www.amcharts.com/docs/v5/charts/stock/indicators/

## Import

```js
import * as am5stock from "@amcharts/amcharts5/stock";

am5stock.WilliamsR.new(root, { /* settings */ });
```

## Inheritance

Extends: OverboughtOversold → ChartIndicator → Indicator → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IWilliamsRSettings` — get_api_reference shows it after this page
- Private settings: `IWilliamsRPrivate`
- Events: `IWilliamsREvents`
