---
title: "ZoomTools"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/zoomtools/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Home, zoom-in and zoom-out buttons for a zoomable `target`.

_Since 5.8.0._

## Import

```js
import * as am5 from "@amcharts/amcharts5";

am5.ZoomTools.new(root, { /* settings */ });
```

## Inheritance

Extends: Container → Sprite → Entity → Settings
Extended by: ZoomControl

## Settings and related interfaces

- Settings: `IZoomToolsSettings` — get_api_reference shows it after this page
- Private settings: `IZoomToolsPrivate`
- Events: `IZoomToolsEvents`

## Properties

Public properties (not settings):

- **homeButton** (`Button`) — The `Button` that takes the target back to its home view.
- **minusButton** (`Button`) — The `Button` that zooms out.
- **plusButton** (`Button`) — The `Button` that zooms in.
