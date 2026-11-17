---
title: "EditableLabel"
type: "class"
source: "https://docs.amcharts.com/v5/reference/editablelabel/"
generatedFrom: "@amcharts/amcharts5@5.22.0"
---

A label the user can edit in place. Editing starts on `editOn` and ends when the label loses focus or ESC is pressed; `active` is `true` while it lasts.

_Since 5.9.5._

## Import

```js
import * as am5 from "@amcharts/amcharts5";

am5.EditableLabel.new(root, { /* settings */ });
```

## Inheritance

Extends: Label → Container → Sprite → Entity → Settings
Extended by: EditableAxisLabel

## Settings and related interfaces

- Settings: `IEditableLabelSettings` — get_api_reference shows it after this page
- Private settings: `IEditableLabelPrivate`
- Events: `IEditableLabelEvents`

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Label")`) for signatures and descriptions.

- _Label_: getAccessibleText, getText
- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
