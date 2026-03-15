---
title: "IChartSerializerSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ichartserializersettings/"
scraped: "2026-03-15"
---

Inheritance
IChartSerializerSettings extends ISerializerSettings.
IChartSerializerSettings is not extended by any other symbol.
Properties


        excludeProperties        
        #
      


                          Type Array                      
Inherited from ISerializerSettings
An array of properties to not include in the serialized data.
@since 5.3.2


        excludeSettings        
        #
      


                          Type Array                      
Inherited from ISerializerSettings
An array of settings to not include in the serialized data.


        fullSettings        
        #
      


                          Type Array                      
Inherited from ISerializerSettings
Include full values of these settings.
@since 6.4.3


        functionsAs        
        #
      


                          Type "string" | "function"                      
Default "function"

Inherited from ISerializerSettings
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
Inherited from ISerializerSettings
Include adapters in the output.
@since 5.15.0


        includeProjection        
        #
      


                          Type undefined | false | true                      
Default false

Include projection settings in the output.
 If enabled, the projection function will be included in the output, according to the functionsAs setting.


        includeSettings        
        #
      


                          Type Array                      
Inherited from ISerializerSettings
An array of settings to include in the serialized data.


        includeStates        
        #
      


                          Type undefined | false | true                      
Default false
Inherited from ISerializerSettings
Include states in the output.
@since 5.15.0


        maxDepth        
        #
      


                          Type undefined | number                      
Default 2

Inherited from ISerializerSettings
Maximum depth of recursion when traversing target object.


        removeEmptyObjects        
        #
      


                          Type undefined | false | true                      
Default true

Remove empty objects from the output.


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

Extends: ISerializerSettings

> **Note:** This class also inherits all settings, properties, methods, and events from ISerializerSettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **includeProjection** (`undefined | false | true`) — Default false Include projection settings in the output. If enabled, the projection function will be included in the output, according to the functionsAs setting.
- **removeEmptyObjects** (`undefined | false | true`) — Default true Remove empty objects from the output.
