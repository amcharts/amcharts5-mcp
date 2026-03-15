---
title: "IAxisRendererCurveXSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iaxisrenderercurvexsettings/"
scraped: "2026-03-15"
---

Inheritance
IAxisRendererCurveXSettings extends IAxisRendererSettings.
IAxisRendererCurveXSettings is not extended by any other symbol.
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

- **points** (`Array`) — Array of control points to draw axis along.
- **rotateLabels** (`undefined | false | true`) — If labels rotation should be adjusted to the axis rotation

