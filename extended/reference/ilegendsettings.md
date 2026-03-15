---
title: "ILegendSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ilegendsettings/"
scraped: "2026-03-15"
---

Inheritance
ILegendSettings extends ISeriesSettings.
ILegendSettings is extended by IStockLegendSettings.
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

Extends: ISeriesSettings
Extended by: IStockLegendSettings

> **Note:** This class also inherits all settings, properties, methods, and events from ISeriesSettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **clickTarget** (`"itemContainer" | "marker" | "none"`) — Default "itemContainer" Which legend item element will be clickable to toggle related chart item: "itemContainer" - the whole legend item (default). "marker" - legend item marker. "none" - disables toggling of legend item. @since 5.0.13
- **fillField** (`undefined | string`) — A key to look up in data for a fill of the data item.
- **nameField** (`undefined | string`) — A key to look up in data for a name of the data item.
- **strokeField** (`undefined | string`) — A key to look up in data for a stroke of the data item.
- **useDefaultMarker** (`undefined | false | true`) — Default false If set to true the legend will not try to mimic appearance of the actual item but rather show default square marker.
