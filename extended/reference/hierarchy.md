---
title: "Hierarchy"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/hierarchy/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Base class for the hierarchy series, such as `Treemap`, `Sunburst`, `Partition`, `Pack`, `Tree` and `ForceDirected`.

Docs: https://www.amcharts.com/docs/v5/charts/hierarchy/

## Import

```js
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";
```

## Inheritance

Extends: Series → Component → Container → Sprite → Entity → Settings
Extended by: LinkedHierarchy, Pack, Partition, Treemap, VoronoiTreemap

## Settings and related interfaces

- Settings: `IHierarchySettings` — get_api_reference shows it after this page
- Private settings: `IHierarchyPrivate`
- Events: `IHierarchyEvents`
- Data item fields: `IHierarchyDataItem`

## Properties

Public properties (not settings):

- **labels** (`ListTemplate<Label>`) — List of node labels; configure them all through `labels.template`.
- **nodes** (`ListTemplate<HierarchyNode>`) — List of node elements; configure them all through `nodes.template`.
- **nodesContainer** (`Container`) — Container that holds the node elements.
