---
title: "ArcDiagramLink"
type: "class"
source: "https://docs.amcharts.com/v5/reference/arcdiagramlink/"
generatedFrom: "@amcharts/amcharts5@5.23.0"
---

A link element of an `ArcDiagram` series: an arc from one node to another.

## Import

```js
import * as am5flow from "@amcharts/amcharts5/flow";

am5flow.ArcDiagramLink.new(root, { /* settings */ });
```

## Inheritance

Extends: FlowLink → Graphics → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IArcDiagramLinkSettings` — get_api_reference shows it after this page
- Private settings: `IArcDiagramLinkPrivate`

## Properties

Public properties (not settings):

- **series** (`ArcDiagram`)

## Methods

- `getPoint(location: number): IOrientationPoint`

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Sprite")`) for signatures and descriptions.

- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
