---
title: "IGanttSeriesDataItem"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iganttseriesdataitem/"
scraped: "2026-03-15"
---

Inheritance
IGanttSeriesDataItem extends IColumnSeriesDataItem.
IGanttSeriesDataItem is not extended by any other symbol.
Properties


        bottom        
        #
      


                          Type undefined | number                      
Inherited from IXYSeriesDataItem


        categoryAxisDataItem        
        #
      


                          Type DataItem                      
A reference to a corresponding category axis data item.


        categoryX        
        #
      


                          Type undefined | string                      
Inherited from IXYSeriesDataItem


        categoryY        
        #
      


                          Type undefined | string                      
Inherited from IXYSeriesDataItem


        children        
        #
      


                          Type Array                      
Array of children data items.


        container        
        #
      


                          Type Container                      
Container that holds all the elements of the series item, except the column graphics itslef.


        customValue        
        #
      


                          Type undefined | number                      
Inherited from ISeriesDataItem


        customValueChange        
        #
      


                          Type undefined | number                      
Inherited from ISeriesDataItem


        customValueChangePercent        
        #
      


                          Type undefined | number                      
Inherited from ISeriesDataItem


        customValueChangePrevious        
        #
      


                          Type undefined | number                      
Inherited from ISeriesDataItem


        customValueChangePreviousPercent        
        #
      


                          Type undefined | number                      
Inherited from ISeriesDataItem


        customValueChangeSelection        
        #
      


                          Type undefined | number                      
Inherited from ISeriesDataItem


        customValueChangeSelectionPercent        
        #
      


                          Type undefined | number                      
Inherited from ISeriesDataItem


        customValueWorking        
        #
      


                          Type undefined | number                      
Inherited from ISeriesDataItem


        duration        
        #
      


                          Type undefined | number                      
Duration of the task, in units of the x axis.


        endBullet        
        #
      


                          Type Circle                      
A Circle used as a bullet shown at the end of the task bar.


        endGrip        
        #
      


                          Type Rectangle                      
A Rectangle filled with line pattern which is used to resize task bar.


        graphics        
        #
      


                          Type Graphics                      
Inherited from IBaseColumnSeriesDataItem
An actual Graphics element (Column/Slice/Candlestick/OHLC).


        highValueX        
        #
      


                          Type undefined | number                      
Inherited from IXYSeriesDataItem


        highValueXChange        
        #
      


                          Type undefined | number                      
Inherited from IXYSeriesDataItem


        highValueXChangePercent        
        #
      


                          Type undefined | number                      
Inherited from IXYSeriesDataItem


        highValueXChangePrevious        
        #
      


                          Type undefined | number                      
Inherited from IXYSeriesDataItem


        highValueXChangePreviousPercent        
        #
      


                          Type undefined | number                      
Inherited from IXYSeriesDataItem


        highValueXChangeSelection        
        #
      


                          Type undefined | number                      
Inherited from IXYSeriesDataItem


        highValueXChangeSelectionPercent        
        #
      


                          Type undefined | number                      
Inherited from IXYSeriesDataItem


        highValueXWorking        
        #
      


                          Type undefined | number                      
Inherited from IXYSeriesDataItem


        highValueXWorkingClose        
        #
      


                          Type undefined | number                      
Inherited from IXYSeriesDataItem


        highValueXWorkingOpen        
        #
      


                          Type undefined | number                      
Inherited from IXYSeriesDataItem


        highValueY        
        #
      


                          Type undefined | number                      
Inherited from IXYSeriesDataItem


        highValueYChange        
        #
      


                          Type undefined | number                      
Inherited from IXYSeriesDataItem


        highValueYChangePercent        
        #
      


                          Type undefined | number                      
Inherited from IXYSeriesDataItem


        highValueYChangePrevious        
        #
      


                          Type undefined | number                      
Inherited from IXYSeriesDataItem


        highValueYChangePreviousPercent        
        #
      


                          Type undefined | number                      
Inherited from IXYSeriesDataItem


        highValueYChangeSelection        
        #
      


                          Type undefined | number                      
Inherited from IXYSeriesDataItem


        highValueYChangeSelectionPercent        
        #
      


                          Type undefined | number                      
Inherited from IXYSeriesDataItem


        highValueYWorking        
        #
      


                          Type undefined | number                      
Inherited from IXYSeriesDataItem


        highValueYWorkingClose        
        #
      


                          Type undefined | number                      
Inherited from IXYSeriesDataItem


        highValueYWorkingOpen        
        #
      


                          Type undefined | number                      
Inherited from IXYSeriesDataItem


        id        
        #
      


                          Type undefined | string                      
Inherited from ISeriesDataItem


        left        
        #
      


                          Type undefined | number                      
Inherited from IXYSeriesDataItem


        legendDataItem        
        #
      


                          Type DataItem                      
Inherited from IBaseColumnSeriesDataItem
If data items from this series are used to feed a Legend, this will hold a reference to the equivalent Legend data item.

## Inheritance

Extends: IColumnSeriesDataItem

> **Note:** This class also inherits all settings, properties, methods, and events from IColumnSeriesDataItem (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **categoryAxisDataItem** (`DataItem`) — A reference to a corresponding category axis data item.
- **children** (`Array`) — Array of children data items.
- **container** (`Container`) — Container that holds all the elements of the series item, except the column graphics itslef.
- **duration** (`undefined | number`) — Duration of the task, in units of the x axis.
- **endBullet** (`Circle`) — A Circle used as a bullet shown at the end of the task bar.
- **endGrip** (`Rectangle`) — A Rectangle filled with line pattern which is used to resize task bar.
- **linkTo** (`Array`) — Array of IDs of tasks this task is linked to.
- **links** (`undefined | object`) — Refferences to Link objects that are used to visually connect tasks.
- **mask** (`RoundedRectangle`) — A RoundedRectangle that is used to mask the progress rectangle.
- **maskedContainer** (`Container`) — A Container that is masked and holds progress rectangle and progress grip.
- **name** (`undefined | string`) — Category name.
- **parent** (`DataItem`) — A reference to a parent data item, if any.
- **prevProgress** (`undefined | number`) — A value that holds previous progress value of the task, used when toggling progress using progress pie next to the y axis label.
- **progress** (`undefined | number`) — A value that holds the progress value of the task.
- **progressGrip** (`Triangle`) — A Triangle that is used to resize progress rectangle.
- **progressRectangle** (`Rectangle`) — A Rectangle that is used to show progress of the task. It actually shows the remaining part of the task and is filled with diagonal line pattern.
- **startBullet** (`Circle`) — A Circle used as a bullet shown at the start of the task bar.
- **startGrip** (`Rectangle`) — A Rectangle filled with line pattern which is used to resize task bar.

