---
title: "PanelControls"
type: "class"
source: "https://docs.amcharts.com/v5/reference/panelcontrols/"
generatedFrom: "@amcharts/amcharts5@5.22.0"
---

Buttons on a `StockChart` panel that move it up or down, expand it and close it.

Docs: https://docs.amcharts.com/v5/charts/stock/panels/#panel-controls

## Import

```js
import * as am5stock from "@amcharts/amcharts5/stock";

am5stock.PanelControls.new(root, { /* settings */ });
```

## Inheritance

Extends: Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IPanelControlsSettings` — get_api_reference shows it after this page
- Private settings: `IPanelControlsPrivate`

## Properties

Public properties (not settings):

- **closeButton** (`Button`) — The `Button` that closes the panel.
- **downButton** (`Button`) — The `Button` that moves the panel one place down.
- **expandButton** (`Button`) — The `Button` that expands the panel to fill the chart, or shows the other panels again.
- **upButton** (`Button`) — The `Button` that moves the panel one place up.

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Container")`) for signatures and descriptions.

- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
