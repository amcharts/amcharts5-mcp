---
title: "ICategoryAxisDataItem"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/icategoryaxisdataitem/"
scraped: "2026-03-15"
---

Inheritance
ICategoryAxisDataItem extends IAxisDataItem.
ICategoryAxisDataItem is extended by IGanttCategoryAxisDataItem, ICategoryDateAxisDataItem.
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
Extended by: IGanttCategoryAxisDataItem, ICategoryDateAxisDataItem

> **Note:** This class also inherits all settings, properties, methods, and events from IAxisDataItem (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **category** (`undefined | string`) — Named category.
- **categoryLocation** (`undefined | number`) — Relative location of the category within cell: 0 - start, 1 - end.
- **cellSize** (`undefined | number`) — A size of the category cell. NOTE: This value is used only if cellSizeField is set on the series.
- **deltaPosition** (`undefined | number`) — A distance to shift data item relative to its original position. The value is 0 to 1, where 1 is full witdth of the axis. Can be used to sort data items without modifying order of the actual data.
- **endCategory** (`undefined | string`) — Named end category (for axis items that span multiple categories, like axis ranges).
- **endCategoryLocation** (`undefined | number`) — Relative location of the end category within cell: 0 - start, 1 - end.
- **id** (`undefined | string`) — A unique id of the data item.
- **index** (`undefined | number`) — Index of the data item.
