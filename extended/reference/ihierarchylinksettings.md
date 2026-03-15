---
title: "IHierarchyLinkSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ihierarchylinksettings/"
scraped: "2026-03-15"
---

Inheritance
IHierarchyLinkSettings extends IGraphicsSettings.
IHierarchyLinkSettings is not extended by any other symbol.
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

> **Note:** This class also inherits all settings, properties, methods, and events from IGraphicsSettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **distance** (`undefined | number`) — Distance in pixels.
- **source** (`DataItem`) — Source node data item.
- **strength** (`undefined | number`) — Strength of the link.
- **target** (`DataItem`) — Target node data item.
