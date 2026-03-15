---
title: "ILayoutSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ilayoutsettings/"
scraped: "2026-03-15"
---

Inheritance
ILayoutSettings extends IEntitySettings.
ILayoutSettings is extended by IGridLayoutSettings.
Properties


        id        
        #
      


                          Type undefined | string                      
Inherited from IEntitySettings
A custom string ID for the element.
 If set, element can be looked up via root.entitiesById.
 Will raise error if an element with the same ID already exists.


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

Extends: IEntitySettings
Extended by: IGridLayoutSettings

> **Note:** This class also inherits all settings, properties, methods, and events from IEntitySettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.
