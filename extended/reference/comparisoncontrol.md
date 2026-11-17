---
title: "ComparisonControl"
type: "class"
source: "https://docs.amcharts.com/v5/reference/comparisoncontrol/"
generatedFrom: "@amcharts/amcharts5@5.22.0"
---

A dropdown control for picking series to compare with the main series of a `StockChart`. Adding the picked series is up to a `selected` event handler, usually with `addComparingSeries()`.

## Import

```js
import * as am5stock from "@amcharts/amcharts5/stock";

am5stock.ComparisonControl.new(root, { /* settings */ });
```

## Inheritance

Extends: DropdownListControl → StockControl → Entity → Settings

## Settings and related interfaces

- Settings: `IComparisonControlSettings` — get_api_reference shows it after this page
- Private settings: `IComparisonControlPrivate`
- Events: `IComparisonControlEvents`

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("DropdownListControl")`) for signatures and descriptions.

- _DropdownListControl_: getItemById, setItem, setItemById
- _StockControl_: hide, isAccessible, show
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
