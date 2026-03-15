---
title: "IAxisLabelSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iaxislabelsettings/"
scraped: "2026-03-15"
---

Inheritance
IAxisLabelSettings extends ILabelSettings.
IAxisLabelSettings is not extended by any other symbol.
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

Extends: ILabelSettings

> **Note:** This class also inherits all settings, properties, methods, and events from ILabelSettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **inside** (`boolean | undefined`) — Default false If set to true the label will be shown inside plot area. Click here for more info
- **location** (`undefined | number`) — Relative location of the label within the cell. 0 - beginning, 0.5 - middle, 1 - end. Click here for more info
- **maxPosition** (`undefined | number`) — Default 1 The maximum relative position within visible axis scope the label can appear on. E.g. 0.9 will mean that label will not be shown if it's closer to the end of the axis than 10%. Click here for more info
- **minPosition** (`undefined | number`) — Default 0 The minimum relative position within visible axis scope the label can appear on. E.g. 0.1 will mean that label will not be shown if it's closer to the beginning of the axis than 10%. Click here for more info
- **multiLocation** (`undefined | number`) — Relative location of the label within the cell when it spans multiple intervals. 0 - beginning, 0.5 - middle, 1 - end. Click here for more info
