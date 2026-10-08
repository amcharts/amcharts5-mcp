---
title: "Measure"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/measure/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Measure drawing tool: a rectangle between two points that shows the price change and the time between them.

## Import

```js
import * as am5stock from "@amcharts/amcharts5/stock";

am5stock.Measure.new(root, { /* settings */ });
```

## Inheritance

Extends: RectangleSeries → SimpleLineSeries → DrawingSeries → LineSeries → XYSeries → Series → Component → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IMeasureSettings` — get_api_reference shows it after this page
- Private settings: `IMeasurePrivate`
- Data item fields: `IMeasureDataItem`

## Properties

Public properties (not settings):

- **labels** (`ListTemplate<Label>`) — Labels of the measurements. Settings on `labels.template` apply to all of them.
