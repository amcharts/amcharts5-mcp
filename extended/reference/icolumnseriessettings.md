---
title: "IColumnSeriesSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/icolumnseriessettings/"
scraped: "2026-03-15"
---

Inheritance
IColumnSeriesSettings extends IBaseColumnSeriesSettings.
IColumnSeriesSettings is extended by IGanttSeriesSettings, ICandlestickSeriesSettings.
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

Inherited from IBaseColumnSeriesSettings
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

Extends: IBaseColumnSeriesSettings
Extended by: IGanttSeriesSettings, ICandlestickSeriesSettings

> **Note:** This class also inherits all settings, properties, methods, and events from IBaseColumnSeriesSettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **turboMode** (`undefined | false | true`) — Enables "turbo mode" of rendering. If enabled, the columsn will be drawn directly on canvas, rather than each individually, significantly speeding up the rendering. Especially on column-heavy charts. NOTE: this is an experimental feature and may not work in all setups. Some features might be disabled, too, e.g. pointer events and rounded corners. @since 5.14.0 Click here for more info
