---
title: "NightSeries"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/nightseries/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Shades the part of a map where it is night, with the twilight in steps, and shows the sun.

Set `sunDate` (e.g. `"now"`) or `sunPosition`. The night is styled through `mapPolygons.template`: `fill`, and `fillOpacity` for how dark full night is.

_Since 5.21.0._ Docs: https://www.amcharts.com/docs/v5/charts/map-chart/night-series/

## Import

```js
import * as am5map from "@amcharts/amcharts5/map";

am5map.NightSeries.new(root, { /* settings */ });
```

## Inheritance

Extends: MapPolygonSeries → MapSeries → Series → Component → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `INightSeriesSettings` — get_api_reference shows it after this page
- Private settings: `INightSeriesPrivate`
- Data item fields: `INightSeriesDataItem`
