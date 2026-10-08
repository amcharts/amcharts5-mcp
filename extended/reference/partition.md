---
title: "Partition"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/partition/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

A partition (icicle) diagram: each level is a row of rectangles (a column, when horizontal), and each node spans as much of it as its value. A click on a node zooms into it.

Docs: https://www.amcharts.com/docs/v5/charts/hierarchy/partition/

## Import

```js
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";

am5hierarchy.Partition.new(root, { /* settings */ });
```

## Inheritance

Extends: Hierarchy → Series → Component → Container → Sprite → Entity → Settings
Extended by: Sunburst

## Settings and related interfaces

- Settings: `IPartitionSettings` — get_api_reference shows it after this page
- Private settings: `IPartitionPrivate`
- Data item fields: `IPartitionDataItem`

## Properties

Public properties (not settings):

- **rectangles** (`ListTemplate<RoundedRectangle>`) — List of node rectangles; configure them all through `rectangles.template`.
