---
title: "IMovingAverageSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/imovingaveragesettings/"
scraped: "2026-03-15"
---

Inheritance
IMovingAverageSettings extends IIndicatorSettings.
IMovingAverageSettings is extended by IBollingerBandsSettings, IMovingAverageEnvelopeSettings.
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

Extends: IIndicatorSettings
Extended by: IBollingerBandsSettings, IMovingAverageEnvelopeSettings

> **Note:** This class also inherits all settings, properties, methods, and events from IIndicatorSettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **offset** (`undefined | number`) — Default 0 Offset.
- **type** (`"simple" | "weighted" | "exponential" | "dema" | "tema"`) — Default "simple" Type of the moving average.
