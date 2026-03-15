---
title: "IPercentSeriesDataItem"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ipercentseriesdataitem/"
scraped: "2026-03-15"
---

Inheritance
IPercentSeriesDataItem extends ISeriesDataItem.
IPercentSeriesDataItem is extended by IFunnelSeriesDataItem, IPieSeriesDataItem.
Properties


        category        
        #
      


                          Type string                      
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
Fill color used for the slice and related elements, e.g. legend marker.


        fillPattern        
        #
      


                          Type Pattern                      
Pattern used for the slice and related elements, e.g. legend marker.

## Inheritance

Extends: ISeriesDataItem
Extended by: IFunnelSeriesDataItem, IPieSeriesDataItem

> **Note:** This class also inherits all settings, properties, methods, and events from ISeriesDataItem (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **category** (`string`) — Category.
- **fill** (`Color`) — Fill color used for the slice and related elements, e.g. legend marker.
- **fillPattern** (`Pattern`) — Pattern used for the slice and related elements, e.g. legend marker. Click here for more info @since 5.10.0
- **label** (`Label`) — Slice label.
- **legendDataItem** (`DataItem`) — A related legend data item.
- **slice** (`Graphics`) — Slice visual element.
- **tick** (`Tick`) — Slice tick.
- **valuePercentTotal** (`number`) — Percent of the series value total.
