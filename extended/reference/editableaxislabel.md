---
title: "EditableAxisLabel"
type: "class"
source: "https://docs.amcharts.com/v5/reference/editableaxislabel/"
generatedFrom: "@amcharts/amcharts5@5.23.0"
---

An axis label whose text the user can edit in place, as on a Gantt chart's task axis.

Docs: https://docs.amcharts.com/v5/charts/xy-chart/axes/#labels

## Import

```js
import * as am5xy from "@amcharts/amcharts5/xy";

am5xy.EditableAxisLabel.new(root, { /* settings */ });
```

## Inheritance

Extends: EditableLabel → Label → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IEditableAxisLabelSettings` — get_api_reference shows it after this page
- Private settings: `IEditableAxisLabelPrivate`

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Label")`) for signatures and descriptions.

- _Label_: getAccessibleText, getText
- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
