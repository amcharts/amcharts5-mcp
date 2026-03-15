---
title: "IXYChartSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ixychartsettings/"
scraped: "2026-03-15"
---

Inheritance
IXYChartSettings extends ISerialChartSettings.
IXYChartSettings is extended by IRadarChartSettings, IStockPanelSettings, ICurveChartSettings.
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

Extends: ISerialChartSettings
Extended by: IRadarChartSettings, IStockPanelSettings, ICurveChartSettings

> **Note:** This class also inherits all settings, properties, methods, and events from ISerialChartSettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **arrangeTooltips** (`undefined | false | true`) — Default true If set to false the chart will not check for overlapping of multiple tooltips, and will not arrange them to not overlap. Will work only if chart has an XYCursor enabled. Click here for more info
- **cursor** (`XYCursor`) — Chart's cursor. Click here for more info
- **maxTooltipDistance** (`undefined | number`) — If not set (default), cursor will show tooltips for all data items in the same category/date. If set, cursor will select closest data item to pointer (mouse or touch) and show tooltip for it. It will also show tooltips for all data items that are within X pixels range (as set in maxTooltipDistance). Tooltips for data items farther then X pixels, will not be shown. NOTE: set it to -1 to ensure only one tooltip is displayed, even if there are multiple data items in the same place. Click here for more info
- **maxTooltipDistanceBy** (`"xy" | "x" | "y"`) — Indicates how the distance should be measured when assessing distance between tooltips as set in maxTooltipDistance. Click here for more info @since 5.2.6
- **panX** (`undefined | false | true`) — If this is set to true, users will be able to pan the chart horizontally by dragging plot area. Click here for more info
- **panY** (`undefined | false | true`) — If this is set to true, users will be able to pan the chart vertically by dragging plot area. Click here for more info
- **pinchZoomX** (`undefined | false | true`) — Default false If set to true, using pinch gesture on the chart's plot area will zoom chart horizontally. NOTE: this setting is not supported in a RadarChart. Click here for more info @since 5.1.8
- **pinchZoomY** (`undefined | false | true`) — Default false If set to true, using pinch gesture on the chart's plot area will zoom chart vertically. NOTE: this setting is not supported in a RadarChart. Click here for more info @since 5.1.8
- **scrollbarX** (`Scrollbar`) — horizontal scrollbar. Click here for more info
- **scrollbarY** (`Scrollbar`) — Vertical scrollbar.
- **wheelStep** (`undefined | number`) — Default 0.25 Indicates the relative "speed" of the mouse wheel.
- **wheelX** (`"zoomX" | "zoomY" | "zoomXY" | "panX" | "panY" | "panXY" | "none"`) — Indicates what happens when mouse wheel is spinned horizontally while over plot area. Click here for more info
- **wheelY** (`"zoomX" | "zoomY" | "zoomXY" | "panX" | "panY" | "panXY" | "none"`) — Indicates what happens when mouse wheel is spinned vertically while over plot area. Click here for more info
- **wheelZoomPositionX** (`undefined | number`) — If set, will use this relative position as a "center" for mouse wheel horizontal zooming instead of actual cursor position. Click here for more info @since 5.2.11
- **wheelZoomPositionY** (`undefined | number`) — If set, will use this relative position as a "center" for mouse wheel vertical zooming instead of actual cursor position. Click here for more info @since 5.2.11
