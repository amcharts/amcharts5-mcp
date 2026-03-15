---
title: "ClockHand"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/clockhand/"
scraped: "2026-03-15"
---

A clock hand for use with RadarChart.

## Import

```javascript
// Import ClockHand
import * as am5radar from "@amcharts/amcharts5/radar"
```

## Inheritance

Extends: Container

> **Note:** This class also inherits all settings, properties, methods, and events from Container (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **bottomWidth** (`undefined | number`) — Default 10 A width of the base of the clock hand, in pixels.
- **innerRadius** (`number | Percent`) — Default 0 Inner radius of the hand, in pixels, or percent (relative to the axis radius). If set to negative number, will mean number of pixels inwards from the axis.
- **pinRadius** (`number | Percent`) — Default 10 Radius of the hand pin (circle at the base of the hand), in pixels, or in percent (relative to the axis radius.)
- **radius** (`number | Percent`) — Default 90% Radius of the hand, in pixels, or percent (relative to the axis radius). If set to negative number, will mean number of pixels inwards from the axis.
- **topWidth** (`undefined | number`) — Default 1 A width of the tip of the clock hand, in pixels.

## Properties

- **hand** (`Graphics`) — Default Graphics.new() A "hand" element.
- **pin** (`Graphics`) — Default Graphics.new() A "pin" element (hand's base).
