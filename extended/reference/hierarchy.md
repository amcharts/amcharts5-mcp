---
title: "Hierarchy"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/hierarchy/"
scraped: "2026-03-15"
---

A base class for all hierarchy charts.

## Import

```javascript
// Import Hierarchy
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy"
```

## Inheritance

Extends: Series
Extended by: LinkedHierarchy, Pack, Partition, Treemap, VoronoiTreemap

> **Note:** This class also inherits all settings, properties, methods, and events from Series (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **animationDuration** (`undefined | number`) — Duration for all drill animations in milliseconds.
- **animationEasing** (`Easing`) — An easing function to use for drill animations.
- **categoryField** (`undefined | string`) — A field in data that holds string-based identificator for node.
- **childDataField** (`undefined | string`) — A field in data that holds an array of child node data.
- **colors** (`ColorSet`) — A ColorSet to use when asigning colors for nodes. Click here for more info
- **disabledField** (`undefined | string`) — A field in data that holds boolean value indicating if node is disabled (collapsed).
- **downDepth** (`undefined | number`) — Number of child levels to open when clicking on a node. Click here for more info
- **fillField** (`undefined | string`) — A field in data that holds color used for fills for various elements, such as nodes.
- **initialDepth** (`undefined | number`) — Number of levels to show on chart's first load. Click here for more info
- **patterns** (`PatternSet`) — A PatternSet to use when asigning patterns for nodes. Click here for more info @since 5.10.0
- **selectedDataItem** (`DataItem`) — A data item for currently selected node. Click here for more info
- **singleBranchOnly** (`undefined | false | true`) — If set to true will make all other branches collapse when some branch is expanded.
- **sort** (`"ascending" | "descending" | "none"`) — Default "none" How to sort nodes by their value.
- **topDepth** (`undefined | number`) — If set, will show nodes starting from set level. It could be used to eliminate top level branches, that do not need to be shown. Click here for more info
- **upDepth** (`undefined | number`) — Number of levels parent levels to show from currently selected node. Click here for more info
- **valueField** (`undefined | string`) — A field in data that holds numeric value for the node.

## Properties

- **labels** (`ListTemplate`) — Default new ListTemplate<Label> A list of label elements in a Hierarchy chart.
- **nodes** (`ListTemplate`) — Default new ListTemplate<HierarchyNode> A list of nodes in a Hierarchy chart.
- **nodesContainer** (`Container`) — Default Container.new() A Container that nodes are placed in.
