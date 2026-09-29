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

- **includeRoot** (`undefined | false | true`) — Default false If set to true, adds a top-level `root` section with the Root object's settings and properties (interfaceColors, formatters, utc, fps, tabindex) to the serialized output. JsonParser applies a `root` section before parsing the chart. @since 5.20.2
- **removeEmptyObjects** (`undefined | false | true`) — Default true Remove empty objects from the output.

Inherited from Serializer — ChartSerializer sets these defaults itself (in its constructor); where a plain Serializer's default differs, it is noted:

- **excludeSettings** (`Array`) — Default ["chart", "draw", "curveFactory", "tooltipDataItem", "legendDataItem", "vcx", "vcy", "bounds", "pointTo", "tooltipTarget", "translateX", "translateY", "heatRules"] An array of settings to not include in the serialized data. Setting it replaces this list rather than adding to it.
- **functionsAs** (`"string" | "function"`) — Default "function" (a plain Serializer sets no default and writes adapters as strings unless this is set) Serialize functions as strings or functions.
- **includeAdapters** (`undefined | false | true`) — Default true (a plain Serializer: false) Include adapters in the output. @since 5.15.0
- **includeStates** (`undefined | false | true`) — Default true (a plain Serializer: false) Include states in the output. @since 5.15.0
- **maxDepth** (`undefined | number`) — Default 10 (a plain Serializer: 2) Maximum depth of recursion when traversing target object.
- **runningAnimations** (`undefined | false | true`) — Default true Write an animation started in code that loops for ever - a globe that keeps turning, a marker that keeps pulsing - into the `animations` setting, so the saved chart plays it too. Animations that end (`appear()`, state changes, zooming) are never written, and neither is one whose easing is a function of its own rather than one of amCharts' easings. See Serializer. Turn off with `am5plugins_json.ChartSerializer.new(root, { runningAnimations: false })`. @since 5.20.8 (typings say 5.21.0)
