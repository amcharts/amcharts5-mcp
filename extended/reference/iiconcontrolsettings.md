---
title: "IIconControlSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iiconcontrolsettings/"
scraped: "2026-03-15"
---

Inheritance
IIconControlSettings extends IStockControlSettings.
IIconControlSettings is not extended by any other symbol.
Properties


        active        
        #
      


                          Type undefined | false | true                      
Default false

Inherited from IStockControlSettings
Indicates if control is active.


        align        
        #
      


                          Type "left" | "right"                      
Default "left"

Inherited from IStockControlSettings
Alignment of the control in a toolbar.


        description        
        #
      


                          Type undefined | string                      
Inherited from IStockControlSettings
Description of what the button does.


        forceHidden        
        #
      


                          Type undefined | false | true                      
Inherited from IStockControlSettings
Force this control to always be invisible.
@since 5.8.5
@defaul false


        icon        
        #
      


                          Type HTMLElement | SVGElement | "none"                      
Inherited from IStockControlSettings
An element with control icon. If not set, each control will aytomatically create an icon.


        icons        
        #
      


                          Type IIcon[]                      


        id        
        #
      


                          Type undefined | string                      
Inherited from IEntitySettings
A custom string ID for the element.
 If set, element can be looked up via root.entitiesById.
 Will raise error if an element with the same ID already exists.


        name        
        #
      


                          Type undefined | string                      
Inherited from IStockControlSettings
Name of the control. Used for the label.


        stateAnimationDuration        
        #
      


                          Type undefined | number                      
Inherited from IEntitySettings
Duration of transition from one state to another.


        stateAnimationEasing        
        #
      


                          Type $ease.Easing                      
Inherited from IEntitySettings
Easing of transition from one state to another.


        stockChart        
        #
      


                          Type StockChart                      
Inherited from IStockControlSettings
A StockChart the toolbar is for.


        themeTags        
        #
      


                          Type Array                      
Inherited from IEntitySettings
Tags which can be used by the theme rules.

## Inheritance

Extends: IStockControlSettings

> **Note:** This class also inherits all settings, properties, methods, and events from IStockControlSettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **icons** (`IIcon[]`) — (no description)
