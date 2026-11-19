---
title: "StockLegend"
type: "class"
source: "https://docs.amcharts.com/v5/reference/stocklegend/"
generatedFrom: "@amcharts/amcharts5@5.23.0"
---

A legend for a `StockChart` panel, with settings and close buttons on its items.

Docs: https://docs.amcharts.com/v5/charts/stock/#legend

## Import

```js
import * as am5stock from "@amcharts/amcharts5/stock";

am5stock.StockLegend.new(root, { /* settings */ });
```

## Inheritance

Extends: Legend → Series → Component → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IStockLegendSettings` — get_api_reference shows it after this page
- Private settings: `IStockLegendPrivate`
- Events: `IStockLegendEvents`
- Data item fields: `IStockLegendDataItem`

## Properties

Public properties (not settings):

- **closeButtons** (`ListTemplate<Button>`) — The items' close buttons. Settings on `closeButtons.template` apply to all of them.
- **settingsButtons** (`ListTemplate<Button>`) — The items' settings buttons. Settings on `settingsButtons.template` apply to all of them.

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Series")`) for signatures and descriptions.

- _Series_: addBullet, endIndex, hideDataItem, openUrl, showDataItem, startIndex
- _Component_: getDataItemById, makeDataItem, markDirtyValues, pushDataItem, updateData
- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
