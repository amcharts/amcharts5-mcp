---
title: "VoronoiTreemap"
type: "class"
source: "https://docs.amcharts.com/v5/reference/voronoitreemap/"
generatedFrom: "@amcharts/amcharts5@5.24.0"
---

A weighted Voronoi treemap: nodes as polygon cells sized by value, each inside its parent's cell. Many items with very different values lay out poorly; group the small ones into an "Other" item.

_Since 5.4.0._ Docs: https://docs.amcharts.com/v5/charts/hierarchy/voronoi-treemap/

## Import

```js
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";

am5hierarchy.VoronoiTreemap.new(root, { /* settings */ });
```

## Inheritance

Extends: Hierarchy → Series → Component → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IVoronoiTreemapSettings` — get_api_reference shows it after this page
- Private settings: `IVoronoiTreemapPrivate`
- Data item fields: `IVoronoiTreemapDataItem`

## Properties

Public properties (not settings):

- **polygons** (`ListTemplate<Polygon>`) — List of node polygons; configure them all through `polygons.template`.
- **voronoi** (`any`)

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Hierarchy")`) for signatures and descriptions.

- _Hierarchy_: addChildData, disableDataItem, enableDataItem, getDataItemById, hideDataItem, hoverDataItem, selectDataItem, setFlatData, showDataItem, unhoverDataItem
- _Series_: addBullet, endIndex, getSummary, openUrl, startIndex
- _Component_: makeDataItem, markDirtyValues, pushDataItem, updateData
- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
