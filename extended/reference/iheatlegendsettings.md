---
title: "IHeatLegendSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iheatlegendsettings/"
scraped: "2026-03-15"
---

Inheritance
IHeatLegendSettings extends IContainerSettings.
IHeatLegendSettings is not extended by any other symbol.
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

Extends: IContainerSettings

> **Note:** This class also inherits all settings, properties, methods, and events from IContainerSettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **endColor** (`Color`) — Ending (highest value) color.
- **endOpacity** (`number`) — Default 1 Ending (lowest value) opacity. @since 5.14.0
- **endText** (`undefined | string`) — Text for end label.
- **endValue** (`undefined | number`) — End (highest) value.
- **orientation** (`"horizontal" | "vertical"`) — Orientation of the heat legend. Click here for more info
- **startColor** (`Color`) — Starting (lowest value) color.
- **startOpacity** (`number`) — Default 1 Starting (lowest value) opacity. @since 5.14.0
- **startText** (`undefined | string`) — Text for start label.
- **startValue** (`undefined | number`) — Start (lowest) value.
- **stepCount** (`undefined | number`) — Default 1 Number of steps Click here for more info
