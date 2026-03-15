---
title: "IPieChartSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ipiechartsettings/"
scraped: "2026-03-15"
---

Inheritance
IPieChartSettings extends IPercentChartSettings.
IPieChartSettings is not extended by any other symbol.
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

Extends: IPercentChartSettings

> **Note:** This class also inherits all settings, properties, methods, and events from IPercentChartSettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **endAngle** (`undefined | number`) — Default 270 An end angle of the chart in degrees. Click here for more info
- **innerRadius** (`number | Percent`) — Inner radius of the pie chart. Setting to any non-zero value will result in a donut chart. Can be set in fixed pixel value, or relative to chart container size in percent. Setting to negative number will mean pixels from outer radius. Click here for more info
- **radius** (`number | Percent`) — Default 80% Outer radius of the pie chart. Can be set in fixed pixel value, or relative to chart container size in percent. Click here for more info
- **startAngle** (`undefined | number`) — Default -90 A start angle of the chart in degrees. Click here for more info
