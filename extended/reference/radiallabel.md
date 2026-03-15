---
title: "RadialLabel"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/radiallabel/"
scraped: "2026-03-15"
---

Sources
RadialLabel can be used (imported) via one of the following packages.
// Import RadialLabel
import * as am5 from "@amcharts/amcharts5";

// Create RadialLabel
am5.RadialLabel.new(root, {
  // ... config if applicable
});

<!-- Load RadialLabel -->
<script src="index.js"></script>

<script>
// Create RadialLabel
am5.RadialLabel.new(root, {
  // ... config if applicable
});
</script>

## Import

```javascript
// Import RadialLabel
import * as am5 from "@amcharts/amcharts5"
```

## Inheritance

Extends: Label
Extended by: AxisLabelRadial

> **Note:** This class also inherits all settings, properties, methods, and events from Label (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **baseRadius** (`number | Percent`) — Default 100% Radius of the label's position. Can be either set in absolute pixel value, or percent. Relative value, depending on the situation, will most often mean its position within certain circular object, like a slice: 0% meaning inner edge, and 100% - the outer edge.
- **inside** (`undefined | false | true`) — Default false Should label be drawn inside (true) or outside (false) the arc.
- **kerning** (`undefined | number`) — Default 0 Extra spacing between characters, in pixels.
- **labelAngle** (`undefined | number`) — Label anngle in degrees. In most cases it will be set by the chart/series and does not need to be set manually.
- **orientation** (`"inward" | "outward" | "auto"`) — Default "auto" Should the text "face" inward or outward from the arc the text is following. "auto" means that facing will be chosen automatically based on the angle to enhance readbility. Only applies if type = "circluar".
- **radius** (`undefined | number`) — Pixel value to adjust radius with. Will add to (or subtract from if negative) whatever value baseRadius evaluates to.
- **textType** (`"regular" | "circular" | "radial" | "aligned" | "adjusted"`) — Default "regular" Label type. "regular" (default) - normal horizontal label. "circular" - arched label. "radial" - label radiating from the center of the arc. "aligned" - horizontal label aligned with other labels horizontally. "adjusted" - horizontal label adjusted in postion. IMPORTANT!** If the label is used in a PieSeries, its alignLabels setting (default: true) takes precedence over textType. If you need to set this to anything else than regular, make sure you also set alignLabels: falese on PieSeries.
