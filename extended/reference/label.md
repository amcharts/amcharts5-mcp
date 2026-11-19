---
title: "Label"
type: "class"
source: "https://docs.amcharts.com/v5/reference/label/"
generatedFrom: "@amcharts/amcharts5@5.23.0"
---

A text element with padding and an optional background. Its text can hold in-line formatting and data placeholders.

Docs: https://docs.amcharts.com/v5/concepts/common-elements/labels/

## Import

```js
import * as am5 from "@amcharts/amcharts5";

am5.Label.new(root, { /* settings */ });
```

## Inheritance

Extends: Container → Sprite → Entity → Settings
Extended by: AxisLabel, EditableLabel, RadialLabel

## Settings and related interfaces

- Settings: `ILabelSettings` — get_api_reference shows it after this page
- Private settings: `ILabelPrivate`
- Events: `ILabelEvents`

## Methods

- `getAccessibleText(): string` — Returns "aria-label" text with populated placeholders and formatting if `populateText` is set to `true`. Returns: Populated text
- `getText(): string` — Returns the label's text, with data placeholders filled in when `populateText` is `true`. Returns: Populated text

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Container")`) for signatures and descriptions.

- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
