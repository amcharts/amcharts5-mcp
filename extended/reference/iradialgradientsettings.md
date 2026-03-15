---
title: "IRadialGradientSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iradialgradientsettings/"
scraped: "2026-03-15"
---

Inheritance
IRadialGradientSettings extends IGradientSettings.
IRadialGradientSettings is not extended by any other symbol.
Properties


        id        
        #
      


                          Type undefined | string                      
Inherited from IEntitySettings
A custom string ID for the element.
 If set, element can be looked up via root.entitiesById.
 Will raise error if an element with the same ID already exists.


        radius        
        #
      


                          Type number | Percent                      
Gradient radius in pixels or percent (relative to the target).


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


        stops        
        #
      


                          Type Array                      
Inherited from IGradientSettings
A list of color steps for the gradient.

## Inheritance

Extends: IGradientSettings

> **Note:** This class also inherits all settings, properties, methods, and events from IGradientSettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **radius** (`number | Percent`) — Gradient radius in pixels or percent (relative to the target).
- **x** (`number | Percent`) — X position.

