---
title: "DataSaveControl"
type: "class"
source: "https://docs.amcharts.com/v5/reference/datasavecontrol/"
generatedFrom: "@amcharts/amcharts5@5.24.0"
---

A control that saves the chart's drawings and indicators to the browser's local storage, and restores them.

_Since 5.7.0._ Docs: https://docs.amcharts.com/v5/charts/stock/toolbar/data-save-control/

## Import

```js
import * as am5stock from "@amcharts/amcharts5/stock";

am5stock.DataSaveControl.new(root, { /* settings */ });
```

## Inheritance

Extends: DropdownListControl → StockControl → Entity → Settings

## Settings and related interfaces

- Settings: `IDataSaveControlSettings` — get_api_reference shows it after this page
- Private settings: `IDataSaveControlPrivate`
- Events: `IDataSaveControlEvents`

## Methods

- `clearData(): void` — Removes the saved drawings and indicators from local storage.
- `restoreData(): void` — Replaces the chart's drawings and indicators with the ones saved in local storage.
- `saveData(): void` — Saves the chart's drawings and indicators to local storage.

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("DropdownListControl")`) for signatures and descriptions.

- _DropdownListControl_: getItemById, setItem, setItemById
- _StockControl_: hide, isAccessible, show
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
