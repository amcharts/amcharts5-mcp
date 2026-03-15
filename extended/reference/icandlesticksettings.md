---
title: "ICandlestickSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/icandlesticksettings/"
scraped: "2026-03-15"
---

Inheritance
ICandlestickSettings extends IRoundedRectangleSettings.
ICandlestickSettings is extended by IOHLCSettings.
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

Extends: IRoundedRectangleSettings
Extended by: IOHLCSettings

> **Note:** This class also inherits all settings, properties, methods, and events from IRoundedRectangleSettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **highX0** (`undefined | number`) — X0 position of the high value in pixels.
- **highX1** (`undefined | number`) — Xz position of the high value in pixels.
- **highY0** (`undefined | number`) — Y0 position of the high value in pixels.
- **highY1** (`undefined | number`) — Y1 position of the high value in pixels.
- **lowX0** (`undefined | number`) — X0 position of the low value in pixels.
- **lowX1** (`undefined | number`) — X2 position of the low value in pixels.
- **lowY0** (`undefined | number`) — Y0 position of the low value in pixels.
- **lowY1** (`undefined | number`) — Y1 position of the low value in pixels.
- **orientation** (`"horizontal" | "vertical"`) — Orientation of the cnadlestick.
