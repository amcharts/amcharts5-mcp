---
title: "ILabelSeriesSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ilabelseriessettings/"
scraped: "2026-03-15"
---

Inheritance
ILabelSeriesSettings extends IPolylineSeriesSettings.
ILabelSeriesSettings is extended by ICalloutSeriesSettings.
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

Extends: IPolylineSeriesSettings
Extended by: ICalloutSeriesSettings

> **Note:** This class also inherits all settings, properties, methods, and events from IPolylineSeriesSettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **labelFill** (`Color`) — Label color.
- **labelFontFamily** (`undefined | string`) — Label font damily.
- **labelFontSize** (`number | string | undefined`) — Label font size.
- **labelFontStyle** (`"normal" | "italic" | "oblique"`) — Font style.
- **labelFontWeight** (`"normal" | "bold" | "bolder" | "lighter" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900"`) — Font weight.
