---
title: "IGraticuleSeriesSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/igraticuleseriessettings/"
scraped: "2026-03-15"
---

Inheritance
IGraticuleSeriesSettings extends IMapLineSeriesSettings.
IGraticuleSeriesSettings is not extended by any other symbol.
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

Extends: IMapLineSeriesSettings

> **Note:** This class also inherits all settings, properties, methods, and events from IMapLineSeriesSettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **clipExtent** (`undefined | false | true`) — (no description)
- **step** (`undefined | number`) — Default 10 Place a grid line every Xth latitude/longitude.
