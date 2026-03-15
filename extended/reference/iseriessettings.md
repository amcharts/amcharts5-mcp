---
title: "ISeriesSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iseriessettings/"
scraped: "2026-03-15"
---

Inheritance
ISeriesSettings extends IComponentSettings.
ISeriesSettings is extended by IFlowSettings, IFlowNodesSettings, IPercentSeriesSettings, ILegendSettings, IXYSeriesSettings, IHierarchySettings, IMapSeriesSettings, IVennSettings, IWordCloudSettings.
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

Extends: IComponentSettings
Extended by: IFlowSettings, IFlowNodesSettings, IPercentSeriesSettings, ILegendSettings, IXYSeriesSettings, IHierarchySettings, IMapSeriesSettings, IVennSettings, IWordCloudSettings

> **Note:** This class also inherits all settings, properties, methods, and events from IComponentSettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **calculateAggregates** (`undefined | false | true`) — If set to true, series will calculate aggregate values, e.g. change percent, high, low, etc. Do not enable unless you are using such aggregate values in tooltips, display data fields, heat rules, or similar.
- **customValueField** (`undefined | string`) — A key to look up in data for a numeric customValue of the data item. Usually used for storing additional numeric information and heat rules.
- **excludeFromAggregate** (`Array`) — A list of field names to exclude from automatic aggregation when calculateAggregates is enabled. Use it to optimize performance by disabling automatic aggregation for data fields where aggregate values are not needed. @since 5.14.4
- **fill** (`Color`) — Series fill color. Click here for more info
- **fillPattern** (`Pattern`) — Series fill pattern. Click here for more info @since 5.10.0
- **heatRules** (`IHeatRule[]`) — A list of heat rules to apply on series elements. Click here for more info
- **idField** (`undefined | string`) — A key to look up in data for an id of the data item.
- **legendDataItem** (`DataItem`) — A data item representing series in a Legend. @readonly
- **legendLabelText** (`undefined | string`) — A text template to be used for label in legend.
- **legendValueText** (`undefined | string`) — A text template to be used for value label in legend.
- **name** (`undefined | string`) — Name of the series.
- **sequencedDelay** (`undefined | number`) — A delay in milliseconds to wait before starting animation of next data item. Click here for more info
- **sequencedInterpolation** (`undefined | false | true`) — If set to true the series initial animation will be played item by item rather than all at once. Click here for more info
- **stroke** (`Color`) — Series stroke color. Click here for more info
- **valueField** (`undefined | string`) — A key to look up in data for a numeric value of the data item. Some series use it to display its elements. It can also be used in heat rules.
