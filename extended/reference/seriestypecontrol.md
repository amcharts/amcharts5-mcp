---
title: "SeriesTypeControl"
type: "class"
source: "https://docs.amcharts.com/v5/reference/seriestypecontrol/"
generatedFrom: "@amcharts/amcharts5@5.24.0"
---

A dropdown control for picking the type of the main series of a `StockChart`, such as line or candles. Applying the picked type is up to a `selected` event handler.

## Import

```js
import * as am5stock from "@amcharts/amcharts5/stock";

am5stock.SeriesTypeControl.new(root, { /* settings */ });
```

## Inheritance

Extends: DropdownListControl → StockControl → Entity → Settings

## Settings and related interfaces

- Settings: `ISeriesTypeControlSettings` — get_api_reference shows it after this page
- Private settings: `ISeriesTypeControlPrivate`
- Events: `ISeriesTypeControlEvents`

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("DropdownListControl")`) for signatures and descriptions.

- _DropdownListControl_: getItemById, setItem, setItemById
- _StockControl_: hide, isAccessible, show
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
