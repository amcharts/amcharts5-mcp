---
title: "IVennDataItem"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ivenndataitem/"
scraped: "2026-03-15"
---

Inheritance
IVennDataItem extends ISeriesDataItem.
IVennDataItem is not extended by any other symbol.
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
Fill pattern used for the slice and related elements, e.g. legend marker.

## Inheritance

Extends: ISeriesDataItem

> **Note:** This class also inherits all settings, properties, methods, and events from ISeriesDataItem (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **category** (`string`) — Category.
- **fill** (`Color`) — Fill color used for the slice and related elements, e.g. legend marker.
- **fillPattern** (`Pattern`) — Fill pattern used for the slice and related elements, e.g. legend marker. Click here for more info @since 5.10.0
- **intersections** (`Array`) — Array of categories that this data item is an intersection for.
- **label** (`Label`) — Slice label.
- **legendDataItem** (`DataItem`) — A related legend data item.
- **slice** (`Graphics`) — Slice visaul element.
