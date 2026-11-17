---
title: "Component"
type: "class"
source: "https://docs.amcharts.com/v5/reference/component/"
generatedFrom: "@amcharts/amcharts5@5.22.0"
---

Base class for elements that use data.

## Import

```js
import * as am5 from "@amcharts/amcharts5";
```

## Inheritance

Extends: Container → Sprite → Entity → Settings
Extended by: Axis, Series

## Settings and related interfaces

- Settings: `IComponentSettings` — get_api_reference shows it after this page
- Private settings: `IComponentPrivate`
- Events: `IComponentEvents`
- Data item fields: `IComponentDataItem`

## Properties

Public properties (not settings):

- **data** (`ListData<unknown>`) — The component's data: a list of data objects, each made into a data item. Docs: https://docs.amcharts.com/v5/concepts/data/
- **dataItems** (`DataItem<this["_dataItemSettings"]>[]`) — The component's data items.
- **inited** (`boolean`) — Becomes `true` after the component's first update.

## Methods

- `getDataItemById(id: string): DataItem<this["_dataItemSettings"]> | undefined` — Returns the data item whose `id` matches, if any. Parameters: `id`: ID. Returns: Data item
- `hideDataItem(dataItem: DataItem<this["_dataItemSettings"]>, _duration?: number): Promise<void>` — Hides a data item. Parameters: `dataItem`: Data item; `_duration`: Animation duration in milliseconds. Returns: Promise
- `makeDataItem(data: this["_dataItemSettings"], dataContext?: any): DataItem<this["_dataItemSettings"]>` — Creates and processes a data item, without adding it to `dataItems`. Parameters: `data`: Data item settings; `dataContext`: Object to use as the data item's `dataContext`. Returns: New data item
- `markDirtyValues(_dataItem?: DataItem<this["_dataItemSettings"]>): void` — Makes the component redraw from its data on the next frame. _Since 5.0.21._
- `pushDataItem(data: this["_dataItemSettings"], dataContext?: any): DataItem<this["_dataItemSettings"]>` — Creates a data item straight from settings, not from data, and adds it to the component's data items. Parameters: `data`: Data item settings; `dataContext`: Object to use as the data item's `dataContext`. Returns: New data item
- `showDataItem(dataItem: DataItem<this["_dataItemSettings"]>, _duration?: number): Promise<void>` — Shows a data item. Parameters: `dataItem`: Data item; `_duration`: Animation duration in milliseconds. Returns: Promise
- `updateData(data: Array<any>): void` — Updates the data in place, keeping the existing data items: each object's values go into the data item at the same index. Extra objects are added as new data items, and data items beyond the new data are removed. Parameters: `data`: New data.

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Container")`) for signatures and descriptions.

- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
