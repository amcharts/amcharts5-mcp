---
title: "Pack"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/pack/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

A pack diagram: nodes as circles sized by value, each inside its parent's circle. A click on a node zooms into it.

Docs: https://www.amcharts.com/docs/v5/charts/hierarchy/pack/

## Import

```js
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";

am5hierarchy.Pack.new(root, { /* settings */ });
```

## Inheritance

Extends: Hierarchy → Series → Component → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IPackSettings` — get_api_reference shows it after this page
- Private settings: `IPackPrivate`
- Events: `IPackEvents`
- Data item fields: `IPackDataItem`

## Properties

Public properties (not settings):

- **circles** (`ListTemplate<Circle>`) — List of node circles; configure them all through `circles.template`.
