---
title: "IDataProcessorSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/idataprocessorsettings/"
scraped: "2026-03-15"
---

Inheritance
IDataProcessorSettings extends IEntitySettings.
IDataProcessorSettings is not extended by any other symbol.
Properties


        colorFields        
        #
      


                          Type string[]                      
A list of fields in data that need to be converted to Color objects.


        dateFields        
        #
      


                          Type string[]                      
A list of fields in data that need to be converted to tiemstamps.


        dateFormat        
        #
      


                          Type undefined | string                      
Date format used for parsing string-based dates.


        emptyAs        
        #
      


                          Type any                      
Replace empty values with this.


        id        
        #
      


                          Type undefined | string                      
Inherited from IEntitySettings
A custom string ID for the element.
 If set, element can be looked up via root.entitiesById.
 Will raise error if an element with the same ID already exists.


        numericFields        
        #
      


                          Type string[]                      
A list of fields in data that need to be converted to numbers.


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

> **Note:** This class also inherits all settings, properties, methods, and events from IEntitySettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **colorFields** (`string[]`) — A list of fields in data that need to be converted to Color objects.
- **dateFields** (`string[]`) — A list of fields in data that need to be converted to tiemstamps.
- **dateFormat** (`undefined | string`) — Date format used for parsing string-based dates.
- **emptyAs** (`any`) — Replace empty values with this.
- **numericFields** (`string[]`) — A list of fields in data that need to be converted to numbers.
