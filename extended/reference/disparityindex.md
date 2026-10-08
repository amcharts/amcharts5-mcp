---
title: "DisparityIndex"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/disparityindex/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Disparity Index indicator: how far `field` is from its moving average over `period`, in percent of the average. Drawn in a panel of its own.

Docs: https://www.amcharts.com/docs/v5/charts/stock/indicators/

## Import

```js
import * as am5stock from "@amcharts/amcharts5/stock";

am5stock.DisparityIndex.new(root, { /* settings */ });
```

## Inheritance

Extends: ChartIndicator → Indicator → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IDisparityIndexSettings` — get_api_reference shows it after this page
- Private settings: `IDisparityIndexPrivate`
- Events: `IDisparityIndexEvents`

## Properties

Public properties (not settings):

- **series** (`LineSeries`) — The indicator's series.
