---
title: "Sunburst"
type: "class"
source: "https://docs.amcharts.com/v5/reference/sunburst/"
generatedFrom: "@amcharts/amcharts5@5.24.0"
---

A sunburst diagram: the hierarchy as rings of slices, each level a ring further out, each node spanning as much of its ring as its value. A click on a node zooms into it.

Docs: https://docs.amcharts.com/v5/charts/hierarchy/sunburst/

## Import

```js
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";

am5hierarchy.Sunburst.new(root, { /* settings */ });
```

## Inheritance

Extends: Partition → Hierarchy → Series → Component → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `ISunburstSettings` — get_api_reference shows it after this page
- Private settings: `ISunburstPrivate`
- Data item fields: `ISunburstDataItem`

## Properties

Public properties (not settings):

- **labels** (`ListTemplate<RadialLabel>`) — List of node labels; configure them all through `labels.template`.
- **slices** (`ListTemplate<Slice>`) — List of node slices; configure them all through `slices.template`.

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Hierarchy")`) for signatures and descriptions.

- _Hierarchy_: addChildData, disableDataItem, enableDataItem, getDataItemById, hideDataItem, hoverDataItem, selectDataItem, setFlatData, showDataItem, unhoverDataItem
- _Series_: addBullet, endIndex, getSummary, openUrl, startIndex
- _Component_: makeDataItem, markDirtyValues, pushDataItem, updateData
- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
