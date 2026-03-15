---
title: "IPieSeriesSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ipieseriessettings/"
scraped: "2026-03-15"
---

Inheritance
IPieSeriesSettings extends IPercentSeriesSettings.
IPieSeriesSettings is not extended by any other symbol.
Properties


        active        
        #
      


                          Type undefined | false | true                      
Inherited from ISpriteSettings
Indicates if element is currently active.


        alignLabels        
        #
      


                          Type undefined | false | true                      
Inherited from IPercentSeriesSettings
Should slice labels be aligned in columns/rows?


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

Extends: IPercentSeriesSettings

> **Note:** This class also inherits all settings, properties, methods, and events from IPercentSeriesSettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **endAngle** (`undefined | number`) — Default 270 End angle of the series in degrees.
- **innerRadius** (`Percent | number`) — Radius of the series in pixels or percent. Setting to negative number will mean pixels from outer radius.
- **radius** (`Percent | number`) — Radius of the series in pixels or percent.
- **startAngle** (`undefined | number`) — Default -90 Start angle of the series in degrees.
