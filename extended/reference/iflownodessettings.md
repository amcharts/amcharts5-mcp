---
title: "IFlowNodesSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iflownodessettings/"
scraped: "2026-03-15"
---

Inheritance
IFlowNodesSettings extends ISeriesSettings.
IFlowNodesSettings is extended by IArcDiagramNodesSettings, IChordNodesSettings, ISankeyNodesSettings.
Properties


        active        
        #
      


                          Type undefined | false | true                      
Inherited from ISpriteSettings
Indicates if element is currently active.


        animationDuration        
        #
      


                          Type undefined | number                      
Animation duration in ms.


        animationEasing        
        #
      


                          Type undefined | ( t: Time) => Time                      
Easing function to use for node animations.


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

Extends: ISeriesSettings
Extended by: IArcDiagramNodesSettings, IChordNodesSettings, ISankeyNodesSettings

> **Note:** This class also inherits all settings, properties, methods, and events from ISeriesSettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **animationDuration** (`undefined | number`) — Animation duration in ms.
- **animationEasing** (`undefined | ( t: Time) => Time`) — Easing function to use for node animations.
- **colors** (`ColorSet`) — A ColorSet that series will use to apply to its nodes.
- **disabledField** (`undefined | string`) — A field in data that holds boolean value indicating if node is disabled (collapsed). @since 5.4.2
- **fillField** (`undefined | string`) — Default "fill" A field in data that holds color used for fills nodes.
- **nameField** (`undefined | string`) — Default "id" A field in data that holds name for the node.
- **patterns** (`PatternSet`) — A PatternSet that series will use to apply to its nodes. Click here for more info @since 5.10.0
- **unknownField** (`undefined | string`) — Default "unknown" A field in data boolean setting if the node is "unknown".
