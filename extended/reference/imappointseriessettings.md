---
title: "IMapPointSeriesSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/imappointseriessettings/"
scraped: "2026-03-15"
---

Inheritance
IMapPointSeriesSettings extends IMapSeriesSettings.
IMapPointSeriesSettings is extended by IClusteredPointSeriesSettings.
Properties


        active        
        #
      


                          Type undefined | false | true                      
Inherited from ISpriteSettings
Indicates if element is currently active.


        affectsBounds        
        #
      


                          Type undefined | false | true                      
Default true
Inherited from IMapSeriesSettings
All map series will determine the actual bounds shown in the MapChart.
 If we need a series to be ignored while calculating the bounds, we can set this to false.
 Especially useful for background series.
@since 5.2.36


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

Extends: IMapSeriesSettings
Extended by: IClusteredPointSeriesSettings

> **Note:** This class also inherits all settings, properties, methods, and events from IMapSeriesSettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **autoRotateAngleField** (`undefined | string`) — Default "autoRotateAngle" A field in data that holds an angle added to the automatically calculated rotation. A value from data wins over the bullet's `autoRotateAngle`. @since 5.20.6
- **autoRotateField** (`undefined | string`) — Default "autoRotate" A field in data that holds whether the point rotates to face the direction of the line it is attached to. A value from data wins over the bullet's `autoRotate`. @since 5.20.6
- **autoScale** (`undefined | false | true`) — Default false If set to true, bullets will resize when zooming the MapChart. @since 5.2.8
- **clipBack** (`undefined | false | true`) — Default true If set to true will hide all points that are in the invisible range of the map. For example on the side of the globe facing away from the viewer when used with Orthographic projection. NOTE: not all projections have invisible side.
- **clipFront** (`undefined | false | true`) — Default false If set to true will hide all points that are in the visible range of the map.
- **fixedField** (`undefined | string`) — A field in data that holds information if this point is fixed or moves with a map.
- **latitudeField** (`undefined | string`) — Default "latitude" A field in data that holds point's latitude.
- **lineIdField** (`undefined | string`) — Default "lineId" A field in data that holds an ID of a MapLine the point is attached to. The line is looked up by its data `id` in a MapLineSeries of the same chart (pushing the line series before the point series is a safe precaution). With this and positionOnLineField, points on lines can come from data rows instead of `pushDataItem({ lineDataItem, positionOnLine })` — and data rows are part of a serialized config, pushed data items are not. @since 5.20.6
- **longitudeField** (`undefined | string`) — Default "longitude" A field in data that holds point's longitude.
- **positionOnLineField** (`undefined | string`) — Default "positionOnLine" A field in data that holds a relative position (0-1) of the point on the line it is attached to. @since 5.20.6
- **polygonIdField** (`undefined | string`) — A field in data that holds an ID of the related polygon. If set, the point will be positioned in the visual center of the target polygon.
