---
title: "ISankeySettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/isankeysettings/"
scraped: "2026-03-15"
---

Inheritance
ISankeySettings extends IFlowSettings.
ISankeySettings is not extended by any other symbol.
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

> **Note:** This class also inherits all settings, properties, methods, and events from IFlowSettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **linkSort** (`null | ( a: SankeyLinkMinimal, b: SankeyLinkMinimal) => number | null`) — A custom function to use when sorting links. Use null to sort links exactly the way they are presented in data. @since 5.4.4
- **linkTension** (`undefined | number`) — Default 0.5 Tension setting of the link curve. Accepts values from 0 to 1. 1 will result in perfectly straight lines.
- **nodeAlign** (`"left" | "right" | "justify" | "center"`) — Default "left" Alignment of nodes.
- **orientation** (`"horizontal" | "vertical"`) — Default "horizontal" Orientation of the series.
