---
title: "IHierarchySettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ihierarchysettings/"
scraped: "2026-03-15"
---

Inheritance
IHierarchySettings extends ISeriesSettings.
IHierarchySettings is extended by ILinkedHierarchySettings, IPackSettings, IPartitionSettings, ITreemapSettings, IVoronoiTreemapSettings.
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

Extends: ISeriesSettings
Extended by: ILinkedHierarchySettings, IPackSettings, IPartitionSettings, ITreemapSettings, IVoronoiTreemapSettings

> **Note:** This class also inherits all settings, properties, methods, and events from ISeriesSettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **animationDuration** (`undefined | number`) — Duration for all drill animations in milliseconds.
- **animationEasing** (`Easing`) — An easing function to use for drill animations.
- **categoryField** (`undefined | string`) — A field in data that holds string-based identificator for node.
- **childDataField** (`undefined | string`) — A field in data that holds an array of child node data.
- **colors** (`ColorSet`) — A ColorSet to use when asigning colors for nodes. Click here for more info
- **disabledField** (`undefined | string`) — A field in data that holds boolean value indicating if node is disabled (collapsed).
- **downDepth** (`undefined | number`) — Number of child levels to open when clicking on a node. Click here for more info
- **fillField** (`undefined | string`) — A field in data that holds color used for fills for various elements, such as nodes.
- **initialDepth** (`undefined | number`) — Number of levels to show on chart's first load. Click here for more info
- **patterns** (`PatternSet`) — A PatternSet to use when asigning patterns for nodes. Click here for more info @since 5.10.0
- **selectedDataItem** (`DataItem`) — A data item for currently selected node. Click here for more info
- **singleBranchOnly** (`undefined | false | true`) — If set to true will make all other branches collapse when some branch is expanded.
- **sort** (`"ascending" | "descending" | "none"`) — Default "none" How to sort nodes by their value.
- **topDepth** (`undefined | number`) — If set, will show nodes starting from set level. It could be used to eliminate top level branches, that do not need to be shown. Click here for more info
- **upDepth** (`undefined | number`) — Number of levels parent levels to show from currently selected node. Click here for more info
- **valueField** (`undefined | string`) — A field in data that holds numeric value for the node.
