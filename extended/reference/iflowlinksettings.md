---
title: "IFlowLinkSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iflowlinksettings/"
scraped: "2026-03-15"
---

Inheritance
IFlowLinkSettings extends IGraphicsSettings.
IFlowLinkSettings is extended by IArcDiagramLinkSettings, IChordLinkSettings, ISankeyLinkSettings.
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

Extends: IGraphicsSettings
Extended by: IArcDiagramLinkSettings, IChordLinkSettings, ISankeyLinkSettings

> **Note:** This class also inherits all settings, properties, methods, and events from IGraphicsSettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **fillStyle** (`"solid" | "source" | "target" | "gradient" | "none"`) — Type of fill to use for links.
- **source** (`DataItem`) — Source node data item.
- **strokeStyle** (`"solid" | "source" | "target" | "gradient" | "none"`) — Type of outline to use for links.
- **target** (`DataItem`) — Source node data item.
