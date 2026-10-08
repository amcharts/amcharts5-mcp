---
title: "Component"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/component/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Base class for elements that use data.

## Import

```js
import * as am5 from "@amcharts/amcharts5";
```

## Inheritance

Extends: Container → Sprite → Entity → Settings
Extended by: Axis, Series

## Settings and related interfaces

- Settings: `IComponentSettings` — get_api_reference shows it after this page
- Private settings: `IComponentPrivate`
- Events: `IComponentEvents`
- Data item fields: `IComponentDataItem`

## Properties

Public properties (not settings):

- **data** (`ListData<unknown>`) — The component's data: a list of data objects, each made into a data item. Docs: https://www.amcharts.com/docs/v5/concepts/data/
- **dataItems** (`DataItem<this["_dataItemSettings"]>[]`) — The component's data items.
- **inited** (`boolean`) — Becomes `true` after the component's first update.
