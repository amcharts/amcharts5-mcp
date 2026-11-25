---
title: "Indicator"
type: "class"
source: "https://docs.amcharts.com/v5/reference/indicator/"
generatedFrom: "@amcharts/amcharts5@5.24.0"
---

Base class for `StockChart` indicators.

Docs: https://docs.amcharts.com/v5/charts/stock/indicators/

## Import

```js
import * as am5stock from "@amcharts/amcharts5/stock";
```

## Inheritance

Extends: Container → Sprite → Entity → Settings
Extended by: AccelerationBands, ChartIndicator, MACross, MovingAverage, SuperTrend, VWAP, VolumeProfile, ZigZag

## Settings and related interfaces

- Settings: `IIndicatorSettings` — get_api_reference shows it after this page
- Private settings: `IIndicatorPrivate`
- Events: `IIndicatorEvents`

## Properties

Public properties (not settings):

- **series** (`XYSeries`)

## Methods

- `hide(duration?: number): Promise<any>` — Hides the element and returns a `Promise` that resolves when its hiding animations finish.
- `markDataDirty(): void` — Recalculates the indicator's data after the current frame.
- `setCustomData(name: string, value?: any): void` — Stores a value in the indicator series' `customData`, where text such as a legend label can show it as `{name}`. Parameters: `name`: Key; `value`: Value.
- `show(duration?: number): Promise<any>` — Shows the element and returns a `Promise` that resolves when its showing animations finish.

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Container")`) for signatures and descriptions.

- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
