---
title: "Chart"
type: "class"
source: "https://docs.amcharts.com/v5/reference/chart/"
generatedFrom: "@amcharts/amcharts5@5.24.0"
---

A base class for all charts.

## Import

```js
import * as am5 from "@amcharts/amcharts5";
```

## Inheritance

Extends: Container → Sprite → Entity → Settings
Extended by: SerialChart

## Settings and related interfaces

- Settings: `IChartSettings` — get_api_reference shows it after this page
- Private settings: `IChartPrivate`
- Events: `IChartEvents`

## Properties

Public properties (not settings):

- **bulletsContainer** (`Container`) — default `Container.new()` — The `Container` the chart places its bullets in.
- **chartContainer** (`Container`) — default `Container.new()` — The `Container` the chart places its elements in.

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Container")`) for signatures and descriptions.

- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
