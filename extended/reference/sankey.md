---
title: "Sankey"
type: "class"
source: "https://docs.amcharts.com/v5/reference/sankey/"
generatedFrom: "@amcharts/amcharts5@5.24.0"
---

Sankey diagram: nodes in columns, linked by bands as wide as the values they carry.

Docs: https://docs.amcharts.com/v5/charts/flow-charts/

## Import

```js
import * as am5flow from "@amcharts/amcharts5/flow";

am5flow.Sankey.new(root, { /* settings */ });
```

## Inheritance

Extends: Flow → Series → Component → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `ISankeySettings` — get_api_reference shows it after this page
- Private settings: `ISankeyPrivate`
- Events: `ISankeyEvents`
- Data item fields: `ISankeyDataItem`

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Flow")`) for signatures and descriptions.

- _Flow_: hideDataItem, showDataItem
- _Series_: addBullet, endIndex, getSummary, openUrl, startIndex
- _Component_: getDataItemById, makeDataItem, markDirtyValues, pushDataItem, updateData
- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
