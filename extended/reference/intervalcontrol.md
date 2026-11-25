---
title: "IntervalControl"
type: "class"
source: "https://docs.amcharts.com/v5/reference/intervalcontrol/"
generatedFrom: "@amcharts/amcharts5@5.24.0"
---

A dropdown control for picking the data interval of a `StockChart`, such as 1 day or 1 week. Applying the picked interval is up to a `selected` event handler.

## Import

```js
import * as am5stock from "@amcharts/amcharts5/stock";

am5stock.IntervalControl.new(root, { /* settings */ });
```

## Inheritance

Extends: DropdownListControl → StockControl → Entity → Settings

## Settings and related interfaces

- Settings: `IIntervalControlSettings` — get_api_reference shows it after this page
- Private settings: `IIntervalControlPrivate`
- Events: `IIntervalControlEvents`

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("DropdownListControl")`) for signatures and descriptions.

- _DropdownListControl_: getItemById, setItem, setItemById
- _StockControl_: hide, isAccessible, show
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
