---
title: "Pack"
type: "class"
source: "https://docs.amcharts.com/v5/reference/pack/"
generatedFrom: "@amcharts/amcharts5@5.23.0"
---

A pack diagram: nodes as circles sized by value, each inside its parent's circle. A click on a node zooms into it.

Docs: https://docs.amcharts.com/v5/charts/hierarchy/pack/

## Import

```js
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";

am5hierarchy.Pack.new(root, { /* settings */ });
```

## Inheritance

Extends: Hierarchy → Series → Component → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IPackSettings` — get_api_reference shows it after this page
- Private settings: `IPackPrivate`
- Events: `IPackEvents`
- Data item fields: `IPackDataItem`

## Properties

Public properties (not settings):

- **circles** (`ListTemplate<Circle>`) — List of node circles; configure them all through `circles.template`.

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Hierarchy")`) for signatures and descriptions.

- _Hierarchy_: addChildData, disableDataItem, enableDataItem, getDataItemById, hideDataItem, hoverDataItem, selectDataItem, setFlatData, showDataItem, unhoverDataItem
- _Series_: addBullet, endIndex, openUrl, startIndex
- _Component_: makeDataItem, markDirtyValues, pushDataItem, updateData
- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
