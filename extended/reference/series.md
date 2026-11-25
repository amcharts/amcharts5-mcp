---
title: "Series"
type: "class"
source: "https://docs.amcharts.com/v5/reference/series/"
generatedFrom: "@amcharts/amcharts5@5.24.0"
---

Base class of all series.

## Import

```js
import * as am5 from "@amcharts/amcharts5";
```

## Inheritance

Extends: Component → Container → Sprite → Entity → Settings
Extended by: Flow, FlowNodes, Hierarchy, Legend, MapSankeyNodes, MapSeries, PercentSeries, Venn, WordCloud, XYSeries

## Settings and related interfaces

- Settings: `ISeriesSettings` — get_api_reference shows it after this page
- Private settings: `ISeriesPrivate`
- Events: `ISeriesEvents`
- Data item fields: `ISeriesDataItem`

## Properties

Public properties (not settings):

- **bullets** (`List<(<D extends DataItem<this["_dataItemSettings"]>>(root: Root, series: Series, dataItem: D) => Bullet | undefined)>`) — Functions that make the series' bullets: each is called for every data item and returns a `Bullet`, or nothing for no bullet. Docs: https://docs.amcharts.com/v5/concepts/common-elements/bullets/
- **bulletsContainer** (`Container`) — The `Container` that holds the series' bullets.
- **chart** (`Chart`) — The chart the series belongs to.

## Methods

- `addBullet(dataItem: DataItem<this["_dataItemSettings"]>, bullet: Bullet): void` — Adds a bullet to one data item. Unlike `series.bullets`, it takes a `Bullet` instance, not a function. Parameters: `dataItem`: Target data item; `bullet`: Bullet instance. _Since 5.6.0._ Docs: https://docs.amcharts.com/v5/concepts/common-elements/bullets/#adding-directly-to-data-item
- `endIndex(): number` — Returns the index after the last data item in the visible range.
- `getSummary(): ISeriesSummary | undefined` — Returns a summary of the series' data: how many values it has, its highest and lowest, and where the data has an order its first and last, with a text for screen readers. `undefined` if it has no values. Returns: Summary _Since 5.24.0._
- `hideDataItem(dataItem: DataItem<this["_dataItemSettings"]>, duration?: number): Promise<void>` — Hides a data item and its bullets. Parameters: `dataItem`: Data item; `duration`: Animation duration in milliseconds. Returns: Promise
- `openUrl(dataItem: DataItem<this["_dataItemSettings"]>): void` — Opens a data item's URL in the window set by `linkTarget`. Override to intercept links, e.g. in an editor. Parameters: `dataItem`: Data item. _Since 5.20.7._
- `showDataItem(dataItem: DataItem<this["_dataItemSettings"]>, duration?: number): Promise<void>` — Shows a data item and its bullets. Parameters: `dataItem`: Data item; `duration`: Animation duration in milliseconds. Returns: Promise
- `startIndex(): number` — Returns the index of the first data item in the visible range.

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Component")`) for signatures and descriptions.

- _Component_: getDataItemById, makeDataItem, markDirtyValues, pushDataItem, updateData
- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
