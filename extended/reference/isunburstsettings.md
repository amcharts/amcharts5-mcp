---
title: "ISunburstSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/isunburstsettings/"
scraped: "2026-03-15"
---

Inheritance
ISunburstSettings extends IPartitionSettings.
ISunburstSettings is not extended by any other symbol.
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

Extends: IPartitionSettings

> **Note:** This class also inherits all settings, properties, methods, and events from IPartitionSettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **endAngle** (`undefined | number`) — Default 270 End angle of the series.
- **innerRadius** (`number | Percent`) — Default 0 Inner radius of the suburst pie. Setting to negative number will mean pixels from outer radius.
- **radius** (`number | Percent`) — Default 100% Outer radius of the sunburst pie.
- **startAngle** (`undefined | number`) — Default -90 Start angle of the series.
