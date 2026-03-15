---
title: "IFlowNodesDataItem"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iflownodesdataitem/"
scraped: "2026-03-15"
---

Inheritance
IFlowNodesDataItem extends ISeriesDataItem.
IFlowNodesDataItem is extended by IArcDiagramNodesDataItem, IChordNodesDataItem, ISankeyNodesDataItem.
Properties


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
Depth of the node.


        fill        
        #
      


                          Type Color                      
Node color.


        fillPattern        
        #
      


                          Type Pattern                      
Node pattern.

## Inheritance

Extends: ISeriesDataItem
Extended by: IArcDiagramNodesDataItem, IChordNodesDataItem, ISankeyNodesDataItem

> **Note:** This class also inherits all settings, properties, methods, and events from ISeriesDataItem (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **depth** (`number`) — Depth of the node.
- **fill** (`Color`) — Node color.
- **fillPattern** (`Pattern`) — Node pattern. Click here for more info @since 5.10.0
- **incomingLinks** (`Array`) — A list of incoming link data items.
- **label** (`Label`) — Node label.
- **name** (`string`) — Node name.
- **node** (`FlowNode`) — An associated node instance.
- **outgoingLinks** (`Array`) — A list of outgoing link data items.
- **sum** (`number`) — Sum of values of all links: incoming and outgoing.
- **sumIncoming** (`number`) — Sum of values of all incoming links.
- **sumOutgoing** (`number`) — Sum of values of all outgoing links.
- **unknown** (`boolean`) — Indicates "unknown" node.
