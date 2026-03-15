---
title: "IDropdownColorsSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/idropdowncolorssettings/"
scraped: "2026-03-15"
---

Inheritance
IDropdownColorsSettings extends IDropdownSettings.
IDropdownColorsSettings is not extended by any other symbol.
Properties


        colors        
        #
      


                          Type ColorSet                      


        control        
        #
      


                          Type StockControl                      
Inherited from IDropdownSettings


        id        
        #
      


                          Type undefined | string                      
Inherited from IEntitySettings
A custom string ID for the element.
 If set, element can be looked up via root.entitiesById.
 Will raise error if an element with the same ID already exists.


        parent        
        #
      


                          Type HTMLElement                      
Inherited from IDropdownSettings


        scrollable        
        #
      


                          Type undefined | false | true                      
Inherited from IDropdownSettings


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


        themeTags        
        #
      


                          Type Array                      
Inherited from IEntitySettings
Tags which can be used by the theme rules.

## Inheritance

Extends: IDropdownSettings

> **Note:** This class also inherits all settings, properties, methods, and events from IDropdownSettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **colors** (`ColorSet`) — (no description)
- **useOpacity** (`undefined | false | true`) — (no description)
