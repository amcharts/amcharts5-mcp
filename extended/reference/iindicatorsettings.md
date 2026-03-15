---
title: "IIndicatorSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iindicatorsettings/"
scraped: "2026-03-15"
---

Inheritance
IIndicatorSettings extends IContainerSettings.
IIndicatorSettings is extended by IAccelerationBandsSettings, IChartIndicatorSettings, IMovingAverageSettings, IMACrossSettings, ISuperTrendSettings, IVolumeProfileSettings, IVWAPSettings, IZigZagSettings.
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
Extended by: IAccelerationBandsSettings, IChartIndicatorSettings, IMovingAverageSettings, IMACrossSettings, ISuperTrendSettings, IVolumeProfileSettings, IVWAPSettings, IZigZagSettings

> **Note:** This class also inherits all settings, properties, methods, and events from IContainerSettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **autoOpenSettings** (`undefined | false | true`) — Default true Should indicator settings modal be openend automatically when indicator is added to a chart via IndicatorControl. @since 5.10.6
- **field** (`"open" | "close" | "low" | "high" | "hl/2" | "hlc/3" | "hlcc/4" | "ohlc/4"`) — A value field to use.
- **legend** (`StockLegend`) — If set to a reference to StockLegend, indicator will add itself into the legend.
- **name** (`undefined | string`) — Indicator name, e.g. "Moving Average".
- **period** (`undefined | number`) — Period.
- **seriesColor** (`Color`) — A color to use for the indicator series.
- **shortName** (`undefined | string`) — Short name for the indicator, e.g. "MA" (for "Moving Average"). Mainly used for the legend.
- **stockChart** (`StockChart`) — An instance of target StockChart.
- **stockSeries** (`XYSeries`) — A main series indicator will be based on.
- **volumeSeries** (`XYSeries`) — A volume series indicator will be based on, if it reaquires one.
