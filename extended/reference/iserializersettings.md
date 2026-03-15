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
- **functionsAs** (`"string" | "function"`) — Default "function" Serialize functions as strings or functions.
- **includeAdapters** (`undefined | false | true`) — Default false Include adapters in the output. @since 5.15.0
- **includeSettings** (`Array`) — An array of settings to include in the serialized data.
- **includeStates** (`undefined | false | true`) — Default false Include states in the output. @since 5.15.0
- **maxDepth** (`undefined | number`) — Default 2 Maximum depth of recursion when traversing target object.
