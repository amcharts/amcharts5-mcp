---
title: "IForceDirectedSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iforcedirectedsettings/"
scraped: "2026-03-15"
---

Inheritance
IForceDirectedSettings extends ILinkedHierarchySettings.
IForceDirectedSettings is not extended by any other symbol.
Properties


        active        
        #
      


                          Type undefined | false | true                      
Inherited from ISpriteSettings
Indicates if element is currently active.


        animationDuration        
        #
      


                          Type undefined | number                      
Inherited from IHierarchySettings
Duration for all drill animations in milliseconds.


        animationEasing        
        #
      


                          Type Easing                      
Inherited from IHierarchySettings
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

Extends: ILinkedHierarchySettings

> **Note:** This class also inherits all settings, properties, methods, and events from ILinkedHierarchySettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **centerStrength** (`undefined | number`) — Default 0.5 A force that attracts (or pushes back) all nodes to the center of the chart. Click here for more info
- **initialFrames** (`undefined | number`) — Default 500 Length of how long initial force simulation would run in frames. Click here for more info
- **linkWithStrength** (`number | undefined`) — Default 0.5 A force that attracts (or pushes back) nodes that are linked together via linkWithField. Click here for more info
- **manyBodyStrength** (`undefined | number`) — Default -15 A force that attracts (or pushes back) all nodes to each other. Click here for more info
- **maxRadius** (`number | Percent`) — Default 8% Biggest possible radius for a node circle. Can be a fixed pixel value or percent relative to chart size. Click here for more info
- **minRadius** (`number | Percent`) — Default 1% Smallest possible radius for a node circle. Can be a fixed pixel value or percent relative to chart size. Click here for more info
- **nodePadding** (`undefined | number`) — Minimum gap in pixels between the nodes.
- **showOnFrame** (`undefined | number`) — Default 10 If set to a number will wait X number of frames before revealing the tree. Can be used to hide initial animations where nodes settle into their places. Click here for more info
- **velocityDecay** (`undefined | number`) — Default 0.5 Resistance acting agains node speed. The greater the value, the more "sluggish" the nodes will be. Click here for more info
- **xField** (`undefined | string`) — Field in data that holds X coordinate of the node. Click here for more info

