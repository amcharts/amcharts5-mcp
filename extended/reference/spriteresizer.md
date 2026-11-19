---
title: "SpriteResizer"
type: "class"
source: "https://docs.amcharts.com/v5/reference/spriteresizer/"
generatedFrom: "@amcharts/amcharts5@5.23.0"
---

A frame with grips around an element: dragging the left or right grip scales the element, and the top or bottom grip rotates it.

## Import

```js
import * as am5 from "@amcharts/amcharts5";

am5.SpriteResizer.new(root, { /* settings */ });
```

## Inheritance

Extends: Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `ISpriteResizerSettings` — get_api_reference shows it after this page
- Private settings: `ISpriteResizerPrivate`
- Events: `ISpriteResizerEvents`

## Properties

Public properties (not settings):

- **gripB** (`Container`) — Bottom grip, which rotates the element.
- **gripL** (`Container`) — Left grip, which scales the element.
- **gripR** (`Container`) — Right grip, which scales the element.
- **gripT** (`Container`) — Top grip, which rotates the element.
- **rectangle** (`Rectangle`) — The frame drawn around the element.

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Container")`) for signatures and descriptions.

- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
