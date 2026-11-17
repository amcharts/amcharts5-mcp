---
title: "MapSankeyNodes"
type: "class"
source: "https://docs.amcharts.com/v5/reference/mapsankeynodes/"
generatedFrom: "@amcharts/amcharts5@5.22.0"
---

The nodes of a `MapSankeySeries`, available as its `nodes`.

_Since 5.17.0._ Docs: https://docs.amcharts.com/v5/charts/map-chart/map-sankey-series/

## Import

```js
import * as am5map from "@amcharts/amcharts5/map";

am5map.MapSankeyNodes.new(root, { /* settings */ });
```

## Inheritance

Extends: Series → Component → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IMapSankeyNodesSettings` — get_api_reference shows it after this page
- Private settings: `IMapSankeyNodesPrivate`
- Events: `IMapSankeyNodesEvents`
- Data item fields: `IMapSankeyNodesDataItem`

## Properties

Public properties (not settings):

- **flow** (`MapSankeySeries`) — The series the nodes belong to.
- **mapPolygons** (`ListTemplate<MapPolygon>`) — default `new ListTemplate<MapPolygon>` — Polygons of all nodes. Style them through `mapPolygons.template`.

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Series")`) for signatures and descriptions.

- _Series_: addBullet, endIndex, hideDataItem, openUrl, showDataItem, startIndex
- _Component_: getDataItemById, makeDataItem, markDirtyValues, pushDataItem, updateData
- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
