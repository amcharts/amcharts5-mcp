---
title: "ISerpentineChartSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iserpentinechartsettings/"
scraped: "2026-03-15"
---

Inheritance
ISerpentineChartSettings extends ICurveChartSettings.
ISerpentineChartSettings is not extended by any other symbol.
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

- **endLocation** (`undefined | number`) — Relative location (0-1) of the end position. @defult 1
- **levelCount** (`undefined | number`) — Default 3 Number of levels in the chart.
- **orientation** (`"horizontal" | "vertical"`) — Default "vertical" Orientation of the serpatine.
- **startLocation** (`undefined | number`) — Relative location (0-1) of the start postion. @defult 0

