---
title: "Chord"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/chord/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Chord diagram: nodes as arcs around a circle, linked by ribbons. A node's arc shows its outgoing total, and a ribbon is as wide at each end as the flow out of that end, so a one-way link narrows to a point at its target. For one-way flows, see `ChordDirected`.

Docs: https://www.amcharts.com/docs/v5/charts/flow-charts/

## Import

```js
import * as am5flow from "@amcharts/amcharts5/flow";

am5flow.Chord.new(root, { /* settings */ });
```

## Inheritance

Extends: Flow → Series → Component → Container → Sprite → Entity → Settings
Extended by: ChordDirected, ChordNonRibbon

## Settings and related interfaces

- Settings: `IChordSettings` — get_api_reference shows it after this page
- Private settings: `IChordPrivate`
- Events: `IChordEvents`
- Data item fields: `IChordDataItem`
