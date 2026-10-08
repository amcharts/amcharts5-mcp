---
title: "ChordNodes"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/chordnodes/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Holds the nodes of a `Chord` series. Dragging a node rotates the whole chord.

## Import

```js
import * as am5flow from "@amcharts/amcharts5/flow";

am5flow.ChordNodes.new(root, { /* settings */ });
```

## Inheritance

Extends: FlowNodes → Series → Component → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IChordNodesSettings` — get_api_reference shows it after this page
- Private settings: `IChordNodesPrivate`
- Events: `IChordNodesEvents`
- Data item fields: `IChordNodesDataItem`

## Properties

Public properties (not settings):

- **flow** (`Chord`) — Related `Chord` series.
- **labels** (`ListTemplate<RadialLabel>`) — List of node labels; configure them all through `labels.template`.
- **slices** (`ListTemplate<Slice>`) — List of the nodes' arcs; configure them all through `slices.template`.
