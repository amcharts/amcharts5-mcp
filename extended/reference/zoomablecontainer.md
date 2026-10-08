---
title: "ZoomableContainer"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/zoomablecontainer/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

A `Container` whose `contents` can be zoomed with the wheel, a pinch or `ZoomTools`, and panned by dragging.

_Since 5.8.0._ Docs: https://www.amcharts.com/docs/v5/concepts/common-elements/containers/#Zoomable_container

## Import

```js
import * as am5 from "@amcharts/amcharts5";

am5.ZoomableContainer.new(root, { /* settings */ });
```

## Inheritance

Extends: Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IZoomableContainerSettings` — get_api_reference shows it after this page
- Private settings: `IZoomableContainerPrivate`
- Events: `IZoomableContainerEvents`

## Properties

Public properties (not settings):

- **contents** (`Container`) — The container that zooms and pans. Add elements to `contents.children`, not to the ZoomableContainer's own `children`. Docs: https://www.amcharts.com/docs/v5/concepts/common-elements/containers/#Zoomable_container
