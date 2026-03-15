---
title: "Serializer"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/serializer/"
scraped: "2026-03-15"
---

Provides functionality to serialize charts or individual elements into simple objects or JSON.

## Import

```javascript
// Import Serializer
import * as am5plugins_json from "@amcharts/amcharts5/plugins/json"
```

## Inheritance

Extends: Entity
Extended by: ChartSerializer

> **Note:** This class also inherits all settings, properties, methods, and events from Entity (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **excludeProperties** (`Array`) — An array of properties to not include in the serialized data. @since 5.3.2
- **excludeSettings** (`Array`) — An array of settings to not include in the serialized data.
- **fullSettings** (`Array`) — Include full values of these settings. @since 6.4.3
- **functionsAs** (`"string" | "function"`) — Default "function" Serialize functions as strings or functions.
- **includeAdapters** (`undefined | false | true`) — Default false Include adapters in the output. @since 5.15.0
- **includeSettings** (`Array`) — An array of settings to include in the serialized data.
- **includeStates** (`undefined | false | true`) — Default false Include states in the output. @since 5.15.0
- **maxDepth** (`undefined | number`) — Default 2 Maximum depth of recursion when traversing target object.
