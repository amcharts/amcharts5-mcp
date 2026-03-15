---
title: "IMapPolygonSeriesSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/imappolygonseriessettings/"
scraped: "2026-03-15"
---

Inheritance
IMapPolygonSeriesSettings extends IMapSeriesSettings.
IMapPolygonSeriesSettings is not extended by any other symbol.
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

> **Note:** This class also inherits all settings, properties, methods, and events from IMapSeriesSettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **reverseGeodata** (`undefined | false | true`) — Default false If set to true, the order of coordinates in GeoJSON will be flipped. Some GeoJSON software produces those in reverse order, so if your custom map appears garbled, try this setting. @since 5.2.42
