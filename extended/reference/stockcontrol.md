---
title: "StockControl"
type: "class"
source: "https://docs.amcharts.com/v5/reference/stockcontrol/"
generatedFrom: "@amcharts/amcharts5@5.24.0"
---

Base class for the controls of a `StockToolbar`.

## Import

```js
import * as am5stock from "@amcharts/amcharts5/stock";

am5stock.StockControl.new(root, { /* settings */ });
```

## Inheritance

Extends: Entity → Settings
Extended by: ColorControl, DateRangeSelector, DrawingControl, DrawingToolControl, DropdownControl, DropdownListControl, IconControl, PeriodSelector, ResetControl

## Settings and related interfaces

- Settings: `IStockControlSettings` — get_api_reference shows it after this page
- Private settings: `IStockControlPrivate`
- Events: `IStockControlEvents`

## Methods

- `hide(): void` — Hides the control's button.
- `isAccessible(): boolean` — Returns `true` if the control can be used with a keyboard: it is not in a toolbar, or its toolbar is `focusable`. Returns: Accessible?
- `show(): void` — Shows the control's button, unless `forceHidden` is set.

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Entity")`) for signatures and descriptions.

- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
