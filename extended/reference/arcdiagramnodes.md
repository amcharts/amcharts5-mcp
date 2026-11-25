---
title: "ArcDiagramNodes"
type: "class"
source: "https://docs.amcharts.com/v5/reference/arcdiagramnodes/"
generatedFrom: "@amcharts/amcharts5@5.24.0"
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

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("FlowNodes")`) for signatures and descriptions.

- _FlowNodes_: disableDataItem, enableDataItem, hideDataItem, showDataItem
- _Series_: addBullet, endIndex, getSummary, openUrl, startIndex
- _Component_: getDataItemById, makeDataItem, markDirtyValues, pushDataItem, updateData
- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
