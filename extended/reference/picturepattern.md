---
title: "PicturePattern"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/picturepattern/"
scraped: "2026-03-15"
---

Picture pattern.
@since 5.2.15

## Import

```javascript
// Import PicturePattern
import * as am5 from "@amcharts/amcharts5"
```

## Inheritance

Extends: Pattern

> **Note:** This class also inherits all settings, properties, methods, and events from Pattern (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **canvas** (`HTMLCanvasElement`) — (no description)
- **centered** (`undefined | false | true`) — Default true Center images.
- **fit** (`"image" | "pattern" | "none"`) — Default "image" How pattern should be sized: "image" (default) - pattern will be sized to actual image dimensions. "pattern" - image will sized to image dimensions. "none" - image will be placed in the pattern, regardless of either dimensions.
- **src** (`undefined | string`) — A source URI of the image. Can be relative or absolute URL, or data-uri.
