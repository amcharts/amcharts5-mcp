---
title: "Venn"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/venn/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

A Venn diagram: circles sized by their values, overlapping as much as the values of their overlaps say.

Docs: https://www.amcharts.com/docs/v5/charts/venn/

## Import

```js
import * as am5venn from "@amcharts/amcharts5/venn";

am5venn.Venn.new(root, { /* settings */ });
```

## Inheritance

Extends: Series → Component → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IVennSettings` — get_api_reference shows it after this page
- Private settings: `IVennPrivate`
- Data item fields: `IVennDataItem`

## Properties

Public properties (not settings):

- **hoverGraphics** (`Graphics`) — default `Graphics.new()` — Drawn over the hovered slice, in its shape.
- **labels** (`ListTemplate<Label>`) — All slice labels of the series. Configure them through `labels.template`.
- **labelsContainer** (`Container`) — default `Container.new()` — Holds all labels.
- **slices** (`ListTemplate<Graphics>`) — All slices of the series. Configure them through `slices.template`.
- **slicesContainer** (`Container`) — default `Container.new()` — Holds all slices: circles and overlaps.
