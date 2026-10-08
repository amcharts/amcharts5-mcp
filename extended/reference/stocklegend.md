---
title: "StockLegend"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/stocklegend/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

A legend for a `StockChart` panel, with settings and close buttons on its items.

Docs: https://www.amcharts.com/docs/v5/charts/stock/#Legend

## Import

```js
import * as am5stock from "@amcharts/amcharts5/stock";

am5stock.StockLegend.new(root, { /* settings */ });
```

## Inheritance

Extends: Legend → Series → Component → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IStockLegendSettings` — get_api_reference shows it after this page
- Private settings: `IStockLegendPrivate`
- Events: `IStockLegendEvents`
- Data item fields: `IStockLegendDataItem`

## Properties

Public properties (not settings):

- **closeButtons** (`ListTemplate<Button>`) — The items' close buttons. Settings on `closeButtons.template` apply to all of them.
- **settingsButtons** (`ListTemplate<Button>`) — The items' settings buttons. Settings on `settingsButtons.template` apply to all of them.
