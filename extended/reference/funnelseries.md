---
title: "FunnelSeries"
type: "class"
source: "https://docs.amcharts.com/v5/reference/funnelseries/"
generatedFrom: "@amcharts/amcharts5@5.23.0"
---

A funnel series for a `SlicedChart`: slices of equal height, each as wide as its value relative to the largest one.

Docs: https://docs.amcharts.com/v5/charts/percent-charts/sliced-chart/funnel-series/

## Import

```js
import * as am5percent from "@amcharts/amcharts5/percent";

am5percent.FunnelSeries.new(root, { /* settings */ });
```

## Inheritance

Extends: PercentSeries → Series → Component → Container → Sprite → Entity → Settings
Extended by: PyramidSeries

## Settings and related interfaces

- Settings: `IFunnelSeriesSettings` — get_api_reference shows it after this page
- Private settings: `IFunnelSeriesPrivate`
- Data item fields: `IFunnelSeriesDataItem`

## Properties

Public properties (not settings):

- **chart** (`SlicedChart`) — The chart the series belongs to.
- **links** (`ListTemplate<this["_sliceType"]>`) — A `ListTemplate` of all slice links in series. `links.template` can also be used to configure slice links. Docs: https://docs.amcharts.com/v5/charts/percent-charts/sliced-chart/funnel-series/#slice-links

## Methods

- `hideDataItem(dataItem: DataItem<this["_dataItemSettings"]>, duration?: number): Promise<void>` — Hides a slice, with its label, tick and link. Parameters: `dataItem`: Data item; `duration`: Animation duration in milliseconds. Returns: Promise
- `showDataItem(dataItem: DataItem<this["_dataItemSettings"]>, duration?: number): Promise<void>` — Shows a hidden slice, with its label, tick and link. Parameters: `dataItem`: Data item; `duration`: Animation duration in milliseconds. Returns: Promise

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("PercentSeries")`) for signatures and descriptions.

- _PercentSeries_: hide, hoverDataItem, show, unhoverDataItem
- _Series_: addBullet, endIndex, openUrl, startIndex
- _Component_: getDataItemById, makeDataItem, markDirtyValues, pushDataItem, updateData
- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
