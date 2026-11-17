---
title: "DurationAxis"
type: "class"
source: "https://docs.amcharts.com/v5/reference/durationaxis/"
generatedFrom: "@amcharts/amcharts5@5.22.0"
---

A value axis whose values are amounts of `baseUnit`, with labels formatted as durations.

Docs: https://docs.amcharts.com/v5/charts/xy-chart/axes/duration-axis/

## Import

```js
import * as am5xy from "@amcharts/amcharts5/xy";

am5xy.DurationAxis.new(root, { /* settings */ });
```

## Inheritance

Extends: ValueAxis → Axis → Component → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IDurationAxisSettings` — get_api_reference shows it after this page
- Private settings: `IDurationAxisPrivate`
- Events: `IDurationAxisEvents`
- Data item fields: `IDurationAxisDataItem`

## Methods

- `getTooltipText(position: number, _adjustPosition?: boolean): string | undefined` — Returns the text the axis tooltip shows at a position, formatted as a duration. Parameters: `position`: Position on the axis (`0` to `1`). Returns: Tooltip text

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("ValueAxis")`) for signatures and descriptions.

- _ValueAxis_: basePosition, baseValue, getCellWidthPosition, getSeriesItem, getX, getY, positionToValue, valueToPosition, zoomToValues
- _Axis_: coordinateToPosition, createAxisRange, toAxisPosition, toGlobalPosition, updateTooltip, zoom
- _Component_: getDataItemById, makeDataItem, markDirtyValues, pushDataItem, updateData
- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
