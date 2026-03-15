---
title: "IMapSeriesSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/imapseriessettings/"
scraped: "2026-03-15"
---

Inheritance
IMapSeriesSettings extends ISeriesSettings.
IMapSeriesSettings is extended by IMapPointSeriesSettings, IMapLineSeriesSettings, IMapPolygonSeriesSettings.
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

Extends: ISeriesSettings
Extended by: IMapPointSeriesSettings, IMapLineSeriesSettings, IMapPolygonSeriesSettings

> **Note:** This class also inherits all settings, properties, methods, and events from ISeriesSettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **affectsBounds** (`undefined | false | true`) — Default true All map series will determine the actual bounds shown in the MapChart. If we need a series to be ignored while calculating the bounds, we can set this to false. Especially useful for background series. @since 5.2.36
- **exclude** (`Array`) — An array of map object ids from geodata to omit when showing the map.
- **geoJSON** (`GeoJSON.GeoJSON`) — Map data in GeoJSON format.
- **geodataNames** (`undefined | object`) — Names of geodata items, such as countries, to replace by from loaded geodata. Can be used to override built-in English names for countries. import am5geodata_lang_ES from '@amcharts5-geodata/lang/es'; // ... map.geodataNames = am5geodata_lang_ES; map.geodataNames = am5geodata_lang_ES; @since 5.1.13 Click here for more info
- **include** (`Array`) — An array of map object ids from geodata to include in the map. If set, only those objects listed in include will be shown.
- **valueField** (`undefined | string`) — A field in series data that will hold map object's numeric value. It can be used in a number of places, e.g. tooltips, heat rules, etc.
