---
title: "ChordNodes"
type: "class"
source: "https://docs.amcharts.com/v5/reference/chordnodes/"
generatedFrom: "@amcharts/amcharts5@5.22.0"
---

Holds the nodes of a `Chord` series. Dragging a node rotates the whole chord.

## Import

```js
import * as am5flow from "@amcharts/amcharts5/flow";

am5flow.ChordNodes.new(root, { /* settings */ });
```

## Inheritance

Extends: FlowNodes → Series → Component → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IChordNodesSettings` — get_api_reference shows it after this page
- Private settings: `IChordNodesPrivate`
- Events: `IChordNodesEvents`
- Data item fields: `IChordNodesDataItem`

## Properties

Public properties (not settings):

- **flow** (`Chord`) — Related `Chord` series.
- **labels** (`ListTemplate<RadialLabel>`) — List of node labels; configure them all through `labels.template`.
- **slices** (`ListTemplate<Slice>`) — List of the nodes' arcs; configure them all through `slices.template`.

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("FlowNodes")`) for signatures and descriptions.

- _FlowNodes_: disableDataItem, enableDataItem, hideDataItem, showDataItem
- _Series_: addBullet, endIndex, openUrl, startIndex
- _Component_: getDataItemById, makeDataItem, markDirtyValues, pushDataItem, updateData
- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
