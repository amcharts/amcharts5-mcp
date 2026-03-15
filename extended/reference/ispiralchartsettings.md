---
title: "ISpiralChartSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ispiralchartsettings/"
scraped: "2026-03-15"
---

Inheritance
ISpiralChartSettings extends ICurveChartSettings.
ISpiralChartSettings is not extended by any other symbol.
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

Extends: ICurveChartSettings

> **Note:** This class also inherits all settings, properties, methods, and events from ICurveChartSettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **endAngle** (`undefined | number`) — End angle of the spiral in degrees. default 0
- **innerRadius** (`Percent`) — Default 60% Inner radius of the spiral in percent.
- **levelCount** (`undefined | number`) — Default 3 Numer of spiral circles.
- **startAngle** (`undefined | number`) — Default -90 Start angle of the spiral in degrees.

