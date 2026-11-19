---
title: "ZoomTools"
type: "class"
source: "https://docs.amcharts.com/v5/reference/zoomtools/"
generatedFrom: "@amcharts/amcharts5@5.23.0"
---

Home, zoom-in and zoom-out buttons for a zoomable `target`.

_Since 5.8.0._

## Import

```js
import * as am5 from "@amcharts/amcharts5";

am5.ZoomTools.new(root, { /* settings */ });
```

## Inheritance

Extends: Container → Sprite → Entity → Settings
Extended by: ZoomControl

## Settings and related interfaces

- Settings: `IZoomToolsSettings` — get_api_reference shows it after this page
- Private settings: `IZoomToolsPrivate`
- Events: `IZoomToolsEvents`

## Properties

Public properties (not settings):

- **homeButton** (`Button`) — The `Button` that takes the target back to its home view.
- **minusButton** (`Button`) — The `Button` that zooms out.
- **plusButton** (`Button`) — The `Button` that zooms in.

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Container")`) for signatures and descriptions.

- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
