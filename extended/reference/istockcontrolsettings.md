---
title: "IStockControlSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/istockcontrolsettings/"
scraped: "2026-03-15"
---

Inheritance
IStockControlSettings extends IEntitySettings.
IStockControlSettings is extended by IColorControlSettings, IDrawingToolControlSettings, IDropdownListControlSettings, IDropdownControlSettings, IIconControlSettings, IDrawingControlSettings, IDateRangeSelectorSettings, IPeriodSelectorSettings, IResetControlSettings.
Properties


        active        
        #
      


                          Type undefined | false | true                      
Default false

Indicates if control is active.


        align        
        #
      


                          Type "left" | "right"                      
Default "left"

Alignment of the control in a toolbar.


        description        
        #
      


                          Type undefined | string                      
Description of what the button does.


        forceHidden        
        #
      


                          Type undefined | false | true                      
Force this control to always be invisible.
@since 5.8.5
@defaul false


        icon        
        #
      


                          Type HTMLElement | SVGElement | "none"                      
An element with control icon. If not set, each control will aytomatically create an icon.


        id        
        #
      


                          Type undefined | string                      
Inherited from IEntitySettings
A custom string ID for the element.
 If set, element can be looked up via root.entitiesById.
 Will raise error if an element with the same ID already exists.


        name        
        #
      


                          Type undefined | string                      
Name of the control. Used for the label.


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
Extended by: IColorControlSettings, IDrawingToolControlSettings, IDropdownListControlSettings, IDropdownControlSettings, IIconControlSettings, IDrawingControlSettings, IDateRangeSelectorSettings, IPeriodSelectorSettings, IResetControlSettings

> **Note:** This class also inherits all settings, properties, methods, and events from IEntitySettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **active** (`undefined | false | true`) — Default false Indicates if control is active.
- **align** (`"left" | "right"`) — Default "left" Alignment of the control in a toolbar.
- **description** (`undefined | string`) — Description of what the button does.
- **forceHidden** (`undefined | false | true`) — Force this control to always be invisible. @since 5.8.5 @defaul false
- **icon** (`HTMLElement | SVGElement | "none"`) — An element with control icon. If not set, each control will aytomatically create an icon.
- **name** (`undefined | string`) — Name of the control. Used for the label.
- **stockChart** (`StockChart`) — A StockChart the toolbar is for.
- **togglable** (`undefined | false | true`) — Default true If set to true, control can be toggle on and off by clicking on it.

