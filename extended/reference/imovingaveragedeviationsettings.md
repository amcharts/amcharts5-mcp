---
title: "IMovingAverageDeviationSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/imovingaveragedeviationsettings/"
scraped: "2026-03-15"
---

Inheritance
IMovingAverageDeviationSettings extends IChartIndicatorSettings.
IMovingAverageDeviationSettings is not extended by any other symbol.
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

Extends: IChartIndicatorSettings

> **Note:** This class also inherits all settings, properties, methods, and events from IChartIndicatorSettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **decreasingColor** (`Color`) — Decreasing color.
- **increasingColor** (`Color`) — Increasing color.
- **type** (`"simple" | "weighted" | "exponential" | "dema" | "tema"`) — Default "simple" Type of the moving average.
- **unit** (`"points" | "percent"`) — Default "points" How units are calculated.
