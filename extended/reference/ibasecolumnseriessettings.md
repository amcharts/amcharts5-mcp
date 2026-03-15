---
title: "IBaseColumnSeriesSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ibasecolumnseriessettings/"
scraped: "2026-03-15"
---

Inheritance
IBaseColumnSeriesSettings extends IXYSeriesSettings.
IBaseColumnSeriesSettings is extended by IColumnSeriesSettings, IRadarColumnSeriesSettings, ICurveColumnSeriesSettings.
Properties


        active        
        #
      


                          Type undefined | false | true                      
Inherited from ISpriteSettings
Indicates if element is currently active.


        adjustBulletPosition        
        #
      


                          Type undefined | false | true                      
Default true

Whether positions of bullets should be calculated based on portion of column currently visual (true) or the whole length/height of the column (false).


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

Extends: IXYSeriesSettings
Extended by: IColumnSeriesSettings, IRadarColumnSeriesSettings, ICurveColumnSeriesSettings

> **Note:** This class also inherits all settings, properties, methods, and events from IXYSeriesSettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **adjustBulletPosition** (`undefined | false | true`) — Default true Whether positions of bullets should be calculated based on portion of column currently visual (true) or the whole length/height of the column (false).
- **clustered** (`undefined | false | true`) — Default true Indicates if series must divvy up available space with other column series (true; default) or take up the whole available space (false). Click here for more info
- **useLastColorForLegendMarker** (`undefined | false | true`) — If set to true will use color of the last visible column for legend marker. Otherwise, series fill/stroke will be used. @since 5.1.13
