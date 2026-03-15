---
title: "IDateAxisDataItem"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/idateaxisdataitem/"
scraped: "2026-03-15"
---

Inheritance
IDateAxisDataItem extends IValueAxisDataItem.
IDateAxisDataItem is extended by IGanttDateAxisDataItem, IGaplessDateAxisDataItem.
Properties


        above        
        #
      


                          Type undefined | false | true                      
Default false

Inherited from IAxisDataItem
If set to true, the grid and axis fill of this data item will be drawn above series.
 NOTE: this needs to be set before crating an axis range. Updating this dynamically won't have any effect.
 NOTE: if you need all grid to be drawn above series, you can brig it to front with chart.gridContainer.toFront();.

## Inheritance

Extends: IValueAxisDataItem
Extended by: IGanttDateAxisDataItem, IGaplessDateAxisDataItem

> **Note:** This class also inherits all settings, properties, methods, and events from IValueAxisDataItem (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.
