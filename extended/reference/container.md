---
title: "Container"
type: "class"
source: "https://docs.amcharts.com/v5/reference/container/"
generatedFrom: "@amcharts/amcharts5@5.24.0"
---

An element that holds child elements, arranges them with a layout, and can have a background.

Its children can be any `Sprite`, from basic shapes to whole charts.

Docs: https://docs.amcharts.com/v5/concepts/common-elements/containers/

## Import

```js
import * as am5 from "@amcharts/amcharts5";

am5.Container.new(root, { /* settings */ });
```

## Inheritance

Extends: Sprite → Entity → Settings
Extended by: BreadcrumbBar, Button, Chart, ClockHand, ColorPicker, ColorPickerButton, Component, FlowNode, Gantt, HeatLegend, HierarchyNode, Indicator, Label, Link, NumericStepper, PanelControls, ProgressPie, Scrollbar, SpriteResizer, StockChart, Tooltip, XYCursor, ZoomTools, ZoomableContainer

## Settings and related interfaces

- Settings: `IContainerSettings` — get_api_reference shows it after this page
- Private settings: `IContainerPrivate`
- Events: `IContainerEvents`

## Properties

Public properties (not settings):

- **children** (`Children<Sprite>`) — The container's child elements.

## Methods

- `allChildren(): Array<Sprite>` — Returns all children, including the background, vertical scrollbar and mask.
- `contentHeight(): number`
- `contentWidth(): number`
- `eachChildren(f: (child: Sprite) => void): void` — Calls `f` for each child, including the background, vertical scrollbar and mask.
- `innerHeight(): number` — Returns the container's height without padding, in pixels. Returns: Inner height (px)
- `innerWidth(): number` — Returns the container's width without padding, in pixels. Returns: Inner width (px)
- `scrollToChild(child: Sprite): void` — Scrolls the container so that the child comes into view, if it is out of view. Works only on a container with a `verticalScrollbar`. Parameters: `child`: Child to scroll to. _Since 5.10.5._

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Sprite")`) for signatures and descriptions.

- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
