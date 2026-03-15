---
title: "IStockToolbarSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/istocktoolbarsettings/"
scraped: "2026-03-15"
---

Inheritance
IStockToolbarSettings extends IEntitySettings.
IStockToolbarSettings is not extended by any other symbol.
Properties


        container        
        #
      


                          Type HTMLElement                      
A reference to an element in the document to place tools in.


        controls        
        #
      


                          Type StockControl[]                      
A list of tools to show in toolbar.


        deactivateRoot        
        #
      


                          Type undefined | false | true                      
Default true

Menu will disable all interactions for the underlying chart when using tools.


        focusable        
        #
      


                          Type undefined | false | true                      
Default false

Setting this to true will essentially enable accessibility for the toolbar items.
 E.g. buttons will be focusable using TAB key. Lists navigable using arrow keys, etc.


        id        
        #
      


                          Type undefined | string                      
Inherited from IEntitySettings
A custom string ID for the element.
 If set, element can be looked up via root.entitiesById.
 Will raise error if an element with the same ID already exists.


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
A StockChart the toolbar is for.


        themeTags        
        #
      


                          Type Array                      
Inherited from IEntitySettings
Tags which can be used by the theme rules.

## Inheritance

Extends: IEntitySettings

> **Note:** This class also inherits all settings, properties, methods, and events from IEntitySettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **container** (`HTMLElement`) — A reference to an element in the document to place tools in.
- **controls** (`StockControl[]`) — A list of tools to show in toolbar.
- **deactivateRoot** (`undefined | false | true`) — Default true Menu will disable all interactions for the underlying chart when using tools.
- **focusable** (`undefined | false | true`) — Default false Setting this to true will essentially enable accessibility for the toolbar items. E.g. buttons will be focusable using TAB key. Lists navigable using arrow keys, etc.
- **stockChart** (`StockChart`) — A StockChart the toolbar is for.
- **useDefaultCSS** (`undefined | false | true`) — Default true If set to false the toolbar will not load default CSS.
