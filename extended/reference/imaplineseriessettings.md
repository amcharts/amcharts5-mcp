---
title: "IMapLineSeriesSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/imaplineseriessettings/"
scraped: "2026-03-15"
---

Inheritance
IMapLineSeriesSettings extends IMapSeriesSettings.
IMapLineSeriesSettings is extended by IGraticuleSeriesSettings.
Properties


        active        
        #
      


                          Type undefined | false | true                      
Inherited from ISpriteSettings
Indicates if element is currently active.


        affectsBounds        
        #
      


                          Type undefined | false | true                      
Default true
Inherited from IMapSeriesSettings
All map series will determine the actual bounds shown in the MapChart.
 If we need a series to be ignored while calculating the bounds, we can set this to false.
 Especially useful for background series.
@since 5.2.36


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

Extends: IMapSeriesSettings
Extended by: IGraticuleSeriesSettings

> **Note:** This class also inherits all settings, properties, methods, and events from IMapSeriesSettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **clipBack** (`undefined | false | true`) — If set to true will hide line segments that are in the invisible range of the map. For example on the side of the globe facing away from the viewer when used with Orthographic projection. NOTE: not all projections have invisible side.
- **lineType** (`"curved" | "straight"`) — Default "curved" A line type. "curved" (default) - connects points using shortest distance, which will result in curved lines based on map projection. "straight" - connects points using visually straight lines, and will not cross the -180/180 longitude. @since 5.2.24
