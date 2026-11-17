---
title: "Serializer"
type: "class"
source: "https://docs.amcharts.com/v5/reference/serializer/"
generatedFrom: "@amcharts/amcharts5@5.22.0"
---

Serializes charts or individual elements into plain objects, which can be saved as JSON.

_Since 5.3.0._ Docs: https://docs.amcharts.com/v5/concepts/serializing/

## Import

```js
import * as am5plugins_json from "@amcharts/amcharts5/plugins/json";

am5plugins_json.Serializer.new(root, { /* settings */ });
```

## Inheritance

Extends: Entity → Settings
Extended by: ChartSerializer

## Settings and related interfaces

- Settings: `ISerializerSettings` — get_api_reference shows it after this page
- Private settings: `ISerializerPrivate`
- Events: `ISerializerEvents`

## Methods

- `serialize(source: unknown, depth?: number, full?: boolean, forceParse?: boolean): unknown` — Serializes an object into a plain object. Parameters: `source`: Object to serialize; `depth`: Current depth; `full`: Write plain objects in full, with all their keys; `forceParse`: Mark plain objects with `__parse`, so the parser reads them. Returns: Serialized data

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Entity")`) for signatures and descriptions.

- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
