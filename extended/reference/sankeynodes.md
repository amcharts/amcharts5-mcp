---
title: "SankeyNodes"
type: "class"
source: "https://docs.amcharts.com/v5/reference/sankeynodes/"
generatedFrom: "@amcharts/amcharts5@5.22.0"
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

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("FlowNodes")`) for signatures and descriptions.

- _FlowNodes_: disableDataItem, enableDataItem, hideDataItem, showDataItem
- _Series_: addBullet, endIndex, openUrl, startIndex
- _Component_: getDataItemById, makeDataItem, markDirtyValues, pushDataItem, updateData
- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
