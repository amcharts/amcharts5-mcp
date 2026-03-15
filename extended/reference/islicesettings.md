---
title: "ISliceSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/islicesettings/"
scraped: "2026-03-15"
---

Inheritance
ISliceSettings extends IGraphicsSettings.
ISliceSettings is not extended by any other symbol.
Properties


        active        
        #
      


                          Type undefined | false | true                      
Inherited from ISpriteSettings
Indicates if element is currently active.


        arc        
        #
      


                          Type undefined | number                      
Slice "width" in degrees.


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

- **arc** (`undefined | number`) — Slice "width" in degrees.
- **cornerRadius** (`undefined | number`) — Slice corner radius in pixels.
- **dInnerRadius** (`undefined | number`) — Number of pixels to add to whatever slice's innerRadius value is. Negative numbers can also be used.
- **dRadius** (`undefined | number`) — Number of pixels to add to whatever slice's radius value is. Negative numbers can also be used.
- **innerRadius** (`undefined | number`) — Inner radius of the slice in pixels.
- **radius** (`undefined | number`) — Radius in pixels.
- **shiftRadius** (`undefined | number`) — Slice "pull out" radius in pixels.
- **startAngle** (`undefined | number`) — Start angle in degrees.
