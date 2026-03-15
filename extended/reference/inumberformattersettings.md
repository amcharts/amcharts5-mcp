---
title: "INumberFormatterSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/inumberformattersettings/"
scraped: "2026-03-15"
---

Inheritance
INumberFormatterSettings extends IEntitySettings.
INumberFormatterSettings is not extended by any other symbol.
Properties


        bigNumberPrefixes        
        #
      


                          Type INumberSuffix[]                      
Prefixes and thresholds to group big numbers into, e.g. 1M.
 Used in conjunction with a modifier of the number format.


        bytePrefixes        
        #
      


                          Type INumberSuffix[]                      
Prefixes to and thresholds to use when grouping data size numbers, e.g. 1MB.
 Used in conjunction with b modifier of the number format.


        forceLTR        
        #
      


                          Type undefined | false | true                      
Default false
If set to true will force the number string to be LTR, even if RTL is enabled.
@since 5.3.13


        id        
        #
      


                          Type undefined | string                      
Inherited from IEntitySettings
A custom string ID for the element.
 If set, element can be looked up via root.entitiesById.
 Will raise error if an element with the same ID already exists.


        intlLocales        
        #
      


                          Type undefined | string                      
Locales if you are using date formats in Intl.NumberFormatOptions syntax.
@see (@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat) about using Intl for number formatting
@param Locales


        negativeBase        
        #
      


                          Type undefined | number                      
Default 0

A threshold value for negative numbers.


        numberFormat        
        #
      


                          Type string | NumberFormatOptions                      
Default "#,###.#####"

Number format to be used when formatting numbers.


        numericFields        
        #
      


                          Type string[]                      
Indicates which fields in data should be considered numeric.
 It is used when formatting data placeholder values.


        smallNumberPrefixes        
        #
      


                          Type INumberSuffix[]                      
Prefixes and thresholds to group small numbers into, e.g. 1m.
 Used in conjunction with a modifier of the number format.


        smallNumberThreshold        
        #
      


                          Type undefined | number                      
Default 1

All numbers below this value are considered small.


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

- **bigNumberPrefixes** (`INumberSuffix[]`) — Prefixes and thresholds to group big numbers into, e.g. 1M. Used in conjunction with a modifier of the number format.
- **bytePrefixes** (`INumberSuffix[]`) — Prefixes to and thresholds to use when grouping data size numbers, e.g. 1MB. Used in conjunction with b modifier of the number format.
- **forceLTR** (`undefined | false | true`) — Default false If set to true will force the number string to be LTR, even if RTL is enabled. @since 5.3.13
- **intlLocales** (`undefined | string`) — Locales if you are using date formats in Intl.NumberFormatOptions syntax. @see (@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat) about using Intl for number formatting @param Locales
- **negativeBase** (`undefined | number`) — Default 0 A threshold value for negative numbers.
- **numberFormat** (`string | NumberFormatOptions`) — Default "#,###.#####" Number format to be used when formatting numbers.
- **numericFields** (`string[]`) — Indicates which fields in data should be considered numeric. It is used when formatting data placeholder values.
- **smallNumberPrefixes** (`INumberSuffix[]`) — Prefixes and thresholds to group small numbers into, e.g. 1m. Used in conjunction with a modifier of the number format.
- **smallNumberThreshold** (`undefined | number`) — Default 1 All numbers below this value are considered small.
