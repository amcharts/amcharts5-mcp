---
title: "Treemap"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/treemap/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

A treemap: nodes as rectangles sized by value, each inside its parent's rectangle. A click on a node zooms into it.

Docs: https://www.amcharts.com/docs/v5/charts/hierarchy/treemap/

## Import

```js
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";

am5hierarchy.Treemap.new(root, { /* settings */ });
```

## Inheritance

Extends: Hierarchy → Series → Component → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `ITreemapSettings` — get_api_reference shows it after this page
- Private settings: `ITreemapPrivate`
- Data item fields: `ITreemapDataItem`

## Properties

Public properties (not settings):

- **rectangles** (`ListTemplate<RoundedRectangle>`) — List of node rectangles; configure them all through `rectangles.template`.
- **rectangleTemplate** (`Template<RoundedRectangle>`)
