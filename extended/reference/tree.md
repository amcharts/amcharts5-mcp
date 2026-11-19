---
title: "Tree"
type: "class"
source: "https://docs.amcharts.com/v5/reference/tree/"
generatedFrom: "@amcharts/amcharts5@5.23.0"
---

A tree diagram: node circles joined by links, each level a row (or a column, when horizontal).

Docs: https://docs.amcharts.com/v5/charts/hierarchy/tree/

## Import

```js
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";

am5hierarchy.Tree.new(root, { /* settings */ });
```

## Inheritance

Extends: LinkedHierarchy → Hierarchy → Series → Component → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `ITreeSettings` — get_api_reference shows it after this page
- Private settings: `ITreePrivate`
- Events: `ITreeEvents`
- Data item fields: `ITreeDataItem`

## Methods

- `disableDataItem(dataItem: DataItem<this["_dataItemSettings"]>, duration?: number): void` — Collapses a node, hiding all the nodes below it.
- `enableDataItem(dataItem: DataItem<this["_dataItemSettings"]>, maxDepth?: number, depth?: number, duration?: number): void` — Expands a collapsed node, opening `maxDepth` levels below it.
- `hideDataItem(dataItem: DataItem<this["_dataItemSettings"]>, duration?: number): Promise<void>` — Hides a node with all the nodes below it.
- `showDataItem(dataItem: DataItem<this["_dataItemSettings"]>, duration?: number): Promise<void>` — Shows a hidden node with all the nodes below it.

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("LinkedHierarchy")`) for signatures and descriptions.

- _LinkedHierarchy_: addChildData, areLinked, linkDataItems, selectDataItem, unlinkDataItems
- _Hierarchy_: getDataItemById, hoverDataItem, setFlatData, unhoverDataItem
- _Series_: addBullet, endIndex, openUrl, startIndex
- _Component_: makeDataItem, markDirtyValues, pushDataItem, updateData
- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
