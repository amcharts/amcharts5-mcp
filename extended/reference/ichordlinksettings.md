---
title: "IChordLinkSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ichordlinksettings/"
scraped: "2026-03-15"
---

Inheritance
IChordLinkSettings extends IFlowLinkSettings.
IChordLinkSettings is extended by IChordLinkDirectedSettings.
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

Extends: IFlowLinkSettings
Extended by: IChordLinkDirectedSettings

> **Note:** This class also inherits all settings, properties, methods, and events from IFlowLinkSettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **source** (`DataItem`) — Source data item.
- **sourceRadius** (`number | Percent`) — Radius of the link at the source.
- **target** (`DataItem`) — target data item.
- **targetRadius** (`number | Percent`) — Radius of the link at the end (target).
