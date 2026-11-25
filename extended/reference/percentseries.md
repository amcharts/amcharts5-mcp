---
title: "PercentSeries"
type: "class"
source: "https://docs.amcharts.com/v5/reference/percentseries/"
generatedFrom: "@amcharts/amcharts5@5.24.0"
---

Base class for the series of percent charts: `PieSeries`, `FunnelSeries`, `PyramidSeries` and `PictorialStackedSeries`.

## Import

```js
import * as am5percent from "@amcharts/amcharts5/percent";
```

## Inheritance

Extends: Series → Component → Container → Sprite → Entity → Settings
Extended by: FunnelSeries, PieSeries

## Settings and related interfaces

- Settings: `IPercentSeriesSettings` — get_api_reference shows it after this page
- Private settings: `IPercentSeriesPrivate`
- Data item fields: `IPercentSeriesDataItem`

## Properties

Public properties (not settings):

- **chart** (`PercentChart`) — The chart the series belongs to.
- **labels** (`ListTemplate<this["_labelType"]>`) — List of slice labels; configure them all through `labels.template`.
- **labelsContainer** (`Container`)
- **slices** (`ListTemplate<this["_sliceType"]>`) — List of slice elements; configure them all through `slices.template`.
- **slicesContainer** (`Container`)
- **ticks** (`ListTemplate<this["_tickType"]>`) — List of the ticks that join labels to their slices; configure them all through `ticks.template`.
- **ticksContainer** (`Container`)

## Methods

- `hide(duration?: number): Promise<void>` — Hides the series. Parameters: `duration`: Animation duration in milliseconds. Returns: Animation promise
- `hideDataItem(dataItem: DataItem<this["_dataItemSettings"]>, duration?: number): Promise<void>` — Hides a slice, with its label and tick, shrinking its value to zero. Parameters: `dataItem`: Data item; `duration`: Animation duration in milliseconds. Returns: Promise
- `hoverDataItem(dataItem: DataItem<this["_dataItemSettings"]>): void` — Puts a data item's slice in its hover state, unless it is hidden. Parameters: `dataItem`: Target data item. _Since 5.0.7._
- `show(duration?: number): Promise<void>` — Shows hidden series. Parameters: `duration`: Animation duration in milliseconds. Returns: Animation promise
- `showDataItem(dataItem: DataItem<this["_dataItemSettings"]>, duration?: number): Promise<void>` — Shows a hidden slice, with its label and tick, growing its value back. Parameters: `dataItem`: Data item; `duration`: Animation duration in milliseconds. Returns: Promise
- `unhoverDataItem(dataItem: DataItem<this["_dataItemSettings"]>): void` — Takes a data item's slice out of its hover state. Parameters: `dataItem`: Target data item. _Since 5.0.7._

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Series")`) for signatures and descriptions.

- _Series_: addBullet, endIndex, getSummary, openUrl, startIndex
- _Component_: getDataItemById, makeDataItem, markDirtyValues, pushDataItem, updateData
- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
