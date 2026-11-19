---
title: "ChartSerializer"
type: "class"
source: "https://docs.amcharts.com/v5/reference/chartserializer/"
generatedFrom: "@amcharts/amcharts5@5.23.0"
---

Serializes a whole chart, with its axes, series, data and legends, into a config that `JsonParser` builds the chart from again. Unlike `Serializer`, by default it writes states and adapters, keeps adapter callbacks as functions, and goes 10 levels deep.

_Since 5.15.0._ Docs: https://docs.amcharts.com/v5/concepts/serializing/chart-serializer/

## Import

```js
import * as am5plugins_json from "@amcharts/amcharts5/plugins/json";

am5plugins_json.ChartSerializer.new(root, { /* settings */ });
```

## Inheritance

Extends: Serializer → Entity → Settings

## Settings and related interfaces

- Settings: `IChartSerializerSettings` — get_api_reference shows it after this page
- Private settings: `IChartSerializerPrivate`
- Events: `IChartSerializerEvents`

## Methods

- `reset(): void` — Clears what the serializer remembers from an earlier `serializeAll()`. Call it before serializing again with the same serializer.
- `serializeAll(source: Container): any` — Serializes a chart, or a container with charts, into a config object. Parameters: `source`: Chart or container. Returns: Config

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Serializer")`) for signatures and descriptions.

- _Serializer_: serialize
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
