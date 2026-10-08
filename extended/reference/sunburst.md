---
title: "Sunburst"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/sunburst/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

A sunburst diagram: the hierarchy as rings of slices, each level a ring further out, each node spanning as much of its ring as its value. A click on a node zooms into it.

Docs: https://www.amcharts.com/docs/v5/charts/hierarchy/sunburst/

## Import

```js
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";

am5hierarchy.Sunburst.new(root, { /* settings */ });
```

## Inheritance

Extends: Partition → Hierarchy → Series → Component → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `ISunburstSettings` — get_api_reference shows it after this page
- Private settings: `ISunburstPrivate`
- Data item fields: `ISunburstDataItem`

## Properties

Public properties (not settings):

- **labels** (`ListTemplate<RadialLabel>`) — List of node labels; configure them all through `labels.template`.
- **slices** (`ListTemplate<Slice>`) — List of node slices; configure them all through `slices.template`.
