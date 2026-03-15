---
title: "IAxisLabelRadialSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iaxislabelradialsettings/"
scraped: "2026-03-15"
---

Inheritance
IAxisLabelRadialSettings extends IRadialLabelSettings.
IAxisLabelRadialSettings is not extended by any other symbol.
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

Extends: IRadialLabelSettings

> **Note:** This class also inherits all settings, properties, methods, and events from IRadialLabelSettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **location** (`undefined | number`) — Relative location of the label within the cell. 0 - beginning, 0.5 - middle, 1 - end.
- **maxPosition** (`undefined | number`) — Default 0 The maximum relative position within visible axis scope the label can appear on. E.g. 0.9 will mean that label will not be shown if it's closer to the end of the axis than 10%.
- **minPosition** (`undefined | number`) — Default 0 The minimum relative position within visible axis scope the label can appear on. E.g. 0.1 will mean that label will not be shown if it's closer to the beginning of the axis than 10%.
- **multiLocation** (`undefined | number`) — Relative location of the label within the cell when it spans multiple intervals. 0 - beginning, 0.5 - middle, 1 - end.
