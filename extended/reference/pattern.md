---
title: "Pattern"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/pattern/"
scraped: "2026-03-15"
---

Base class for patterns.

## Import

```javascript
// Import Pattern
import * as am5 from "@amcharts/amcharts5"
```

## Inheritance

Extends: Entity
Extended by: PicturePattern, LinePattern, GrainPattern, CirclePattern, RectanglePattern, PathPattern

> **Note:** This class also inherits all settings, properties, methods, and events from Entity (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **color** (`Color`) — Color of the pattern shape. Click here for more info
- **colorOpacity** (`undefined | number`) — Opacity of the pattern shape. Click here for more info
- **fill** (`Color`) — Color to fill gaps between pattern shapes. Click here for more info
- **fillOpacity** (`undefined | number`) — Opacity of the fill for gaps between pattern shapes. Click here for more info
- **height** (`undefined | number`) — Width of the pattern tile, in pixels. Click here for more info
- **repetition** (`"repeat" | "repeat-x" | "repeat-y" | "no-repeat"`) — How pattern tiles are repeated when filling the area. Click here for more info
- **rotation** (`undefined | number`) — Default 0 Rotation of patterm in degrees. Supported values: -90 to 90. Click here for more info
- **strokeDasharray** (`number[] | number`) — Stroke (border or line) dash settings. Click here for more information
- **strokeDashoffset** (`undefined | number`) — Stroke (border or line) dash offset. Click here for more information
- **strokeWidth** (`undefined | number`) — Default 1 Width of the pattern's line elements.

## Properties

- **pattern** (`IPattern | undefined | null`) — (no description)

## Events

- **pattern** (`IPattern | undefined | null`) — (no description)
