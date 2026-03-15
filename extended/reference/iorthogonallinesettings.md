---
title: "IOrthogonalLineSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iorthogonallinesettings/"
scraped: "2026-03-15"
---

Inheritance
IOrthogonalLineSettings extends IGraphicsSettings.
IOrthogonalLineSettings is not extended by any other symbol.
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

Extends: IGraphicsSettings

> **Note:** This class also inherits all settings, properties, methods, and events from IGraphicsSettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **cornerRadius** (`undefined | number`) — Corner radius between segments.
- **points** (`Array`) — A list of IPoint (x/y coordinates) points for the Orthogonal Line.
