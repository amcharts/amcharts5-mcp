---
title: "MapLineSeries"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/maplineseries/"
scraped: "2026-03-15"
---

Creates a map series for displaying lines on the map.

## Import

```javascript
// Import MapLineSeries
import * as am5map from "@amcharts/amcharts5/map"
```

## Inheritance

Extends: MapSeries
Extended by: GraticuleSeries

> **Note:** This class also inherits all settings, properties, methods, and events from MapSeries (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **clipBack** (`undefined | false | true`) — If set to true will hide line segments that are in the invisible range of the map. For example on the side of the globe facing away from the viewer when used with Orthographic projection. NOTE: not all projections have invisible side.
- **lineType** (`"curved" | "straight"`) — Default "curved" A line type. "curved" (default) - connects points using shortest distance, which will result in curved lines based on map projection. "straight" - connects points using visually straight lines, and will not cross the -180/180 longitude. @since 5.2.24

## Properties

- **mapLines** (`ListTemplate`) — Default new ListTemplate<MapLine> A ListTemplate of all lines in series. mapLines.template can also be used to configure lines.
