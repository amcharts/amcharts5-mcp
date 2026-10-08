---
title: "SankeyNodes"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/sankeynodes/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Holds the nodes of a `Sankey` series. Nodes can be dragged.

## Import

```js
import * as am5flow from "@amcharts/amcharts5/flow";

am5flow.SankeyNodes.new(root, { /* settings */ });
```

## Inheritance

Extends: FlowNodes → Series → Component → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `ISankeyNodesSettings` — get_api_reference shows it after this page
- Private settings: `ISankeyNodesPrivate`
- Events: `ISankeyNodesEvents`
- Data item fields: `ISankeyNodesDataItem`

## Properties

Public properties (not settings):

- **flow** (`Sankey`) — Related `Sankey` series.
- **rectangles** (`ListTemplate<RoundedRectangle>`) — List of node rectangles; configure them all through `rectangles.template`.
