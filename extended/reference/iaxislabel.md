---
title: "IAxisLabel"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iaxislabel/"
scraped: "2026-03-15"
---

Inheritance
IAxisLabel extends Label.
IAxisLabel is not extended by any other symbol.
Properties


        adapters        
        #
      


                          Type Adapters                      
Default new Adapters(this)
Inherited from Entity


        children        
        #
      


                          Type Children                      
Default new Children(this)
Inherited from Container
List of Container's child elements.


        className        
        #
      

Static

                          Type string                      
Default "Label"
Inherited from Label


        classNames        
        #
      

Static

                          Type Array                      
Default "IAxisLabel", "Label", "Container", "Sprite", "Entity"
Inherited from Label


        dataItem        
        #
      


                          Type DataItem | undefined                      
Inherited from Sprite
A DataItem used for this element.
 NOTE: data item is being assigned automatically in most cases where it matters. Use this accessor to set data item only if you know what you're doing.


        enableDispose        
        #
      


                          Type boolean                      
Default true
Inherited from Settings
If this is set to false then disposing does nothing, it's a no-op.


        events        
        #
      


                          Type SpriteEventDispatcher                      
Inherited from Sprite


        inside        
        #
      


                          Type boolean | undefined                      
Default false

If set to true the label will be shown inside plot area.


        location        
        #
      


                          Type undefined | number                      
Relative location of the label within the cell.
 0 - beginning, 0.5 - middle, 1 - end.

## Inheritance

Extends: Label

> **Note:** This class also inherits all settings, properties, methods, and events from Label (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **inside** (`boolean | undefined`) — Default false If set to true the label will be shown inside plot area.
- **location** (`undefined | number`) — Relative location of the label within the cell. 0 - beginning, 0.5 - middle, 1 - end. Click here for more info
- **maxPosition** (`undefined | number`) — Default 0 The maximum relative position within visible axis scope the label can appear on. E.g. 0.9 will mean that label will not be shown if it's closer to the end of the axis than 10%.
- **minPosition** (`undefined | number`) — Default 0 The minimum relative position within visible axis scope the label can appear on. E.g. 0.1 will mean that label will not be shown if it's closer to the beginning of the axis than 10%.
- **multiLocation** (`undefined | number`) — Relative location of the label within the cell when it spans multiple intervals. 0 - beginning, 0.5 - middle, 1 - end. Click here for more info
