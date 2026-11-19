---
title: "PeriodSelector"
type: "class"
source: "https://docs.amcharts.com/v5/reference/periodselector/"
generatedFrom: "@amcharts/amcharts5@5.23.0"
---

A `StockToolbar` control with buttons that zoom the chart to preset periods, such as one month or year to date.

Docs: https://docs.amcharts.com/v5/charts/stock/toolbar/period-selector/

## Import

```js
import * as am5stock from "@amcharts/amcharts5/stock";

am5stock.PeriodSelector.new(root, { /* settings */ });
```

## Inheritance

Extends: StockControl → Entity → Settings

## Settings and related interfaces

- Settings: `IPeriodSelectorSettings` — get_api_reference shows it after this page
- Private settings: `IPeriodSelectorPrivate`
- Events: `IPeriodSelectorEvents`

## Methods

- `selectPeriod(period: IPeriod): void` — Zooms the chart to a period and highlights its button. Dispatches `periodselected`. Parameters: `period`: Period.

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("StockControl")`) for signatures and descriptions.

- _StockControl_: hide, isAccessible, show
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
