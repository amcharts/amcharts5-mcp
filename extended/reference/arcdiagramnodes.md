---
title: "ArcDiagramNodes"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/arcdiagramnodes/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Holds the nodes of an `ArcDiagram` series.

## Import

```js
import * as am5flow from "@amcharts/amcharts5/flow";

am5flow.ArcDiagramNodes.new(root, { /* settings */ });
```

## Inheritance

Extends: FlowNodes → Series → Component → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IArcDiagramNodesSettings` — get_api_reference shows it after this page
- Private settings: `IArcDiagramNodesPrivate`
- Events: `IArcDiagramNodesEvents`
- Data item fields: `IArcDiagramNodesDataItem`

## Properties

Public properties (not settings):

- **circles** (`ListTemplate<Circle>`) — List of node circles; configure them all through `circles.template`.
- **flow** (`ArcDiagram`) — Related `ArcDiagram` series.
- **labels** (`ListTemplate<Label>`) — List of node labels; configure them all through `labels.template`.
