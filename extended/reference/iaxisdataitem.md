---
title: "IAxisDataItem"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iaxisdataitem/"
scraped: "2026-03-15"
---

Inheritance
IAxisDataItem extends IComponentDataItem.
IAxisDataItem is extended by IValueAxisDataItem, ICategoryAxisDataItem.
Properties


        above        
        #
      


                          Type undefined | false | true                      
Default false

If set to true, the grid and axis fill of this data item will be drawn above series.
 NOTE: this needs to be set before crating an axis range. Updating this dynamically won't have any effect.
 NOTE: if you need all grid to be drawn above series, you can brig it to front with chart.gridContainer.toFront();.

## Inheritance

Extends: IComponentDataItem
Extended by: IValueAxisDataItem, ICategoryAxisDataItem

> **Note:** This class also inherits all settings, properties, methods, and events from IComponentDataItem (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **above** (`undefined | false | true`) — Default false If set to true, the grid and axis fill of this data item will be drawn above series. NOTE: this needs to be set before crating an axis range. Updating this dynamically won't have any effect. NOTE: if you need all grid to be drawn above series, you can brig it to front with chart.gridContainer.toFront();. Click here for more info
- **axisFill** (`Graphics`) — Axis fill element.
- **bullet** (`AxisBullet`) — Bullet element.
- **grid** (`Grid`) — Grid line element.
- **isRange** (`undefined | false | true`) — Indicates if this data item represents an axis range.
- **label** (`AxisLabel`) — Axis label element.
- **tick** (`AxisTick`) — Tick element.
