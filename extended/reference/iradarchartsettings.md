---
title: "IRadarChartSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iradarchartsettings/"
scraped: "2026-03-15"
---

Inheritance
IRadarChartSettings extends IXYChartSettings.
IRadarChartSettings is not extended by any other symbol.
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

Extends: IXYChartSettings

> **Note:** This class also inherits all settings, properties, methods, and events from IXYChartSettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **cursor** (`RadarCursor`) — RadarCursor instance. Click here for more info
- **endAngle** (`undefined | number`) — Default 270 Chart end angle in degress. Click here for more info
- **innerRadius** (`number | Percent`) — Inner radius of the chart. Can be set in pixels or percent, relative to outer radius. Setting to negative number will mean pixels from outer radius. Click here for more info
- **radius** (`number | Percent`) — Default 80% Outer radius of the chart. Can be set in pixels or percent, relative to available space. Click here for more info
- **startAngle** (`undefined | number`) — Default -90 Chart start angle in degress. Click here for more info
