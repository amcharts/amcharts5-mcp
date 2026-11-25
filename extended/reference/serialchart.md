---
title: "SerialChart"
type: "class"
source: "https://docs.amcharts.com/v5/reference/serialchart/"
generatedFrom: "@amcharts/amcharts5@5.24.0"
---

A base class for all series-based charts.

## Import

```js
import * as am5 from "@amcharts/amcharts5";
```

## Inheritance

Extends: Chart → Container → Sprite → Entity → Settings
Extended by: MapChart, PercentChart, SerialChartContainer, XYChart

## Settings and related interfaces

- Settings: `ISerialChartSettings` — get_api_reference shows it after this page
- Private settings: `ISerialChartPrivate`
- Events: `ISerialChartEvents`

## Properties

Public properties (not settings):

- **series** (`ListAutoDispose<this["_seriesType"]>`) — The chart's series: push a series here to add it to the chart. A series removed from the list is disposed.
- **seriesContainer** (`Container`) — default `Container.new()` — The `Container` the chart's series are drawn in.

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Container")`) for signatures and descriptions.

- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
