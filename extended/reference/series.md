---
title: "Series"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/series/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Base class of all series.

## Import

```js
import * as am5 from "@amcharts/amcharts5";
```

## Inheritance

Extends: Component → Container → Sprite → Entity → Settings
Extended by: Flow, FlowNodes, Hierarchy, Legend, MapSankeyNodes, MapSeries, PercentSeries, Venn, WordCloud, XYSeries

## Settings and related interfaces

- Settings: `ISeriesSettings` — get_api_reference shows it after this page
- Private settings: `ISeriesPrivate`
- Events: `ISeriesEvents`
- Data item fields: `ISeriesDataItem`

## Properties

Public properties (not settings):

- **bullets** (`List<(<D extends DataItem<this["_dataItemSettings"]>>(root: Root, series: Series, dataItem: D) => Bullet | undefined)>`) — Functions that make the series' bullets: each is called for every data item and returns a `Bullet`, or nothing for no bullet. Docs: https://www.amcharts.com/docs/v5/concepts/common-elements/bullets/
- **bulletsContainer** (`Container`) — The `Container` that holds the series' bullets.
- **chart** (`Chart`) — The chart the series belongs to.
