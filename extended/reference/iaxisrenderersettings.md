---
title: "IAxisRendererSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iaxisrenderersettings/"
scraped: "2026-03-15"
---

Inheritance
IAxisRendererSettings extends IGraphicsSettings.
IAxisRendererSettings is extended by IAxisRendererYSettings, IAxisRendererXSettings, IAxisRendererCircularSettings, IAxisRendererRadialSettings, IAxisRendererCurveXSettings, IAxisRendererCurveYSettings.
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

Extends: IGraphicsSettings
Extended by: IAxisRendererYSettings, IAxisRendererXSettings, IAxisRendererCircularSettings, IAxisRendererRadialSettings, IAxisRendererCurveXSettings, IAxisRendererCurveYSettings

> **Note:** This class also inherits all settings, properties, methods, and events from IGraphicsSettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **cellEndLocation** (`undefined | number`) — Default 1 Indicates relative position where "usable" space of the cell ends. 0 - beginning, 1 - end, or anything in-between. Click here for more info
- **cellStartLocation** (`undefined | number`) — Default 0 Indicates relative position where "usable" space of the cell starts. 0 - beginning, 1 - end, or anything in-between. Click here for more info
- **inversed** (`undefined | false | true`) — Default false Set to true to invert direction of the axis. Click here for more info
- **minGridDistance** (`undefined | number`) — The minimum distance between grid lines in pixels. Click here for more info
- **minorGridEnabled** (`undefined | false | true`) — Default false Re-enable display of skipped grid lines due to lack of space and as per the minGridDistance setting. Not recommended for CategoryAxis with a lot of data items. Click here for more info @since 5.6.0
- **minorLabelsEnabled** (`undefined | false | true`) — Default false Enable labels on minor grid. If you enable labels, grid will be enabled automatically. Click here for more info @since 5.6.0
- **pan** (`"none" | "zoom"`) — Default "none" If set to "zoom" will enable axis zoom by panning it in the axis label area. Works on AxisRendererX and AxisRendererY only. For a better result, set maxDeviation to 1 or so on the Axis. Will not work if inside is set to true. @since 5.0.7
- **panSensitivity** (`undefined | number`) — Default 1 Sensitivity of panning. The higher the number, the more sensitive it is.
