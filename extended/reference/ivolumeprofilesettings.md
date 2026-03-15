---
title: "IVolumeProfileSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ivolumeprofilesettings/"
scraped: "2026-03-15"
---

Inheritance
IVolumeProfileSettings extends IIndicatorSettings.
IVolumeProfileSettings is not extended by any other symbol.
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

Extends: IIndicatorSettings

> **Note:** This class also inherits all settings, properties, methods, and events from IIndicatorSettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **axisWidth** (`undefined | number`) — Default 40 Max width of columns in percent (%).
- **count** (`undefined | number`) — Default 24 Number of rows or number of ticks, depending on the countType.
- **countType** (`"rows" | "ticks"`) — Type of count.
- **downColor** (`Color`) — Volume down color.
- **upColor** (`Color`) — Volume up color.
- **valueArea** (`undefined | number`) — Default 70 Specifies what percentage of all volume for the trading session should be highlighted by Value Area.
- **valueAreaOpacity** (`undefined | number`) — Default .7 Opacity of columns which fall withing value area.
- **volumeSeries** (`XYSeries`) — Chart's main volume series.
