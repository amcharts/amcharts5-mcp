---
title: "ICategoryAxisSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/icategoryaxissettings/"
scraped: "2026-03-15"
---

Inheritance
ICategoryAxisSettings extends IAxisSettings.
ICategoryAxisSettings is extended by IGanttCategoryAxisSettings, ICategoryDateAxisSettings.
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

Extends: IAxisSettings
Extended by: IGanttCategoryAxisSettings, ICategoryDateAxisSettings

> **Note:** This class also inherits all settings, properties, methods, and events from IAxisSettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **categoryField** (`string`) — A field in data which holds categories.
- **cellSizeField** (`undefined | string`) — A key to look up in data for a relative size value of the data item.
- **endLocation** (`undefined | number`) — Default 1 Relative location of where axis cell ends: 0 - beginning, 1 - end.
- **fillRule** (`undefined | ( dataItem: DataItem, index: undefined | number) => void`) — A function that can be used to specify how to configure axis fills. Click here for more info
- **idField** (`undefined | string`) — A key to look up in data for an id of the data item.
- **startLocation** (`undefined | number`) — Default 0 Relative location of where axis cell starts: 0 - beginning, 1 - end.
