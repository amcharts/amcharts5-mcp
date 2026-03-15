---
title: "IForceDirectedDataItem"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iforcedirecteddataitem/"
scraped: "2026-03-15"
---

Inheritance
IForceDirectedDataItem extends ILinkedHierarchyDataItem.
IForceDirectedDataItem is not extended by any other symbol.
Properties


        category        
        #
      


                          Type string                      
Inherited from IHierarchyDataItem
Category.


        childData        
        #
      


                          Type Array                      
Inherited from IHierarchyDataItem
Raw data of the node's children.


        childLinks        
        #
      


                          Type Array                      
Inherited from ILinkedHierarchyDataItem
An array of HierarchyLink objects leading to child nodes.


        children        
        #
      


                          Type Array                      
An array of data items of child nodes.


        circle        
        #
      


                          Type Circle                      
Inherited from ILinkedHierarchyDataItem
Circle element of the related node.


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


        depth        
        #
      


                          Type number                      
Inherited from IHierarchyDataItem
Node's depth within the hierarchy.


        disabled        
        #
      


                          Type boolean                      
Inherited from IHierarchyDataItem
Indicates if node is currently disabled.


        fill        
        #
      


                          Type Color                      
Inherited from IHierarchyDataItem
Node's auto-assigned color.


        fillPattern        
        #
      


                          Type Pattern                      
Inherited from IHierarchyDataItem
Node's auto-assigned pattern.

## Inheritance

Extends: ILinkedHierarchyDataItem

> **Note:** This class also inherits all settings, properties, methods, and events from ILinkedHierarchyDataItem (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **children** (`Array`) — An array of data items of child nodes.
- **parent** (`DataItem`) — Data item of a parent node.
- **x** (`number | undefined`) — X coordinate.

