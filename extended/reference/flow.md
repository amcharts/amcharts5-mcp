---
title: "Flow"
type: "class"
source: "https://docs.amcharts.com/v5/reference/flow/"
generatedFrom: "@amcharts/amcharts5@5.23.0"
---

Base class for the flow series: `Sankey`, `Chord` and `ArcDiagram`.

Docs: https://docs.amcharts.com/v5/charts/flow-charts/

## Import

```js
import * as am5flow from "@amcharts/amcharts5/flow";
```

## Inheritance

Extends: Series → Component → Container → Sprite → Entity → Settings
Extended by: ArcDiagram, Chord, Sankey

## Settings and related interfaces

- Settings: `IFlowSettings` — get_api_reference shows it after this page
- Private settings: `IFlowPrivate`
- Events: `IFlowEvents`
- Data item fields: `IFlowDataItem`

## Properties

Public properties (not settings):

- **linksContainer** (`Container`) — Container that holds the link elements.

## Methods

- `hideDataItem(dataItem: DataItem<this["_dataItemSettings"]>, duration?: number): Promise<void>` — Hides a link: fades its element out and shrinks its value to `hiddenSize` (or `minHiddenValue`), so its nodes keep some size. Parameters: `dataItem`: Link data item; `duration`: Animation duration in milliseconds. Returns: Promise
- `showDataItem(dataItem: DataItem<this["_dataItemSettings"]>, duration?: number): Promise<void>` — Shows a hidden link, growing it back to its value. Parameters: `dataItem`: Link data item; `duration`: Animation duration in milliseconds. Returns: Promise

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Series")`) for signatures and descriptions.

- _Series_: addBullet, endIndex, openUrl, startIndex
- _Component_: getDataItemById, makeDataItem, markDirtyValues, pushDataItem, updateData
- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
