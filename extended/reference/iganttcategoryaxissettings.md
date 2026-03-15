---
title: "IGanttCategoryAxisSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iganttcategoryaxissettings/"
scraped: "2026-03-15"
---

Inheritance
IGanttCategoryAxisSettings extends ICategoryAxisSettings.
IGanttCategoryAxisSettings is not extended by any other symbol.
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

- **childCellSize** (`undefined | number`) — Default 0.8 Size of child categories relative to the top-level cell height. (0 - 1) Click here for more info
- **childShift** (`undefined | number`) — Default 25 A shift in pixels to apply to child categories. Click here for more info
- **collapsedField** (`undefined | string`) — Default "collapsed" A field in data that holds status whether the category is collapsed. Click here for more info
- **colorField** (`undefined | string`) — Default "color" Field of a category color
- **minCellHeight** (`undefined | number`) — Default 70 A minimal height of the cell in pixels. Click here for more info
- **nameField** (`undefined | string`) — Default "name" Field of a category name
- **parentIdField** (`undefined | string`) — Default "parentId" A field in data that holds parent id. Click here for more info
- **selectedDataItem** (`DataItem`) — Currently selected category data item, if any.
