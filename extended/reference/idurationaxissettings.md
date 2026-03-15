---
title: "IDurationAxisSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/idurationaxissettings/"
scraped: "2026-03-15"
---

Inheritance
IDurationAxisSettings extends IValueAxisSettings.
IDurationAxisSettings is not extended by any other symbol.
Properties


        active        
        #
      


                          Type undefined | false | true                      
Inherited from ISpriteSettings
Indicates if element is currently active.


        ariaChecked        
        #
      


                          Type undefined | false | true                      
Inherited from ISpriteSettings
aria-checked setting.
 This setting is ignored unless role is one of the following:

"checkbox"

"option"

"radio"

"menuitemcheckbox"

"menuitemradio"

"treeitem"


        ariaControls        
        #
      


                          Type undefined | string                      
Inherited from ISpriteSettings
aria-controls setting.


        ariaCurrent        
        #
      


                          Type undefined | string                      
Inherited from ISpriteSettings
aria-current setting.

## Inheritance

Extends: IValueAxisSettings

> **Note:** This class also inherits all settings, properties, methods, and events from IValueAxisSettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **baseUnit** (`TimeUnit`) — Default "second" A base unit (granularity) of data. Used to indicate what are the base units of your data. Available options: "millisecond", "second" (default), "minute", "hour", "day", "week", "month", and "year". Click here for more info
