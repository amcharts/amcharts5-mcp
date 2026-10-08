---
title: "LinkedHierarchy"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/linkedhierarchy/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Base class for the hierarchy series that draw nodes as circles joined by links: `ForceDirected` and `Tree`.

## Import

```js
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";
```

## Inheritance

Extends: Hierarchy → Series → Component → Container → Sprite → Entity → Settings
Extended by: ForceDirected, Tree

## Settings and related interfaces

- Settings: `ILinkedHierarchySettings` — get_api_reference shows it after this page
- Private settings: `ILinkedHierarchyPrivate`
- Events: `ILinkedHierarchyEvents`
- Data item fields: `ILinkedHierarchyDataItem`

## Properties

Public properties (not settings):

- **circles** (`ListTemplate<Circle>`) — List of node circles; configure them all through `circles.template`.
- **linkBullets** (`List<(<D extends DataItem<IHierarchyDataItem>>(root: Root, source: D, target: D) => Bullet | undefined)>`) — Bullets for the links: functions that get the root and the link's source and target data items, and return a `Bullet`.
- **links** (`ListTemplate<HierarchyLink>`) — List of link elements; configure them all through `links.template`.
- **linksContainer** (`Container`) — Container that holds the link elements, behind the nodes.
- **nodes** (`ListTemplate<LinkedHierarchyNode>`) — List of node elements; configure them all through `nodes.template`.
- **outerCircles** (`ListTemplate<Circle>`) — List of the rings around nodes that have children; configure them all through `outerCircles.template`.
