---
title: "ClusteredPointSeries"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/clusteredpointseries/"
scraped: "2026-03-15"
---

A version of MapPointSeries which can automatically group closely located bullets into groups.

## Import

```javascript
// Import ClusteredPointSeries
import * as am5map from "@amcharts/amcharts5/map"
```

## Inheritance

Extends: MapPointSeries

> **Note:** This class also inherits all settings, properties, methods, and events from MapPointSeries (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **clusterDelay** (`undefined | number`) — Default 0 Delay in milliseconds before clustering is made. This is useful if you have many data items and want to avoid re-clustering on every zoom/position change. @since 5.9.11
- **clusteredBullet** (`undefined | ( root: Root, series: ClusteredPointSeries, dataItem: DataItem) => Bullet | undefined`) — Set this to a Bullet instance which will be used to show groups. Click here for more info
- **groupIdField** (`undefined | string`) — Default groupID Series data can contain a field with an ID of a virtual group the bullet belongs to. For example, we migth want bullets to group with other bullets from the same continent. groupIdField specifies which field in source data holds group IDs. Click here for more info
- **minDistance** (`undefined | number`) — Default 20 Bullets that are closer than X pixels apart, will be automatically grouped. Click here for more info
- **scatterDistance** (`undefined | number`) — Default 5 If bullets are closer to each other than scatterDistance, they will be scattered so that all are visible. Click here for more info @since 5.5.7
- **scatterRadius** (`undefined | number`) — Default 8 Presumed radius of a each bullet when scattering them. Click here for more info @since 5.5.7
- **stopClusterZoom** (`undefined | number`) — Default 0.95 If a map is zoomed to a maxZoomLevel * stopClusterZoom, clusters will be disabled. Click here for more info @since 5.5.7

## Properties

- **clusteredDataItems** (`Array`) — Default []
