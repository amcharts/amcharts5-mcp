---
title: "IFlowSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iflowsettings/"
scraped: "2026-03-15"
---

Inheritance
IFlowSettings extends ISeriesSettings.
IFlowSettings is extended by IArcDiagramSettings, IChordSettings, ISankeySettings.
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

Extends: ISeriesSettings
Extended by: IArcDiagramSettings, IChordSettings, ISankeySettings

> **Note:** This class also inherits all settings, properties, methods, and events from ISeriesSettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **hiddenSize** (`undefined | number`) — Default 0.05 Relative size of hidden links. Links are hidden when user clicks on nodes (if toggleKey on nodes is set to "disabled"). This allows hidden node to remain visible so that user could click on it again to show it and its links. Click here for more info @since 5.4.1
- **minHiddenValue** (`undefined | number`) — Default 0 Minimum value of hidden links. Links are hidden when user clicks on nodes (if toggleKey on nodes is set to "disabled"). Click here for more info @since 5.4.1
- **minSize** (`undefined | number`) — Default 0 Minimum size of the link. It's a relative value to the sum of all values in the series. If set, this relative value will be used for small value nodes when calculating their size. For example, if it's set to 0.01, small nodes will be sized like their value is 1% of the total sum of all values in series. @since 5.1.5
- **nodePadding** (`undefined | number`) — Default 10 Minimum gap between adjacent nodes.
- **nodeWidth** (`undefined | number`) — Default 10 The thickness of node strip in pixels.
- **sourceIdField** (`undefined | string`) — A field in data which holds source node ID.
- **targetIdField** (`undefined | string`) — A field in data which holds target node ID.
