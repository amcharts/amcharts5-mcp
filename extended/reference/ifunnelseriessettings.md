---
title: "IFunnelSeriesSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ifunnelseriessettings/"
scraped: "2026-03-15"
---

Inheritance
IFunnelSeriesSettings extends IPercentSeriesSettings.
IFunnelSeriesSettings is extended by IPyramidSeriesSettings.
Properties


        active        
        #
      


                          Type undefined | false | true                      
Inherited from ISpriteSettings
Indicates if element is currently active.


        alignLabels        
        #
      


                          Type undefined | false | true                      
Default false

Should labels be aligned into columns/rows?


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
Extended by: IPyramidSeriesSettings

> **Note:** This class also inherits all settings, properties, methods, and events from IPercentSeriesSettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **alignLabels** (`undefined | false | true`) — Default false Should labels be aligned into columns/rows?
- **bottomRatio** (`undefined | number`) — Default 1 Width of the bottom edge of the slice relative to the top edge of the next slice. 1 - means the full width of the slice, resulting in a rectangle. 0 - means using width of the next slice, resulting in a trapezoid. Click here for more info
- **endLocation** (`undefined | number`) — Default 0 Relative location within area available to series where it should start. 0 - beginning, 1 - end, or any intermediate value. Click here for more info
- **ignoreZeroValues** (`undefined | false | true`) — If set to true, series will not create slices for data items with zero value.
- **orientation** (`"horizontal" | "vertical"`) — Default "vertical" Orientation of the series. Click here for more info
- **startLocation** (`undefined | number`) — Default 0 Relative location within area available to series where it should start. 0 - beginning, 1 - end, or any intermediate value. Click here for more info
