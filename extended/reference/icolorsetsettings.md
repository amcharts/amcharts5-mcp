---
title: "IColorSetSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/icolorsetsettings/"
scraped: "2026-03-15"
---

Inheritance
IColorSetSettings extends IEntitySettings.
IColorSetSettings is not extended by any other symbol.
Properties


        baseColor        
        #
      


                          Type Color                      
A base color to generate new colors from if colors is not specified.


        colors        
        #
      


                          Type Color[]                      
List of colors in the set.


        id        
        #
      


                          Type undefined | string                      
Inherited from IEntitySettings
A custom string ID for the element.
 If set, element can be looked up via root.entitiesById.
 Will raise error if an element with the same ID already exists.


        passOptions        
        #
      


                          Type IColorSetStepOptions                      
A set of tranformation to apply to base list of colors when the set runs out of colors and generates additional ones.


        reuse        
        #
      


                          Type undefined | false | true                      
Default false

If set to true, color set will reuse existing colors from the list inestead of generating new ones.


        saturation        
        #
      


                          Type undefined | number                      
If set, each returned color will be applied saturation.


        startIndex        
        #
      


                          Type undefined | number                      
Start iterating colors from specific index.


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


        step        
        #
      


                          Type undefined | number                      
Default 1

A step size when using next().
 E.g. setting to 2 will make it return every second color in the list.


        themeTags        
        #
      


                          Type Array                      
Inherited from IEntitySettings
Tags which can be used by the theme rules.

## Inheritance

Extends: IEntitySettings

> **Note:** This class also inherits all settings, properties, methods, and events from IEntitySettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **baseColor** (`Color`) — A base color to generate new colors from if colors is not specified.
- **colors** (`Color[]`) — List of colors in the set.
- **passOptions** (`IColorSetStepOptions`) — A set of tranformation to apply to base list of colors when the set runs out of colors and generates additional ones.
- **reuse** (`undefined | false | true`) — Default false If set to true, color set will reuse existing colors from the list inestead of generating new ones.
- **saturation** (`undefined | number`) — If set, each returned color will be applied saturation.
- **startIndex** (`undefined | number`) — Start iterating colors from specific index.
- **step** (`undefined | number`) — Default 1 A step size when using next(). E.g. setting to 2 will make it return every second color in the list.
