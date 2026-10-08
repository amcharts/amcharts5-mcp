---
title: "TypicalPrice"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/typicalprice/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Typical Price indicator: `field`, by default the typical price (`"hlc/3"`, the average of high, low and close), averaged over `period`. Drawn in a panel of its own.

Docs: https://www.amcharts.com/docs/v5/charts/stock/indicators/

## Import

```js
import * as am5stock from "@amcharts/amcharts5/stock";

am5stock.TypicalPrice.new(root, { /* settings */ });
```

## Inheritance

Extends: ChartIndicator → Indicator → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `ITypicalPriceSettings` — get_api_reference shows it after this page
- Private settings: `ITypicalPricePrivate`
- Events: `ITypicalPriceEvents`

## Properties

Public properties (not settings):

- **series** (`LineSeries`) — The indicator's series.
