---
title: "IValueAxisSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ivalueaxissettings/"
scraped: "2026-03-15"
---

Inheritance
IValueAxisSettings extends IAxisSettings.
IValueAxisSettings is extended by IDateAxisSettings, IDurationAxisSettings.
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

Extends: IAxisSettings
Extended by: IDateAxisSettings, IDurationAxisSettings

> **Note:** This class also inherits all settings, properties, methods, and events from IAxisSettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **autoZoom** (`undefined | false | true`) — Default true If set to false, the axis won't be auto-zoomed to a selection (this works only if the other axis is a DateAxis or a CategoryAxis). IMPORTANT: This setting will be ignored if both X and Y axes are a ValueAxis. @since 5.2.20
- **baseValue** (`undefined | number`) — Default 0 Base value, which indicates the threshold between "positive" and "negative" values. Click here for more info
- **calculateTotals** (`undefined | false | true`) — If your series relies on dynamically calculated values, like value changes, percents, or total sums, set this to true. Click here for more info
- **extraMax** (`undefined | number`) — Relative extension to the automatically-calculated maximum value of the axis scale. E..g. 0.1 will extend the scale by 10%, so if max value is 1000, the axis will now show maximum value of 1100. Click here for more info
- **extraMin** (`undefined | number`) — Relative extension to the automatically-calculated minimum value of the axis scale. E..g. 0.1 will extend the scale by 10%, so if max value is 1000 and minimum value is 0, the new minimum value will be -100. Click here for more info
- **extraTooltipPrecision** (`undefined | number`) — If set, will use greater precision for the axis tooltip than the one for axis' actual labels. E.g. if axis displays labels with one decimal (1.0, 1.1, 1.2) setting this setting to 1 would allow two decimals in axis tooltip, e.g. 1.15. Click here for more info
- **fillRule** (`undefined | ( dataItem: DataItem) => void`) — A function that can be used to specify how to configure axis fills. Click here for more info
- **logarithmic** (`undefined | false | true`) — If set to true axis will use logarithmic scale. Click here for more info
- **max** (`undefined | number`) — Override maximum value for the axis scale. NOTE: the axis might modify the maximum value to fit into its scale better, unless strictMinMax is set to true. Click here for more info
- **maxPrecision** (`undefined | number`) — Maximum number of decimals to allow in axis labels. This setting not only affects formatting of the labels, but also where and how many grid/labels are placed on the axis. Click here for more info
- **min** (`undefined | number`) — Override minimum value for the axis scale. NOTE: the axis might modify the minimum value to fit into its scale better, unless strictMinMax is set to true. Click here for more info
- **numberFormat** (`undefined | string`) — Number format to use for axis labels. If not set, will use format set in global number formatter. Click here for more info
- **strictMinMax** (`undefined | false | true`) — Force axis scale to be precisely at values as set in min and/or max. In case min and/or max is not set, the axis will fix its scale to precise lowest and highest values available through all of the series attached to it. This effectively locks the axis from auto-zooming itself when chart is zoomed in. If you need to zoom to actual low/high values within currently visible scope, use strictMinMaxSelection instead. Use extraMin and extraMax to add extra "padding". Click here for more info
- **strictMinMaxSelection** (`undefined | false | true`) — Force axis to auto-zoom to exact lowest and highest values from attached series' data items within currently visible range. This is a good feature when your series is plotted from derivative values, like valueYChangeSelection as it helps to avoid frequent jumping of series to adjusted min and max of the axis. This will not work if strictMinMax is set to true (the axis will not zoom at all in this case). Use extraMin and extraMax to add extra "padding". @since 5.1.11
- **syncWithAxis** (`ValueAxis`) — This setting can be set to an instance of another ValueAxis. If set the grid of this axis will be synced with grid of the target axis. NOTE: this is not 100% guaranteed to work. In some rare cases perfect sync might not be possible. Click here for more info
- **tooltipNumberFormat** (`string | NumberFormatOptions`) — A numeric format used for numbers displayed in axis tooltip. Click here for more info
- **treatZeroAs** (`undefined | number`) — Treat zero values as some other value. Useful in situations where zero would result in error, i.e. logarithmic scale. Click here for more info
