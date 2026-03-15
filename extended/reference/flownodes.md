---
title: "FlowNodes"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/flownodes/"
scraped: "2026-03-15"
---

Holds instances of nodes for a Flow series.
Data item
FlowNodes uses data items of type IFlowNodesDataItem.

## Import

```javascript
// Import FlowNodes
import * as am5flow from "@amcharts/amcharts5/flow"
```

## Inheritance

Extends: Series
Extended by: ArcDiagramNodes, ChordNodes, SankeyNodes

> **Note:** This class also inherits all settings, properties, methods, and events from Series (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **animationDuration** (`undefined | number`) — Animation duration in ms.
- **animationEasing** (`undefined | ( t: Time) => Time`) — Easing function to use for node animations.
- **colors** (`ColorSet`) — A ColorSet that series will use to apply to its nodes.
- **disabledField** (`undefined | string`) — A field in data that holds boolean value indicating if node is disabled (collapsed). @since 5.4.2
- **fillField** (`undefined | string`) — Default "fill" A field in data that holds color used for fills nodes.
- **nameField** (`undefined | string`) — Default "id" A field in data that holds name for the node.
- **patterns** (`PatternSet`) — A PatternSet that series will use to apply to its nodes. Click here for more info @since 5.10.0
- **unknownField** (`undefined | string`) — Default "unknown" A field in data boolean setting if the node is "unknown".

## Properties

- **flow** (`Flow | undefined`) — Related Flow series.
- **labels** (`ListTemplate`) — Default new ListTemplate<Label> List of label elements.
- **nodes** (`ListTemplate`) — Default new ListTemplate<FlowNode> List of node elements.
