---
title: "IOverboughtOversoldSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ioverboughtoversoldsettings/"
scraped: "2026-03-15"
---

Inheritance
IOverboughtOversoldSettings extends IChartIndicatorSettings.
IOverboughtOversoldSettings is extended by ICommodityChannelIndexSettings, IRelativeStrengthIndexSettings, IStochasticMomentumIndexSettings, IStochasticOscillatorSettings, IWilliamsRSettings.
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
Extended by: ICommodityChannelIndexSettings, IRelativeStrengthIndexSettings, IStochasticMomentumIndexSettings, IStochasticOscillatorSettings, IWilliamsRSettings

> **Note:** This class also inherits all settings, properties, methods, and events from IChartIndicatorSettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **overBought** (`undefined | number`) — A value for "overbought" threshold.
- **overBoughtColor** (`Color`) — A color for "overbought" section.
- **overSold** (`undefined | number`) — A value for "oversold" threshold.
- **overSoldColor** (`Color`) — A color for "oversold" section.
