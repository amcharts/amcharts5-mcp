---
title: "SettingsControl"
type: "class"
source: "https://docs.amcharts.com/v5/reference/settingscontrol/"
generatedFrom: "@amcharts/amcharts5@5.23.0"
---

A settings dropdown for a `StockChart`: X axis fills, the Y axis scale (regular, percent or logarithmic) and auto-saving of drawings and indicators.

## Import

```js
import * as am5stock from "@amcharts/amcharts5/stock";

am5stock.SettingsControl.new(root, { /* settings */ });
```

## Inheritance

Extends: DropdownListControl → StockControl → Entity → Settings

## Settings and related interfaces

- Settings: `ISettingsControlSettings` — get_api_reference shows it after this page
- Private settings: `ISettingsControlPrivate`
- Events: `ISettingsControlEvents`

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("DropdownListControl")`) for signatures and descriptions.

- _DropdownListControl_: getItemById, setItem, setItemById
- _StockControl_: hide, isAccessible, show
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
