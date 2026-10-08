---
title: "VolumeProfile"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/volumeprofile/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Volume Profile indicator: horizontal rows over the main series showing how much volume traded at each price in the visible range, split into up and down volume.

_Since 5.7.0._ Docs: https://www.amcharts.com/docs/v5/charts/stock/indicators/

## Import

```js
import * as am5stock from "@amcharts/amcharts5/stock";

am5stock.VolumeProfile.new(root, { /* settings */ });
```

## Inheritance

Extends: Indicator → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IVolumeProfileSettings` — get_api_reference shows it after this page
- Private settings: `IVolumeProfilePrivate`
- Events: `IVolumeProfileEvents`

## Properties

Public properties (not settings):

- **series** (`ColumnSeries`) — Series of the down volume columns.
- **upSeries** (`ColumnSeries`) — Series of the up volume columns, drawn after the down volume.
- **xAxis** (`ValueAxis<AxisRendererX>`) — Horizontal axis the rows' volume is measured on.
