---
title: "ChartSerializer"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/chartserializer/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Serializes a whole chart, with its axes, series, data and legends, into a config that `JsonParser` builds the chart from again. Unlike `Serializer`, by default it writes states and adapters, keeps adapter callbacks as functions, and goes 10 levels deep.

_Since 5.15.0._ Docs: https://www.amcharts.com/docs/v5/concepts/serializing/chart-serializer/

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
