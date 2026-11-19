---
title: "BreadcrumbBar"
type: "class"
source: "https://docs.amcharts.com/v5/reference/breadcrumbbar/"
generatedFrom: "@amcharts/amcharts5@5.23.0"
---

A breadcrumb bar for a hierarchy series: a label for each node on the path from the root to the selected node. Clicking a label selects that node.

Docs: https://docs.amcharts.com/v5/charts/hierarchy/breadcrumbs/

## Import

```js
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";

am5hierarchy.BreadcrumbBar.new(root, { /* settings */ });
```

## Inheritance

Extends: Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IBreadcrumbBarSettings` — get_api_reference shows it after this page
- Private settings: `IBreadcrumbBarPrivate`
- Events: `IBreadcrumbBarEvents`

## Properties

Public properties (not settings):

- **labels** (`ListTemplate<Label>`) — List of the bar's labels; configure them all through `labels.template`.

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Container")`) for signatures and descriptions.

- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
