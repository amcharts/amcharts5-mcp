---
title: "IRectangleSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/irectanglesettings/"
scraped: "2026-03-15"
---

Inheritance
IRectangleSettings extends IGraphicsSettings.
IRectangleSettings is extended by IRoundedRectangleSettings.
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

Extends: IGraphicsSettings
Extended by: IRoundedRectangleSettings

> **Note:** This class also inherits all settings, properties, methods, and events from IGraphicsSettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **containStroke** (`undefined | false | true`) — If this is set to true, rectangle will be drawn in such a way that its stroke is contained within the rectangle's width and height.
