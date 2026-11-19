---
title: "Tooltip"
type: "class"
source: "https://docs.amcharts.com/v5/reference/tooltip/"
generatedFrom: "@amcharts/amcharts5@5.23.0"
---

A label in a pointed box that points at an element or a point.

Docs: https://docs.amcharts.com/v5/concepts/common-elements/tooltips/

## Import

```js
import * as am5 from "@amcharts/amcharts5";

am5.Tooltip.new(root, { /* settings */ });
```

## Inheritance

Extends: Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `ITooltipSettings` — get_api_reference shows it after this page
- Private settings: `ITooltipPrivate`

## Properties

Public properties (not settings):

- **label** (`Label`) — The tooltip's `Label`.

## Methods

- `updateBackgroundColor(): void` — Takes the colors from `tooltipTarget` again, as the `get...FromSprite` settings say.

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Container")`) for signatures and descriptions.

- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
