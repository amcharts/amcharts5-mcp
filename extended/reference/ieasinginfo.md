---
title: "IEasingInfo"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ieasinginfo/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

What an easing function is, by name: the base easing, which way it applies, and whether it goes there and back. Only functions made from the ones here have one - a hand-written easing cannot be named.

_Since 5.20.8._

## Inheritance

Extends: (none)
TypeScript: not exported by name from the package.

## Properties

- **easing** (`string`) — _Note:_ Name of the base easing: `"linear"`, `"quad"`, `"cubic"`, `"exp"`, `"sine"`, `"circle"`, `"bounce"` or `"elastic"`.
- **ease** (`"out" | "inOut"`) — _Note:_ Set when the base easing is wrapped in `am5.ease.out()` or `am5.ease.inOut()`; absent for an easing that applies "in".
- **yoyo** (`boolean`) — _Note:_ `true` when the easing is wrapped in `am5.ease.yoyo()` (goes there and back).

## Notes

Returned by `am5.ease.easingInfo(easing)` (or `undefined` for an easing that cannot be named). The reverse, `am5.ease.byName(name, mode)`, returns the easing function called `name`, eased `"in"` (default), `"out"` or `"inOut"`; an unknown name gives `linear`. The serializer uses these to save running animations as IDeclaredAnimation entries (see the `runningAnimations` serializer setting). In TypeScript the type is `am5.ease.IEasingInfo`.

```javascript
am5.ease.byName("cubic", "out");                      // same as am5.ease.out(am5.ease.cubic)
am5.ease.easingInfo(am5.ease.yoyo(am5.ease.sine));    // { easing: "sine", yoyo: true }
am5.ease.easingInfo(am5.ease.out(am5.ease.cubic));    // { easing: "cubic", ease: "out" }
am5.ease.easingInfo((t) => t * t);                    // undefined
```

Names pass through `out()`, `inOut()` and `yoyo()` in that order only: `yoyo(out(cubic))` is `{ easing: "cubic", ease: "out", yoyo: true }`, but `out(yoyo(cubic))`, `out(out(cubic))` and `am5.ease.pow` (not a named easing) have no info. `am5.ease.pow` is `pow(t, e)` - it needs its exponent, so it is not usable as an easing on its own; wrap it: `(t) => am5.ease.pow(t, 3)`.
