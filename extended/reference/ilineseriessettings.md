---
title: "ILineSeriesSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ilineseriessettings/"
scraped: "2026-03-15"
---

Inheritance
ILineSeriesSettings extends IXYSeriesSettings.
ILineSeriesSettings is extended by IRadarLineSeriesSettings, IDrawingSeriesSettings, ISmoothedYLineSeriesSettings, ISmoothedXLineSeriesSettings, SmoothedXYLineSeriesProperties, IStepLineSeriesSettings, ICurveLineSeriesSettings.
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

Extends: IXYSeriesSettings
Extended by: IRadarLineSeriesSettings, IDrawingSeriesSettings, ISmoothedYLineSeriesSettings, ISmoothedXLineSeriesSettings, SmoothedXYLineSeriesProperties, IStepLineSeriesSettings, ICurveLineSeriesSettings

> **Note:** This class also inherits all settings, properties, methods, and events from IXYSeriesSettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **autoGapCount** (`undefined | number`) — Default 1.1 If there are more than autoGapCount base time intervals (e.g. days) with no data, the line will break and will display gap. Click here for more info
- **connect** (`undefined | false | true`) — Default true If set to true the line will connect over "gaps" - categories or time intervals with no data. Click here for more info
- **minDistance** (`undefined | number`) — Default 0 Allows simplifying the line with many points. If set, the series will skip points that are closer than X pixels to each other. With many data points, this allows having smoother, less cluttered lines. @since 5.2.7
