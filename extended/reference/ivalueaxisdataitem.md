---
title: "IValueAxisDataItem"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ivalueaxisdataitem/"
scraped: "2026-03-15"
---

Inheritance
IValueAxisDataItem extends IAxisDataItem.
IValueAxisDataItem is extended by IDateAxisDataItem, IDurationAxisDataItem.
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

Extends: IAxisDataItem
Extended by: IDateAxisDataItem, IDurationAxisDataItem

> **Note:** This class also inherits all settings, properties, methods, and events from IAxisDataItem (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **affectsMinMax** (`undefined | false | true`) — If set to true the values fo this data item will be factored in when calculating scale of the ValueAxis. Useful for axis ranges. @since 5.1.4
- **endValue** (`undefined | number`) — End value for axis items that span multiple values, like axis ranges.
- **value** (`undefined | number`) — Value of the data item.
