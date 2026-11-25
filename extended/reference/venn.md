---
title: "Venn"
type: "class"
source: "https://docs.amcharts.com/v5/reference/venn/"
generatedFrom: "@amcharts/amcharts5@5.24.0"
---

A Venn diagram: circles sized by their values, overlapping as much as the values of their overlaps say.

Docs: https://docs.amcharts.com/v5/charts/venn/

## Import

```js
import * as am5venn from "@amcharts/amcharts5/venn";

am5venn.Venn.new(root, { /* settings */ });
```

## Inheritance

Extends: Series → Component → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IVennSettings` — get_api_reference shows it after this page
- Private settings: `IVennPrivate`
- Data item fields: `IVennDataItem`

## Properties

Public properties (not settings):

- **hoverGraphics** (`Graphics`) — default `Graphics.new()` — Drawn over the hovered slice, in its shape.
- **labels** (`ListTemplate<Label>`) — All slice labels of the series. Configure them through `labels.template`.
- **labelsContainer** (`Container`) — default `Container.new()` — Holds all labels.
- **slices** (`ListTemplate<Graphics>`) — All slices of the series. Configure them through `slices.template`.
- **slicesContainer** (`Container`) — default `Container.new()` — Holds all slices: circles and overlaps.

## Methods

- `getDataItemByCategory(id: string): DataItem<this["_dataItemSettings"]> | undefined` — Returns the data item of a circle by its category. Parameters: `id`: Category. Returns: Data item
- `hideDataItem(dataItem: DataItem<this["_dataItemSettings"]>, duration?: number): Promise<void>` — Hides a data item. Hiding a circle hides the overlaps it is part of too. Parameters: `dataItem`: Data item; `duration`: Animation duration in milliseconds. Returns: Promise
- `hoverDataItem(dataItem: DataItem<this["_dataItemSettings"]>): void` — Hovers the slice of a data item. Parameters: `dataItem`: Target data item. _Since 5.0.7._
- `showDataItem(dataItem: DataItem<this["_dataItemSettings"]>, duration?: number): Promise<void>` — Shows a data item. Showing an overlap shows its circles too; showing a circle shows again the overlaps whose circles are all shown. Parameters: `dataItem`: Data item; `duration`: Animation duration in milliseconds. Returns: Promise
- `unhoverDataItem(dataItem: DataItem<this["_dataItemSettings"]>): void` — Unhovers the slice of a data item. Parameters: `dataItem`: Target data item. _Since 5.0.7._

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Series")`) for signatures and descriptions.

- _Series_: addBullet, endIndex, getSummary, openUrl, startIndex
- _Component_: getDataItemById, makeDataItem, markDirtyValues, pushDataItem, updateData
- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
