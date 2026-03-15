---
title: "IChordSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ichordsettings/"
scraped: "2026-03-15"
---

Inheritance
IChordSettings extends IFlowSettings.
IChordSettings is extended by IChordDirectedSettings, IChordNonRibbonSettings.
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

Extends: IFlowSettings
Extended by: IChordDirectedSettings, IChordNonRibbonSettings

> **Note:** This class also inherits all settings, properties, methods, and events from IFlowSettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **nodeWidth** (`undefined | number`) — Default 10 The thickness of node strip in pixels.
- **padAngle** (`undefined | number`) — Default 1 Angle of a gap between each node, in degrees.
- **radius** (`number | Percent`) — Default 90% Radius of the diagram in percent or pixels. If set in percent, it will be relative to the whole area available for the series.
- **sort** (`"ascending" | "descending" | "none"`) — Default "descending" How to sort nodes by their value.
- **startAngle** (`undefined | number`) — Default 0 Starting angle in degrees.
