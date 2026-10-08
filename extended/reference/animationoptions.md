---
title: "AnimationOptions"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/animationoptions/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Animation options.

Docs: https://www.amcharts.com/docs/v5/concepts/animations/

## Inheritance

Extends: (none)
TypeScript: not exported by name from the package.

## Options

- **key** (`Key`) — The setting to animate.
- **from** (`Value`) — Value to start from. The current value if not set.
- **to** (`Value`) — Value to animate to.
- **duration** (`number`) — Duration in milliseconds. `0` sets the value at once.
- **easing** (`$ease.Easing`) — Easing function. Linear if not set. Docs: https://www.amcharts.com/docs/v5/concepts/animations/#Easing_functions
- **loops** (`number`) — How many times to play the animation; `Infinity` plays it forever. Plays once if not set.
