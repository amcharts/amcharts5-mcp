---
title: "ForceDirected"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/forcedirected/"
scraped: "2026-03-15"
---

Creates a force-directed tree.

## Import

```javascript
// Import ForceDirected
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy"
```

## Inheritance

Extends: LinkedHierarchy

> **Note:** This class also inherits all settings, properties, methods, and events from LinkedHierarchy (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **centerStrength** (`undefined | number`) — Default 0.5 A force that attracts (or pushes back) all nodes to the center of the chart. Click here for more info
- **initialFrames** (`undefined | number`) — Default 500 Length of how long initial force simulation would run in frames. Click here for more info
- **linkWithStrength** (`number | undefined`) — Default 0.5 A force that attracts (or pushes back) nodes that are linked together via linkWithField. Click here for more info
- **manyBodyStrength** (`undefined | number`) — Default -15 A force that attracts (or pushes back) all nodes to each other. Click here for more info
- **maxRadius** (`number | Percent`) — Default 8% Biggest possible radius for a node circle. Can be a fixed pixel value or percent relative to chart size. Click here for more info
- **minRadius** (`number | Percent`) — Default 1% Smallest possible radius for a node circle. Can be a fixed pixel value or percent relative to chart size. Click here for more info
- **nodePadding** (`undefined | number`) — Minimum gap in pixels between the nodes.
- **showOnFrame** (`undefined | number`) — Default 10 If set to a number will wait X number of frames before revealing the tree. Can be used to hide initial animations where nodes settle into their places. Click here for more info
- **velocityDecay** (`undefined | number`) — Default 0.5 Resistance acting agains node speed. The greater the value, the more "sluggish" the nodes will be. Click here for more info
- **xField** (`undefined | string`) — Field in data that holds X coordinate of the node. Click here for more info
