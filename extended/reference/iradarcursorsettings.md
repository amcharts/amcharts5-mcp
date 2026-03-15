---
title: "IRadarCursorSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iradarcursorsettings/"
scraped: "2026-03-15"
---

Inheritance
IRadarCursorSettings extends IXYCursorSettings.
IRadarCursorSettings is not extended by any other symbol.
Properties


        active        
        #
      


                          Type undefined | false | true                      
Inherited from ISpriteSettings
Indicates if element is currently active.


        alwaysShow        
        #
      


                          Type undefined | false | true                      
Default false

Inherited from IXYCursorSettings
If set to true, cursor will not be hidden when mouse cursor moves out of the plot area.


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

Extends: IXYCursorSettings

> **Note:** This class also inherits all settings, properties, methods, and events from IXYCursorSettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **endAngle** (`undefined | number`) — Cursor's selection end angle in degrees.
- **innerRadius** (`number | Percent`) — Cursor's inner radius.
- **radius** (`number | Percent`) — Cursor's inner radius.
- **startAngle** (`undefined | number`) — Cursor's position angle in degrees.
