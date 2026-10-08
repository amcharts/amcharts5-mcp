---
title: "FlowNodes"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/flownodes/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Holds instances of nodes for a `Flow` series.

## Import

```js
import * as am5flow from "@amcharts/amcharts5/flow";
```

## Inheritance

Extends: Series → Component → Container → Sprite → Entity → Settings
Extended by: ArcDiagramNodes, ChordNodes, SankeyNodes

## Settings and related interfaces

- Settings: `IFlowNodesSettings` — get_api_reference shows it after this page
- Private settings: `IFlowNodesPrivate`
- Events: `IFlowNodesEvents`
- Data item fields: `IFlowNodesDataItem`

## Properties

Public properties (not settings):

- **flow** (`Flow`) — Related `Flow` series.
- **labels** (`ListTemplate<Label>`) — List of node labels; configure them all through `labels.template`.
- **nodes** (`ListTemplate<FlowNode>`) — List of node elements; configure them all through `nodes.template`.
