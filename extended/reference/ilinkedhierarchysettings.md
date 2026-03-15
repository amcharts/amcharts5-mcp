---
title: "ILinkedHierarchySettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ilinkedhierarchysettings/"
scraped: "2026-03-15"
---

Inheritance
ILinkedHierarchySettings extends IHierarchySettings.
ILinkedHierarchySettings is extended by IForceDirectedSettings, ITreeSettings.
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
Extended by: IForceDirectedSettings, ITreeSettings

> **Note:** This class also inherits all settings, properties, methods, and events from IHierarchySettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **linkWithField** (`undefined | string`) — A field in data which holds IDs of nodes to link with.
