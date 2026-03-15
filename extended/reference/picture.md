---
title: "Picture"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/picture/"
scraped: "2026-03-15"
---

Displays an image.

## Import

```javascript
// Import Picture
import * as am5 from "@amcharts/amcharts5"
```

## Inheritance

Extends: Sprite

> **Note:** This class also inherits all settings, properties, methods, and events from Sprite (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **cors** (`string | null`) — CORS settings for loading the image. Defaults to "anonymous". @since 5.3.6 Click here for more info
- **shadowBlur** (`undefined | number`) — Blurriness of the the shadow. The bigger the number, the more blurry shadow will be. Click here for more info
- **shadowColor** (`Color | null`) — Color of the element's shadow. For this to work at least one of the following needs to be set as well: shadowBlur, shadowOffsetX, shadowOffsetY. Click here for more info
- **shadowOffsetX** (`undefined | number`) — Horizontal shadow offset in pixels. Click here for more info
- **shadowOffsetY** (`undefined | number`) — Vertical shadow offset in pixels. Click here for more info
- **shadowOpacity** (`undefined | number`) — Opacity of the shadow (0-1). If not set, will use the same as fillOpacity of the element. Click here for more info
- **src** (`undefined | string`) — A source URI of the image. Can be relative or absolute URL, or data-uri.
