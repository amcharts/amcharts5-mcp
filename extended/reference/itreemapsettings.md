---
title: "ITreemapSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/itreemapsettings/"
scraped: "2026-03-15"
---

Inheritance
ITreemapSettings extends IHierarchySettings.
ITreemapSettings is not extended by any other symbol.
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

Extends: IHierarchySettings

> **Note:** This class also inherits all settings, properties, methods, and events from IHierarchySettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **layoutAlgorithm** (`"binary" | "squarify" | "slice" | "dice" | "sliceDice"`) — Default "squarify" An algorithm to use when laying out node rectangles. ...
- **nodePaddingBottom** (`undefined | number`) — Gap between nodes and bottomedge. Will be ignored if nodePaddingOuter is set. Click here
- **nodePaddingInner** (`undefined | number`) — Gap between nodes. In pixels. Click here
- **nodePaddingLeft** (`undefined | number`) — Gap between nodes and left edge. Will be ignored if nodePaddingOuter is set. Click here
- **nodePaddingOuter** (`undefined | number`) — Gap between nodes and outer edge of the chart. In pixels. Click here
- **nodePaddingRight** (`undefined | number`) — Gap between nodes and bottom edge. Will be ignored if nodePaddingOuter is set. Click here
- **nodePaddingTop** (`undefined | number`) — Gap between nodes and top edge. Will be ignored if nodePaddingOuter is set. Click here
