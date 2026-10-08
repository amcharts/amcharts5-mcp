---
title: "Animation"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/animation/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

An animation of a setting, returned by `animate()`. It can be paused, resumed, stopped or waited for.

Docs: https://www.amcharts.com/docs/v5/concepts/animations/

## Import

Not exported from any `@amcharts/amcharts5` entry point (internal class).

## Inheritance

Extends: (none)

## Settings and related interfaces

- Events: `IAnimationEvents`

## Properties

Public properties (not settings):

- **events** (`EventDispatcher<Events<this, IAnimationEvents>>`)
- **from** (`Value`) — The value the animation starts from.
- **percentage** (`Time`) — How far the current loop has played, from `0` to `1`, before easing.
- **playing** (`boolean`) — `true` while the animation plays, `false` when it is paused or stopped.
- **stopped** (`boolean`) — `true` once the animation has stopped. A stopped animation can't be played again.
- **to** (`Value`) — The value the animation goes to.
