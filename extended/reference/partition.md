---
title: "Partition"
type: "class"
source: "https://docs.amcharts.com/v5/reference/partition/"
generatedFrom: "@amcharts/amcharts5@5.23.0"
---

A partition (icicle) diagram: each level is a row of rectangles (a column, when horizontal), and each node spans as much of it as its value. A click on a node zooms into it.

Docs: https://docs.amcharts.com/v5/charts/hierarchy/partition/

## Import

```js
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";

am5hierarchy.Partition.new(root, { /* settings */ });
```

## Inheritance

Extends: Hierarchy → Series → Component → Container → Sprite → Entity → Settings
Extended by: Sunburst

## Settings and related interfaces

- Settings: `IPartitionSettings` — get_api_reference shows it after this page
- Private settings: `IPartitionPrivate`
- Data item fields: `IPartitionDataItem`

## Properties

Public properties (not settings):

- **rectangles** (`ListTemplate<RoundedRectangle>`) — List of node rectangles; configure them all through `rectangles.template`.

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Hierarchy")`) for signatures and descriptions.

- _Hierarchy_: addChildData, disableDataItem, enableDataItem, getDataItemById, hideDataItem, hoverDataItem, selectDataItem, setFlatData, showDataItem, unhoverDataItem
- _Series_: addBullet, endIndex, openUrl, startIndex
- _Component_: makeDataItem, markDirtyValues, pushDataItem, updateData
- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
