---
title: "Link"
type: "class"
source: "https://docs.amcharts.com/v5/reference/link/"
generatedFrom: "@amcharts/amcharts5@5.23.0"
---

A connector made of horizontal and vertical segments through `points`, with an arrow at each end, such as a dependency line in a Gantt chart.

Docs: https://docs.amcharts.com/v5/concepts/common-elements/graphics/

## Import

```js
import * as am5 from "@amcharts/amcharts5";

am5.Link.new(root, { /* settings */ });
```

## Inheritance

Extends: Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `ILinkSettings` — get_api_reference shows it after this page
- Private settings: `ILinkPrivate`

## Properties

Public properties (not settings):

- **endArrow** (`Triangle`) — The arrow at the last point.
- **hitLine** (`OrthogonalLine`) — A wider, invisible copy of the line that makes the link easier to hover and click.
- **line** (`OrthogonalLine`) — The visible line.
- **startArrow** (`Triangle`) — The arrow at the first point.

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Container")`) for signatures and descriptions.

- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
