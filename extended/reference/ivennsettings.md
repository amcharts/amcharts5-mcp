---
title: "IVennSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ivennsettings/"
scraped: "2026-03-15"
---

Inheritance
IVennSettings extends ISeriesSettings.
IVennSettings is not extended by any other symbol.
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

Extends: ISeriesSettings

> **Note:** This class also inherits all settings, properties, methods, and events from ISeriesSettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **categoryField** (`undefined | string`) — A field in data that holds category names.
- **colors** (`ColorSet`) — A ColorSet to use when asigning colors for slices.
- **fillField** (`undefined | string`) — A field that holds color for slice fill.
- **intersectionsField** (`undefined | string`) — A field in data that holds array of categories that overlap.
- **patterns** (`PatternSet`) — A PatternSet to use when asigning patterns for slices. Click here for more info @since 5.10.0
