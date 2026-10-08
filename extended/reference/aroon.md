---
title: "Aroon"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/aroon/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Aroon indicator: two lines from `0` to `100` showing how recent the highest high (Aroon Up) and the lowest low (Aroon Down) of the last `period` data items are. Drawn in a panel of its own.

Docs: https://www.amcharts.com/docs/v5/charts/stock/indicators/

## Import

```js
import * as am5stock from "@amcharts/amcharts5/stock";

am5stock.Aroon.new(root, { /* settings */ });
```

## Inheritance

Extends: ChartIndicator → Indicator → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IAroonSettings` — get_api_reference shows it after this page
- Private settings: `IAroonPrivate`
- Events: `IAroonEvents`

## Properties

Public properties (not settings):

- **downSeries** (`LineSeries`) — Series of the Aroon Down line.
- **series** (`LineSeries`) — Series of the Aroon Up line.
