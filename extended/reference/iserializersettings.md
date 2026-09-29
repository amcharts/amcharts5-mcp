---
title: "ISerializerSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iserializersettings/"
scraped: "2026-03-15"
---

Inheritance
ISerializerSettings extends IEntitySettings.
ISerializerSettings is extended by IChartSerializerSettings.
Properties


        excludeProperties        
        #
      


                          Type Array                      
An array of properties to not include in the serialized data.
@since 5.3.2


        excludeSettings        
        #
      


                          Type Array                      
An array of settings to not include in the serialized data.


        fullSettings        
        #
      


                          Type Array                      
Include full values of these settings.
@since 6.4.3


        functionsAs        
        #
      


                          Type "string" | "function"                      
Default "function"

Serialize functions as strings or functions.


        id        
        #
      


                          Type undefined | string                      
Inherited from IEntitySettings
A custom string ID for the element.
 If set, element can be looked up via root.entitiesById.
 Will raise error if an element with the same ID already exists.


        includeAdapters        
        #
      


                          Type undefined | false | true                      
Default false
Include adapters in the output.
@since 5.15.0


        includeSettings        
        #
      


                          Type Array                      
An array of settings to include in the serialized data.


        includeStates        
        #
      


                          Type undefined | false | true                      
Default false
Include states in the output.
@since 5.15.0


        maxDepth        
        #
      


                          Type undefined | number                      
Default 2

Maximum depth of recursion when traversing target object.


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
Extended by: IChartSerializerSettings

> **Note:** This class also inherits all settings, properties, methods, and events from IEntitySettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **excludeProperties** (`Array`) — An array of properties to not include in the serialized data. @since 5.3.2
- **excludeSettings** (`Array`) — An array of settings to not include in the serialized data.
- **fullSettings** (`Array`) — Include full values of these settings. @since 6.4.3
- **functionsAs** (`"string" | "function"`) — Default "string" Serialize functions as strings or functions. (`ChartSerializer` sets it to "function".)
- **includeAdapters** (`undefined | false | true`) — Default false Include adapters in the output. @since 5.15.0
- **includeSettings** (`Array`) — An array of settings to include in the serialized data.
- **includeStates** (`undefined | false | true`) — Default false Include states in the output. @since 5.15.0
- **maxDepth** (`undefined | number`) — Default 2 Maximum depth of recursion when traversing target object.
- **runningAnimations** (`undefined | false | true`) — Default true Write an animation started in code that loops for ever - a globe that keeps turning, a marker that keeps pulsing - into the `animations` setting, so the saved chart plays it too. Animations that end (`appear()`, state changes, zooming) are never written, and neither is one whose easing is a function of its own rather than one of amCharts' easings. Such an animation (`loops: Infinity` with a named easing) is written as an `animations` entry `{ key, from, to, duration, loops: 0, easing?, ease?, yoyo? }` (see IDeclaredAnimation), and the setting it animates is left out of the saved settings. Also never written: easings made with `am5.ease.pow`, and easings `am5.ease.easingInfo()` cannot name (e.g. `am5.ease.out(am5.ease.yoyo(x))`); in 5.20.8, an endless animation started in code on a data item (e.g. `dataItem.animate({ key: "positionOnLine", loops: Infinity, ... })`) is not written either. Also applies to ChartSerializer. @since 5.20.8 (typings say 5.21.0)
