---
title: "Tree"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/tree/"
scraped: "2026-03-15"
---

Displays a tree diagram.

## Import

```javascript
// Import Tree
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy"
```

## Inheritance

Extends: LinkedHierarchy

> **Note:** This class also inherits all settings, properties, methods, and events from LinkedHierarchy (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **clustered** (`undefined | false | true`) — Default false If set to true, uses a cluster (dendrogram) layout where all leaf nodes are placed at the same depth. @since 5.16.2
- **fitNodes** (`undefined | false | true`) — Default false If set to true, hidden nodes are excluded from the layout, giving more space to visible ones. @since 5.18.0
- **inversed** (`undefined | false | true`) — Default false If set to true, will flip the tree direction. @since 5.2.4
- **nodeSeparation** (`undefined | (a: DataItem, b: DataItem) => number`) — Custom node-separation function; receives two data items and returns a numeric spacing value. @since 5.16.2
- **orientation** (`"horizontal" | "vertical"`) — Default "vertical" Orientation of the diagram.
