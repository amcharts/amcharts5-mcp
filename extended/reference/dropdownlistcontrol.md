---
title: "DropdownListControl"
type: "class"
source: "https://docs.amcharts.com/v5/reference/dropdownlistcontrol/"
generatedFrom: "@amcharts/amcharts5@5.23.0"
---

A control with a dropdown list of items, which can be searchable.

Can be used in a `StockToolbar`.

Docs: https://docs.amcharts.com/v5/charts/stock/toolbar/dropdown-list-control/

## Import

```js
import * as am5stock from "@amcharts/amcharts5/stock";

am5stock.DropdownListControl.new(root, { /* settings */ });
```

## Inheritance

Extends: StockControl → Entity → Settings
Extended by: ComparisonControl, DataSaveControl, IndicatorControl, IntervalControl, SeriesTypeControl, SettingsControl

## Settings and related interfaces

- Settings: `IDropdownListControlSettings` — get_api_reference shows it after this page
- Private settings: `IDropdownListControlPrivate`
- Events: `IDropdownListControlEvents`

## Methods

- `getItemById(id: string): IDropdownListItem | string | undefined` — Returns the item with an ID from `items`. Parameters: `id`: Item ID. Returns: Dropdown item _Since 5.9.0._
- `setItem(item: string | IDropdownListItem): void` — Shows an item on the button as the selected one, unless `fixedLabel` is set. Does not dispatch `selected`. Parameters: `item`: Item.
- `setItemById(id: string): void` — Selects an item by its ID: shows it on the button and dispatches `selected`. Parameters: `id`: Item ID. _Since 5.9.0._

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("StockControl")`) for signatures and descriptions.

- _StockControl_: hide, isAccessible, show
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
