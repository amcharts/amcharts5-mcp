---
title: "ISmoothedYLineSeriesSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ismoothedylineseriessettings/"
scraped: "2026-03-15"
---

Inheritance
ISmoothedYLineSeriesSettings extends ILineSeriesSettings.
ISmoothedYLineSeriesSettings is not extended by any other symbol.
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

Extends: ILineSeriesSettings

> **Note:** This class also inherits all settings, properties, methods, and events from ILineSeriesSettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **tension** (`undefined | number`) — Default 0.5 A tension force for the smoothing (0-1). The smaller the value the more curvy the line will be.
