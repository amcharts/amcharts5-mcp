---
title: "StockToolbar"
type: "class"
source: "https://docs.amcharts.com/v5/reference/stocktoolbar/"
generatedFrom: "@amcharts/amcharts5@5.23.0"
---

A toolbar of `StockControl` buttons for a `StockChart`, placed in an HTML element outside the chart.

Docs: https://docs.amcharts.com/v5/charts/stock/toolbar/

## Import

```js
import * as am5stock from "@amcharts/amcharts5/stock";

am5stock.StockToolbar.new(root, { /* settings */ });
```

## Inheritance

Extends: Entity → Settings

## Settings and related interfaces

- Settings: `IStockToolbarSettings` — get_api_reference shows it after this page
- Private settings: `IStockToolbarPrivate`
- Events: `IStockToolbarEvents`

## Methods

- `fit(): void` — Folds the controls step by step until they fit in one row (see `autoFit`). The toolbar does this itself when its container is resized or its controls change; call it after changing a control's label. _Since 5.23.0._

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Entity")`) for signatures and descriptions.

- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
