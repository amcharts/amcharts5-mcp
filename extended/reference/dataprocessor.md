---
title: "DataProcessor"
type: "class"
source: "https://docs.amcharts.com/v5/reference/dataprocessor/"
generatedFrom: "@amcharts/amcharts5@5.24.0"
---

Converts data values, such as string dates and numbers, as data is added to a component.

Docs: https://docs.amcharts.com/v5/concepts/data/#pre-processing-data

## Import

```js
import * as am5 from "@amcharts/amcharts5";

am5.DataProcessor.new(root, { /* settings */ });
```

## Inheritance

Extends: Entity → Settings

## Settings and related interfaces

- Settings: `IDataProcessorSettings` — get_api_reference shows it after this page
- Private settings: `IDataProcessorPrivate`
- Events: `IDataProcessorEvents`

## Methods

- `processMany(data: { [index: string]: any; }[]): void` — Processes every row of `data`. Changes the objects in place. Parameters: `data`: Data rows.
- `processRow(row: { [index: string]: any; }, prefix?: string): void` — Processes one row (object) of data. Changes the object in place. Parameters: `row`: Data row; `prefix`: Path of the row inside a parent row, used for nested fields.

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Entity")`) for signatures and descriptions.

- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
