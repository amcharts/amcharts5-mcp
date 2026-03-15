---
title: "IArcDiagramSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iarcdiagramsettings/"
scraped: "2026-03-15"
---

Inheritance
IArcDiagramSettings extends IFlowSettings.
IArcDiagramSettings is not extended by any other symbol.
Properties


        active        
        #
      


                          Type undefined | false | true                      
Inherited from ISpriteSettings
Indicates if element is currently active.


        animationDuration        
        #
      


                          Type undefined | number                      
Duration for all drill animations in milliseconds.


        animationEasing        
        #
      


                          Type Easing                      
An easing function to use for drill animations.


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

Extends: IFlowSettings

> **Note:** This class also inherits all settings, properties, methods, and events from IFlowSettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **animationDuration** (`undefined | number`) — Duration for all drill animations in milliseconds.
- **animationEasing** (`Easing`) — An easing function to use for drill animations.
- **minRadius** (`undefined | number`) — Default 5 Minimum radius of a nodes circle. Maximum radius is computed based on available space
- **orientation** (`"horizontal" | "vertical"`) — Default "horizontal" Orientation of the series. This setting can not be changed after the chart is initialized.
- **radiusKey** (`"sum" | "sumIncoming" | "sumOutgoing" | "none"`) — Default "sum" Defines Which value should be used when calculating circle radius. Use "none" if you want all circles to be the same. @martynas: gal cia reik naudot radiusField, biski no idea.
