---
title: "Link"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/link/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

A connector made of horizontal and vertical segments through `points`, with an arrow at each end, such as a dependency line in a Gantt chart.

Docs: https://www.amcharts.com/docs/v5/concepts/common-elements/graphics/

## Import

```js
import * as am5 from "@amcharts/amcharts5";

am5.Link.new(root, { /* settings */ });
```

## Inheritance

Extends: Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `ILinkSettings` — get_api_reference shows it after this page
- Private settings: `ILinkPrivate`

## Properties

Public properties (not settings):

- **endArrow** (`Triangle`) — The arrow at the last point.
- **hitLine** (`OrthogonalLine`) — A wider, invisible copy of the line that makes the link easier to hover and click.
- **line** (`OrthogonalLine`) — The visible line.
- **startArrow** (`Triangle`) — The arrow at the first point.
