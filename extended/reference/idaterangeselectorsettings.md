---
title: "IDateRangeSelectorSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/idaterangeselectorsettings/"
scraped: "2026-03-15"
---

Inheritance
IDateRangeSelectorSettings extends IStockControlSettings.
IDateRangeSelectorSettings is not extended by any other symbol.
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


        allowInput        
        #
      


                          Type undefined | false | true                      
Default true
If set to false, typing into date fields will be disabled. Instead, user will be able to select a day using arrow keys.
@since 5.12.3


        dateFormat        
        #
      


                          Type undefined | string                      
Date format to use for date input fields.
 Will use global date format if not set.


        description        
        #
      


                          Type undefined | string                      
Inherited from IStockControlSettings
Description of what the button does.


        disableWeekDays        
        #
      


                          Type number[]                      
Default []
Set to array of days to disable in date picker dropdowns, with Sunday starting at 0, Monday - 1, etc.
@since 5.11.1


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


        maxDate        
        #
      


                          Type Date | "auto" | null                      
Default "auto"
Maximum date to allow for selection.
 Accepts either a Date object or "auto" (latest date available in chart).
@since 5.3.7


        minDate        
        #
      


                          Type Date | "auto" | null                      
Default "auto"
Minimum date to allow for selection.
 Accepts either a Date object or "auto" (smallest date available in chart).
@since 5.3.7


        name        
        #
      


                          Type undefined | string                      
Inherited from IStockControlSettings
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
Inherited from IStockControlSettings
A StockChart the toolbar is for.


        themeTags        
        #
      


                          Type Array                      
Inherited from IEntitySettings
Tags which can be used by the theme rules.

## Inheritance

Extends: IStockControlSettings

> **Note:** This class also inherits all settings, properties, methods, and events from IStockControlSettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **allowInput** (`undefined | false | true`) — Default true If set to false, typing into date fields will be disabled. Instead, user will be able to select a day using arrow keys. @since 5.12.3
- **dateFormat** (`undefined | string`) — Date format to use for date input fields. Will use global date format if not set.
- **disableWeekDays** (`number[]`) — Default [] Set to array of days to disable in date picker dropdowns, with Sunday starting at 0, Monday - 1, etc. @since 5.11.1
- **maxDate** (`Date | "auto" | null`) — Default "auto" Maximum date to allow for selection. Accepts either a Date object or "auto" (latest date available in chart). @since 5.3.7
- **minDate** (`Date | "auto" | null`) — Default "auto" Minimum date to allow for selection. Accepts either a Date object or "auto" (smallest date available in chart). @since 5.3.7
- **useDefaultCSS** (`undefined | false | true`) — Default true If set to false the control will not load default CSS for Flatpickr component. This would mean it would be unstyled, and would require custom CSS present on the page. @since 5.2.4
