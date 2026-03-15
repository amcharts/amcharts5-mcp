---
title: "ICategoryDateAxisSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/icategorydateaxissettings/"
scraped: "2026-03-15"
---

Inheritance
ICategoryDateAxisSettings extends ICategoryAxisSettings.
ICategoryDateAxisSettings is not extended by any other symbol.
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

Extends: ICategoryAxisSettings

> **Note:** This class also inherits all settings, properties, methods, and events from ICategoryAxisSettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **baseInterval** (`ITimeInterval`) — Indicates granularity of data. Click here for more info
- **dateFormats** (`undefined | object`) — Date formats used for intermediate labels. Click here for more info
- **gridIntervals** (`Array`) — A list of intervals the axis is allowed to show grid/labels on. Click here for more info
- **markUnitChange** (`undefined | false | true`) — Default true Display "period change" labels using different format. If set to true, will use periodChangeDateFormats instead of dateFormats for such labels, e.g. for month start.
- **periodChangeDateFormats** (`undefined | object`) — Date formats used for "period change" labels. Click here for more info
- **tooltipDateFormat** (`undefined | string`) — A date format to use for axis tooltip. Click here for more info
