---
title: "IClockHandSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iclockhandsettings/"
scraped: "2026-03-15"
---

Inheritance
IClockHandSettings extends IContainerSettings.
IClockHandSettings is not extended by any other symbol.
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

Extends: IContainerSettings

> **Note:** This class also inherits all settings, properties, methods, and events from IContainerSettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **bottomWidth** (`undefined | number`) — Default 10 A width of the base of the clock hand, in pixels.
- **innerRadius** (`number | Percent`) — Default 0 Inner radius of the hand, in pixels, or percent (relative to the axis radius). If set to negative number, will mean number of pixels inwards from the axis.
- **pinRadius** (`number | Percent`) — Default 10 Radius of the hand pin (circle at the base of the hand), in pixels, or in percent (relative to the axis radius.)
- **radius** (`number | Percent`) — Default 90% Radius of the hand, in pixels, or percent (relative to the axis radius). If set to negative number, will mean number of pixels inwards from the axis.
- **topWidth** (`undefined | number`) — Default 1 A width of the tip of the clock hand, in pixels.
