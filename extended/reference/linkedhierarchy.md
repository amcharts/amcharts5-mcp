---
title: "LinkedHierarchy"
type: "class"
source: "https://docs.amcharts.com/v5/reference/linkedhierarchy/"
generatedFrom: "@amcharts/amcharts5@5.22.0"
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

## Methods

- `addChildData(dataItem: DataItem<this["_dataItemSettings"]>, data: Array<any>): void` — Adds child nodes to a node. _Since 5.4.5._ Docs: https://docs.amcharts.com/v5/charts/hierarchy/hierarchy-api/#dynamically-adding-child-nodes
- `areLinked(source: DataItem<this["_dataItemSettings"]>, target: DataItem<this["_dataItemSettings"]>): boolean` — Returns `true` if two nodes are linked with each other, either way. Parameters: `source`: Data item of one node; `target`: Data item of the other node. Returns: Linked?
- `linkDataItems(source: DataItem<this["_dataItemSettings"]>, target: DataItem<this["_dataItemSettings"]>, strength?: number): HierarchyLink` — Links two nodes, or returns the link already between them. Parameters: `source`: Source node data item; `target`: Target node data item; `strength`: `strength` of a new link. Returns: Link element
- `selectDataItem(dataItem: DataItem<this["_dataItemSettings"]>): void` — Selects an expanded node. For a collapsed node, its parent is selected instead. Parameters: `dataItem`: Data item.
- `unlinkDataItems(source: DataItem<this["_dataItemSettings"]>, target: DataItem<this["_dataItemSettings"]>): void` — Removes the link between two nodes. Parameters: `source`: Source node data item; `target`: Target node data item.

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Hierarchy")`) for signatures and descriptions.

- _Hierarchy_: disableDataItem, enableDataItem, getDataItemById, hideDataItem, hoverDataItem, setFlatData, showDataItem, unhoverDataItem
- _Series_: addBullet, endIndex, openUrl, startIndex
- _Component_: makeDataItem, markDirtyValues, pushDataItem, updateData
- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
