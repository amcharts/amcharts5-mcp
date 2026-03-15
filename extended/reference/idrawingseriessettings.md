---
title: "IDrawingSeriesSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/idrawingseriessettings/"
scraped: "2026-03-15"
---

Inheritance
IDrawingSeriesSettings extends ILineSeriesSettings.
IDrawingSeriesSettings is extended by ISimpleLineSeriesSettings, IPolylineSeriesSettings, IDoodleSeriesSettings, IEllipseSeriesSettings.
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

Extends: ILineSeriesSettings
Extended by: ISimpleLineSeriesSettings, IPolylineSeriesSettings, IDoodleSeriesSettings, IEllipseSeriesSettings

> **Note:** This class also inherits all settings, properties, methods, and events from ILineSeriesSettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **field** (`"open" | "value" | "low" | "high"`) — Default "value" Value field to use when snapping data or calculating averages/regresions/etc.
- **fillColor** (`Color`) — Color of the fills.
- **fillOpacity** (`undefined | number`) — Opacity of the fills (0-1).
- **selectorPadding** (`undefined | number`) — Default 5 Padding of a selector rectangle (how many pixels will be added to each side around the drawing when it's selected)
- **series** (`XYSeries`) — XYSeries used for drawing.
- **strokeColor** (`Color`) — Color of the lines/borders.
- **strokeDasharray** (`Array`) — Dash information for lines/borders.
- **strokeOpacity** (`undefined | number`) — Opacity of the lines/borders (0-1).
- **strokeWidth** (`undefined | number`) — Width of the lines/borders in pixels.
- **xAxis** (`DateAxis`) — X-Axis.

