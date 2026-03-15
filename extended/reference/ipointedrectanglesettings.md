---
title: "IPointedRectangleSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ipointedrectanglesettings/"
scraped: "2026-03-15"
---

Inheritance
IPointedRectangleSettings extends IGraphicsSettings.
IPointedRectangleSettings is not extended by any other symbol.
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

> **Note:** This class also inherits all settings, properties, methods, and events from IGraphicsSettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **cornerRadius** (`undefined | number`) — Corner radius in pixels.
- **pointerBaseWidth** (`undefined | number`) — A width of the pinter's (stem's) thick end (base) in pixels.
- **pointerLength** (`undefined | number`) — A length of the pinter (stem) in pixels.
- **pointerX** (`undefined | number`) — X coordinate the shape is pointing to.
- **pointerY** (`undefined | number`) — Y coordinate the shape is pointing to.
