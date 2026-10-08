---
title: "IMapLineSeriesDataItem"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/imaplineseriesdataitem/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IMapSeriesDataItem
All ancestors: IMapSeriesDataItem, ISeriesDataItem, IComponentDataItem
TypeScript: `am5map.IMapLineSeriesDataItem` (`import type { IMapLineSeriesDataItem } from "@amcharts/amcharts5/map"`)

## Data item fields

- **mapLine** (`MapLine`) — The line that shows the data item.
- **geometry** (`LineString | MultiLineString`) — GeoJSON geometry of the line.
- **pointsToConnect** (`DataItem<IMapPointSeriesDataItem>[]`) — Data items of a `MapPointSeries` for the line to connect, in order. The line follows them when they move. Fixed points can't be used.
- **pointIds** (`string[]`) — Ids of the points for the line to connect, looked up in `pointSeries`. The line follows the points, and a config holds just the ids. The line isn't drawn until every id matches a point, so it is never drawn short. Fixed points can't be used. Ignored if `pointsToConnect` is set. _Since 5.20.3._
- **lineType** (`"curved" | "straight"`) — default `"curved"` — How the line runs between its points, instead of the series' `lineType`: • `"curved"` - along the shortest path on the globe, which the projection may bend. • `"straight"` - in straight lines on screen, never across the 180th meridian. _Since 5.2.32._

## Other inherited data item fields

Names only — see the declaring interface's page (e.g. `get_api_reference("IMapSeriesDataItem")`) for types, defaults and descriptions.

- _IMapSeriesDataItem_: geometryType, value
- _ISeriesDataItem_: customValue, customValueChange, customValueChangePercent, customValueChangePrevious, customValueChangePreviousPercent, customValueChangeSelection, customValueChangeSelectionPercent, customValueWorking, id, url, valueChange, valueChangePercent, valueChangePrevious, valueChangePreviousPercent, valueChangeSelection, valueChangeSelectionPercent, valueWorking, valueWorkingClose, valueWorkingOpen
- _IComponentDataItem_: visible
