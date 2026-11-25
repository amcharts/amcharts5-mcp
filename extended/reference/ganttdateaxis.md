---
title: "GanttDateAxis"
type: "class"
source: "https://docs.amcharts.com/v5/reference/ganttdateaxis/"
generatedFrom: "@amcharts/amcharts5@5.24.0"
---

A date axis of a `Gantt` chart. The Gantt has two, both above the plot area: `xAxis` with the larger time units and `xAxisMinor` below it.

_Since 5.14.0._ Docs: https://docs.amcharts.com/v5/charts/gantt/#timeline-horizontal-axis

## Import

```js
import * as am5gantt from "@amcharts/amcharts5/gantt";

am5gantt.GanttDateAxis.new(root, { /* settings */ });
```

## Inheritance

Extends: DateAxis → ValueAxis → Axis → Component → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IGanttDateAxisSettings` — get_api_reference shows it after this page
- Private settings: `IGanttDateAxisPrivate`
- Events: `IGanttDateAxisEvents`
- Data item fields: `IGanttDateAxisDataItem`

## Properties

Public properties (not settings):

- **gantt** (`Gantt`) — A reference to the parent `Gantt` chart.

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("DateAxis")`) for signatures and descriptions.

- _DateAxis_: baseDuration, baseMainDuration, baseMainInterval, dateToPosition, getCellWidthPosition, getGroupInterval, getIntervalMax, getIntervalMin, getSeriesItem, getTooltipText, positionToDate, zoomToDates, zoomToValues
- _ValueAxis_: basePosition, baseValue, getX, getY, positionToValue, valueToPosition
- _Axis_: coordinateToPosition, createAxisRange, toAxisPosition, toGlobalPosition, updateTooltip, zoom
- _Component_: getDataItemById, makeDataItem, pushDataItem, updateData
- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
