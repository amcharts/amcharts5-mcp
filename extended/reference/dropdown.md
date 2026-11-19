---
title: "Dropdown"
type: "class"
source: "https://docs.amcharts.com/v5/reference/dropdown/"
generatedFrom: "@amcharts/amcharts5@5.23.0"
---

Base class for the dropdowns of `StockToolbar` controls.

## Import

```js
import * as am5stock from "@amcharts/amcharts5/stock";

am5stock.Dropdown.new(root, { /* settings */ });
```

## Inheritance

Extends: Entity → Settings
Extended by: DropdownColors, DropdownList

## Settings and related interfaces

- Settings: `IDropdownSettings` — get_api_reference shows it after this page
- Private settings: `IDropdownPrivate`
- Events: `IDropdownEvents`

## Methods

- `hide(): void` — Closes the dropdown.
- `isAccessible(): boolean`
- `isOpen(): boolean` — Returns `true` while the dropdown is open. Returns: Dropdown open?
- `show(): void` — Opens the dropdown.
- `toggle(): void` — Opens the dropdown, or closes it if it is open.

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Entity")`) for signatures and descriptions.

- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
