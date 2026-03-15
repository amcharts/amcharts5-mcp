---
title: "IAxisRendererYSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iaxisrendererysettings/"
scraped: "2026-03-15"
---

Inheritance
IAxisRendererYSettings extends IAxisRendererSettings.
IAxisRendererYSettings is extended by IGanttCategoryAxisRendererSettings.
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

Extends: IAxisRendererSettings
Extended by: IGanttCategoryAxisRendererSettings

> **Note:** This class also inherits all settings, properties, methods, and events from IAxisRendererSettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **inside** (`undefined | false | true`) — Default false If set to true, all axis elements (ticks, labels) will be drawn inside plot area.
- **opposite** (`undefined | false | true`) — Default false If set to true the axis will be drawn on the opposite side of the plot area. Click here for more info
