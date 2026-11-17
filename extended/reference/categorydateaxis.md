---
title: "CategoryDateAxis"
type: "class"
source: "https://docs.amcharts.com/v5/reference/categorydateaxis/"
generatedFrom: "@amcharts/amcharts5@5.22.0"
---

A category axis whose categories are timestamps. Each data item takes an equal share of the axis, so periods without data leave no gaps.

Docs: https://docs.amcharts.com/v5/charts/xy-chart/axes/category-date-axis/

## Import

```js
import * as am5xy from "@amcharts/amcharts5/xy";

am5xy.CategoryDateAxis.new(root, { /* settings */ });
```

## Inheritance

Extends: CategoryAxis → Axis → Component → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `ICategoryDateAxisSettings` — get_api_reference shows it after this page
- Private settings: `ICategoryDateAxisPrivate`
- Events: `ICategoryDateAxisEvents`
- Data item fields: `ICategoryDateAxisDataItem`

## Methods

- `baseDuration(): number` — Returns the duration of `baseInterval` in milliseconds. Returns: Duration
- `getTooltipText(position: number, _adjustPosition?: boolean): string | undefined` — Returns the text the axis tooltip shows at a position: the date of the category there. Parameters: `position`: Position on the axis (`0` to `1`). Returns: Tooltip text

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("CategoryAxis")`) for signatures and descriptions.

- _CategoryAxis_: axisPositionToIndex, categoryToIndex, categoryToPosition, endIndex, getCellWidthPosition, getSeriesItem, getX, getY, indexToPosition, startIndex, zoomToCategories, zoomToIndexes
- _Axis_: coordinateToPosition, createAxisRange, toAxisPosition, toGlobalPosition, updateTooltip, zoom
- _Component_: getDataItemById, makeDataItem, markDirtyValues, pushDataItem, updateData
- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
