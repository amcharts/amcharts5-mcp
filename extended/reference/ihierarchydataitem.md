---
title: "IHierarchyDataItem"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ihierarchydataitem/"
scraped: "2026-03-15"
---

Inheritance
IHierarchyDataItem extends ISeriesDataItem.
IHierarchyDataItem is extended by ILinkedHierarchyDataItem, IPackDataItem, IPartitionDataItem, ITreemapDataItem, IVoronoiTreemapDataItem.
Properties


        category        
        #
      


                          Type string                      
Category.


        childData        
        #
      


                          Type Array                      
Raw data of the node's children.


        children        
        #
      


                          Type Array                      
List of child node data items.


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
Node's depth within the hierarchy.


        disabled        
        #
      


                          Type boolean                      
Indicates if node is currently disabled.


        fill        
        #
      


                          Type Color                      
Node's auto-assigned color.


        fillPattern        
        #
      


                          Type Pattern                      
Node's auto-assigned pattern.

## Inheritance

Extends: ISeriesDataItem
Extended by: ILinkedHierarchyDataItem, IPackDataItem, IPartitionDataItem, ITreemapDataItem, IVoronoiTreemapDataItem

> **Note:** This class also inherits all settings, properties, methods, and events from ISeriesDataItem (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **category** (`string`) — Category.
- **childData** (`Array`) — Raw data of the node's children.
- **children** (`Array`) — List of child node data items.
- **depth** (`number`) — Node's depth within the hierarchy.
- **disabled** (`boolean`) — Indicates if node is currently disabled.
- **fill** (`Color`) — Node's auto-assigned color.
- **fillPattern** (`Pattern`) — Node's auto-assigned pattern. Click here for more info @since 5.10.0
- **label** (`Label`) — A reference to node's Label.
- **node** (`HierarchyNode`) — A reference to the related HierarchyNode.
- **parent** (`DataItem`) — Data item of parent node.
- **sum** (`number`) — Sum of child values.
- **value** (`number`) — Value of the node as set in data.
- **valuePercent** (`number`) — Percent value of the node, based on the value of its direct parent. @since 5.2.21
- **valuePercentTotal** (`number`) — Percent value of the node, based on total sum of all nodes in upper level.
