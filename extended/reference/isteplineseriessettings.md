---
title: "IStepLineSeriesSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/isteplineseriessettings/"
scraped: "2026-03-15"
---

Inheritance
IStepLineSeriesSettings extends ILineSeriesSettings.
IStepLineSeriesSettings is not extended by any other symbol.
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

- **noRisers** (`undefined | false | true`) — Default false Disables vertical connecting lines for the steps. Click here for more info
- **stepWidth** (`Percent`) — Default 100% Width of the step in percent relative to the cell width. NOTE: setting this to less than 100% makes sense only when risers are disabled: noRisers: true Click here for more info
