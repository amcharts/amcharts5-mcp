---
title: "IPolylineSeriesSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ipolylineseriessettings/"
scraped: "2026-03-15"
---

Inheritance
IPolylineSeriesSettings extends IDrawingSeriesSettings.
IPolylineSeriesSettings is extended by ILabelSeriesSettings, IIconSeriesSettings.
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

Extends: IDrawingSeriesSettings
Extended by: ILabelSeriesSettings, IIconSeriesSettings

> **Note:** This class also inherits all settings, properties, methods, and events from IDrawingSeriesSettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **fillShape** (`undefined | false | true`) — Default false Show a closed color-filled shape instead of polyline. @since 5.9.0
- **pointCount** (`undefined | number`) — Number of pre-defined points in a shape. The shape will finish drawing once number is reached. @since 5.9.0
