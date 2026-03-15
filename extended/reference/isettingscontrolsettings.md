---
title: "ISettingsControlSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/isettingscontrolsettings/"
scraped: "2026-03-15"
---

Inheritance
ISettingsControlSettings extends IDropdownListControlSettings.
ISettingsControlSettings is not extended by any other symbol.
Properties


        active        
        #
      


                          Type undefined | false | true                      
Default false

Inherited from IStockControlSettings
Indicates if control is active.


        align        
        #
      


                          Type "left" | "right"                      
Default "left"

Inherited from IStockControlSettings
Alignment of the control in a toolbar.


        autoSave        
        #
      


                          Type undefined | false | true                      
Default false

If set to true, all changes to chart's drawings and indicators will be automatically saved to browser local storage and restored on next load.
@since 5.4.3


        currentItem        
        #
      


                          Type string | IDropdownListItem                      
Inherited from IDropdownListControlSettings
Currently selected item.


        description        
        #
      


                          Type undefined | string                      
Inherited from IStockControlSettings
Description of what the button does.


        exclude        
        #
      


                          Type string[]                      
Inherited from IDropdownListControlSettings
An array of item IDs to now show in the list.
@since 5.7.0


        fixedLabel        
        #
      


                          Type undefined | false | true                      
Inherited from IDropdownListControlSettings
Label does not change when item is selected in the list.


        forceHidden        
        #
      


                          Type undefined | false | true                      
Inherited from IStockControlSettings
Force this control to always be invisible.
@since 5.8.5
@defaul false


        icon        
        #
      


                          Type HTMLElement | SVGElement | "none"                      
Inherited from IStockControlSettings
An element with control icon. If not set, each control will aytomatically create an icon.


        id        
        #
      


                          Type undefined | string                      
Inherited from IEntitySettings
A custom string ID for the element.
 If set, element can be looked up via root.entitiesById.
 Will raise error if an element with the same ID already exists.


        items        
        #
      


                          Type Array                      
Inherited from IDropdownListControlSettings
A list of items in the dropdown.


        maxSearchItems        
        #
      


                          Type undefined | number                      
Inherited from IDropdownListControlSettings
Maximum search items to show.


        name        
        #
      


                          Type undefined | string                      
Inherited from IStockControlSettings
Name of the control. Used for the label.


        scrollable        
        #
      


                          Type undefined | false | true                      
Inherited from IDropdownListControlSettings
If set to true, the dropdown will fix the height to fit within chart's area, with scroll if the contents do not fit.


        searchCallback        
        #
      


                          Type undefined | ( query: string) => IDropdownListItem[]                      
Inherited from IDropdownListControlSettings
A callback function which returns a list of items based on a search query.


        searchable        
        #
      


                          Type undefined | false | true                      
Inherited from IDropdownListControlSettings
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


        stockChart        
        #
      


                          Type StockChart                      
Inherited from IStockControlSettings
A StockChart the toolbar is for.


        storageId        
        #
      


                          Type undefined | string                      
A unique indentifier for local storage.
 Will try to use chart's container ID if not set.
 Consider setting it if you have multipl StockChart on the same page.
@since 5.4.3


        themeTags        
        #
      


                          Type Array                      
Inherited from IEntitySettings
Tags which can be used by the theme rules.

## Inheritance

Extends: IDropdownListControlSettings

> **Note:** This class also inherits all settings, properties, methods, and events from IDropdownListControlSettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **autoSave** (`undefined | false | true`) — Default false If set to true, all changes to chart's drawings and indicators will be automatically saved to browser local storage and restored on next load. @since 5.4.3
- **storageId** (`undefined | string`) — A unique indentifier for local storage. Will try to use chart's container ID if not set. Consider setting it if you have multipl StockChart on the same page. @since 5.4.3
