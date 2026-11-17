---
title: "ProgressPie"
type: "class"
source: "https://docs.amcharts.com/v5/reference/progresspie/"
generatedFrom: "@amcharts/amcharts5@5.22.0"
---

A ring that fills clockwise from the top as `value` goes from `0` to `1`, with the percent shown in the middle.

_Since 5.14.0._

## Import

```js
import * as am5 from "@amcharts/amcharts5";

am5.ProgressPie.new(root, { /* settings */ });
```

## Inheritance

Extends: Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IProgressPieSettings` — get_api_reference shows it after this page
- Private settings: `IProgressPiePrivate`

## Properties

Public properties (not settings):

- **backgroundSlice** (`Slice`) — The full ring behind `slice`.
- **circle** (`Circle`) — The circle behind the ring.
- **label** (`Label`) — The label in the middle that shows the percent.
- **slice** (`Slice`) — The slice that shows the progress.

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Container")`) for signatures and descriptions.

- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
