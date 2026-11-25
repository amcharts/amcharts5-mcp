---
title: "NumericStepper"
type: "class"
source: "https://docs.amcharts.com/v5/reference/numericstepper/"
generatedFrom: "@amcharts/amcharts5@5.24.0"
---

A number field with up and down arrows. The number can also be typed in.

_Since 5.14.0._

## Import

```js
import * as am5 from "@amcharts/amcharts5";

am5.NumericStepper.new(root, { /* settings */ });
```

## Inheritance

Extends: Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `INumericStepperSettings` — get_api_reference shows it after this page
- Private settings: `INumericStepperPrivate`

## Properties

Public properties (not settings):

- **buttonsContainer** (`Container`) — The container of the up and down arrows, shown while the pointer is over the stepper.
- **downButton** (`Triangle`) — The arrow that decreases the value.
- **label** (`EditableLabel`) — The editable label that shows the number.
- **upButton** (`Triangle`) — The arrow that increases the value.

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Container")`) for signatures and descriptions.

- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
