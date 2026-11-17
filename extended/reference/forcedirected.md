---
title: "ForceDirected"
type: "class"
source: "https://docs.amcharts.com/v5/reference/forcedirected/"
generatedFrom: "@amcharts/amcharts5@5.22.0"
---

A force-directed tree: node circles sized by value, which a force simulation spreads out. Nodes can be dragged.

Docs: https://docs.amcharts.com/v5/charts/hierarchy/force-directed/

## Import

```js
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";

am5hierarchy.ForceDirected.new(root, { /* settings */ });
```

## Inheritance

Extends: LinkedHierarchy → Hierarchy → Series → Component → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IForceDirectedSettings` — get_api_reference shows it after this page
- Private settings: `IForceDirectedPrivate`
- Events: `IForceDirectedEvents`
- Data item fields: `IForceDirectedDataItem`

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("LinkedHierarchy")`) for signatures and descriptions.

- _LinkedHierarchy_: addChildData, areLinked, linkDataItems, selectDataItem, unlinkDataItems
- _Hierarchy_: disableDataItem, enableDataItem, getDataItemById, hideDataItem, hoverDataItem, setFlatData, showDataItem, unhoverDataItem
- _Series_: addBullet, endIndex, openUrl, startIndex
- _Component_: makeDataItem, markDirtyValues, pushDataItem, updateData
- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
