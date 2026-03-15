---
title: "ILinkedHierarchyDataItem"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ilinkedhierarchydataitem/"
scraped: "2026-03-15"
---

Inheritance
ILinkedHierarchyDataItem extends IHierarchyDataItem.
ILinkedHierarchyDataItem is extended by IForceDirectedDataItem, ITreeDataItem.
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
An array of HierarchyLink objects leading to child nodes.


        children        
        #
      


                          Type Array                      
An array of child data items.


        circle        
        #
      


                          Type Circle                      
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

Extends: IHierarchyDataItem
Extended by: IForceDirectedDataItem, ITreeDataItem

> **Note:** This class also inherits all settings, properties, methods, and events from IHierarchyDataItem (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **childLinks** (`Array`) — An array of HierarchyLink objects leading to child nodes.
- **children** (`Array`) — An array of child data items.
- **circle** (`Circle`) — Circle element of the related node.
- **linkWith** (`Array`) — An array of IDs of directly linked nodes.
- **links** (`Array`) — An HierarchyLink leading to parent node.
- **node** (`LinkedHierarchyNode`) — A related node.
- **outerCircle** (`Circle`) — Circle element of the related node, representing outer circle.
- **parent** (`DataItem`) — A data item of a parent node.
- **parentLink** (`HierarchyLink`) — A HierarchyLink leading to parent node.
