---
title: "IDeclaredAnimation"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ideclaredanimation/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

An animation described as data, for the `animations` setting.

_Since 5.20.8._

## Inheritance

Extends: (none)
TypeScript: not exported by name from the package.

## Properties

- **key** (`string`) — Setting (or data item value, with `target: "dataItem"`) to animate.
- **from** (`any`) — Value to start from. Defaults to the current value. _Note:_ If the setting has no current value (e.g. `dx` or `fill` never set on the element), the value jumps straight to `to` without animating — give `from` explicitly.
- **to** (`any`) — Value to animate to.
- **duration** (`number`) — Duration in milliseconds. With `yoyo`, one way.
- **delay** (`number`) — default `0` — Milliseconds to wait before starting.
- **loops** (`number`) — default `1` — How many times to play it; `0` plays it forever.
- **yoyo** (`boolean`) — default `false` — Go back to `from` after reaching `to`, rather than jumping back.
- **easing** (`string`) — default `"linear"` — Easing by name: `"linear"`, `"quad"`, `"cubic"`, `"exp"`, `"sine"`, `"circle"`, `"bounce"` or `"elastic"`. _Note:_ Any other value — an unknown name, or an easing function such as `am5.ease.cubic` — silently gives linear. `am5.ease.byName(name, ease)` returns the same function in code.
- **ease** (`"out" | "inOut" | "in"`) — default `"in"` — Which way the easing applies.
- **target** (`"self" | "dataItem"`) — default `"self"` — `"self"` animates a setting of the element; `"dataItem"` a value of the element's data item. _Note:_ An entry with `target: "dataItem"` on an element that has no data item is skipped.

## Notes

The interface is not exported by name from the package, so TypeScript code cannot import `IDeclaredAnimation`. Write the entries as object literals; if a type is needed, use `NonNullable<am5.IEntitySettings["animations"]>[number]`.

```javascript
// Pulse every bullet, forever
series.bullets.push(function (root, series, dataItem) {
  return am5.Bullet.new(root, {
    sprite: am5.Circle.new(root, {
      radius: 6,
      animations: [
        { key: "scale", from: 1, to: 1.6, duration: 800, loops: 0, yoyo: true, easing: "sine" },
        { key: "opacity", from: 1, to: 0.3, duration: 800, loops: 0, yoyo: true }
      ]
    })
  });
});
// Move a map point along its line (a data item value) and back, forever
am5.Graphics.new(root, {
  svgPath: "...",
  animations: [{ target: "dataItem", key: "positionOnLine", from: 0, to: 1,
                 duration: 6000, loops: 0, yoyo: true, easing: "cubic", ease: "inOut" }]
});
```

Entries start when the `animations` setting is applied, restart when it changes (the element settings the previous entries animated are put back first), and stop when the element is disposed. A saved config keeps what was configured, never a value caught half way through an animation.

In a JSON config, colors and percents in `from` / `to` are written as `{ "type": "Color", "value": "#ff0000" }` and `{ "type": "Percent", "value": 50 }`.

On a MapPointSeries bullet sprite, an entry with `target: "dataItem"` and `key: "positionOnLine"` also turns an auto-rotating point (`autoRotate` on the data item or the bullet) by 180° while it moves the point back toward the start of the line, so the point faces the way it travels (5.20.8). A point moved by `dataItem.animate()` from code is not turned.

The serializer's `runningAnimations` setting (default `true`) also writes endless animations started in code (`loops: Infinity` with a named amCharts easing) into this setting, as entries with `loops: 0`.
