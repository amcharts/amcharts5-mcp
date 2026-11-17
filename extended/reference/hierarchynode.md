---
title: "HierarchyNode"
type: "class"
source: "https://docs.amcharts.com/v5/reference/hierarchynode/"
generatedFrom: "@amcharts/amcharts5@5.22.0"
---

Base class for hierarchy nodes.

## Import

```js
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";

am5hierarchy.HierarchyNode.new(root, { /* settings */ });
```

## Inheritance

Extends: Container → Sprite → Entity → Settings
Extended by: LinkedHierarchyNode

## Settings and related interfaces

- Settings: `IHierarchyNodeSettings` — get_api_reference shows it after this page
- Private settings: `IHierarchyNodePrivate`

## Properties

Public properties (not settings):

- **series** (`Hierarchy`) — The series the node belongs to.

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Container")`) for signatures and descriptions.

- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
