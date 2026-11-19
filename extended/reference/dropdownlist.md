---
title: "DropdownList"
type: "class"
source: "https://docs.amcharts.com/v5/reference/dropdownlist/"
generatedFrom: "@amcharts/amcharts5@5.23.0"
---

A dropdown list for the controls of a `StockToolbar`.

Docs: https://docs.amcharts.com/v5/charts/stock/toolbar/dropdown-list-control/

## Import

```js
import * as am5stock from "@amcharts/amcharts5/stock";

am5stock.DropdownList.new(root, { /* settings */ });
```

## Inheritance

Extends: Dropdown → Entity → Settings

## Settings and related interfaces

- Settings: `IDropdownListSettings` — get_api_reference shows it after this page
- Private settings: `IDropdownListPrivate`
- Events: `IDropdownListEvents`

## Methods

- `addItem(info: IDropdownListItem): void` — Adds an item to the end of the list as shown, without adding it to `items`. Parameters: `info`: Item.
- `hide(): void` — Closes the dropdown.
- `rebuildList(): void` — Rebuilds the list from `items`, for example after the items' data was changed in place. _Since 5.7.0._

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Dropdown")`) for signatures and descriptions.

- _Dropdown_: isAccessible, isOpen, show, toggle
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
