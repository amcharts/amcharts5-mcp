---
title: "IGradientSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/igradientsettings/"
scraped: "2026-03-15"
---

Inheritance
IGradientSettings extends IEntitySettings.
IGradientSettings is extended by ILinearGradientSettings, IRadialGradientSettings.
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


        stops        
        #
      


                          Type Array                      
A list of color steps for the gradient.

## Inheritance

Extends: IEntitySettings
Extended by: ILinearGradientSettings, IRadialGradientSettings

> **Note:** This class also inherits all settings, properties, methods, and events from IEntitySettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **stops** (`Array`) — A list of color steps for the gradient. Click here for more info
- **target** (`Sprite`) — Gradient target.
