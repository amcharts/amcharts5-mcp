---
title: "RadarColumnSeries"
type: "class"
source: "https://docs.amcharts.com/v5/reference/radarcolumnseries/"
generatedFrom: "@amcharts/amcharts5@5.22.0"
---

A column series for a `RadarChart`, with each column drawn as a ring segment (`Slice`).

## Import

```js
import * as am5radar from "@amcharts/amcharts5/radar";

am5radar.RadarColumnSeries.new(root, { /* settings */ });
```

## Inheritance

Extends: BaseColumnSeries → XYSeries → Series → Component → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IRadarColumnSeriesSettings` — get_api_reference shows it after this page
- Private settings: `IRadarColumnSeriesPrivate`
- Data item fields: `IRadarColumnSeriesDataItem`

## Properties

Public properties (not settings):

- **chart** (`RadarChart`) — The chart the series belongs to.
- **columns** (`ListTemplate<Slice>`) — default `new ListTemplate<Slice>` — Columns of the series. Configure them all through `columns.template`.

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("BaseColumnSeries")`) for signatures and descriptions.

- _BaseColumnSeries_: createAxisRange, hideDataItem, showDataItem
- _XYSeries_: hide, hideTooltip, resetExtremes, show, showDataItemTooltip
- _Series_: addBullet, endIndex, openUrl, startIndex
- _Component_: getDataItemById, makeDataItem, markDirtyValues, pushDataItem, updateData
- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
