---
title: "IPyramidSeriesSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ipyramidseriessettings/"
scraped: "2026-03-15"
---

Inheritance
IPyramidSeriesSettings extends IFunnelSeriesSettings.
IPyramidSeriesSettings is extended by IPictorialStackedSeriesSettings.
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

Inherited from IFunnelSeriesSettings
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

Extends: IFunnelSeriesSettings
Extended by: IPictorialStackedSeriesSettings

> **Note:** This class also inherits all settings, properties, methods, and events from IFunnelSeriesSettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **bottomWidth** (`number | Percent`) — Default 0 The width of the base of the pyramid. Can either be a fixed pixel value or percent relative to the space available to the series. Click here for more info
- **topWidth** (`number | Percent`) — Default 0 The width of the tip of the pyramid. Can either be a fixed pixel value or percent relative to the space available to the series. Click here for more info
- **valueIs** (`"area" | "height"`) — Default "area" Determines calculation mechanism for the slice area based on value. Click here for more info
