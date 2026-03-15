---
title: "ChartSerializer"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/chartserializer/"
scraped: "2026-03-15"
---

Serializes whole charts into simple objects or JSON.

## Import

```javascript
// Import ChartSerializer
import * as am5plugins_json from "@amcharts/amcharts5/plugins/json"
```

## Inheritance

Extends: Serializer

> **Note:** This class also inherits all settings, properties, methods, and events from Serializer (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **includeProjection** (`undefined | false | true`) — Default false Include projection settings in the output. If enabled, the projection function will be included in the output, according to the functionsAs setting.
- **removeEmptyObjects** (`undefined | false | true`) — Default true Remove empty objects from the output.
