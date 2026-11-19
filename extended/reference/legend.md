---
title: "Legend"
type: "class"
source: "https://docs.amcharts.com/v5/reference/legend/"
generatedFrom: "@amcharts/amcharts5@5.23.0"
---

A list of items, one per series or data item, that can be clicked to show or hide them.

Docs: https://docs.amcharts.com/v5/concepts/legend/

## Import

```js
import * as am5 from "@amcharts/amcharts5";

am5.Legend.new(root, { /* settings */ });
```

## Inheritance

Extends: Series → Component → Container → Sprite → Entity → Settings
Extended by: StockLegend

## Settings and related interfaces

- Settings: `ILegendSettings` — get_api_reference shows it after this page
- Private settings: `ILegendPrivate`
- Events: `ILegendEvents`
- Data item fields: `ILegendDataItem`

## Properties

Public properties (not settings):

- **itemContainers** (`ListTemplate<Container>`) — The containers of the legend items, one per item.
- **labels** (`ListTemplate<Label>`) — The name labels of the legend items.
- **markerRectangles** (`ListTemplate<RoundedRectangle>`) — The rectangles of the default markers.
- **markers** (`ListTemplate<Container>`) — The markers of the legend items.
- **valueLabels** (`ListTemplate<Label>`) — The value labels of the legend items.

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Series")`) for signatures and descriptions.

- _Series_: addBullet, endIndex, hideDataItem, openUrl, showDataItem, startIndex
- _Component_: getDataItemById, makeDataItem, markDirtyValues, pushDataItem, updateData
- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
