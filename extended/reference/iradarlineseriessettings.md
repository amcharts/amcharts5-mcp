---
title: "IRadarLineSeriesSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iradarlineseriessettings/"
scraped: "2026-03-15"
---

Inheritance
IRadarLineSeriesSettings extends ILineSeriesSettings.
IRadarLineSeriesSettings is extended by ISmoothedRadarLineSeriesSettings.
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
Extended by: ISmoothedRadarLineSeriesSettings

> **Note:** This class also inherits all settings, properties, methods, and events from ILineSeriesSettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **connectEnds** (`undefined | false | true`) — Default @true If set to true (default), series will connect its last data point to the first one with a line, thus completing full circle. Click here for more info
