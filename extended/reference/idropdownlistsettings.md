---
title: "IDropdownListSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/idropdownlistsettings/"
scraped: "2026-03-15"
---

Inheritance
IDropdownListSettings extends IDropdownSettings.
IDropdownListSettings is not extended by any other symbol.
Properties


        control        
        #
      


                          Type StockControl                      
Inherited from IDropdownSettings


        exclude        
        #
      


                          Type string[]                      
An array of item IDs to now show in the list.
@since 5.7.0


        id        
        #
      


                          Type undefined | string                      
Inherited from IEntitySettings
A custom string ID for the element.
 If set, element can be looked up via root.entitiesById.
 Will raise error if an element with the same ID already exists.


        items        
        #
      


                          Type IDropdownListItem[]                      
A list of items in the dropdown.


        maxSearchItems        
        #
      


                          Type undefined | number                      
Maximum search items to show.


        parent        
        #
      


                          Type HTMLElement                      
Inherited from IDropdownSettings


        scrollable        
        #
      


                          Type undefined | false | true                      
Inherited from IDropdownSettings


        searchCallback        
        #
      


                          Type undefined | ( query: string) => Promise                      
A callback function which returns a list of items based on a search query.


        searchable        
        #
      


                          Type undefined | false | true                      
Is the list searchable? If true shows search field and calls searchCallback function for a list of items.


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

Extends: IDropdownSettings

> **Note:** This class also inherits all settings, properties, methods, and events from IDropdownSettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **exclude** (`string[]`) — An array of item IDs to now show in the list. @since 5.7.0
- **items** (`IDropdownListItem[]`) — A list of items in the dropdown.
- **maxSearchItems** (`undefined | number`) — Maximum search items to show.
- **searchCallback** (`undefined | ( query: string) => Promise`) — A callback function which returns a list of items based on a search query.
- **searchable** (`undefined | false | true`) — Is the list searchable? If true shows search field and calls searchCallback function for a list of items.
