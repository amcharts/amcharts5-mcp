---
title: "ISpriteResizerSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ispriteresizersettings/"
scraped: "2026-03-15"
---

Inheritance
ISpriteResizerSettings extends IContainerSettings.
ISpriteResizerSettings is not extended by any other symbol.
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

Extends: IContainerSettings

> **Note:** This class also inherits all settings, properties, methods, and events from IContainerSettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **rotationStep** (`undefined | number`) — Default 10 Rotation increment in degrees.
- **sprite** (`Sprite`) — Target Sprite element.
- **spriteTemplate** (`Template`) — Target Template. If a template is set, scale and rotation will be set on Template instead of a Sprite.
