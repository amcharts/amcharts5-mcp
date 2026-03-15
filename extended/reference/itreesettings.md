---
title: "ITreeSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/itreesettings/"
scraped: "2026-03-15"
---

Inheritance
ITreeSettings extends ILinkedHierarchySettings.
ITreeSettings is not extended by any other symbol.
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

- **inversed** (`undefined | false | true`) — Default false If set to true, will flip the tree direction. @since 5.2.4
- **orientation** (`"horizontal" | "vertical"`) — Default "vertical" Orientation of the diagram.
