---
title: "ClockHand"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/clockhand/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

A gauge needle for a `RadarChart`. Set it as the `sprite` of an axis data item's `AxisBullet`, and it points at that data item's value.

Docs: https://www.amcharts.com/docs/v5/charts/radar-chart/gauge-charts/#Clock_hands

## Import

```js
import * as am5radar from "@amcharts/amcharts5/radar";

am5radar.ClockHand.new(root, { /* settings */ });
```

## Inheritance

Extends: Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IClockHandSettings` — get_api_reference shows it after this page
- Private settings: `IClockHandPrivate`

## Properties

Public properties (not settings):

- **hand** (`Graphics`) — default `Graphics.new()` — The hand itself, a tapered shape from `innerRadius` to `radius`.
- **pin** (`Graphics`) — default `Graphics.new()` — The pin: a circle at the center, of `pinRadius`.
