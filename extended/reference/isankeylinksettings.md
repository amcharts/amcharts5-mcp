---
title: "ISankeyLinkSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/isankeylinksettings/"
scraped: "2026-03-15"
---

Inheritance
ISankeyLinkSettings extends IFlowLinkSettings.
ISankeyLinkSettings is not extended by any other symbol.
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

> **Note:** This class also inherits all settings, properties, methods, and events from IFlowLinkSettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **controlPointDistance** (`undefined | number`) — Default 0.2 A relative distance from node for link "elbow" (bend point). Click here for more info
- **fillStyle** (`"solid" | "gradient" | "source" | "target"`) — Default "gradient" Type of fill to use for links. Click here for more info
- **source** (`DataItem`) — Source node data item.
- **target** (`DataItem`) — Source node data item.
