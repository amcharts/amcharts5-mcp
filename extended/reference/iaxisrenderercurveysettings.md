---
title: "IAxisRendererCurveYSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iaxisrenderercurveysettings/"
scraped: "2026-03-15"
---

Inheritance
IAxisRendererCurveYSettings extends IAxisRendererSettings.
IAxisRendererCurveYSettings is not extended by any other symbol.
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

Extends: IAxisRendererSettings

> **Note:** This class also inherits all settings, properties, methods, and events from IAxisRendererSettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **axisLength** (`undefined | number`) — Default 60 Axis length in pixels. SerpentineChart and SpiralChart will ignore this setting as they calculate axis length by the yAxisRadius setting of a chart itself.
- **axisLocation** (`undefined | number`) — Default 0.5 Relative location of the axis on the chart: 0-1. 0 - start 1 - end
- **rotateLabels** (`undefined | false | true`) — Default false Should axis labels rotation should be adjusted to the axis rotation?
- **xRenderer** (`AxisRendererCurveX`) — X-axis renderer. This setting is required.
