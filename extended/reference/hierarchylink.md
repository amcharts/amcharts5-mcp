---
title: "HierarchyLink"
type: "class"
source: "https://docs.amcharts.com/v5/reference/hierarchylink/"
generatedFrom: "@amcharts/amcharts5@5.24.0"
---

A line linking two nodes of a `LinkedHierarchy` series.

## Import

```js
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";

am5hierarchy.HierarchyLink.new(root, { /* settings */ });
```

## Inheritance

Extends: Graphics → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IHierarchyLinkSettings` — get_api_reference shows it after this page
- Private settings: `IHierarchyLinkPrivate`

## Properties

Public properties (not settings):

- **bullets** (`Bullet[]`)
- **series** (`LinkedHierarchy`)

## Methods

- `hide(duration?: number): Promise<void>` — Hides the element and returns a `Promise` that resolves when its hiding animations finish.
- `show(duration?: number): Promise<void>` — Shows the element and returns a `Promise` that resolves when its showing animations finish.

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Sprite")`) for signatures and descriptions.

- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
