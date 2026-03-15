---
title: "IGridLayoutSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/igridlayoutsettings/"
scraped: "2026-03-15"
---

Inheritance
IGridLayoutSettings extends ILayoutSettings.
IGridLayoutSettings is not extended by any other symbol.
Properties


        fixedWidthGrid        
        #
      


                          Type undefined | false | true                      
Default false

If set to true all columns in the grid will be equal width.


        id        
        #
      


                          Type undefined | string                      
Inherited from IEntitySettings
A custom string ID for the element.
 If set, element can be looked up via root.entitiesById.
 Will raise error if an element with the same ID already exists.


        maxColumns        
        #
      


                          Type undefined | number                      
Maximum number of columns in the grid.


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

Extends: ILayoutSettings

> **Note:** This class also inherits all settings, properties, methods, and events from ILayoutSettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **fixedWidthGrid** (`undefined | false | true`) — Default false If set to true all columns in the grid will be equal width.
- **maxColumns** (`undefined | number`) — Maximum number of columns in the grid.
