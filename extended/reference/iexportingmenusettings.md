---
title: "IExportingMenuSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iexportingmenusettings/"
scraped: "2026-03-15"
---

Inheritance
IExportingMenuSettings extends IEntitySettings.
IExportingMenuSettings is not extended by any other symbol.
Properties


        align        
        #
      


                          Type "left" | "right"                      
Default "right"

Horizontal alignment of the menu.


        ariaLabel        
        #
      


                          Type undefined | string                      
ARIA label for the menu.
@since 5.14.4


        autoClose        
        #
      


                          Type undefined | false | true                      
Default true

If set to true the menu will close automatically when export operation is initiated.


        container        
        #
      


                          Type HTMLElement                      
A reference to an element in the document to place export menu in.
 If not set, will use root element's container.


        deactivateRoot        
        #
      


                          Type undefined | false | true                      
Default true

Menu will disable all interactions for the underlying chart when browsing the menu.


        exporting        
        #
      


                          Type Exporting                      
A reference to related Exporting object.


        id        
        #
      


                          Type undefined | string                      
Inherited from IEntitySettings
A custom string ID for the element.
 If set, element can be looked up via root.entitiesById.
 Will raise error if an element with the same ID already exists.


        items        
        #
      


                          Type IExportingMenuItem[]                      
A list of menu items.


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

- **align** (`"left" | "right"`) — Default "right" Horizontal alignment of the menu.
- **ariaLabel** (`undefined | string`) — ARIA label for the menu. @since 5.14.4
- **autoClose** (`undefined | false | true`) — Default true If set to true the menu will close automatically when export operation is initiated.
- **container** (`HTMLElement`) — A reference to an element in the document to place export menu in. If not set, will use root element's container.
- **deactivateRoot** (`undefined | false | true`) — Default true Menu will disable all interactions for the underlying chart when browsing the menu.
- **exporting** (`Exporting`) — A reference to related Exporting object.
- **items** (`IExportingMenuItem[]`) — A list of menu items.
- **useDefaultCSS** (`undefined | false | true`) — Default true If set to false the legend will not load default CSS.

