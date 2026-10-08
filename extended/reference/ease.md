---
title: "ease"
type: "namespace"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Helpers exported as `am5.ease`.

## Import

```js
import * as am5 from "@amcharts/amcharts5";

am5.ease.…
```

## Functions

- `bounce(t: Time): Time` — Bounces at the start before heading to the end. `out(bounce)` bounces at the end instead, like a dropped ball.
- `byName(name?: string, mode?: "in" | "out" | "inOut"): Easing` — Returns the easing function called `name` (`"linear"`, `"quad"`, `"cubic"`, `"exp"`, `"sine"`, `"circle"`, `"bounce"` or `"elastic"`), eased in, out or both ways. An unknown name gives `linear`. _Since 5.20.8._
- `circle(t: Time): Time` — Starts slowly and speeds up steeply near the end, following a quarter circle.
- `cubic(t: Time): Time` — Starts slowly and speeds up, more sharply than `quad` (progress cubed).
- `easingInfo(easing: Easing | undefined): IEasingInfo | undefined` — Returns what an easing function is, by name, or `undefined` for one that was not made from the functions here. _Since 5.20.8._
- `elastic(t: Time): Time` — Swings back and forth with growing swings before reaching the end, like a spring. `out(elastic)` springs past the end and settles instead.
- `exp(t: Time): Time` — Barely moves at first, then speeds up sharply (exponential).
- `inOut(ease: Easing): Easing` — Applies an easing at both ends: it eases in for the first half and out for the second.
- `linear(t: Time): Time` — No easing: the animation runs at a constant speed.
- `out(ease: Easing): Easing` — Turns an easing around, so it starts fast and ends slowly. The easings here ease in (start slowly) unless wrapped in `out()` or `inOut()`.
- `pow(t: Time, e: number): Time` — Raises progress to the power `e`: `2` is the same as `quad`, `3` as `cubic`.
- `quad(t: Time): Time` — Starts slowly and speeds up (progress squared).
- `sine(t: Time): Time` — Starts gently and speeds up, following a sine curve.
- `yoyo(ease: Easing): Easing` — Makes an easing go there and back: it reaches the end halfway through and returns to the start.

## Other members

- `Easing` (type)
- `IEasingInfo` (interface)
