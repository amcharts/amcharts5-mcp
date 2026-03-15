---
title: "ISettingsModalSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/isettingsmodalsettings/"
scraped: "2026-03-15"
---

Inheritance
ISettingsModalSettings extends IModalSettings.
ISettingsModalSettings is not extended by any other symbol.
Properties


        content        
        #
      


                          Type undefined | string                      
Inherited from IModalSettings
HTML content of the modal.


        deactivateRoot        
        #
      


                          Type undefined | false | true                      
Default true
Inherited from IModalSettings
When modal is open, all interactions for the underlying chart will be disabled.
@since 5.2.11


        id        
        #
      


                          Type undefined | string                      
Inherited from IEntitySettings
A custom string ID for the element.
 If set, element can be looked up via root.entitiesById.
 Will raise error if an element with the same ID already exists.


        showResetLink        
        #
      


                          Type undefined | false | true                      
Default true
Show the "Reset to default" link?
@since 5.9.0


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


        stockChart        
        #
      


                          Type StockChart                      
A target StockChart.


        strokeWidths        
        #
      


                          Type number[]                      
Default [1,
 2,
 4,
 10]
Available line widths for user to choose from.
@since 5.11.2


        themeTags        
        #
      


                          Type Array                      
Inherited from IEntitySettings
Tags which can be used by the theme rules.

## Inheritance

Extends: IModalSettings

> **Note:** This class also inherits all settings, properties, methods, and events from IModalSettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **showResetLink** (`undefined | false | true`) — Default true Show the "Reset to default" link? @since 5.9.0
- **stockChart** (`StockChart`) — A target StockChart.
- **strokeWidths** (`number[]`) — Default [1, 2, 4, 10] Available line widths for user to choose from. @since 5.11.2
