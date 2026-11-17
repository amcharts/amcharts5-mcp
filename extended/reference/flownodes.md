---
title: "FlowNodes"
type: "class"
source: "https://docs.amcharts.com/v5/reference/flownodes/"
generatedFrom: "@amcharts/amcharts5@5.22.0"
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

## Methods

- `disableDataItem(dataItem: DataItem<this["_dataItemSettings"]>, duration?: number): Promise<void>` — Toggles a node off, as a click does: the node and its label take the disabled state and its links hide. The node itself stays visible. Parameters: `dataItem`: Node data item; `duration`: Animation duration in milliseconds. Returns: Promise
- `enableDataItem(dataItem: DataItem<this["_dataItemSettings"]>, duration?: number): Promise<void>` — Toggles a node back on, as a click does: clears its disabled state and shows its links. Parameters: `dataItem`: Node data item; `duration`: Animation duration in milliseconds. Returns: Promise
- `hideDataItem(dataItem: DataItem<this["_dataItemSettings"]>, duration?: number): Promise<void>` — Hides a node, with its label and links. Parameters: `dataItem`: Node data item; `duration`: Animation duration in milliseconds. Returns: Promise
- `showDataItem(dataItem: DataItem<this["_dataItemSettings"]>, duration?: number): Promise<void>` — Shows a hidden node, with its label and links. Parameters: `dataItem`: Node data item; `duration`: Animation duration in milliseconds. Returns: Promise

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Series")`) for signatures and descriptions.

- _Series_: addBullet, endIndex, openUrl, startIndex
- _Component_: getDataItemById, makeDataItem, markDirtyValues, pushDataItem, updateData
- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
