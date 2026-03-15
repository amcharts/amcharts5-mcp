---
title: "IFunnelSeriesDataItem"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ifunnelseriesdataitem/"
scraped: "2026-03-15"
---

Inheritance
IFunnelSeriesDataItem extends IPercentSeriesDataItem.
IFunnelSeriesDataItem is extended by IPyramidSeriesDataItem.
Properties


        category        
        #
      


                          Type string                      
Inherited from IPercentSeriesDataItem
Category.


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


        fill        
        #
      


                          Type Color                      
Inherited from IPercentSeriesDataItem
Fill color used for the slice and related elements, e.g. legend marker.


        fillPattern        
        #
      


                          Type Pattern                      
Inherited from IPercentSeriesDataItem
Pattern used for the slice and related elements, e.g. legend marker.

## Inheritance

Extends: IPercentSeriesDataItem
Extended by: IPyramidSeriesDataItem

> **Note:** This class also inherits all settings, properties, methods, and events from IPercentSeriesDataItem (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **index** (`number`) — Data item's index.
- **link** (`FunnelSlice`) — A related slice link element
- **slice** (`FunnelSlice`) — A related slice element.
