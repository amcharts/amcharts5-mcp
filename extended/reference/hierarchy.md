---
title: "Hierarchy"
type: "class"
source: "https://docs.amcharts.com/v5/reference/hierarchy/"
generatedFrom: "@amcharts/amcharts5@5.23.0"
---

Base class for the hierarchy series, such as `Treemap`, `Sunburst`, `Partition`, `Pack`, `Tree` and `ForceDirected`.

Docs: https://docs.amcharts.com/v5/charts/hierarchy/

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

## Methods

- `addChildData(dataItem: DataItem<this["_dataItemSettings"]>, data: Array<any>): void` — Adds child nodes to a node. Parameters: `dataItem`: Node to add the children to; `data`: Data objects of the new children. _Since 5.4.5._ Docs: https://docs.amcharts.com/v5/charts/hierarchy/hierarchy-api/#dynamically-adding-child-nodes
- `disableDataItem(dataItem: DataItem<this["_dataItemSettings"]>, duration?: number): void` — Collapses a node, hiding all the nodes below it. Parameters: `dataItem`: Target data item; `duration`: Animation duration in milliseconds.
- `enableDataItem(dataItem: DataItem<this["_dataItemSettings"]>, maxDepth?: number, depth?: number, duration?: number): void` — Expands a collapsed node, opening `maxDepth` levels below it. Parameters: `dataItem`: Target data item; `maxDepth`: Number of levels to open (`1` if not given); `depth`: Used internally; leave it out; `duration`: Animation duration in milliseconds.
- `getDataItemById(id: string): DataItem<this["_dataItemSettings"]> | undefined` — Finds a node's data item by its ID, at any depth. Parameters: `id`: ID. Returns: Data item
- `hideDataItem(dataItem: DataItem<this["_dataItemSettings"]>, duration?: number): Promise<void>` — Hides a node with all the nodes below it. Parameters: `dataItem`: Data item; `duration`: Animation duration in milliseconds. Returns: Promise
- `hoverDataItem(dataItem: DataItem<this["_dataItemSettings"]>): void` — Puts a data item's node in its hover state, unless it is hidden. Parameters: `dataItem`: Target data item. _Since 5.0.7._
- `selectDataItem(dataItem: DataItem<this["_dataItemSettings"]>): void` — Drills into a node, as a click does. Selecting the node that is already selected goes back up to its parent. Parameters: `dataItem`: Target data item.
- `setFlatData(flatData: Array<any>): void` — Sets the data from a flat list, in which each item gives its parent's ID (in `parentIdField`, matching another item's `idField`; `"parentId"` and `"id"` when not set). The item with no parent ID (`null`, `undefined` or `""`) becomes the root; if there are several, only the last one is used. Parameters: `flatData`: Array of flat data objects. _Since 5.16.2._ Docs: https://docs.amcharts.com/v5/charts/hierarchy/#flat-data
- `showDataItem(dataItem: DataItem<this["_dataItemSettings"]>, duration?: number): Promise<void>` — Shows a hidden node with all the nodes below it. Parameters: `dataItem`: Data item; `duration`: Animation duration in milliseconds. Returns: Promise
- `unhoverDataItem(dataItem: DataItem<this["_dataItemSettings"]>): void` — Takes a data item's node out of its hover state. Parameters: `dataItem`: Target data item. _Since 5.0.7._

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Series")`) for signatures and descriptions.

- _Series_: addBullet, endIndex, openUrl, startIndex
- _Component_: makeDataItem, markDirtyValues, pushDataItem, updateData
- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
