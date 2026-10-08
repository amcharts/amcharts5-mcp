---
title: "Volume"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/volume/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Volume indicator: columns of `volumeSeries`, colored by whether the price closed up or down. Drawn in a panel of its own.

Docs: https://www.amcharts.com/docs/v5/charts/stock/indicators/

## Import

```js
import * as am5stock from "@amcharts/amcharts5/stock";

am5stock.Volume.new(root, { /* settings */ });
```

## Inheritance

Extends: ChartIndicator → Indicator → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IVolumeSettings` — get_api_reference shows it after this page
- Private settings: `IVolumePrivate`
- Events: `IVolumeEvents`

## Properties

Public properties (not settings):

- **series** (`ColumnSeries`) — The indicator's series.
