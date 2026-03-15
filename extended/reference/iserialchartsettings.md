---
title: "ISerialChartSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iserialchartsettings/"
scraped: "2026-03-15"
---

Inheritance
ISerialChartSettings extends IChartSettings.
ISerialChartSettings is extended by IPercentChartSettings, IXYChartSettings, IMapChartSettings.
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

Extends: IChartSettings
Extended by: IPercentChartSettings, IXYChartSettings, IMapChartSettings

> **Note:** This class also inherits all settings, properties, methods, and events from IChartSettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **colors** (`ColorSet`) — A ColorSet to use when asigning colors for series. Click here for more info
- **patterns** (`PatternSet`) — A PatternSet to use when asigning patterns for series. Click here for more info @since 5.10.0
