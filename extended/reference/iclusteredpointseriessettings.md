---
title: "IClusteredPointSeriesSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iclusteredpointseriessettings/"
scraped: "2026-03-15"
---

Inheritance
IClusteredPointSeriesSettings extends IMapPointSeriesSettings.
IClusteredPointSeriesSettings is not extended by any other symbol.
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

Extends: IMapPointSeriesSettings

> **Note:** This class also inherits all settings, properties, methods, and events from IMapPointSeriesSettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **clusterDelay** (`undefined | number`) — Default 0 Delay in milliseconds before clustering is made. This is useful if you have many data items and want to avoid re-clustering on every zoom/position change. @since 5.9.11
- **clusteredBullet** (`undefined | ( root: Root, series: ClusteredPointSeries, dataItem: DataItem) => Bullet | undefined`) — Set this to a Bullet instance which will be used to show groups. Click here for more info
- **groupIdField** (`undefined | string`) — Default groupID Series data can contain a field with an ID of a virtual group the bullet belongs to. For example, we migth want bullets to group with other bullets from the same continent. groupIdField specifies which field in source data holds group IDs. Click here for more info
- **minDistance** (`undefined | number`) — Default 20 Bullets that are closer than X pixels apart, will be automatically grouped. Click here for more info
- **scatterDistance** (`undefined | number`) — Default 5 If bullets are closer to each other than scatterDistance, they will be scattered so that all are visible. Click here for more info @since 5.5.7
- **scatterRadius** (`undefined | number`) — Default 8 Presumed radius of a each bullet when scattering them. Click here for more info @since 5.5.7
- **stopClusterZoom** (`undefined | number`) — Default 0.95 If a map is zoomed to a maxZoomLevel * stopClusterZoom, clusters will be disabled. Click here for more info @since 5.5.7
